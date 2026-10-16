# Census source verification

No official file is present in `data/geo/uk/raw/`, so **nothing is verified**. The official sources could not be reached from the build environment (proxy), so the brief's figures stay `verified:false`.

Claims: 35. Match: 0. Differs: 0. Unverified: 35.

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

A match does not publish anything: a human must set `verified:true`, `source:"official"` and fill every provenance field in `data/geo/uk/census-claims.json` (via a reviewed change).
