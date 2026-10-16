# Publication and rollback plan (deliverable M)

Publication: a human adds or edits a record in `data/geo/uk/pages.json`, moves it stage by stage (`data/geo/uk/workflow.json`), and sets `stage:"published"` in a reviewed PR; `npm run verify` must pass; the operator merges. Drafts can be viewed locally with `GEO_PREVIEW=1 npm run dev` (noindex; the flag is ignored in production and on Vercel).

Rollback: revert the PR, or set the record's stage back below `published`. The route, sitemap entry, llms entry and links disappear on the next build. A retired URL then returns 404; if it had been indexed, decide between a 301 to its country hub and a 410 before deleting. Re-submit the sitemap in Search Console.
