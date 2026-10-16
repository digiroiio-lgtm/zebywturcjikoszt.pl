# UK Polish Geo SEO Census Data – acquisition package

IMPORTANT: The files with RESEARCH_SEED in their names are NOT official census CSV exports. Their values are prior secondary research inputs awaiting validation against the original official downloads. Never present these as verified neighbourhood-level population counts.

Official raw source ZIP/XLSX files are NOT included. Official URLs were confirmed from the publishing websites but direct binary download was blocked in the execution environment.

## Acquire authoritative raw files

Use `download_official_data.py` from an internet-connected computer or give the official links in `official_source_manifest.csv` to your agent. The downloader saves files to `official_raw/` and records size and SHA-256 hashes. It does not manufacture census values.

TS012 = country of birth, detailed; TS024 = main language, detailed. These are two different metrics and must not be merged. Nomis archives include geographic CSVs; parse OA, LSOA, MSOA and local authority separately.

Scotland chart data Excel is NOT equivalent to the complete Scotland small-area tables. Export the appropriate ethnicity/identity tables from the Scotland Census data explorer before ward-level production use.

Postal districts are research targeting candidates, NOT census boundaries. Map to valid ONS geography using official postcode lookup and spatial crosswalks.

## Files
- official_source_manifest.csv — validated source URLs and availability
- polish_language_local_authorities_RESEARCH_SEED.csv — provisional 2021 area aggregates
- uk_geo_neighborhood_postcode_RESEARCH_SEED.csv — location and postcode research queue
- aberdeen_polish_ethnicity_RESEARCH_SEED.csv — provisional 2022 ethnic identity percentages
- download_official_data.py — fetch/download/checksum script for internet connected host

No synthetic person counts. No neighbourhood estimates. No automatic indexed pages based on candidate list.
