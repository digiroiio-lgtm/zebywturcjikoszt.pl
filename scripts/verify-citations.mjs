// Guards the citation kit and the price dataset (run after `next build`): one name, address and phone everywhere,
// the dataset equals lib/pricing.ts, the new pages are in the sitemap, and only verified listings are published.
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const root = '.next/server/app/';
if (!existsSync(`${root}citation-kit.json.body`)) { console.log('Citation checks skipped: no build present.'); process.exit(0); }
const read = (path) => readFileSync(root + path, 'utf8');
const origin = 'https://leczeniezebowwturcji.pl';
const text = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<!-- -->/g, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');
const digits = (value) => value.replace(/\D/g, '');

// 1. The kit itself.
const kit = JSON.parse(read('citation-kit.json.body'));
for (const key of ['name', 'legalName', 'phone', 'email']) assert(kit[key], `kit.${key} must not be empty`);
assert(kit.officialBranch?.name && kit.officialBranch?.addressText && /^https:\/\/dosyamerkez\.saglik\.gov\.tr\//.test(kit.officialBranch.source), 'kit must carry the official branch record');
assert(kit.officialRecord?.phone && kit.officialRecord?.addressText && /^https:\/\/www\.antalyasm\.gov\.tr\//.test(kit.officialRecord.source), 'kit must carry the official registry record');
assert(Array.isArray(kit.alternateNames) && kit.alternateNames.length > 0, 'kit must list the alternate (official) facility names');
assert(kit.address.text && kit.address.streetAddress && kit.address.postalCode && kit.address.addressLocality, 'kit address must be complete');
for (const lang of ['pl', 'en']) {
  const d = kit.descriptions[lang];
  assert(d.short.length <= 160, `${lang} short description is ${d.short.length} characters (max 160)`);
  assert(d.medium.length > d.short.length && d.long.length > d.medium.length, `${lang} descriptions must grow short < medium < long`);
  for (const part of Object.values(d)) assert(!/najlepsz|best |gwarancj|guarantee|100%/i.test(part), `${lang} description contains a superlative or promise: ${part.slice(0, 60)}`);
}
for (const listing of kit.listings) assert(listing.verifiedDate && /^https?:\/\//.test(listing.url), `listing ${listing.id} must be verified and have a URL`);

// 2. The same name, address and phone on the page, in the structured data and in the other published files.
const page = text(read('dane-kliniki.html'));
for (const value of [kit.name, kit.address.text, kit.phone, kit.email]) assert(page.includes(value), `/dane-kliniki is missing "${value}"`);
const home = read('index.html');
const nodes = [...home.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap((m) => { const data = JSON.parse(m[1]); return data['@graph'] ?? [data]; });
const clinic = nodes.find((node) => node.address && node.hasMap);
assert(clinic, 'home page must define the clinic node with address');
assert.equal(clinic.address.streetAddress, kit.address.streetAddress, 'schema street address must equal the kit');
assert.equal(clinic.address.postalCode, kit.address.postalCode, 'schema postal code must equal the kit');
assert.equal(clinic.address.addressLocality, kit.address.addressLocality, 'schema locality must equal the kit');
if (clinic.telephone) assert.equal(digits(clinic.telephone), digits(kit.phone), 'schema telephone must equal the kit');
const verification = read('clinic-verification.json.body');
assert(verification.includes(kit.address.streetAddress), 'clinic-verification.json address must contain the kit street address');
assert(read('llms.txt.body').includes(kit.address.streetAddress), 'llms.txt address must contain the kit street address');
for (const listing of kit.listings) assert(clinic.sameAs.includes(listing.url), `verified listing ${listing.url} must be in the clinic sameAs`);

// 3. The price dataset equals lib/pricing.ts.
const source = readFileSync('lib/pricing.ts', 'utf8');
const items = [...source.matchAll(/\{ id: "([^"]+)", label: "[^"]*", sourceLabel: "[^"]*", eur: (\d+) \}/g)].map(([, id, eur]) => ({ id, eur: Number(eur) }));
assert(items.length >= 20, 'could not read the price items from lib/pricing.ts');
const json = JSON.parse(read('dane/cennik-kliniki.json.body'));
assert.equal(json.items.length, items.length, 'dataset JSON must have every price item');
for (const item of items) assert.equal(json.items.find((row) => row.id === item.id)?.priceEur, item.eur, `dataset JSON price differs for ${item.id}`);
const csv = read('dane/cennik-kliniki.csv.body').trim().split('\n');
assert.equal(csv.length, items.length + 1, 'dataset CSV must have a header and every price item');
assert(csv[0].startsWith('id,label_pl'), 'dataset CSV header');
for (const item of items) assert(csv.some((line) => line.startsWith(`${item.id},`) && line.includes(`,${item.eur},`)), `dataset CSV row differs for ${item.id}`);
for (const path of ['dane/cennik-kliniki.csv', 'dane/cennik-kliniki.json']) assert.equal(JSON.parse(read(`${path}.meta`)).status, 200, `${path} must answer 200`);
const dataset = read('dane/cennik-kliniki.html');
assert(dataset.includes('"@type":"Dataset"') && dataset.includes('/dane/cennik-kliniki.csv') && dataset.includes('/dane/cennik-kliniki.json'), 'dataset page needs Dataset schema with both distributions');
assert(dataset.includes('"license":"https://creativecommons.org/licenses/by/4.0/"') && /"creator":\{"@type":"Organization"[^}]*"name":/.test(dataset), 'dataset schema needs a license and a typed, named creator');
assert(/nie jest cen[aą] całego leczenia/.test(text(dataset)), 'dataset page must state that item prices are not the price of the whole treatment');

// 4. Both pages are published in the sitemap.
const sitemap = read('sitemap.xml.body');
for (const path of ['/dane-kliniki', '/dane/cennik-kliniki']) assert(sitemap.includes(`<loc>${origin}${path}</loc>`), `${path} must be in the sitemap`);

console.log(`Citation checks passed: kit, schema and files agree on name, address and phone; dataset equals lib/pricing.ts (${items.length} items); ${kit.listings.length} verified listing(s).`);
