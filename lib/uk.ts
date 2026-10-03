import type { PageContent } from "./site";
import { gbpPublished } from "./pricing";

/**
 * Polish-language section for Poles living in the UK. Stage 1 contains no finance product: no credit, instalment,
 * APR or monthly-payment wording (see lib/finance-gate.ts and the audit in scripts/validate-seo.mjs).
 * Every factual sentence must be supported by a listed source or by data already on the site.
 */
export const UK_STATUS_DATE = "3 października 2026";
const UK_DATE = "2026-10-03";

const nhsGoing = { label: "NHS: Going abroad for medical treatment (leczenie za granicą)", href: "https://www.nhs.uk/using-the-nhs/healthcare-abroad/going-abroad-for-treatment/going-abroad-for-medical-treatment/" };
const nhsChecklist = { label: "NHS: lista kontrolna leczenia za granicą (Treatment abroad checklist)", href: "https://www.nhs.uk/using-the-nhs/healthcare-abroad/going-abroad-for-treatment/treatment-abroad-checklist/" };
const nhsGhic = { label: "NHS: karty GHIC i EHIC", href: "https://www.nhs.uk/using-the-nhs/healthcare-abroad/apply-for-a-free-uk-global-health-insurance-card-ghic/" };
const msz = { label: "MSZ: informacje dla podróżujących do Turcji", href: "https://www.gov.pl/web/turcja/informacje-dla-podrozujacych" };
const moneyLoans = { label: "MoneyHelper: pożyczki osobiste (Personal loans)", href: "https://www.moneyhelper.org.uk/en/everyday-money/credit/personal-loans" };
const moneySection75 = { label: "MoneyHelper: ochrona kartą, Section 75 i chargeback", href: "https://www.moneyhelper.org.uk/en/everyday-money/credit/how-youre-protected-when-you-pay-by-card" };
const fcaCheck = { label: "FCA: jak sprawdzić, czy firma jest autoryzowana", href: "https://www.fca.org.uk/consumers/how-check-firm-individual-authorised" };

