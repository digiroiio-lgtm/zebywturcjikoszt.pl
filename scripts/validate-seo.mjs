import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const appDir = path.join(process.cwd(), ".next", "server", "app");
const failures = [];

function fail(message) {
  failures.push(message);
}

function matches(html, expression) {
  return [...html.matchAll(expression)].map((match) => match[1]);
}

function normalisePath(href) {
  const clean = href.split("#")[0].split("?")[0];
  return clean.length > 1 ? clean.replace(/\/+$/, "") : clean;
}

async function htmlFiles(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map(async (entry) => entry.isDirectory()
    ? htmlFiles(path.join(directory, entry.name), `${prefix}${entry.name}/`)
    : entry.name.endsWith(".html") && !["_not-found.html", "_global-error.html"].includes(entry.name) ? [`${prefix}${entry.name}`] : []));
  return groups.flat();
}
const files = await htmlFiles(appDir);
if (!files.includes("index.html")) fail("Missing prerendered homepage.");

const routeFiles = new Map(files.map((file) => [file === "index.html" ? "/" : `/${file.slice(0, -5)}`, file]));
const knownRoutes = new Set(routeFiles.keys());
const sitemap = await readFile(path.join(appDir, "sitemap.xml.body"), "utf8");
const robots = await readFile(path.join(appDir, "robots.txt.body"), "utf8");
const sitemapUrls = matches(sitemap, /<loc>([^<]+)<\/loc>/g);
const sitemapPaths = new Set(sitemapUrls.map((url) => normalisePath(new URL(url).pathname)));
const sitemapOrigin = sitemapUrls[0] ? new URL(sitemapUrls[0]).origin : null;
const canonicalOwners = new Map();
const titleOwners = new Map();

if (!sitemapOrigin) fail("Sitemap has no absolute URLs.");
if (!robots.includes("Sitemap:")) fail("robots.txt does not advertise the sitemap.");
for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "OAI-SearchBot", "Google-Extended"]) {
  if (!robots.includes(`User-Agent: ${bot}`)) fail(`robots.txt lacks an explicit rule for ${bot}.`);
}
const llms = await readFile(path.join(appDir, "llms.txt.body"), "utf8");
for (const url of matches(llms, /\]\((https:\/\/[^)\s]+)\)/g)) {
  const parsed = new URL(url);
  if (parsed.origin !== sitemapOrigin) continue;
  const linked = normalisePath(parsed.pathname);
  if (/^\/(llms-full\.txt|content-provenance\.json|clinic-verification\.json|sitemap\.xml)$/.test(linked)) continue;
  if (!sitemapPaths.has(linked)) fail(`llms.txt links to ${linked}, which is not in the sitemap.`);
}
if (!sitemap.includes("image:loc")) fail("Sitemap contains no image entries.");
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail("Sitemap contains duplicate URLs.");

for (const [route, file] of routeFiles) {
  const html = await readFile(path.join(appDir, file), "utf8");
  const titles = matches(html, /<title>([^<]+)<\/title>/g);
  const descriptions = matches(html, /<meta name="description" content="([^"]+)"/g);
  const canonicals = matches(html, /<link rel="canonical" href="([^"]+)"/g);
  const robotsMeta = matches(html, /<meta name="robots" content="([^"]+)"/g).join(",");
  const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length;
  const noindex = robotsMeta.includes("noindex");

  if (titles.length !== 1 || !titles[0].trim()) fail(`${route}: expected one non-empty title.`);
  if (titles[0] && [...titles[0]].length > 65) fail(`${route}: title is ${[...titles[0]].length} characters (max 65).`);
  if (route !== "/" && !noindex && !html.includes("BreadcrumbList")) fail(`${route}: missing BreadcrumbList.`);
  if (!noindex && descriptions[0] && ([...descriptions[0]].length < 110 || [...descriptions[0]].length > 165)) fail(`${route}: meta description is ${[...descriptions[0]].length} characters (expected 110-165).`);
  const sourcesExempt = ["/przed-i-po"].includes(route); // no verified external source for /przed-i-po
  if (!noindex && !sourcesExempt && !html.includes("Źródła i podstawa informacji")) fail(`${route}: missing visible source list.`);
  if (descriptions.length !== 1 || !descriptions[0].trim()) fail(`${route}: expected one non-empty meta description.`);
  if (canonicals.length !== 1) fail(`${route}: expected exactly one canonical.`);
  if (!/<meta property="og:image" content="[^"]+"/.test(html)) fail(`${route}: missing og:image.`);
  if (!/<meta name="twitter:card" content="summary_large_image"/.test(html)) fail(`${route}: twitter:card is not summary_large_image.`);
  if (!/<link rel="icon"/.test(html)) fail(`${route}: missing favicon link.`);
  const answer = html.match(/class="direct-answer"[^>]*>.*?<\/h2><p>(.*?)<\/p>/s);
  if (!noindex && answer) {
    const words = answer[1].replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
    if (words < 12 || words > 60) fail(`${route}: short answer block has ${words} words (expected 12-60).`);
  }
  if (h1Count !== 1) fail(`${route}: expected exactly one h1, found ${h1Count}.`);

  if (canonicals[0]) {
    let canonical;
    try { canonical = new URL(canonicals[0]); } catch { fail(`${route}: canonical is not an absolute URL.`); }
    if (canonical && sitemapOrigin && canonical.origin !== sitemapOrigin) fail(`${route}: canonical host differs from sitemap host.`);
    const owner = canonicalOwners.get(canonicals[0]);
    if (owner) fail(`${route}: canonical duplicates ${owner}.`);
    canonicalOwners.set(canonicals[0], route);
  }

  if (titles[0]) {
    const owner = titleOwners.get(titles[0]);
    if (owner) fail(`${route}: title duplicates ${owner}.`);
    titleOwners.set(titles[0], route);
  }

  if (noindex && sitemapPaths.has(route)) fail(`${route}: noindex URL is present in sitemap.`);
  if (!noindex && !sitemapPaths.has(route)) fail(`${route}: indexable URL is missing from sitemap.`);

  for (const href of matches(html, /href="(\/[^"]*)"/g)) {
    const linkedRoute = normalisePath(href);
    if (linkedRoute.startsWith("/_next/") || linkedRoute.startsWith("/api/") || ["/icon", "/apple-icon", "/manifest.webmanifest", "/opengraph-image", "/twitter-image"].includes(linkedRoute)) continue;
    if (!knownRoutes.has(linkedRoute)) fail(`${route}: broken internal link to ${linkedRoute}.`);
  }

  for (const block of matches(html, /<script type="application\/ld\+json">([^<]+)<\/script>/g)) {
    try {
      const data = JSON.parse(block);
      if (data.reviewedBy && !html.includes("Treść zweryfikowana pod kątem informacji stomatologicznych")) fail(`${route}: reviewedBy requires visible medical review attribution.`);
      if (data.reviewedBy && !knownRoutes.has(normalisePath(new URL(data.reviewedBy["@id"]).pathname))) fail(`${route}: reviewedBy has no published expert profile.`);
    } catch { fail(`${route}: invalid JSON-LD.`); }
  }
}

