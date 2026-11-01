// Warns when a page's main text changed but its sitemap lastmod did not (the dates are maintained by hand).
// Usage: node scripts/content-fingerprints.mjs [--write]   (--write records the current build as the baseline)
import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const appDir = process.env.FINGERPRINT_APP_DIR ?? path.join(process.cwd(), ".next", "server", "app");
const baselinePath = path.join(process.cwd(), "lib", "content-fingerprints.json");
const reviewed = new Set(["/implanty", "/licowki", "/all-on-4", "/cala-szczeka", "/korony-cyrkonowe"]);

async function htmlFiles(dir, prefix = "") {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) out.push(...await htmlFiles(path.join(dir, entry.name), `${prefix}${entry.name}/`));
    else if (entry.name.endsWith(".html") && !entry.name.startsWith("_")) out.push(`${prefix}${entry.name}`);
  }
  return out;
}


// Only editorial text counts. Interface chrome (call-to-action buttons and links, forms, dialogs, carousel controls) is removed first, so relabelling a button never reads as a content change.
const chrome = [
  /<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g,
  /<dialog[\s\S]*?<\/dialog>/g,
  /<form[\s\S]*?<\/form>/g,
  /<button[\s\S]*?<\/button>/g,
  /<a\b[^>]*class="[^"]*\b(?:button|button-secondary|text-link-button|section-cta|mobile-bar)[^"]*"[^>]*>[\s\S]*?<\/a>/g
];
function editorialText(markup) {
  let out = markup;
  for (const pattern of chrome) out = out.replace(pattern, " ");
  return out.replace(/<!-- -->/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

const sitemap = await readFile(path.join(appDir, "sitemap.xml.body"), "utf8");
const lastmod = new Map([...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => [new URL(block.match(/<loc>([^<]+)<\/loc>/)[1]).pathname, block.match(/<lastmod>([^<]+)<\/lastmod>/)[1].slice(0, 10)]));
const current = {};
for (const file of await htmlFiles(appDir)) {
  const route = file === "index.html" ? "/" : `/${file.slice(0, -5)}`;
  if (!lastmod.has(route)) continue;
  const html = await readFile(path.join(appDir, file), "utf8");
  const main = html.match(/<main[\s\S]*<\/main>/)?.[0] ?? html;
  const text = editorialText(main);
  current[route] = { hash: createHash("sha1").update(text).digest("hex").slice(0, 16), lastmod: lastmod.get(route) };
}

if (process.argv.includes("--write")) {
  await writeFile(baselinePath, `${JSON.stringify(current, null, 2)}\n`);
  console.log(`Fingerprint baseline written for ${Object.keys(current).length} pages.`);
  process.exit(0);
}

const baseline = JSON.parse(await readFile(baselinePath, "utf8").catch(() => "{}"));
let warnings = 0;
for (const [route, now] of Object.entries(current)) {
  const before = baseline[route];
  if (!before || before.hash === now.hash || before.lastmod !== now.lastmod) continue;
  warnings += 1;
  console.warn(`WARNING: the text of ${route} changed but its sitemap lastmod is still ${now.lastmod}. Update lastUpdated in the content record${reviewed.has(route) ? " (this page has a medical review: a later date withdraws the reviewed status until the reviewer re-confirms)" : ""}, then run npm run fingerprints:update.`);
}
console.log(warnings ? `Fingerprint check: ${warnings} page(s) need a date review (warning only).` : `Fingerprint check: no unexplained content changes in ${Object.keys(current).length} pages.`);
