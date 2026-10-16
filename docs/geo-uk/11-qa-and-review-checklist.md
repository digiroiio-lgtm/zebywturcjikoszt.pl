# Technical QA and clinical/legal review checklist (deliverable L)

Before any record moves to `published`:

- [ ] Every demographic claim `verified:true`, `source:"official"`, with value, denominator, year, definition, dataset, sourceUrl, verifiedOn.
- [ ] Metrics kept separate (Poland-born, Polish main language, Polish national identity); no sum, no substitution.
- [ ] Dated search-demand evidence and written unique-content evidence.
- [ ] Clinic facts used are `verified` in `clinic-facts.json`; unconfirmed ones removed.
- [ ] Polish native-reader review (editorial approval recorded).
- [ ] Clinical review by a named clinician, recorded through the `lib/medical-review.ts` path; no guarantee, "painless" or success-rate claims.
- [ ] Prices only from `lib/pricing.ts`; GBP only as a dated conversion; no finance or credit wording.
- [ ] The page states plainly that treatment is in Antalya and the clinic has no UK site.
- [ ] Human review of UK ASA/CAP advertising rules for health claims, UK GDPR and PECR for forms and tracking.
- [ ] `npm run verify` exit 0; Lighthouse check of the new page; sitemap/llms/links list the page only after publication.
