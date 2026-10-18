// Guards the per-page Markdown twins (/<slug>.md): one per patient guide, complete, canonical-first, and consistent with the HTML page and llms files.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = ".next/server/app/";
const origin = "https://leczeniezebowwturcji.pl";
const read = (file) => readFileSync(root + file, "utf8");

const mdDir = root + "md";
assert(existsSync(mdDir), "no Markdown twins were built (app/md/[...slug]/route.ts).");
const twins = [];
(function walk(dir, prefix) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, `${prefix}${name}/`);
    else if (name.endsWith(".body")) twins.push(`${prefix}${name.slice(0, -5)}`);
  }
})(mdDir, "");
assert(twins.length >= 20, `expected a Markdown twin per patient guide, found ${twins.length}.`);

const sitemap = read("sitemap.xml.body");
const llms = read("llms.txt.body");
const full = read("llms-full.txt.body");
const manifest = JSON.parse(readFileSync(".next/routes-manifest.json", "utf8"));
assert(JSON.stringify(manifest.rewrites ?? {}).includes("/md/"), "the /<slug>.md rewrite is missing from the routes manifest.");

for (const slug of twins) {
  const body = read(`md/${slug}.body`);
  const canonical = `${origin}/${slug}`;
  assert(sitemap.includes(`<loc>${canonical}</loc>`), `${slug}.md has no indexable HTML page in the sitemap.`);
  assert(body.startsWith("---\n"), `${slug}.md: front matter is missing.`);
  assert(body.includes(`canonical: ${canonical}`), `${slug}.md: canonical URL missing from front matter.`);
  assert(/last_updated: \d{4}-\d{2}-\d{2}/.test(body), `${slug}.md: last_updated missing.`);
  assert(/^# .+/m.test(body), `${slug}.md: H1 missing.`);
  assert(body.includes("Recenzja medyczna"), `${slug}.md: medical review state missing.`);
  assert(!/\]\(\/[^)]*\)/.test(body), `${slug}.md: relative link; AI-readable files need absolute URLs.`);
  assert(body.length > 1500, `${slug}.md is suspiciously short (${body.length} characters).`);
  assert(llms.includes(`Markdown: ${origin}/${slug}.md`), `llms.txt does not point to ${slug}.md.`);

  // Same FAQ as the HTML page: every question in the HTML schema must appear in the Markdown.
  const htmlFile = slug === "" ? "index.html" : `${slug}.html`;
  const html = existsSync(root + htmlFile) ? read(htmlFile) : "";
  for (const match of html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)) {
    const data = JSON.parse(match[1]);
    if (data["@type"] === "FAQPage") for (const item of data.mainEntity) assert(body.includes(`#### ${item.name}`), `${slug}.md is missing FAQ "${item.name}".`);
  }
  // The Markdown carries the same reviewer decision as llms-full.txt.
  const reviewLine = body.split("\n").find((line) => line.startsWith("Recenzja medyczna"));
  assert(full.includes(reviewLine), `${slug}.md: review line differs from llms-full.txt.`);
}

const price = read("md/koszt.body");
assert(price.includes("| Pozycja | EUR | Około PLN |") && price.includes("Orientacyjny kurs"), "koszt.md: price table or exchange-rate note missing.");
assert(twins.includes("uk/szkocja") && twins.includes("uk/finansowanie-leczenia-zebow-w-turcji"), "UK twins are missing.");
console.log(`Markdown twins passed: ${twins.length} pages, canonical-first, FAQ and review state match the HTML and llms files.`);
