# SEO pillars scorecard (2026-10-18)

Basis: `main` at 57d86d7 (after #91), local production build. Scores are our own 0–100 rubric, not tool output and not measured conversion. Facts below come from the built HTML in `.next/server/app` and the repository.

## Summary

| Pillar | Score | One-line reason |
| --- | --- | --- |
| 1. Technical SEO | 88 | Static prerender, 42/42 pages with canonical, hreflang, valid JSON-LD; speed not measured (no Lighthouse in sandbox) |
| 2. Search intent | 82 | Intent map exists and is applied to main money pages; no demand data beyond 27 Search Console impressions |
| 3. Topical authority | 80 | Price, process, guide and UK clusters exist; comparison and Polish-support cluster still thin |
| 4. E-E-A-T | 68 | Reviewer approval on 4 of 23 content pages, `verifiedCases` empty, coordinator and implant reviews unverified |
| 5. AI readability | 85 | llms.txt/llms-full, direct answers (12–60 words), FAQPage on 27 pages, consistent entity data |
| 6. Measurement | 45 | Search Console and Vercel Analytics only; no Bing Webmaster Tools, no GA4, no AI citation tracking |

## Evidence

### 1. Technical
- 42 indexable pages built; 0 `noindex`, 0 without canonical, 0 without JSON-LD, 0 invalid JSON-LD, exactly one H1 on every page, 0 images without alt.
- Sitemap lists 42 URLs (equal to built pages). `app/robots.ts` allows `*` and 16 search/AI bots (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, ...) and disallows only `/api/`; sitemap line present.
- Self-referencing hreflang on all 42 pages (`pl-GB` for `/uk*`, `pl-PL` elsewhere).
- Schema types in output: Dentist, MedicalClinic, WebSite, Organization (each repeated on every page), BreadcrumbList, FAQPage (27), WebPage, MedicalWebPage (13), Person, Article (7), ProfilePage, ItemList, ImageGallery.
- 13 files above 100 KB in `public/` (clinic photos 110–222 KB), none are page-critical hero images.
- Not measured: Core Web Vitals / Lighthouse (`lighthouse` not installable in the sandbox), Googlebot rendering in Search Console URL Inspection, real crawl logs.
- Gap: Organization/Dentist/MedicalClinic JSON-LD repeats on all pages; consider emitting full objects only on the home page and `@id` references elsewhere (consistency and size).

### 2. Search intent
- `docs/seo-intent-map.md` maps clusters to pages; treatment pages carry intent-specific titles and direct-answer blocks enforced by `audit:seo`.
- Gap: no keyword volume or competition data in the repo (only Search Console, 27 impressions / 0 clicks in the 18 Sep–15 Oct window). Re-read Search Console on 2026-11-14 and re-rank clusters with real queries.

### 3. Topical authority
- Clusters present: price (`/koszt`, price lists), treatments (implants, crowns, veneers, full arch, All-on-4), process and travel (`/antalya`, guides), clinic choice (`/jak-wybrac-klinike`), reviews (`/opinie`), UK (`/uk`, payment, GBP prices, neutral finance, `/uk/szkocja`).
- Median main-content length 896 words; thinnest pages are legal/trust pages (334–451 words), which is acceptable for their purpose.
- Gaps: comparison pages against Poland, same-day teeth / dentures / whitening (service not confirmed), Polish-support (coordinator unconfirmed), city pages for UK (intentionally unpublished, `/uk/anglia` draft only).

### 4. E-E-A-T
- Doctor-approved pages: implants, veneers, full arch, All-on-4 (4 of 23 content pages); reviewer shown in text and JSON-LD consistently.
- `verifiedCases` is empty: no documented case studies; before/after galleries carry a neutral "scope unconfirmed" note by design.
- Business data verifiable in repo: single Antalya address, opening hours, languages (pl, en, ru, de, ro), legal entity in footer. Not recorded: finance partner name/FCA, lab, coordinator, patient volume.
- Reviews: verified Polish reviews with permission gate; Trustpilot link; no `aggregateRating` markup (deliberate).
- Needs from the owner: reviewer sign-off on more pages, case data with consent, implant reviews with sources.

### 5. AI readability
- `llms.txt` and `llms-full.txt` generated from canonical data, tested by `test:ai` (85 answers matched to sources) and `test:prices` (EUR/PLN consistency).
- Direct answers (12–60 words) enforced; prices come from one source (`lib/pricing.ts`) with date and rate.
- Gap: brand facts (Organization/Dentist) are consistent but repeated; no external entity links (`sameAs`) beyond verified profiles, by design.

### 6. Measurement
- In place: Search Console (domain property), Vercel Analytics and Speed Insights, `trackEvent` for CTA and lead events (no personal data), lead attribution (`OGZ-PL`, `source_page_path`, campaign).
- Missing: Bing Webmaster Tools, GA4 (CSP and consent work needed), AI citation tracking, lead-quality (CRM) feedback.
- UK leads are now distinguishable only by `source_page_path` / `landing_page` (OGZ-UK removed in #91).

## Prioritised gaps

| # | Priority | Gap | Owner | Needs |
| --- | --- | --- | --- | --- |
| 1 | P0 | Bing Webmaster Tools: verify domain, submit sitemap | Owner (account) | Bing account; then I add the verification meta tag if required |
| 2 | P0 | Search Console re-read 2026-11-14, re-rank clusters by real queries | Me + owner | Search Console access (available) |
| 3 | P1 | Core Web Vitals measurement (PageSpeed Insights / Vercel Speed Insights data) | Owner / me | Production URL access outside sandbox |
| 4 | P1 | More reviewer approvals and documented cases | Doctors / owner | Written approval, patient consent |
| 5 | P1 | AI citation tracking (manual prompt set + monthly log or a tool) | Owner | Tool choice |
| 6 | P2 | Emit full clinic JSON-LD on home only, `@id` references elsewhere | Me | None (small PR) |
| 7 | P2 | Comparison and Polish-support pages | Me + owner | Verified facts (coordinator, prices abroad with sources) |
| 8 | P3 | GA4 with consent | Me + owner | Property, consent mechanism, CSP change |

## Commands used

Counts above come from parsing `.next/server/app/*.html` after `npm run build` (canonical, `noindex`, `application/ld+json`, `<h1>`, `<img alt>`, `hreflang`), `.next/server/app/sitemap.xml.body`, `app/robots.ts` and `find public -size +100k`.
