# WhatsApp and quote contact layout

- Phones (≤760 px): fixed bar, "Bezpłatna wycena" 60 % / WhatsApp 40 %, 48 px touch height, safe-area padding. On `/` it stays hidden while the hero CTA is visible; not shown on `/kontakt`.
- Larger screens: floating WhatsApp button bottom right; hidden while the footer is visible. Never together with the phone bar.
- Treatment pages with a price block: "Zapytaj na WhatsApp" after the price/scope tables (`treatment_price`). No documented-cases section exists yet, so `treatment_case` is not placed.
- Both widgets hide while any `<dialog>` is open (`body:has(dialog[open])`).
- Number `+90 535 399 89 99` (`lib/whatsapp.ts`); message built with `URLSearchParams`, per treatment. No campaign text is appended (2026-10-27): campaign labels are priced in GBP and would mislead general enquiries from Poland. Campaign attribution belongs on the campaign's own link/form (`campaign` field of the lead form), not on the general WhatsApp buttons.
- Campaign (`lib/campaigns.ts`): label "Christmas Hollywood Smile | 16 crowns | £2,390". The supplied image contains no price, term or validity date, so none is stated on the site. Original PNG: `assets-src/2026-10-17/`.
- Analytics (`trackEvent`): `quote_cta_click` (with campaign), `whatsapp_click` with page_path, button_location, treatment (no campaign). No name, phone, health data or message text. A click is not a lead.

## Christmas campaign popup
- Config: `lib/campaigns.ts` (`active`, `startsAt`, `endsAt`). Christmas Hollywood Smile runs 17.10.2026 00:00 to 01.01.2027 00:01, Antalya time (UTC+03:00), as supplied by the operator. The window is checked in the browser (popup, home-page photo, WhatsApp message), so it ends on time without a redeploy; `null` still means "not specified".
- Opens once per session when 20 s of visible time (kept across client navigations) AND 35 % scroll of the current page are both reached, in either order; never on load; not on `/kontakt` and legal pages.
- Waits while another `<dialog>` is open (or an element with `data-blocks-popup`, for a future cookie notice). Not shown once the lead form was started or sent. Closing (×, Escape, backdrop) snoozes it 7 days.
- CTA closes the popup and scrolls to/focuses the form (`#home-lead-form`, `#assessment-form`), else goes to `/kontakt#assessment-form`; topic "crowns". The campaign name is shown in the form, posted to `/api/lead` (known names only) and appears in the Formspree notification (field `campaign` and subject).
- Analytics: `campaign_popup_shown`, `campaign_popup_cta_click`, `campaign_popup_dismiss`, `campaign_lead_submit`; no personal data.
- Content (hotel 5★, VIP transfers, price) is operator-supplied and unverified here; check it against UK advertising rules before relying on it.

## UK pages and footer (2026-10-27)
- On `/uk` and `/uk/*` the general WhatsApp buttons (floating/phone bar and footer) send "Dzień dobry! Mieszkam w Wielkiej Brytanii i interesuje mnie leczenie stomatologiczne w Antalyi. Proszę o informacje dotyczące kosztów i kolejnych kroków." (`whatsappMessage(topic, "uk")`). Everywhere else the Polish general or treatment-specific message is used. No promo label is ever appended.
- Strategy: `/` and the main treatment pages keep targeting patients in Poland; `/uk` is kept as a separate audience silo. Track Poland and the United Kingdom as separate countries in Search Console; UK organic traffic has not been seen yet, so its contribution is not measured.
- Footer (`components/site-footer.tsx`, `components/footer-contact.tsx`): Polish contact block (WhatsApp with the general message and `/kontakt`) above five link groups (Leczenie i ceny, Dla pacjentów, Polacy za granicą, O nas i kontakt, Informacje prawne). Editorial policy, medical verification, methodology, corrections, checklists and experts sit in a native `<details>` ("Zasady redakcyjne i weryfikacja treści"), usable by keyboard and screen reader without JS. Operator ownership of the Akdeniz Dental clinic and the commercial-purpose / not-medical-advice notes stay in the footer bottom.
