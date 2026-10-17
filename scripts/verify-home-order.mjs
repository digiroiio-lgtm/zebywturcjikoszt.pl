// Guards the homepage section order and the single H1 in the built HTML (run after `next build`).
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const file = '.next/server/app/index.html';
if (!existsSync(file)) { console.log('Home order check skipped: no build present.'); process.exit(0); }
const html = readFileSync(file, 'utf8');
const body = html.replace(/<script[\s\S]*?<\/script>/g, '');
const shortsApproved = body.includes('patient-stories-title');

const order = [
  'class="home-hero"', 'class="home-identity-strip"', 'id="price-highlights-title"', 'id="home-clinic-strip-title"', 'id="home-partner-title"',
  'id="polish-reviews-title"', 'id="visual-proof-title"', ...(shortsApproved ? ['id="patient-stories-title"'] : []),
  'id="home-doctors-title"', 'id="home-treatments-title"', 'id="home-travel-title"', 'id="home-reviews-title"', 'id="home-planning-title"', 'id="home-decision-title"'
];
let previous = -1;
for (const marker of order) {
  const at = body.indexOf(marker);
  assert(at > -1, `home page lacks ${marker}`);
  assert(at > previous, `home section order broken at ${marker}`);
  previous = at;
}
assert.equal((body.match(/<h1[\s>]/g) || []).length, 1, 'the home page must have exactly one h1');
assert(body.includes('Klinika prowadzona przez operatora serwisu'), 'ownership disclosure missing from the home page');
// Doctors and the clinic intro are separate sections now: the doctor grid must sit inside the doctors section only.
const doctors = body.indexOf('id="home-doctors-title"'), grid = body.indexOf('home-doctor-grid'), partner = body.indexOf('id="home-partner-title"');
assert(grid > doctors, 'doctor grid must be inside the doctors section');
assert(grid > partner && body.slice(partner, doctors).indexOf('home-doctor-grid') === -1, 'doctor grid must not remain in the clinic intro');
console.log(`Home order check passed: ${order.length} sections in the agreed order, one h1, ownership disclosure present${shortsApproved ? '' : ', no Shorts section'}.`);
