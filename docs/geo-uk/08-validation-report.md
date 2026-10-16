# Canonical, hreflang, sitemap and schema validation (deliverable I)

Checked by `npm run test:geo` on every build and re-run in this phase.

- Geo routes: none prerendered (`/uk/<geo>` absent from `.next/server/app`).
- Sitemap: 39 URLs, identical to `main`; no geo URL.
- llms.txt / llms-full.txt: byte-identical to the baseline from `main`; no geo mention.
- Canonical: unchanged on all pages (self-referencing).
- hreflang: none on any page, by design (single-language site); the verifier fails on any `hreflang=`.
- Schema: one clinic entity with the Antalya address; the verifier fails on a Dentist/MedicalClinic schema with a GB address.
- Internal links: no link to an unpublished geo page.
- Preview: `GEO_PREVIEW=1` is honoured only outside production and Vercel.
