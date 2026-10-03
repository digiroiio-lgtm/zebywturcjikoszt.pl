/** Shared by the form UI and the lead API, so a channel or topic accepted by one is understood by the other. */
export const contactChannels = [
  { id: "whatsapp", label: "WhatsApp", field: "whatsapp", inputLabel: "Numer WhatsApp", inputType: "tel", placeholder: "np. +48 123 456 789" },
  { id: "phone", label: "Telefon", field: "phone", inputLabel: "Numer telefonu", inputType: "tel", placeholder: "np. +48 123 456 789" },
  { id: "email", label: "E-mail", field: "email", inputLabel: "Adres e-mail", inputType: "email", placeholder: "twoj@email.com" }
] as const;

export type ContactChannelId = (typeof contactChannels)[number]["id"];

export const leadTopics = [
  { id: "implants", label: "Implanty" },
  { id: "veneers", label: "Licówki" },
  { id: "crowns", label: "Korony" },
  { id: "full-arch", label: "Cała szczęka" },
  { id: "other", label: "Inne lub nie wiem" }
] as const;

export function topicFromPath(path: string): string {
  if (path.startsWith("/implanty")) return "implants";
  if (path.startsWith("/licowki")) return "veneers";
  if (path.startsWith("/korony")) return "crowns";
  if (path.startsWith("/cala-szczeka") || path.startsWith("/all-on-4")) return "full-arch";
  return "";
}
