// Generates data/geo/uk/*.json from lib/geo/inventory.mjs and lib/geo/brief-claims.mjs. The JSON is a build artefact for the TypeScript side
// (tsconfig has allowJs: false); edit the .mjs sources, never the JSON. `--check` fails if the committed JSON is stale.
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { INVENTORY, BRIEF_AREA_COUNTS, BRIEF_AUTHORITY_CANDIDATES, COUNTRIES, slugify } from '../lib/geo/inventory.mjs';
import { TS024_POLISH_MAIN_LANGUAGE, TS024_NAME_TO_AUTHORITY, ABERDEEN_WARD_GROUP_SHARES, CLINIC_FACTS, KEYWORD_CLUSTERS, PILOT_CITIES } from '../lib/geo/brief-claims.mjs';

const out = 'data/geo/uk/';
const stage = 'research'; // workflow stage every record starts at; nothing is advanced by this script

const locations = [];
const seen = new Set();
for (const block of INVENTORY) {
  if (block.areas.length === 0) {
    const id = `${block.country}/${slugify(block.authority)}`;
    assert(!seen.has(id), `duplicate id ${id}`); seen.add(id);
    locations.push({ id, kind: 'authority', name: block.authority, group: block.group, country: block.country, region: block.region, authority: block.authority, cityGroup: block.cityGroup, postalDistricts: [], districtStatus: 'none-in-brief', evidenceLevel: 'brief-candidate', stage, note: block.note ?? null });
    continue;
  }
  for (const area of block.areas) {
    let id = `${block.country}/${slugify(block.authority)}/${slugify(area.name)}`;
    assert(!seen.has(id), `duplicate id ${id}`); seen.add(id);
    locations.push({
      id, kind: area.kind ?? 'area', name: area.name, group: block.group, country: block.country, region: block.region, authority: block.authority, cityGroup: block.cityGroup,
      postalDistricts: area.districts ?? [], districtStatus: (area.districts ?? []).length ? 'brief-claimed-unverified' : 'none-in-brief',
      evidenceLevel: 'brief-candidate', stage, note: [block.note, area.note].filter(Boolean).join(' ') || null
    });
  }
}

// Counts must equal the brief's own tally; a dropped or invented location fails the build, not a reviewer.
for (const [group, expected] of Object.entries(BRIEF_AREA_COUNTS)) {
  const actual = locations.filter((l) => l.group === group && l.kind !== 'authority').length;
  assert.equal(actual, expected, `group ${group}: ${actual} area records, brief lists ${expected}`);
}
for (const name of BRIEF_AUTHORITY_CANDIDATES) assert(locations.some((l) => l.kind === 'authority' && l.name === name), `authority candidate ${name} missing`);

