// Guards the WhatsApp contact layout: number, message encoding, one widget of each kind, price-page CTA (run after `next build`).
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const lib = readFileSync('lib/whatsapp.ts', 'utf8');
assert(lib.includes('"905353998999"'), 'WhatsApp number must be 905353998999');
assert(lib.includes('URLSearchParams'), 'message must be encoded with URLSearchParams');
assert(!/24\/7|całą dobę|w ciągu \d+ (minut|godzin)/i.test(lib), 'no unverified response-time or 24/7 claims');
assert(!/campaign|Kampania/i.test(lib), 'general WhatsApp messages must not carry campaign text');
for (const c of ['components/hero-whatsapp.tsx', 'components/treatment-whatsapp-cta.tsx', 'components/mobile-assessment-bar.tsx']) assert(!/campaign/i.test(readFileSync(c, 'utf8')), `${c}: WhatsApp buttons must not use the active campaign`);
const css = readFileSync('app/globals.css', 'utf8');
assert(css.includes('body:has(dialog[open]) .whatsapp-floating'), 'widgets must hide while a dialog is open');

const htmlFile = '.next/server/app/implanty.html';
if (!existsSync(htmlFile)) { console.log('WhatsApp build checks skipped: no build present.'); process.exit(0); }
for (const [file, expectCta] of [['.next/server/app/implanty.html', true], ['.next/server/app/index.html', false]]) {
  const body = readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
  assert.equal((body.match(/class="mobile-assessment-bar"/g) || []).length <= 1, true, `${file}: duplicate mobile bar`);
  assert.equal((body.match(/class="whatsapp-floating"/g) || []).length, 1, `${file}: exactly one floating button`);
  assert.equal(body.includes('treatment-whatsapp'), expectCta, `${file}: treatment CTA presence`);
  assert(!/Hollywood|Kampania|%C2%A3|£/.test(decodeURIComponent(body.match(/wa\.me\/\d+\?text=[^"']*/g)?.join(' ') ?? '').replace(/\+/g, ' ')), `${file}: wa.me link carries campaign or GBP text`);
  assert(body.includes('https://wa.me/905353998999?text=Dzie%C5%84+dobry'), `${file}: encoded Polish wa.me link missing`);
}
console.log('WhatsApp layout checks passed.');
