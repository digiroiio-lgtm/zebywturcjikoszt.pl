# Keyword → intent → canonical URL map

Updated: 2026-09-18

| Canonical URL | Primary query / intent | Secondary and supporting queries | Decision |
|---|---|---|---|
| `/` | zęby w Turcji / broad commercial investigation | leczenie zębów w Turcji, Antalya, koszt, możliwości | PRIMARY |
| `/koszt/` | zęby w Turcji koszt | cena, cennik, ile kosztują zęby w Turcji, Turcja czy Polska | PRIMARY; all price variants MERGED |
| `/implanty/` | implanty zębów w Turcji | implanty w Turcji, implanty cena | PRIMARY; no separate `/implanty/koszt/` |
| `/licowki/` | licówki w Turcji | licówki cena, zęby w Turcji licówki | PRIMARY |
| `/cala-szczeka/` | zęby w Turcji cała szczęka | pełna rekonstrukcja, ile kosztuje cała szczęka, All-on-6 supporting | PRIMARY |
| `/all-on-4/` | All-on-4 Turcja | zęby w Turcji All-on-4 | PRIMARY |
| `/opinie/` | zęby w Turcji opinie | forum, opinie forum, doświadczenia pacjentów | PRIMARY; forum variants MERGED |
| `/przed-i-po/` | zęby w Turcji przed i po | efekty leczenia, metamorfozy | PRIMARY |
| `/antalya/` | zęby w Turcji Antalya | dentysta Antalya, leczenie zębów Antalya | PRIMARY |
| `/jak-wybrac-klinike/` | jak wybrać klinikę w Turcji | klinika stomatologiczna Turcja, zęby w Turcji klinika, czy warto | PRIMARY |

## P1 decisions

- `/czy-warto/`: MERGED into homepage and `/jak-wybrac-klinike/`.
- `/turcja-czy-polska/`: MERGED into `/koszt/`.
- `/na-raty/`: REJECTED until a verified finance/payment product for Polish patients exists.
- `/korony-cyrkonowe/`: MERGED into `/cala-szczeka/` and `/licowki/`.
- `/all-on-6/`: MERGED into `/cala-szczeka/` as an alternative concept.
- `/bonding/`: REJECTED; insufficient distinct commercial evidence for launch.

## Overlap QA

| Pair | Initial risk | Resolution | Final risk |
|---|---|---|---|
| `/` vs `/koszt/` | HIGH | Homepage gives orientation; `/koszt/` owns price variants | LOW |
| `/implanty/` vs `/all-on-4/` | MEDIUM | Implant planning vs full-arch concept | LOW |
| `/cala-szczeka/` vs `/all-on-4/` | HIGH | Problem-oriented map vs method-specific qualification | LOW |
| `/opinie/` vs `/przed-i-po/` | MEDIUM | Review verification vs clinical image literacy | LOW |
| `/antalya/` vs `/` | MEDIUM | Treatment logistics vs broad overview | LOW |
| `/jak-wybrac-klinike/` vs `/opinie/` | MEDIUM | Provider due diligence vs review-source literacy | LOW |

No HIGH-overlap pair is published.
