// Thin-content, heading, link and metadata gate for every built /uk* page (run after `next build`).
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const root = '.next/server/app/';
if (!existsSync(root + 'uk.html')) { console.log('UK quality check skipped: no build present.'); process.exit(0); }
const files = [['uk', root + 'uk.html'], ...(existsSync(root + 'uk') ? readdirSync(root + 'uk').filter((f) => f.endsWith('.html')).map((f) => ['uk/' + f.replace(/\.html$/, ''), root + 'uk/' + f]) : [])];
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const strip = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
const mainOf = (html) => strip(html).match(/<main[\s\S]*<\/main>/)?.[0] ?? '';
const text = (html) => decode(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
// Template blocks every page shares (editorial metadata, change log, sources, forms, buttons) must not count towards the doorway-similarity check.
const templateBlocks = [/<dl[\s\S]*?<\/dl>/g, /<p class="mini-label">Historia zmian<\/p><ul>[\s\S]*?<\/ul>/g, /<section[^>]*class="[^"]*\bsources\b[^"]*"[\s\S]*?<\/section>/g, /<dialog[\s\S]*?<\/dialog>/g, /<form[\s\S]*?<\/form>/g, /<button[\s\S]*?<\/button>/g];
const contentOf = (main) => templateBlocks.reduce((out, pattern) => out.replace(pattern, ' '), main);
const MIN_WORDS = (slug) => (slug === 'uk' ? 700 : 600);

const pages = files.map(([slug, file]) => {
  const raw = readFileSync(file, 'utf8');
  const main = mainOf(raw);
  const h1s = [...main.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
  const heads = [...main.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => ({ level: Number(m[1]), text: text(m[2]) }));
  return { slug, raw, main, h1s, heads, words: text(main).split(' ').filter(Boolean), contentWords: text(contentOf(main)).split(' ').filter(Boolean), title: decode(raw.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ''), description: decode(raw.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '') };
});

const shingles = (words) => { const set = new Set(); for (let i = 0; i + 5 <= words.length; i += 1) set.add(words.slice(i, i + 5).join(' ').toLowerCase()); return set; };
const similarity = (a, b) => { const sa = shingles(a.contentWords), sb = shingles(b.contentWords); let hit = 0; for (const x of sa) if (sb.has(x)) hit += 1; return hit / Math.min(sa.size, sb.size); };
const otherH1 = new Map();
for (const f of readdirSync(root).filter((x) => x.endsWith('.html') && x !== 'uk.html')) for (const m of strip(readFileSync(root + f, 'utf8')).matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)) otherH1.set(text(m[1]), f);

const report = [];
for (const page of pages) {
  const { slug } = page;
  assert.equal(page.h1s.length, 1, `${slug}: exactly one h1`);
  assert(page.words.length >= MIN_WORDS(slug), `${slug}: thin content (${page.words.length} words, need ${MIN_WORDS(slug)})`);
  const h2 = page.heads.filter((h) => h.level === 2);
  assert(h2.length >= 5, `${slug}: needs at least 5 h2 sections (has ${h2.length})`);
  assert.equal(new Set(h2.map((h) => h.text)).size, h2.length, `${slug}: duplicate h2 on the page`);
  let previous = 1;
  for (const h of page.heads) { assert(h.level <= previous + 1, `${slug}: heading level jumps from h${previous} to h${h.level} at "${h.text}"`); previous = h.level; }
  assert(page.title.length >= 20 && page.title.length <= 60, `${slug}: title length ${page.title.length}`);
  assert(page.description.length >= 100 && page.description.length <= 165, `${slug}: description length ${page.description.length}`);
  assert(!page.title.includes('[DO UZUPE') && !page.main.includes('DO UZUPE'), `${slug}: unresolved placeholder`);
  assert.equal([...pages.filter((p) => p.title === page.title)].length, 1, `${slug}: duplicate title among UK pages`);
  assert.equal([...pages.filter((p) => p.h1s[0] === page.h1s[0])].length, 1, `${slug}: duplicate h1 among UK pages`);
  assert(!otherH1.has(page.h1s[0]), `${slug}: h1 duplicates the h1 of /${otherH1.get(page.h1s[0])}`);
  const links = [...page.main.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]);
  const contextual = new Set(links.filter((l) => l !== '/kontakt'));
  assert(contextual.size >= 4, `${slug}: only ${contextual.size} contextual internal links`);
  for (const l of contextual) { const file = l === '/' ? 'index' : l.slice(1); assert(existsSync(root + file + '.html') || existsSync(root + file) || l.startsWith('/images') , `${slug}: broken internal link ${l}`); }
  if (slug !== 'uk') {
    const inbound = pages.filter((p) => p.slug !== slug && p.main.includes(`href="/${slug}"`));
    assert(inbound.length >= 2, `${slug}: only ${inbound.length} UK page(s) link to it (need 2)`);
    assert(pages.find((p) => p.slug === 'uk').main.includes(`href="/${slug}"`), `${slug}: not linked from the /uk hub`);
  }
  const hreflang = [...page.raw.matchAll(/<link[^>]*hreflang="([^"]+)"[^>]*>/gi)].map((m) => m[1]);
  assert(hreflang.length === 1 && hreflang[0] === 'pl-GB', `${slug}: expected one self-referencing pl-GB hreflang, found ${hreflang.join(',') || 'none'}`);
  report.push(`${slug}: ${page.words.length} words, ${h2.length} h2, ${contextual.size} links`);
}
for (let i = 0; i < pages.length; i += 1) for (let j = i + 1; j < pages.length; j += 1) {
  const s = similarity(pages[i], pages[j]);
  if (process.env.SHOW_SIM) console.log(pages[i].slug, pages[j].slug, (s*100).toFixed(1));
  assert(s < 0.3, `${pages[i].slug} and ${pages[j].slug} are ${(s * 100).toFixed(0)}% alike (template or doorway risk)`);
}
console.log(`UK quality passed for ${pages.length} pages: ${report.join('; ')}.`);
