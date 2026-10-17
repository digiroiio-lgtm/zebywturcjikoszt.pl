# Homepage sales flow (2026-10-17)

Each section answers one patient question and ends with the next easy step. The hero keeps the model photo.

| # | Section (id) | Question it answers | Next step |
| --- | --- | --- | --- |
| 1 | Hero | Is this for me? | "Poproś o bezpłatną wycenę" (contact page), "Zobacz efekty leczenia" |
| 2 | Trust strip (`home-trust-title`) + mobile clinic photos | Can I trust them? | "Kto prowadzi serwis" |
| 3 | Before/after (`visual-proof-title`) | Is my result possible? | "Poznaj swoje możliwości" (form, topic: other) |
| 4 | Prices (`price-highlights-title`) | Does it fit my budget? | "Poproś o łączną wycenę" (form) |
| 5 | Polish reviews (`polish-reviews-title`) + external profile links | Do similar patients trust them? | profile links |
| 6 | Treatments (`home-treatments-title`) | What do I need? | per card: guide, or "Poproś o wycenę: {treatment}" (form, topic preselected) |
| 7 | Doctors (`home-doctors-title`) | Why this clinic? | "Poproś o wstępną ocenę" (form) |
| 8 | Videos (`patient-stories-title`) | What does it look like in practice? | play |
| 9 | Process (`home-process-title`) | How do I start? | per step links, "Zacznij od zapytania" |
| 10 | Aftercare (`home-aftercare-title`) | What happens after I return? | guide links |
| 11 | FAQ | What holds me back? | |
| 12 | Short form (`home-lead-form`) | | submit; topic and `cta_location` come from the button that was pressed |
| – | Sources, editorial strip | | |

## Where the old content went
- Clinic intro text: into the doctors section. External review profile links: row under the reviews.
- Six "travel" cards: four process steps (contact, assessment and quote, travel and treatment, contact after treatment) plus the aftercare section; the longer guidance stays on `/antalya`, `/koszt`, `/listy-kontrolne` and the aftercare guide.
- "Zdjęcia to tylko część informacji" cards: links to `/opinie`, `/przed-i-po`, `/jak-wybrac-klinike` now sit in the process and doctors sections.
- Planning block ("Nowe zęby nie są nazwą jednego leczenia"): removed from the homepage; `/cala-szczeka` and the treatment pages carry that content.

## Trust facts (`lib/home-trust-facts.ts`)
`source: "repo"` for languages, prices and opening hours. "Własne laboratorium", "doświadczenie z pacjentami z zagranicy" and "koordynacja wizyty" are the site operator's statement in chat on 2026-10-17; there is no written record in the repository. They are not in JSON-LD, `llms.txt` or `llms-full.txt`. Patient counts and the number of branches are not stated anywhere.

## Not done
- Review cards keep their current text: an excerpt is shown only where the source record allows it, otherwise the card links to Trustpilot. No quote was written.
- Video titles are unchanged; real, content-based titles and Polish subtitles need the video owner.
- The zirconia treatment card still uses the drawing until its photo is supplied.
- No conversion or Lighthouse measurement.
