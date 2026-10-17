# Search-intent audit: plan vs. live `main` (2026-10-17)

Source: local build of `main` at `4f820e4` (the live site is not reachable from the sandbox), `npm run audit:seo`, and Search Console (`sc-domain:leczeniezebowwturcji.pl`, 18 Sep to 17 Oct). Scores are our own judgement, not tool output.

## 1. Search Console reality check
27 impressions, 0 clicks in 30 days; best pages by impressions: `/` (8, pos. 22), `/implanty` (5, pos. 36), `/koszt` (4, pos. 21), `/przed-i-po` (3, pos. 9), `/uk/jak-zaplacic…` (3, pos. 7), `/antalya` (2, pos. 53). Only four queries are recorded ("zeby w turcji koszt", "tureckie zęby cena", "mersin all on 4 fiyatları", "wyjmowane protezy zębowe w antalyi"). This is far too little data to rank clusters by demand: the priorities below remain intent- and fit-based, as agreed. One query hints at removable dentures (cluster 10), at a single impression.

## 2. The 13 clusters: plan vs. what is live
| # | Cluster | Target | Status | What is live | Gap |
|---|---|---|---|---|---|
| 1 | Cena / koszt zrobienia zębów | `/koszt` | DONE | Title, H1 "Ile kosztuje zrobienie zębów w Turcji?", 34-word direct answer with unit and rate date, one-tooth/crowns/implant/full-arch section, 10 tables, 13 FAQ | No Turkey-vs-Poland price comparison (no dated Polish source) |
| 2 | Cała szczęka cena | `/cala-szczeka` | PARTIAL | Title, description, CTA updated; All-on-4/All-on-6 and condition-based scenarios exist | H1 and body unchanged (clinician re-approval); no single-jaw vs both-jaws split; title is 61 characters |
| 3 | Implanty cena | `/implanty` | PARTIAL | Title, description (prices), CTA; component table (implant, abutment, crown) | Price is not in the first paragraph; H1 unchanged (re-approval) |
| 4 | Przed i po | `/przed-i-po` | PARTIAL / BLOCKED | CTA done; reading guide and standard of publication | Gallery is not grouped by treatment (treatment type is unverified); no physician-approved case summaries (`verifiedCases` is empty); meta description is only 113 characters; no table |
| 5 | Opinie / forum | `/opinie` | PARTIAL | Dated ratings table, reading guide, UOKiK law, profile links | The validated Polish reviews (home page component) are not on this page; no negative-review or limitations view; "implants" section is a reading guide, not experiences |
| 6 | Dobra klinika / gdzie | `/jak-wybrac-klinike` | DONE | Criteria table, 20 questions, red flags, no self-ranking, 10 FAQ | Meta description is 116 characters |
| 7 | Jak to wygląda / Antalya | `/antalya` | DONE (data-limited) | Four-stage table, before/after-trip sections, 9 FAQ | No responsible person or timing per stage (needs clinic data) |
| 8 | Po polsku | `/antalya`, `/kontakt` | NOT DONE on `/antalya` | `/kontakt` lists hours and five languages; `/jak-wybrac-klinike` FAQ covers Polish-language service | `/antalya` has no Polish-support section; the Polish coordinator vs Polish-speaking doctor split cannot be claimed without confirmation |
| 9 | Zęby w jeden dzień | new guide | NOT STARTED | Only a mention on `/all-on-4` | Needs clinician input before any page |
| 10 | Protezy zębowe | new page | NOT STARTED | Mentioned in passing | No price or option data from the clinic |
| 11 | Zęby w Polsce koszt | comparison guide | NOT STARTED | `/koszt` has a method-only section | Needs dated, cited Polish prices |
| 12 | Wybielanie | `/wybielanie-zebow` | BLOCKED | Whitening only compared on `/licowki` | Service not confirmed |
| 13 | Meditravel | no page | AS PLANNED | none | none |

## 3. Defects and mismatches found
1. **Duplicate H2 regression from the form redesign (#84).** The new default form heading "Poznaj możliwości leczenia i orientacyjny koszt" is rendered as an `<h2>` on `/`, `/kontakt` and three times on `/przed-i-po` (one per hidden case dialog). `audit:seo` now warns about it. Fix: let dialog forms use an `h3` (or a `headingLevel` prop) and keep a single `h2` per page.
2. `/cala-szczeka` title is 61 characters (over the 60 limit used by the crawler checks).
3. Short meta descriptions: `/przed-i-po` 113, `/licowki` 114, `/jak-wybrac-klinike` 116, `/kontakt` 121.
4. The EUR to GBP rate on the `/uk` price page is from 2026-10-03 and the audit warns it needs a new reading (operator input).
5. Fingerprint warnings on eight pages (text changed, `lastmod` not). The four clinically reviewed ones cannot be bumped without reviewer re-confirmation; the others (`/`, `/koszt`, `/korony-cyrkonowe`, `/kontakt`, `/pytania-i-odpowiedzi`) can be refreshed.
6. Home page title ("Ceny, implanty i korony") and H1 ("implanty i metamorfozy uśmiechu") differ in emphasis.
7. Structured data: Organization, Country, OpeningHours, address and ImageObject are repeated on every page (planned earlier: keep full markup on the home page, reference elsewhere).

## 4. Opportunities
- Reuse the validated Polish reviews component on `/opinie` (data and permission gate already exist) and add a short "limitations and complaints" note drawn from real sources only.
- Add a neutral "Obsługa po polsku" section on `/antalya`: five languages (confirmed on the site), what to ask about a Polish-speaking doctor vs a coordinator, no unconfirmed claim.
- Lengthen the thin meta descriptions with intent wording.
- Single jaw vs both jaws and the first-paragraph price on `/cala-szczeka` and `/implanty` once reviewers (Merey, Akça) approve body changes; prepare the text now so the review is one step.
- Measure: Search Console is nearly empty, so check again after 4 to 6 weeks and add query-level tracking before choosing P2/P3 pages.

## 5. Proposed next PRs
1. Quick fixes (no clinical text): H2 regression, `/cala-szczeka` title, meta descriptions, fingerprint refresh for non-reviewed pages.
2. `/opinie` reuse of validated reviews and `/antalya` Polish-support section.
3. Clinician-reviewed changes (H1, single/both jaws, first-paragraph price) after the reviewers re-confirm.
4. P2/P3 pages only after the data above exists.
