import { SUPPORT_TEAM_UPDATED } from "./support-team";
import { hoursSummary, languagesSummary } from "./clinic-hours";
import { newGuides } from "./guides";
import { allUkPages } from "./uk";
import { pages, SITE_NAME, SITE_URL, UPDATED_ISO_DATE } from "./site";
import { approvedReviewer, reviewFor } from "./medical-review";
import { verifiedExperts } from "./evidence";
import { OPERATOR, OPERATOR_DISCLOSURE, operatorRows } from "./operator";
import { credentialsPublished } from "./credentials";
import { CLINIC_ADDRESS_TEXT, RATINGS_CHECKED_ISO_DATE, clinicProfiles } from "./clinic-profiles";
import { EUR_GBP_RATE, EUR_GBP_RATE_SOURCE, EUR_GBP_RATE_TIMESTAMP, EUR_PLN_RATE, EUR_PLN_RATE_TIMESTAMP, PRICING_UPDATED_ISO_DATE, gbpPublished, priceItems, toPln } from "./pricing";

/** AI-readable files must carry absolute URLs: a relative source link cannot be resolved outside the site. */
export const absoluteUrl = (href: string) => (href.startsWith("/") ? `${SITE_URL}${href}` : href);

export const FAQ_PATH = "/pytania-i-odpowiedzi";
export const FAQ_PUBLISHED_DATE = "2026-09-30";
/** Last change to the collected answers (17 Oct 2026: the UK financing answer now names the financing partner). Drives the sitemap lastmod. */
export const FAQ_UPDATED_DATE = "2026-10-17";
const guideSlugs = ["koszt", "implanty", "korony-cyrkonowe", "licowki", "cala-szczeka", "all-on-4", "antalya", "jak-wybrac-klinike", "opinie", "przed-i-po"];
export const patientGuides = [...guideSlugs.map((slug) => pages[slug]), ...Object.values(newGuides), ...allUkPages];
export const faqGroups = patientGuides.filter((page) => page.faq?.length);

export function reviewSummary(slug: string) {
  const page = pages[slug] ?? [...Object.values(newGuides), ...allUkPages].find((guide) => guide.slug === slug)!;
  const state = reviewFor(slug, page.lastUpdated ?? UPDATED_ISO_DATE);
  const expert = approvedReviewer(state);
  return expert && state.reviewStatus === "reviewed"
    ? `Recenzja medyczna: ${expert.name}, ${state.reviewDate}. Profil: [${expert.name}](${SITE_URL}${expert.profileUrl}).`
    : "Recenzja medyczna tej strony: jeszcze niepotwierdzona.";
}
const context = `Polskojęzyczny serwis informacyjny o celu komercyjnym dla pacjentów rozważających leczenie w Turcji. Klinika prowadzona przez operatora serwisu: Akdeniz Dental, Antalya, Turcja. Godziny otwarcia kliniki: ${hoursSummary}. Języki obsługi: ${languagesSummary}. ${OPERATOR_DISCLOSURE} Serwis nie zastępuje badania ani indywidualnej porady lekarza.`;
const pricingScope = "Ceny dotyczą pozycji z cennika kliniki, nie automatycznie kompletnego leczenia lub pakietu. Włączenie łącznika, korony na implancie, diagnostyki, hotelu i transferów wymaga potwierdzenia w indywidualnej ofercie. Nie przedstawiaj sumy wybranych pozycji jako potwierdzonej ceny całkowitej.";

function lastContentUpdate() {
  return [SUPPORT_TEAM_UPDATED, UPDATED_ISO_DATE, PRICING_UPDATED_ISO_DATE, ...patientGuides.map((page) => page.lastUpdated ?? UPDATED_ISO_DATE), ...Object.values(pages).map((page) => page.lastUpdated ?? UPDATED_ISO_DATE)].sort().pop()!;
}

