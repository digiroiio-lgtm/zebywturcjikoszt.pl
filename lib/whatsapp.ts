export const WHATSAPP_NUMBER = "905353998999";
export const WHATSAPP_DISPLAY = "+90 535 399 89 99";
const GENERIC = "Dzień dobry! Interesuje mnie leczenie stomatologiczne w Akdeniz Dental w Antalyi. Proszę o informacje dotyczące kosztów i kolejnych kroków.";

const GENERIC_UK = "Dzień dobry! Mieszkam w Wielkiej Brytanii i interesuje mnie leczenie stomatologiczne w Antalyi. Proszę o informacje dotyczące kosztów i kolejnych kroków.";

export type WhatsappAudience = "pl" | "uk";

const TREATMENTS: Record<string, string> = {
  implants: "implanty zębowe",
  veneers: "licówki",
  crowns: "korony",
  "full-arch": "odbudowę całej szczęki"
};

/** Message text only; never contains personal or health data, and no promo labels (they are priced in GBP and must not reach the general buttons). */
export function whatsappMessage(topic = "", audience: WhatsappAudience = "pl"): string {
  if (audience === "uk") return GENERIC_UK;
  const treatment = TREATMENTS[topic];
  const base = treatment ? `Dzień dobry! Interesuje mnie leczenie w Akdeniz Dental w Antalyi: ${treatment}. Proszę o informacje dotyczące kosztów i kolejnych kroków.` : GENERIC;
  return base;
}

export function whatsappUrl(topic = "", audience: WhatsappAudience = "pl"): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?${new URLSearchParams({ text: whatsappMessage(topic, audience) }).toString()}`;
}
