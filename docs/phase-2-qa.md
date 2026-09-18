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
