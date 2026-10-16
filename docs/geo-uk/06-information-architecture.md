# Information architecture and route map (deliverable F)

Existing routes are preserved. Nothing below exists as a route today; every entry needs a record in `data/geo/uk/pages.json` that passes the gate.

| Route | Purpose | Status |
| --- | --- | --- |
| `/uk` | UK hub (exists) | live, unchanged |
| `/uk/anglia`, `/uk/szkocja`, `/uk/walia`, `/uk/irlandia-polnocna` | Country hubs; the default home for places without their own evidence | not created |
| `/uk/<city>` (e.g. `londyn`, `southampton`, `aberdeen`) | A city page, only for a distinct local intent with dated demand evidence and unique content | not created |
| `/uk/<city>/<neighbourhood>` | **Rejected for now.** Neighbourhood and postal-district pages would be near-duplicates and census data below local-authority level is unverified. Neighbourhoods appear as sections inside a city page |

Rules: a place without evidence folds into its country hub; a city page links to the relevant treatment pages and to the two UK guides, never to unpublished geo pages; breadcrumbs are `Strona główna › Dla Polaków w UK › <city>`; every page says patients travel to Antalya and that the clinic has no UK site. The postcode finder (deliverable) routes a district to its parent city or region and never creates a page.

Naming differences from the brief: `/wielka-brytania/londyn` → `/uk/londyn`; `/wielka-brytania/northampton` → `/uk/northamptonshire` (two unitary authorities, see inventory); `/wielka-brytania/boston-lincolnshire` → `/uk/boston-lincolnshire`.
