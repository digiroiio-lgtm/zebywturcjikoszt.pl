# Prioritisation scoring (deliverable D)

**Wewnętrzny model priorytetyzacji; nie jest zmierzoną prognozą popytu pacjentów.**

Weights: demographic 25%, searchDemand 25%, commercialIntent 20%, existingOrganic 15%, logistics 10%, differentiation 5%. A component without a *verified* input is null; a total is computed only when all six exist. No input is verified today, so every place reads **yetersiz veri** (coverage 0%).

The column "Brief figure" is the number quoted in the brief (ONS TS024 Polish as main language, local authority, 2021). It is **unverified**, it is a local-authority total (not a neighbourhood), and it is shown only to order the research queue. It is not a score.

| Brief order | Authority | Brief figure (unverified) | Total score | Status | Missing inputs |
| --- | --- | --- | --- | --- | --- |
| 1 | Ealing | 15449 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 2 | Southampton | 10436 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 3 | North Northamptonshire | 9297 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 4 | Hounslow | 9219 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 5 | Kingston upon Hull | 8564 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 6 | Leeds | 8271 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 7 | Leicester | 7940 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 8 | Birmingham | 7907 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 9 | Wakefield | 7900 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 10 | West Northamptonshire | 7828 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 11 | Nottingham | 7826 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 12 | Luton | 7823 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 13 | Slough | 7724 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 14 | Coventry | 7719 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 15 | Peterborough | 7507 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 16 | Bristol | 7017 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 17 | Somerset | 6614 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 18 | Bournemouth, Christchurch and Poole | 6563 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 19 | Doncaster | 6495 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 20 | Manchester | 6471 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 21 | Croydon | 6262 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 22 | Bradford | 5992 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 23 | Haringey | 5921 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 24 | Brent | 5817 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 25 | Merton | 5761 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 26 | Sandwell | 5685 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 27 | Barnet | 5542 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 28 | Buckinghamshire | 5434 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 29 | Cheshire East | 5102 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |
| 30 | Hillingdon | 5016 | – | yetersiz veri | demographic, searchDemand, commercialIntent, existingOrganic, logistics, differentiation |

To score a place: verify the census claim, add dated Search Console / keyword evidence, add logistics and differentiation evidence, then compute with `lib/geo/scoring.mjs`. Keyword volume, competition and lead forecasts are never generated.