export const ukHub: PageContent = {
  slug: "uk", published: UK_DATE, lastUpdated: UK_DATE, title: "Leczenie zębów w Turcji dla Polaków mieszkających w UK",
  description: "Mieszkasz w Wielkiej Brytanii? Sprawdź, czym leczenie zębów w Antalyi różni się dla Polaków z UK: polisa, GHIC, płatność w funtach i kontrola po powrocie.",
  eyebrow: "Dla Polaków w UK", h1: "Leczenie zębów w Turcji dla Polaków mieszkających w UK",
  lead: "Wiele osób z Polski mieszka i pracuje w Wielkiej Brytanii. Ta sekcja zbiera to, co różni się od planu wyjazdu z Polski: ubezpieczenie, płatność, kontrola po powrocie i organizacja wizyt.",
  answer: "Planując leczenie w Antalyi z UK, pamiętaj o trzech różnicach: karta GHIC nie obejmuje planowanego leczenia za granicą, według NHS większość polis podróżnych też go nie obejmuje, a kontrolę po powrocie trzeba ustalić z kliniką jeszcze przed wyjazdem.",
  sections: [
    { title: "Co jest takie samo, a co inne niż przy wyjeździe z Polski?", paragraphs: ["Plan leczenia, zakres ceny i opiekę po leczeniu ustala lekarz po badaniu, niezależnie od tego, skąd lecisz. Cennik kliniki jest publikowany w euro, a zasady wyceny opisuje strona o kosztach leczenia.", "Inne dla mieszkańców UK są przede wszystkim ubezpieczenie, waluta i koszty płatności oraz to, kto zajmie się kontrolą po powrocie do Wielkiej Brytanii. Zasady wjazdu do Turcji zależą od obywatelstwa i posiadanego dokumentu, dlatego sprawdź je w informacjach MSZ."] },
    { title: "Czy karta GHIC i polisa podróżna obejmują leczenie zębów w Turcji?", paragraphs: ["Według NHS karta GHIC (i EHIC) nie obejmuje wyjazdu na planowane leczenie za granicą, nie zastępuje ubezpieczenia podróżnego i nie obejmuje leczenia w prywatnej placówce. NHS zaznacza też, że większość polis podróżnych nie obejmuje planowanego leczenia za granicą, więc może być potrzebne specjalne ubezpieczenie.", "Przed wyjazdem sprawdź zakres polisy i poinformuj ubezpieczyciela o planowanym leczeniu."] },
    { title: "Płatność w funtach czy w euro?", paragraphs: ["Cennik kliniki jest w euro. Czy klinika przyjmie płatność w funtach, według jakiego kursu i z jaką prowizją, musi wynikać z pisemnej oferty; bank może też doliczyć własne opłaty za płatność zagraniczną. Zanim wpłacisz zaliczkę, ustal walutę rozliczenia i zasady zwrotu.", "Opcje płatności i ich ryzyka opisuje osobny poradnik dla osób z UK."] },
    { title: "Kontrola po powrocie do UK", paragraphs: ["NHS radzi z góry ustalić, jak będzie koordynowana opieka po leczeniu, i zrozumieć możliwe powikłania. Nie zakładaj, że dentysta w UK przejmie opiekę lub serwis systemu implantologicznego; ustal z kliniką, kto zapewni kontrolę i jak przekażesz dokumentację."] }
  ],
  faq: [
    { question: "Czy karta GHIC pokryje leczenie zębów w Turcji?", answer: "Nie. Według NHS karta GHIC nie obejmuje wyjazdu na planowane leczenie za granicą ani leczenia w prywatnej placówce. Sprawdź zakres polisy podróżnej i poinformuj ubezpieczyciela o planowanym leczeniu." },
    { question: "Czy mogę zapłacić za leczenie w Antalyi w funtach?", answer: "Cennik kliniki jest w euro. Waluta rozliczenia, kurs i ewentualna prowizja muszą wynikać z pisemnej oferty, a bank może doliczyć własne opłaty." },
    { question: "Czy dentysta w UK zajmie się kontrolą po leczeniu w Turcji?", answer: "Nie można tego zakładać. Ustal przed leczeniem z kliniką, kto zapewni kontrolę i w jaki sposób przekażesz dokumentację." }
  ],
  sources: [nhsGhic, nhsGoing, nhsChecklist, msz],
  ctaLabel: "Poproś o wstępną ocenę", ctaEvent: "uk_hub_cta"
};

