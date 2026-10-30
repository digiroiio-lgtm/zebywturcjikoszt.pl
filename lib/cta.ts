/** One vocabulary for the main call to action: the same action carries the same wording everywhere. Page-specific CTAs on treatment pages stay in lib/site.ts. */
export const PRIMARY_CTA = "Otrzymaj bezpłatną wycenę";
export const SUBMIT_CTA = "Wyślij zapytanie o bezpłatną wycenę";
export const HEADER_CTA = "Bezpłatna wycena";
/** One wording per WhatsApp button. The hero keeps its own line (it carries the Polish-language promise); the sticky bar shows the short visible label to fit 40 % width, but its accessible name is the standard one. */
export const WHATSAPP_CTA = "Napisz na WhatsApp";
export const WHATSAPP_CTA_SHORT = "WhatsApp";
export const WHATSAPP_HERO_CTA = "Porozmawiaj po polsku na WhatsApp";
export const WHATSAPP_NEW_TAB = "(otwiera się w nowej karcie)";
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
