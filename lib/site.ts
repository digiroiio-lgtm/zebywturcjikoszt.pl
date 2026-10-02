import { formatEur, formatPln, PRICING_UPDATED_ISO_DATE } from "./pricing";
import { OPERATOR } from "./operator";

export const SITE_NAME = "Zęby w Turcji";
const FALLBACK_SITE_URL = "https://leczeniezebowwturcji.pl";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL).replace(/\/+$/, "");
export const PUBLISHED_ISO_DATE = "2026-09-18";
export const UPDATED_ISO_DATE = "2026-09-19";
export const PUBLISHED_DATE = "18 września 2026";
export const UPDATED_DATE = "19 września 2026";

export type ContentSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  cards?: { title: string; text: string }[];
  table?: { headers: string[]; rows: string[][] };
};

export type PageContent = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  answer: string;
  answerTitle?: string;
  sections: ContentSection[];
  faq?: { question: string; answer: string }[];
  sources?: { label: string; href: string }[];
  ctaLabel?: string;
  ctaEvent?: string;
  ctaHref?: string;
  schemaType?: "MedicalWebPage" | "WebPage";
  noindex?: boolean;
  form?: boolean;
  lastUpdated?: string;
  published?: string;
};

export const pages: Record<string, PageContent> = {
  koszt: {
    lastUpdated: "2026-10-02",
    slug: "koszt",
    title: "Ile kosztują zęby w Turcji? Ceny i zakres leczenia",
    description: "Cennik 24 zabiegów stomatologicznych w Turcji w EUR i PLN: implanty, korony, licówki, leczenie kanałowe i zabiegi dodatkowe. Aktualizacja: 30.09.2026.",
    eyebrow: "Koszt leczenia",
    h1: "Ile kosztują zęby w Turcji?",
    lead: "Cena zależy od diagnozy, liczby leczonych zębów, rodzaju odbudowy, materiałów i etapów terapii. Rzetelna wycena powinna opierać się na dokumentacji i jasno określać zakres.",
    answer: "Cennik kliniki obejmuje 24 pozycje, od zabiegów na dziąsłach po implanty i znieczulenie ogólne. Kwoty podajemy w EUR oraz orientacyjnie w PLN przy kursie 1 EUR = 4,37 PLN. Pełny koszt zależy od indywidualnego planu leczenia.",
    schemaType: "MedicalWebPage",
    sections: [
      { title: "Co powinno znaleźć się w wycenie", cards: [
        { title: "Zakres kliniczny", text: "Rozpoznanie, proponowane leczenie, liczba zębów lub implantów oraz możliwe alternatywy." },
        { title: "Materiały i systemy", text: "Rodzaj odbudowy, marka systemu implantologicznego i elementy protetyczne, jeśli dotyczą planu." },
        { title: "Etapy i wizyty", text: "Co wydarzy się podczas każdej wizyty i które elementy są czasowe, a które ostateczne." },
        { title: "Co jeszcze może kosztować?", text: "Lot, pobyt, transfery, badania i opieka po powrocie powinny być opisane osobno." }
      ]},
      { title: "Dlaczego dwie wyceny mogą się różnić", paragraphs: ["Sama liczba koron lub implantów nie wystarcza do porównania ofert. Różnice mogą wynikać z diagnostyki, przygotowania jamy ustnej, rodzaju pracy protetycznej, konieczności leczenia zachowawczego albo warunków kostnych."], bullets: ["porównuj ten sam zakres leczenia, a nie tylko cenę końcową", "sprawdź, czy wycena obejmuje elementy tymczasowe i ostateczne", "zapytaj, co stanie się, gdy plan zmieni się po badaniu na miejscu", "ustal zasady kontroli i opieki po powrocie do Polski"] },
      { title: "Jak porównać dwie wyceny leczenia", paragraphs: ["Wpisz dane z obu ofert obok siebie. Jeżeli którejś informacji brakuje, poproś o jej uzupełnienie na piśmie przed wpłatą zaliczki."], table: { headers: ["Element porównania", "Co powinno być podane", "Dlaczego ma znaczenie"], rows: [
        ["Rozpoznanie i zakres", "które zęby, jaki problem i proponowane leczenie", "bez tego dwie oferty mogą dotyczyć innego zakresu"],
        ["Liczba i rodzaj odbudów", "implanty, łączniki, korony, mosty, licówki lub proteza", "sama liczba „zębów” nie opisuje planu"],
        ["Materiały i systemy", "producent implantu, rodzaj ceramiki i pracy protetycznej", "wpływają na możliwość serwisu i porównywalność ofert"],
        ["Prace tymczasowe", "czy są w cenie i na jak długo są planowane", "rozwiązanie tymczasowe nie jest pracą docelową"],
        ["Etapy i wizyty", "liczba pobytów, kontroli i przewidywany porządek leczenia", "wpływają na koszt podróży i urlopu"],
        ["Leczenie dodatkowe", "ekstrakcje, leczenie kanałowe, odbudowa kości i diagnostyka", "mogą istotnie zmienić kwotę po badaniu"],
        ["Pobyt i transport", "hotel, transfery, loty i warunki pakietu", "nie należy zakładać, że są automatycznie wliczone"],
        ["Opieka po powrocie", "kontakt, kontrole, korekty i sytuacje nagłe", "określa realną ciągłość opieki"],
        ["Gwarancja i reklamacje", "zakres, wyłączenia, terminy i koszty ponownego wyjazdu", "samo słowo „gwarancja” nie opisuje odpowiedzialności"],
        ["Cena końcowa", "waluta, zakres, warunki zmiany i termin ważności", "pozwala porównać pełny koszt, a nie kwotę reklamową"]
      ]}},
      { title: "Jak czytać ceny w EUR i PLN", paragraphs: ["Ceny w euro pochodzą z cennika kliniki przekazanego do publikacji 30 września 2026. Kwoty w złotych są orientacyjnym przeliczeniem po kursie 1 EUR = 4,37 PLN z 30.09.2026, 09:11 UTC. Kurs nie jest aktualizowany automatycznie i może różnić się od kursu stosowanego przy płatności.", "Kwoty dotyczą nazwanych pozycji. W indywidualnej wycenie należy potwierdzić jednostkę rozliczenia, liczbę zabiegów, zakres materiałów oraz elementy wliczone i dodatkowo płatne. Lista nie podaje jednej ceny całego wyjazdu ani pakietu pełnej odbudowy."] },
      { title: "Od czego zależy cena różnych rodzajów leczenia?", table: { headers: ["Potrzeba", "Właściwa strona", "Co ustala cenę"], rows: [
        ["Brak pojedynczego zęba lub kilku zębów", "Implanty", "diagnostyka, liczba implantów, odbudowa protetyczna"],
        ["Zmiana kształtu lub koloru uśmiechu", "Licówki", "materiał, liczba zębów, stan szkliwa i zgryzu"],
        ["Rozległe braki lub zniszczenie uzębienia", "Cała szczęka", "wariant leczenia, liczba etapów, odbudowa tymczasowa i docelowa"],
        ["Bezzębie i kwalifikacja do stałej odbudowy", "All-on-4", "diagnostyka, warunki anatomiczne, system implantów i rodzaj pracy"]
      ]}},
      { title: "Zaliczka i warunki płatności", paragraphs: ["Przed wpłatą ustal na piśmie, czy płacisz zaliczkę, czy zadatek. Według UOKiK zaliczka jest wpłaconą wcześniej częścią ceny i podlega zwrotowi, gdy rezygnujesz z usługi, a zadatek w razie rezygnacji konsumenta może zostać zatrzymany przez wykonawcę. Zaliczka i zadatek nie mogą odpowiadać 100 proc. wynagrodzenia za usługę.", "Zapytaj także, na jaki zakres leczenia lub etap przeznaczona jest wpłata i kiedy można ją odzyskać po zmianie planu po badaniu klinicznym."] },
      { title: "Turcja czy Polska: porównuj cały proces", paragraphs: ["Porównanie powinno obejmować nie tylko zabieg, ale również podróż, liczbę wizyt, możliwe korekty, opiekę po leczeniu i sposób postępowania w razie komplikacji. Niższa cena nie przesądza o tym, że dana opcja jest odpowiednia klinicznie."] }
    ],
    faq: [
      { question: "Czy na stronie jest aktualny cennik?", answer: "Tak. Publikujemy 24 pozycje z cennika kliniki przekazanego 30.09.2026, w EUR i orientacyjnie w PLN. Data cennika i kurs przeliczenia są widoczne przy tabeli. Indywidualna oferta określa pełny zakres leczenia." },
      { question: "Czy wystarczy wiadomość, żeby otrzymać wycenę?", answer: "Wstępna ocena może pomóc określić możliwy zakres, ale ostateczny plan wymaga dokumentacji i oceny klinicznej przez uprawnionego lekarza dentystę." },
      { question: "Czy cena obejmuje hotel i transfer?", answer: "Nie można tego zakładać. Każda oferta powinna jednoznacznie wskazywać, które elementy są wliczone, a które pacjent organizuje i opłaca oddzielnie." }
    ],
    sources: [{ label: "UOKiK: Zadatek czy zaliczka? Porady UOKiK", href: "https://archiwum.uokik.gov.pl/aktualnosci.php?news_id=11145" }],
    ctaLabel: "Poproś o indywidualną wycenę", ctaEvent: "cost_page_cta"
  },
  "korony-cyrkonowe": {
    slug: "korony-cyrkonowe", published: PRICING_UPDATED_ISO_DATE, lastUpdated: PRICING_UPDATED_ISO_DATE,
    title: "Korony cyrkonowe w Turcji: cena 150 EUR, zakres i wycena",
    description: "Korona cyrkonowa w Turcji: 150 EUR, około 655,50 PLN. Sprawdź zakres ceny, przykładowe sumy, różnicę między koroną a licówką i pytania przed wyceną.",
    eyebrow: "Korony i protetyka", h1: "Korony cyrkonowe w Turcji: cena i zakres leczenia",
    lead: "W cenniku kliniki korona cyrkonowa kosztuje 150 EUR, czyli orientacyjnie 655,50 PLN przy kursie 4,37. Cena pozycji nie określa całego planu leczenia. Przed decyzją potwierdź liczbę koron, ich zastosowanie i usługi wliczone w wycenę.",
    answer: "Korona jest odbudową obejmującą ząb; może też stanowić część odbudowy na implancie. Korona cyrkonowa i licówka to różne pozycje. Wybór odbudowy powinien wynikać z oceny lekarza, a nie wyłącznie ceny lub oczekiwanego koloru uśmiechu.",
    schemaType: "MedicalWebPage",
    sections: [
      { title: "Korona, licówka czy korona na implancie?", table: { headers: ["Odbudowa", "Co oznacza", "Co ustalić przed wyceną"], rows: [
        ["Korona na własnym zębie", "Odbudowa obejmująca ząb, rozważana m.in. przy jego osłabieniu lub uszkodzeniu.", "Rokowanie zęba, zakres przygotowania i ewentualne leczenie przed koroną."],
        ["Licówka", "Odbudowa głównie przedniej powierzchni zęba; ma inny zakres niż korona.", "Dlaczego ta metoda jest proponowana i jakie są alternatywy."],
        ["Korona na implancie", "Część protetyczna oparta na implancie, z elementem łączącym.", "Czy podana cena obejmuje odbudowę na konkretnym systemie oraz łącznik."]
      ]}},
      { title: "Co ustalić o materiale i przygotowaniu", bullets: ["dokładny rodzaj korony cyrkonowej i sposób jej wykonania", "które zęby wymagają odbudowy i dlaczego", "zakres przygotowania zębów i możliwe alternatywy", "czy wkład, leczenie kanałowe lub korona tymczasowa są potrzebne i dodatkowo płatne", "jak uzgadniane są kolor, kształt, zgryz i ewentualne korekty"] },
      { title: "Jak porównać oferty na kilka koron", paragraphs: ["Porównuj tę samą liczbę i rodzaj koron oraz te same etapy. Zapytaj, czy oferta obejmuje przygotowanie, prace tymczasowe, wykonanie i osadzenie koron, a także kontrole. Większa liczba koron nie jest automatycznie właściwym planem leczenia.", "Sama cena 150 EUR nie potwierdza liczby wizyt, długości pobytu, gwarancji ani ceny wszystkich usług. Te informacje powinny być zawarte w indywidualnym planie i pisemnej ofercie."] },
      { title: "Kontrole i opieka po powrocie", paragraphs: ["Przed wyjazdem ustal, kto prowadzi kontrolę, jak zgłosić problem i jakie są warunki korekty. Poproś o dokumentację zastosowanych materiałów oraz wskazówki dotyczące higieny. Nie zakładaj, że ponowna podróż, naprawa lub wymiana są automatycznie bezpłatne."] }
    ],
    faq: [
      { question: "Ile kosztuje korona cyrkonowa w Turcji?", answer: `Pozycja w cenniku kosztuje ${formatEur(150)}, około ${formatPln(150)} przy kursie 1 EUR = 4,37 PLN z 30.09.2026. Jednostkę rozliczenia i zakres należy potwierdzić w indywidualnej ofercie.` },
      { question: "Czy 150 EUR obejmuje całe leczenie zęba?", answer: "Cennik tego nie potwierdza. Diagnostyka, przygotowanie, ewentualne leczenie kanałowe, wkład i prace tymczasowe wymagają określenia w planie oraz wycenie." },
      { question: "Czy korona cyrkonowa jest licówką?", answer: "Nie. Korona obejmuje ząb, a licówka odbudowuje głównie jego przednią powierzchnię. Nazwa materiału E-max ani pozycja „Veneer kuron” nie określają jednoznacznie zakresu odbudowy; zapytaj klinikę o dokładny opis." },
      { question: "Czy ta cena dotyczy korony na implancie?", answer: "Lista nie potwierdza zastosowania tej pozycji na implancie ani włączenia łącznika. Potrzebne jest potwierdzenie systemu implantologicznego, rodzaju odbudowy i ceny wszystkich elementów." },
      { question: "Czy można od razu wybrać pakiet 10 lub 20 koron?", answer: "Liczbę koron ustala lekarz po ocenie zębów i alternatyw. Mnożenie ceny pozycji pokazuje jedynie sumę arytmetyczną, nie kwalifikację ani potwierdzoną cenę pakietu." }
    ],
    sources: [
      { label: "American Dental Association: korony zębowe", href: "https://www.mouthhealthy.org/all-topics-a-z/crowns" },
      { label: "American Dental Association: licówki", href: "https://www.mouthhealthy.org/all-topics-a-z/veneers" },
      { label: "FDA: implant, łącznik i odbudowa protetyczna", href: "https://www.fda.gov/medical-devices/dental-devices/dental-implants-what-you-should-know" }
    ],
    ctaLabel: "Zapytaj o zakres wyceny koron", ctaEvent: "zirconia_crown_cta"
  },
  implanty: {
    lastUpdated: PRICING_UPDATED_ISO_DATE,
    slug: "implanty",
    title: "Implanty zębów w Turcji – proces, koszt i kwalifikacja",
    description: "Implanty w Turcji: Aiser i Medentika 450 EUR, Straumann 900 EUR. Ceny w PLN, zakres implantu, łącznika i korony oraz przykładowe sumy i pełna wycena.",
    eyebrow: "Leczenie implantologiczne", h1: "Implanty zębów w Turcji",
    lead: "Implant zastępuje korzeń brakującego zęba i stanowi podporę dla odbudowy protetycznej. To, czy implant będzie odpowiedni i ile wizyt będzie potrzebnych, zależy od oceny lekarza.",
    answer: "Plan implantologiczny powinien wynikać z badania, obrazowania i oceny ogólnego stanu zdrowia. Cenę można rzetelnie ocenić dopiero wtedy, gdy wiadomo, jaki system implantów, odbudowę i zabiegi obejmuje plan.",
    schemaType: "MedicalWebPage",
    sections: [
      { title: "Jak planuje się leczenie implantologiczne?", cards: [
        { title: "1. Badania i dokumentacja", text: "Wywiad, zdjęcia i badania obrazowe pomagają przygotować wstępną ocenę." },
        { title: "2. Kwalifikacja", text: "Lekarz ocenia warunki miejscowe, ryzyka oraz możliwe alternatywy." },
        { title: "3. Etap chirurgiczny", text: "Zakres ustala lekarz po potwierdzeniu planu i świadomej zgodzie pacjenta." },
        { title: "4. Odbudowa", text: "Korona, most lub większa praca protetyczna są planowane jako odrębna część leczenia." }
      ]},
      { title: "Co sprawdzić przed wyborem oferty", bullets: ["imię, nazwisko i uprawnienia lekarza prowadzącego", "markę oraz pełną specyfikację systemu implantologicznego", "rodzaj pracy tymczasowej i ostatecznej", "plan kontroli, higieny i opieki po powrocie", "pisemne zasady dotyczące korekt i reklamacji"] },
      { title: "Implant nie jest jedyną możliwością", paragraphs: ["W zależności od sytuacji klinicznej alternatywą może być most, proteza lub inne postępowanie. Strona nie kwalifikuje do leczenia i nie zastępuje konsultacji z lekarzem dentystą."] }
    ],
    faq: [
      { question: "Ile kosztuje implant zęba w Turcji?", answer: `Implant Aiser lub Medentika: ${formatEur(450)} (około ${formatPln(450)}); implant Straumann: ${formatEur(900)} (około ${formatPln(900)}). Cennik nie potwierdza automatycznie włączenia korony, łącznika, diagnostyki ani dodatkowych zabiegów; pełny zakres określa indywidualna wycena.` },
      { question: "Czy implanty wymagają dwóch wyjazdów?", answer: "Nie da się tego potwierdzić bez planu leczenia. Liczba etapów i wizyt zależy od sytuacji klinicznej oraz rodzaju odbudowy." },
      { question: "Czy każdy może mieć implant?", answer: "Nie. Kwalifikację przeprowadza lekarz po ocenie stanu jamy ustnej, warunków anatomicznych, zdrowia ogólnego i czynników ryzyka." }
    ],
    sources: [{ label: "American Dental Association: informacje dla pacjentów o implantach", href: "https://www.mouthhealthy.org/all-topics-a-z/implants" }, { label: "FDA: elementy systemu implantologicznego", href: "https://www.fda.gov/medical-devices/dental-devices/dental-implants-what-you-should-know" }],
    ctaLabel: "Skonsultuj możliwość leczenia implantologicznego", ctaEvent: "implant_cta"
  },
  licowki: {
    lastUpdated: PRICING_UPDATED_ISO_DATE,
    slug: "licowki",
    title: "Licówki w Turcji – cena, planowanie i świadomy wybór",
    description: "Licówki w Turcji: czym są, kiedy bywają rozważane, jak ocenić plan estetyczny i od czego zależy indywidualna cena.",
    eyebrow: "Stomatologia estetyczna", h1: "Licówki w Turcji",
    lead: "Licówki mogą zmieniać wygląd przedniej powierzchni zębów. Decyzja powinna uwzględniać stan szkliwa, zgryz, zdrowie dziąseł i rozwiązania mniej inwazyjne.",
    answer: "Licówki nie są uniwersalnym sposobem na każdy problem estetyczny. Przed leczeniem potrzebna jest diagnoza, omówienie zakresu preparacji zębów, materiału oraz oczekiwanego efektu.",
    schemaType: "MedicalWebPage",
    sections: [
      { title: "Pytania, które warto zadać", bullets: ["dlaczego w tym przypadku proponowane są licówki", "czy są dostępne mniej inwazyjne alternatywy", "które zęby wymagają leczenia, a które jedynie zmiany estetycznej", "jaki materiał zostanie użyty i jak wygląda plan koloru oraz kształtu", "jak będzie chroniony zgryz i jak planowane są kontrole"] },
      { title: "Cena licówek w Turcji", paragraphs: [`Licówka kompozytowa kosztuje ${formatEur(130)} (około ${formatPln(130)}). W cenniku występują też E-max za ${formatEur(225)} i pozycja „Veneer kuron” za ${formatEur(400)}; dokładny rodzaj tych odbudów należy potwierdzić z kliniką. Wycenę trzeba dopasować do liczby zębów, materiału, przygotowania oraz ewentualnego wcześniejszego leczenia.`] },
      { title: "Licówka, korona czy bonding", cards: [
        { title: "Licówka", text: "Odbudowuje głównie widoczną powierzchnię zęba. Wymaga indywidualnej kwalifikacji." },
        { title: "Korona", text: "Obejmuje większą część zęba i ma inne wskazania niż licówka." },
        { title: "Bonding", text: "Odbudowa kompozytowa może być rozważana w wybranych sytuacjach, ale nie jest odpowiednikiem licówki ceramicznej." }
      ]}
    ],
    faq: [
      { question: "Czy licówki wymagają szlifowania zębów?", answer: "Zakres przygotowania zależy od rodzaju licówki i sytuacji klinicznej. Powinien zostać omówiony przed wyrażeniem zgody na leczenie." },
      { question: "Ile licówek potrzeba?", answer: "Nie ma jednej prawidłowej liczby. Decydują warunki kliniczne, linia uśmiechu i uzgodniony plan estetyczny." },
      { question: "Czy efekt można zagwarantować?", answer: "Nie należy obiecywać konkretnego rezultatu bez diagnozy i planowania. Warto uzgodnić projekt uśmiechu, kolor, proporcje i ograniczenia leczenia." }
    ],
    sources: [{ label: "American Dental Association: informacje dla pacjentów o licówkach", href: "https://www.mouthhealthy.org/all-topics-a-z/veneers" }],
    ctaLabel: "Poproś o ocenę estetyczną", ctaEvent: "licowki_cta"
  },
  "cala-szczeka": {
    lastUpdated: "2026-10-02",
    slug: "cala-szczeka", title: "Cała szczęka w Turcji – pełna odbudowa uzębienia",
    description: "Co może oznaczać leczenie całej szczęki w Turcji: implanty, korony, All-on-4, All-on-6 i indywidualna rekonstrukcja.",
    eyebrow: "Pełna rekonstrukcja", h1: "Zęby w Turcji na całą szczękę",
    lead: "„Cała szczęka” to opis potrzeby pacjenta, a nie nazwa jednego zabiegu. W zależności od stanu zębów i kości plan może dotyczyć zachowania własnych zębów, implantów albo odbudowy protetycznej.",
    answer: "Nie wybieraj All-on-4, All-on-6, koron ani pojedynczych implantów wyłącznie na podstawie ceny. Najpierw trzeba ustalić, które zęby można zachować i jaki cel funkcjonalny ma leczenie.",
    schemaType: "MedicalWebPage",
    sections: [
      { title: "Możliwe rozwiązania", table: { headers: ["Sytuacja", "Możliwy kierunek", "Co wymaga oceny"], rows: [
        ["Własne zęby możliwe do zachowania", "leczenie i odbudowy na zębach", "stan tkanek, zgryz, rokowanie każdego zęba"],
        ["Pojedyncze lub odcinkowe braki", "implanty, mosty lub rozwiązania ruchome", "warunki kostne i rozmieszczenie braków"],
        ["Bezzębie lub zęby bez rokowania", "pełnołukowa odbudowa implantoprotetyczna", "kwalifikacja, liczba implantów, rodzaj pracy"],
        ["Cel głównie estetyczny", "leczenie zachowawcze, ortodoncja, licówki lub korony", "zdrowie zębów i stopień ingerencji"]
      ]}},
      { title: "All-on-4 i All-on-6 nie są synonimami", paragraphs: ["Nazwy odnoszą się do różnych koncepcji podparcia pełnołukowej odbudowy implantoprotetycznej. Liczba implantów nie powinna być wybierana jako pakiet marketingowy. Decyzja należy do lekarza po diagnostyce i ocenie obciążeń."] },
      { title: "Co mówi piśmiennictwo o All-on-4", paragraphs: ["Koncepcja All-on-4 jest opisywana w przeglądach systematycznych, które analizują przeżywalność implantów osiowych i pochylonych stosowanych w odbudowie pełnołukowej u pacjentów z bezzębiem. Wyniki dotyczą badanych grup i protokołów. Nie są obietnicą rezultatu dla konkretnego pacjenta i nie zastępują kwalifikacji lekarskiej."] },
      { title: "Jak przygotować się do rozmowy z lekarzem", paragraphs: ["Poniższa tabela nie kwalifikuje do zabiegu. Pomaga ustalić, jakie pytanie powinno zostać wyjaśnione przez lekarza przed porównywaniem metod i cen."], table: { headers: ["Sytuacja wyjściowa", "Pierwsze pytanie kliniczne", "Właściwy następny krok"], rows: [
        ["Własne zęby nadal są obecne", "które zęby mają dobre rokowanie i mogą zostać zachowane?", "plan zachowawczy lub protetyczny przed rozmową o usuwaniu zębów"],
        ["Brakuje pojedynczych zębów", "czy uzupełnienie powinno być oparte na implancie, moście czy rozwiązaniu ruchomym?", "konsultacja dotycząca implantów i alternatyw"],
        ["Brakuje większości zębów", "czy problem dotyczy jednego odcinka, całego łuku czy obu łuków?", "pełna diagnostyka funkcji, kości i rokowania pozostałych zębów"],
        ["Pacjent nie ma zębów", "jaki typ odbudowy stałej lub ruchomej jest możliwy?", "porównanie rozwiązań, a nie wybór liczby implantów z reklamy"],
        ["Główny cel jest estetyczny", "czy problem można rozwiązać mniej inwazyjnie?", "ocena zgryzu, szkliwa, dziąseł i alternatyw dla koron"],
        ["Rozważane jest All-on-4", "czy warunki anatomiczne i protetyczne uzasadniają tę koncepcję?", "osobna kwalifikacja do All-on-4 po diagnostyce"]
      ]}},
      { title: "Jak przygotować się do wstępnej oceny", bullets: ["opisz, które zęby sprawiają problem i jakie leczenie było wykonywane wcześniej", "przygotuj aktualne badania obrazowe, jeśli je posiadasz", "podaj przyjmowane leki i istotne informacje zdrowotne bez publikowania ich w kanałach marketingowych", "poproś o warianty planu, zakres etapów oraz koszty dodatkowe"] }
    ],
    faq: [
      { question: "Ile kosztuje cała szczęka w Turcji?", answer: "Nie istnieje jedna cena dla „całej szczęki”, ponieważ to określenie obejmuje różne problemy i metody leczenia. Najpierw potrzebny jest zakres kliniczny." },
      { question: "Czy wszystkie zęby trzeba usuwać?", answer: "Nie można tego zakładać. Każdy ząb powinien zostać oceniony, a powód ewentualnego usunięcia jasno wyjaśniony." },
      { question: "Czy All-on-6 jest zawsze lepsze niż All-on-4?", answer: "Nie. Większa liczba implantów sama w sobie nie przesądza o lepszym wyniku. Wybór zależy od diagnostyki i planu protetycznego." }
    ],
    sources: [{ label: "Survival rates of axial and tilted implants in the rehabilitation of edentulous jaws using the All-on-four™ concept: A systematic review (PMC)", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8061444/" }],
    ctaLabel: "Skonsultuj pełną odbudowę uzębienia", ctaEvent: "full_mouth_cta"
  },
  "all-on-4": {
    lastUpdated: "2026-10-02",
    slug: "all-on-4", title: "All-on-4 w Turcji – kwalifikacja, etapy i koszt",
    description: "All-on-4 w Turcji: czym jest pełnołukowa odbudowa na czterech implantach, jak wygląda kwalifikacja i co powinien zawierać plan.",
    eyebrow: "Pełnołukowa odbudowa", h1: "All-on-4 w Turcji",
    lead: "All-on-4 to koncepcja pełnołukowej odbudowy protetycznej opartej na czterech implantach. Nie jest automatycznym rozwiązaniem dla każdej osoby z brakami zębowymi.",
    answer: "Najważniejsza jest kwalifikacja do leczenia, a nie sama nazwa pakietu. Plan powinien określać diagnostykę, system implantologiczny, rodzaj pracy tymczasowej i ostatecznej oraz opiekę po leczeniu.",
    schemaType: "MedicalWebPage",
    sections: [
      { title: "Co wymaga indywidualnej oceny", bullets: ["stan kości i tkanek miękkich", "stan pozostałych zębów i powód ich ewentualnego usunięcia", "zgryz, obciążenia i nawyki", "choroby ogólne, leki i czynniki ryzyka", "możliwość utrzymania higieny odbudowy"] },
      { title: "Nie porównuj wyłącznie ceny pakietu", paragraphs: ["Dwie oferty All-on-4 mogą obejmować inne systemy implantów, materiały, diagnostykę, odbudowy tymczasowe i docelowe. Poproś o rozpisanie wszystkich elementów oraz procedury na wypadek zmiany planu po badaniu klinicznym."] },
      { title: "Co mówi piśmiennictwo naukowe", paragraphs: ["Koncepcja All-on-4 jest przedmiotem przeglądów systematycznych, które oceniają przeżywalność implantów osiowych i pochylonych w odbudowie pełnołukowej u pacjentów z bezzębiem. Wyniki dotyczą badanych grup i ustalonych protokołów, nie są obietnicą rezultatu dla konkretnego pacjenta i nie zastępują indywidualnej kwalifikacji."] },
      { title: "Alternatywy", paragraphs: ["W zależności od przypadku lekarz może omówić inne rozwiązania implantoprotetyczne lub ruchome. All-on-4 nie powinno być przedstawiane jako jedyna możliwość przed diagnostyką."] }
    ],
    faq: [
      { question: "Czy All-on-4 oznacza zęby w jeden dzień?", answer: "Nie należy utożsamiać nazwy metody z gwarancją konkretnego harmonogramu. Możliwość zastosowania odbudowy tymczasowej i czas leczenia zależą od kwalifikacji." },
      { question: "Ile kosztuje All-on-4 w Turcji?", answer: "Przekazany cennik podaje ceny poszczególnych implantów i procedur, ale nie zawiera ceny kompletnego pakietu All-on-4. Koszt pełnego leczenia wymaga ustalenia systemu implantów, pracy tymczasowej i docelowej, diagnostyki oraz liczby etapów." },
      { question: "Czy All-on-4 i cała szczęka to to samo?", answer: "Nie. „Cała szczęka” opisuje problem lub zakres leczenia, a All-on-4 jest jedną z możliwych koncepcji pełnołukowej odbudowy." }
    ],
    sources: [{ label: "Survival rates of axial and tilted implants in the rehabilitation of edentulous jaws using the All-on-four™ concept: A systematic review (PMC)", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8061444/" }],
    ctaLabel: "Zapytaj o kwalifikację do All-on-4", ctaEvent: "all_on_4_cta"
  },
  opinie: {
    slug: "opinie", title: "Zęby w Turcji – opinie pacjentów i jak je weryfikować",
    description: "Jak czytać opinie o leczeniu zębów w Turcji, odróżniać doświadczenie pacjenta od reklamy i sprawdzić klinikę przed decyzją.",
    eyebrow: "Opinie i doświadczenia", h1: "Zęby w Turcji: jak oceniać opinie",
    lead: "Opinie pomagają poznać organizację wyjazdu i komunikację, ale nie potwierdzają kwalifikacji medycznej ani jakości leczenia w Twoim przypadku.",
    answer: "Nie prowadzimy forum ani nie publikujemy opinii, których autentyczności nie możemy potwierdzić. Na tej stronie pokazujemy, jak weryfikować doświadczenia pacjentów i które informacje sprawdzić niezależnie przed wyborem kliniki.",
    sections: [
      { title: "Na co zwrócić uwagę w opinii", bullets: ["opisuje konkretny zakres leczenia i etapy, a nie tylko ogólne wrażenie", "rozróżnia opiekę organizacyjną od oceny medycznej", "nie obiecuje identycznego rezultatu każdej osobie", "pokazuje datę i kontekst doświadczenia", "może zostać powiązana z rzeczywistym źródłem bez naruszania prywatności"] },
      { title: "Czerwone flagi", cards: [
        { title: "Same superlatywy", text: "Brak szczegółów, powtarzalne sformułowania i identyczny styl wielu recenzji." },
        { title: "Obietnice medyczne", text: "Zapewnienie o zerowym ryzyku, bezbolesności lub dożywotnim efekcie." },
        { title: "Brak źródła", text: "Zrzuty ekranu bez daty, profilu i możliwości sprawdzenia kontekstu." },
        { title: "Presja sprzedażowa", text: "Opinia połączona z ograniczoną czasowo ofertą lub nakłanianiem do szybkiej wpłaty." }
      ]},
      { title: "Jak porównywać źródła opinii", bullets: ["sprawdź kilka niezależnych serwisów, a nie jeden profil wskazany przez organizatora", "zwróć uwagę na rozkład ocen i daty, nie tylko na średnią", "przeczytaj także oceny negatywne i odpowiedzi kliniki na nie", "sprawdź, czy serwis informuje, czy i jak weryfikuje autentyczność opinii", "szukaj opisów konkretnego leczenia, kosztów dodatkowych i kontaktu po powrocie"] },
      { title: "Opinie w świetle prawa konsumenckiego", paragraphs: ["Według UOKiK przedsiębiorca udostępniający opinie konsumentów powinien poinformować, czy i jak weryfikuje ich autentyczność oraz czy pokazuje także oceny negatywne. Nie może sugerować, że opinie pochodzą od osób, które skorzystały z usługi, jeśli tego nie sprawdzał. Tworzenie i publikowanie fałszywych opinii jest zakazane.", "Dla pacjenta wynika z tego prosty test: opinia bez źródła, daty i możliwości weryfikacji nie powinna decydować o wyborze kliniki."] },
      { title: "Co sprawdzić poza opiniami", paragraphs: ["Poproś o dane operatora, nazwę kliniki, lekarza prowadzącego, pisemny plan leczenia, zasady opieki po powrocie i procedurę reklamacyjną. Zobacz również poradnik wyboru kliniki oraz zasady oceny zdjęć przed i po."] }
    ],
    faq: [
      { question: "Czy ta strona jest forum pacjentów?", answer: "Nie. Serwis nie prowadzi niezależnego forum ani społeczności pacjentów." },
      { question: "Czy publikujecie prawdziwe opinie?", answer: "Nie publikujemy opinii, dopóki nie będzie można zweryfikować ich autentyczności, zgody na publikację i relacji komercyjnej." },
      { question: "Jak sprawdzić opinie o klinice?", answer: "Warto porównać wiele źródeł, sprawdzić profil opiniującego, daty, odpowiedzi kliniki oraz informacje o lekarzach i podmiocie leczniczym." }
    ],
    sources: [{ label: "UOKiK: fałszywe opinie (Fake opinions? Stop!)", href: "https://uokik.gov.pl/en/fake-opinions-stop" }],
    lastUpdated: "2026-10-02",
    ctaLabel: "Przejdź do listy kontroli kliniki", ctaEvent: "clinic_check_cta", ctaHref: "/jak-wybrac-klinike"
  },
  "przed-i-po": {
    slug: "przed-i-po", title: "Zęby w Turcji przed i po – jak oceniać efekty leczenia",
    description: "Jak odpowiedzialnie oceniać zdjęcia zębów przed i po leczeniu w Turcji oraz o co zapytać przed podjęciem decyzji.",
    eyebrow: "Efekty leczenia", h1: "Zęby w Turcji przed i po",
    lead: "Zdjęcia mogą pokazać zmianę estetyczną, ale nie pokazują pełnej diagnozy, funkcji zgryzu, trwałości ani przebiegu leczenia.",
    answer: "Galeria pokazuje zmiany wyglądu uśmiechu. Same zdjęcia nie potwierdzają diagnozy, metody ani czasu leczenia, dlatego nie przypisujemy im niepotwierdzonych szczegółów.",
    sections: [
      { title: "Jak czytać materiał przed i po", bullets: ["sprawdź, czy zdjęcia wykonano w podobnym świetle i ustawieniu", "zapytaj, jaki dokładnie zakres leczenia przedstawiono", "odróżnij efekt tymczasowy od ostatecznej odbudowy", "nie oceniaj zdrowia tkanek wyłącznie na podstawie fotografii", "pamiętaj, że indywidualny wynik może być inny"] },
      { title: "Czego zdjęcie nie wyjaśnia", cards: [
        { title: "Diagnoza", text: "Nie pokazuje całej dokumentacji ani powodów wyboru leczenia." },
        { title: "Funkcja", text: "Nie pozwala ocenić zgryzu, komfortu żucia ani wymowy." },
        { title: "Czas", text: "Efekt bez daty kontroli nie mówi, jak odbudowa zachowuje się po leczeniu." },
        { title: "Ryzyko", text: "Fotografia nie informuje o ograniczeniach, powikłaniach i alternatywach." }
      ]},
      { title: "Standard publikacji przypadków", paragraphs: ["Dodatkowe informacje kliniczne zostaną przypisane do przypadku dopiero po potwierdzeniu zakresu leczenia i dat. Każdy rezultat jest indywidualny, a materiały stockowe nie są przedstawiane jako pacjenci kliniki."] }
    ],
    faq: [
      { question: "Dlaczego nie podajecie rodzaju leczenia pod zdjęciami?", answer: "Same zdjęcia nie dostarczają wystarczających informacji, by rzetelnie podać diagnozę, metodę, liczbę odbudowanych zębów lub czas leczenia. Nie uzupełniamy tych informacji domysłami." },
      { question: "Czy zdjęcie wystarczy do wyboru kliniki?", answer: "Nie. Powinno być tylko jednym z elementów oceny obok kwalifikacji lekarzy, planu leczenia, dokumentacji i opieki po zabiegu." }
    ],
    ctaLabel: "Poproś o wstępną ocenę", ctaEvent: "before_after_hero_cta", ctaHref: "/kontakt?lead_source=OGZ-PL&cta_location=before_after_hero&page_path=%2Fprzed-i-po"
  },
  antalya: {
    slug: "antalya", title: "Leczenie zębów w Antalyi – plan wyjazdu i wizyt",
    description: "Jak zaplanować leczenie zębów w Antalyi: dokumentacja, harmonogram wizyt, ubezpieczenie, umowa i zaliczka, podróż oraz opieka po powrocie.",
    eyebrow: "Kierunek: Antalya", h1: "Leczenie zębów w Antalyi",
    lead: "Podróż do Antalyi warto zaplanować wokół wizyt i zaleceń lekarza. Zwiedzanie powinno zejść na dalszy plan, jeśli wymaga tego leczenie.",
    answer: "Przed rezerwacją lotu z Polski ustal wstępny plan leczenia, możliwą liczbę wizyt i zasady kontaktu po powrocie. Plan może się zmienić po badaniu w Antalyi.",
    sections: [
      { title: "Przed wyjazdem", bullets: ["przekaż dokumentację bezpiecznym kanałem wskazanym przez organizatora", "uzyskaj pisemny zakres wstępnego planu i kosztów", "nie rezerwuj zbyt krótkiego pobytu bez potwierdzenia harmonogramu", "sprawdź ważność dokumentów podróży i aktualne zalecenia konsularne", "zostaw czas na kontrolę przed lotem powrotnym"] },
      { title: "Na miejscu", cards: [
        { title: "Badanie i potwierdzenie planu", text: "Wstępna propozycja może zmienić się po badaniu klinicznym i diagnostyce." },
        { title: "Świadoma zgoda", text: "Przed leczeniem powinny zostać omówione alternatywy, ograniczenia i ryzyka." },
        { title: "Dokumentacja", text: "Poproś o kopię planu, wykonanych procedur, użytych materiałów i zaleceń." },
        { title: "Kontrola przed powrotem", text: "Ustal, co wymaga sprawdzenia przed lotem i jak zgłaszać problem po powrocie." }
      ]},
      { title: "Po powrocie do Polski", paragraphs: ["Zachowaj dokumentację i dane kontaktowe kliniki. Jeszcze przed wyjazdem ustal, do kogo zwrócisz się po powrocie do Polski, jeśli będzie potrzebna kontrola, korekta lub pilna pomoc."] },
      { title: "Ubezpieczenie zdrowotne i polisa podróżna", paragraphs: ["Europejska Karta Ubezpieczenia Zdrowotnego (EKUZ) uprawnia do świadczeń tylko w państwach UE i EFTA. Turcja do nich nie należy, więc EKUZ nie jest podstawą pokrycia kosztów leczenia w Antalyi. Informacje o leczeniu za granicą publikuje portal pacjent.gov.pl.", "Przed wyjazdem sprawdź w warunkach polisy, czy obejmuje ona planowe leczenie stomatologiczne, powikłania po zabiegu oraz ewentualny dodatkowy pobyt. Zapisz odpowiedź ubezpieczyciela, zamiast opierać się na ustnym zapewnieniu."] },
      { title: "Umowa, zaliczka i warunki wyjazdu", paragraphs: ["Jeżeli organizator sprzedaje wyjazd jako pakiet, Europejskie Centrum Konsumenckie wskazuje elementy, które powinna zawierać umowa: miejsce i czas trwania, rodzaj zakwaterowania, cenę łączną, warunki płatności, zasady odwołania i ubezpieczenie. Przy leczeniu rozdziel w dokumentach część medyczną, którą wykonuje klinika, od części organizacyjnej, za którą może odpowiadać pośrednik.", "Zachowaj pisemne potwierdzenie zaliczki, jej przeznaczenia i warunków zwrotu. Jeśli umowa nie wymienia hotelu, transferu lub kontroli przed wylotem, traktuj je jako niewliczone, dopóki nie otrzymasz potwierdzenia."] },
      { title: "Plan rozmowy z kliniką przed rezerwacją lotu", bullets: ["zakres wstępnego planu i etapy, które mogą wymagać kolejnego pobytu", "kto prowadzi leczenie i kto będzie dostępny po Twoim wyjeździe", "jak wygląda przekazanie dokumentacji, zdjęć RTG i listy użytych materiałów", "co klinika uznaje za zdarzenie wymagające szybkiego kontaktu po powrocie", "jakie czynności muszą zostać wykonane przed lotem powrotnym"] }
    ],
    faq: [
      { question: "Ile dni trzeba zostać w Antalyi?", answer: "Nie podajemy jednej liczby bez zweryfikowanego planu. Długość pobytu zależy od rodzaju leczenia, etapów i wymaganych kontroli." },
      { question: "Czy cena obejmuje hotel i transfer?", answer: "Nie zostało to potwierdzone dla aktualnej oferty. Hotel i transfer powinny być wyraźnie wymienione w pisemnej wycenie, jeśli są wliczone." },
      { question: "Czy EKUZ obowiązuje w Turcji?", answer: "Nie. EKUZ dotyczy świadczeń w państwach UE i EFTA, a Turcja do nich nie należy. Sprawdź w polisie podróżnej, czy obejmuje planowe leczenie stomatologiczne i powikłania." },
      { question: "Czy leczenie można połączyć z wakacjami?", answer: "Plan aktywności powinien uwzględniać zalecenia lekarza i przebieg leczenia. Priorytetem jest bezpieczna organizacja terapii i kontroli." }
    ],
    sources: [
      { label: "Ministerstwo Spraw Zagranicznych RP: informacje dla podróżujących do Turcji", href: "https://www.gov.pl/web/turcja/informacje-dla-podrozujacych" },
      { label: "pacjent.gov.pl: leczenie za granicą", href: "https://pacjent.gov.pl/leczenie-za-granica" },
      { label: "NFZ: EKUZ obowiązuje w państwach UE i EFTA", href: "https://www.nfz.gov.pl/dla-pacjenta/nasze-zdrowie-w-ue/leczenie-w-krajach-unii-europejskiej-i-efta/wypoczynek-w-panstwach-czlonkowskich-ueefta-ekuz/" },
      { label: "Europejskie Centrum Konsumenckie: wyjazd zorganizowany i prawa konsumenta", href: "https://konsument.gov.pl/wyjazd-zorganizowany-prawa-konsumenta/" }
    ],
    lastUpdated: "2026-10-02",
    ctaLabel: "Zapytaj o plan wyjazdu", ctaEvent: "antalya_cta"
  },
  "jak-wybrac-klinike": {
    slug: "jak-wybrac-klinike", title: "Jak wybrać klinikę stomatologiczną w Turcji",
    description: "Co sprawdzić w klinice stomatologicznej w Turcji: lekarze, plan leczenia, materiały, opieka po zabiegu i reklamacje.",
    eyebrow: "Bezpieczna decyzja", h1: "Jak wybrać klinikę stomatologiczną w Turcji",
    lead: "Dobra decyzja opiera się na możliwych do sprawdzenia informacjach: kto leczy, gdzie odbywa się leczenie, jaki jest plan i co dzieje się po powrocie.",
    answer: "Nie wybieraj kliniki wyłącznie na podstawie ceny, zdjęć w mediach społecznościowych albo obietnicy szybkiego efektu. Najpierw zweryfikuj podmiot, lekarza, zakres odpowiedzialności i dokumentację.",
    sections: [
      { title: "Co sprawdzić przed wpłatą", bullets: ["pełna nazwa i adres podmiotu wykonującego leczenie", "imię, nazwisko, specjalizacja i możliwość weryfikacji lekarza", "pisemny plan z alternatywami i kosztami dodatkowymi", "nazwa materiałów i systemów, które zostaną użyte", "zasady przechowywania i przekazania dokumentacji", "opieka po leczeniu, reklamacje i sytuacje nagłe", "jasne warunki zaliczki, odwołania i zwrotu"] },
      { title: "Zaliczka, zadatek i zwrot", paragraphs: ["Zanim wpłacisz pieniądze, ustal na piśmie, czy jest to zaliczka, czy zadatek, i na co jest przeznaczona. UOKiK wskazuje, że zaliczka podlega zwrotowi, gdy konsument rezygnuje z usługi, a zadatek wykonawca może wtedy zatrzymać. Wpłata nie może pokrywać całego wynagrodzenia za usługę."] },
      { title: "Kto odpowiada za co", paragraphs: ["Jeżeli w procesie uczestniczy pośrednik, koordynator lub strona informacyjna, zapytaj, kto odpowiada za organizację wyjazdu, a kto za leczenie. Decyzje medyczne powinien podejmować uprawniony lekarz, a umowa wskazywać właściwy podmiot."] },
      { title: "20 pytań, które warto zadać przed wpłatą zaliczki", paragraphs: ["Odpowiedzi powinny być możliwe do zachowania w wiadomości, planie leczenia albo warunkach umowy. Brak odpowiedzi nie przesądza o jakości leczenia, ale wymaga wyjaśnienia przed decyzją."], bullets: [
        "jaka jest pełna nazwa prawna i adres placówki wykonującej leczenie?",
        "kto jest stroną umowy z pacjentem?",
        "jak nazywa się lekarz prowadzący i gdzie można zweryfikować jego uprawnienia?",
        "kto przygotował wstępny plan: lekarz czy koordynator sprzedaży?",
        "jakiej dokumentacji potrzeba przed podróżą?",
        "które elementy planu mogą zmienić się po badaniu na miejscu?",
        "które zęby wymagają leczenia i dlaczego?",
        "które własne zęby można zachować?",
        "jakie mniej inwazyjne alternatywy zostały rozważone?",
        "jakie implanty, materiały i prace protetyczne zostaną użyte?",
        "co obejmuje cena, a co może być dopłatą?",
        "ile wizyt i oddzielnych wyjazdów może być potrzebnych?",
        "czy plan obejmuje rozwiązanie tymczasowe i docelowe?",
        "jakie ryzyka i ograniczenia są istotne w tym przypadku?",
        "kto udziela pomocy w razie problemu podczas pobytu?",
        "kto odpowiada za kontrolę i pomoc po powrocie do Polski?",
        "jakie dokumenty, zdjęcia i dane materiałów otrzyma pacjent po leczeniu?",
        "jakie są warunki gwarancji, jej wyłączenia i wymagane kontrole?",
        "kto pokrywa leczenie lub podróż, jeżeli potrzebna jest korekta?",
        "jakie są zasady zaliczki, odwołania, zwrotu i reklamacji?"
      ] },
      { title: "Czerwone flagi", cards: [
        { title: "Plan bez diagnostyki", text: "Ostateczna obietnica leczenia bez badania i dokumentacji." },
        { title: "Brak nazwisk", text: "Nie wiadomo, kto będzie leczył i jakie ma kwalifikacje." },
        { title: "Presja na wpłatę", text: "Cena ważna tylko dziś lub odmowa przesłania warunków na piśmie." },
        { title: "Brak opieki po powrocie", text: "Niejasna procedura w razie bólu, korekty lub komplikacji." }
      ]}
    ],
    faq: [
      { question: "Czy serwis jest niezależną porównywarką klinik?", answer: "Nie. Serwis ma cel komercyjny. Serwis prowadzi spółka DENT AKDENİZ AĞIZ VE DİŞ SAĞLIĞI HİZMETLERİ LİMİTED ŞİRKETİ, która prowadzi także klinikę Akdeniz Dental w Antalyi. Nie jest więc neutralnym rankingiem." },
      { question: "Czy same opinie w Google wystarczą?", answer: "Nie. Mogą pomóc w ocenie kliniki, ale sprawdź też lekarza, plan leczenia, dokumentację i zasady opieki po powrocie." },
      { question: "Kiedy wpłacić zaliczkę?", answer: "Dopiero po poznaniu podmiotu, warunków płatności, zasad zwrotu oraz zakresu wstępnej oferty. Dane te powinny być dostępne na piśmie." }
    ],
    sources: [{ label: "UOKiK: Zadatek czy zaliczka? Porady UOKiK", href: "https://archiwum.uokik.gov.pl/aktualnosci.php?news_id=11145" }],
    lastUpdated: "2026-10-02",
    ctaLabel: "Poproś o wstępną ocenę", ctaEvent: "clinic_check_cta"
  },
  "o-nas": {
    slug: "o-nas", title: "O serwisie Zęby w Turcji", description: "Czym jest serwis Zęby w Turcji: cel komercyjny, relacja z kliniką Akdeniz Dental, zasady transparentności, źródła treści i zakres odpowiedzialności.",
    eyebrow: "Transparentność", h1: "O serwisie",
    lead: "Zęby w Turcji to polskojęzyczny serwis informacyjny przygotowany dla osób rozważających leczenie stomatologiczne w Turcji, ze szczególnym uwzględnieniem Antalyi.",
    answer: "To serwis informacyjny o celu komercyjnym. Serwis prowadzi spółka DENT AKDENİZ AĞIZ VE DİŞ SAĞLIĞI HİZMETLERİ LİMİTED ŞİRKETİ, która prowadzi także klinikę Akdeniz Dental w Antalyi. Serwis nie wykonuje leczenia, nie jest niezależną porównywarką i nie zastępuje porady lekarza.",
    lastUpdated: "2026-10-02",
    sources: [{ label: "Polityka redakcyjna: autorstwo, źródła i korekty", href: "/polityka-redakcyjna" }, { label: "Weryfikacja medyczna: zasady i status recenzji", href: "/weryfikacja-medyczna" }, { label: "Eksperci: profile recenzentów i powiązania z kliniką", href: "/eksperci" }, { label: "Nasi lekarze: zespół kliniki prowadzonej przez operatora serwisu", href: "/nasi-lekarze" }, { label: "Akdeniz Dental: oficjalna strona kliniki prowadzonej przez operatora serwisu", href: "https://akdenizdental.com" }, { label: "Metodologia serwisu", href: "/metodologia" }, { label: "Właściciel i finansowanie serwisu", href: "/wlasciciel-i-finansowanie" }, { label: "Korekty i zgłaszanie błędów", href: "/korekty" }],
    faq: [
      { question: "Czy serwis jest niezależną porównywarką klinik?", answer: "Nie. To serwis informacyjny o celu komercyjnym. Serwis prowadzi spółka DENT AKDENİZ AĞIZ VE DİŞ SAĞLIĞI HİZMETLERİ LİMİTED ŞİRKETİ, która prowadzi także klinikę Akdeniz Dental w Antalyi. Nie przedstawiamy go jako neutralnego rankingu." },
      { question: "Kto jest operatorem serwisu?", answer: "DENT AKDENİZ AĞIZ VE DİŞ SAĞLIĞI HİZMETLERİ LİMİTED ŞİRKETİ z siedzibą w Antalyi, w Turcji (Çaybaşı, 1358. Sk. Premier Plaza D:1 B Blok, 07100 Muratpaşa). To ta sama spółka, która prowadzi klinikę Akdeniz Dental." },
      { question: "Jak zgłosić błąd lub nieaktualną cenę?", answer: "Przez stronę kontaktową. Zgłoszenie jest sprawdzane ze źródłem, a data strony zmienia się po wprowadzeniu istotnej korekty." }
    ],
    sections: [
      { title: "Nasze zasady", bullets: ["nie publikujemy niezweryfikowanych cen ani obietnic rezultatów", "nie tworzymy fikcyjnych opinii i przypadków przed i po", "oddzielamy treść informacyjną od decyzji medycznej", "wskazujemy brak danych zamiast zastępować go marketingową deklaracją"] },
      { title: "Czym jest serwis, a czym nie", paragraphs: ["Serwis zbiera i porządkuje informacje o leczeniu stomatologicznym w Turcji: metodach, kosztach z cennika kliniki, planowaniu wyjazdu i opiece po powrocie. Nie świadczy usług medycznych, nie stawia diagnoz i nie ustala planów leczenia.", "Treści opisują ogólne zasady. O kwalifikacji do konkretnego zabiegu decyduje lekarz po badaniu, a pisemna oferta kliniki ma pierwszeństwo przed informacjami z tego serwisu."] },
      { title: "Jak powstają treści", paragraphs: ["Teksty przygotowuje redakcja serwisu zgodnie z polityką redakcyjną. Ceny pochodzą z cennika kliniki prowadzonej przez operatora serwisu i mają datę aktualizacji. Status recenzji medycznej jest przypisany do konkretnej strony i widoczny na niej. Strony bez recenzji są jako takie oznaczone."], bullets: ["standard autorstwa, źródeł i korekt opisuje polityka redakcyjna", "zasady i zakres recenzji opisuje strona o weryfikacji medycznej", "profile recenzentów znajdują się w sekcji Eksperci, a zespół kliniki na stronie Nasi lekarze"] },
      { title: "Operator serwisu i relacja z kliniką", paragraphs: ["Serwis prowadzi spółka DENT AKDENİZ AĞIZ VE DİŞ SAĞLIĞI HİZMETLERİ LİMİTED ŞİRKETİ, która prowadzi także klinikę Akdeniz Dental w Antalyi. Dlatego nie przedstawiamy kliniki jako niezależnej. Recenzenci medyczni serwisu są związani z tą kliniką zawodowo i komercyjnie, co ujawniamy na stronach recenzji i w profilach ekspertów.", "Dane rejestrowe operatora podajemy poniżej. Dane kontaktowe są dostępne przez formularz na stronie kontaktowej."] },
      { title: "Jak zgłosić błąd lub zastrzeżenie", paragraphs: ["Błąd merytoryczny, nieaktualną cenę lub zastrzeżenie do treści możesz zgłosić przez stronę kontaktową. Zgłoszenie jest sprawdzane ze źródłem, a data strony zmienia się dopiero po wprowadzeniu istotnej korekty."] }
    ]
  },
  kontakt: {
    slug: "kontakt", lastUpdated: "2026-10-02", title: "Kontakt i bezpłatna konsultacja", description: "Poproś o bezpłatną konsultację. Podaj imię i nazwisko, telefon, WhatsApp, e-mail i kraj oraz opcjonalnie dodaj wiadomość.",
    eyebrow: "Następny krok", h1: "Poproś o wstępną ocenę leczenia",
    lead: "W formularzu możesz krótko opisać, jakie leczenie rozważasz i o co chcesz zapytać. Nie przesyłaj dokumentacji medycznej, dopóki nie otrzymasz potwierdzonego bezpiecznego kanału.",
    answer: "Podaj dane kontaktowe i krótko opisz, czego potrzebujesz. Zgłoszenie jest przesyłane przez Formspree. Plan leczenia ustala lekarz po badaniu; nie przesyłaj dokumentacji medycznej przez formularz.",
    sections: [
      { title: "Przygotuj przed kontaktem", bullets: ["rodzaj leczenia, które rozważasz", "krótki opis problemu bez zbędnych danych zdrowotnych", "preferowany sposób kontaktu", "pytania o koszt, etapy i organizację wyjazdu"] },
      { title: "Czego nie wysyłać przez formularz", paragraphs: ["Nie przesyłaj zdjęć, wyników badań, rentgenów ani innych danych o zdrowiu, dopóki nie otrzymasz potwierdzenia bezpiecznego kanału. Wystarczy krótki opis tego, jakiego leczenia dotyczy pytanie."] },
      { title: "Dane z formularza i prywatność", paragraphs: ["Zgłoszenie jest przekazywane przez usługę Formspree. Zakres przetwarzania danych opisuje polityka prywatności. Strona kontaktowa nie zastępuje konsultacji lekarskiej, a odpowiedź na zgłoszenie nie jest planem leczenia."] }
    ],
    faq: [
      { question: "Czy mogę wysłać dokumentację medyczną przez formularz?", answer: "Nie. Nie przesyłaj dokumentacji ani zdjęć, dopóki nie otrzymasz potwierdzenia bezpiecznego kanału. Wystarczy krótki opis pytania." },
      { question: "Czy odpowiedź na zgłoszenie jest planem leczenia?", answer: "Nie. Wstępna ocena pomaga określić możliwy zakres, ale plan leczenia ustala lekarz po badaniu i diagnostyce." },
      { question: "Jakie dane podać w formularzu?", answer: "Imię i nazwisko, telefon, WhatsApp, e-mail i kraj oraz opcjonalnie krótką wiadomość o rodzaju leczenia, które rozważasz." }
    ],
    sources: [{ label: "Polityka prywatności serwisu", href: "/polityka-prywatnosci" }, { label: "Formspree: polityka prywatności usługi przekazującej zgłoszenia", href: "https://formspree.io/legal/privacy-policy/" }],
    form: true
  },
  "polityka-redakcyjna": {
    slug: "polityka-redakcyjna", title: "Polityka redakcyjna", description: "Jak powstają, są aktualizowane i oznaczane treści w serwisie Zęby w Turcji: autorstwo, źródła, korekty, daty i ujawnienie celu komercyjnego.",
    lastUpdated: "2026-10-02",
    sources: [{ label: "Weryfikacja medyczna: zasady i status recenzji", href: "/weryfikacja-medyczna" }, { label: "Eksperci: profile recenzentów i powiązania z kliniką", href: "/eksperci" }, { label: "O serwisie: cel komercyjny i relacja z kliniką", href: "/o-nas" }, { label: "UOKiK: fałszywe opinie (Fake opinions? Stop!)", href: "https://uokik.gov.pl/en/fake-opinions-stop" }, { label: "Metodologia serwisu", href: "/metodologia" }, { label: "Właściciel i finansowanie serwisu", href: "/wlasciciel-i-finansowanie" }, { label: "Korekty i zgłaszanie błędów", href: "/korekty" }],
    eyebrow: "Standard treści", h1: "Polityka redakcyjna",
    lead: "Treści mają pomagać w podjęciu świadomej decyzji, a nie zastępować diagnozę lub konsultację z lekarzem dentystą.",
    answer: "Oddzielamy informacje kliniczne, logistyczne i komercyjne. Każda istotna aktualizacja powinna mieć datę, źródła i informację o autorze oraz recenzji medycznej, jeżeli faktycznie się odbyła.",
    sections: [
      { title: "Zasady publikacji", bullets: ["każde źródło musi bezpośrednio potwierdzać konkretną informację, przy której zostało podane; sam autorytet domeny nie wystarcza", "w sprawach dotyczących polskich pacjentów w pierwszej kolejności korzystamy z właściwych polskich i unijnych instytucji, wytycznych organizacji stomatologicznych oraz wysokiej jakości literatury dentystycznej", "nie tworzymy nieistniejących ekspertów, cen, opinii ani statystyk", "korygujemy błędy i aktualizujemy treści, gdy zmieniają się dane", "ujawniamy cel komercyjny i relacje z usługodawcami"] },
      { title: "Zgłaszanie i dokumentowanie korekt", paragraphs: ["Jeżeli zauważysz błąd merytoryczny lub nieaktualną informację, skontaktuj się z nami przez stronę kontaktową. Redakcja rejestruje zgłoszenie, sprawdza źródło i zakres poprawki oraz aktualizuje datę strony dopiero po wprowadzeniu istotnej zmiany. Treści kliniczne wymagają ponownej oceny odpowiednio wykwalifikowanej osoby, zanim zostaną oznaczone jako zweryfikowane."] },
      { title: "Rodzaje treści w serwisie", cards: [
        { title: "Przewodniki informacyjne", text: "Opisują metody leczenia, pytania do kliniki i organizację wyjazdu. Nie są poradą medyczną." },
        { title: "Cennik", text: "Pozycje pochodzą z cennika kliniki prowadzonej przez operatora serwisu, mają datę aktualizacji i nie są ceną całego leczenia." },
        { title: "Strony zaufania", text: "Opisują autorstwo, recenzje, zespół kliniki i relacje komercyjne." },
        { title: "Strony prawne", text: "Regulamin, prywatność i cookies. Dane operatora podano na stronie „O serwisie”; pełne teksty prawne są w przygotowaniu." }
      ]},
      { title: "Daty i oznaczenia na stronach", paragraphs: ["Każda strona treści pokazuje datę publikacji i aktualizacji oraz status recenzji medycznej w panelu informacji o treści. Zmiana daty aktualizacji oznacza istotną korektę informacji, a nie sam zabieg kosmetyczny w tekście."] },
      { title: "Ceny i kurs walut", paragraphs: ["Ceny pochodzą z cennika kliniki, są podane w EUR i mają widoczną datę aktualizacji. Przeliczenie na PLN jest orientacyjne, opiera się na kursie z podaną datą i nie jest aktualizowane automatycznie. Cena pozycji z cennika nie jest ceną całego leczenia ani pakietu."] },
      { title: "Oceny i opinie z zewnętrznych serwisów", paragraphs: ["Oceny z Trustpilot i Map Google pokazujemy jako dane zewnętrzne, z datą odczytu i linkiem do profilu. Nie traktujemy ich jako oceny medycznej i nie oznaczamy ich w danych strukturalnych jako własnej oceny serwisu. Wzmianki o lekarzach z opinii pacjentów opisujemy jako opinie, a nie weryfikację kwalifikacji."] },
      { title: "Źródła zewnętrzne", paragraphs: ["Przy informacjach o prawach pacjenta i konsumenta korzystamy z instytucji publicznych, takich jak portal pacjent.gov.pl, NFZ, UOKiK i Europejskie Centrum Konsumenckie. Źródło musi bezpośrednio potwierdzać informację, przy której je podajemy."] },
      { title: "Konflikt interesów", paragraphs: ["Serwis ma cel komercyjny. Serwis prowadzi spółka DENT AKDENİZ AĞIZ VE DİŞ SAĞLIĞI HİZMETLERİ LİMİTED ŞİRKETİ, która prowadzi także klinikę Akdeniz Dental w Antalyi. Recenzenci medyczni są związani z tą kliniką, dlatego opisujemy to powiązanie przy ich profilach i nie przedstawiamy ich jako niezależnych ekspertów."] },
      { title: "Autorstwo", paragraphs: ["Obecne treści przypisane są redakcji serwisu. Nie oznaczamy ich jako zweryfikowane medycznie do czasu zakończenia imiennej recenzji przez osobę o potwierdzonych kwalifikacjach."] }
    ]
  },
  "listy-kontrolne": {
    slug: "listy-kontrolne", published: "2026-10-02", lastUpdated: "2026-10-02", title: "Listy kontrolne dla pacjentów",
    description: "Zbiór list kontrolnych dla pacjentów: wybór kliniki, płatności, przygotowanie wyjazdu, ocena opinii i zdjęć przed i po oraz opieka po powrocie.",
    eyebrow: "Narzędzia dla pacjenta", h1: "Listy kontrolne dla pacjentów",
    lead: "Krótkie listy do przejścia przed wpłatą, wyjazdem i decyzją o leczeniu. Każda opiera się na pełnym przewodniku, do którego prowadzi link.",
    answer: "Przejdź listy po kolei: najpierw sprawdź podmiot i warunki płatności, potem plan wyjazdu, opinie i zdjęcia. Brak odpowiedzi na któreś pytanie nie przesądza o jakości leczenia, ale wymaga wyjaśnienia przed decyzją.",
    sections: [
      { title: "Przed wpłatą zaliczki", bullets: ["pełna nazwa i adres podmiotu wykonującego leczenie", "imię, nazwisko i możliwość weryfikacji lekarza", "pisemny plan z alternatywami i kosztami dodatkowymi", "nazwa materiałów i systemów, które zostaną użyte", "zasady przechowywania i przekazania dokumentacji", "opieka po leczeniu, reklamacje i sytuacje nagłe", "jasne warunki zaliczki lub zadatku, odwołania i zwrotu"] },
      { title: "Przed rezerwacją wyjazdu", bullets: ["przekaż dokumentację bezpiecznym kanałem wskazanym przez organizatora", "uzyskaj pisemny zakres wstępnego planu i kosztów", "nie rezerwuj zbyt krótkiego pobytu bez potwierdzenia harmonogramu", "sprawdź ważność dokumentów podróży i aktualne zalecenia konsularne", "zostaw czas na kontrolę przed lotem powrotnym", "sprawdź w polisie, czy obejmuje planowe leczenie stomatologiczne i powikłania"] },
      { title: "Pytania do kliniki przed rezerwacją lotu", bullets: ["zakres wstępnego planu i etapy, które mogą wymagać kolejnego pobytu", "kto prowadzi leczenie i kto będzie dostępny po Twoim wyjeździe", "jak wygląda przekazanie dokumentacji, zdjęć RTG i listy użytych materiałów", "co klinika uznaje za zdarzenie wymagające szybkiego kontaktu po powrocie", "jakie czynności muszą zostać wykonane przed lotem powrotnym"] },
      { title: "Ocena opinii", bullets: ["opinia opisuje konkretny zakres leczenia i etapy, a nie tylko ogólne wrażenie", "rozróżnia opiekę organizacyjną od oceny medycznej", "nie obiecuje identycznego rezultatu każdej osobie", "pokazuje datę i kontekst doświadczenia", "porównaj kilka niezależnych serwisów i przeczytaj także oceny negatywne"] },
      { title: "Ocena zdjęć przed i po", bullets: ["sprawdź, czy zdjęcia wykonano w podobnym świetle i ustawieniu", "zapytaj, jaki dokładnie zakres leczenia przedstawiono", "odróżnij efekt tymczasowy od ostatecznej odbudowy", "nie oceniaj zdrowia tkanek wyłącznie na podstawie fotografii", "pamiętaj, że indywidualny wynik może być inny"] },
      { title: "Po powrocie do Polski", bullets: ["zachowaj dokumentację i dane kontaktowe kliniki", "ustal jeszcze przed wyjazdem, do kogo zwrócisz się po powrocie", "ustal, co wymaga sprawdzenia przed lotem i jak zgłaszać problem po powrocie"] },
      { title: "Pełne przewodniki", paragraphs: ["Każda lista skraca treść jednego z przewodników: wybór kliniki, plan wyjazdu, ocena opinii i zdjęć przed i po oraz opieka po leczeniu. Kontrolę kosztów znajdziesz na stronie z cennikiem. Wszystkie linki są poniżej."] }
    ],
    sources: [{ label: "Jak wybrać klinikę stomatologiczną w Turcji", href: "/jak-wybrac-klinike" }, { label: "Leczenie zębów w Antalyi: plan wyjazdu i wizyt", href: "/antalya" }, { label: "Jak oceniać opinie", href: "/opinie" }, { label: "Zdjęcia przed i po", href: "/przed-i-po" }, { label: "Opieka po leczeniu i powrocie do Polski", href: "/poradniki/opieka-po-leczeniu" }, { label: "Cennik kliniki i koszt leczenia", href: "/koszt" }]
  },
  metodologia: {
    slug: "metodologia", published: "2026-10-02", lastUpdated: "2026-10-02", title: "Metodologia serwisu",
    description: "Jak zbieramy, sprawdzamy i oznaczamy informacje w serwisie Zęby w Turcji: źródła, ceny, recenzja medyczna, oceny zewnętrzne, daty i korekty.",
    eyebrow: "Transparentność", h1: "Metodologia serwisu",
    lead: "Ta strona zbiera w jednym miejscu zasady, według których powstają i są oznaczane treści serwisu. Szczegóły opisują polityka redakcyjna i strona o weryfikacji medycznej.",
    answer: "Tekst przygotowuje redakcja, źródło musi bezpośrednio potwierdzać informację, ceny pochodzą z cennika kliniki z datą, a recenzja medyczna jest przypisana do konkretnej strony i znika po zmianie treści do czasu ponownego potwierdzenia.",
    sections: [
      { title: "Źródła", bullets: ["każde źródło musi bezpośrednio potwierdzać informację, przy której zostało podane", "w sprawach praw pacjenta i konsumenta korzystamy z instytucji publicznych, takich jak pacjent.gov.pl, NFZ, UOKiK i Europejskie Centrum Konsumenckie", "nie tworzymy nieistniejących ekspertów, cen, opinii ani statystyk", "źródła widoczne są na stronie w sekcji „Źródła i podstawa informacji”"] },
      { title: "Ceny i kurs walut", paragraphs: ["Ceny pochodzą z cennika kliniki, są podane w EUR i mają widoczną datę aktualizacji. Przeliczenie na PLN jest orientacyjne i opiera się na kursie z podaną datą. Cena pozycji z cennika nie jest ceną całego leczenia ani pakietu."] },
      { title: "Recenzja medyczna", paragraphs: ["Recenzent jest przypisany do konkretnych stron, a status i data recenzji są widoczne na stronie. Jeżeli strona zostanie zmieniona po dacie recenzji, oznaczenie „zweryfikowano” znika automatycznie do czasu ponownego potwierdzenia. Aktualny status pokazuje strona Eksperci."] },
      { title: "Oceny i opinie zewnętrzne", paragraphs: ["Oceny z Trustpilot i Map Google pokazujemy jako dane zewnętrzne, z datą odczytu i linkiem do profilu. Nie traktujemy ich jako oceny medycznej ani jako własnej oceny serwisu."] },
      { title: "Daty i aktualizacje", paragraphs: ["Każda strona treści pokazuje datę publikacji i aktualizacji w panelu informacji o treści. Datę aktualizacji zmieniamy po istotnej korekcie informacji."] },
      { title: "Korekty", paragraphs: ["Błędy i nieaktualne informacje można zgłaszać przez stronę kontaktową. Zasady i dziennik wprowadzonych zmian opisuje strona o korektach."] },
      { title: "Czego serwis nie robi", paragraphs: ["Serwis nie diagnozuje, nie kwalifikuje do zabiegu i nie udziela indywidualnej porady medycznej. Ostateczną decyzję podejmuje pacjent wspólnie z lekarzem po badaniu."] }
    ],
    sources: [{ label: "Polityka redakcyjna", href: "/polityka-redakcyjna" }, { label: "Weryfikacja medyczna", href: "/weryfikacja-medyczna" }, { label: "Eksperci i status recenzji stron", href: "/eksperci" }, { label: "Cennik kliniki i koszt leczenia", href: "/koszt" }, { label: "Korekty i zgłaszanie błędów", href: "/korekty" }]
  },
  "wlasciciel-i-finansowanie": {
    slug: "wlasciciel-i-finansowanie", published: "2026-10-02", lastUpdated: "2026-10-02", title: "Właściciel i finansowanie serwisu",
    description: "Kto prowadzi serwis Zęby w Turcji i kto go utrzymuje: dane operatora, cel komercyjny, powiązanie z kliniką Akdeniz Dental i recenzentami.",
    eyebrow: "Transparentność", h1: "Właściciel i finansowanie serwisu",
    lead: "Serwis informacyjny o leczeniu zębów w Turcji prowadzi spółka, która prowadzi także klinikę Akdeniz Dental w Antalyi. Ta strona opisuje to powiązanie wprost.",
    answer: `Serwis prowadzi spółka ${OPERATOR.legalName ?? "operator serwisu"}, która prowadzi także klinikę Akdeniz Dental. Serwis ma cel komercyjny i nie jest niezależnym rankingiem klinik.`,
    sections: [
      { title: "Operator serwisu", paragraphs: [`Operatorem serwisu jest ${OPERATOR.legalName ?? "operator serwisu"}${OPERATOR.streetAddress ? `, ${OPERATOR.streetAddress}, ${[OPERATOR.postalCode, OPERATOR.locality].filter(Boolean).join(" ")}, ${OPERATOR.region ?? ""}, ${OPERATOR.country ?? ""}` : ""}. Dane operatora są widoczne także na stronie „O serwisie”.`] },
      { title: "Cel komercyjny", paragraphs: ["Serwis jest serwisem informacyjnym o celu komercyjnym. Pomaga pacjentom przygotować się do decyzji i zachęca do wysłania zapytania o bezpłatną wstępną ocenę. Zgłoszenia z formularza trafiają do operatora."] },
      { title: "Powiązanie z kliniką", paragraphs: ["Operator prowadzi klinikę Akdeniz Dental w Antalyi, dlatego nie przedstawiamy serwisu jako neutralnego rankingu ani porównywarki. Recenzenci medyczni serwisu są właścicielami lub współwłaścicielami tej kliniki, co opisujemy przy ich profilach."] },
      { title: "Utrzymanie serwisu", paragraphs: ["Serwis jest utrzymywany przez operatora. Treści są dostępne bezpłatnie, a ceny pochodzą z cennika kliniki prowadzonej przez operatora serwisu."] },
      { title: "Gdzie szukać więcej informacji", paragraphs: ["Zasady powstawania treści opisują polityka redakcyjna i metodologia. Pytania o własność serwisu możesz zadać przez stronę kontaktową."] }
    ],
    sources: [{ label: "O serwisie: operator i relacja z kliniką", href: "/o-nas" }, { label: "Polityka redakcyjna: konflikt interesów", href: "/polityka-redakcyjna" }, { label: "Eksperci: powiązania recenzentów z kliniką", href: "/eksperci" }, { label: "Nasi lekarze: zespół kliniki", href: "/nasi-lekarze" }, { label: "Akdeniz Dental: oficjalna strona kliniki", href: "https://akdenizdental.com" }]
  },
  korekty: {
    slug: "korekty", published: "2026-10-02", lastUpdated: "2026-10-02", title: "Korekty i zgłaszanie błędów",
    description: "Jak zgłosić błąd lub nieaktualną informację w serwisie Zęby w Turcji, jak sprawdzamy zgłoszenia i jakie zmiany wprowadziliśmy w treściach.",
    eyebrow: "Transparentność", h1: "Korekty i zgłaszanie błędów",
    lead: "Błąd merytoryczny, nieaktualną cenę lub zastrzeżenie do treści możesz zgłosić przez stronę kontaktową. Poniżej opisujemy, co dzieje się ze zgłoszeniem, oraz lista zmian wprowadzonych w treściach.",
    answer: "Zgłoś błąd przez stronę kontaktową, podając adres strony i fragment. Sprawdzamy źródło i zakres poprawki, a data aktualizacji zmienia się po istotnej korekcie. Zmiana treści klinicznej unieważnia oznaczenie recenzji do ponownego potwierdzenia.",
    sections: [
      { title: "Jak zgłosić błąd", bullets: ["wejdź na stronę kontaktową i opisz zgłoszenie", "podaj adres strony i fragment, którego dotyczy uwaga", "wskaż źródło, jeśli je masz", "nie przesyłaj dokumentacji medycznej przez formularz"] },
      { title: "Jak sprawdzamy zgłoszenie", paragraphs: ["Redakcja sprawdza zgłoszenie ze źródłem i zakres poprawki. Datę aktualizacji strony zmieniamy dopiero po wprowadzeniu istotnej korekty. Treści kliniczne wymagają ponownej oceny recenzenta, zanim zostaną oznaczone jako zweryfikowane."] },
      { title: "Co dzieje się z oznaczeniem recenzji", paragraphs: ["Po zmianie strony po dacie recenzji oznaczenie „zweryfikowano” znika automatycznie, a panel informacji o treści pokazuje, że poprzednia recenzja nie obejmuje zmian. Oznaczenie wraca po nowej recenzji z potwierdzoną datą."] },
      { title: "Dziennik korekt", bullets: ["2 października 2026: strony „All-on-4” i „Cała szczęka” uzupełniono o sekcję o piśmiennictwie i źródło; recenzenci potwierdzili zaktualizowany tekst tego samego dnia", "2 października 2026: opublikowaliśmy dane operatora serwisu i wyjaśniliśmy, że operator prowadzi także klinikę Akdeniz Dental", "2 października 2026: zastąpiliśmy określenie „klinika partnerska” sformułowaniem „klinika prowadzona przez operatora serwisu”, aby odzwierciedlić to powiązanie"] }
    ],
    sources: [{ label: "Kontakt", href: "/kontakt" }, { label: "Polityka redakcyjna: zgłaszanie i dokumentowanie korekt", href: "/polityka-redakcyjna" }, { label: "Weryfikacja medyczna: co się dzieje po zmianie treści", href: "/weryfikacja-medyczna" }, { label: "Metodologia serwisu", href: "/metodologia" }]
  },
  "weryfikacja-medyczna": {
    slug: "weryfikacja-medyczna", title: "Weryfikacja medyczna treści", description: "Zasady weryfikacji medycznej treści stomatologicznych w serwisie Zęby w Turcji: rola recenzenta, zakres recenzji i status poszczególnych stron.",
    lastUpdated: "2026-10-02",
    sources: [{ label: "Polityka redakcyjna: autorstwo, źródła i korekty", href: "/polityka-redakcyjna" }, { label: "Eksperci: profile recenzentów i lista zrecenzowanych stron", href: "/eksperci" }, { label: "Nasi lekarze: zespół kliniki prowadzonej przez operatora serwisu", href: "/nasi-lekarze" }, { label: "O serwisie: cel komercyjny i relacja z kliniką", href: "/o-nas" }],
    eyebrow: "Bezpieczeństwo informacji", h1: "Weryfikacja medyczna",
    lead: "Treści medyczne powinny zostać ocenione przez osobę o potwierdzonych kwalifikacjach przed oznaczeniem ich jako zweryfikowane.",
    answer: "Autor redakcyjny przygotowuje tekst; recenzent medyczny sprawdza informacje stomatologiczne. Status jest przypisywany osobno każdej stronie wraz z datą rzeczywistej recenzji. Bez potwierdzonej daty nie publikujemy imiennego oznaczenia „zweryfikowano”.",
    sections: [
      { title: "Autor i recenzent", paragraphs: ["Redakcja serwisu pozostaje autorem treści. Recenzent medyczny sprawdza odpowiedniość merytoryczną informacji stomatologicznych na konkretnej stronie; nie staje się jej autorem przez samą recenzję. Przy każdej stronie podajemy jej własny status. Nazwisko recenzenta i datę pokazujemy dopiero po potwierdzeniu tych informacji."] },
      { title: "Planowany proces", bullets: ["potwierdzenie tożsamości i kwalifikacji recenzenta", "ocena definicji, ryzyk, alternatyw i ograniczeń", "weryfikacja źródeł oraz zgodności treści z widoczną ofertą", "udokumentowanie daty recenzji i zakresu zmian"] },
      { title: "Zakres i aktualizacja recenzji", paragraphs: ["Recenzent z potwierdzonymi kwalifikacjami ocenia definicje, wskazania, ograniczenia, ryzyko i zgodność przywołanych źródeł. Ocena artykułu nie stanowi diagnozy pacjenta, indywidualnej porady, zalecenia leczenia dla każdego czytelnika, gwarancji wyniku ani poparcia wszystkich komercyjnych informacji w serwisie. Po istotnej zmianie informacji medycznej status recenzji musi zostać zweryfikowany ponownie; błędy można zgłaszać przez stronę kontaktową."] },
      { title: "Jak czytać oznaczenia na stronach", cards: [
        { title: "Treść zweryfikowana medycznie", text: "Podane są nazwisko recenzenta i data faktycznej recenzji tej konkretnej strony." },
        { title: "Recenzja oczekuje na potwierdzenie daty", text: "Recenzent jest przypisany, ale data recenzji nie została jeszcze potwierdzona." },
        { title: "Recenzja jeszcze nieprzeprowadzona", text: "Strona ma tylko autora redakcyjnego. Nie traktuj jej jako zweryfikowanej." }
      ]},
      { title: "Co się dzieje po zmianie treści", paragraphs: ["Jeżeli strona zostanie zmieniona po dacie recenzji, oznaczenie „zweryfikowano” znika automatycznie, a panel informacji o treści pokazuje, że poprzednia recenzja nie obejmuje zmian i oczekuje na ponowne potwierdzenie. Oznaczenie wraca dopiero po nowej recenzji z potwierdzoną datą."] },
      { title: "Aktualny status stron", paragraphs: ["Pełną, aktualną listę stron, ich recenzentów i statusów pokazuje strona Eksperci. Recenzent jest przypisany do konkretnych stron, a nie do całego serwisu."] },
      { title: "Powiązanie recenzentów z kliniką", paragraphs: ["Recenzenci medyczni są związani z kliniką Akdeniz Dental prowadzoną przez operatora serwisu. Recenzja nie oznacza niezależnej oceny kliniki ani oferty. Aktualną listę zrecenzowanych stron znajdziesz w profilach recenzentów w sekcji Eksperci."] },
      { title: "Czego serwis nie robi", paragraphs: ["Serwis nie diagnozuje, nie kwalifikuje do zabiegu i nie udziela indywidualnej porady medycznej. Ostateczną decyzję podejmuje pacjent wspólnie z uprawnionym lekarzem po badaniu."] }
    ]
  },
  "polityka-prywatnosci": {
    slug: "polityka-prywatnosci", title: "Polityka prywatności", description: "Informacje o przetwarzaniu danych w serwisie Zęby w Turcji.",
    eyebrow: "Dokument prawny", h1: "Polityka prywatności",
    lead: "Formularz służy do przesłania zapytania o konsultację i danych umożliwiających odpowiedź.",
    answer: "Zgłoszenia są przekazywane przez Formspree. Formularz obejmuje imię i nazwisko, telefon, numer WhatsApp, adres e-mail, kraj i opcjonalną wiadomość oraz informacje o stronie i kampanii, z której pochodzi zapytanie. Nie przesyłaj zdjęć ani dokumentacji medycznej.",
    sections: [
      { title: "Aktualny zakres", bullets: ["przesyłanie zapytań kontaktowych przez Formspree", "brak przesyłania zdjęć i dokumentacji medycznej", "brak potwierdzonego narzędzia analitycznego", "brak sprzedaży danych użytkowników"] },
      { title: "Dokumentacja do uzupełnienia", paragraphs: ["Pełne dane administratora, odbiorcy danych, podstawy przetwarzania, okresy przechowywania, transfery, prawa użytkownika i kontakt w sprawach prywatności wymagają uzupełnienia przez operatora serwisu."] }
    ], noindex: true
  },
  cookies: {
    slug: "cookies", title: "Polityka cookies", description: "Informacje o plikach cookies używanych przez serwis Zęby w Turcji.",
    eyebrow: "Dokument prawny", h1: "Polityka cookies", lead: "Serwis nie wdraża obecnie marketingowych ani analitycznych plików cookies.",
    answer: "Jeżeli w przyszłości zostanie uruchomiona analityka lub marketing, mechanizm zgody i dokumentacja zostaną zaktualizowane przed rozpoczęciem takiego przetwarzania.",
    sections: [{ title: "Zmiany", paragraphs: ["Lista narzędzi, cele, dostawcy i okresy działania cookies zostaną opublikowane w tej sekcji po ich wdrożeniu."] }], noindex: true
  },
  regulamin: {
    slug: "regulamin", title: "Regulamin serwisu", description: "Zasady korzystania z informacyjnego serwisu Zęby w Turcji.",
    eyebrow: "Dokument prawny", h1: "Regulamin serwisu", lead: "Treści mają charakter informacyjny i nie stanowią diagnozy, oferty leczenia ani umowy o świadczenie usług medycznych.",
    answer: "Dane operatora i pełne warunki korzystania wymagają zatwierdzenia prawnego przed uruchomieniem aktywnego pozyskiwania zgłoszeń.",
    sections: [{ title: "Podstawowe zasady", bullets: ["decyzję medyczną podejmuje lekarz po badaniu", "informacje cenowe wymagają indywidualnego potwierdzenia", "użytkownik nie powinien przesyłać dokumentacji przez niepotwierdzone kanały", "materiały serwisu nie mogą służyć do samodzielnej diagnozy"] }], noindex: true
  },
  reklamacje: {
    slug: "reklamacje", title: "Reklamacje i zgłoszenia", description: "Informacje o przyszłej procedurze zgłoszeń dotyczących serwisu i procesu koordynacji.",
    eyebrow: "Wsparcie", h1: "Reklamacje i zgłoszenia", lead: "Procedura musi rozróżniać zgłoszenia dotyczące działania serwisu, koordynacji oraz świadczeń medycznych wykonywanych przez klinikę.",
    answer: "Kanał reklamacyjny i dane właściwych podmiotów nie zostały jeszcze potwierdzone. Zostaną opublikowane przed uruchomieniem usług kontaktowych.",
    sections: [{ title: "Wymagane elementy procedury", bullets: ["dane podmiotu przyjmującego zgłoszenie", "zakres jego odpowiedzialności", "termin odpowiedzi", "sposób przekazania dokumentów", "gdzie zgłaszać sprawy związane z leczeniem i organizacją"] }], noindex: true
  }
};

export const primaryNav = [
  { label: "Poradniki", href: "/poradniki" },
  { label: "Koszt", href: "/koszt" }, { label: "Implanty", href: "/implanty" }, { label: "Licówki", href: "/licowki" }, { label: "Korony", href: "/korony-cyrkonowe" },
  { label: "Cała szczęka", href: "/cala-szczeka" }, { label: "Opinie", href: "/opinie" }, { label: "Przed i po", href: "/przed-i-po" }, { label: "Antalya", href: "/antalya" }
];
