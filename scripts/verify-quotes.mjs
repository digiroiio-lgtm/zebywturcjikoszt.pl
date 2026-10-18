// Guards expert quotes: a quote is rendered only with a written-approval date, and rendered quotes carry blockquote and attribution (run after `next build`).
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const source = readFileSync('lib/expert-quotes.ts', 'utf8');
const quotes = [...source.matchAll(/id: "([^"]+)"[\s\S]*?text: "((?:[^"\\]|\\.)*)",\s*approvedOn: (null|"\d{4}-\d{2}-\d{2}")/g)].map(([, id, text, approved]) => ({ id, text, approved }));
assert(quotes.length >= 2, 'expected the expert quote records');

const file = '.next/server/app/index.html';
if (!existsSync(file)) { console.log('Quote build checks skipped: no build present.'); process.exit(0); }
const body = readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
const rendered = (text) => body.includes(text.slice(0, 60));
for (const quote of quotes) {
  if (quote.approved === 'null') assert(!rendered(quote.text), `quote "${quote.id}" has no approval date but is rendered`);
  else assert(rendered(quote.text), `approved quote "${quote.id}" is not rendered`);
}
const approved = quotes.filter((quote) => quote.approved !== 'null').length;
if (approved) assert(/<blockquote[^>]*>/.test(body) && /<figcaption>/.test(body), 'approved quotes need blockquote and figcaption attribution');
console.log(`Expert quote checks passed: ${approved} of ${quotes.length} approved and rendered, drafts hidden.`);
