# MAGDELENA gallery (2026-10-17)

One horizontal strip of vertical photos between the header and the hero (`components/home-magdelena-gallery.tsx`, data in `lib/magdelena-gallery.ts`). Photos are promotional brand material, not patient results. The operator states written permission exists for the model's photos; the record is not stored here.

## Source mapping and sizes

Originals live in `assets-src/2026-10-17/` (outside `public/`, so they are not served); they were recompressed losslessly (see `assets-src/README.md`). Masters are 720 px wide WebP (quality 86, no EXIF/ICC), cropped to about 2:3 around the face with the letterbox bars of the two wide screenshots removed; `next/image` serves AVIF/WebP at the sizes the card needs (`sizes` 132 px mobile, 216 px desktop).

| # | Source file (`assets-src/2026-10-17/`) | Original | Master | Note |
| --- | --- | --- | --- | --- |
| 01 | Screenshot 2026-10-17 at 12.38.18.png | 2223 KB | `magdelena-01.webp` 31 KB | 720x1063, face at 32% |
| 02 | Screenshot 2026-10-17 at 12.38.32.png | 2353 KB | `magdelena-02.webp` 36 KB | 720x1064, face at 36% |
| 03 | Screenshot 2026-10-17 at 12.38.39.png | 2206 KB | `magdelena-03.webp` 34 KB | 720x1063, face at 35% |
| 04 | Screenshot 2026-10-17 at 12.38.53.png | 2438 KB | `magdelena-04.webp` 34 KB | 720x1064, face at 36% |
| 05 | Screenshot 2026-10-17 at 12.39.14.png | 2285 KB | `magdelena-05.webp` 34 KB | 720x1063, face at 36% |
| 06 | Screenshot 2026-10-17 at 12.39.36.png | 2903 KB | `magdelena-06.webp` 42 KB | 720x1064, face at 36% |
| 07 | Screenshot 2026-10-17 at 12.40.00.png | 2167 KB | `magdelena-07.webp` 37 KB | 720x1064, face at 36% |
| 08 | Screenshot 2026-10-17 at 12.40.40.png | 2732 KB | `magdelena-08.webp` 42 KB | 720x1064, face at 36% |
| 09 | Screenshot 2026-10-17 at 12.41.04.png | 2975 KB | not used | a second person (clinic staff) is in the frame |
| 10 | Screenshot 2026-10-17 at 12.41.35.png | 3085 KB | `magdelena-10.webp` 56 KB | 720x1063, face at 36% |
| 11 | Screenshot 2026-10-17 at 12.42.25.png | 2342 KB | `magdelena-11.webp` 31 KB | 720x1064, face at 36% |

Total of the 10 used photos: 24738 KB original, 381 KB masters.

## Open points
- `magdelena-09` (12.41.04) shows another person next to the model. It is not in the gallery; add it only if that person has agreed to appear.
- The original PNGs were moved out of `public/` to `assets-src/2026-10-17/`; they are no longer reachable by URL.
- Desktop gallery adds about 400 px above the hero; mobile about 380 px.
