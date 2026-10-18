import { PRIMARY_CTA } from "./cta";
import type { PageContent } from "./site";
import { gbpPublished } from "./pricing";
import { publishedGeoContent } from "./geo";

/**
 * Polish-language section for Poles living in the UK. Stage 1 contains no finance product: no credit, instalment,
 * APR or monthly-payment wording (see lib/finance-gate.ts and the audit in scripts/validate-seo.mjs).
 * Every factual sentence must be supported by a listed source or by data already on the site.
 */
export const UK_STATUS_DATE = "3 października 2026";
const UK_DATE = "2026-10-03";
/** The GBP page changes whenever the owner supplies a new rate (last: 2026-10-17, 0.84). */
const GBP_RATE_DATE = "2026-10-17";
const FINANCE_DATE = "2026-10-17";

const nhsGoing = { label: "NHS: Going abroad for medical treatment (leczenie za granicą)", href: "https://www.nhs.uk/using-the-nhs/healthcare-abroad/going-abroad-for-treatment/going-abroad-for-medical-treatment/" };
const nhsChecklist = { label: "NHS: lista kontrolna leczenia za granicą (Treatment abroad checklist)", href: "https://www.nhs.uk/using-the-nhs/healthcare-abroad/going-abroad-for-treatment/treatment-abroad-checklist/" };
const nhsGhic = { label: "NHS: karty GHIC i EHIC", href: "https://www.nhs.uk/using-the-nhs/healthcare-abroad/apply-for-a-free-uk-global-health-insurance-card-ghic/" };
const msz = { label: "MSZ: informacje dla podróżujących do Turcji", href: "https://www.gov.pl/web/turcja/informacje-dla-podrozujacych" };
const moneyLoans = { label: "MoneyHelper: pożyczki osobiste (Personal loans)", href: "https://www.moneyhelper.org.uk/en/everyday-money/credit/personal-loans" };
const moneySection75 = { label: "MoneyHelper: ochrona kartą, Section 75 i chargeback", href: "https://www.moneyhelper.org.uk/en/everyday-money/credit/how-youre-protected-when-you-pay-by-card" };
const fcaCheck = { label: "FCA: jak sprawdzić, czy firma jest autoryzowana", href: "https://www.fca.org.uk/consumers/how-check-firm-individual-authorised" };

