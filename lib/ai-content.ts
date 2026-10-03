import { newGuides } from "./guides";
import { allUkPages } from "./uk";
import { pages, SITE_NAME, SITE_URL, UPDATED_ISO_DATE } from "./site";
import { approvedReviewer, reviewFor } from "./medical-review";
import { verifiedExperts } from "./evidence";
import { OPERATOR, OPERATOR_DISCLOSURE, operatorRows } from "./operator";
import { credentialsPublished } from "./credentials";
import { CLINIC_ADDRESS_TEXT, RATINGS_CHECKED_ISO_DATE, clinicProfiles } from "./clinic-profiles";
import { EUR_PLN_RATE, EUR_PLN_RATE_TIMESTAMP, PRICING_UPDATED_ISO_DATE, priceItems } from "./pricing";

export const FAQ_PATH = "/pytania-i-odpowiedzi";
export const FAQ_PUBLISHED_DATE = "2026-09-30";
const guideSlugs = ["koszt", "implanty", "korony-cyrkonowe", "licowki", "cala-szczeka", "all-on-4", "antalya", "jak-wybrac-klinike", "opinie", "przed-i-po"];
export const patientGuides = [...guideSlugs.map((slug) => pages[slug]), ...Object.values(newGuides), ...allUkPages];
export const faqGroups = patientGuides.filter((page) => page.faq?.length);

export function reviewSummary(slug: string) {
  const page = pages[slug] ?? [...Object.values(newGuides), ...allUkPages].find((guide) => guide.slug === slug)!;
  const state = reviewFor(slug, page.lastUpdated ?? UPDATED_ISO_DATE);
  const expert = approvedReviewer(state);
  return expert && state.reviewStatus === "reviewed"
    ? `Recenzja medyczna: ${expert.name}, ${state.reviewDate}. Profil: ${SITE_URL}${expert.profileUrl}.`
    : "Recenzja medyczna tej strony: jeszcze niepotwierdzona.";
}
const context = `Polskojęzyczny serwis informacyjny o celu komercyjnym dla pacjentów rozważających leczenie w Turcji. Klinika prowadzona przez operatora serwisu: Akdeniz Dental, Antalya, Turcja. ${OPERATOR_DISCLOSURE} Serwis nie zastępuje badania ani indywidualnej porady lekarza.`;
const pricingScope = "Ceny dotyczą pozycji z cennika kliniki, nie automatycznie kompletnego leczenia lub pakietu. Włączenie łącznika, korony na implancie, diagnostyki, hotelu i transferów wymaga potwierdzenia w indywidualnej ofercie. Nie przedstawiaj sumy wybranych pozycji jako potwierdzonej ceny całkowitej.";

function lastContentUpdate() {
  return [UPDATED_ISO_DATE, PRICING_UPDATED_ISO_DATE, ...patientGuides.map((page) => page.lastUpdated ?? UPDATED_ISO_DATE), ...Object.values(pages).map((page) => page.lastUpdated ?? UPDATED_ISO_DATE)].sort().pop()!;
}

