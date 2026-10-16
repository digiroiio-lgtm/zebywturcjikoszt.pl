# Polish review carousel: sources, reuse and validation

Checked 17 October 2026 (Europe/Istanbul). Five distinct Polish-language, five-star records were returned by the public profile page and its embedded public page data. The language filter reported `pl: 5`, one page, so the target of 12 cannot currently be met. No review was selected by inferred nationality or residence. No country flag or country label is published.

## Verified direct sources

All five direct URLs returned HTTP 200 with the same review ID and author in the public HTML. This verifies publication, not the clinical account, reviewer identity or a Trustpilot "Verified" label. We do not apply that label. Source records are in `data/trustpilot-reviews.json`.

| Public author | Publication timestamp, UTC | Direct review |
| --- | --- | --- |
| Andrzej G. | 2026-10-07T15:48:15Z | https://pl.trustpilot.com/reviews/6ac64d9f5f34a5fabca8ccf3 |
| Miroslaw Jagielo | 2026-10-01T10:40:28Z | https://pl.trustpilot.com/reviews/6abe1c7c75f77b84dc353a49 |
| Robert Rachowiecki | 2026-09-18T19:45:28Z | https://pl.trustpilot.com/reviews/6aad78b8284b1f70dd4bddee |
| Robert Róziecki | 2026-09-03T15:23:55Z | https://pl.trustpilot.com/reviews/6a9974ea6eb1c2a06da7bf20 |
| Anna Broniek | 2026-02-19T22:34:57Z | https://pl.trustpilot.com/reviews/699773f148ea8d9f6ed31c93 |

Source profile: https://pl.trustpilot.com/review/akdenizdental.com

The supplied screenshot displays Anna's date as 20 February, while public page data and the parsed Polish page give 19 February. The UTC publication timestamp converts to 19 February in Europe/Warsaw and 20 February in Turkey. Cards consistently format publication dates in Europe/Warsaw. For Robert Rachowiecki, 15 September is the experience date; 18 September is the publication date. These must not be interchanged.

## Reuse decision

Official sources checked:

- https://legal.trustpilot.com/for-businesses/terms-of-use-and-sale-for-businesses/1, clauses 14 and 20: reviews belong to reviewers; display is tied to permitted account functionality, designs/widgets and claimed domains.
- https://legal.trustpilot.com/for-businesses/action-we-take, Brand Misuse: displaying reviews on another domain without permission is listed as misuse.

The current non-versioned terms/brand pages could not be retrieved by the search service. The dated terms above and accessible enforcement policy were read; this is not a claim to have verified a new contract or account entitlement. No Trustpilot business account, subscription, authorization for leczeniezebowwturcji.pl, widget template or API permission was available in the repository.

Accordingly the deployed implementation is a **source-link carousel**: author, publication date, plain factual five-star score and direct source link. It does not reproduce review prose, review titles, avatars, the Trustpilot logo, boxed branded star assets or aggregate scores. No external scripts, widget assets or Trustpilot requests happen when the homepage loads.

Short excerpt candidates supplied by the operator are retained in the server-only source data, each with a null `excerptPermissionReference`. Full review prose is not copied into the repository; its SHA-256 fingerprint is recorded for source comparison. Candidates are not included in rendered HTML, hydration props or the client carousel data until appropriate reuse permission is recorded. The repeated link-card prompt is site-authored and is not presented as a quotation.

To enable quotes, document the entitlement/permission covering this domain and the proposed custom use, and set a real reference on each approved excerpt. Do not fabricate a reference, assume that short text is automatically exempt, or treat a merge request as a permission grant. If only an official TrustBox is permitted, use the actual widget configuration supplied by the business account instead of enabling custom quotes. No account terms were accepted and no subscription was purchased.

## Behavior

Homepage order: doctors → Polish review links → patient journey. Existing before/after section and external-profile review section remain intact. The carousel supports up to 12 distinct approved sources without creating missing slots. Source filter rejects non-Polish, non-five-star, duplicate, malformed and unverified entries.

CSS scroll snap: 3 cards at desktop >=1200px, 2 at 768–1199px, approximately 1.1 below 768px. Native horizontal scrolling/touch, keyboard arrows/Home/End on the labelled track, tab-accessible source links, 44px navigation buttons, disabled edge controls, focus outlines and reduced-motion handling. No autoplay, focus stealing or carousel library. With JavaScript unavailable, native scrolling and source links remain available. Long future approved excerpts use a native details control with a bounded internal scroll area.

The footer explicitly discloses positive selection and links to the unfiltered profile, including critical reviews. There is no Review or AggregateRating schema, no current TrustScore badge, no inference of nationality, no claim that the reviews prove treatment quality and no guarantee of outcomes.

## Validation

`npm run test:reviews` is included in `verify` and checks source filtering, duplicates, the 12-record cap, permission-controlled payloads, five SSR cards, source links, no pending quote leakage, accessible track labelling and correct section placement. Existing SEO/build tests remain applicable.

Browser viewport, touch/keyboard behavior and accessibility checks are recorded separately in the PR. One Vercel project exceeded its daily quota, while the other eventually produced a working preview. Initial desktop QA found that absolutely positioned screen-reader labels in offscreen cards escaped the scroll container; a relative containing block on each card fixes that layout boundary. Static contract tests do not substitute for browser results. The PageSpeed Insights request returned HTTP 429. A separate local Lighthouse/Chromium audit then succeeded; measured results are in `docs/polish-reviews-validation.json`. Mobile/tablet/desktop layouts were inspected from the final production-build screenshots. There is no horizontal page overflow at 390px, 1024px or 1440px and all author names fit. Physical touch-device testing remains separate.


### Final local lab results

| Viewport | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Mobile 390px | 96 | 96 | 96 | 100 |
| Tablet 1024px | 84 | 96 | 96 | 100 |
| Desktop 1440px | 85 | 96 | 96 | 100 |

These are Lighthouse 13.5.0 / Chromium 153 local production-build lab runs, not production field data or conversion claims. Accessibility findings concern the unchanged header-brand name and decision-card label contrast. Local Vercel analytics endpoints produce 404/MIME errors and affect best practices. No new carousel accessibility finding was reported. The final scoped layout check measured root/body widths within the viewport and five equal-height cards at each size. Desktop gutters/scrollbars may reduce the content width by 15px. No claim of a separately tested physical touch device is made.
