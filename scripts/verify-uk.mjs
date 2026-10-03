import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
const root = '.next/server/app/';
const read = (path) => readFileSync(root + path, 'utf8');
const origin = 'https://leczeniezebowwturcji.pl';
const schemas = (html) => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
const sitemap = read('sitemap.xml.body');
const llmsFull = read('llms-full.txt.body');
// content-provenance.json is a dynamic route handler (no prerendered body), so its source is checked instead.
assert(readFileSync('app/content-provenance.json/route.ts', 'utf8').includes('allUkPages'), 'content provenance includes the UK pages');

const pages = [['uk', 2], ['uk/jak-zaplacic-za-leczenie-zebow-w-turcji', 3]];
const gbpPage = 'uk/ceny-leczenia-zebow-w-turcji-w-funtach';
if (existsSync(root + gbpPage + '.html')) pages.push([gbpPage, 3]);
for (const [route, depth] of pages) {
  const html = read(route + '.html');
  const graph = schemas(html);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, route + ': one h1');
  assert(html.includes(`rel="canonical" href="${origin}/${route}"`), route + ': canonical');
  assert.equal(graph.find((s) => s['@type'] === 'BreadcrumbList').itemListElement.length, depth, route + ': breadcrumb depth');
  assert(graph.some((s) => s.audience?.geographicArea?.name === 'Wielka Brytania'), route + ': UK audience');
  assert(html.includes('lead_source=OGZ-UK'), route + ': OGZ-UK lead source on the closing CTA');
  assert(html.includes('lang="pl-PL"'), route + ': Polish language');
  assert(sitemap.includes(`${origin}/${route}`), route + ': sitemap');
  assert(llmsFull.includes(`${origin}/${route}`), route + ': llms-full');
  assert(graph.every((s) => !s.reviewedBy), route + ': no medical review claimed');
}
const payment = read('uk/jak-zaplacic-za-leczenie-zebow-w-turcji.html');
assert(payment.includes('nie oferuje ani nie pośredniczy w kredytach'), 'payment guide states the service does not arrange credit');
for (const forbidden of [/0\s?%\s?APR/i, /gwarantowan/i, /bez\s+sprawdzania/i]) assert(!forbidden.test(payment.replace(/<[^>]+>/g, ' ')), 'payment guide must not contain ' + forbidden);
if (existsSync(root + gbpPage + '.html')) {
  const gbp = read(gbpPage + '.html');
  assert(gbp.includes('data-price-id="aiser"') && gbp.includes('kurs z dnia'), 'GBP table has dated rate and price ids');
  assert(gbp.includes('nie jest ofertą w funtach'), 'GBP page states it is not an offer in GBP');
} else {
  assert(!sitemap.includes(gbpPage), 'GBP page stays unpublished until a dated rate is set');
}
console.log(`UK section contract passed: ${pages.length} pages, breadcrumbs, canonical, sitemap, llms-full, OGZ-UK, finance wording gate.`);
