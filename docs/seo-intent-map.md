# Keyword → intent → canonical URL map

Updated: 2026-10-03

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
