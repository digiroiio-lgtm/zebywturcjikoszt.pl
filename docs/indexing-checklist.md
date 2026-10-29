# Indexing checklist

Use this when a new site area ships or when Nightwatch shows far fewer indexed pages than the sitemap lists (the sitemap had 44 URLs while Nightwatch showed 10 on 29 Oct 2026).

## 1. Sitemap
- Search Console → Sitemaps: `https://leczeniezebowwturcji.pl/sitemap.xml` must show "Success" and about the same number of discovered pages as the sitemap lists.
- Resubmit after a large change. A sitemap `lastmod` only changes when `lastUpdated` changes in the content record (see `lib/page-history.ts` and `scripts/content-fingerprints.mjs`).

## 2. Read the Pages report (Indexing → Pages)
| Category | What it means | What to do |
| --- | --- | --- |
| Discovered – currently not indexed | Google knows the URL but has not crawled it yet | Request indexing for the key pages, add internal links from pages that already rank, wait |
| Crawled – currently not indexed | Crawled, not judged worth indexing yet | Improve the page (unique answer, sources, dated figures), link to it from strong pages |
| Duplicate, Google chose different canonical | Two URLs look the same | Check `alternates.canonical`; differentiate the content (see docs/seo-intent-map.md) |
| Alternate page with proper canonical tag | A variant pointing at the canonical | Usually fine (for example `?aeo=` test URLs) |
| Blocked by robots.txt / noindex | Not meant to be indexed | Only `/md/*.md` twins and `/api/` should appear here |

## 3. Request indexing (URL Inspection)
Google allows only about a dozen manual requests a day. Order: `/`, `/koszt`, `/implanty`, `/antalya`, `/korony-cyrkonowe`, `/licowki`, `/uk/ceny-leczenia-zebow-w-turcji-w-funtach`, `/dane/cennik-kliniki`, `/dane-kliniki`, then the guides.

## 4. IndexNow (Bing, Yandex and engines that read their index)
After each production deploy: `npm run indexnow` (it posts every sitemap URL; the key file is in `public/`). It does not notify Google.

## 5. Internal links
Every URL should have at least four inbound links from other pages. Add links in `contextualLinks` (`components/page-template.tsx`) or in a page's `sources`. Do not add links to medically reviewed pages (`implanty`, `licowki`, `cala-szczeka`, `all-on-4`) without the reviewer's re-confirmation.

## 6. Measure
Compare Search Console's indexed count and Nightwatch's "Indexed Pages" after about a week; record the numbers here with the date.