export const ukHub: PageContent = {
  slug: "uk", published: UK_DATE, lastUpdated: FINANCE_DATE, title: "Leczenie zębów w Turcji dla Polaków mieszkających w UK",
  description: "Mieszkasz w Wielkiej Brytanii? Sprawdź, czym leczenie zębów w Antalyi różni się dla Polaków z UK: polisa, GHIC, płatność w funtach i kontrola po powrocie.",
  eyebrow: "Dla Polaków w UK", h1: "Leczenie zębów w Turcji dla Polaków mieszkających w UK",
  lead: "Wiele osób z Polski mieszka i pracuje w Wielkiej Brytanii. Ta sekcja zbiera to, co różni się od planu wyjazdu z Polski: ubezpieczenie, płatność, kontrola po powrocie i organizacja wizyt.",
  answer: "Planując leczenie w Antalyi z UK, pamiętaj o trzech różnicach: karta GHIC nie obejmuje planowanego leczenia za granicą, według NHS większość polis podróżnych też go nie obejmuje, a kontrolę po powrocie trzeba ustalić z kliniką jeszcze przed wyjazdem.",
  sections: [
    { title: "Co jest takie samo, a co inne niż przy wyjeździe z Polski?", paragraphs: ["Plan leczenia, zakres ceny i opiekę po leczeniu ustala lekarz po badaniu, niezależnie od tego, skąd lecisz. Cennik kliniki jest publikowany w euro, a zasady wyceny opisuje strona o kosztach leczenia.", "Inne dla mieszkańców UK są przede wszystkim ubezpieczenie, waluta i koszty płatności oraz to, kto zajmie się kontrolą po powrocie do Wielkiej Brytanii. Zasady wjazdu do Turcji zależą od obywatelstwa i posiadanego dokumentu, dlatego sprawdź je w informacjach MSZ."] },
    { title: "Czy karta GHIC i polisa podróżna obejmują leczenie zębów w Turcji?", paragraphs: ["Według NHS karta GHIC (i EHIC) nie obejmuje wyjazdu na planowane leczenie za granicą, nie zastępuje ubezpieczenia podróżnego i nie obejmuje leczenia w prywatnej placówce. NHS zaznacza też, że większość polis podróżnych nie obejmuje planowanego leczenia za granicą, więc może być potrzebne specjalne ubezpieczenie.", "Przed wyjazdem sprawdź zakres polisy i poinformuj ubezpieczyciela o planowanym leczeniu."] },
    { title: "Płatność w funtach czy w euro?", paragraphs: ["Cennik kliniki jest w euro. Czy klinika przyjmie płatność w funtach, według jakiego kursu i z jaką prowizją, musi wynikać z pisemnej oferty; bank może też doliczyć własne opłaty za płatność zagraniczną. Zanim wpłacisz zaliczkę, ustal walutę rozliczenia i zasady zwrotu.", ...(gbpPublished ? ["Opcje płatności i ich ryzyka opisuje osobny poradnik dla osób z UK, a przeliczenie wybranych pozycji cennika na funty strona o cenach w funtach."] : ["Opcje płatności i ich ryzyka opisuje osobny poradnik dla osób z UK."])] },
    { title: "Kontrola po powrocie do UK", paragraphs: ["NHS radzi z góry ustalić, jak będzie koordynowana opieka po leczeniu, i zrozumieć możliwe powikłania. Nie zakładaj, że dentysta w UK przejmie opiekę lub serwis systemu implantologicznego; ustal z kliniką, kto zapewni kontrolę i jak przekażesz dokumentację."] }
  ],
  faq: [
    { question: "Czy karta GHIC pokryje leczenie zębów w Turcji?", answer: "Nie. Według NHS karta GHIC nie obejmuje wyjazdu na planowane leczenie za granicą ani leczenia w prywatnej placówce. Sprawdź zakres polisy podróżnej i poinformuj ubezpieczyciela o planowanym leczeniu." },
    { question: "Czy mogę zapłacić za leczenie w Antalyi w funtach?", answer: "Cennik kliniki jest w euro. Waluta rozliczenia, kurs i ewentualna prowizja muszą wynikać z pisemnej oferty, a bank może doliczyć własne opłaty." },
    { question: "Czy dentysta w UK zajmie się kontrolą po leczeniu w Turcji?", answer: "Nie można tego zakładać. Ustal przed leczeniem z kliniką, kto zapewni kontrolę i w jaki sposób przekażesz dokumentację." }
  ],
  sources: [nhsGhic, nhsGoing, nhsChecklist, msz],
  ctaLabel: PRIMARY_CTA, ctaEvent: "uk_hub_cta"
};

