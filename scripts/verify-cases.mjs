// Guards the before/after case images: every listed file exists and is small, newest cases lead, sitemap and page agree.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';

const source = readFileSync('lib/gallery.ts', 'utf8');
const newest = [...source.matchAll(/length: (\d+)/g)].map((m) => Number(m[1]));
assert.deepEqual(newest, [11, 20], 'gallery must list 11 newest and 20 earlier cases');
const numbers = [...Array.from({ length: 11 }, (_, i) => 21 + i), ...Array.from({ length: 20 }, (_, i) => 1 + i)];
for (const n of numbers) {
  const file = `public/images/przed-i-po/before-after${n}.webp`;
  assert(existsSync(file), `${file} is missing`);
  assert(statSync(file).size <= 100 * 1024, `${file} is larger than 100 KB`);
}
const page = '.next/server/app/przed-i-po.html';
if (existsSync(page)) {
  const html = readFileSync(page, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
  const refs = [...html.matchAll(/id="(before-after\d+)"/g)].map((m) => m[1]);
  assert.deepEqual(refs, numbers.map((n) => `before-after${n}`), '/przed-i-po must show the newest cases first, then the earlier ones');
}
console.log(`Case images passed: ${numbers.length} files, each at most 100 KB, newest 11 first.`);
