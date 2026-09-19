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

const files = (await readdir(appDir)).filter((name) => name.endsWith(".html") && name !== "_not-found.html");
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
  if (descriptions.length !== 1 || !descriptions[0].trim()) fail(`${route}: expected one non-empty meta description.`);
  if (canonicals.length !== 1) fail(`${route}: expected exactly one canonical.`);
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
    if (linkedRoute.startsWith("/_next/") || linkedRoute.startsWith("/api/")) continue;
    if (!knownRoutes.has(linkedRoute)) fail(`${route}: broken internal link to ${linkedRoute}.`);
  }

  for (const block of matches(html, /<script type="application\/ld\+json">([^<]+)<\/script>/g)) {
    try { JSON.parse(block); } catch { fail(`${route}: invalid JSON-LD.`); }
  }
}

if (failures.length) {
  console.error(`SEO contract failed with ${failures.length} issue(s):`);
  for (const issue of failures) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`SEO contract passed for ${routeFiles.size} prerendered routes (${sitemapPaths.size} indexable).`);
