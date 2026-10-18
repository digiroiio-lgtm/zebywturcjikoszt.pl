# Markdown twins for AI readers

Every patient guide (`patientGuides` in `lib/ai-content.ts`: the money pages, guides and `/uk*` pages, 22 in total) has a Markdown twin at `/<slug>.md`, for example `/koszt.md` and `/uk/szkocja.md`.

- **Source:** `guideMarkdown(slug)` in `lib/ai-content.ts`. The body comes from the same `guideLines()` helper as `llms-full.txt`, so the HTML page, `llms-full.txt` and the Markdown file are generated from the same data. `llms-full.txt` is byte-identical to the version before this change.
- **Content:** front matter (title, canonical URL, language, last updated, publisher), H1, description, review state (`reviewSummary`), lead, direct answer, sections, FAQ with source anchors, sources with absolute URLs. `/koszt.md` also carries the price table with the EUR/PLN rate note.
- **Serving:** `app/md/[...slug]/route.ts` (static) behind a rewrite `/:slug(.+).md` -> `/md/:slug` in `next.config.ts`. `/md/<slug>` answers too; both carry the same headers.
- **Headers:** `Content-Type: text/markdown`, `Link: <canonical>; rel="canonical"`, `X-Robots-Tag: noindex, follow`. The HTML page stays the indexed canonical; the Markdown file is for AI crawlers and tools and is not in the sitemap.
- **Discovery:** `llms.txt` lists the Markdown URL after each guide description.
- **Guard:** `npm run test:markdown` (`scripts/verify-markdown.mjs`) checks one twin per guide with a sitemap HTML page, front matter, canonical, review line equal to `llms-full.txt`, FAQ questions equal to the HTML FAQPage schema, no relative links, the price table on `/koszt.md`, and the rewrite in the routes manifest.

Not covered: the home page, legal pages and expert profiles have no Markdown twin (they are not in `patientGuides`).
