# CTA standard (2026-10-17)

One action, one wording. The main vocabulary lives in `lib/cta.ts`; `scripts/verify-cta.mjs` fails the build if the legacy labels come back on the home, contact, before/after, guides, team, cost, Antalya or reviews pages.

| Place | Label |
|---|---|
| Header, mobile menu, mobile sticky bar | Bezpłatna wycena |
| Hero main button, doctors section, closing/generic CTAs, reviews | Otrzymaj bezpłatną wycenę |
| Under the hero button | Wstępna wycena • Kontakt po polsku • Bez zobowiązań (plus the note that the final plan needs examination and diagnostics) |
| Hero secondary | Porozmawiaj po polsku na WhatsApp (`whatsapp_click`, `button_location: hero`) |
| Model gallery | Poznaj możliwości dla swojego uśmiechu |
| Before/after sections | Zapytaj o możliwości leczenia (final block: Otrzymaj bezpłatną wycenę) |
| Prices block | Otrzymaj indywidualną wycenę |
| Treatment cards | Zapytaj o implanty / korony cyrkonowe / licówki / całą szczękę / All-on-4 / koszt leczenia |
| After the process steps | Zrób pierwszy krok: bezpłatna wycena |
| Form heading / submit | Twoja bezpłatna wstępna wycena / Wyślij zapytanie o bezpłatną wycenę |

Page-specific CTAs on treatment pages (`lib/site.ts`, set in the search-intent work) are kept: they match the intent of the page.

Campaign: the form shows the Polish `displayName` ("Oferta świąteczna: 16 koron cyrkonowych"); the English `name` still travels with the lead and analytics (it is no longer added to WhatsApp messages since 2026-10-27). The £ price appears only in the popup on `/uk` pages; no PLN conversion is shown because there is no verified rate for it.

Measuring: `contact_submit` (after server success) and `campaign_lead_submit` are the lead events; button clicks and `whatsapp_click` are not leads. A "qualified lead" needs CRM data that does not exist yet.

Not done here: shortening repeated disclosures section by section (operator, sources and limitation notes must stay visible).

## Page CTA event names (2026-10-30)
Hero and closing buttons built from a page record send `ctaEvent`, named after the page and the action: `<page>_cta` (`cost_page_cta`, `implant_cta`, `opinie_cta`, `antalya_cta`, `jak_wybrac_klinike_cta`, `uk_*_cta`). The name must describe the action of the button, not another page: `/jak-wybrac-klinike` used `clinic_check_cta` for its quote button until 2026-10-30 and was renamed to `jak_wybrac_klinike_cta`. Events recorded under the old name stay in Vercel Analytics/GA4 history; with 2026 traffic that is a handful of events, so no mapping was added.