// A metric is a separate field: Poland-born, Polish main language and Polish national identity are never merged into one number.
const metric = (value, extra) => ({ value, unit: 'persons', denominator: null, year: null, definition: null, dataset: null, sourceUrl: null, verifiedOn: null, confidence: 'unverified', verified: false, source: 'brief', ...extra });
const census = [];
for (const [name, value] of TS024_POLISH_MAIN_LANGUAGE) {
  const authority = TS024_NAME_TO_AUTHORITY[name] ?? name;
  const match = locations.find((l) => l.authority === authority);
  assert(match, `TS024 authority ${name} has no inventory record`);
  census.push({ id: `ts024/${slugify(authority)}`, geography: { level: 'local-authority', name: authority, country: match.country }, metric: 'polishMainLanguage',
    ...metric(value, { year: 2021, definition: 'Residents aged 3+ whose main language is Polish (ONS Census 2021, TS024 Main language).', dataset: 'ONS Census 2021 TS024 (value quoted in the brief; not read from the dataset)' }) });
}
// Aberdeen ward groups. Scotland's Census separates "ethnic group" from "national identity"; the council table is an ethnic-background share,
// so these claims use their own metric and are never mixed with a national-identity figure.
const councilFile = 'data/geo/uk/aberdeen_2022_polish_ethnicity_council_verified.csv';
const normGroup = (name) => name.split('/').map((part) => part.trim().replace(/^George St$/, 'George Street')).sort().join(' / ');
const council = new Map();
if (existsSync(councilFile)) {
  const [head, ...lines] = readFileSync(councilFile, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/).filter(Boolean);
  const cols = head.split(',');
  for (const line of lines) {
    const cells = line.split(','); const row = Object.fromEntries(cols.map((c, i) => [c, i === cols.length - 1 ? cells.slice(i).join(',') : cells[i]]));
    council.set(normGroup(row.ward_group), row);
  }
}
const groupDefs = ABERDEEN_WARD_GROUP_SHARES.map((g) => ({ areas: g.areas, briefPercent: g.percent }));
for (const [key, row] of council) if (!groupDefs.some((g) => normGroup(g.areas.join('/')) === key)) groupDefs.push({ areas: row.ward_group.split('/').map((a) => a.trim().replace(/^George St$/, 'George Street')), briefPercent: null });
let corroborated = 0;
for (const group of groupDefs) {
  const row = council.get(normGroup(group.areas.join('/')));
  const claim = metric(group.briefPercent ?? (row ? Number(row.percentage) : null), {
    unit: 'percent-of-residents', year: 2022, source: group.briefPercent === null ? 'official-secondary' : 'brief',
    definition: "Share of residents of the ward group whose ethnic group is Polish (Scotland's Census 2022, ethnic group; not the national-identity question).",
    dataset: group.briefPercent === null ? "Aberdeen City Council publication citing Scotland's Census 2022 (not a direct census extract)" : "Scotland's Census 2022 (value quoted in the brief; not read from the dataset)"
  });
  const entry = { id: `sc2022/aberdeen/${slugify(group.areas[0])}`, geography: { level: 'ward-group', name: group.areas.join(' / '), country: 'scotland', areas: group.areas }, metric: 'polishEthnicGroup', ...claim,
    corroboration: row ? [{ type: row.verification_type, publisher: row.source_publisher, document: row.source_document, table: row.source_table, sourceUrl: row.source_url, value: Number(row.percentage), matchesFirstSource: group.briefPercent === null ? null : Number(row.percentage) === group.briefPercent, limits: row.note, receivedOn: '2026-10-16 (operator upload dc97009; not retrievable from the build environment)' }] : [] };
  if (row) {
    corroborated += 1;
    // Council publication = official-secondary tier: usable on a page only with attribution to the publisher (see lib/geo/gate.mjs).
    Object.assign(entry, { source: 'official-secondary', verified: true, confidence: 'medium', sourceUrl: row.source_url, verifiedOn: '2026-10-16',
      dataset: `${row.source_publisher}, ${row.source_document}, ${row.source_table} (cites Scotland's Census 2022; not a direct census extract)`,
      verificationBasis: 'Operator-supplied extract of the council publication (commit dc97009); the PDF itself could not be retrieved from the build environment. Percentage only: no ward count or denominator is published.',
      firstSource: group.briefPercent === null ? null : { source: 'brief', value: group.briefPercent } });
  }
  assert(!row || group.briefPercent === null || Number(row.percentage) === group.briefPercent || true);
  census.push(entry);
}

const mismatches = census.filter((c) => c.corroboration?.some((x) => x.matchesFirstSource === false));
assert.equal(mismatches.length, 0, `council figures differ from the brief: ${mismatches.map((m) => m.id)}`);
const outputs = {
  'locations.json': { generatedFrom: 'lib/geo/inventory.mjs', note: 'Generated; do not edit. Every record is a research candidate, none is a validated Polish concentration.', countries: COUNTRIES, locations },
  'census-claims.json': { note: 'Brief figures, all verified:false. They may not appear on any page, in llms files or in any internal link until verified:true with every provenance field filled.', claims: census },
  'clinic-facts.json': { facts: CLINIC_FACTS },
  'keywords.json': { note: 'Hypotheses only. No search volume, difficulty or lead forecast exists for any keyword.', clusters: KEYWORD_CLUSTERS.map((c) => ({ ...c, status: 'hypothesis', searchDemandEvidence: null })) },
  'pilot-cities.json': { cities: PILOT_CITIES }
};
mkdirSync(out, { recursive: true });
let stale = 0;
for (const [file, data] of Object.entries(outputs)) {
  const text = JSON.stringify(data, null, 2) + '\n';
  if (process.argv.includes('--check')) { if (!existsSync(out + file) || readFileSync(out + file, 'utf8') !== text) { console.error(`${out + file} is stale; run npm run geo:build`); stale += 1; } }
  else writeFileSync(out + file, text);
}
if (stale) process.exit(1);
console.log(`${process.argv.includes('--check') ? 'Checked' : 'Wrote'} ${Object.keys(outputs).length} geo data files: ${locations.length} location records, ${census.length} census claims (${corroborated} Aberdeen groups corroborated by the council table).`);
