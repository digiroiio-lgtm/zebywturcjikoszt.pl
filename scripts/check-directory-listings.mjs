// Usage: node scripts/check-directory-listings.mjs
// Opens every VERIFIED directory listing from the built citation-kit.json and checks that the page still names the clinic
// and, where it shows them, the address and phone. Run weekly (see .github/workflows/maintenance.yml) after `next build`.
//   no response (timeout, reset)      -> WARN "unreachable from CI"
//   page loads but no clinic name is found -> FAIL (WARN for social profiles) (the listing was removed, renamed or hijacked); the kit name and its alternate
//                                              names (official facility name) are all accepted. Pages with almost no text in the raw HTML
//                                              (rendered with JavaScript) cannot be judged and give a WARN.
//   phone or address not on the page  -> WARN (many directories load them with JavaScript or hide them)
import { existsSync, readFileSync } from "node:fs";
import { checkUrl } from "./source-link-status.mjs";

const file = ".next/server/app/citation-kit.json.body";
if (!existsSync(file)) { console.log("Listing check skipped: no build present."); process.exit(0); }
const kit = JSON.parse(readFileSync(file, "utf8"));
if (!kit.listings.length) { console.log("No verified directory listings yet; nothing to check."); process.exit(0); }

// Fold case and Turkish/Polish diacritics so "PREMİER" equals "Premier" and "Çaybaşı" equals "caybasi".
const fold = (text) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i").replace(/ł/g, "l");
const plain = (html) => fold(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " "));
// Any known public number counts: the public phone, the WhatsApp number and the number in the official registry record.
const phoneTails = [kit.phone, kit.whatsapp, kit.officialRecord?.phone].filter(Boolean).map((value) => value.replace(/\D/g, "").slice(-10));
const tokensOf = (text) => fold(text).split(/[\s,.:\/-]+/).filter((word) => /\d/.test(word) || word.length >= 6);
const addressForms = [kit.address.streetAddress, kit.officialRecord?.addressText].filter(Boolean).map(tokensOf);

const failures = [];
const warnings = [];
for (const listing of kit.listings) {
  const { status, errorCode } = await checkUrl(listing.url);
  if (status === 0) { warnings.push(`${listing.name} (${listing.url}): unreachable from CI (${errorCode || "no response"})`); console.log(`WARN  ${listing.name}: unreachable (${errorCode})`); continue; }
  if (status >= 400) { (status === 401 || status === 403 || status === 429 ? warnings : failures).push(`${listing.name} (${listing.url}): HTTP ${status}`); console.log(`${[401, 403, 429].includes(status) ? "WARN" : "FAIL"}  ${listing.name}: HTTP ${status}`); continue; }
  let body = "";
  try { body = plain(await (await fetch(listing.url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; listing-check/1.0)" }, signal: AbortSignal.timeout(20000) })).text()); } catch { warnings.push(`${listing.name}: page body could not be read`); continue; }
  if (body.length < 1500) { warnings.push(`${listing.name} (${listing.url}): too little text in the raw HTML to check (probably rendered with JavaScript)`); console.log(`WARN  ${listing.name}: page text not readable without JavaScript`); continue; }
  const names = [kit.name, kit.legalName, ...(kit.alternateNames ?? [])].map(fold);
  // Social networks show a login wall to scripts, so a missing name there is only a warning.
  if (!names.some((name) => body.includes(name)) && listing.kind === "social-profile") { warnings.push(`${listing.name} (${listing.url}): clinic name not found in the raw page (social networks hide content from scripts)`); console.log(`WARN  ${listing.name}: name not readable`); continue; }
  if (!names.some((name) => body.includes(name))) { failures.push(`${listing.name} (${listing.url}): none of the clinic names (${[kit.name, kit.legalName, ...(kit.alternateNames ?? [])].join(" / ")}) is on the page`); console.log(`FAIL  ${listing.name}: name missing`); continue; }
  const missing = [];
  if (!phoneTails.some((tail) => body.replace(/\D/g, "").includes(tail))) missing.push("phone");
  if (!addressForms.some((tokens) => tokens.every((token) => body.includes(token)))) missing.push("address");
  if (missing.length) { warnings.push(`${listing.name} (${listing.url}): ${missing.join(" and ")} not found on the page`); console.log(`WARN  ${listing.name}: ${missing.join(", ")} not found`); } else console.log(`OK    ${listing.name}`);
}
if (warnings.length) console.warn(`\n${warnings.length} listing warning(s):\n- ${warnings.join("\n- ")}`);
if (failures.length) { console.error(`\n${failures.length} listing(s) no longer match the clinic data:\n- ${failures.join("\n- ")}`); process.exit(1); }
console.log(`\nAll ${kit.listings.length} verified listing(s) still name the clinic.`);
