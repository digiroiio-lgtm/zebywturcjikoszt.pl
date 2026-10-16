# Census source verification

No official file is present in `data/geo/uk/raw/`, so **no claim is verified against a direct official extract**. (13 Aberdeen claims are verified at the *official-secondary* tier through a council publication; see the last section.) The official sources could not be reached from the build environment (proxy), so the brief's figures stay `verified:false`.

Claims: 43. Match: 0. Differs: 0. Without a direct official row: 43.

| Claim | Geography | Brief | Official | Status |
| --- | --- | ---: | ---: | --- |
| ts024/ealing | Ealing | 15449 |  | unverified (no official row) |
| ts024/southampton | Southampton | 10436 |  | unverified (no official row) |
| ts024/north-northamptonshire | North Northamptonshire | 9297 |  | unverified (no official row) |
| ts024/hounslow | Hounslow | 9219 |  | unverified (no official row) |
| ts024/kingston-upon-hull | Kingston upon Hull | 8564 |  | unverified (no official row) |
| ts024/leeds | Leeds | 8271 |  | unverified (no official row) |
| ts024/leicester | Leicester | 7940 |  | unverified (no official row) |
| ts024/birmingham | Birmingham | 7907 |  | unverified (no official row) |
| ts024/wakefield | Wakefield | 7900 |  | unverified (no official row) |
| ts024/west-northamptonshire | West Northamptonshire | 7828 |  | unverified (no official row) |
| ts024/nottingham | Nottingham | 7826 |  | unverified (no official row) |
| ts024/luton | Luton | 7823 |  | unverified (no official row) |
| ts024/slough | Slough | 7724 |  | unverified (no official row) |
| ts024/coventry | Coventry | 7719 |  | unverified (no official row) |
| ts024/peterborough | Peterborough | 7507 |  | unverified (no official row) |
| ts024/bristol | Bristol | 7017 |  | unverified (no official row) |
| ts024/somerset | Somerset | 6614 |  | unverified (no official row) |
| ts024/bournemouth-christchurch-and-poole | Bournemouth, Christchurch and Poole | 6563 |  | unverified (no official row) |
| ts024/doncaster | Doncaster | 6495 |  | unverified (no official row) |
| ts024/manchester | Manchester | 6471 |  | unverified (no official row) |
| ts024/croydon | Croydon | 6262 |  | unverified (no official row) |
| ts024/bradford | Bradford | 5992 |  | unverified (no official row) |
| ts024/haringey | Haringey | 5921 |  | unverified (no official row) |
| ts024/brent | Brent | 5817 |  | unverified (no official row) |
| ts024/merton | Merton | 5761 |  | unverified (no official row) |
| ts024/sandwell | Sandwell | 5685 |  | unverified (no official row) |
| ts024/barnet | Barnet | 5542 |  | unverified (no official row) |
| ts024/buckinghamshire | Buckinghamshire | 5434 |  | unverified (no official row) |
| ts024/cheshire-east | Cheshire East | 5102 |  | unverified (no official row) |
| ts024/hillingdon | Hillingdon | 5016 |  | unverified (no official row) |
| sc2022/aberdeen/tillydrone | Tillydrone / Seaton / Old Aberdeen | 13.2 |  | unverified (no official row) |
| sc2022/aberdeen/northfield | Northfield / Mastrick North | 8.8 |  | unverified (no official row) |
| sc2022/aberdeen/torry | Torry / Ferryhill | 6.6 |  | unverified (no official row) |
| sc2022/aberdeen/hilton | Hilton / Woodside / Stockethill | 6.3 |  | unverified (no official row) |
| sc2022/aberdeen/george-street | George Street / Harbour | 4.8 |  | unverified (no official row) |
| sc2022/aberdeen/dyce | Dyce / Bucksburn / Danestone | 3.1 |  | unverified (no official row) |
| sc2022/aberdeen/bridge-of-don | Bridge of Don | 1.9 |  | unverified (no official row) |
| sc2022/aberdeen/kingswells | Kingswells / Sheddocksley / Summerhill | 3.5 |  | unverified (no official row) |
| sc2022/aberdeen/midstocket | Midstocket / Rosemount | 2.6 |  | unverified (no official row) |
| sc2022/aberdeen/lower-deeside | Lower Deeside | 0.7 |  | unverified (no official row) |
| sc2022/aberdeen/hazlehead | Hazlehead / Queens Cross / Countesswells | 1.4 |  | unverified (no official row) |
| sc2022/aberdeen/airyhall | Airyhall / Broomhill / Garthdee | 2.1 |  | unverified (no official row) |
| sc2022/aberdeen/kincorth | Kincorth / Nigg / Cove | 4.3 |  | unverified (no official row) |

## Aberdeen ward groups: corroboration by a council publication

Aberdeen City Council's *Local Housing Strategy Evidence Base*, table 4-5.9 (percentages citing Scotland's Census 2022; no ward counts or denominators; file supplied by the operator, the PDF could not be retrieved from the build environment). Corroboration never sets `verified`.

| Claim | Ward group | First source | Council table | Agrees |
| --- | --- | ---: | ---: | --- |
| sc2022/aberdeen/tillydrone | Tillydrone / Seaton / Old Aberdeen | – | 13.2 | yes |
| sc2022/aberdeen/northfield | Northfield / Mastrick North | – | 8.8 | yes |
| sc2022/aberdeen/torry | Torry / Ferryhill | – | 6.6 | yes |
| sc2022/aberdeen/hilton | Hilton / Woodside / Stockethill | – | 6.3 | yes |
| sc2022/aberdeen/george-street | George Street / Harbour | – | 4.8 | yes |
| sc2022/aberdeen/dyce | Dyce / Bucksburn / Danestone | – | 3.1 | council only (new group) |
| sc2022/aberdeen/bridge-of-don | Bridge of Don | – | 1.9 | council only (new group) |
| sc2022/aberdeen/kingswells | Kingswells / Sheddocksley / Summerhill | – | 3.5 | council only (new group) |
| sc2022/aberdeen/midstocket | Midstocket / Rosemount | – | 2.6 | council only (new group) |
| sc2022/aberdeen/lower-deeside | Lower Deeside | – | 0.7 | council only (new group) |
| sc2022/aberdeen/hazlehead | Hazlehead / Queens Cross / Countesswells | – | 1.4 | council only (new group) |
| sc2022/aberdeen/airyhall | Airyhall / Broomhill / Garthdee | – | 2.1 | council only (new group) |
| sc2022/aberdeen/kincorth | Kincorth / Nigg / Cove | – | 4.3 | council only (new group) |

Three groups (Lower Deeside, Hazlehead / Queens Cross / Countesswells, Airyhall / Broomhill / Garthdee) exist only in the council table and have no record in the 24-area Aberdeen inventory yet.

A match does not publish anything: a human must set `verified:true`, `source:"official"` and fill every provenance field in `data/geo/uk/census-claims.json` (via a reviewed change).
