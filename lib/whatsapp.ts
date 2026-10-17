export const WHATSAPP_NUMBER = "905353998999";
export const WHATSAPP_DISPLAY = "+90 535 399 89 99";
const GENERIC = "Dzień dobry! Interesuje mnie leczenie stomatologiczne w Akdeniz Dental w Antalyi. Proszę o informacje dotyczące kosztów i kolejnych kroków.";

const TREATMENTS: Record<string, string> = {
  implants: "implanty zębowe",
  veneers: "licówki",
  crowns: "korony",
  "full-arch": "odbudowę całej szczęki"
};

/** Message text only; never contains personal or health data. */
export function whatsappMessage(topic = "", campaign?: string): string {
  const treatment = TREATMENTS[topic];
  const base = treatment ? `Dzień dobry! Interesuje mnie leczenie w Akdeniz Dental w Antalyi: ${treatment}. Proszę o informacje dotyczące kosztów i kolejnych kroków.` : GENERIC;
  return campaign ? `${base} Kampania: ${campaign}` : base;
}

export function whatsappUrl(topic = "", campaign?: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?${new URLSearchParams({ text: whatsappMessage(topic, campaign) }).toString()}`;
}
