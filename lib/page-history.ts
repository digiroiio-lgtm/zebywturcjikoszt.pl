export type HistoryEntry = { date: string; note: string };

/** Public change history per page. Add an entry whenever a page changes materially; entries must describe real changes. */
export const pageHistory: Record<string, HistoryEntry[]> = {
  "dokumenty-i-licencje": [{ date: "2026-10-30", note: "Opublikowano stronę z pierwszym wpisem rejestrowym: kliniki w wykazie prywatnych ośrodków zdrowia jamy ustnej i zębów Antalya İl Sağlık Müdürlüğü, sprawdzonym 30 października 2026." }],
  koszt: [
    { date: "2026-10-29", note: "Dodano sekcje o cenie implantów (z koroną i pozycjami dodatkowymi) oraz o porównaniu z Polską bez cen z Polski, i dwa pytania o sumę ceny implantu i korony oraz o różnicę Straumann–Aiser." },
    { date: "2026-10-29", note: "Dodano do źródeł przegląd systematyczny (PMC) dotyczący koncepcji All-on-4 oraz ujednolicono widoczną datę aktualizacji." },
    { date: "2026-10-29", note: "Dodano sekcje z porównaniem cen pozycji w procentach i rozkładem cennika, cytat lekarza oraz źródła zewnętrzne (FDA, NHS, ADA, Wikipedia)." },
    { date: "2026-10-03", note: "Dodano pytania o ceny dodatkowych zabiegów z cennika kliniki: leczenie kanałowe, wybielanie, wypełnienie, sedacja i znieczulenie, zatoka i kość, usunięcie zęba, higienizacja i dziąsła." },
    { date: "2026-10-03", note: "Dodano sekcję i pytania o opłacalność leczenia w Turcji w porównaniu z Polską, bez cen z Polski." },
    { date: "2026-10-02", note: "Dodano sekcję o zaliczce i warunkach płatności oraz źródło (UOKiK)." },
    { date: "2026-09-30", note: "Opublikowano cennik kliniki z datą 30.09.2026." }
  ],
  "all-on-4": [{ date: "2026-10-02", note: "Dodano sekcję o piśmiennictwie i źródło (przegląd systematyczny). Zaktualizowany tekst potwierdził recenzent." }],
  "cala-szczeka": [{ date: "2026-10-02", note: "Dodano sekcję o piśmiennictwie i źródło (przegląd systematyczny). Zaktualizowany tekst potwierdził recenzent." }],
  "jak-wybrac-klinike": [{ date: "2026-10-17", note: "Dodano tabelę porównania ofert klinik (kryterium, co ustalić, sygnał ostrzegawczy), bez cen i rankingu." }, { date: "2026-10-03", note: "Dodano pytania o szukanie kliniki, certyfikaty, pośrednika, weryfikację lekarza i obsługę po polsku." }, { date: "2026-10-03", note: "Dodano sekcje o tym, czy warto jechać na leczenie do Turcji i jak wybrać miasto i klinikę, oraz źródło (NHS)." }, { date: "2026-10-02", note: "Dodano sekcję o zaliczce, zadatku i zwrocie oraz źródło (UOKiK)." }],
  antalya: [{ date: "2026-10-29", note: "Dodano sekcję o klinice w Antalyi (godziny, różnica czasu, języki), dwa pytania i źródło oraz ujednolicono tytuł." }, { date: "2026-10-17", note: "Dodano tabelę etapów leczenia od kontaktu do kontroli po powrocie." }, { date: "2026-10-03", note: "Dodano pytania o wizę, termin wyjazdu, rzeczy do zabrania i formy płatności." }, { date: "2026-10-03", note: "Dopasowano pytanie o czas leczenia i dodano pytanie o wybór kliniki w Antalyi." }, { date: "2026-10-02", note: "Dodano sekcje o ubezpieczeniu i polisie, umowie i zaliczce oraz planie rozmowy z kliniką, pytanie o EKUZ i źródła." }],
  opinie: [{ date: "2026-10-17", note: "Dodano tabelę ocen kliniki z datą odczytu i listę rzeczy, na które zwrócić uwagę w opiniach o implantach." }, { date: "2026-10-03", note: "Dodano pytania o opinie o leczeniu w Turcji i o klinice Akdeniz Dental oraz doprecyzowano nagłówek o czerwonych flagach." }, { date: "2026-10-02", note: "Dodano sekcje o porównywaniu źródeł opinii i prawie konsumenckim oraz źródło (UOKiK)." }],
  "o-nas": [{ date: "2026-10-02", note: "Opublikowano dane operatora i opisano jego powiązanie z kliniką." }],
  "polityka-redakcyjna": [{ date: "2026-10-02", note: "Rozszerzono o rodzaje treści, ceny i kurs, oceny zewnętrzne i konflikt interesów." }],
  "weryfikacja-medyczna": [{ date: "2026-10-02", note: "Dodano opis oznaczeń, powiązania recenzentów z kliniką i skutków zmiany treści dla recenzji." }],
  "poradniki/rankingi-klinik-dentystycznych-w-turcji": [{ date: "2026-10-03", note: "Opublikowano poradnik o tym, jak powstają rankingi klinik i jak je czytać." }],
  "poradniki/tureckie-zeby": [{ date: "2026-10-03", note: "Opublikowano poradnik o tym, czym są „tureckie zęby”, jakie problemy opisują stomatolodzy i jak ocenić ryzyko." }],
  "uk/ceny-leczenia-zebow-w-turcji-w-funtach": [{ date: "2026-10-17", note: "Zaktualizowano kurs EUR/GBP do 0,84 (odczyt właściciela serwisu z 17 października 2026, 22:09 UTC) i przeliczone kwoty w funtach." }, { date: "2026-10-03", note: "Opublikowano przeliczenie wybranych pozycji cennika na funty po kursie 0,85 z dnia 3 października 2026 (Yahoo Finance, odczyt właściciela serwisu)." }],
  uk: [{ date: "2026-10-17", note: "Uzupełniono spis podstron sekcji o dwie nowe pozycje." }, { date: "2026-10-03", note: "Opublikowano sekcję dla Polaków mieszkających w UK: GHIC i polisa, waluta płatności, kontrola po powrocie." }],
  "uk/szkocja": [{ date: "2026-10-17", note: "Opublikowano przewodnik dla Polaków w Szkocji: podróż, dwa pobyty, ceny w funtach, NHS Scotland i kontrola po powrocie; dane o Aberdeen według urzędu miejskiego." }],
  "uk/finansowanie-leczenia-zebow-w-turcji": [{ date: "2026-10-17", note: "Opublikowano neutralną stronę o finansowaniu przez partnera: bez kwot, oprocentowania i rat, z pytaniami do pożyczkodawcy i ostrzeżeniami o ryzyku." }],
  "uk/jak-zaplacic-za-leczenie-zebow-w-turcji": [{ date: "2026-10-17", note: "Doprecyzowano rolę serwisu w finansowaniu (serwis nie jest pożyczkodawcą) i dodano odnośnik do strony o finansowaniu." }, { date: "2026-10-03", note: "Opublikowano poradnik o sposobach płatności i ich ryzykach; serwis nie oferuje ani nie pośredniczy w kredytach." }],
  kontakt: [{ date: "2026-10-02", note: "Dodano informacje o danych z formularza i pytania." }]
};
