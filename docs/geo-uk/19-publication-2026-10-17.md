# UK section: publication of 2026-10-17

Decisions by the site owner (2026-10-17), implemented in this change.

## What is live
| URL | Status |
| --- | --- |
| `/uk`, `/uk/jak-zaplacic-za-leczenie-zebow-w-turcji`, `/uk/ceny-leczenia-zebow-w-turcji-w-funtach` | live since 2026-10-03 (payment guide and hub updated) |
| `/uk/finansowanie-leczenia-zebow-w-turcji` | new, 2026-10-17: neutral page on financing through a UK partner |
| `/uk/szkocja` | new, 2026-10-17: indexable, in the sitemap and the llms files |

Preview-only, not published: `/uk/anglia` (England hub draft, `GEO_PREVIEW=1`) and `/uk/aberdeen` (folded into `/uk/szkocja`). No city page is published.

## Changes
- **Language and hreflang:** all content stays Polish. Every indexable page now carries one self-referencing hreflang (`pl-GB` on `/uk` and `/uk/*`, `pl-PL` elsewhere). There are no reciprocal alternates because no page has an equivalent in another language or region; `npm run test:geo` fails on an hreflang that points to another URL.
- **Lead source:** UK pages use `OGZ-PL` like the rest of the site. UK-origin leads are told apart only by `source_page_path` / `landing_page` (`/uk...`).
- **Finance wording:** the payment guide says the service is not a lender; the new financing page says the operator works with a financing partner in the UK, that approval, amount and terms are the lender's decision and not certain, and it lists the questions to ask and the risks. It names no partner and states no amount, APR, instalment, "from £x a month" or "no credit check"; those patterns stay forbidden on every `/uk` page (`scripts/validate-seo.mjs`). Partner name, FCA status and approved wording are not recorded in the repository (`lib/finance-gate.ts`); responsibility for the UK financial-promotion rules lies with the site operator.
- **Publication gate:** `data/geo/uk/workflow.json` now allows recorded owner waivers (`waivers: [{ field, by, on, reason }]`) for `searchDemandEvidence` and `clinicalReview` only. They are not approvals; claims and editorial approval can never be waived. `/uk/szkocja` is published with both waivers, the owner as editorial approver and a written uniqueness statement.
- **`/uk/szkocja` text:** flight and NHS statements are attributed ("według stron przewoźników", "według NHS inform", source dates) and hedged ("sprawdź aktualny rozkład"); the Aberdeen figures are the council's (official-secondary tier) and the page says they do not describe today's situation. No figures for other Scottish cities.
- **Quality gate:** `scripts/verify-uk-quality.mjs` (in `npm run verify`) checks every built `/uk*` page: one h1, at least 5 unique h2, no heading level jumps, word count (700 for the hub, 600 for the others), title and description length, no placeholder, site-wide unique h1, five-gram similarity below 30 % between UK pages, at least four contextual internal links, no broken link, at least two inbound links from other UK pages plus the hub, and the hreflang.

## Cities
`/uk/anglia` is a draft hub for the English pilot places (Londyn/Ealing-Hounslow, Slough, Luton, Peterborough, Northamptonshire, Boston, Nottingham, Hull, Southampton) organised by departure airport, not by city. Its flight sections still carry `[DO UZUPEŁNIENIA]` placeholders, so it cannot be published (the verifier fails a published record with a placeholder). Per-city pages stay unpublished: there is no verified local data and no search-demand evidence, and template pages with a swapped city name would be thin or doorway content.

## Open risks
- UK ASA/CAP and financial-promotion rules; UK GDPR/PECR review; no clinical review of `/uk/szkocja` (waived).
- Flight and NHS Scotland statements could not be checked against the source sites from the build environment.
- No dated search-demand evidence for any UK city or region; measure after publication (Search Console).