const paymentGuide: PageContent = {
  slug: "uk/jak-zaplacic-za-leczenie-zebow-w-turcji", published: UK_DATE, lastUpdated: UK_DATE, title: "Jak zapłacić za leczenie zębów w Turcji mieszkając w UK?",
  description: "Opcje płatności za leczenie zębów w Turcji dla osób z UK: oszczędności, karta, pożyczka i plan kliniki. Ryzyka, koszt kredytu i pytania przed wpłatą.",
  eyebrow: "Dla Polaków w UK", h1: "Jak zapłacić za leczenie zębów w Turcji mieszkając w UK? Opcje i ryzyka",
  lead: "Zanim wybierzesz sposób płatności, ustal, ile kosztuje cały plan. Poniżej opisujemy typowe sposoby płatności, ich ryzyka i kryteria porównania. To informacja ogólna, a nie rekomendacja produktu finansowego.",
  answer: "Za leczenie możesz zapłacić z oszczędności, kartą albo, jeśli rozważasz kredyt, pożyczką od regulowanego pożyczkodawcy. Serwis nie oferuje ani nie pośredniczy w kredytach i nie zachęca do zadłużania się; porównaj całkowity koszt i sprawdź, czy firma jest autoryzowana przez FCA.",
  sections: [
    { title: "Najpierw ustal pełny koszt, potem sposób płatności", paragraphs: ["Do kwoty leczenia dolicz podróż, noclegi, kontrole i możliwy drugi pobyt. Dopiero całość pozwala ocenić, ile musisz sfinansować i czy w ogóle potrzebujesz pożyczki."] },
    { title: "Jakie są sposoby płatności i ich ryzyka?", cards: [
      { title: "Oszczędności lub płatność z góry", text: "Bez odsetek, ale wpłata z góry zwiększa ryzyko, gdy plan się zmieni. Ustal na piśmie, co podlega zwrotowi." },
      { title: "Karta kredytowa", text: "Według MoneyHelper ochrona z art. 75 Consumer Credit Act obejmuje także zakupy za granicą, gdy płacisz kartą kredytową bezpośrednio sprzedawcy, a cena mieści się między 100 a 30 000 funtów; nie dotyczy to płatności przez pośrednika, np. PayPal. To odpowiedzialność wydawcy karty za problem ze sprzedawcą, a nie gwarancja wyniku leczenia. Sprawdź w banku odsetki i opłaty za płatności zagraniczne." },
      { title: "Pożyczka osobista", text: "Według MoneyHelper to jednorazowa kwota spłacana zwykle z odsetkami w stałych miesięcznych ratach, najczęściej w okresie od roku do pięciu lat; oprocentowanie zależy m.in. od historii kredytowej. Zanim zawrzesz umowę, pożyczkodawca musi podać łączną kwotę do spłaty, wysokość raty, oprocentowanie, opłaty i APR." },
      { title: "Plan płatności kliniki", text: "Czy klinika oferuje raty lub odroczoną płatność, musi wynikać z pisemnej oferty. Poproś o harmonogram, zasady przy zmianie planu i wskazanie, kto jest stroną umowy. Nie zakładaj, że taka opcja istnieje." }
    ] },
    { title: "Czy pożyczka i plan płatności kliniki to to samo?", paragraphs: ["Nie. Pożyczka to umowa z pożyczkodawcą, a plan płatności to ustalenie z podmiotem sprzedającym usługę; mogą mieć różne koszty i zasady. Przed podpisaniem sprawdź, kto jest stroną umowy i czy firma udzielająca lub pośrednicząca w kredycie jest autoryzowana przez FCA w rejestrze Financial Services Register."] },
    { title: "Jak porównać koszt kredytu?", bullets: ["jaka jest łączna kwota do spłaty i miesięczna rata?", "jakie jest APR i jakie opłaty są w nim wliczone?", "czy można spłacić wcześniej i na jakich warunkach?", "co się stanie z umową, jeśli plan leczenia zmieni się po badaniu lub leczenie zostanie przerwane?", "czy dochód wystarczy na spłatę, także gdy się zmieni?", "czy firma jest autoryzowana przez FCA?"] },
    { title: "Na co uważać przy pożyczkach?", paragraphs: ["FCA zaleca korzystać wyłącznie z autoryzowanych firm, które można sprawdzić w publicznym rejestrze, i porównać dane kontaktowe firmy z rejestrem. Według FCA prośba o opłatę z góry przed otrzymaniem pożyczki może być sygnałem oszustwa."] },
    { title: "Czego ten serwis nie robi", paragraphs: [`Stan na ${UK_STATUS_DATE}: serwis nie oferuje ani nie pośredniczy w kredytach, pożyczkach ani planach ratalnych i ich nie poleca. Informacje na tej stronie nie są poradą finansową. Jeżeli to się zmieni, podamy tu dane firmy, jej status u FCA i warunki produktu.`] }
  ],
  faq: [
    { question: "Czy można sfinansować leczenie zębów w Turcji mieszkając w UK?", answer: "To zależy od pożyczkodawcy i warunków, które musi podać przed zawarciem umowy. Serwis nie oferuje ani nie pośredniczy w kredytach; sprawdź ofertę autoryzowanego pożyczkodawcy i jej łączny koszt." },
    { question: "Czy leczenie zębów w Turcji można zapłacić na raty?", answer: "Raty lub odroczona płatność są możliwe tylko wtedy, gdy wynikają z pisemnej oferty kliniki albo umowy z pożyczkodawcą. Nie zakładaj ich istnienia; poproś o harmonogram, koszt całkowity i zasady zwrotu." },
    { question: "Czy karta kredytowa chroni przy płatności za leczenie za granicą?", answer: "Według MoneyHelper ochrona z art. 75 obejmuje zakupy za granicą przy płatności kartą kredytową bezpośrednio sprzedawcy, gdy cena mieści się między 100 a 30 000 funtów. To nie jest gwarancja wyniku leczenia; warunki sprawdź w banku." }
  ],
  sources: [moneyLoans, moneySection75, fcaCheck, nhsChecklist],
  ctaLabel: "Poproś o wstępną ocenę", ctaEvent: "uk_payment_cta"
};