const paymentGuide: PageContent = {
  slug: "uk/jak-zaplacic-za-leczenie-zebow-w-turcji", published: UK_DATE, lastUpdated: FINANCE_DATE, title: "Jak zapłacić za leczenie zębów w Turcji mieszkając w UK?",
  description: "Opcje płatności za leczenie zębów w Turcji dla osób z UK: oszczędności, karta, pożyczka i plan kliniki. Ryzyka, koszt kredytu i pytania przed wpłatą.",
  eyebrow: "Dla Polaków w UK", h1: "Jak zapłacić za leczenie zębów w Turcji mieszkając w UK? Opcje i ryzyka",
  lead: "Zanim wybierzesz sposób płatności, ustal, ile kosztuje cały plan. Poniżej opisujemy typowe sposoby płatności, ich ryzyka i kryteria porównania. To informacja ogólna, a nie rekomendacja produktu finansowego.",
  answer: "Za leczenie możesz zapłacić z oszczędności, kartą albo, jeśli rozważasz kredyt, pożyczką od regulowanego pożyczkodawcy. Serwis nie jest pożyczkodawcą i nie zachęca do zadłużania się; o finansowaniu przez partnera piszemy na osobnej stronie. Porównaj całkowity koszt i sprawdź, czy firma jest autoryzowana przez FCA.",
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
    { title: "Rola serwisu w finansowaniu", paragraphs: [`Stan na 17 października 2026: serwis nie jest pożyczkodawcą i sam nie udziela kredytów ani pożyczek. Operator serwisu wskazuje, że współpracuje z partnerem finansującym w UK; zasady i ograniczenia opisuje strona o finansowaniu leczenia. Informacje na tej stronie nie są poradą finansową, a zgoda na finansowanie zależy od decyzji pożyczkodawcy.`] }
  ],
  faq: [
    { question: "Czy można sfinansować leczenie zębów w Turcji mieszkając w UK?", answer: "To zależy od pożyczkodawcy i warunków, które musi podać przed zawarciem umowy. Operator serwisu wskazuje, że współpracuje z partnerem finansującym w UK, ale zgoda i warunki zależą od decyzji pożyczkodawcy; sprawdź ofertę autoryzowanego pożyczkodawcy i jej łączny koszt." },
    { question: "Czy leczenie zębów w Turcji można zapłacić na raty?", answer: "Raty lub odroczona płatność są możliwe tylko wtedy, gdy wynikają z pisemnej oferty kliniki albo umowy z pożyczkodawcą. Nie zakładaj ich istnienia; poproś o harmonogram, koszt całkowity i zasady zwrotu." },
    { question: "Czy karta kredytowa chroni przy płatności za leczenie za granicą?", answer: "Według MoneyHelper ochrona z art. 75 obejmuje zakupy za granicą przy płatności kartą kredytową bezpośrednio sprzedawcy, gdy cena mieści się między 100 a 30 000 funtów. To nie jest gwarancja wyniku leczenia; warunki sprawdź w banku." }
  ],
  sources: [moneyLoans, moneySection75, fcaCheck, nhsChecklist],
  ctaLabel: PRIMARY_CTA, ctaEvent: "uk_payment_cta"
};

const gbpGuide: PageContent = {
  slug: "uk/ceny-leczenia-zebow-w-turcji-w-funtach", published: UK_DATE, lastUpdated: GBP_RATE_DATE, title: "Ile kosztuje leczenie zębów w Antalyi w funtach? Cennik GBP",
  description: "Cennik kliniki Akdeniz Dental w EUR przeliczony na funty z podaną datą kursu: przykładowe pozycje, czego tabela nie obejmuje i jak liczyć koszt płatności.",
  eyebrow: "Dla Polaków w UK", h1: "Ile kosztuje leczenie zębów w Antalyi w funtach?",
  lead: "Klinika podaje ceny w euro. Poniżej przeliczamy wybrane pozycje na funty po kursie z podaną datą, żeby ułatwić budżet osobom z UK. To przeliczenie, a nie oferta w funtach.",
  answer: "Cennik kliniki jest w euro, więc kwoty w funtach to przeliczenie orientacyjne po kursie z podaną datą, a nie oferta w GBP. Cena pozycji nie jest ceną całego leczenia, a hotel, lot i dodatkowe zabiegi wymagają osobnego potwierdzenia; bank może też doliczyć prowizję.",
  sections: [
    { title: "Jak przeliczamy euro na funty?", paragraphs: ["Podstawą jest cennik kliniki w euro z datą wskazaną przy tabeli. Kwoty w funtach powstają przez przeliczenie po jednym kursie z podanym dniem. Kurs pochodzi z odczytu właściciela serwisu (Google), jest zaokrąglony do dwóch miejsc po przecinku i nie jest aktualizowany automatycznie, więc w dniu płatności może być inny."] },
    { title: "Czego ta tabela nie mówi", bullets: ["nie jest ceną kompletnego leczenia ani pakietu", "nie obejmuje łączników, koron, diagnostyki ani dodatkowych zabiegów, jeśli nie wynikają z oferty", "nie obejmuje lotu z UK, noclegu, transferów i kontroli", "nie uwzględnia kursu banku ani opłat za płatność zagraniczną"] },
    { title: "Waluta rozliczenia i prowizja", paragraphs: ["Walutę rozliczenia, kurs i prowizję ustal w pisemnej ofercie. Opcje płatności i ich ryzyka opisuje poradnik dla osób z UK, a sposób liczenia całego budżetu poradnik o całkowitym koszcie wyjazdu."] }
  ],
  faq: [
    { question: "Czy klinika wystawia ofertę w funtach?", answer: "Cennik kliniki jest w euro. To, czy oferta i rozliczenie mogą być w funtach, musi wynikać z pisemnej oferty." },
    { question: "Dlaczego kwoty w funtach mogą się różnić od ceny przy płatności?", answer: "Przeliczamy po jednym kursie z podaną datą, a bank lub operator płatności stosuje własny kurs i może doliczyć prowizję." }
  ],
  sources: [{ label: "Cennik kliniki i zasady wyceny", href: "/koszt" }, { label: "Poradnik: całkowity koszt wyjazdu", href: "/poradniki/calkowity-koszt-wyjazdu" }, { label: "Jak zapłacić za leczenie mieszkając w UK", href: "/uk/jak-zaplacic-za-leczenie-zebow-w-turcji" }],
  ctaLabel: PRIMARY_CTA, ctaEvent: "uk_gbp_cta"
};

