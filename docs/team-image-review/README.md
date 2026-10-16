# Team image audit and release status

Audit: 17 October 2026 (Europe/Istanbul). These are labelled presentation collages, not five individual portraits. All five originals were visually inspected. Inventory fields distinguish text printed in a collage from independently verified identities, credentials or employment. No role was inferred from appearance, clothing or a face match.

## Optimization results

| Original timestamp | Visible content | Original pixels | PNG bytes | WebP pixels | WebP bytes |
| --- | --- | --- | ---: | --- | ---: |
| 01.15.56 | Group montage, 17 portraits | 2976 × 1622 | 5,279,733 | 1600 × 872 | 108,400 |
| 01.16.21 | Group montage, 17 portraits | 2822 × 1570 | 5,137,693 | 1600 × 890 | 99,108 |
| 01.16.35 | Group montage, 4 portraits | 2760 × 462 | 1,525,100 | 1600 × 268 | 28,462 |
| 01.17.05 | Group montage, 11 portraits | 1048 × 1334 | 2,111,498 | 800 × 1018 | 81,266 |
| 01.17.20 | 12-panel environment/work montage | 1026 × 1266 | 1,628,850 | 800 × 987 | 78,554 |

Total: 15,682,874 → 395,790 bytes, 97.48% smaller. WebP quality 83, LANCZOS downsampling, conversion from embedded color profile to sRGB, no EXIF/XMP/ICC copied. Aspect ratios retained to rounding; no face crops. The compositions contain meaningful content across their frames, so no automatic trimming was used. Collages use wider sources so tiny existing labels remain readable; individual 600–800px portraits cannot be recovered from these small circular headshots without inventing detail.

## What the uploaded records actually establish

- 01.15.56: a general manager plus 16 coordinators, labelled with first names only. No full identities, languages, current employment dates or individual consent records.
- 01.16.21: a mixed board with media/photography roles and 14 dental assistants. Do not call all 17 people assistants or nurses. The label “Siyabe” should be confirmed rather than silently corrected.
- 01.16.35: four people under “Our drivers”, with first names. This does not confirm airport-transfer inclusions, driving credentials or the provider under a patient's contract.
- 01.17.05: 11 laboratory-team portraits with first names and role labels. The printed CDT prefix is not independently verified and is not used as a credential on the website.
- 01.17.20: twelve laboratory panels, including identifiable people at work. No separate identity record for those people.
- No separately documented nurse or patient-advisor roster was found. A coordinator is not automatically a nurse or adviser. Names duplicated across boards are not merged into one identity.
- No patient names, contact details or readable patient records were observed at source resolution. This visual check is not a release of image rights.

## Publication boundary

**All five derivative images remain outside `public/` and are not imported or served by Next.js.** They are review files in this folder. `lib/support-team.ts` intentionally exports an empty `publishedTeamImages` list. No new staff Person/employee/credential schema is emitted.

The original PNGs were already uploaded under public/images on main. They remain unchanged because the task permits deletion only after replacement references are validated. Their existing public availability does not prove a license or person consent. This change makes no additional public image copies and does not place the boards on a web page.

The new /nasz-zespol page uses the existing clinic reception image. It explains six roles as patient guidance, explicitly states that it is not a named roster or service inclusion confirmation, and links to the existing doctor profiles. Nurse/adviser availability, Polish-speaking staff, included transfers and a Polish aftercare network are not claimed.

## Needed before releasing the five boards

The operator must supply a reference (not a private document or signature) confirming image ownership/license and publication permission for every identifiable person, including incidental laboratory staff and media workers; verify current first-name/role assignments and the ambiguous label noted above. Confirm that the clinic has an appropriate withdrawal/contact process. An upload alone is not recorded as this confirmation.

After records are supplied:

1. Update inventory rights, consent and identity statuses with clinic-held references.
2. Copy approved WebPs to their exact `proposedPublicPath` in `public/images/zespol/`.
3. Add entries to `publishedTeamImages` with truthful Polish alt text, full dimensions, captions limited to the confirmed role scope, and the three required record references. The gallery already uses responsive `next/image`, lazy loading and intrinsic dimensions.
4. Do not publish the mixed media board as exclusively dental assistants. Keep text labels available in Polish HTML if named personnel are later listed; do not rely on tiny raster English text as the only staff information.
5. Run verification and inspect both desktop and mobile before removing original PNGs. When approved images are published, include only those approved image URLs in the /nasz-zespol sitemap entry.

## Implementation scope

New role page and data; page-scoped styles; footer discovery link; sitemap entry; a dedicated social card and an accurately scoped llms.txt link. /nasi-lekarze and the homepage remain unchanged. Existing doctor metadata/schema are untouched. Exact requested title, H1 and meta description are retained. GEO here means accurate machine-readable descriptions and entity/context links, not an invented local-office or staff claim.
