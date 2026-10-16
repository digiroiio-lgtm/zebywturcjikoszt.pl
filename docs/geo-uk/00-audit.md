# UK geo-SEO: audit of the live project (deliverable A)

Audit date: 2026-10-16. Base: `main` at `3bfee1c`. Method: read-only inspection of the repository, the built output and Search Console. Nothing in this phase is published.

| Area | Finding |
| --- | --- |
| Stack | Next.js 16.3.8 (the brief says 15), React 19.1, static prerender. `app/uk/page.tsx` (hub) and `app/uk/[slug]/page.tsx` (`dynamicParams = false`) |
| Existing UK pages | `/uk`, `/uk/jak-zaplacic-za-leczenie-zebow-w-turcji`, `/uk/ceny-leczenia-zebow-w-turcji-w-funtach` (GBP at 0.85, 2026-10-03). Finance wording is blocked by `lib/finance-gate.ts` and `validate-seo` |
| Route decision | The brief proposes `/wielka-brytania/`. That would duplicate the intent of `/uk` and cannibalise it. **Decision (operator): extend `/uk`** with `/uk/<city>` and region hubs `/uk/anglia`, `/uk/szkocja`, `/uk/walia`, `/uk/irlandia-polnocna` |
| Canonical | `buildMetadata()` emits a self-referencing canonical per page |
| hreflang | None on the site; all content is Polish. A UK-targeted Polish page has no reciprocal alternate, so none is added. `npm run test:geo` fails on any `hreflang` |
| Sitemap / llms | `app/sitemap.ts` and `lib/ai-content.ts` read `allUkPages`; a geo page enters both only by being in `ukArticles`, which now includes `publishedGeoContent` (empty) |
| Schema | One `Dentist`+`MedicalClinic` with the Antalya address only. A UK-address clinic schema is forbidden and tested |
| Lead form | name, channel, country (GB is an option), topic, message. Attribution is held in `sessionStorage` (`TrackedLink`); no new form field is needed for city |
| Analytics | Vercel Analytics (cookieless) + `trackEvent`. No GA4 property for this site exists in the connected account, and there is no consent mechanism. CSP (`script-src 'self' 'unsafe-inline'`) would block a Google tag |
| Search Console, 18 Sep–15 Oct | 27 impressions, 0 clicks, 4 queries; **no evidence of UK city demand** |
| Clinic facts verified in the repo | Antalya address and coordinates, opening hours, five service languages. **Not verified:** two branches, own laboratory, 220–250 patients/month, Polish coordinator, GBP payment, UK aftercare plan |
| Data access | ONS, Nomis, Scotland's Census, NISRA, London Datastore, StatsWales and the ONS Geoportal were unreachable from the build environment (proxy). **No census figure could be verified** |
| Content overlap | `/uk` already covers the "Poles in the UK" intent; new pages must target a distinct local intent |

## Risk register
| # | Risk | Gate or mitigation |
| --- | --- | --- |
| R1 | Census figures unverifiable here | `verified:false`, `source:"brief"`; the gate rejects them; `npm run geo:import` compares them once official CSVs exist |
| R2 | No evidence of city-level demand | `searchDemandEvidence` is required from the `draft` stage on |
| R3 | No GA4 or consent mechanism | Events use the existing cookieless pipeline; GA4 is blocked until a property, consent and a CSP change exist |
| R4 | Clinic claims unverified | `clinic-facts.json` marks them `needs-operator-confirmation`; no page may use them |
| R5 | CSP blocks Google tags | Documented in the Google Ads readiness report §8 |
| R6 | The brief's three CTAs conflict with the CTA policy of #48 | No new CTA copy added; decision needed |
| R7 | UK ASA/CAP, UK GDPR/PECR | Human legal review listed in the QA checklist |
| R8 | Template pages with a swapped city name (doorway risk) | `uniqueContentEvidence` required; the default is to fold weak places into a region page |
