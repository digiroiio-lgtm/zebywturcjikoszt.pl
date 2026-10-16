# Publication blockers for `/uk/szkocja`: progress (2026-10-16)

Order agreed with the operator: source PDF, NHS Scotland review, missing Aberdeen records, flights, Polish keyword research.

| # | Blocker | Result | Still needed |
| --- | --- | --- | --- |
| 1 | Council PDF verification | **Not possible here**: `committees.aberdeencity.gov.uk` is unreachable from the build environment. A web search found the likely primary document: the Local Housing Strategy 2025–2030 evidence base (`aberdeencity.gov.uk/services/housing/local-housing-strategy-2025-2030-evidence-base`, `aberdeencity.gov.uk/media/24483`). Search did not surface table 4-5.9 itself; the only Polish-specific figure it found is from 2011 | A person opens the document, confirms table 4-5.9 and the 13 figures, and ideally the Scotland's Census 2022 ward extract |
| 2 | NHS Scotland text | **Not verifiable by fetch** (`nhsinform.scot` unreachable). Search snippets agree with the draft: NHS inform's surgery-abroad page says NHS Scotland has no obligation to provide pre- or post-operative care beyond emergencies; the S2 page limits S2 to public providers in the EU, Switzerland, Norway, Iceland and Liechtenstein and says to contact the local NHS board for treatment outside Europe. No dental-specific NHS inform page was found | An editor opens both pages and confirms the wording; the draft already says the pages concern surgery and S2, not dentistry |
| 3 | Missing Aberdeen records | **Done**: seven areas added to the inventory (`origin: "council-table"`), linked from both records; `verify-geo` now fails a claim whose area has no location record. 124 records; the brief's tally (109 areas) is unchanged | Ward boundaries and postal districts verified against official lookups |
| 4 | Flights | Aggregators (not acceptable sources) suggest direct Antalya service from Edinburgh and Glasgow (SunExpress, Jet2, easyJet, Corendon named, schedules to Sep 2027) and none from Aberdeen; the sources disagree on carriers and frequency | Carrier or airport timetable links, then the placeholder can become a sourced sentence |
| 5 | Polish keyword research | **Blocked**: the Semrush account has no API units left (<https://www.semrush.com/mcp-access>). Search Console still shows no UK-related query (5 impressions in 90 days) | A dated keyword export or autocomplete evidence for Polish Scotland/Aberdeen/Glasgow/Edinburgh + treatment queries |

## Branch strategy for publication (#56 and #57)
#57 is stacked on #56 and must not be merged into `main` directly. Both PRs stay open and GEO_PREVIEW work continues. When publication is decided:
1. Preferred: merge #56 first (infrastructure for the official-secondary tier, the Aberdeen draft and evidence notes; everything in it is inert in production), then retarget #57 to `main`; its diff then shows only the hub work.
2. Alternative if #56 should not land as it is: create a clean branch from `main` and cherry-pick only the needed commits (tier + hub), leaving the Aberdeen draft out.
3. In both cases the record is moved to `published` in a separate, reviewed commit that sets `publishedOn` and the gate fields; `npm run verify` and the byte-comparison of sitemap/llms/page bodies run before any merge.

## Update: flights (2026-10-16, second pass)
A search restricted to carrier and airport domains surfaced pages from easyJet (Edinburgh and Glasgow to Antalya), Jet2 (Antalya, Glasgow and Edinburgh departures in 2027) and Glasgow Airport (Antalya page naming Jet2, easyJet and Corendon). No Aberdeen offer was found. The hub's placeholder is replaced by a hedged, dated sentence with those four links; Aberdeen is described as "no offer found". The build could not open the pages, so an editor must open the four links and confirm routes and carriers before publication. Flights stay on the blocker list as "editor confirmation", not as missing evidence.

Other blockers unchanged: council PDF and NHS pages remain unreachable from the build environment (`www.aberdeencity.gov.uk`, `www.nhs.uk` and `nhsinform.scot` all fail DNS), keyword demand still needs a dated export (Semrush has no API units), and clinical, editorial and legal reviews need people.
