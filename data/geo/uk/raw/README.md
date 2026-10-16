# Official census tables (not committed)

Place downloaded tables here as CSV with this header, then run `npm run geo:import`:

`geography,metric,value,denominator,year,definition,dataset,sourceUrl,verifiedOn`

`metric` is one of `polandBorn`, `polishMainLanguage`, `polishNationalIdentity`. The three are different definitions and are never merged.

| Need | Source |
| --- | --- |
| Main language (TS024), England and Wales | ONS Census 2021 via Nomis, https://www.nomisweb.co.uk/ |
| Country of birth (TS012) | ONS Census 2021 via Nomis |
| National identity (TS027) | ONS Census 2021 via Nomis |
| Scotland ethnic group / national identity, 2022 | https://www.scotlandscensus.gov.uk/ |
| Northern Ireland 2021 | https://www.nisra.gov.uk/ |
| Wales | https://statswales.gov.wales/ |
| Postcode-to-area lookups | ONS Postcode Directory (ONSPD) / NSPL, https://geoportal.statistics.gov.uk/ |

The build environment could not reach these hosts. Census figures are historical baselines (2021/2022), not 2026 estimates.
