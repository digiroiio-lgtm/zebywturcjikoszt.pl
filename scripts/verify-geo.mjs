// Guards the UK geo-content system. Data checks run on the generated JSON, gate checks use fixtures against the same gate the site uses,
// and output checks (after `next build`) prove that nothing unpublished reaches routes, the sitemap, llms files, links or schema.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { gateProblems, claimIsPublishable } from '../lib/geo/gate.mjs';
import { score, WEIGHTS } from '../lib/geo/scoring.mjs';
import { BRIEF_AREA_COUNTS, BRIEF_AUTHORITY_CANDIDATES } from '../lib/geo/inventory.mjs';
import { INVENTORY } from '../lib/geo/inventory.mjs';

const json = (file) => JSON.parse(readFileSync('data/geo/uk/' + file, 'utf8'));
const { locations, countries } = json('locations.json');
const { claims } = json('census-claims.json');
const workflow = json('workflow.json');
const { pages } = json('pages.json');
const { facts } = json('clinic-facts.json');
const { clusters } = json('keywords.json');
const failures = [];
const fail = (m) => failures.push(m);
const expectFail = (label, fn) => { try { fn(); } catch { return; } fail(`negative test did not fail: ${label}`); };

// 1. Location universe: nothing from the brief is lost, nothing is invented, every record is a candidate.
for (const [group, expected] of Object.entries(BRIEF_AREA_COUNTS)) {
  const actual = locations.filter((l) => l.group === group && l.kind !== 'authority').length;
  if (actual !== expected) fail(`group ${group}: ${actual} area records, brief has ${expected}`);
}
for (const name of BRIEF_AUTHORITY_CANDIDATES) if (!locations.some((l) => l.kind === 'authority' && l.name === name)) fail(`authority candidate ${name} missing`);
const inventoryAreas = INVENTORY.reduce((n, b) => n + b.areas.length, 0);
if (locations.filter((l) => l.kind !== 'authority').length !== inventoryAreas) fail('locations.json is out of step with lib/geo/inventory.mjs (run npm run geo:build)');
if (new Set(locations.map((l) => l.id)).size !== locations.length) fail('duplicate location ids');
for (const l of locations) {
  if (l.evidenceLevel !== 'brief-candidate') fail(`${l.id}: evidenceLevel ${l.evidenceLevel} without a verification record`);
  if (l.districtStatus === 'verified') fail(`${l.id}: postal districts marked verified but no ONSPD check exists`);
  if (!countries.some((c) => c.id === l.country)) fail(`${l.id}: unknown country`);
  if (l.kind === 'landmark' && claims.some((c) => c.geography.name === l.name)) fail(`${l.id}: a landmark carries a population claim`);
}
if (!locations.some((l) => l.kind === 'landmark' && l.name.startsWith('Polish Social and Cultural Association'))) fail('POSK must be kept as a landmark record');
const aberdeen = locations.filter((l) => l.cityGroup === 'aberdeen');
if (aberdeen.length !== 24 || aberdeen.some((l) => l.postalDistricts.length)) fail('Aberdeen must have 24 areas and no invented postal districts');

// 2. Demographic claims: separate metrics, none verified without full provenance, none mixing definitions.
for (const c of claims) {
  if (!['polandBorn', 'polishMainLanguage', 'polishNationalIdentity', 'polishEthnicGroup'].includes(c.metric)) fail(`${c.id}: unknown metric ${c.metric}`);
  if (c.verified && !claimIsPublishable(c)) fail(`${c.id}: verified:true without full provenance`);
  if (c.verified && !['official', 'official-secondary'].includes(c.source)) fail(`${c.id}: a ${c.source} claim cannot be verified`);
  for (const x of c.corroboration ?? []) if (x.matchesFirstSource === false) fail(`${c.id}: council value ${x.value} differs from the first source`);
  if (c.source === 'brief' && c.verified) fail(`${c.id}: a brief figure cannot be marked verified`);
}
if (new Set(claims.map((c) => c.id)).size !== claims.length) fail('duplicate claim ids');

// 3. Clinic facts and keywords.
for (const f of facts) if (f.status === 'verified' && /Brief only/.test(f.evidence)) fail(`clinic fact ${f.id} is verified on the brief alone`);
for (const k of clusters) if (k.status !== 'hypothesis' || k.searchDemandEvidence) fail(`keyword cluster ${k.id}: demand evidence needs a dated source and a reviewed change`);

// 4. Scoring: no total without every verified input; weights sum to 100.
if (Object.values(WEIGHTS).reduce((a, b) => a + b, 0) !== 100) fail('scoring weights must total 100');
if (score({}).total !== null || score({}).status !== 'yetersiz veri') fail('score() must not produce a total without inputs');
if (score({ demographic: 80, searchDemand: 70, commercialIntent: 60, existingOrganic: 50, logistics: 40, differentiation: 30 }).total === null) fail('score() should total when every input exists');
if (score({ demographic: 80 }).coveragePercent !== 25) fail('score() coverage is wrong');
expectFail('score rejects out-of-range input', () => { try { score({ demographic: 120 }); } catch { throw new Error('ok'); } assert.fail('accepted'); });

