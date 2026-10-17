# Keyword → intent → canonical URL map

Updated: 2026-10-17

| Canonical URL | Primary query / intent | Secondary and supporting queries | Decision |
|---|---|---|---|
| `/` | zęby w Turcji / broad commercial investigation | leczenie zębów w Turcji, Antalya, koszt, możliwości | PRIMARY |
| `/koszt` | zęby w Turcji koszt | cena, cennik, ile kosztują zęby w Turcji, Turcja czy Polska | PRIMARY; all price variants MERGED |
| `/implanty` | implanty zębów w Turcji | implanty w Turcji, implanty cena | PRIMARY; no separate `/implanty/koszt` |
| `/korony-cyrkonowe` | korony cyrkonowe w Turcji | korona cyrkonowa cena, ceny EUR / PLN, korona a licówka | PRIMARY; clinic unit price supplied, distinct commercial scope |
| `/licowki` | licówki w Turcji | licówki cena, zęby w Turcji licówki | PRIMARY |
| `/cala-szczeka` | zęby w Turcji cała szczęka | pełna rekonstrukcja, ile kosztuje cała szczęka, All-on-6 supporting | PRIMARY |
| `/all-on-4` | All-on-4 Turcja | zęby w Turcji All-on-4 | PRIMARY |
| `/opinie` | zęby w Turcji opinie | forum, opinie forum, doświadczenia pacjentów | PRIMARY; forum variants MERGED |
| `/przed-i-po` | zęby w Turcji przed i po | efekty leczenia, metamorfozy | PRIMARY |
| `/antalya` | zęby w Turcji Antalya | dentysta Antalya, leczenie zębów Antalya | PRIMARY |
| `/jak-wybrac-klinike` | jak wybrać klinikę w Turcji | klinika stomatologiczna Turcja, zęby w Turcji klinika, czy warto, gdzie robić zęby w Turcji | PRIMARY |
| `/uk` | leczenie zębów w Turcji dla Polaków w UK | Polacy w UK, GHIC, polisa, waluta, kontrola po powrocie | PRIMARY (new audience silo); links out, does not copy `/koszt`, `/antalya` |
| `/uk/jak-zaplacic-za-leczenie-zebow-w-turcji` | jak zapłacić za leczenie zębów w Turcji mieszkając w UK | finance dental treatment Turkey (informational), czy na raty | PRIMARY; neutral options and risks, no product |
| `/uk/ceny-leczenia-zebow-w-turcji-w-funtach` | ceny leczenia w funtach | dental treatment Turkey cost GBP | PUBLISHED 2026-10-03 with an owner-supplied rate (0.85, Yahoo Finance reading, rounded to two decimals; not an official rate); conversion of the clinic EUR list, no UK price column. Refresh the rate and date in `lib/pricing.ts` when it is re-read |
| `/poradniki/rankingi-klinik-dentystycznych-w-turcji` | najlepsza klinika dentystyczna w Turcji | ranking klinik dentystycznych Turcja, najlepsze kliniki stomatologiczne w Turcji | PRIMARY for "ranking" intent; no own ranking (operator runs Akdeniz Dental); how-to-find questions stay on `/jak-wybrac-klinike` |
| `/poradniki/tureckie-zeby` | tureckie zęby | o co chodzi z tureckimi zębami, czy tureckie zęby są dobre, problemy z tureckimi zębami, ile wytrzymują zęby z Turcji, leczenie w tydzień | PRIMARY (no earlier owner); links to, does not copy, `/jak-wybrac-klinike` red flags and `opieka-po-leczeniu` |

## P1 decisions

- `/czy-warto`: MERGED into `/jak-wybrac-klinike`.
- `/turcja-czy-polska`: MERGED into `/koszt`.
- `/na-raty` and all instalment / loan / monthly-payment pages for UK residents: DEFERRED until a verified finance arrangement exists (UK entity, FCA-authorised credit broker or appointed representative, named lender, approved terms, financial-promotion sign-off). Stage 1 of the UK section (`/uk`, `/uk/jak-zaplacic-za-leczenie-zebow-w-turcji`) is informational only; `lib/finance-gate.ts` and the SEO audit block finance-promotion wording until the gate is set.
- `/korony-cyrkonowe`: PUBLISHED at the operator’s request after receipt of the clinic unit price. Owns crown scope and crown price questions; no search-volume claim is made.
- `/all-on-6`: DEFERRED until verified availability and distinct GSC/SERP evidence exist.
- `/bonding`: DEFERRED; insufficient distinct commercial evidence for launch.

## PAA ownership (2026-10-03)

One owner page per question; other pages link instead of repeating. The audit fails on a duplicate FAQ question across pages and warns on a duplicate H2.

