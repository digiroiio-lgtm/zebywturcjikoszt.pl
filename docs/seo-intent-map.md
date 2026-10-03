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
| `/poradniki/tureckie-zeby` | tureckie zęby | o co chodzi z tureckimi zębami, czy tureckie zęby są dobre, problemy z tureckimi zębami, ile wytrzymują zęby z Turcji, leczenie w tydzień | PRIMARY (no earlier owner); links to, does not copy, `/jak-wybrac-klinike` red flags and `opieka-po-leczeniu` |

## P1 decisions

- `/czy-warto`: MERGED into `/jak-wybrac-klinike`.
- `/turcja-czy-polska`: MERGED into `/koszt`.
- `/na-raty`: DEFERRED until a verified finance/payment product and distinct demand exist.
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
| `/koszt` vs `poradniki/calkowity-koszt-wyjazdu` | MEDIUM | Price list and Turkey-vs-Poland question vs trip budget method and scenario sums | LOW |

No HIGH-overlap pair is published.

## Commercial pricing scope

- `/koszt` owns the complete 24-item list, grouped into five anchored categories. Each item appears once.
- Treatment pages answer their own price and inclusion questions; category links do not create duplicate landing pages.
- Arithmetic subtotals use the central EUR prices and the disclosed dated PLN conversion. They are not confirmed quotes or complete package prices.
- Implant scope must distinguish the implant, abutment, crown, diagnostics and temporary work. Unconfirmed inclusions are explicitly identified.
- Full-arch and All-on-4 package totals remain unpublished until written scope, included and excluded services, date, validity and approval are supplied.
- New crown content has its actual publication date and remains medically unreviewed until an evidenced page review is recorded.
