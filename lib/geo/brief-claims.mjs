// Figures and facts taken from the UK geo-SEO brief. NONE of them is verified: they are stored as `verified: false, source: "brief"`
// and the publication gate refuses to show them anywhere until scripts/geo-import-census.mjs matches them with the official table.

/** ONS Census 2021 TS024 "Main language", Polish as main language, England and Wales local authorities, as listed in the brief. */
export const TS024_POLISH_MAIN_LANGUAGE = [
  ["Ealing", 15449], ["Southampton", 10436], ["North Northamptonshire", 9297], ["Hounslow", 9219], ["Hull", 8564], ["Leeds", 8271], ["Leicester", 7940],
  ["Birmingham", 7907], ["Wakefield", 7900], ["West Northamptonshire", 7828], ["Nottingham", 7826], ["Luton", 7823], ["Slough", 7724], ["Coventry", 7719],
  ["Peterborough", 7507], ["Bristol", 7017], ["Somerset", 6614], ["Bournemouth, Christchurch and Poole", 6563], ["Doncaster", 6495], ["Manchester", 6471],
  ["Croydon", 6262], ["Bradford", 5992], ["Haringey", 5921], ["Brent", 5817], ["Merton", 5761], ["Sandwell", 5685], ["Barnet", 5542],
  ["Buckinghamshire", 5434], ["Cheshire East", 5102], ["Hillingdon", 5016]
];
/** The brief's names that differ from the inventory's authority names. */
export const TS024_NAME_TO_AUTHORITY = { Hull: "Kingston upon Hull" };

/** Scotland's Census 2022, Polish ethnic identity, share of the ward group's residents, "to be revalidated" (brief). */
export const ABERDEEN_WARD_GROUP_SHARES = [
  { areas: ["Tillydrone", "Seaton", "Old Aberdeen"], percent: 13.2 },
  { areas: ["Northfield", "Mastrick North"], percent: 8.8 },
  { areas: ["Torry", "Ferryhill"], percent: 6.6 },
  { areas: ["Hilton", "Woodside", "Stockethill"], percent: 6.3 },
  { areas: ["George Street", "Harbour"], percent: 4.8 }
];

/**
 * Clinic facts the brief asks the pages to rely on. `verified` only where the repository already proves the fact
 * (lib/clinic-profiles.ts, lib/clinic-hours.ts); everything else needs the operator's written confirmation.
 */
export const CLINIC_FACTS = [
  { id: "address-antalya", claim: "Klinika Akdeniz Dental działa w Antalyi (Muratpaşa), Turcja.", status: "verified", evidence: "lib/clinic-profiles.ts (CLINIC_ADDRESS_TEXT), Google Maps i Trustpilot" },
  { id: "opening-hours", claim: "Godziny otwarcia kliniki zgodne z lib/clinic-hours.ts.", status: "verified", evidence: "lib/clinic-hours.ts" },
  { id: "service-languages", claim: "Języki obsługi: polski, angielski, rosyjski, niemiecki, rumuński.", status: "verified", evidence: "lib/clinic-hours.ts (languagesSummary)" },
  { id: "no-uk-clinic", claim: "Akdeniz Dental nie prowadzi kliniki w Wielkiej Brytanii.", status: "verified", evidence: "Brief §2 and the site's single-address schema; every UK page must say patients travel to Antalya" },
  { id: "two-branches", claim: "Klinika ma dwa oddziały w Antalyi.", status: "needs-operator-confirmation", evidence: "Brief only" },
  { id: "own-lab", claim: "Klinika ma własne laboratorium protetyczne.", status: "needs-operator-confirmation", evidence: "Brief only" },
  { id: "patient-volume", claim: "220–250 pacjentów miesięcznie.", status: "needs-operator-confirmation", evidence: "Brief only" },
  { id: "polish-coordinator", claim: "Polskojęzyczny koordynator pacjenta.", status: "needs-operator-confirmation", evidence: "Brief only; the site names Polish-language health advisers only in the exit-intent offer" },
  { id: "uk-aftercare", claim: "Plan opieki po leczeniu po powrocie do UK (kto, jak, w jakim czasie).", status: "needs-operator-confirmation", evidence: "Not stated anywhere in the repository" },
  { id: "gbp-payment", claim: "Klinika przyjmuje płatność w GBP.", status: "needs-operator-confirmation", evidence: "lib/uk.ts says the price list is in EUR; GBP is a conversion only" }
];

