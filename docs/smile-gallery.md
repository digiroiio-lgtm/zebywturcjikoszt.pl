# Smile gallery (home page, 2026-10-31)

Five vertical screenshots of the clinic's Instagram profile (before/after smiles, patients after treatment) in one row between the Polish reviews (with the review-profile links) and the treatments (`id="home-smile-gallery-title"`, `components/home-smile-gallery.tsx`, data in `lib/smile-gallery.ts`).

## Why there
The flow after the price section is: reviews (text) → this gallery (visual proof from other patients) → "what do I need?" (treatments with per-treatment CTAs). It stays below the fold, lazy-loaded, so the hero and LCP are not affected; the brand strip above the hero is unchanged.

## Images
- Originals (5 JPEG screenshots, 1179 px wide) are kept in `assets-src/2026-10-31-smile-gallery/` (not served).
- Served files: `public/images/smile-galeria/smile-gallery-01..05.webp`, 560 × 990 px, WebP quality 74, no EXIF/ICC, 62–72 KB each (356 KB in total, about 3 MB before). Crop before resizing: 12 px off the top (Instagram tab indicator) and 8 px off the right (scroll bar), then all five cut to the same height so the cards align.
- `next/image` with `unoptimized` and `loading="lazy"`; the width/height attributes reserve the space (no layout shift).

## Layout
- 1101 px and wider: five equal cards in one row (about 224 px each in the 1180 px container).
- Up to 1100 px: the row scrolls (native scroll-snap, 30 % cards); mouse users get arrows (761–1100 px, hover devices); the row is a keyboard stop (`tabindex=0`, `role=region`, arrow keys) only while it actually overflows.
- Up to 760 px: 62 % cards, so the next card peeks in and invites swiping; the CTA is full width.

## Content
Polish heading "Galeria uśmiechów pacjentów", one CTA ("Zapytaj o możliwości leczenia", `cta_location` `home_smile_gallery`, event `home_smile_gallery_cta`), a link to the clinic's own Instagram profile (URL from `lib/directory-listings.ts`, confirmed by the owner on 2026-10-30), and the standard note that results are individual and the doctor sets the plan after examination. Alt text describes the screenshot without naming anyone.

## Consent (operator's statement)
On 2026-10-31 the operator stated that the people shown are the clinic's own patients and that they agreed to the publication of these images on the clinic's Instagram, and asked for the gallery on the website on that basis. The text on the page therefore says "zgoda na publikację w mediach społecznościowych kliniki". The written consent records stay with the clinic (nothing about them is stored in the repo). Whether the existing consent also covers the website, and the lawyer confirmation in `lib/legal-review.ts` (`LEGAL_REVIEW_CONFIRMED_DATE`, still `null`), were left to the operator, at the operator's request; the gallery is not registered as "patient content" in the audit gate.

## Tests
`scripts/verify-home-order.mjs`: the section sits between the reviews and the treatments, shows exactly five images with alt text and `loading="lazy"`, and each WebP is under 120 KB.
