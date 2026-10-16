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
for (const group of ABERDEEN_WARD_GROUP_SHARES) {
  census.push({ id: `sc2022/aberdeen/${slugify(group.areas[0])}`, geography: { level: 'ward-group', name: group.areas.join(' / '), country: 'scotland' }, metric: 'polishNationalIdentity',
    ...metric(group.percent, { unit: 'percent-of-residents', year: 2022, definition: "Share of residents reporting Polish ethnic identity (Scotland's Census 2022); the brief says \"to be revalidated\".", dataset: "Scotland's Census 2022 (value quoted in the brief; not read from the dataset)" }) });
}

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
console.log(`${process.argv.includes('--check') ? 'Checked' : 'Wrote'} ${Object.keys(outputs).length} geo data files: ${locations.length} location records, ${census.length} unverified census claims.`);