const financePage: PageContent = {
  slug: "uk/finansowanie-leczenia-zebow-w-turcji", published: FINANCE_DATE, lastUpdated: FINANCE_DATE, title: "Finansowanie leczenia zębów w Turcji dla Polaków w UK",
  description: "Czy leczenie zębów w Turcji można sfinansować z UK? Jak działa finansowanie przez partnera, czego ta strona nie obiecuje, ryzyka i pytania przed podpisaniem umowy.",
  eyebrow: "Dla Polaków w UK", h1: "Finansowanie leczenia zębów w Turcji dla Polaków mieszkających w UK",
  lead: "Jeśli mieszkasz w Wielkiej Brytanii i nie chcesz płacić za całe leczenie z góry, możesz zapytać o finansowanie. Poniżej opisujemy, jak wygląda ta droga, czego ta strona nie obiecuje i o co zapytać, zanim cokolwiek podpiszesz.",
  answer: "Operator serwisu wskazuje, że współpracuje z partnerem finansującym w UK. Zgoda, kwota i warunki zależą od decyzji pożyczkodawcy po sprawdzeniu zdolności kredytowej i nie są pewne; przed podpisaniem poznaj łączny koszt, APR i swoje prawa. Serwis nie jest pożyczkodawcą.",
  sections: [
    { title: "Czy leczenie można sfinansować i przez kogo?", paragraphs: ["Operator serwisu wskazuje, że współpracuje z partnerem finansującym w UK. Partner jest odrębną firmą: to on ocenia wniosek, podejmuje decyzję i podaje warunki umowy. Ten serwis nie jest pożyczkodawcą, nie udziela kredytów ani pożyczek i nie podaje tu kwot, oprocentowania ani rat.", "Zanim zdecydujesz, poproś na piśmie o nazwę firmy, jej status u FCA (numer w rejestrze Financial Services Register) oraz pełne warunki oferty. Dopiero wtedy możesz ocenić, czy finansowanie ma dla ciebie sens."] },
    { title: "Jak wygląda droga od zapytania do decyzji", bullets: ["najpierw prosisz o wstępną wycenę leczenia i opisujesz swoje potrzeby,", "po badaniu lekarz potwierdza plan, zakres i koszt leczenia; cena całego planu może różnić się od wstępnej,", "jeśli rozważasz finansowanie, pytasz o partnera i o pisemne warunki dla swojego planu,", "pożyczkodawca podejmuje własną decyzję po sprawdzeniu twojej sytuacji finansowej,", "podpisujesz umowę dopiero wtedy, gdy znasz łączną kwotę do spłaty, ratę, APR i opłaty."] },
    { title: "Czego ta strona nie obiecuje", bullets: ["zgody na finansowanie ani żadnej konkretnej kwoty,", "wysokości raty, okresu spłaty ani oprocentowania,", "tego, że finansowanie będzie tańsze lub lepsze niż inne sposoby płatności,", "porady finansowej: informacje mają charakter ogólny i nie uwzględniają twojej sytuacji,", "tego, że plan leczenia się nie zmieni po badaniu."] },
    { title: "Pytania do partnera finansującego przed podpisaniem", bullets: ["kto jest pożyczkodawcą i czy firma jest autoryzowana przez FCA?", "jaka jest łączna kwota do spłaty, miesięczna rata i okres spłaty?", "jakie jest APR i jakie opłaty są w nim wliczone?", "czy można spłacić wcześniej i na jakich warunkach?", "co się stanie z umową, jeśli plan leczenia zmieni się po badaniu lub leczenie zostanie przerwane?", "czy i jak możesz odstąpić od umowy po jej zawarciu?", "kto jest stroną umowy: klinika, pośrednik czy pożyczkodawca?"] },
    { title: "Ryzyka zadłużenia przy leczeniu za granicą", paragraphs: ["Leczenie za granicą ma dodatkowe koszty: podróż, noclegi, kontrole i możliwy drugi pobyt. Plan może się zmienić po badaniu w Antalyi, a rata obciąża budżet przez cały okres spłaty, także gdy twoje dochody się zmienią. Nie zaciągaj zobowiązania ponad to, co możesz bezpiecznie spłacać.", "Według FCA prośba o opłatę z góry przed otrzymaniem pożyczki może być sygnałem oszustwa. Korzystaj wyłącznie z firm, które możesz sprawdzić w publicznym rejestrze."] },
    { title: "Finansowanie, karta czy oszczędności: jak porównać", paragraphs: ["Porównaj sposoby płatności według tych samych kryteriów: łączny koszt, elastyczność, ochrona przy problemie i ryzyko. Opisujemy je w osobnym poradniku o płatnościach za leczenie mieszkając w UK, razem z ochroną kartą kredytową według MoneyHelper.", "Pełny koszt wyjazdu (leczenie, podróż, noclegi, kontrole) policzysz według poradnika o całkowitym koszcie wyjazdu. Dopiero całość pokazuje, ile naprawdę musisz sfinansować."] }
  ],
  faq: [
    { question: "Czy ten serwis udziela kredytów lub pożyczek?", answer: "Nie. Serwis nie jest pożyczkodawcą. Operator wskazuje, że współpracuje z partnerem finansującym w UK, ale to partner decyduje o finansowaniu i podaje jego warunki." },
    { question: "Czy zgoda na finansowanie jest pewna?", answer: "Nie. Decyzję podejmuje pożyczkodawca po sprawdzeniu zdolności kredytowej, a kwota i warunki zależą od twojej sytuacji i planu leczenia. Nie zakładaj z góry, że finansowanie zostanie przyznane." },
    { question: "Gdzie sprawdzić, czy firma finansująca jest autoryzowana?", answer: "W publicznym rejestrze Financial Services Register prowadzonym przez FCA. Porównaj nazwę, numer i dane kontaktowe z dokumentami, które otrzymałeś." }
  ],
  sources: [moneyLoans, moneySection75, fcaCheck, nhsChecklist],
  ctaLabel: PRIMARY_CTA, ctaEvent: "uk_finance_cta"
};

/** Keys are the last URL segment; the GBP page exists only once a dated EUR to GBP rate is set in lib/pricing.ts. */
export const ukArticles: Record<string, PageContent> = {
  "jak-zaplacic-za-leczenie-zebow-w-turcji": paymentGuide,
  "finansowanie-leczenia-zebow-w-turcji": financePage,
  ...(gbpPublished ? { "ceny-leczenia-zebow-w-turcji-w-funtach": gbpGuide } : {}),
  // Geo pages exist here only after every publication gate (data/geo/uk/workflow.json); the list is empty today.
  ...publishedGeoContent
};

export const allUkPages: PageContent[] = [ukHub, ...Object.values(ukArticles)];
export const isUkSlug = (slug: string) => slug === "uk" || slug.startsWith("uk/");
