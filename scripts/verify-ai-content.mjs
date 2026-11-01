import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const root = '.next/server/app/';
const read = (path) => readFileSync(root + path, 'utf8');
const schemas = (html) => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
const origin = 'https://leczeniezebowwturcji.pl';
const index = read('llms.txt.body');
const full = read('llms-full.txt.body');
for (const path of ['llms.txt', 'llms-full.txt']) {
  const meta = JSON.parse(read(path + '.meta'));
  assert.equal(meta.status, 200);
  assert.equal(meta.headers['x-robots-tag'], undefined);
  assert.equal(meta.headers['content-language'], 'pl');
  assert.match(meta.headers['content-type'], /^text\/plain/);
}
assert.match(index, /^# /);
assert.match(index, /llms-full\.txt/);
assert.match(full, /Kurs nie jest aktualizowany automatycznie/);
assert.match(full, /nie automatycznie kompletnego leczenia/);
// The AI-readable files must stay resolvable outside the site: absolute links only, every internal URL published, dates stated.
const sitemapPaths = new Set([...read('sitemap.xml.body').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
const publishedFiles = new Set(['llms-full.txt', 'content-provenance.json', 'clinic-verification.json', 'citation-kit.json', 'dane/cennik-kliniki.csv', 'dane/cennik-kliniki.json', 'sitemap.xml', 'feed.xml', 'llms.txt', 'robots.txt'].map((file) => `${origin}/${file}`));
// Markdown twins (/<slug>.md) are published beside their HTML pages and are not in the sitemap by design.
const markdownTwins = new Set([...sitemapPaths].filter((url) => url !== origin).map((url) => `${url}.md`));
for (const [name, body] of [['llms.txt', index], ['llms-full.txt', full]]) {
  assert(!/\]\(\/[^)]*\)/.test(body), `${name} contains a relative markdown link`);
  assert(!/https?:\/\/[^\s)<>]+[.,;:](?:\s|$)/m.test(body.replace(/\]\([^)]*\)/g, '')), `${name} has a URL with trailing punctuation outside a Markdown link`);
  for (const url of [...body.matchAll(new RegExp(`${origin}/[^\\s)<>]*`, 'g'))].map((m) => m[0].split('#')[0].replace(/\/$/, ''))) {
    assert(sitemapPaths.has(url) || publishedFiles.has(url) || markdownTwins.has(url) || url === origin, `${name} links to an unpublished URL: ${url}`);
  }
}
assert.match(index, /Ostatnia aktualizacja treści: \d{4}-\d{2}-\d{2}\./);
assert.match(full, /^Ostatnia aktualizacja treści: \d{4}-\d{2}-\d{2}\.$/m);
assert.match(full, /\| Pozycja \| EUR \| Około PLN \|/);
const hub = read('pytania-i-odpowiedzi.html');
const faq = schemas(hub).find((s) => s['@type'] === 'FAQPage');
assert(faq.mainEntity.length > 20);
assert.equal((hub.match(/<details id=/g) || []).length, faq.mainEntity.length);
assert.equal(faq.reviewedBy, undefined);
for (const question of faq.mainEntity) {
  const [path, anchor] = question.citation.slice(origin.length + 1).split('#');
  const source = read(path + '.html');
  assert(source.includes(`id="${anchor}"`));
  const sourceFaq = schemas(source).find((s) => s['@type'] === 'FAQPage');
  const original = sourceFaq.mainEntity.find((q) => q.name === question.name);
  assert(original, question.name);
  assert.equal(question.acceptedAnswer.text, original.acceptedAnswer.text);
  assert(full.includes(original.acceptedAnswer.text));
}
for (const [slug, reviewer, reviewDate] of [['implanty','mehmet-onur-merey','2026-09-30'],['licowki','mustafa-akca','2026-09-30'],['all-on-4','mehmet-onur-merey','2026-10-02'],['cala-szczeka','mustafa-akca','2026-10-02'],['korony-cyrkonowe','mustafa-akca','2026-09-30']]) {
  const page = schemas(read(slug + '.html')).find((s) => s['@type'] === 'MedicalWebPage');
  assert.equal(page.lastReviewed, reviewDate);
  assert.equal(page.reviewedBy['@id'], `${origin}/eksperci/${reviewer}/#person`);
  if (page.citation) assert(page.citation.every((source) => source.url && source.name));
}
for (const slug of ['koszt']) {
  const page = schemas(read(slug + '.html')).find((s) => /WebPage/.test(s['@type']));
  assert.equal(page.reviewedBy, undefined);
  assert.equal(page.lastReviewed, undefined);
}
for (const path of ['nasi-lekarze','eksperci','eksperci/mustafa-akca','eksperci/mehmet-onur-merey']) {
  const html = read(path + '.html');
  assert(html.includes(`property="og:url" content="${origin}/${path}"`));
  assert.match(html, /name="twitter:title"/);
}
assert(read('sitemap.xml.body').includes(`${origin}/pytania-i-odpowiedzi`));
console.log(`AI content contract passed: ${faq.mainEntity.length} source-matched FAQ answers, text endpoints, reviewer scope, dates and social metadata.`);
