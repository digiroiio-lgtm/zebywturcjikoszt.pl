/**
 * Attributed expert quotes. A quote is published only after the named clinician has approved this exact wording in
 * writing: set `approvedOn` to the ISO date of that approval (keep the evidence outside the repo, as for
 * lib/medical-review.ts). While it is null the quote is not rendered anywhere and `npm run test:quotes` keeps it that way.
 * Titles are the roles already published on the expert pages, never an unverified specialisation.
 */
export type ExpertQuote = {
  id: string;
  slug: string;
  name: string;
  role: string;
  topic: string;
  text: string;
  /** ISO date of the clinician's written approval of this exact text; null = draft, never shown. */
  approvedOn: string | null;
};

export const expertQuotes: ExpertQuote[] = [
  {
    id: "treatment-planning",
    slug: "mustafa-akca",
    name: "Mustafa Akça",
    role: "Lekarz dentysta | Akdeniz Dental Clinic, Antalya, Turcja",
    topic: "Tedavi planlaması",
    text: "Każdy pacjent wymaga indywidualnej oceny stomatologicznej. Przed wyborem implantów, koron lub licówek analizujemy stan uzębienia, zdrowie dziąseł oraz długoterminowe potrzeby pacjenta. Najważniejszy jest bezpieczny i odpowiednio dobrany plan leczenia.",
    approvedOn: "2026-10-29"
  },
  {
    id: "posterior-implants",
    slug: "mehmet-onur-merey",
    name: "Mehmet Onur Merey",
    role: "Lekarz dentysta | Akdeniz Dental Clinic, Antalya, Turcja",
    topic: "Implanty w odcinku bocznym",
    text: "Utrata tylnych zębów to nie tylko problem estetyczny. Zęby trzonowe odgrywają kluczową rolę w żuciu i rozdrabnianiu pokarmów. Implanty stomatologiczne mogą pomóc przywrócić funkcję żucia i stabilność odbudowy protetycznej, bez konieczności szlifowania sąsiednich zdrowych zębów. Kluczowe znaczenie ma jednak indywidualna ocena warunków kostnych i prawidłowe zaplanowanie leczenia.",
    approvedOn: "2026-10-29"
  }
];

export const approvedQuotes = (): ExpertQuote[] => expertQuotes.filter((quote) => Boolean(quote.approvedOn));
