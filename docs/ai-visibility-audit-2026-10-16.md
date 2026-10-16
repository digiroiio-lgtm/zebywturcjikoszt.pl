# AI visibility and medical trust audit

Audit date: 2026-10-16. Audited build: `main` at `ed4f09a`. Method: read-only measurement of the built output (`.next/server/app`), a crawl of the running build, Lighthouse, and Search Console.

There is no tool that produces the "91/100" figure, so this report does not claim a score. Each acceptance criterion is reported as measured pass or fail instead.

## Scorecard (acceptance criteria)

| Criterion | Before | After |
| --- | --- | --- |
| Zero broken internal links in audited pages | Pass (2507 links, 39 pages, 0 non-200) | Pass (2512 links) |
| No contradictory published treatment prices | Pass by measurement, **not guarded**: four price sentences were hard-coded in `treatment-cost-scope.tsx` | Pass, and guarded by `npm run test:prices` |
| No invented reviews, credentials or outcomes | Pass (4 of 23 content pages reviewed, no `aggregateRating`/`Review` in JSON-LD, `clinic-verification.json` lists empty) | Pass, unchanged |
| Valid JSON and applicable structured data | Pass (0 invalid JSON-LD blocks) | Pass |
| Correct commercial-ownership disclosure | Legal name on 39/39 pages; the one-line note on 29/39 | Note on 34/39 (the remaining 5 are the four legal pages and the home page, which has its own hero line) |
| Consistent facts across HTML and AI files | 3 relative links, a URL with trailing dot in `llms.txt`, 4 reviewer URLs followed by a full stop in `llms-full.txt` | Fixed; the same defects are now blocked by `test:ai` |
| No new duplicate or canonical conflicts | Pass | Pass (0 canonical mismatches, 0 duplicate titles, sitemap = 39 pages) |
| No material Core Web Vitals regression | Baseline measured | No regression (below) |

## Issues found and what was done

