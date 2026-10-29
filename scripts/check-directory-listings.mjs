// Usage: node scripts/check-directory-listings.mjs
// Opens every VERIFIED directory listing from the built citation-kit.json and checks that the page still names the clinic
// and, where it shows them, the address and phone. Run weekly (see .github/workflows/maintenance.yml) after `next build`.
//   no response (timeout, reset)      -> WARN "unreachable from CI"
//   page loads but clinic name absent -> FAIL (the listing was removed, renamed or hijacked)
//   phone or address not on the page  -> WARN (many directories load them with JavaScript or hide them)
import { existsSync, readFileSync } from "node:fs";
import { checkUrl } from "./source-link-status.mjs";

const file = ".next/server/app/citation-kit.json.body";
if (!existsSync(file)) { console.log("Listing check skipped: no build present."); process.exit(0); }
const kit = JSON.parse(readFileSync(file, "utf8"));
if (!kit.listings.length) { console.log("No verified directory listings yet; nothing to check."); process.exit(0); }

const plain = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").toLowerCase();
const phoneTail = kit.phone.replace(/\D/g, "").slice(-10);
const streetTokens = kit.address.streetAddress.toLowerCase().split(/[\s,.:]+/).filter((word) => /\d/.test(word) || word.length >= 6);

const failures = [];
const warnings = [];
for (const listing of kit.listings) {
  const { status, errorCode } = await checkUrl(listing.url);
  if (status === 0) { warnings.push(`${listing.name} (${listing.url}): unreachable from CI (${errorCode || "no response"})`); console.log(`WARN  ${listing.name}: unreachable (${errorCode})`); continue; }
  if (status >= 400) { (status === 401 || status === 403 || status === 429 ? warnings : failures).push(`${listing.name} (${listing.url}): HTTP ${status}`); console.log(`${[401, 403, 429].includes(status) ? "WARN" : "FAIL"}  ${listing.name}: HTTP ${status}`); continue; }
  let body = "";
  try { body = plain(await (await fetch(listing.url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; listing-check/1.0)" }, signal: AbortSignal.timeout(20000) })).text()); } catch { warnings.push(`${listing.name}: page body could not be read`); continue; }
  if (!body.includes(kit.name.toLowerCase())) { failures.push(`${listing.name} (${listing.url}): the clinic name "${kit.name}" is not on the page`); console.log(`FAIL  ${listing.name}: name missing`); continue; }
  const missing = [];
  if (!body.replace(/\D/g, "").includes(phoneTail)) missing.push("phone");
  if (!streetTokens.every((token) => body.includes(token))) missing.push("address");
  if (missing.length) { warnings.push(`${listing.name} (${listing.url}): ${missing.join(" and ")} not found on the page`); console.log(`WARN  ${listing.name}: ${missing.join(", ")} not found`); } else console.log(`OK    ${listing.name}`);
}
if (warnings.length) console.warn(`\n${warnings.length} listing warning(s):\n- ${warnings.join("\n- ")}`);
if (failures.length) { console.error(`\n${failures.length} listing(s) no longer match the clinic data:\n- ${failures.join("\n- ")}`); process.exit(1); }
console.log(`\nAll ${kit.listings.length} verified listing(s) still name the clinic.`);
