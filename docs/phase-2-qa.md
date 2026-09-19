# Phase 2 launch QA

## SERP observations

- Cost/cena results favour broad price guides with treatment breakdowns and consultation CTAs.
- Treatment terms support distinct pages for implants, veneers and All-on-4.
- Forum/opinie variants represent the same evaluation need and should not be split.
- Full-mouth language is problem-oriented and should explain non-interchangeable paths.
- Polish results include clinic pages, guides and video/UGC signals; trust content is a material gap.
- Exact volumes, CPC, keyword difficulty and conversion rates were unavailable and were not invented.

## YMYL controls

- No doctor, reviewer, credential, accreditation, patient number, warranty or success rate invented.
- No Polish-market price published without verification.
- No patient review or before/after case fabricated.
- Medical review status is explicitly incomplete.
- Contact form is disabled unless a secure server-side webhook is configured.
- No medical image upload implemented.
- Legal/operator gaps are described transparently rather than populated with guesses.

## Analytics event contract

- `form_start`, `form_submit`, `treatment_selected`
- `cost_page_cta`, `implant_cta`, `licowki_cta`, `full_mouth_cta`, `all_on_4_cta`
- `whatsapp_click` and `phone_click` are reserved until verified destinations exist.

Events contain only the event name and page path. Health descriptions and contact data are never sent as analytics parameters.

## Phase 2.2 implementation

- Canonicals, sitemap entries, schema URLs and internal links use the same slashless URL convention.
- The root layout no longer supplies a canonical to 404 pages.
- MedicalWebPage is limited to cost and substantive treatment pages; other pages use WebPage.
- `/opinie` and `/przed-i-po` guide CTAs point to `/jak-wybrac-klinike`.
- The mobile menu includes an assessment CTA.
- Contextual related-guide links reinforce canonical intent owners.
- `/koszt` contains a quote-comparison and price-publication methodology guide.
- `/cala-szczeka` contains a non-diagnostic decision guide.
- `/jak-wybrac-klinike` contains a 20-question pre-deposit checklist.
- No prices, reviewers, providers, guarantees or patient evidence were invented.
- Sources are added only when they directly support the adjacent dental, clinical or treatment-travel claim. Domain authority alone is not a reason to cite a source.
