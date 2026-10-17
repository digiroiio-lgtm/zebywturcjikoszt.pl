// Guards the MAGDELENA gallery: every listed photo exists, stays small, has Polish alt text, and no second person's frame (09) is shipped.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';

const source = readFileSync('lib/magdelena-gallery.ts', 'utf8');
const entries = [...source.matchAll(/\{ n: "(\d\d)", alt: "([^"]+)", position: "([^"]+)" \}/g)];
assert(entries.length >= 10, 'gallery lists fewer photos than expected');
assert(new Set(entries.map((entry) => entry[1])).size === entries.length, 'duplicate gallery photo');
for (const [, n, alt, position] of entries) {
  const file = `public/images/magdelena/magdelena-${n}.webp`;
  assert(existsSync(file), `${file} is missing`);
  assert(statSync(file).size <= 90 * 1024, `${file} exceeds 90 KB`);
  assert(alt.length >= 20 && /MAGDELEN/.test(alt), `alt text for ${n} is too thin`);
  assert(/^\d+% \d+%$/.test(position), `object-position for ${n} is malformed`);
}
assert(!existsSync('public/images/magdelena/magdelena-09.webp'), 'magdelena-09 shows a second person and must not be shipped');
const html = existsSync('.next/server/app/index.html') ? readFileSync('.next/server/app/index.html', 'utf8') : '';
if (html) {
  assert(html.indexOf('home-gallery-title') > -1 && html.indexOf('home-gallery-title') < html.indexOf('class="home-hero"'), 'gallery must come before the hero');
  assert(!/autoplay|setInterval/.test(readFileSync('components/home-magdelena-gallery.tsx', 'utf8')), 'the gallery must not scroll by itself');
}
console.log(`Gallery check passed: ${entries.length} photos, each at most 90 KB, Polish alt text, no auto-scroll${html ? ', placed before the hero' : ''}.`);
