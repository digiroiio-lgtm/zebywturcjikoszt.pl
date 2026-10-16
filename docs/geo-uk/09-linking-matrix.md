# Internal-linking matrix (deliverable J)

Applies only to records that passed the gate; today none exist, so no link is added anywhere.

| From | To | Anchor intent |
| --- | --- | --- |
| City page | `/uk` | "Leczenie zębów w Turcji dla Polaków w UK" |
| City page | `/implanty`, `/licowki`, `/korony-cyrkonowe`, `/cala-szczeka`, `/all-on-4` | Treatment relevant to the page's intent (max 3) |
| City page | `/koszt`, `/uk/ceny-leczenia-zebow-w-turcji-w-funtach` | Prices (EUR list; GBP is a dated conversion) |
| City page | `/uk/jak-zaplacic-za-leczenie-zebow-w-turcji` | Payment, GHIC and insurance |
| City page | `/kontakt` | Existing CTA via `TrackedLink` (clean href, attribution in `sessionStorage`) |
| `/uk` hub | published city pages | Listed only once published; the hub shows nothing for unpublished places |
| Treatment pages | city pages | None by default (avoid link-dumping from commercial pages) |
| City page | other city pages | Only neighbours in the same country hub |
