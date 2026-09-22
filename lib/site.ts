export const SITE_NAME = "Zęby w Turcji";
const FALLBACK_SITE_URL = "https://zebywturcjikoszt.pl";
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
  sections: ContentSection[];
  faq?: { question: string; answer: string }[];
  sources?: { label: string; href: string }[];
  ctaLabel?: string;
  ctaEvent?: string;
  ctaHref?: string;
  schemaType?: "MedicalWebPage" | "WebPage";
  medicalReview?: { name: string; credentials: string; reviewedDate: string; profileUrl: string; verificationUrl: string };
  noindex?: boolean;
  form?: boolean;
};

export const pages: Record<string, PageContent> = {
  koszt: {
    slug: "koszt",
    title: "Ile kosztują zęby w Turcji? Ceny i zakres leczenia",
    description: "Jak czytać wycenę leczenia zębów w Turcji, co wpływa na koszt i jakie elementy powinien zawierać indywidualny plan leczenia.",
    eyebrow: "Koszt leczenia",
    h1: "Ile kosztują zęby w Turcji?",
    lead: "Cena zależy od diagnozy, liczby leczonych zębów, rodzaju odbudowy, materiałów i etapów terapii. Rzetelna wycena powinna opierać się na dokumentacji i jasno określać zakres.",
    answer: "Nie publikujemy orientacyjnych kwot jako obietnicy ceny. Cennik dla pacjentów z Polski oraz warunki pakietów wymagają jeszcze pisemnego potwierdzenia. Do tego czasu najuczciwszą odpowiedzią jest indywidualna wycena po ocenie przypadku.",
    schemaType: "MedicalWebPage",
    sections: [
      { title: "Co powinno znaleźć się w wycenie", cards: [
        { title: "Zakres kliniczny", text: "Rozpoznanie, proponowane leczenie, liczba zębów lub implantów oraz możliwe alternatywy." },
        { title: "Materiały i systemy", text: "Rodzaj odbudowy, marka systemu implantologicznego i elementy protetyczne, jeśli dotyczą planu." },
        { title: "Etapy i wizyty", text: "Co wydarzy się podczas każdej wizyty i które elementy są czasowe, a które ostateczne." },
        { title: "Koszty poza leczeniem", text: "Lot, pobyt, transfery, badania i opieka po powrocie powinny być opisane osobno." }
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
      { title: "Jak będą publikowane dane cenowe", paragraphs: ["Kwota może zostać opublikowana dopiero po potwierdzeniu źródła, waluty, dokładnego zakresu, elementów wliczonych i niewliczonych, warunków zastosowania oraz daty ostatniej weryfikacji. Do czasu otrzymania takich danych serwis nie przelicza cen na PLN i nie tworzy orientacyjnego cennika."] },
      { title: "Koszt według rodzaju leczenia", table: { headers: ["Potrzeba", "Właściwa strona", "Co ustala cenę"], rows: [
        ["Brak pojedynczego zęba lub kilku zębów", "Implanty", "diagnostyka, liczba implantów, odbudowa protetyczna"],
        ["Zmiana kształtu lub koloru uśmiechu", "Licówki", "materiał, liczba zębów, stan szkliwa i zgryzu"],
        ["Rozległe braki lub zniszczenie uzębienia", "Cała szczęka", "wariant leczenia, liczba etapów, odbudowa tymczasowa i docelowa"],
        ["Bezzębie i kwalifikacja do stałej odbudowy", "All-on-4", "diagnostyka, warunki anatomiczne, system implantów i rodzaj pracy"]
      ]}},
      { title: "Turcja czy Polska: porównuj cały proces", paragraphs: ["Porównanie powinno obejmować nie tylko zabieg, ale również podróż, liczbę wizyt, możliwe korekty, opiekę po leczeniu i sposób postępowania w razie komplikacji. Niższa cena nie przesądza o tym, że dana opcja jest odpowiednia klinicznie."] }
    ],
    faq: [
      { question: "Czy na stronie jest aktualny cennik?", answer: "Nie. Cennik dla rynku polskiego nie został jeszcze zweryfikowany, dlatego nie publikujemy kwot, które mogłyby wprowadzać w błąd." },
      { question: "Czy można wycenić leczenie tylko na podstawie wiadomości?", answer: "Wstępna ocena może pomóc określić możliwy zakres, ale ostateczny plan wymaga dokumentacji i oceny klinicznej przez uprawnionego lekarza dentystę." },
      { question: "Czy cena obejmuje hotel i transfer?", answer: "Nie można tego zakładać. Każda oferta powinna jednoznacznie wskazywać, które elementy są wliczone, a które pacjent organizuje i opłaca oddzielnie." }
    ],
    ctaLabel: "Poproś o indywidualną wycenę", ctaEvent: "cost_page_cta"
  },
  implanty: {
    slug: "implanty",
    title: "Implanty zębów w Turcji – proces, koszt i kwalifikacja",
    description: "Implanty zębów w Turcji: na czym polega leczenie, od czego zależy koszt, jakie pytania zadać klinice i jak wygląda kwalifikacja.",
    eyebrow: "Leczenie implantologiczne", h1: "Implanty zębów w Turcji",
    lead: "Implant zastępuje korzeń brakującego zęba i stanowi podporę dla odbudowy protetycznej. Sam wyjazd nie przesądza o kwalifikacji ani liczbie potrzebnych etapów.",
    answer: "Plan implantologiczny powinien wynikać z badania, obrazowania i oceny ogólnego stanu zdrowia. Cena ma sens dopiero wtedy, gdy wiadomo, jaki system, odbudowa i zakres procedur obejmuje.",
    schemaType: "MedicalWebPage",
    sections: [
      { title: "Typowy porządek planowania", cards: [
        { title: "1. Dokumentacja", text: "Wywiad, zdjęcia i badania obrazowe pomagają przygotować wstępną ocenę." },
        { title: "2. Kwalifikacja", text: "Lekarz ocenia warunki miejscowe, ryzyka oraz możliwe alternatywy." },
        { title: "3. Etap chirurgiczny", text: "Zakres ustala lekarz po potwierdzeniu planu i świadomej zgodzie pacjenta." },
        { title: "4. Odbudowa", text: "Korona, most lub większa praca protetyczna są planowane jako odrębna część leczenia." }
      ]},
      { title: "Co sprawdzić przed wyborem oferty", bullets: ["imię, nazwisko i uprawnienia lekarza prowadzącego", "markę oraz pełną specyfikację systemu implantologicznego", "rodzaj pracy tymczasowej i ostatecznej", "plan kontroli, higieny i opieki po powrocie", "pisemne zasady dotyczące korekt i reklamacji"] },
      { title: "Implant nie jest jedyną możliwością", paragraphs: ["W zależności od sytuacji klinicznej alternatywą może być most, proteza lub inne postępowanie. Strona nie kwalifikuje do leczenia i nie zastępuje konsultacji z lekarzem dentystą."] }
    ],
    faq: [
      { question: "Ile kosztuje implant zęba w Turcji?", answer: "Zweryfikowana cena dla polskiej oferty nie została jeszcze przekazana. Na koszt wpływa cały plan, nie tylko śruba implantologiczna." },
      { question: "Czy implanty wymagają dwóch wyjazdów?", answer: "Nie da się tego potwierdzić bez planu leczenia. Liczba etapów i wizyt zależy od sytuacji klinicznej oraz rodzaju odbudowy." },
      { question: "Czy każdy może mieć implant?", answer: "Nie. Kwalifikację przeprowadza lekarz po ocenie stanu jamy ustnej, warunków anatomicznych, zdrowia ogólnego i czynników ryzyka." }
    ],
    sources: [{ label: "American Dental Association: informacje dla pacjentów o implantach", href: "https://www.mouthhealthy.org/all-topics-a-z/implants" }],
    ctaLabel: "Skonsultuj możliwość leczenia implantologicznego", ctaEvent: "implant_cta"
  },
  licowki: {
    slug: "licowki",
    title: "Licówki w Turcji – cena, planowanie i świadomy wybór",
    description: "Licówki w Turcji: czym są, kiedy bywają rozważane, jak ocenić plan estetyczny i od czego zależy indywidualna cena.",
    eyebrow: "Stomatologia estetyczna", h1: "Licówki w Turcji",
    lead: "Licówki mogą zmieniać wygląd przedniej powierzchni zębów. Decyzja powinna uwzględniać stan szkliwa, zgryz, zdrowie dziąseł i rozwiązania mniej inwazyjne.",
    answer: "Licówki nie są uniwersalnym sposobem na każdy problem estetyczny. Przed leczeniem potrzebna jest diagnoza, omówienie zakresu preparacji zębów, materiału oraz oczekiwanego efektu.",
    schemaType: "MedicalWebPage",
    sections: [
      { title: "Pytania, które warto zadać", bullets: ["dlaczego w tym przypadku proponowane są licówki", "czy są dostępne mniej inwazyjne alternatywy", "które zęby wymagają leczenia, a które jedynie zmiany estetycznej", "jaki materiał zostanie użyty i jak wygląda plan koloru oraz kształtu", "jak będzie chroniony zgryz i jak planowane są kontrole"] },
      { title: "Cena licówek w Turcji", paragraphs: ["Nie publikujemy ceny do czasu potwierdzenia aktualnej oferty dla pacjentów z Polski. Rzetelna wycena powinna określać liczbę licówek, materiał, przygotowanie zębów, prace tymczasowe oraz ewentualne leczenie poprzedzające."] },
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
    slug: "cala-szczeka", title: "Zęby w Turcji – cała szczęka i pełna odbudowa uzębienia",
    description: "Co może oznaczać leczenie całej szczęki w Turcji: implanty, korony, All-on-4, All-on-6 i indywidualna rekonstrukcja.",
    eyebrow: "Pełna rekonstrukcja", h1: "Zęby w Turcji na całą szczękę",
    lead: "„Cała szczęka” to opis potrzeby pacjenta, a nie nazwa jednego zabiegu. W zależności od stanu zębów i kości plan może dotyczyć zachowania własnych zębów, implantów albo odbudowy protetycznej.",
    answer: "Nie można wybrać All-on-4, All-on-6, koron ani pojedynczych implantów wyłącznie na podstawie ceny. Najpierw trzeba ustalić, które zęby można zachować i jaki cel funkcjonalny ma leczenie.",
    schemaType: "MedicalWebPage",
    sections: [
      { title: "Możliwe kierunki leczenia", table: { headers: ["Sytuacja", "Możliwy kierunek", "Co wymaga oceny"], rows: [
        ["Własne zęby możliwe do zachowania", "leczenie i odbudowy na zębach", "stan tkanek, zgryz, rokowanie każdego zęba"],
        ["Pojedyncze lub odcinkowe braki", "implanty, mosty lub rozwiązania ruchome", "warunki kostne i rozmieszczenie braków"],
        ["Bezzębie lub zęby bez rokowania", "pełnołukowa odbudowa implantoprotetyczna", "kwalifikacja, liczba implantów, rodzaj pracy"],
        ["Cel głównie estetyczny", "leczenie zachowawcze, ortodoncja, licówki lub korony", "zdrowie zębów i stopień ingerencji"]
      ]}},
      { title: "All-on-4 i All-on-6 nie są synonimami", paragraphs: ["Nazwy odnoszą się do różnych koncepcji podparcia pełnołukowej odbudowy implantoprotetycznej. Liczba implantów nie powinna być wybierana jako pakiet marketingowy. Decyzja należy do lekarza po diagnostyce i ocenie obciążeń."] },
      { title: "Przewodnik decyzyjny: od potrzeby do właściwej konsultacji", paragraphs: ["Poniższa tabela nie kwalifikuje do zabiegu. Pomaga ustalić, jakie pytanie powinno zostać wyjaśnione przez lekarza przed porównywaniem metod i cen."], table: { headers: ["Sytuacja wyjściowa", "Pierwsze pytanie kliniczne", "Właściwy następny krok"], rows: [
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
    ctaLabel: "Skonsultuj pełną odbudowę uzębienia", ctaEvent: "full_mouth_cta"
  },
  "all-on-4": {
    slug: "all-on-4", title: "All-on-4 w Turcji – kwalifikacja, etapy i koszt",
    description: "All-on-4 w Turcji: czym jest pełnołukowa odbudowa na czterech implantach, jak wygląda kwalifikacja i co powinien zawierać plan.",
    eyebrow: "Pełnołukowa odbudowa", h1: "All-on-4 w Turcji",
    lead: "All-on-4 to koncepcja pełnołukowej odbudowy protetycznej opartej na czterech implantach. Nie jest automatycznym rozwiązaniem dla każdej osoby z brakami zębowymi.",
    answer: "Najważniejsza jest kwalifikacja do leczenia, a nie sama nazwa pakietu. Plan powinien określać diagnostykę, system implantologiczny, rodzaj pracy tymczasowej i ostatecznej oraz opiekę po leczeniu.",
    schemaType: "MedicalWebPage",
    sections: [
      { title: "Co wymaga indywidualnej oceny", bullets: ["stan kości i tkanek miękkich", "stan pozostałych zębów i powód ich ewentualnego usunięcia", "zgryz, obciążenia i nawyki", "choroby ogólne, leki i czynniki ryzyka", "możliwość utrzymania higieny odbudowy"] },
      { title: "Nie porównuj wyłącznie ceny pakietu", paragraphs: ["Dwie oferty All-on-4 mogą obejmować inne systemy implantów, materiały, diagnostykę, odbudowy tymczasowe i docelowe. Poproś o rozpisanie wszystkich elementów oraz procedury na wypadek zmiany planu po badaniu klinicznym."] },
      { title: "Alternatywy", paragraphs: ["W zależności od przypadku lekarz może omówić inne rozwiązania implantoprotetyczne lub ruchome. All-on-4 nie powinno być przedstawiane jako jedyna możliwość przed diagnostyką."] }
    ],
    faq: [
      { question: "Czy All-on-4 oznacza zęby w jeden dzień?", answer: "Nie należy utożsamiać nazwy metody z gwarancją konkretnego harmonogramu. Możliwość zastosowania odbudowy tymczasowej i czas leczenia zależą od kwalifikacji." },
      { question: "Ile kosztuje All-on-4 w Turcji?", answer: "Aktualna cena dla polskiej oferty nie została zweryfikowana. Porównując wyceny, trzeba sprawdzić pełny zakres, materiały i liczbę etapów." },
      { question: "Czy All-on-4 i cała szczęka to to samo?", answer: "Nie. „Cała szczęka” opisuje problem lub zakres leczenia, a All-on-4 jest jedną z możliwych koncepcji pełnołukowej odbudowy." }
    ],
    ctaLabel: "Zapytaj o kwalifikację do All-on-4", ctaEvent: "all_on_4_cta"
  },
  opinie: {
    slug: "opinie", title: "Zęby w Turcji – opinie pacjentów i jak je weryfikować",
    description: "Jak czytać opinie o leczeniu zębów w Turcji, odróżniać doświadczenie pacjenta od reklamy i sprawdzić klinikę przed decyzją.",
    eyebrow: "Opinie i doświadczenia", h1: "Zęby w Turcji: jak oceniać opinie",
    lead: "Opinie pomagają poznać organizację wyjazdu i komunikację, ale nie potwierdzają kwalifikacji medycznej ani jakości leczenia w Twoim przypadku.",
    answer: "Nie publikujemy fikcyjnych recenzji ani forum. Na tej stronie pokazujemy, jak weryfikować doświadczenia pacjentów i które informacje sprawdzić niezależnie przed wyborem kliniki.",
    sections: [
      { title: "Sygnały wiarygodnej opinii", bullets: ["opisuje konkretny zakres leczenia i etapy, a nie tylko ogólne wrażenie", "rozróżnia opiekę organizacyjną od oceny medycznej", "nie obiecuje identycznego rezultatu każdej osobie", "pokazuje datę i kontekst doświadczenia", "może zostać powiązana z rzeczywistym źródłem bez naruszania prywatności"] },
      { title: "Czerwone flagi", cards: [
        { title: "Same superlatywy", text: "Brak szczegółów, powtarzalne sformułowania i identyczny styl wielu recenzji." },
        { title: "Obietnice medyczne", text: "Zapewnienie o zerowym ryzyku, bezbolesności lub dożywotnim efekcie." },
        { title: "Brak źródła", text: "Zrzuty ekranu bez daty, profilu i możliwości sprawdzenia kontekstu." },
        { title: "Presja sprzedażowa", text: "Opinia połączona z ograniczoną czasowo ofertą lub nakłanianiem do szybkiej wpłaty." }
      ]},
      { title: "Co sprawdzić poza opiniami", paragraphs: ["Poproś o dane operatora, nazwę kliniki, lekarza prowadzącego, pisemny plan leczenia, zasady opieki po powrocie i procedurę reklamacyjną. Zobacz również poradnik wyboru kliniki oraz zasady oceny zdjęć przed i po."] }
    ],
    faq: [
      { question: "Czy ta strona jest forum pacjentów?", answer: "Nie. Serwis nie prowadzi niezależnego forum ani społeczności pacjentów." },
      { question: "Czy publikujecie prawdziwe opinie?", answer: "Nie publikujemy opinii, dopóki nie będzie można zweryfikować ich autentyczności, zgody na publikację i relacji komercyjnej." },
      { question: "Gdzie szukać niezależnych sygnałów?", answer: "Warto porównać wiele źródeł, sprawdzić profil opiniującego, daty, odpowiedzi kliniki oraz informacje o lekarzach i podmiocie leczniczym." }
    ],
    ctaLabel: "Przejdź do listy kontroli kliniki", ctaEvent: "clinic_check_cta", ctaHref: "/jak-wybrac-klinike"
  },
  "przed-i-po": {
    slug: "przed-i-po", title: "Zęby w Turcji przed i po – jak oceniać efekty leczenia",
    description: "Jak odpowiedzialnie oceniać zdjęcia zębów przed i po leczeniu w Turcji oraz o co zapytać przed podjęciem decyzji.",
    eyebrow: "Efekty leczenia", h1: "Zęby w Turcji przed i po",
    lead: "Zdjęcia mogą pokazać zmianę estetyczną, ale nie pokazują pełnej diagnozy, funkcji zgryzu, trwałości ani przebiegu leczenia.",
    answer: "Galeria pokazuje przykładowe zmiany wyglądu uśmiechu. Ponieważ same obrazy nie potwierdzają metody, diagnozy ani czasu leczenia, przypadki bez zweryfikowanych metadanych opisujemy neutralnie i nie przypisujemy im konkretnej procedury.",
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
      { question: "Dlaczego przypadki mają neutralne opisy?", answer: "Dostępne obrazy nie zawierają wystarczających metadanych, aby rzetelnie podać diagnozę, metodę, liczbę odbudów lub czas leczenia. Nie uzupełniamy tych informacji domysłami." },
      { question: "Czy zdjęcie wystarczy do wyboru kliniki?", answer: "Nie. Powinno być tylko jednym z elementów oceny obok kwalifikacji lekarzy, planu leczenia, dokumentacji i opieki po zabiegu." }
    ],
    ctaLabel: "Poproś o wstępną ocenę", ctaEvent: "before_after_hero_cta", ctaHref: "/kontakt?lead_source=OGZ-PL&cta_location=before_after_hero&page_path=%2Fprzed-i-po"
  },
  antalya: {
    slug: "antalya", title: "Leczenie zębów w Antalyi – plan wyjazdu i wizyt",
    description: "Jak zaplanować leczenie zębów w Antalyi: dokumentacja, harmonogram wizyt, podróż, pobyt i opieka po powrocie.",
    eyebrow: "Kierunek: Antalya", h1: "Leczenie zębów w Antalyi",
    lead: "Antalya łączy zaplecze turystyczne z ofertą leczenia dla pacjentów zagranicznych. Wyjazd medyczny powinien być jednak planowany wokół leczenia, nie programu wakacyjnego.",
    answer: "Przed rezerwacją lotu potrzebujesz wstępnego planu, przewidywanej liczby wizyt, informacji o możliwych zmianach po badaniu na miejscu oraz jasnych zasad kontaktu po powrocie do Polski.",
    sections: [
      { title: "Przed wyjazdem", bullets: ["przekaż dokumentację bezpiecznym kanałem wskazanym przez organizatora", "uzyskaj pisemny zakres wstępnego planu i kosztów", "nie rezerwuj zbyt krótkiego pobytu bez potwierdzenia harmonogramu", "sprawdź ważność dokumentów podróży i aktualne zalecenia konsularne", "zaplanuj margines na kontrolę przed wylotem"] },
      { title: "Na miejscu", cards: [
        { title: "Badanie i potwierdzenie planu", text: "Wstępna propozycja może zmienić się po badaniu klinicznym i diagnostyce." },
        { title: "Świadoma zgoda", text: "Przed leczeniem powinny zostać omówione alternatywy, ograniczenia i ryzyka." },
        { title: "Dokumentacja", text: "Poproś o kopię planu, wykonanych procedur, użytych materiałów i zaleceń." },
        { title: "Kontrola przed powrotem", text: "Ustal, co wymaga sprawdzenia przed lotem i jak zgłaszać problem po powrocie." }
      ]},
      { title: "Po powrocie do Polski", paragraphs: ["Zachowaj dokumentację i dane kontaktowe. Dowiedz się wcześniej, kto odpowiada za kontrolę, korektę lub nagły problem oraz które czynności mogą być wykonane lokalnie."] }
    ],
    faq: [
      { question: "Ile dni trzeba zostać w Antalyi?", answer: "Nie podajemy jednej liczby bez zweryfikowanego planu. Długość pobytu zależy od rodzaju leczenia, etapów i wymaganych kontroli." },
      { question: "Czy hotel i transfer są w cenie?", answer: "Nie zostało to potwierdzone dla aktualnej oferty. Zakres świadczeń dodatkowych powinien znaleźć się w pisemnej wycenie." },
      { question: "Czy leczenie można połączyć z wakacjami?", answer: "Plan aktywności powinien uwzględniać zalecenia lekarza i przebieg leczenia. Priorytetem jest bezpieczna organizacja terapii i kontroli." }
    ],
    sources: [{ label: "Ministerstwo Spraw Zagranicznych RP: informacje dla podróżujących do Turcji", href: "https://www.gov.pl/web/turcja/informacje-dla-podrozujacych" }],
    ctaLabel: "Przygotuj wstępny plan wyjazdu", ctaEvent: "antalya_cta"
  },
  "jak-wybrac-klinike": {
    slug: "jak-wybrac-klinike", title: "Jak wybrać klinikę stomatologiczną w Turcji",
    description: "Praktyczna lista kontroli kliniki stomatologicznej w Turcji: lekarze, plan leczenia, materiały, opieka po zabiegu i reklamacje.",
    eyebrow: "Bezpieczna decyzja", h1: "Jak wybrać klinikę stomatologiczną w Turcji",
    lead: "Dobra decyzja opiera się na możliwych do sprawdzenia informacjach: kto leczy, gdzie odbywa się leczenie, jaki jest plan i co dzieje się po powrocie.",
    answer: "Nie wybieraj kliniki wyłącznie na podstawie ceny, zdjęć w mediach społecznościowych albo obietnicy szybkiego efektu. Najpierw zweryfikuj podmiot, lekarza, zakres odpowiedzialności i dokumentację.",
    sections: [
      { title: "Lista kontroli przed wpłatą", bullets: ["pełna nazwa i adres podmiotu wykonującego leczenie", "imię, nazwisko, specjalizacja i możliwość weryfikacji lekarza", "pisemny plan z alternatywami i kosztami dodatkowymi", "nazwa materiałów i systemów, które zostaną użyte", "zasady przechowywania i przekazania dokumentacji", "opieka po leczeniu, reklamacje i sytuacje nagłe", "jasne warunki zaliczki, odwołania i zwrotu"] },
      { title: "Kto odpowiada za co", paragraphs: ["Jeżeli w procesie uczestniczy pośrednik, koordynator lub strona informacyjna, poproś o jasne rozdzielenie odpowiedzialności organizacyjnej i klinicznej. Decyzje medyczne powinien podejmować uprawniony lekarz, a umowa wskazywać właściwy podmiot."] },
      { title: "20 pytań przed wpłatą zaliczki", paragraphs: ["Odpowiedzi powinny być możliwe do zachowania w wiadomości, planie leczenia albo warunkach umowy. Brak odpowiedzi nie przesądza o jakości leczenia, ale wymaga wyjaśnienia przed decyzją."], bullets: [
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
      { question: "Czy serwis jest niezależną porównywarką klinik?", answer: "Nie. Serwis ma cel komercyjny, a szczegóły operatora i relacji z konkretnym świadczeniodawcą oczekują na weryfikację przed aktywacją kontaktu." },
      { question: "Czy opinie w Google wystarczą?", answer: "Nie. Są użytecznym sygnałem, ale powinny być zestawione z danymi lekarza, dokumentacją, planem i warunkami opieki." },
      { question: "Kiedy wpłacić zaliczkę?", answer: "Dopiero po poznaniu podmiotu, warunków płatności, zasad zwrotu oraz zakresu wstępnej oferty. Dane te powinny być dostępne na piśmie." }
    ],
    ctaLabel: "Przejdź do formularza oceny przypadku", ctaEvent: "clinic_check_cta"
  },
  "o-nas": {
    slug: "o-nas", title: "O serwisie Zęby w Turcji", description: "Cel, zasady transparentności i zakres odpowiedzialności serwisu Zęby w Turcji.",
    eyebrow: "Transparentność", h1: "O serwisie",
    lead: "Zęby w Turcji to polskojęzyczny serwis informacyjny przygotowany dla osób rozważających leczenie stomatologiczne w Turcji, ze szczególnym uwzględnieniem Antalyi.",
    answer: "Serwis ma cel informacyjny i komercyjny. Nie jest niezależną porównywarką ani podmiotem wykonującym leczenie. Dane operatora oraz relacja z kliniką muszą zostać uzupełnione po ich pisemnym potwierdzeniu.",
    sections: [
      { title: "Nasze zasady", bullets: ["nie publikujemy niezweryfikowanych cen ani obietnic rezultatów", "nie tworzymy fikcyjnych opinii i przypadków przed i po", "oddzielamy treść informacyjną od decyzji medycznej", "wskazujemy brak danych zamiast zastępować go marketingową deklaracją"] },
      { title: "Dane wymagające potwierdzenia", paragraphs: ["Nazwa prawna operatora, adres, dane kontaktowe, klinika wykonująca leczenie oraz szczegółowy charakter relacji komercyjnej zostaną opublikowane przed uruchomieniem formularza kontaktowego."] }
    ]
  },
  kontakt: {
    slug: "kontakt", title: "Kontakt i wstępna ocena leczenia", description: "Wybierz interesujące Cię leczenie i przygotuj bezpieczne zapytanie o indywidualną ocenę oraz wycenę.",
    eyebrow: "Następny krok", h1: "Poproś o wstępną ocenę leczenia",
    lead: "Krótki formularz pozwala określić, jakiego rodzaju informacji potrzebujesz. Nie przesyłaj dokumentacji medycznej, dopóki nie otrzymasz potwierdzonego bezpiecznego kanału.",
    answer: "Formularz pozostaje nieaktywny do czasu potwierdzenia operatora, polityki prywatności i bezpiecznego odbiorcy zgłoszeń. Dzięki temu żadne dane zdrowotne nie trafią do niezweryfikowanego systemu.",
    sections: [{ title: "Przygotuj przed kontaktem", bullets: ["rodzaj leczenia, które rozważasz", "krótki opis problemu bez zbędnych danych zdrowotnych", "preferowany sposób kontaktu", "pytania o koszt, etapy i organizację wyjazdu"] }],
    form: true
  },
  "polityka-redakcyjna": {
    slug: "polityka-redakcyjna", title: "Polityka redakcyjna", description: "Jak powstają, są aktualizowane i oznaczane treści w serwisie Zęby w Turcji.",
    eyebrow: "Standard treści", h1: "Polityka redakcyjna",
    lead: "Treści mają pomagać w podjęciu świadomej decyzji, a nie zastępować diagnozę lub konsultację z lekarzem dentystą.",
    answer: "Oddzielamy informacje kliniczne, logistyczne i komercyjne. Każda istotna aktualizacja powinna mieć datę, źródła i informację o autorze oraz recenzji medycznej, jeżeli faktycznie się odbyła.",
    sections: [
      { title: "Zasady publikacji", bullets: ["każde źródło musi bezpośrednio potwierdzać konkretną informację, przy której zostało podane; sam autorytet domeny nie wystarcza", "w sprawach dotyczących polskich pacjentów w pierwszej kolejności korzystamy z właściwych polskich i unijnych instytucji, wytycznych organizacji stomatologicznych oraz wysokiej jakości literatury dentystycznej", "nie tworzymy nieistniejących ekspertów, cen, opinii ani statystyk", "korygujemy błędy i aktualizujemy treści, gdy zmieniają się dane", "ujawniamy cel komercyjny i relacje z usługodawcami"] },
      { title: "Zgłaszanie i dokumentowanie korekt", paragraphs: ["Jeżeli zauważysz błąd merytoryczny lub nieaktualną informację, skontaktuj się z nami przez stronę kontaktową. Redakcja rejestruje zgłoszenie, sprawdza źródło i zakres poprawki oraz aktualizuje datę strony dopiero po wprowadzeniu istotnej zmiany. Treści kliniczne wymagają ponownej oceny odpowiednio wykwalifikowanej osoby, zanim zostaną oznaczone jako zweryfikowane."] },
      { title: "Autorstwo", paragraphs: ["Obecne treści przypisane są redakcji serwisu. Nie oznaczamy ich jako zweryfikowane medycznie do czasu zakończenia imiennej recenzji przez osobę o potwierdzonych kwalifikacjach."] }
    ]
  },
  "weryfikacja-medyczna": {
    slug: "weryfikacja-medyczna", title: "Weryfikacja medyczna treści", description: "Zasady planowanej weryfikacji medycznej treści stomatologicznych oraz aktualny status recenzji.",
    eyebrow: "Bezpieczeństwo informacji", h1: "Weryfikacja medyczna",
    lead: "Treści medyczne powinny zostać ocenione przez osobę o potwierdzonych kwalifikacjach przed oznaczeniem ich jako zweryfikowane.",
    answer: "Na dzień aktualizacji serwisu nie potwierdzono imiennego recenzenta medycznego. Żadna strona nie jest przedstawiana jako formalnie zweryfikowana medycznie.",
    sections: [
      { title: "Planowany proces", bullets: ["potwierdzenie tożsamości i kwalifikacji recenzenta", "ocena definicji, ryzyk, alternatyw i ograniczeń", "weryfikacja źródeł oraz zgodności treści z widoczną ofertą", "udokumentowanie daty recenzji i zakresu zmian"] },
      { title: "Zakres i aktualizacja recenzji", paragraphs: ["Recenzent z potwierdzonymi kwalifikacjami ocenia definicje, wskazania, ograniczenia, ryzyko i zgodność przywołanych źródeł. Ocena artykułu nie stanowi diagnozy pacjenta ani potwierdzenia jakości konkretnej kliniki. Po istotnej zmianie informacji medycznej status recenzji musi zostać zweryfikowany ponownie; błędy można zgłaszać przez stronę kontaktową."] },
      { title: "Czego serwis nie robi", paragraphs: ["Serwis nie diagnozuje, nie kwalifikuje do zabiegu i nie udziela indywidualnej porady medycznej. Ostateczną decyzję podejmuje pacjent wspólnie z uprawnionym lekarzem po badaniu."] }
    ]
  },
  "polityka-prywatnosci": {
    slug: "polityka-prywatnosci", title: "Polityka prywatności", description: "Informacje o przetwarzaniu danych w serwisie Zęby w Turcji.",
    eyebrow: "Dokument prawny", h1: "Polityka prywatności",
    lead: "Formularz kontaktowy nie jest aktywny do czasu potwierdzenia administratora danych i bezpiecznego odbiorcy zgłoszeń.",
    answer: "Obecna wersja serwisu nie przyjmuje danych przez formularz. Dane administratora, podstawy przetwarzania, okresy przechowywania i prawa użytkownika wymagają uzupełnienia przed uruchomieniem pozyskiwania leadów.",
    sections: [
      { title: "Aktualny zakres", bullets: ["brak aktywnego przesyłania formularza", "brak przesyłania zdjęć i dokumentacji medycznej", "brak potwierdzonego narzędzia analitycznego", "brak sprzedaży danych użytkowników"] },
      { title: "Przed uruchomieniem kontaktu", paragraphs: ["Dokument zostanie uzupełniony o pełne dane administratora, odbiorców danych, transfery, zabezpieczenia, prawa użytkownika i kontakt w sprawach prywatności."] }
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
    sections: [{ title: "Wymagane elementy procedury", bullets: ["dane podmiotu przyjmującego zgłoszenie", "zakres jego odpowiedzialności", "termin odpowiedzi", "sposób przekazania dokumentów", "ścieżka dla spraw klinicznych i organizacyjnych"] }], noindex: true
  }
};

export const primaryNav = [
  { label: "Koszt", href: "/koszt" }, { label: "Implanty", href: "/implanty" }, { label: "Licówki", href: "/licowki" },
  { label: "Cała szczęka", href: "/cala-szczeka" }, { label: "Opinie", href: "/opinie" }, { label: "Przed i po", href: "/przed-i-po" }, { label: "Antalya", href: "/antalya" }
];
