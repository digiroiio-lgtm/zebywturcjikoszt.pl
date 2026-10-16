# Polish readability review — 16 October 2026

Screaming Frog flagged 27 Polish pages as “Very Hard” using Flesch Reading Ease. The standard Flesch formula was developed for English. Its score and education labels should not be treated as a validated assessment of Polish medical or legal text. A future crawl may still flag these pages. No new Screaming Frog or Polish-language readability score is claimed here.

## Changes

Simplified introductions, quick answers and selected dense passages. Used shorter sentences, direct verbs and explanations such as implant support, tooth preparation and browser storage. Kept medical uncertainty, emergency guidance, rights, complaint deadlines, prices, names, source links and commercial affiliations. This is an editorial pass, not a complete rewrite of all body text or a new clinical/legal review.

Covered all 27 reported routes:

- `/cookies`, `/regulamin`, `/reklamacje`
- `/weryfikacja-medyczna`, `/polityka-redakcyjna`, `/metodologia`, `/korekty`
- `/implanty`, `/licowki`, `/all-on-4`, `/cala-szczeka`, `/korony-cyrkonowe`
- `/opinie`, `/przed-i-po`, `/o-nas`, `/wlasciciel-serwisu`, `/kontakt`
- `/poradniki`, `/poradniki/licowki-czy-korony`, `/poradniki/leczenie-zebow-w-turcji`, `/poradniki/pakiety-leczenia-zebow`, `/poradniki/opieka-po-leczeniu`, `/poradniki/calkowity-koszt-wyjazdu`
- `/nasi-lekarze`, `/eksperci`, `/eksperci/mustafa-akca`, `/eksperci/mehmet-onur-merey`

## Measured scope and limitations

For 38 changed plain-string introductions/quick answers across 21 content records, comparing the previous Git version with this revision using `Intl.Segmenter('pl', { granularity: 'sentence' })` and Unicode word tokens:

| Metric | Before | After |
| --- | ---: | ---: |
| Mean words per sentence | 12.7 | 8.2 |
| Longest sentence | 32 | 15 |
| Total words | 1,015 | 998 |

These figures cover that subset only, excluding interpolated template strings, shared navigation, biographies, card listings and other paragraphs. They are not whole-page Flesch scores and do not establish reader comprehension. Check key patient tasks with native Polish readers; a Polish-language tool such as Jasnopis can supplement that review. Keep necessary medical terms and registered company names even when a generic score penalizes them.

## Dates and review attribution

Updated content dates, sitemap dates and page history to reflect actual editorial changes. Source-verification dates and historic clinician approvals remain unchanged. The existing review-date gate withdraws the old approval from `/implanty`, `/licowki`, `/all-on-4` and `/cala-szczeka` because their text now postdates that approval. Those pages need clinician reconfirmation before review attribution returns. The AI-content test now checks both valid and stale approvals, including the reviewer profile's reviewed-content list.

## Validation

Run `npm run verify` and `npm run verify:live -- <local production origin>` after building. Update the fingerprint baseline only after checking changed routes and dates. Live deployment and a fresh Screaming Frog crawl are separate follow-up steps.
