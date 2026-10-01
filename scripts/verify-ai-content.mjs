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
for (const [slug, reviewer] of Object.entries({implanty:'mehmet-onur-merey','all-on-4':'mehmet-onur-merey',licowki:'mustafa-akca','cala-szczeka':'mustafa-akca'})) {
  const page = schemas(read(slug + '.html')).find((s) => s['@type'] === 'MedicalWebPage');
  assert.equal(page.lastReviewed, '2026-09-30');
  assert.equal(page.reviewedBy['@id'], `${origin}/eksperci/${reviewer}/#person`);
  if (page.citation) assert(page.citation.every((source) => source.url && source.name));
}
for (const slug of ['koszt','korony-cyrkonowe']) {
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
