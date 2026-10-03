export type HistoryEntry = { date: string; note: string };

/** Public change history per page. Add an entry whenever a page changes materially; entries must describe real changes. */
export const pageHistory: Record<string, HistoryEntry[]> = {
  koszt: [
    { date: "2026-10-03", note: "Dodano sekcję i pytania o opłacalność leczenia w Turcji w porównaniu z Polską, bez cen z Polski." },
    { date: "2026-10-02", note: "Dodano sekcję o zaliczce i warunkach płatności oraz źródło (UOKiK)." },
    { date: "2026-09-30", note: "Opublikowano cennik kliniki z datą 30.09.2026." }
  ],
  "all-on-4": [{ date: "2026-10-02", note: "Dodano sekcję o piśmiennictwie i źródło (przegląd systematyczny). Zaktualizowany tekst potwierdził recenzent." }],
  "cala-szczeka": [{ date: "2026-10-02", note: "Dodano sekcję o piśmiennictwie i źródło (przegląd systematyczny). Zaktualizowany tekst potwierdził recenzent." }],
  "jak-wybrac-klinike": [{ date: "2026-10-03", note: "Dodano sekcje o tym, czy warto jechać na leczenie do Turcji i jak wybrać miasto i klinikę, oraz źródło (NHS)." }, { date: "2026-10-02", note: "Dodano sekcję o zaliczce, zadatku i zwrocie oraz źródło (UOKiK)." }],
  antalya: [{ date: "2026-10-03", note: "Dopasowano pytanie o czas leczenia i dodano pytanie o wybór kliniki w Antalyi." }, { date: "2026-10-02", note: "Dodano sekcje o ubezpieczeniu i polisie, umowie i zaliczce oraz planie rozmowy z kliniką, pytanie o EKUZ i źródła." }],
  opinie: [{ date: "2026-10-03", note: "Dodano pytania o opinie o leczeniu w Turcji i o klinice Akdeniz Dental oraz doprecyzowano nagłówek o czerwonych flagach." }, { date: "2026-10-02", note: "Dodano sekcje o porównywaniu źródeł opinii i prawie konsumenckim oraz źródło (UOKiK)." }],
  "o-nas": [{ date: "2026-10-02", note: "Opublikowano dane operatora i opisano jego powiązanie z kliniką." }],
  "polityka-redakcyjna": [{ date: "2026-10-02", note: "Rozszerzono o rodzaje treści, ceny i kurs, oceny zewnętrzne i konflikt interesów." }],
  "weryfikacja-medyczna": [{ date: "2026-10-02", note: "Dodano opis oznaczeń, powiązania recenzentów z kliniką i skutków zmiany treści dla recenzji." }],
  "poradniki/tureckie-zeby": [{ date: "2026-10-03", note: "Opublikowano poradnik o tym, czym są „tureckie zęby”, jakie problemy opisują stomatolodzy i jak ocenić ryzyko." }],
  kontakt: [{ date: "2026-10-02", note: "Dodano informacje o danych z formularza i pytania." }]
};
