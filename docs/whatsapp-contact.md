# WhatsApp and quote contact layout

- Phones (≤760 px): fixed bar, "Bezpłatna wycena" 60 % / WhatsApp 40 %, 48 px touch height, safe-area padding. On `/` it stays hidden while the hero CTA is visible; not shown on `/kontakt`.
- Larger screens: floating WhatsApp button bottom right; hidden while the footer is visible. Never together with the phone bar.
- Treatment pages with a price block: "Zapytaj na WhatsApp" after the price/scope tables (`treatment_price`). No documented-cases section exists yet, so `treatment_case` is not placed.
- Both widgets hide while any `<dialog>` is open (`body:has(dialog[open])`).
- Number `+90 535 399 89 99` (`lib/whatsapp.ts`); message built with `URLSearchParams`, per treatment, with the active campaign label appended.
- Campaign (`lib/campaigns.ts`): label "Christmas Hollywood Smile | 16 crowns | £2,390". The supplied image contains no price, term or validity date, so none is stated on the site. Original PNG: `assets-src/2026-10-17/`.
- Analytics (`trackEvent`): `quote_cta_click`, `whatsapp_click` with page_path, button_location, treatment, campaign. No name, phone, health data or message text. A click is not a lead.