export function llmsIndex() {
  return [`# ${SITE_NAME}`, `> ${context}`, "", "Język: pl-PL. Ostatnia aktualizacja treści: " + lastContentUpdate() + ". Canonical origin: " + SITE_URL, ...(OPERATOR.legalName ? [`Operator serwisu: ${OPERATOR.legalName}, ${operatorRows(OPERATOR, false).find((row) => row.label === "Adres")?.value ?? ""}. Szczegóły: ${SITE_URL}/o-nas`] : []), pricingScope,
    "Skład zespołu nie oznacza recenzji wszystkich treści. Status i data recenzji są przypisane konkretnej stronie. Zdjęcia przed i po nie mają jeszcze potwierdzonego zakresu klinicznego.",
    "", "## Przewodniki dla pacjentów", `- [Biblioteka poradników](${SITE_URL}/poradniki): stałe przewodniki dla pacjentów z Polski.`, ...patientGuides.map((page) => `- [${page.h1}](${SITE_URL}/${page.slug}): ${page.description} Markdown: ${markdownUrl(page.slug)}`),
    "", "## Pytania, lekarze i weryfikacja", `- [Pytania i odpowiedzi](${SITE_URL}${FAQ_PATH}): odpowiedzi z przewodników wraz z linkami do źródłowych stron.`, `- [Nasi lekarze](${SITE_URL}/nasi-lekarze): zespół kliniki prowadzonej przez operatora serwisu i źródła zawodowe.`, `- [Nasz zespół](${SITE_URL}/nasz-zespol): role organizacyjne i pytania o kontakt przed wizytą; nie jest imiennym wykazem personelu.`, ...clinicProfiles.map((profile) => `- [Akdeniz Dental w serwisie ${profile.label}](${profile.href}): zewnętrzny profil kliniki, ocena ${profile.rating}/5 (${profile.reviewCount} opinii) wg odczytu z ${RATINGS_CHECKED_ISO_DATE}; zmienia się w czasie, sprawdź w serwisie.`), `- Adres kliniki prowadzonej przez operatora serwisu (wg Map Google i Trustpilot): ${CLINIC_ADDRESS_TEXT}.`,
    ...verifiedExperts.map((expert) => `- [${expert.name}](${SITE_URL}${expert.profileUrl}): profil recenzenta i lista faktycznie zrecenzowanych stron.`),
    `- [Weryfikacja medyczna](${SITE_URL}/weryfikacja-medyczna): zasady i zakres recenzji.`, `- [Polityka redakcyjna](${SITE_URL}/polityka-redakcyjna): autorstwo, źródła i aktualizacje.`, `- [Metodologia](${SITE_URL}/metodologia): jak zbieramy, sprawdzamy i oznaczamy informacje.`, `- [Właściciel serwisu](${SITE_URL}/wlasciciel-serwisu): operator serwisu i jego powiązanie z kliniką.`, `- [Korekty](${SITE_URL}/korekty): zgłaszanie błędów i dziennik zmian.`, ...(credentialsPublished ? [`- [Dokumenty i licencje](${SITE_URL}/dokumenty-i-licencje): zweryfikowane dokumenty kliniki i lekarzy z linkami do rejestrów.`] : []), `- [Listy kontrolne](${SITE_URL}/listy-kontrolne): listy kontrolne dla pacjentów.`,
    "", "## Optional", `- [Pełny tekst przewodników](${SITE_URL}/llms-full.txt): tekst z tych samych danych co widoczne strony, z cenami, źródłami i datami recenzji.`, `- [Dane o pochodzeniu treści](${SITE_URL}/content-provenance.json): rekordy źródeł i recenzji poszczególnych stron.`, `- [Dane kliniki](${SITE_URL}/dane-kliniki): nazwa, adres, telefon, godziny i języki kliniki w jednej postaci. Wersja JSON: [citation-kit.json](${SITE_URL}/citation-kit.json).`, `- [Cennik kliniki jako dane](${SITE_URL}/dane/cennik-kliniki): pozycje cennika w EUR i PLN z datą i kursem. Pliki: [CSV](${SITE_URL}/dane/cennik-kliniki.csv) i [JSON](${SITE_URL}/dane/cennik-kliniki.json).`, `- [Weryfikacja dokumentów](${SITE_URL}/clinic-verification.json): zweryfikowane dokumenty kliniki i lekarzy; puste listy oznaczają brak opublikowanych pozycji.`, `- [Sitemap](${SITE_URL}/sitemap.xml): adresy stron przeznaczonych do indeksowania.`, `- [Kanał RSS](${SITE_URL}/feed.xml): poradniki dla pacjentów z datami publikacji.`, `- [Kontakt](${SITE_URL}/kontakt): zapytania o konsultację; nie przesyłaj dokumentacji medycznej przez formularz.`, ""].join("\n");
}

