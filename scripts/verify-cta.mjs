// Guards the single main-CTA vocabulary in the built HTML (run after `next build`).
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

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
console.log(`CTA wording checks passed (${checked} built page(s)).`);