export function llmsIndex() {
  return [`# ${SITE_NAME}`, `> ${context}`, "", "Język: pl-PL. Canonical origin: " + SITE_URL + ". Ostatnia aktualizacja treści: " + lastContentUpdate() + ".", ...(OPERATOR.legalName ? [`Operator serwisu: ${OPERATOR.legalName}, ${operatorRows(OPERATOR, false).find((row) => row.label === "Adres")?.value ?? ""}. Szczegóły: ${SITE_URL}/o-nas`] : []), pricingScope,
    "Skład zespołu nie oznacza recenzji wszystkich treści. Status i data recenzji są przypisane konkretnej stronie. Zdjęcia przed i po nie mają jeszcze potwierdzonego zakresu klinicznego.",
    "", "## Przewodniki dla pacjentów", `- [Biblioteka poradników](${SITE_URL}/poradniki): stałe przewodniki dla pacjentów z Polski.`, ...patientGuides.map((page) => `- [${page.h1}](${SITE_URL}/${page.slug}): ${page.description}`),
    "", "## Pytania, lekarze i weryfikacja", `- [Pytania i odpowiedzi](${SITE_URL}${FAQ_PATH}): odpowiedzi z przewodników wraz z linkami do źródłowych stron.`, `- [Nasi lekarze](${SITE_URL}/nasi-lekarze): zespół kliniki prowadzonej przez operatora serwisu i źródła zawodowe.`, ...clinicProfiles.map((profile) => `- [Akdeniz Dental w serwisie ${profile.label}](${profile.href}): zewnętrzny profil kliniki, ocena ${profile.rating}/5 (${profile.reviewCount} opinii) wg odczytu z ${RATINGS_CHECKED_ISO_DATE}; zmienia się w czasie, sprawdź w serwisie.`), `- Adres kliniki prowadzonej przez operatora serwisu (wg Map Google i Trustpilot): ${CLINIC_ADDRESS_TEXT}.`,
    ...verifiedExperts.map((expert) => `- [${expert.name}](${SITE_URL}${expert.profileUrl}): profil recenzenta i lista faktycznie zrecenzowanych stron.`),
    `- [Weryfikacja medyczna](${SITE_URL}/weryfikacja-medyczna): zasady i zakres recenzji.`, `- [Polityka redakcyjna](${SITE_URL}/polityka-redakcyjna): autorstwo, źródła i aktualizacje.`, `- [Metodologia](${SITE_URL}/metodologia): jak zbieramy, sprawdzamy i oznaczamy informacje.`, `- [Właściciel serwisu](${SITE_URL}/wlasciciel-serwisu): operator serwisu i jego powiązanie z kliniką.`, `- [Korekty](${SITE_URL}/korekty): zgłaszanie błędów i dziennik zmian.`, ...(credentialsPublished ? [`- [Dokumenty i licencje](${SITE_URL}/dokumenty-i-licencje): zweryfikowane dokumenty kliniki i lekarzy z linkami do rejestrów.`] : []), `- [Listy kontrolne](${SITE_URL}/listy-kontrolne): listy kontrolne dla pacjentów.`,
    "", "## Optional", `- [Pełny tekst przewodników](${SITE_URL}/llms-full.txt): tekst z tych samych danych co widoczne strony, z cenami, źródłami i datami recenzji.`, `- [Dane o pochodzeniu treści](${SITE_URL}/content-provenance.json): rekordy źródeł i recenzji poszczególnych stron.`, `- [Weryfikacja dokumentów](${SITE_URL}/clinic-verification.json): zweryfikowane dokumenty kliniki i lekarzy; puste listy oznaczają brak opublikowanych pozycji.`, `- [Sitemap](${SITE_URL}/sitemap.xml): adresy stron przeznaczonych do indeksowania.`, `- [Kontakt](${SITE_URL}/kontakt): zapytania o konsultację; nie przesyłaj dokumentacji medycznej przez formularz.`, ""].join("\n");
}

export function llmsFull() {
  const sections = patientGuides.map((page) => [
    `## ${page.h1}`, `Canonical URL: ${SITE_URL}/${page.slug}`, `Aktualizacja treści: ${page.lastUpdated ?? UPDATED_ISO_DATE}.`, reviewSummary(page.slug), "", page.lead, "", page.answer,
    ...page.sections.flatMap((section) => ["", `### ${section.title}`, ...(section.paragraphs ?? []), ...(section.bullets ?? []).map((item) => `- ${item}`), ...(section.cards ?? []).map((card) => `- ${card.title}: ${card.text}`), ...(section.table ? [`| ${section.table.headers.join(" | ")} |`, `| ${section.table.headers.map(() => "---").join(" | ")} |`, ...section.table.rows.map((row) => `| ${row.join(" | ")} |`)] : [])]),
    ...(page.faq?.length ? ["", "### Pytania i odpowiedzi", ...page.faq.flatMap((faq, index) => [`#### ${faq.question}`, faq.answer, `Źródło: ${SITE_URL}/${page.slug}#faq-${index + 1}`, ""])] : []),
    ...(page.sources?.length ? ["### Źródła", ...page.sources.map((source) => `- [${source.label}](${source.href})`)] : []), ""
  ].join("\n"));
  return [`# ${SITE_NAME}: przewodniki dla pacjentów`, `> ${context}`, "", "Ten tekst jest generowany z danych widocznych przewodników. Pierwszeństwo ma aktualna strona pod adresem canonical; informacje nie kwalifikują pacjenta do leczenia.",
    "", "## Cennik kliniki", `Źródło: ${SITE_URL}/koszt#cennik`, `Data cennika: ${PRICING_UPDATED_ISO_DATE}. Waluta bazowa: EUR. Orientacyjny kurs: 1 EUR = ${EUR_PLN_RATE.toFixed(2)} PLN, ${EUR_PLN_RATE_TIMESTAMP}. Kurs nie jest aktualizowany automatycznie.`, pricingScope,
    "| Pozycja | EUR |", "| --- | --- |", ...priceItems.map((item) => `| ${item.label} | ${item.eur.toFixed(2)} |`), "", ...sections].join("\n");
}