| Question intent | Owner | Notes |
|---|---|---|
| Czy w Turcji opłaca się robić zęby? Turcja czy Polska? Ile kosztują zęby w TR a w PL? W jakim kraju najtaniej? | `/koszt` | Method only: no Polish prices, no country ranking, until a dated source exists |
| Ile kosztuje 6 implantów i cały wyjazd? | `poradniki/calkowity-koszt-wyjazdu` | Arithmetic from `lib/pricing.ts` with scope caveat |
| Czy warto jechać? Gdzie robić zęby? Najlepsze kliniki? | `/jak-wybrac-klinike` | No ranking: the operator runs Akdeniz Dental |
| Ile trwa leczenie w Turcji? | `/antalya` | No day count without a confirmed plan |
| Tureckie zęby: co to, czy dobre, problemy, trwałość, leczenie w tydzień | `poradniki/tureckie-zeby` | Sources: NHS checklist, The Conversation article, ADA |
| Opinie o tureckich zębach, o Akdeniz Dental | `/opinie` | Dated third-party ratings, relationship disclosed |
| Licówki: jak długo, minusy, czy zęby się psują | `poradniki/licowki-czy-korony` | No years stated |
| Wszystkie zęby, All-on-6 cena | `/cala-szczeka` (unchanged, medically reviewed) | `/all-on-6` stays deferred; editing reviewed pages requires reviewer re-confirmation |

## UK section (2026-10-03)

Stage 2 pages (raty, finansowanie, implanty na raty, monthly payments, eligibility, "from £x/month", All-on-4 and veneers on instalments, loan) need documented prerequisites before any copy is written: UK entity and ICO registration, FCA status and FRN, lender, product facts, promotion sign-off, UK lawyer review, UK GDPR representative decision. Validate demand first in Search Console (country GB, Polish and English queries) for 2-4 weeks.

## Long-tail ownership (2026-10-03)

| Question intent | Owner |
|---|---|
| Prices of root canal, bleaching, fillings, sedation and general anaesthesia, sinus lift and bone graft, extraction, hygiene and gum treatment | `/koszt` FAQ (clinic price list only) |
| How to find a good clinic, certificates (JCI/ISO), intermediary vs direct, verifying the dentist, Polish-language service | `/jak-wybrac-klinike` FAQ |
| Visa, when to go, what to bring, payment method | `/antalya` FAQ |
| Rankings of clinics: how they work, advertising in disguise | `poradniki/rankingi-klinik-dentystycznych-w-turcji` |

Not published on purpose: flight duration and direct-flight questions (need a cited source), flying after treatment and accompanying person (need a medical reviewer), orthodontics, dentures and bridges (no price data, clinic confirmation needed), Istanbul vs Antalya and country comparisons (no comparable data).

## Overlap QA

| Pair | Initial risk | Resolution | Final risk |
|---|---|---|---|
| `/` vs `/koszt` | HIGH | Homepage gives orientation; `/koszt` owns price variants | LOW |
| `/implanty` vs `/all-on-4` | MEDIUM | Implant planning vs full-arch concept | LOW |
| `/cala-szczeka` vs `/all-on-4` | HIGH | Problem-oriented map vs method-specific qualification | LOW |
| `/opinie` vs `/przed-i-po` | MEDIUM | Review verification vs clinical image literacy | LOW |
| `/antalya` vs `/` | MEDIUM | Treatment logistics vs broad overview | LOW |
| `/jak-wybrac-klinike` vs `/opinie` | MEDIUM | Provider due diligence vs review-source literacy | LOW |
| `poradniki/tureckie-zeby` vs `/jak-wybrac-klinike` | MEDIUM | Myth, risk and durability questions vs due-diligence checklist; guide links to the checklist | LOW |
| `/uk/jak-zaplacic-...` vs `/jak-wybrac-klinike` | MEDIUM | UK payment options and credit risks vs deposit and clinic due diligence; links both ways | LOW |
| `/uk/ceny-...-w-funtach` vs `/koszt` | MEDIUM | GBP conversion method and currency note vs price list owner; only selected items | LOW |
| `poradniki/rankingi-...` vs `/jak-wybrac-klinike` | MEDIUM | Reading rankings and advertising vs clinic due-diligence checklist and "how to find a clinic" FAQ; guide links to the checklist | LOW |
| `/koszt` vs `poradniki/calkowity-koszt-wyjazdu` | MEDIUM | Price list and Turkey-vs-Poland question vs trip budget method and scenario sums | LOW |

No HIGH-overlap pair is published.

## Commercial pricing scope

