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

Campaign: the form shows the Polish `displayName` ("Oferta świąteczna: 16 koron cyrkonowych"); the English `name` still travels with the lead, analytics and the WhatsApp message. The £ price stays in the popup and the WhatsApp text; no PLN conversion is shown because there is no verified rate for it.

Measuring: `contact_submit` (after server success) and `campaign_lead_submit` are the lead events; button clicks and `whatsapp_click` are not leads. A "qualified lead" needs CRM data that does not exist yet.

Not done here: shortening repeated disclosures section by section (operator, sources and limitation notes must stay visible).
