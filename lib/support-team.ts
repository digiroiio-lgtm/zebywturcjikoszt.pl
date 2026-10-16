/** Role guidance, not a named staff directory or a confirmation of a service package. */
export const SUPPORT_TEAM_UPDATED = "2026-10-17";
export const supportRoles = [
  { id: "koordynacja", title: "Koordynatorzy pacjentów", stage: "Przed wyjazdem i na miejscu", text: "Koordynacja pomaga uporządkować terminy, dokumenty i kontakt z kliniką. Przed rezerwacją poproś o imię osoby prowadzącej oraz jej dane kontaktowe.", question: "Kto będzie moją osobą kontaktową i kto ją zastąpi?" },
  { id: "doradcy", title: "Doradcy pacjenta", stage: "Oferta i organizacja", text: "W rozmowie o ofercie ustal, co obejmuje cena i które sprawy wymagają odpowiedzi lekarza. Osoba omawiająca koszty nie zastępuje konsultacji stomatologicznej.", question: "Kto wyjaśni koszty, a kto odpowie na pytania medyczne?" },
  { id: "opieka", title: "Pielęgniarki i pielęgniarze", stage: "Zakres opieki do uzgodnienia", text: "Przed leczeniem zapytaj, jaki personel będzie uczestniczył w Twojej opiece. Zakres wsparcia i kwalifikacje konkretnej osoby potwierdź bezpośrednio w klinice.", question: "Kto będzie uczestniczyć w opiece przy moim zabiegu?" },
  { id: "laboratorium", title: "Technicy dentystyczni", stage: "Prace protetyczne", text: "Przy koronach, mostach lub innych uzupełnieniach zapytaj o współpracę lekarza z laboratorium. Ustal materiał, etapy przymiarek i sposób zgłaszania uwag.", question: "Jak lekarz i laboratorium uzgodnią moją pracę protetyczną?" },
  { id: "asysta", title: "Asystentki i asystenci stomatologiczni", stage: "W gabinecie", text: "Asysta wspiera organizację pracy w gabinecie. Zapytaj, kto będzie obecny podczas wizyty i do kogo zgłosić pytanie. Plan leczenia omawiaj z lekarzem.", question: "Kto będzie towarzyszyć lekarzowi podczas mojej wizyty?" },
  { id: "transfery", title: "Kierowcy transferowi", stage: "Lotnisko, hotel i klinika", text: "Jeśli oferta obejmuje transfer, potwierdź trasę i sposób odbioru. Zapisz numer kontaktowy oraz zasady postępowania przy opóźnieniu lotu.", question: "Które przejazdy są w cenie i jak rozpoznam osobę odbierającą?" },
] as const;

export type PublishedTeamImage = {
  src: string; width: number; height: number; alt: string; caption: string;
  /** References to clinic-held records only. Do not add personal consent documents. */
  rightsReference: string; consentReference: string; identityReference: string;
};
// The five uploaded boards are audited in docs/team-image-review/inventory.json.
// Keep derivatives outside public/ until rights, consent and identity/role records are supplied.
export const publishedTeamImages: PublishedTeamImage[] = [];
