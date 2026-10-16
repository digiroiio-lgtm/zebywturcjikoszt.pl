# `/uk/szkocja`: Scotland patient-guide hub (preview draft)

Record `uk/szkocja` (kind `region`, stage `verified`, GEO_PREVIEW only, noindex, not in the sitemap or llms files). Decision (operator): a Scotland-wide guide is the better start than a standalone Aberdeen page; Aberdeen, Edinburgh, Glasgow, Dundee, Perth and Inverness are the geographic research scope.

## Content map (Polish)
| Section | Purpose | Evidence used |
| --- | --- | --- |
| Dla kogo | Scotland-wide audience; no city-by-city pages; treatment is in Antalya, no UK clinic | Verified clinic facts only (Antalya address, Polish service) |
| Dane o Aberdeen | Only city with data: 13 ward-group shares, attributed to Aberdeen City Council (tab. 4-5.9, citing Scotland's Census 2022), measure and limits stated | `official-secondary` claims |
| Pozostałe miasta | Explicitly states no figures are given for Edinburgh, Glasgow, Dundee, Perth, Inverness | none; no number shown |
| Podróż | No direct-flight claim; budget guide linked; `[DO UZUPEŁNIENIA]` for verified connections | none yet |
| Dwa pobyty | Why the plan matters when the trip is long; doctor decides the stages | generic, clinical review pending |
| Jakie leczenie | Implants, All-on-4/All-on-6/full arch, zirconia crowns, veneers and smile makeover, full-mouth rehabilitation: what to check in an offer (no outcome claims) | none needed |
| Ceny w funtach | EUR list, GBP only as dated conversion, not an offer; links to the price pages | `lib/pricing.ts` via the linked pages |
| NHS Scotland | GHIC/insurance (NHS); NHS inform on surgery abroad (no duty of care before/after beyond emergency); S2 scheme limited to public providers in the EU/EEA/Switzerland | NHS and NHS inform pages |
| Kontrola po powrocie | Checklist: who, records, contact, own dentist, stay long enough | NHS checklist guidance |

Internal links (via `contextualLinks["uk/szkocja"]`): `/implanty`, `/all-on-4`, `/cala-szczeka`, `/korony-cyrkonowe`, `/licowki`, `/koszt`, the GBP page, `/poradniki/calkowity-koszt-wyjazdu`, `/poradniki/opieka-po-leczeniu`, `/uk/jak-zaplacic-za-leczenie-zebow-w-turcji`, `/jak-wybrac-klinike`. The keyword hypotheses of clusters 2–4 are covered by those existing pages; the hub adds only the Scotland-specific intent.

## Relation to the Aberdeen draft
`uk/aberdeen` is preserved unchanged and marked `foldInto: "uk/szkocja"`. Its Aberdeen-specific part (ward-group data) now lives in the hub's Aberdeen section. A standalone Aberdeen page is reconsidered only with dated search-demand evidence and an Aberdeen-specific angle (verified travel, local content). Absence of a direct flight does not mean absence of demand; it is simply unmeasured.

## Guards added
`verify-geo` fails a record whose prose contains a percentage not backed by a listed, publishable demographic claim, or a population figure ("12 345 Polaków"); it also checks `relatedSlugs` / `foldInto` references. Earlier guards still apply: attribution to the publisher in the prose, no `[DO UZUPEŁNIENIA]` in a published record, forbidden wording, no hreflang, no unpublished route/sitemap/llms entry.

## Remaining publication blockers
1. Verified flight connections from Scottish airports (carrier or airport schedule).
2. Dated search-demand evidence for Scotland-focused Polish queries (Search Console: 5 impressions in 90 days, none UK-related; unmeasured, not zero).
3. Official Scotland's Census 2022 ward-level extract to confirm or replace the council figures; locate the primary council document.
4. NHS Scotland wording confirmed by an editor (NHS inform pages concern surgery and S2; no dental-specific page found; Turkey outside S2).
5. Clinical review of treatment and two-stage wording; unconfirmed clinic facts stay unused.
6. Polish editorial review; UK ASA/CAP and UK GDPR/PECR review.
7. ~~Aberdeen council-table areas missing from the inventory~~ Done: seven areas (Lower Deeside, Hazlehead, Queens Cross, Countesswells, Airyhall, Broomhill, Garthdee) added with `origin: "council-table"`; ward boundaries still to be verified.
8. `publishedOn`, approvals and the other gate fields are set by a human at publication.
