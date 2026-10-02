export type CaseImage = { reference: string; src: string; label: string };

/** Before/after photos shown on /przed-i-po. The clinical scope of each photo is not verified. */
export const caseImages: CaseImage[] = Array.from({ length: 20 }, (_, index) => {
  const number = index + 1;
  return { reference: `before-after${number}`, src: `/images/diagrams/before-after${number}.webp`, label: `Metamorfoza ${number}` };
});