/** Body lines shared by llms-full.txt and the per-page Markdown files, so both say the same thing as the HTML page. */
function guideLines(page: (typeof patientGuides)[number]) {
  return [
    page.lead, "", page.answer,
    ...page.sections.flatMap((section) => ["", `### ${section.title}`, ...(section.paragraphs ?? []), ...(section.bullets ?? []).map((item) => `- ${item}`), ...(section.cards ?? []).map((card) => `- ${card.title}: ${card.text}`), ...(section.table ? [`| ${section.table.headers.join(" | ")} |`, `| ${section.table.headers.map(() => "---").join(" | ")} |`, ...section.table.rows.map((row) => `| ${row.join(" | ")} |`)] : [])]),
    ...(page.faq?.length ? ["", "### Pytania i odpowiedzi", ...page.faq.flatMap((faq, index) => [`#### ${faq.question}`, faq.answer, `Źródło: ${SITE_URL}/${page.slug}#faq-${index + 1}`, ""])] : []),
    ...(page.sources?.length ? ["### Źródła", ...page.sources.map((source) => `- [${source.label}](${absoluteUrl(source.href)})`)] : [])
  ];
}

const pricingNote = `Data cennika: ${PRICING_UPDATED_ISO_DATE}. Waluta bazowa: EUR. Orientacyjny kurs: 1 EUR = ${EUR_PLN_RATE.toFixed(2)} PLN, ${EUR_PLN_RATE_TIMESTAMP}. Kurs nie jest aktualizowany automatycznie.`;
const priceTable = ["| Pozycja | EUR | Około PLN |", "| --- | --- | --- |", ...priceItems.map((item) => `| ${item.label} | ${item.eur.toFixed(2)} | ${toPln(item.eur)} |`)];

/** Slugs (including `uk/...`) that have a Markdown twin at `/<slug>.md`. */
export const markdownSlugs = patientGuides.map((page) => page.slug);
export const markdownUrl = (slug: string) => `${SITE_URL}/${slug}.md`;

/** Standalone Markdown for one page: the same data as the HTML page, with canonical URL, date and review state up front. */
export function guideMarkdown(slug: string) {
  const page = patientGuides.find((guide) => guide.slug === slug);
  if (!page) return null;
  return [
    "---", `title: ${page.h1}`, `canonical: ${SITE_URL}/${page.slug}`, "language: pl-PL", `last_updated: ${page.lastUpdated ?? UPDATED_ISO_DATE}`, `publisher: ${SITE_NAME}`, "---", "",
    `# ${page.h1}`, `> ${page.description}`, "", `Canonical URL: ${SITE_URL}/${page.slug}`, `Aktualizacja treści: ${page.lastUpdated ?? UPDATED_ISO_DATE}.`, reviewSummary(page.slug), "",
    ...guideLines(page),
    ...(page.slug === "koszt" ? ["", "### Cennik kliniki", pricingNote, pricingScope, "", ...priceTable] : []),
    "", "---", `Ta kopia Markdown jest generowana z tych samych danych co strona ${SITE_URL}/${page.slug}; pierwszeństwo ma strona canonical. ${context}`, ""
  ].join("\n");
}

export function llmsFull() {
  const sections = patientGuides.map((page) => [
    `## ${page.h1}`, `Canonical URL: ${SITE_URL}/${page.slug}`, `Aktualizacja treści: ${page.lastUpdated ?? UPDATED_ISO_DATE}.`, reviewSummary(page.slug), "", ...guideLines(page), ""
  ].join("\n"));
  return [`# ${SITE_NAME}: przewodniki dla pacjentów`, `> ${context}`, "", "Ten tekst jest generowany z danych widocznych przewodników. Pierwszeństwo ma aktualna strona pod adresem canonical; informacje nie kwalifikują pacjenta do leczenia.", `Ostatnia aktualizacja treści: ${lastContentUpdate()}.`,
    "", "## Cennik kliniki", `Źródło: ${SITE_URL}/koszt#cennik`, pricingNote, ...(gbpPublished ? [`Przeliczenie na GBP (strona dla Polaków w UK): 1 EUR = ${EUR_GBP_RATE!.toFixed(2)} GBP, kurs z dnia ${EUR_GBP_RATE_TIMESTAMP}, źródło: ${EUR_GBP_RATE_SOURCE}, zaokrąglony do dwóch miejsc po przecinku. To przeliczenie, a nie oferta kliniki w GBP.`] : []), pricingScope,
    ...priceTable, "", ...sections].join("\n");
}
