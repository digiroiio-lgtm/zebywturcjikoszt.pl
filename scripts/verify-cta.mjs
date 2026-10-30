// Guards the single main-CTA vocabulary in the built HTML (run after `next build`).
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const cta = readFileSync('lib/cta.ts', 'utf8');
for (const text of ['Otrzymaj bezpłatną wycenę', 'Wyślij zapytanie o bezpłatną wycenę', 'Wstępna wycena • Kontakt po polsku • Bez zobowiązań']) assert(cta.includes(text), `lib/cta.ts lacks "${text}"`);
const legacy = ['Poproś o bezpłatną wstępną ocenę', 'Zacznij od zapytania', 'Poznaj swoje możliwości', 'Poproś o łączną wycenę', 'Poproś o wycenę:', '>Wstępna ocena<'];
const pages = ['index', 'kontakt', 'przed-i-po', 'poradniki', 'nasz-zespol', 'koszt', 'antalya', 'opinie'];
let checked = 0;
for (const page of pages) {
  const file = `.next/server/app/${page}.html`;
  if (!existsSync(file)) continue;
  const html = readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
  checked += 1;
  for (const text of legacy) assert(!html.includes(text), `${page}: legacy CTA wording "${text}" is still present`);
}
if (checked) {
  const home = readFileSync('.next/server/app/index.html', 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
  assert(home.includes('Otrzymaj bezpłatną wycenę') && home.includes('Wstępna wycena • Kontakt po polsku • Bez zobowiązań'), 'home hero must carry the main CTA and the assurance line');
  assert(home.includes('Porozmawiaj po polsku na WhatsApp'), 'home hero must offer the Polish WhatsApp action');
  assert(home.includes('Twoja bezpłatna wstępna wycena'), 'form heading missing');
  assert(home.includes('Wyślij zapytanie o bezpłatną wycenę'), 'form submit label missing');
}

// Label <-> destination guards (the /opinie hero once said "Otrzymaj bezpłatną wycenę" but linked to /jak-wybrac-klinike).
// 1. A page record that overrides the hero href must also say what the button does (ctaText), otherwise the default quote label is shown.
readFileSync('lib/site.ts', 'utf8').split('\n').forEach((line, index) => {
  if (/\bctaHref:/.test(line)) assert(/\bctaText:/.test(line), `lib/site.ts:${index + 1}: ctaHref without ctaText (hero would show the default quote label for another destination)`);
});
// 2. In the built HTML, quote-worded links go to the contact form, an in-page form or WhatsApp; labels that name a destination keep one target.
function htmlFilesIn(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? htmlFilesIn(path.join(dir, entry.name)) : entry.name.endsWith('.html') && !entry.name.startsWith('_') ? [path.join(dir, entry.name)] : []);
}
const appDir = '.next/server/app';
if (existsSync(appDir)) {
  const quoteLabel = /^(Otrzymaj bezpłatną wycenę|Otrzymaj indywidualną wycenę|Bezpłatna wycena|Skontaktuj się z nami|Zrób pierwszy krok: bezpłatna wycena|Poproś o .*wycen.*|Zapytaj o .*(wycen|koszt|plan|kwalifikację|możliwości).*)$/;
  const quoteTarget = /^(\/kontakt(#assessment-form)?|#[a-z-]*form|https:\/\/wa\.me\/\d+\?.*)$/;
  const singleTarget = new Map([['Bezpłatna wycena', new Set()], ['Zobacz ceny leczenia', new Set()]]);
  let links = 0;
  for (const file of htmlFilesIn(appDir)) {
    const html = readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
    for (const [, href, inner] of html.matchAll(/<a\s[^>]*?href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)) {
      const label = inner.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      links += 1;
      if (quoteLabel.test(label)) assert(quoteTarget.test(href.replace(/&amp;/g, '&')), `${file}: "${label}" links to ${href}, not to the contact form`);
      if (href.startsWith('/')) singleTarget.get(label)?.add(href); // in-page form anchors (home) are intentional
    }
  }
  // 3. WhatsApp buttons use the standard wording (lib/cta.ts); the accessible name always contains the visible text.
  const cta = readFileSync('lib/cta.ts', 'utf8');
  const standard = ['WHATSAPP_CTA', 'WHATSAPP_CTA_SHORT', 'WHATSAPP_HERO_CTA'].map((name) => cta.match(new RegExp(`${name} = "([^"]+)"`))?.[1]);
  assert(standard.every(Boolean), 'lib/cta.ts must define WHATSAPP_CTA, WHATSAPP_CTA_SHORT and WHATSAPP_HERO_CTA');
  const [waStandard, waShort, waHero] = standard;
  let waLinks = 0;
  for (const file of htmlFilesIn(appDir)) {
    const html = readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
    for (const [, attrs, inner] of html.matchAll(/<a\s([^>]*?href="https:\/\/wa\.me\/[^"]*"[^>]*)>([\s\S]*?)<\/a>/g)) {
      const label = inner.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      const aria = attrs.match(/aria-label="([^"]*)"/)?.[1];
      waLinks += 1;
      assert([waStandard, waShort, waHero].includes(label), `${file}: WhatsApp button "${label}" is not one of the standard labels`);
      if (aria) assert(aria.includes(label), `${file}: accessible name "${aria}" must contain the visible text "${label}"`);
    }
  }
  assert(waLinks > 0, 'no WhatsApp buttons found in the built pages');
  for (const [label, targets] of singleTarget) assert(targets.size <= 1, `"${label}" has several targets: ${[...targets].join(', ')}`);
  assert.deepEqual([...singleTarget.get('Bezpłatna wycena')], ['/kontakt#assessment-form'], '"Bezpłatna wycena" must go to /kontakt#assessment-form everywhere');
  assert.deepEqual([...singleTarget.get('Zobacz ceny leczenia')], ['/koszt#cennik'], '"Zobacz ceny leczenia" must go to /koszt#cennik everywhere');
  console.log(`CTA label/target checks passed (${links} links).`);
}
console.log(`CTA wording checks passed (${checked} built page(s)).`);
