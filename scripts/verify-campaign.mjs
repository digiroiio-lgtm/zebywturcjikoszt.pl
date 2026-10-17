// Guards the campaign popup rules and the lead pipeline's campaign field (source-level; behaviour is covered by browser checks).
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const popup = readFileSync('components/campaign-popup.tsx', 'utf8');
assert(/MIN_SECONDS = 20/.test(popup) && /MIN_SCROLL = 0\.35/.test(popup), 'popup needs 20 s and 35 % scroll');
assert(/SNOOZE_MS = 7 \* 24 \* 60 \* 60 \* 1000/.test(popup), 'popup must snooze for 7 days');
assert(popup.includes('POPUP_SHOWN_KEY') && popup.includes('dialog[open]'), 'once per session and wait for other modals');
const config = readFileSync('lib/campaigns.ts', 'utf8');
assert(config.includes('startsAt: "2026-10-17T00:00:00+03:00"') && config.includes('endsAt: "2027-01-01T00:01:00+03:00"'), 'campaign window must be 17.10.2026 to 01.01.2027 00:01 (Antalya time)');
const mod = { exports: {} };
vm.runInNewContext(ts.transpileModule(config, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { module: mod, exports: mod.exports });
const { activeCampaign } = mod.exports;
const at = (iso) => Boolean(activeCampaign(Date.parse(iso)));
assert.equal(at('2026-10-16T23:59:59+03:00'), false, 'not live before the start');
assert.equal(at('2026-10-17T00:00:00+03:00'), true, 'live from the start');
assert.equal(at('2026-12-24T12:00:00+03:00'), true, 'live at Christmas');
assert.equal(at('2027-01-01T00:01:00+03:00'), true, 'live up to the end instant');
assert.equal(at('2027-01-01T00:01:01+03:00'), false, 'not live after the end');
const api = readFileSync('app/api/lead/route.ts', 'utf8');
assert(api.includes('knownCampaignNames.includes') && /campaign \? \{ campaign \}/.test(api), 'lead API must accept only known campaign names and forward them');
const form = readFileSync('components/lead-form.tsx', 'utf8');
assert(form.includes('campaign } : {}'), 'lead form must submit the campaign');
for (const f of ['public/images/kampanya/swiateczna-oferta-popup.webp', 'public/images/kampanya/swiateczna-oferta-popup.avif']) assert(existsSync(f), `${f} missing`);
// Home HTML must not contain the popup (it opens only after the engagement conditions).
const home = '.next/server/app/index.html';
if (existsSync(home)) assert(!readFileSync(home, 'utf8').includes('campaign-dialog-inner'), 'popup must not render on first load');
console.log('Campaign popup checks passed.');
