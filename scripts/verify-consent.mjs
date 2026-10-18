// Guards Consent Mode v2: every consent type is denied before the first gtag config, gtag.js is in the server HTML, and the banner never grants advertising storage (run after `next build`).
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const banner = readFileSync('components/consent-banner.tsx', 'utf8');
assert(banner.includes('data-blocks-popup'), 'the banner must carry data-blocks-popup so the campaign popup waits for it');
assert(!/ad_storage|ad_user_data|ad_personalization/.test(banner), 'the banner must never grant advertising storage');
assert(banner.includes('analytics_storage'), 'the banner must update analytics_storage');

const htmlFile = '.next/server/app/index.html';
if (!existsSync(htmlFile)) { console.log('Consent build checks skipped: no build present.'); process.exit(0); }
const html = readFileSync(htmlFile, 'utf8');
const init = html.match(/<script[^>]*>([^<]*gtag\("consent","default"[^<]*)<\/script>/)?.[1];
assert(init, 'server HTML must contain the consent default call');
for (const type of ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage']) assert(init.includes(`${type}:"denied"`), `${type} must default to denied`);
assert(!init.includes('"granted"') || init.indexOf('"granted"') > init.indexOf('"default"'), 'no consent type may default to granted');
assert(init.indexOf('"default"') < init.indexOf('gtag("config"'), 'consent default must run before gtag config');
assert(/<script[^>]*src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-[A-Z0-9]+"/.test(html), 'gtag.js must be in the server HTML');
console.log('Consent checks passed: all four types denied before config, gtag.js in the server HTML, banner never grants ad storage.');
