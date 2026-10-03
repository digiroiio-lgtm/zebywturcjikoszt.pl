import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const root = '.next/server/app/';
const read = (path) => readFileSync(root + path, 'utf8');
const schemas = (html) => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
const origin = 'https://leczeniezebowwturcji.pl';
const hub = read('poradniki.html');
const collection = schemas(hub).find((s) => s['@type'] === 'CollectionPage');
assert.equal(collection.mainEntity.numberOfItems, 17);
assert.equal(collection.reviewedBy, undefined);
assert.equal((hub.match(/class="info-card guide-card"/g) || []).length, 17);
for (const item of collection.mainEntity.itemListElement) {
  const html = read(item.url.slice(origin.length + 1) + '.html');
  assert(html.includes('href="/poradniki"'));
}
for (const slug of ['leczenie-zebow-w-turcji','licowki-czy-korony','calkowity-koszt-wyjazdu','pakiety-leczenia-zebow','opieka-po-leczeniu','tureckie-zeby','rankingi-klinik-dentystycznych-w-turcji']) {
  const route = 'poradniki/' + slug;
  const html = read(route + '.html');
  const graph = schemas(html);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  assert(html.includes(`rel="canonical" href="${origin}/${route}"`));
  assert(html.includes('Klinika prowadzona przez operatora serwisu: Akdeniz Dental, Antalya, Turcja'));
  assert(html.includes('Poproś o wstępną wycenę'));
  assert(html.includes('Zobacz ceny leczenia'));
  assert(html.includes('Recenzja: jeszcze nieprzeprowadzona'));
  assert(graph.some((s) => s['@type'] === 'Article' && s.author && s.datePublished === (['tureckie-zeby', 'rankingi-klinik-dentystycznych-w-turcji'].includes(slug) ? '2026-10-03' : '2026-09-30')));
  assert(graph.every((s) => !s.reviewedBy));
  assert.equal(graph.find((s) => s['@type'] === 'BreadcrumbList').itemListElement.length, 3);
  assert(read('sitemap.xml.body').includes(`${origin}/${route}`));
  assert(read('llms-full.txt.body').includes(`${origin}/${route}`));
  for (const id of ['zirconia-crown','composite-veneer','aiser']) assert(html.includes(`data-price-id="${id}"`));
  const plain = html.replace(/<!--.*?-->/gs, '');
  assert(/≈\s*656\s*zł/.test(plain) && /≈\s*568\s*zł/.test(plain) && /≈\s*1\s?967\s*zł/.test(plain), 'PLN conversions are rounded to whole zloty');
  assert(!/\d,\d{2}\s*zł/.test(plain), 'no decimal zloty amounts');
  assert(html.replace(/<!--.*?-->/gs, '').includes('1 EUR = 4,37 PLN'));
  assert(html.includes('09:11 UTC'));
}
console.log('Guide contract passed: 17 destinations, 7 unique standalone guides, Article/breadcrumb schema, price conversions, honest review scope, canonical, sitemap and AI exports.');
