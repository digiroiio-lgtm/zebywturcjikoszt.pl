// Guards the homepage section order and the single H1 in the built HTML (run after `next build`).
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const file = '.next/server/app/index.html';
if (!existsSync(file)) { console.log('Home order check skipped: no build present.'); process.exit(0); }
const html = readFileSync(file, 'utf8');
const body = html.replace(/<script[\s\S]*?<\/script>/g, '');
const shortsApproved = body.includes('patient-stories-title');

const order = [
  'id="home-gallery-title"', 'class="home-hero"', 'id="home-intent-title"', 'id="home-trust-title"', 'id="home-clinic-strip-title"', 'id="visual-proof-title"', 'id="price-highlights-title"',
  'id="polish-reviews-title"', 'id="home-treatments-title"', 'id="home-doctors-title"', ...(shortsApproved ? ['id="patient-stories-title"'] : []),
  'id="home-process-title"', 'id="home-aftercare-title"', 'id="home-lead-form"'
];
let previous = -1;
for (const marker of order) {
  const at = body.indexOf(marker);
  assert(at > -1, `home page lacks ${marker}`);
  assert(at > previous, `home section order broken at ${marker}`);
  previous = at;
}
assert.equal((body.match(/<h1[\s>]/g) || []).length, 1, 'the home page must have exactly one h1');
assert(body.includes('klinika operatora serwisu') && body.includes('prowadzi operator tego serwisu'), 'ownership disclosure missing from the home page');
// FAQ sits between the aftercare section and the form.
assert(body.indexOf('home-aftercare-title') < body.indexOf('Najczęstsze pytania') && body.indexOf('Najczęstsze pytania') < body.indexOf('id="home-lead-form"'), 'FAQ must come after aftercare and before the form');
const doctors = body.indexOf('id="home-doctors-title"'), grid = body.indexOf('home-doctor-grid');
assert(grid > doctors, 'doctor grid must be inside the doctors section');
// Sources and the editorial strip come after the form.
assert(body.indexOf('editorial-strip') > body.indexOf('id="home-lead-form"'), 'sources and the editorial strip must follow the form');
console.log(`Home order check passed: ${order.length} sections in the agreed order, one h1, ownership disclosure present${shortsApproved ? '' : ', no Shorts section'}.`);
