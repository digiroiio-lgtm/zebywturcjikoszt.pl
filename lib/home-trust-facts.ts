/** Short trust facts for the homepage. `source` says where each claim comes from; operator-confirmed claims are the site operator's own statement (chat, 2026-10-17) and are not repeated in JSON-LD or the AI files. */
export type TrustFact = { id: string; title: string; text: string; source: "repo" | "operator-confirmed-2026-10-17" };

export const homeTrustFacts: TrustFact[] = [
  { id: "languages", title: "Obsługa po polsku", text: "Kontakt w pięciu językach: polski, angielski, rosyjski, niemiecki, rumuński.", source: "repo" },
  { id: "lab", title: "Własne laboratorium", text: "Klinika ma własne laboratorium.", source: "operator-confirmed-2026-10-17" },
  { id: "international", title: "Doświadczenie z pacjentami z zagranicy", text: "Klinika na co dzień przyjmuje pacjentów spoza Turcji.", source: "operator-confirmed-2026-10-17" },
  { id: "coordination", title: "Koordynacja wizyty", text: "Pomoc w ustaleniu terminów, planu leczenia i kolejnych kroków.", source: "operator-confirmed-2026-10-17" },
  { id: "prices", title: "Ceny w EUR i PLN", text: "Cennik z datą aktualizacji i kursem EUR/PLN.", source: "repo" },
  { id: "hours", title: "Pn–sob 9:00–19:00", text: "Antalya, czas turecki (UTC+3). Niedziela zamknięte.", source: "repo" }
];