/** Keyword hypotheses from brief §6. No volume, difficulty or lead figure exists for any of them. */
export const KEYWORD_CLUSTERS = [
  { id: "c1", name: "Leczenie zębów w Turcji", targetPage: "/uk (hub) or existing treatment pages", keywords: ["leczenie zębów w Turcji", "dentysta w Turcji", "klinika stomatologiczna w Turcji", "leczenie stomatologiczne w Antalyi", "dentysta Antalya", "polski dentysta w Turcji", "leczenie zębów w Turcji dla Polaków w UK", "stomatologia Turcja ceny"] },
  { id: "c2", name: "Implanty", targetPage: "/implanty", keywords: ["implanty zębowe Turcja", "implanty zębów Antalya", "implanty zębowe Turcja ceny", "implanty w Turcji opinie", "implanty zębów Turcja dla Polaków", "implanty Turcja czy warto", "implanty w Turcji a leczenie w Wielkiej Brytanii"] },
  { id: "c3", name: "Pełna odbudowa", targetPage: "/cala-szczeka, /all-on-4", keywords: ["odbudowa całego uzębienia Turcja", "pełna odbudowa uzębienia Antalya", "All-on-4 Turcja", "All-on-6 Turcja", "pełna szczęka implanty Turcja", "kompleksowe leczenie zębów w Turcji", "proteza stała na implantach Turcja"] },
  { id: "c4", name: "Estetyka", targetPage: "/licowki, /korony-cyrkonowe", keywords: ["metamorfoza uśmiechu Turcja", "smile makeover Turcja", "licówki porcelanowe Turcja", "licówki Antalya", "korony cyrkonowe Turcja", "Hollywood Smile Turcja", "estetyczna odbudowa zębów Turcja"] },
  { id: "c5", name: "Porównanie cen", targetPage: "/koszt, /uk/ceny-leczenia-zebow-w-turcji-w-funtach", keywords: ["ile kosztują implanty w Turcji", "ceny leczenia zębów w Turcji", "implanty UK vs Turcja", "implanty Turcja ceny w funtach", "licówki Turcja cena GBP", "korony cyrkonowe Turcja cena", "koszt leczenia zębów w Antalyi"] },
  { id: "c6", name: "Polacy z konkretnych miast UK", targetPage: "city pages only after the publication gate", keywords: ["leczenie zębów w Turcji dla Polaków z Londynu", "implanty w Turcji dla Polaków z Ealing", "leczenie zębów w Turcji z Southampton", "implanty Turcja z Peterborough", "dentysta w Turcji dla Polaków z Manchesteru", "leczenie zębów w Antalyi z Aberdeen", "leczenie implantologiczne Turcja z Birmingham", "metamorfoza uśmiechu Antalya z Leeds"] },
  { id: "c7", name: "NHS i porównania", targetPage: "/uk/jak-zaplacic-za-leczenie-zebow-w-turcji", keywords: ["implanty zębowe NHS czy prywatnie", "implanty prywatnie w UK czy w Turcji", "leczenie dentystyczne w UK vs Turcja", "ile kosztują implanty w Anglii", "alternatywy dla prywatnego leczenia dentystycznego w UK", "planowanie wizyt stomatologicznych w Turcji"] },
  { id: "c8", name: "Droga pacjenta i zaufanie", targetPage: "/poradniki, /jak-wybrac-klinike", keywords: ["jak wygląda leczenie zębów w Turcji", "ile wizyt potrzeba do implantów", "gojenie po implantach", "ile dni w Turcji na korony", "jak wybrać klinikę w Turcji", "opieka po leczeniu zębów za granicą", "leczenie zębów w Turcji opinie", "gwarancja na implanty Turcja"] }
];

/** The brief's ten first city targets (brief §22), mapped to inventory city groups. */
export const PILOT_CITIES = [
  { id: "london-ealing-hounslow", label: "Londyn (Ealing, Hounslow)", cityGroups: ["london"], authorities: ["Ealing", "Hounslow"] },
  { id: "southampton", label: "Southampton", cityGroups: ["southampton"] },
  { id: "slough", label: "Slough", cityGroups: ["slough"] },
  { id: "luton", label: "Luton", cityGroups: ["luton"] },
  { id: "peterborough", label: "Peterborough", cityGroups: ["peterborough"] },
  { id: "northamptonshire", label: "Northamptonshire", cityGroups: ["northamptonshire"] },
  { id: "boston-lincolnshire", label: "Boston / Lincolnshire", cityGroups: ["boston-lincolnshire"] },
  { id: "nottingham", label: "Nottingham", cityGroups: ["nottingham"] },
  { id: "hull", label: "Hull", cityGroups: ["hull"] },
  { id: "aberdeen", label: "Aberdeen", cityGroups: ["aberdeen"] }
];
