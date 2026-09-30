# Polish patient guide conversion measurement

The existing integration surfaces remain `window.dataLayer` and the `site:analytics` custom event. No provider, account ID, consent mechanism, or additional analytics dependency is introduced. An initialized queue retains events if the consumer loads later. Do not report traffic or successful collection in an external analytics account without verifying that consumer.

| Event | Meaning | Primary fields |
| --- | --- | --- |
| guide_open | A guide or supporting guide link was selected | page_path, guide_source, destination_path |
| guide_to_treatment | A treatment link was selected | page_path, guide_source, destination_path |
| guide_to_pricing | A price-list link was selected | page_path, guide_source, destination_path |
| guide_contact_cta | A guide consultation/quote CTA was selected | page_path, guide_source, cta_location |
| guide_category_filter | A library category was selected | page_path, category |
| contact_start | First focus within the existing form | guide_source, lead_source, cta_location, source_page_path |
| contact_submit | The lead API returned HTTP success and `{ok: true}` after the existing Formspree receipt check | guide_source, lead_source, cta_location, source_page_path, landing_page, utm_* |

A click is not a submitted lead. A WhatsApp click is not `contact_submit`. Network errors and rejected submissions emit no success event. Form resets permit a new real submission; one successful submission emits the existing success event once.

Guide source travels as an explicit `guide_source` query parameter to the treatment/price page and onward to the contact CTA. `lead_source=OGZ-PL`, existing CTA locations and `page_path` are retained. The API forwards the source alongside existing attribution fields to Formspree. No names, phones, email addresses, messages or medical records enter event payloads.

For a provider configured to consume these events, report treatment and pricing transitions per guide, contact CTA clicks per guide and receipt-confirmed submissions per guide. Use `contact_submit` as the completed-request conversion; do not combine it with clicks. No conversion-rate uplift is claimed before live measurement.

Run `npm run verify` for source, price, SEO, review-scope and delivery contracts. Browser QA should use mocked `/api/lead` responses for rejection and acceptance, with no external test leads.
