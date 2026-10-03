# Visual asset audit

Audit date: 2026-09-19

No treatment category is assigned to a before/after image unless it is supported by verified metadata. The visual inspection alone does not establish whether a case involved implants, veneers, crowns, All-on-4 or another procedure.

| File | Observed image type | Treatment classification | Quality | Primary role and placement |
| --- | --- | --- | --- | --- |
| `before-after1.webp` | Face and smile before/after, severe initial tooth loss visible | Unverified | Strong, 700×700, useful close-up | Homepage curated set and `/przed-i-po` case 01 |
| `before-after2.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 02 |
| `before-after3.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 03 |
| `before-after4.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 04 |
| `before-after5.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 05 |
| `before-after6.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 06 |
| `before-after7.webp` | Face and smile before/after | Unverified | Strong, 700×700, visually distinct | Homepage curated set and `/przed-i-po` case 07 |
| `before-after8.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 08 |
| `before-after9.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 09 |
| `before-after10.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 10 |
| `before-after11.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 11 |
| `before-after12.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 12 |
| `before-after13.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 13 |
| `before-after14.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 14 |
| `before-after15.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 15 |
| `before-after16.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 16 |
| `before-after17.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 17 |
| `before-after18.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 18 |
| `before-after19.webp` | Face and smile before/after | Unverified | Strong, 700×700, visually distinct | Homepage curated set and `/przed-i-po` case 19 |
| `before-after20.webp` | Face and smile before/after | Unverified | Strong, 700×700 | `/przed-i-po` case 20 |
| `setp-03.jpeg` | Aircraft over the Antalya coastline | Travel and logistics, not clinical | Small, 240×240, acceptable supporting image | `/antalya`, after pre-travel guidance |
| `setp-04.jpeg` | Antalya coastline and urban area | Destination and logistics, not clinical | Small, 240×240, acceptable supporting image | `/antalya`, after pre-travel guidance |
| `img-02.png` | Three people in clinical clothing in a dental setting | Team image; identities and qualifications not established by image | Good cut-out, 588×712 | `/jak-wybrac-klinike`, next to clinician-verification guidance |

Existing SVG diagrams retain their educational roles on cost and treatment pages. No before/after asset is assigned to a treatment-specific page until verified case metadata becomes available.

## Content figures from existing files (2026-10-03)

Placement is data-driven: `lib/page-figures.json` maps a page slug to figures rendered by `components/content-figure.tsx` after the named H2 section. `npm run test:figures` fails if a figure, its alt text or caption is missing from the built HTML, or if the section heading no longer exists. `npm run audit:seo` checks the alt text of every `<img>` on every page: present (`alt=""` only for decorative images), 25–125 characters, no "Zdjęcie/Obraz/Grafika/Image/Photo" prefix, unique on a page, and not shared by two different image files.

| File | Placement | Notes |
| --- | --- | --- |
| `klinika/clinic-5.jpeg` | `/koszt` | Reception; caption states the photo does not document scope or price |
| `klinika/clinic-3.jpeg` | `/jak-wybrac-klinike`, `/kontakt` | Entrance with the facility name sign; two different alt texts per page by design |
| `klinika/portfolio-02b.jpeg` | `/jak-wybrac-klinike` | Reception and entrance |
| `klinika/portfolio-05b.jpeg` | `/implanty` | Treatment room through glass door; caption: interior, not a result |
| `klinika/portfolio-04b.jpeg` | `/licowki` | Treatment room; windows show outside shop signs (acceptable, no readable personal data) |
| `klinika/portfolio-06b.jpeg` | `/korony-cyrkonowe` | Treatment room |
| `klinika/clinic-6.jpeg` | `/cala-szczeka`, `/uk` | Waiting lounge |
| `klinika/clinic-4.jpeg` | `/all-on-4`, `/opinie` | Waiting area; on `/opinie` the caption says it is not a patient opinion |
| `klinika/portfolio-08b.jpeg` | `/o-nas` | Clinic logo |
| `klinika/portfolio-11.jpeg` | `/przed-i-po` | Photo studio corner; caption does not claim the case photos were taken here |
| `poradniki/*.svg` | guides and `/uk/jak-zaplacic-…` | `cost-scope`, `veneer-options`, `clinic-check`, `antalya-journey`, `review-check` reused with page-specific alt texts |

Deliberately not used: `portfolio-07.jpeg`, `portfolio-07b.jpeg`, `portfolio-09b.jpeg` (wall artwork with third-party photographs of a public figure and a quotation: copyright and personality-rights risk); `portfolio-03b.jpeg` (seasonal decoration, kept in reserve). Before/after images are not placed on treatment pages because their treatment scope is unverified.

Still needed (PR 2, supplied by the owner): new real photographs and diagrams, `ImageObject` JSON-LD, an image sitemap review and file renaming/WebP conversion.
