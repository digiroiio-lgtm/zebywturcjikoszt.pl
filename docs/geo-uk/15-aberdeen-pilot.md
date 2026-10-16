# Aberdeen pilot: what makes this a real geo page

Status: record `uk/aberdeen`, stage `research`, preview only. This note answers the code review of PR #56.

## 1. Specificity audit of the current draft
| Section | Aberdeen-specific today? | What would make it specific (evidence needed first) |
| --- | --- | --- |
| Why a page for Aberdeen | Partly: now cites two ward-group percentages with attribution to Aberdeen City Council (official-secondary tier). Still only a statistic, not a reason for a page | Scotland's Census 2022 ward-level table: Polish ethnic identity by Aberdeen ward group (Tillydrone/Seaton/Old Aberdeen, Northfield/Mastrick North, Torry/Ferryhill, Hilton/Woodside/Stockethill, George Street/Harbour, and the five further groups in the research seed). Metric stays "ethnic identity", never merged with main-language counts |
| Trip planning | No (generic) | Verified flight options from Aberdeen/Edinburgh/Glasgow to Antalya with the carrier's schedule link and seasonality; realistic door-to-door effort; only then dates and visits |
| Questions for the clinic | No (applies to any UK city) | Keep as a shared block; if no Aberdeen-specific reason exists, this belongs on `/uk`, not on a city page |
| Insurance and aftercare | Partly (Scotland) | NHS Scotland / Scottish dental-registration specifics, from NHS Scotland sources, verified; local aftercare route confirmed by the clinic |
| Prices and contact | No | Shared |

Conclusion: today most of the text would fit any UK city. Under the doorway rule in the plan, **if census and travel evidence do not arrive, Aberdeen folds into a Scotland hub (`/uk/szkocja`)** instead of being published. Generic blocks should live on `/uk` once, not be repeated per city.

## 2. Dates
`published` / `lastUpdated` are no longer in the draft content. A record's date comes only from `publishedOn`, which the gate requires at stage `published`; `lib/geo/index.ts` copies it into the page (so the sitemap `lastmod` and any Article metadata use the real publication date). `draftedOn` records when the draft was written and is never shown. `verify-geo` fails if content carries its own date or a non-published record has `publishedOn`.

## 3. Location links
`locationIds` now holds the 24 Aberdeen records of `data/geo/uk/locations.json` (`scotland/aberdeen-city/<area>`). `focusLocationIds` marks Tillydrone, Seaton and Old Aberdeen, the three areas of the strongest (still unverified) ward-group claim. `pendingClaimIds` lists the five `sc2022/aberdeen/*` claims awaiting verification; they are not `demographicClaims`, so the gate still blocks any use. `verify-geo` fails on an unknown location or claim id, a focus id outside `locationIds`, or a record past `research` without `locationIds`.

Caveat: the location records are research candidates (`evidenceLevel: brief-candidate`) and carry no postal districts for Aberdeen; the link ties the page to the candidate list, it does not validate the places.

## 4. Scope
Aberdeen only. No other city is drafted until this pilot clears or folds.

## 5. Source tier "official-secondary" (approved by the operator)
An official body that publishes a census-derived figure can be cited on a page when: the claim is `source:"official-secondary"` and `verified:true`; it names the publication (publisher, document, table, URL), a verification basis and date; the page text attributes the figure to that publisher and states what it measures (share, year, question); and no denominator is claimed. The gate (`lib/geo/gate.mjs`) enforces the fields; `verify-geo` enforces that every claim listed on a record is publishable, appears in the text with its value, and names the publisher. "brief" and unverified figures still never pass.

Applied to Aberdeen: 13 ward-group claims (metric `polishEthnicGroup`) are `official-secondary`, verified on the basis of the operator-supplied extract of Aberdeen City Council's table 4-5.9; the PDF itself was not retrieved by the build environment. The record moved from `research` to `verified`. It remains blocked at the next gates: unique-content evidence, search demand, editorial and clinical review.