const ratingsDate = (await readFile(path.join(process.cwd(), "lib", "clinic-profiles.ts"), "utf8")).match(/RATINGS_CHECKED_ISO_DATE = "(\d{4}-\d{2}-\d{2})"/)?.[1];
if (ratingsDate && (Date.now() - new Date(`${ratingsDate}T00:00:00Z`).getTime()) / 86400000 > 90) console.warn(`WARNING: clinic ratings were last checked on ${ratingsDate}. Re-read Trustpilot and Google, then update RATINGS_CHECKED_ISO_DATE and RATINGS_CHECKED_DATE.`);

const reviewSource = await readFile(path.join(process.cwd(), "lib", "medical-review.ts"), "utf8");
for (const [, reviewDate] of reviewSource.matchAll(/reviewDate: "(\d{4}-\d{2}-\d{2})"/g)) {
  const age = (Date.now() - new Date(`${reviewDate}T00:00:00Z`).getTime()) / 86400000;
  if (age > 180) console.warn(`WARNING: a medical review dated ${reviewDate} is ${Math.round(age)} days old. Ask the reviewer to re-confirm the page.`);
}

const credentialSource = await readFile(path.join(process.cwd(), "lib", "credentials.ts"), "utf8");
for (const [, validUntil] of credentialSource.matchAll(/validUntil: "(\d{4}-\d{2}-\d{2})"/g)) {
  const daysLeft = (new Date(`${validUntil}T00:00:00Z`).getTime() - Date.now()) / 86400000;
  if (daysLeft < 0) fail(`lib/credentials.ts: a credential expired on ${validUntil}. Update it from the official source or remove it.`);
  else if (daysLeft < 60) console.warn(`WARNING: a credential in lib/credentials.ts expires on ${validUntil}.`);
}

const legalReview = (await readFile(path.join(process.cwd(), "lib", "legal-review.ts"), "utf8")).match(/LEGAL_REVIEW_CONFIRMED_DATE: string \| null = (null|"\d{4}-\d{2}-\d{2}")/)?.[1];
const evidenceSource = await readFile(path.join(process.cwd(), "lib", "evidence.ts"), "utf8");
const patientContent = [];
if (!/verifiedCases: VerifiedCase\[\] = \[\s*\]/.test(evidenceSource)) patientContent.push("verifiedCases in lib/evidence.ts");
for (const file of ["testimonials.ts", "clinic-stats.ts"]) {
  if (await readFile(path.join(process.cwd(), "lib", file), "utf8").then(() => true, () => false)) patientContent.push(`lib/${file}`);
}
if (patientContent.length && (!legalReview || legalReview === "null")) fail(`Patient-derived content is published (${patientContent.join(", ")}) but LEGAL_REVIEW_CONFIRMED_DATE in lib/legal-review.ts is not set. See docs/consent-and-data-handling.md.`);

if (failures.length) {
  console.error(`SEO contract failed with ${failures.length} issue(s):`);
  for (const issue of failures) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`SEO contract passed for ${routeFiles.size} prerendered routes (${sitemapPaths.size} indexable).`);