- `/koszt` owns the complete 24-item list, grouped into five anchored categories. Each item appears once.
- Treatment pages answer their own price and inclusion questions; category links do not create duplicate landing pages.
- Arithmetic subtotals use the central EUR prices and the disclosed dated PLN conversion. They are not confirmed quotes or complete package prices.
- Implant scope must distinguish the implant, abutment, crown, diagnostics and temporary work. Unconfirmed inclusions are explicitly identified.
- Full-arch and All-on-4 package totals remain unpublished until written scope, included and excluded services, date, validity and approval are supplied.
- New crown content has its actual publication date and remains medically unreviewed until an evidenced page review is recorded.

## Search-cluster prioritisation (2026-10-17)

Related searches show topic demand, not volume or competition. Order: purchase intent, fit with an existing page, patient value. Same-intent searches are merged into existing pages; no `/cena`, `/cennik` or `/koszt-zebow` copies.

| Priority | Search cluster | Target | Status |
|---|---|---|---|
| P0 1 | zęby w Turcji cena / koszt zrobienia zębów | `/koszt` | Done 2026-10-17: title, H1, short answer from `lib/pricing.ts`, one-tooth / several crowns / implant / full-arch table, CTA |
| P0 2 | ile kosztują zęby w Turcji cała szczęka | `/cala-szczeka` | Head and CTA done (page is clinician-reviewed; H1 and body wait for re-approval by Mustafa Akça). No full-arch total is published. |
| P0 3 | implanty zębów w Turcji cena | `/implanty` | Head and CTA done (reviewed page; body waits for re-approval by Mehmet Onur Merey) |
| P0 4 | zęby w Turcji przed i po | `/przed-i-po` | CTA done. Grouping by treatment type and clinician-approved case summaries wait for verified case data (`lib/evidence.ts` has none). |
| P1 5 | opinie forum / implanty opinie | `/opinie` | Next PR: implant experiences section, sources, problems and limits |
| P1 6 | gdzie najlepiej zrobić zęby / dobra klinika | `/jak-wybrac-klinike` | Next PR: criteria table, no claim that our clinic is first |
| P1 7 | jak to wygląda / Antalya | `/antalya` | Planned: stages with documents, owner and time |
| P1 8 | zęby w Turcji po polsku | section in `/antalya` and `/kontakt` | Waits for confirmation of what Polish-language support covers; "Polish-speaking doctor" and "Polish coordinator" must be told apart |
| P2 9 | zęby w jeden dzień Turcja | new guide later | After the foundation pages |
| P2 10 | protezy zębowe w Turcji | new page later | After the foundation pages |
| P2 11 | zęby w Polsce koszt | comparison guide later | Needs dated, sourced Polish prices |
| P3 12 | wybielanie zębów Turcja | `/wybielanie-zebow` only if the service is confirmed | `bleaching` exists as a price item; page waits for confirmation |
| P3 13 | zęby w Turcji Meditravel | no page | Brand search of a third party; not pursued |

The homepage serves the general "zęby w Turcji" query and sends visitors to prices (`/koszt`), real results (`/przed-i-po`) and clinic choice (`/jak-wybrac-klinike`) through three entry links under the hero.

## Search-intent PR 2 (2026-10-17)

Added from existing data only; nothing invented.

| Page | Added | Source of facts |
|---|---|---|
| `/jak-wybrac-klinike` | Table "Jak porównać dwie oferty klinik" (criterion, what to establish, warning sign); no prices, no ranking | Existing page checklist and UOKiK/NHS sources |
| `/opinie` | Dated ratings table (Trustpilot, Google Maps) and "implant and reconstruction reviews: what to look for"; profile links as sources | `lib/clinic-profiles.ts` (operator reading of 2 Oct 2026, relationship disclosed) |
| `/antalya` | Four-stage table "Etapy leczenia w Antalyi" (contact, examination and plan, treatment, check and return) | Same stages as the home page process; no day counts |

Still waiting on data (not written, no placeholders): documented patient cases and a physician-reviewed summary; a confirmed Polish-speaking coordinator or physician (languages are listed on the site, a coordinator role is not confirmed); implant-specific patient reviews with verifiable sources; a cited source for flight duration. Polish-language service stays owned by the `/jak-wybrac-klinike` FAQ.

## Opportunities applied (2026-10-17)

- `/opinie` now embeds the source-verified Polish reviews (same data and permission gate as the home page, own heading "Opinie pacjentów po polsku z Trustpilot" so there is no duplicate H2). The component says the selection is positive and links to the full critical set on Trustpilot.
- `/antalya` has "Obsługa po polsku: o co zapytać": the five service languages (as listed on `/kontakt`) and five questions separating a Polish-speaking doctor from a coordinator or adviser. No coordinator claim is made.
- Longer meta descriptions on `/opinie`, `/jak-wybrac-klinike`, `/przed-i-po`, `/kontakt`, `/licowki` (head only; `/licowki` is clinician-reviewed and its body and date are unchanged).
- Search Console to be re-read around 2026-11-14 to 2026-11-28 before any P2/P3 page is opened.