const gbpGuide: PageContent = {
  slug: "uk/ceny-leczenia-zebow-w-turcji-w-funtach", published: UK_DATE, lastUpdated: UK_DATE, title: "Ile kosztuje leczenie zębów w Antalyi w funtach? Cennik GBP",
  description: "Cennik kliniki Akdeniz Dental w EUR przeliczony na funty z podaną datą kursu: przykładowe pozycje, czego tabela nie obejmuje i jak liczyć koszt płatności.",
  eyebrow: "Dla Polaków w UK", h1: "Ile kosztuje leczenie zębów w Antalyi w funtach?",
  lead: "Klinika podaje ceny w euro. Poniżej przeliczamy wybrane pozycje na funty po kursie z podaną datą, żeby ułatwić budżet osobom z UK. To przeliczenie, a nie oferta w funtach.",
  answer: "Cennik kliniki jest w euro, więc kwoty w funtach to przeliczenie orientacyjne po kursie z podaną datą, a nie oferta w GBP. Cena pozycji nie jest ceną całego leczenia, a hotel, lot i dodatkowe zabiegi wymagają osobnego potwierdzenia; bank może też doliczyć prowizję.",
  sections: [
    { title: "Jak przeliczamy euro na funty?", paragraphs: ["Podstawą jest cennik kliniki w euro z datą wskazaną przy tabeli. Kwoty w funtach powstają przez przeliczenie po jednym kursie z podanym dniem. Kurs nie jest aktualizowany automatycznie, więc w dniu płatności może być inny."] },
    { title: "Czego ta tabela nie mówi", bullets: ["nie jest ceną kompletnego leczenia ani pakietu", "nie obejmuje łączników, koron, diagnostyki ani dodatkowych zabiegów, jeśli nie wynikają z oferty", "nie obejmuje lotu z UK, noclegu, transferów i kontroli", "nie uwzględnia kursu banku ani opłat za płatność zagraniczną"] },
    { title: "Waluta rozliczenia i prowizja", paragraphs: ["Walutę rozliczenia, kurs i prowizję ustal w pisemnej ofercie. Opcje płatności i ich ryzyka opisuje poradnik dla osób z UK, a sposób liczenia całego budżetu poradnik o całkowitym koszcie wyjazdu."] }
  ],
  faq: [
    { question: "Czy klinika wystawia ofertę w funtach?", answer: "Cennik kliniki jest w euro. To, czy oferta i rozliczenie mogą być w funtach, musi wynikać z pisemnej oferty." },
    { question: "Dlaczego kwoty w funtach mogą się różnić od ceny przy płatności?", answer: "Przeliczamy po jednym kursie z podaną datą, a bank lub operator płatności stosuje własny kurs i może doliczyć prowizję." }
  ],
  sources: [{ label: "Cennik kliniki i zasady wyceny", href: "/koszt" }, { label: "Poradnik: całkowity koszt wyjazdu", href: "/poradniki/calkowity-koszt-wyjazdu" }, { label: "Jak zapłacić za leczenie mieszkając w UK", href: "/uk/jak-zaplacic-za-leczenie-zebow-w-turcji" }],
  ctaLabel: "Poproś o wstępną ocenę", ctaEvent: "uk_gbp_cta"
};

/** Keys are the last URL segment; the GBP page exists only once a dated EUR to GBP rate is set in lib/pricing.ts. */
export const ukArticles: Record<string, PageContent> = {
  "jak-zaplacic-za-leczenie-zebow-w-turcji": paymentGuide,
  ...(gbpPublished ? { "ceny-leczenia-zebow-w-turcji-w-funtach": gbpGuide } : {})
};

export const allUkPages: PageContent[] = [ukHub, ...Object.values(ukArticles)];
export const isUkSlug = (slug: string) => slug === "uk" || slug.startsWith("uk/");
