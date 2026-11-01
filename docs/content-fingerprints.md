# Content fingerprints and sitemap lastmod

`npm run build && node scripts/content-fingerprints.mjs` compares a hash of each page's main text with the baseline in `lib/content-fingerprints.json`. If the text changed but the sitemap `lastmod` did not, it prints a warning (warning only; the dates are maintained by hand in the content records).

## What counts as content (since 2026-10-18)

Only editorial text is hashed. Before hashing, the script removes interface chrome inside `<main>`: scripts and styles, `<dialog>`, `<form>`, `<button>`, and links with a `button` class (CTA buttons, WhatsApp, section CTAs). Relabelling a button therefore no longer reads as a content change.

Why: the build is deterministic (two consecutive builds give identical hashes), so the 27 warnings seen on 2026-10-18 were real differences between the baseline and the pages. Comparing the pages with the build from 2026-10-17 (6360cb4) showed that about 20 of them came only from the CTA label change ("Poproś o wstępną wycenę" -> "Otrzymaj bezpłatną wycenę"), not from editorial changes.

## Editorial changes found with the new rule and what was done

| Page | Change | Action |
| --- | --- | --- |
| `/pytania-i-odpowiedzi` | UK financing answer now names the financing partner (#91) | `FAQ_UPDATED_DATE = 2026-10-17` drives the sitemap lastmod, `dateModified` in the FAQPage schema and a visible "Ostatnia aktualizacja" line |
| `/uk` | links to the financing page and Szkocja added (#91) | `lastUpdated` 2026-10-17 and a page-history entry |
| `/uk/ceny-...-w-funtach`, `/uk/jak-zaplacic-...` | rate 0.84, partner wording | already dated 2026-10-17 |
| `/`, `/przed-i-po` | new cases, new home entries | already dated 2026-10-17 |

## Using it

- After an editorial change: bump `lastUpdated` in the content record, rebuild, run `npm run fingerprints:update` (writes the baseline for all pages).
- Medically reviewed pages (`/implanty`, `/licowki`, `/all-on-4`, `/cala-szczeka`, `/korony-cyrkonowe`): a `lastUpdated` later than the review date removes the approval, so the warning says so. Do not bump their dates for non-editorial changes.
- `FINGERPRINT_APP_DIR` points the script at another build output (for comparing two builds).