// 5. Publication gate with fixtures (positive and negative).
const verifiedClaim = { id: 'x', verified: true, source: 'official', value: 1, denominator: 2, year: 2021, definition: 'd', dataset: 'ds', sourceUrl: 'https://example.org', verifiedOn: '2026-01-01' };
const full = { slug: 'uk/test', kind: 'city', locationIds: ['a'], stage: 'published', title: 't', description: 'd', demographicClaims: ['x'], uniqueContentEvidence: 'e', searchDemandEvidence: { source: 's', date: '2026-01-01' }, editorialApproval: { by: 'a', on: '2026-01-01' }, clinicalReview: { reviewer: 'r', on: '2026-01-01', approvalReference: 'ref' }, canonicalPath: '/uk/test', approvedBy: 'me', approvedOn: '2026-01-01', publishedOn: '2026-01-02', content: {} };
if (gateProblems(full, workflow, [verifiedClaim]).length) fail('a fully gated fixture should pass the gate');
for (const field of ['uniqueContentEvidence', 'searchDemandEvidence', 'editorialApproval', 'clinicalReview', 'canonicalPath', 'approvedBy', 'content']) {
  const broken = { ...full }; delete broken[field];
  if (!gateProblems(broken, workflow, [verifiedClaim]).length) fail(`the gate accepted a published record without ${field}`);
}
if (!gateProblems(full, workflow, [{ ...verifiedClaim, verified: false }]).length) fail('the gate accepted an unverified census claim');
if (!gateProblems(full, workflow, [{ ...verifiedClaim, source: 'brief' }]).length) fail('the gate accepted a brief-sourced claim');
const secondary = { ...verifiedClaim, source: 'official-secondary', denominator: null, verificationBasis: 'b', corroboration: [{ publisher: 'Council', document: 'Doc', sourceUrl: 'https://example.org' }] };
if (gateProblems(full, workflow, [secondary]).length) fail('an official-secondary claim with publisher, document, URL and basis should pass');
for (const [what, change] of [['verificationBasis', { verificationBasis: null }], ['publisher', { corroboration: [{ document: 'Doc', sourceUrl: 'https://example.org' }] }], ['sourceUrl', { sourceUrl: null }], ['verified', { verified: false }], ['year', { year: null }]]) {
  if (!gateProblems(full, workflow, [{ ...secondary, ...change }]).length) fail(`the gate accepted an official-secondary claim without ${what}`);
}
if (!gateProblems(full, workflow, [{ ...verifiedClaim, sourceUrl: null }]).length) fail('the gate accepted a claim without a source URL');
if (!gateProblems(full, workflow, []).length) fail('the gate accepted a claim id that does not exist');
if (gateProblems({ ...full, stage: 'research', demographicClaims: [] }, workflow, []).length) fail('a research-stage record needs nothing');

