// Guards the single price source (lib/pricing.ts) against the published output: pages, JSON-LD and the AI-readable files.
// Run after `next build`. Every EUR/PLN figure on the site must be a price item, or an arithmetic subtotal of price items.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = '.next/server/app/';
const src = readFileSync('lib/pricing.ts', 'utf8');
const items = [...src.matchAll(/\{ id: "([^"]+)", label: "([^"]+)", sourceLabel: "[^"]*", eur: (\d+) \}/g)].map((m) => ({ id: m[1], label: m[2], eur: Number(m[3]) }));
const rate = Number(src.match(/EUR_PLN_RATE = ([\d.]+);/)[1]);
const rateTimestamp = src.match(/EUR_PLN_RATE_TIMESTAMP = "([^"]+)"/)[1];
assert(items.length >= 20, `price items were not parsed from lib/pricing.ts (${items.length})`);
const toPln = (eur) => Math.round(Math.round(eur * rate * 100) / 100); // same rounding as lib/pricing.ts
const failures = [];
const fail = (message) => failures.push(message);

// Figures that may appear in text: one item, a sum of two items, or n identical items (the "przykładowe sumy" tables).
const allowedEur = new Set(items.map((item) => item.eur));
for (const a of items) for (const b of items) allowedEur.add(a.eur + b.eur);
for (const item of items) for (let n = 2; n <= 12; n += 1) allowedEur.add(item.eur * n);
const allowedPln = new Set([...allowedEur].map(toPln));

const text = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|[  ]/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const pages = [];
(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) walk(path.join(dir, entry.name));
    else if (entry.name.endsWith('.html') && !entry.name.startsWith('_')) pages.push(path.join(dir, entry.name));
  }
})(root);
const route = (file) => '/' + path.relative(root, file).replace(/\.html$/, '').replace(/^index$/, '');

// 1. /koszt structured data lists every item with its EUR price.
const koszt = readFileSync(root + 'koszt.html', 'utf8');
const itemList = [...koszt.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1])).flatMap((d) => d['@graph'] ?? [d]).find((node) => node['@type'] === 'ItemList');
assert(itemList, '/koszt has no ItemList structured data');
const offers = new Map(itemList.itemListElement.map((entry) => [entry.item.name, entry.item]));
if (offers.size !== items.length) fail(`/koszt ItemList has ${offers.size} offers, lib/pricing.ts has ${items.length} items`);
for (const item of items) {
  const offer = offers.get(item.label);
  if (!offer) fail(`/koszt ItemList is missing "${item.label}"`);
  else if (offer.price !== item.eur.toFixed(2) || offer.priceCurrency !== 'EUR') fail(`/koszt ItemList: "${item.label}" is ${offer.price} ${offer.priceCurrency}, price list says ${item.eur} EUR`);
}

// 2. llms-full.txt carries the same table, with PLN at the same rate.
const full = readFileSync(root + 'llms-full.txt.body', 'utf8');
const rows = new Map([...full.matchAll(/^\| (.+?) \| (\d+\.\d{2}) \| (\d+) \|$/gm)].map((m) => [m[1], { eur: Number(m[2]), pln: Number(m[3]) }]));
for (const item of items) {
  const row = rows.get(item.label);
  if (!row) fail(`llms-full.txt price table is missing "${item.label}"`);
  else if (row.eur !== item.eur || row.pln !== toPln(item.eur)) fail(`llms-full.txt: "${item.label}" is ${row.eur} EUR / ${row.pln} PLN, expected ${item.eur} / ${toPln(item.eur)}`);
}

// 3. Every EUR / PLN figure in pages and AI-readable files is a price item or a subtotal of price items; the rate is stated with its date.
const ymd = rateTimestamp.slice(0, 10).split('-');
const dateForms = [`${ymd[2]}.${ymd[1]}.${ymd[0]}`, rateTimestamp.slice(0, 10)];
const eurPattern = /(\d{1,3}(?: \d{3})+|\d+)(?:[.,]\d+)?\s*(?:EUR|€)/g;
const plnPattern = /(\d{1,3}(?: \d{3})+|\d+)(?:[.,]\d+)?\s*(?:PLN|zł)/g;
const sources = [...pages.map((file) => [route(file), text(readFileSync(file, 'utf8'))]), ['/llms.txt', readFileSync(root + 'llms.txt.body', 'utf8').replace(/[\u00a0\u202f]/g, ' ')], ['/llms-full.txt', full.replace(/^\|.*\|$/gm, '').replace(/[\u00a0\u202f]/g, ' ')]];
let figures = 0;
for (const [name, body] of sources) {
  const figuresText = body.replace(/1 EUR = \d+[.,]\d+ (?:PLN|GBP)/g, ''); // the rate sentence itself is not a price
  for (const m of figuresText.matchAll(eurPattern)) {
    const amount = Number(m[1].replace(/ /g, ''));
    if (amount === 1) continue; // "1 EUR = 4,37 PLN"
    figures += 1;
    if (!allowedEur.has(amount)) fail(`${name}: ${amount} EUR is neither a price item nor a subtotal of price items`);
  }
  for (const m of figuresText.matchAll(plnPattern)) {
    const amount = Number(m[1].replace(/ /g, ''));
    figures += 1;
    if (!allowedPln.has(amount)) fail(`${name}: ${amount} PLN does not match any price item or subtotal at 1 EUR = ${rate} PLN`);
  }
  for (const m of body.matchAll(/1 EUR = (\d+[.,]\d+) PLN/g)) if (Number(m[1].replace(',', '.')) !== rate) fail(`${name}: states 1 EUR = ${m[1]} PLN, lib/pricing.ts has ${rate}`);
  const showsPln = [...body.matchAll(plnPattern)].length > 0;
  if (showsPln && name !== '/llms.txt' && !(new RegExp(`1 EUR = ${String(rate).replace('.', '[.,]')}0? PLN`).test(body) || /Orientacyjny kurs: 1 EUR = /.test(body))) fail(`${name}: shows PLN without stating the exchange rate`);
  if (showsPln && name !== '/llms.txt' && !dateForms.some((d) => body.includes(d)) && !body.includes(`${Number(ymd[2])} września ${ymd[0]}`)) fail(`${name}: shows PLN without the date of the exchange rate (${dateForms[0]})`);
}

if (failures.length) {
  console.error(`Price consistency failed with ${failures.length} issue(s):`);
  for (const failure of failures.slice(0, 40)) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Price check passed: ${items.length} items in lib/pricing.ts match /koszt structured data and the llms-full.txt table (EUR and PLN at ${rate}); ${figures} EUR/PLN figures on ${pages.length} pages and the AI files are price items or subtotals; the rate and its date (${dateForms[0]}) accompany every PLN figure.`);
