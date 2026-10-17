export type CaseImage = { reference: string; src: string; label: string; /** Pixel size of the square file. */ size: number };

/** Added 2026-10-17: the clinic's newest before/after photos, shown first. Files are 800×800 square crops of the originals kept in assets-src/. */
const newestReferences = Array.from({ length: 11 }, (_, index) => 21 + index);
const earlierReferences = Array.from({ length: 20 }, (_, index) => 1 + index);

/**
 * Before/after photos shown on the home page and /przed-i-po, newest first. The clinical scope of each photo is not verified,
 * so labels are plain sequence numbers; the reference (and #anchor) of a photo never changes when the order does.
 */
export const caseImages: CaseImage[] = [...newestReferences, ...earlierReferences].map((number, index) => ({
  reference: `before-after${number}`,
  src: `/images/przed-i-po/before-after${number}.webp`,
  label: `Metamorfoza ${index + 1}`,
  size: number >= 21 ? 800 : 700
}));