// 6. Real records: published ones must pass every gate and contain no forbidden claim language.
const forbidden = [/gwarantowan/i, /bez b[óo]lu/i, /bezb[óo]lesn/i, /100\s?%\s*(skuteczn|sukces)/i, /najlepsz\w+ klinik/i, /klinika w (londynie|anglii|wielkiej brytanii)/i, /oddzia[łl] w (londynie|uk)/i, /kredyt|rat(y|ach)\b|APR/i];
for (const r of pages) {
  const problems = gateProblems(r, workflow, claims);
  if (r.stage === 'published' && problems.length) fail(`published record ${r.slug}: ${problems.join('; ')}`);
  const text = JSON.stringify(r.content ?? {});
  if (r.stage === 'published' && /DO UZUPE/.test(text)) fail(`${r.slug}: unresolved [DO UZUPEŁNIENIA] placeholder`);
  for (const re of forbidden) if (re.test(text)) fail(`${r.slug}: forbidden wording ${re}`);
  // Publication dates come from the gate (publishedOn), never from draft content; stage and date must not be mixed up.
  if (r.content && ('published' in r.content || 'lastUpdated' in r.content)) fail(`${r.slug}: content carries its own published/lastUpdated; the date comes from publishedOn`);
  if (r.stage !== 'published' && r.publishedOn) fail(`${r.slug}: publishedOn set on a ${r.stage} record`);
  const bodyText = JSON.stringify({ ...(r.content ?? {}), sources: undefined }); // attribution must be in the prose, not only the source list
  for (const id of r.demographicClaims ?? []) {
    const claim = claims.find((c) => c.id === id);
    if (!claimIsPublishable(claim)) fail(`${r.slug}: demographic claim ${id} is not publishable`);
    else if (claim.source === 'official-secondary' && !bodyText.includes(claim.corroboration[0].publisher)) fail(`${r.slug}: claim ${id} is official-secondary; the text must name ${claim.corroboration[0].publisher}`);
    else if (!bodyText.includes(String(claim.value).replace('.', ',')) ) fail(`${r.slug}: claim ${id} is listed but its value ${claim.value} is not in the text`);
  }
  // No figure may appear in prose unless it belongs to a listed, publishable claim (stops unverified numbers for other cities).
  const allowedValues = new Set((r.demographicClaims ?? []).map((id) => String(claims.find((c) => c.id === id)?.value).replace('.', ',')));
  for (const m of bodyText.matchAll(/(\d+(?:,\d+)?)\s?%/g)) if (!allowedValues.has(m[1])) fail(`${r.slug}: percentage ${m[0]} is not backed by a listed demographic claim`);
  for (const m of bodyText.matchAll(/\d{1,3}(?:[ .\u00a0]\d{3})+\s+(?:Polak|osób|mieszkańc|os\.)/g)) fail(`${r.slug}: population figure "${m[0]}" in prose`);
  for (const ref of [...(r.relatedSlugs ?? []), ...(r.foldInto ? [r.foldInto] : [])]) if (!pages.some((x) => x.slug === ref)) fail(`${r.slug}: references unknown record ${ref}`);
  // Location and claim links must exist in the generated dataset.
  const locIds = new Set(locations.map((l) => l.id));
  for (const id of [...(r.locationIds ?? []), ...(r.focusLocationIds ?? [])]) if (!locIds.has(id)) fail(`${r.slug}: unknown location id ${id}`);
  for (const id of r.focusLocationIds ?? []) if (!(r.locationIds ?? []).includes(id)) fail(`${r.slug}: focus location ${id} is not in locationIds`);
  for (const id of r.pendingClaimIds ?? []) if (!claims.some((c) => c.id === id)) fail(`${r.slug}: unknown claim id ${id}`);
  if (r.stage !== 'research' && !(r.locationIds ?? []).length) fail(`${r.slug}: a record past research needs locationIds`);
  if (!/^uk\/[a-z0-9-]+$/.test(r.slug)) fail(`${r.slug}: geo pages live under /uk/<slug>`);
}

// 7. Output checks (only when a build exists).
const root = '.next/server/app/';
if (existsSync(root + 'sitemap.xml.body')) {
  const sitemap = readFileSync(root + 'sitemap.xml.body', 'utf8');
  const published = new Set(pages.filter((r) => r.stage === 'published' && !gateProblems(r, workflow, claims).length).map((r) => r.slug));
  const geoSlugs = new Set([...locations.map((l) => l.cityGroup), ...countries.map((c) => c.slug)]);
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith('.html') ? [path.join(dir, e.name)] : []));
  const htmlFiles = walk(root).filter((f) => !path.basename(f).startsWith('_'));
  const urlSlugs = [...sitemap.matchAll(/<loc>https:\/\/[^/]+\/uk\/([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const slug of urlSlugs) if (geoSlugs.has(slug) && !published.has('uk/' + slug)) fail(`sitemap lists unpublished geo page /uk/${slug}`);
  const llms = readFileSync(root + 'llms-full.txt.body', 'utf8') + readFileSync(root + 'llms.txt.body', 'utf8');
  for (const slug of geoSlugs) if (!published.has('uk/' + slug) && llms.includes(`/uk/${slug}`)) fail(`llms files mention unpublished geo page /uk/${slug}`);
  let links = 0;
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    if (/hreflang=/i.test(html)) fail(`${file}: hreflang found; geo pages are single-language and have no reciprocal alternates`);
    for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      const body = m[1];
      if (/"addressCountry":"GB"|"addressCountry":"UK"|"addressCountry":"United Kingdom"/i.test(body) && /Dentist|MedicalClinic/.test(body)) fail(`${file}: a clinic schema with a UK address`);
    }
    for (const m of html.matchAll(/href="\/uk\/([a-z0-9-]+)"/g)) { links += 1; if (geoSlugs.has(m[1]) && !published.has('uk/' + m[1])) fail(`${file}: link to unpublished geo page /uk/${m[1]}`); }
    if (/data-geo-preview/.test(html)) fail(`${file}: preview markup in the production build`);
  }
  for (const slug of geoSlugs) if (!published.has('uk/' + slug) && existsSync(`${root}uk/${slug}.html`)) fail(`unpublished geo page /uk/${slug} was prerendered`);
  var outputNote = `${htmlFiles.length} built pages: no unpublished geo route, sitemap or llms entry, ${links} /uk links checked, no hreflang, no UK clinic schema`;
} else var outputNote = 'no build present, output checks skipped';

if (failures.length) { console.error(`Geo check failed with ${failures.length} issue(s):`); for (const f of failures.slice(0, 40)) console.error('- ' + f); process.exit(1); }
console.log(`Geo check passed: ${locations.length} location records match the brief's tally, ${claims.length} census claims (${claims.filter((c) => c.verified).length} verified), ${pages.length} geo page records (${pages.filter((r) => r.stage === 'published').length} published); gate fixtures and scoring pass; ${outputNote}.`);
