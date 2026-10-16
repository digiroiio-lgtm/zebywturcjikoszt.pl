// Imports official census tables from data/geo/uk/raw/*.csv and compares them with the brief's figures. Does not touch census-claims.json:
// it writes data/geo/uk/census-imported.json and docs/geo-uk/02-source-verification.md. With no CSV present it reports every claim as unverified.
// CSV header: geography,metric,value,denominator,year,definition,dataset,sourceUrl,verifiedOn   (metric: polandBorn|polishMainLanguage|polishNationalIdentity)
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
const dir = 'data/geo/uk/raw/';
const claims = JSON.parse(readFileSync('data/geo/uk/census-claims.json', 'utf8')).claims;
const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.csv')) : [];
const header = ['geography', 'metric', 'value', 'denominator', 'year', 'definition', 'dataset', 'sourceUrl', 'verifiedOn'];
const rows = [];
for (const file of files) {
  const [first, ...lines] = readFileSync(dir + file, 'utf8').split(/\r?\n/).filter(Boolean);
  if (first.split(',').map((c) => c.trim()).join() !== header.join()) { console.error(`${file}: unexpected header, expected ${header.join(',')}`); process.exit(1); }
  for (const line of lines) { const cells = line.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map((c) => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"')); rows.push(Object.fromEntries(header.map((h, i) => [h, cells[i] ?? '']))); }
}
const result = claims.map((claim) => {
  const row = rows.find((r) => r.geography === claim.geography.name && r.metric === claim.metric);
  if (!row) return { id: claim.id, geography: claim.geography.name, brief: claim.value, official: null, status: 'unverified (no official row)' };
  const official = Number(row.value);
  return { id: claim.id, geography: claim.geography.name, brief: claim.value, official, status: official === claim.value ? 'match' : 'differs', row };
});
const count = (s) => result.filter((r) => r.status === s).length;
writeFileSync('data/geo/uk/census-imported.json', JSON.stringify({ files, result }, null, 2) + '\n');
mkdirSync('docs/geo-uk', { recursive: true });
writeFileSync('docs/geo-uk/02-source-verification.md', [
  '# Census source verification', '',
  files.length ? `Official files read: ${files.join(', ')}.` : 'No official file is present in `data/geo/uk/raw/`, so **no claim is verified against a direct official extract**. (13 Aberdeen claims are verified at the *official-secondary* tier through a council publication; see the last section.) The official sources could not be reached from the build environment (proxy), so the brief\'s figures stay `verified:false`.', '',
  `Claims: ${result.length}. Match: ${count('match')}. Differs: ${count('differs')}. Without a direct official row: ${result.length - count('match') - count('differs')}.`, '',
  '| Claim | Geography | Brief | Official | Status |', '| --- | --- | ---: | ---: | --- |', ...result.map((r) => `| ${r.id} | ${r.geography} | ${r.brief} | ${r.official ?? ''} | ${r.status} |`), '',
  '## Aberdeen ward groups: corroboration by a council publication', '',
  "Aberdeen City Council's *Local Housing Strategy Evidence Base*, table 4-5.9 (percentages citing Scotland's Census 2022; no ward counts or denominators; file supplied by the operator, the PDF could not be retrieved from the build environment). Corroboration never sets `verified`.", '',
  '| Claim | Ward group | First source | Council table | Agrees |', '| --- | --- | ---: | ---: | --- |',
  ...claims.filter((c) => c.id.startsWith('sc2022/aberdeen/')).map((c) => `| ${c.id} | ${c.geography.name} | ${c.source === 'brief' ? c.value : '–'} | ${c.corroboration?.[0]?.value ?? '–'} | ${c.corroboration?.[0]?.matchesFirstSource === null ? 'council only (new group)' : c.corroboration?.[0] ? 'yes' : 'no council row'} |`), '',
  'Three groups (Lower Deeside, Hazlehead / Queens Cross / Countesswells, Airyhall / Broomhill / Garthdee) exist only in the council table and have no record in the 24-area Aberdeen inventory yet.', '',
  'A match does not publish anything: a human must set `verified:true`, `source:"official"` and fill every provenance field in `data/geo/uk/census-claims.json` (via a reviewed change).', ''
].join('\n'));
console.log(`Census import: ${files.length} file(s), ${count('match')} match, ${count('differs')} differ, ${result.length - count('match') - count('differs')} unverified.`);