| # | Priority | Issue | Status |
| --- | --- | --- | --- |
| F1 | P0 | `llms-full.txt` contained 3 relative source links (`/koszt`, `/poradniki/calkowity-koszt-wyjazdu`, `/uk/jak-zaplacic-za-leczenie-zebow-w-turcji`) | Fixed: `absoluteUrl()` in `lib/ai-content.ts`, also applied to `sources` in `content-provenance.json` |
| F2 | P0 | `llms.txt`: `Canonical origin: https://…pl.` had a full stop glued to the URL; `llms-full.txt`: four `Profil: https://…/eksperci/…​.` lines | Fixed: sentence re-ordered, reviewer profile is now a Markdown link |
| F3 | P0 | `llms-full.txt` had no document-level update date; price table had no PLN column | Fixed: `Ostatnia aktualizacja treści` line, `Około PLN` column (same rounding as the site) |
| F4 | P0 | Hard-coded prices in `treatment-cost-scope.tsx` ("Suma 600 EUR lub 1 050 EUR", "Aiser / Medentika: 450 EUR; Straumann: 900 EUR", crown and veneer prices) | Fixed: derived from `lib/pricing.ts`; rendered text is byte-identical today |
| F5 | P0 | No automated guard for price consistency | Added `scripts/verify-prices.mjs` (`npm run test:prices`, part of `verify`) |
| F6 | P1 | One-line commercial-ownership note missing on `/poradniki`, `/nasi-lekarze`, `/eksperci` and both expert profiles | Fixed with `components/commercial-note.tsx` (same markup and wording as `page-template.tsx`) |
| F7 | P1 | Thin primary clinical sources: `/przed-i-po` 0, `/koszt` only UOKiK, `/licowki` 1, `/poradniki/pakiety-leczenia-zebow` only this site | **Not changed** (see below) |
| F8 | P1 | Only 4 of 23 content pages have a documented medical review | **Not changed** (needs the operator's written confirmation) |
| F9 | P2 | EUR→PLN rate 4.37 is dated 2026-09-30 | **Not changed** (needs a sourced rate) |
| F10 | P2 | Lighthouse / Core Web Vitals had never been measured | Measured (below) |
| F11 | P2 | Home page accessibility: the labels in `.decision-grid` links ("Opinie", "Przed i po", "Klinika") have contrast 3.05:1 (4.5:1 needed); the brand link's `aria-label` does not contain its visible text (WCAG 2.5.3) | **Not changed**, outside this audit's scope |

### What `test:prices` checks
- `/koszt` JSON-LD `ItemList` has every item of `lib/pricing.ts` with the same EUR price.
- The `llms-full.txt` price table has every item with the same EUR and PLN (PLN = round(round(EUR × rate × 100) / 100), as `toPln`).
- Every EUR and PLN figure on all 39 pages and in `llms.txt` / `llms-full.txt` is a price item, a sum of two items, or n identical items (n ≤ 12), the pattern the "przykładowe sumy" tables use.
- Every page showing PLN states `1 EUR = 4,37 PLN` and the rate date. Result: 28 items, 375 figures, 39 pages.
- Checked against deliberate drift in a copy of the build: a stale `950 EUR` in a page, a wrong PLN in the llms table, and a changed JSON-LD price were each reported (a first attempt at the experiment did not run; the successful run is the one that counts).

### What `test:ai` now also checks
No relative Markdown link in the llms files, no URL followed by punctuation outside a link, every internal URL in the llms files is published (sitemap or a known file), both files state the content update date, and the price table has the PLN column.

## Technical validation

| Check | Result |
| --- | --- |
| `npm run verify` | exit 0 |
| Crawl of the running build | 39 pages, 2512 internal links, 0 with a query string, 0 non-200, CSP on every page, canonical = URL on every page |
| Sitemap / RSS / robots | 39 sitemap URLs = 39 built pages; 7 RSS items all in the sitemap; robots names the sitemap |
| Images | 76 `<img>`, all with alt text |
| `content-provenance.json` | valid JSON, 32 records, 105 source URLs (0 relative), 4 reviewed records, none with a reviewer while unreviewed |
| `clinic-verification.json` | valid JSON, `clinicCredentials` and `doctors` empty (left empty on purpose) |
| Structured data | Organization, Dentist + MedicalClinic, WebSite, BreadcrumbList, FAQPage (25 pages), Article (7), Person (3), ProfilePage (2); no `aggregateRating`. FAQ rich-result eligibility is not assumed |
| Search Console, 18 Sep – 15 Oct | 27 impressions, 0 clicks, 8 pages (the site is new in search); the available tools do not show index coverage |

### Lighthouse (local `next start`, single runs, simulated throttling)

| Page | Mobile perf before → after | Desktop perf | LCP mobile (s) | CLS | TBT mobile (ms) |
| --- | --- | --- | --- | --- | --- |
| `/` | 91 → 98 | 100 → 100 | 2.69 → 2.32 | 0 → 0 | 248 → 37 |
| `/koszt` | 99 → 99 | 100 → 100 | 2.02 → 2.01 | 0 → 0 | 48 → 39 |
| `/implanty` | 97 → 99 | 100 → 100 | 2.60 → 2.01 | 0 → 0 | 78 → 44 |
| `/nasi-lekarze` | 92 → 100 | 100 → 100 | 2.96 → 1.72 | 0 → 0 | 192 → 44 |

No regression. The mobile differences are within the noise of single local runs and are not attributed to these changes. SEO is 100 on every page. Best practices is 96 because of the `/_vercel/*` scripts that return 404 outside Vercel; accessibility is 96 on the home page (F11).

## Files changed
`lib/ai-content.ts`, `app/content-provenance.json/route.ts`, `components/treatment-cost-scope.tsx`, `components/commercial-note.tsx` (new), `app/poradniki/page.tsx`, `app/nasi-lekarze/page.tsx`, `app/eksperci/page.tsx`, `app/eksperci/[slug]/page.tsx`, `scripts/verify-prices.mjs` (new), `scripts/verify-ai-content.mjs`, `package.json`, `lib/content-fingerprints.json`, this file.

The fingerprint baseline was refreshed for the five pages that gained the ownership note. Their sitemap `lastmod` was not bumped because only a disclosure line was added.

## Remaining risks and limitations
- The exchange rate (4.37, 2026-09-30) ages. The site states that it is not updated automatically and shows its date, but a newer, sourced rate has to come from the owner.
- Medical review covers 4 pages. Nothing was added or implied for the others; reviews enter `lib/medical-review.ts` only with the operator's written confirmation.
- Clinical references were not added: they are medical claims and need a clinician's sign-off first.
- The Lighthouse figures are local and single-run; they show the absence of a regression, not a field Core Web Vitals result.
- Index coverage in Search Console could not be read with the available tools; use URL Inspection.

## Recommended next phase
1. A sourced EUR→PLN rate (for example an NBP table) and a rate-refresh routine.
2. Candidate primary references for `/licowki`, `/koszt` and `/przed-i-po`, verified one by one and approved by a reviewer before publication.
3. More documented page reviews, if the clinicians confirm them.
4. Fix F11 (contrast of the `.decision-grid` labels, the brand link name).
5. After a few weeks of data, review the exit-intent offer and the search queries that start to appear.
