/** One vocabulary for the main call to action: the same action carries the same wording everywhere. Page-specific CTAs on treatment pages stay in lib/site.ts. */
export const PRIMARY_CTA = "Otrzymaj bezpłatną wycenę";
export const SUBMIT_CTA = "Wyślij zapytanie o bezpłatną wycenę";
export const HEADER_CTA = "Bezpłatna wycena";
export const CTA_ASSURANCE = "Wstępna wycena • Kontakt po polsku • Bez zobowiązań";
export const FINAL_PLAN_NOTE = "Ostateczny plan leczenia wymaga konsultacji i odpowiedniej diagnostyki.";

export const SECTION_CTA = {
  gallery: "Poznaj możliwości dla swojego uśmiechu",
  visualProof: "Zapytaj o możliwości leczenia",
  prices: "Otrzymaj indywidualną wycenę",
  process: "Zrób pierwszy krok: bezpłatna wycena"
} as const;

/** "Zapytaj o …" label per treatment card, in the accusative the sentence needs. */
export const TREATMENT_CTA: Record<string, string> = {
  "/koszt": "Zapytaj o koszt leczenia",
  "/implanty": "Zapytaj o implanty",
  "/korony-cyrkonowe": "Zapytaj o korony cyrkonowe",
  "/licowki": "Zapytaj o licówki",
  "/cala-szczeka": "Zapytaj o całą szczękę",
  "/all-on-4": "Zapytaj o All-on-4"
};
