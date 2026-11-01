# Topic clusters and internal links (2026-11-01)

Hubs are the pages that own an intent (`docs/seo-intent-map.md`); spokes are the guides and supporting pages that answer one question in depth. Every spoke links back to its hub through its "next steps" block, and the hub links to the spokes it depends on. Counts below are inbound links from page bodies (header, footer and menus excluded), measured on the build of 2026-11-01.

| Cluster | Hub | Spokes | Notes |
| --- | --- | --- | --- |
| Price | `/koszt` | `/poradniki/calkowity-koszt-wyjazdu` (31), `/poradniki/pakiety-leczenia-zebow` (6), `/uk/ceny-leczenia-zebow-w-turcji-w-funtach` | Package and trip-budget guides answer "what else do I pay?" |
| Trip | `/antalya` | `/poradniki/calkowity-koszt-wyjazdu`, `/poradniki/pakiety-leczenia-zebow`, `/poradniki/opieka-po-leczeniu` (32), `/poradniki/tureckie-zeby` | `/antalya` now links to the package guide, the trip-budget guide and the aftercare guide |
| Choosing a clinic | `/jak-wybrac-klinike` | `/opinie`, `/poradniki/rankingi-klinik-dentystycznych-w-turcji` (6), `/poradniki/tureckie-zeby` (9) | |
| Results and methods | `/przed-i-po`, `/licowki` | `/poradniki/licowki-czy-korony` (6) | `/przed-i-po` now links to the veneers-or-crowns guide (how to read what the photos show) |
| Full mouth | `/cala-szczeka` | `/all-on-4`, `/koszt`, home "Wszystkie zęby na implantach" block | All-on-6 has no page: see the intent map |
| UK | `/uk` | `/uk/jak-zaplacic-...`, `/uk/ceny-...-w-funtach`, `/uk/finansowanie-...`, `/uk/szkocja` | Linked from the home page "Mieszkasz w UK?" block; no instalment pages (finance gate) |

## Rules
- Reviewed pages (`/implanty`, `/licowki`, `/all-on-4`, `/cala-szczeka`, `/korony-cyrkonowe`) are never edited to add links: a text change would withdraw the doctor's approval. Their inbound links come from other pages.
- Link-only additions on other pages do not move that page's `lastUpdated`/sitemap lastmod (the dated content did not change); the page's own fingerprint entry is refreshed only when the page had no earlier open warning (`/przed-i-po` keeps its existing one).
- No site-wide exact-match anchors and no "every page links to every money page" (`docs/authority-audit-2026-09-19.md`).

## Changes in this round
- `/antalya`: + trip-budget guide, package guide, aftercare guide.
- `/przed-i-po`: + veneers-or-crowns guide.
- Home page: full-mouth block links to `/all-on-4`, `/cala-szczeka`, `/koszt`.
