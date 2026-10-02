import Link from "next/link";
import { GuideNextSteps } from "./guide-next-steps";
import { GuidePrices } from "./guide-prices";
import { guideAssessmentHref } from "@/lib/guides";
import { Fragment } from "react";
import type { PageContent } from "@/lib/site";
import { legalSlugs } from "@/lib/site";
import { pageHistory } from "@/lib/page-history";
import { OPERATOR_DISCLOSURE } from "@/lib/operator";
import { PUBLISHED_ISO_DATE, SITE_URL, UPDATED_ISO_DATE } from "@/lib/site";
import { Breadcrumbs } from "./breadcrumbs";
import { reviewFor, approvedReviewer } from "@/lib/medical-review";
import { PRICING_UPDATED_ISO_DATE, priceItems } from "@/lib/pricing";
import { LeadForm } from "./lead-form";
import { TrackedLink } from "./tracked-link";
import { DirectAnswerVisual, SectionVisual } from "./visual-guides";
import { BeforeAfterCaseHub } from "./case-gallery";
import { AntalyaJourneyImages, ClinicTeamImage } from "./context-images";
import { TrustPanel } from "./trust-panel";
import { PriceList } from "./price-list";
import { ClinicProfiles } from "./clinic-profiles";
import { OperatorDetails } from "./operator-details";
import { CredentialList } from "./credential-list";
import { clinicCredentials } from "@/lib/credentials";
import { SourceList } from "./source-list";
import { caseImages } from "@/lib/gallery";
import { TreatmentCostScope } from "./treatment-cost-scope";

const contextualLinks: Record<string, { href: string; label: string; text: string }[]> = {
  "korony-cyrkonowe": [
    { href: "/koszt", label: "Pełny cennik", text: "Sprawdź ceny dodatkowego leczenia i zasady wyceny." },
    { href: "/licowki", label: "Licówki a korony", text: "Porównaj różne rodzaje odbudowy." },
    { href: "/implanty#zakres-implantu", label: "Korona na implancie", text: "Sprawdź elementy pełnej odbudowy na implancie." }
  ],
  koszt: [
    { href: "/korony-cyrkonowe", label: "Korony cyrkonowe", text: "Cena 150 EUR, zakres i przykładowe sumy w EUR i PLN." },
    { href: "/implanty", label: "Koszt implantów", text: "Sprawdź, co składa się na pełny plan implantologiczny." },
    { href: "/licowki", label: "Koszt licówek", text: "Zobacz, od czego zależy zakres i cena leczenia estetycznego." },
    { href: "/cala-szczeka", label: "Cała szczęka", text: "Poznaj różne drogi pełnej odbudowy uzębienia." },
    { href: "/all-on-4", label: "All-on-4", text: "Sprawdź, dlaczego nazwa metody nie wystarcza do porównania ofert." }
  ],
  implanty: [
    { href: "/korony-cyrkonowe", label: "Korony cyrkonowe", text: "Cena 150 EUR, zakres i przykładowe sumy w EUR i PLN." },
    { href: "/koszt", label: "Jak porównać wyceny", text: "Porównaj zakres, materiały, etapy i opiekę po leczeniu." },
    { href: "/cala-szczeka", label: "Pełna odbudowa", text: "Zobacz, kiedy potrzeba pacjenta wykracza poza pojedyncze implanty." },
    { href: "/all-on-4", label: "All-on-4", text: "Przejdź do osobnego przewodnika po pełnołukowej odbudowie." }
  ],
  licowki: [
    { href: "/korony-cyrkonowe", label: "Korony cyrkonowe", text: "Cena 150 EUR, zakres i przykładowe sumy w EUR i PLN." },
    { href: "/koszt", label: "Jak czytać wycenę", text: "Sprawdź zakres, materiał i możliwe koszty dodatkowe." },
    { href: "/przed-i-po", label: "Jak oceniać efekty", text: "Dowiedz się, czego nie pokazują same fotografie." },
    { href: "/jak-wybrac-klinike", label: "Wybór kliniki", text: "Przejdź przez pytania o lekarza, plan i alternatywy." }
  ],
  "cala-szczeka": [
    { href: "/korony-cyrkonowe", label: "Korony cyrkonowe", text: "Cena 150 EUR, zakres i przykładowe sumy w EUR i PLN." },
    { href: "/implanty", label: "Implanty", text: "Poznaj ogólne zasady kwalifikacji do leczenia implantologicznego." },
    { href: "/all-on-4", label: "All-on-4", text: "Sprawdź szczegóły jednej z możliwych koncepcji pełnołukowych." },
    { href: "/koszt", label: "Pełny koszt leczenia", text: "Porównaj oferty według zakresu, etapów i opieki po powrocie." }
  ],
  "all-on-4": [
    { href: "/cala-szczeka", label: "Cała szczęka", text: "Poznaj inne możliwości odbudowy całego łuku zębowego." },
    { href: "/implanty", label: "Implanty", text: "Poznaj szerszy kontekst leczenia implantologicznego." },
    { href: "/koszt", label: "Porównanie ofert", text: "Sprawdź elementy, które powinny znaleźć się w wycenie." }
  ],
  opinie: [
    { href: "/jak-wybrac-klinike", label: "Lista kontroli kliniki", text: "Zweryfikuj lekarza, placówkę, plan i odpowiedzialność." },
    { href: "/przed-i-po", label: "Przed i po", text: "Sprawdź zasady oceny materiałów wizualnych." },
    { href: "/koszt", label: "Porównanie wycen", text: "Nie oceniaj oferty tylko na podstawie opinii i ceny końcowej." }
  ],
  "przed-i-po": [
    { href: "/jak-wybrac-klinike", label: "Jak wybrać klinikę", text: "Sprawdź także lekarza i plan leczenia." },
    { href: "/opinie", label: "Jak oceniać opinie", text: "Odróżnij relację pacjenta od materiału reklamowego." }
  ],
  antalya: [
    { href: "/koszt", label: "Koszt całego wyjazdu", text: "Uwzględnij leczenie, podróż, pobyt i możliwe korekty." },
    { href: "/jak-wybrac-klinike", label: "Wybór kliniki", text: "Sprawdź placówkę i odpowiedzialność przed rezerwacją lotu." },
    { href: "/implanty", label: "Implanty", text: "Zobacz, dlaczego leczenie może wymagać więcej niż jednego pobytu." }
  ],
  "jak-wybrac-klinike": [
    { href: "/opinie", label: "Jak oceniać opinie", text: "Sprawdź wiarygodność doświadczeń publikowanych w internecie." },
    { href: "/przed-i-po", label: "Jak oceniać zdjęcia", text: "Zobacz, czego materiały przed i po nie potwierdzają." },
    { href: "/koszt", label: "Jak porównać wyceny", text: "Ustal pełny zakres przed wpłatą zaliczki." }
  ]
};

export function PageTemplate({ page, formEnabled, guide = false }: { page: PageContent; formEnabled: boolean; guide?: boolean }) {
  const pageUrl = `${SITE_URL}/${page.slug}`;
  const related = contextualLinks[page.slug] ?? [];
  const review = reviewFor(page.slug, page.lastUpdated ?? UPDATED_ISO_DATE);
  const reviewer = approvedReviewer(review);
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Strona główna", item: SITE_URL },
    ...(guide ? [{ "@type": "ListItem", position: 2, name: "Poradniki", item: `${SITE_URL}/poradniki` }] : []),
    { "@type": "ListItem", position: guide ? 3 : 2, name: page.h1, item: pageUrl }
  ]};
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": page.schemaType ?? "WebPage",
    "@id": `${pageUrl}#webpage`,
    name: page.h1,
    description: page.description,
    url: pageUrl,
    inLanguage: "pl-PL",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    datePublished: page.published ?? PUBLISHED_ISO_DATE,
    dateModified: review.lastUpdated,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".page-hero h1", ".direct-answer"] },
    ...(page.sources?.length ? { citation: page.sources.map((source) => ({ "@type": "CreativeWork", name: source.label, url: source.href })) } : {}),
    ...(page.faq?.length ? { hasPart: { "@id": `${pageUrl}#faq` } } : {}),
    ...(reviewer && review.reviewStatus === "reviewed" ? { lastReviewed: review.reviewDate, reviewedBy: { "@id": `${SITE_URL}${reviewer.profileUrl}/#person` } } : {})
  };
  const articleSchema = guide ? { "@context": "https://schema.org", "@type": "Article", "@id": `${pageUrl}#article`, headline: page.h1, description: page.description, url: pageUrl, mainEntityOfPage: { "@id": `${pageUrl}#webpage` }, inLanguage: "pl-PL", datePublished: page.published, dateModified: page.lastUpdated, author: { "@id": `${SITE_URL}/#organization` }, publisher: { "@id": `${SITE_URL}/#organization` }, citation: page.sources?.map((source) => source.href.startsWith("/") ? `${SITE_URL}${source.href}` : source.href) } : null;
  const faqSchema = page.faq ? { "@context": "https://schema.org", "@type": "FAQPage", "@id": `${pageUrl}#faq`, url: `${pageUrl}#faq`, inLanguage: "pl-PL", isPartOf: { "@id": `${pageUrl}#webpage` }, mainEntity: page.faq.map((item, index) => ({ "@type": "Question", "@id": `${pageUrl}#faq-${index + 1}`, url: `${pageUrl}#faq-${index + 1}`, name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) } : null;
  const priceSchema = page.slug === "koszt" ? { "@context": "https://schema.org", "@type": "ItemList", "@id": `${pageUrl}#cennik`, name: "Cennik kliniki Akdeniz Dental (pozycje w EUR)", itemListElement: priceItems.map((item, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Offer", name: item.label, price: item.eur.toFixed(2), priceCurrency: "EUR", validFrom: PRICING_UPDATED_ISO_DATE, description: "Cena pozycji z cennika kliniki, nie ceny całkowitej leczenia ani pakietu.", seller: { "@type": "Organization", name: "Akdeniz Dental", url: "https://akdenizdental.com" } } })) } : null;
  const gallerySchema = page.slug === "przed-i-po" ? { "@context": "https://schema.org", "@type": "ImageGallery", "@id": `${pageUrl}#galeria`, name: "Zdjęcia przed i po", url: pageUrl, inLanguage: "pl-PL", image: caseImages.map((item) => ({ "@type": "ImageObject", contentUrl: `${SITE_URL}${item.src}`, name: `${item.label}: uśmiech przed i po`, description: "Zdjęcie przed i po leczeniu. Zakres leczenia nie został zweryfikowany; wynik jest indywidualny.", width: 700, height: 700, encodingFormat: "image/webp" })) } : null;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {gallerySchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} />}
      {priceSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(priceSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      {articleSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />}
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <main>
        <section className="page-hero"><div className="shell narrow">{guide ? <nav aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link> / <Link href="/poradniki">Poradniki</Link> / {page.h1}</nav> : <Breadcrumbs current={page.h1} />}<p className="eyebrow">{page.eyebrow}</p><h1>{page.h1}</h1><p className="lead">{page.lead}</p>{!legalSlugs.includes(page.slug) && OPERATOR_DISCLOSURE && <p className="commercial-note"><strong>Informacja komercyjna.</strong> {OPERATOR_DISCLOSURE} <Link href="/wlasciciel-serwisu">Właściciel serwisu</Link></p>}{guide && <p className="hero-partner">Klinika prowadzona przez operatora serwisu: Akdeniz Dental, Antalya, Turcja</p>}{(page.ctaLabel || guide) && <TrackedLink href={page.ctaHref ?? guideAssessmentHref(`/${page.slug}`, guide ? "guide_top" : (page.ctaEvent ?? "page_cta"))} event={guide ? "guide_contact_cta" : (page.ctaEvent ?? "page_cta")} tracking={guide ? { guide_source: `/${page.slug}`, cta_location: "guide_top" } : undefined} className="button">{page.form ? page.ctaLabel : "Poproś o wstępną wycenę"}</TrackedLink>}</div></section>
        <article className={`shell content-layout${page.slug === "przed-i-po" ? " content-layout-cases" : ""}`}>
          <div className="article-main">
            <section className="direct-answer" aria-labelledby="direct-answer-title"><p className="mini-label">Krótka odpowiedź</p><h2 id="direct-answer-title">{page.answerTitle ?? `Krótko: ${page.h1}`}</h2><p>{page.slug === "kontakt" && formEnabled ? "Opisz krótko, czego potrzebujesz. Po otrzymaniu zapytania możemy wskazać, jakie informacje są potrzebne do wstępnej oceny. Plan leczenia ustala lekarz po badaniu." : page.answer}</p></section>
            <DirectAnswerVisual slug={page.slug} />
            <PriceList slug={page.slug} />
            {(page.slug === "o-nas" || ["polityka-prywatnosci", "regulamin", "reklamacje", "cookies"].includes(page.slug)) && <OperatorDetails />}
            {page.slug === "kontakt" && <OperatorDetails showContact={false} />}
            {page.slug === "dokumenty-i-licencje" && <CredentialList credentials={clinicCredentials} />}
            {(page.slug === "opinie" || page.slug === "jak-wybrac-klinike") && <ClinicProfiles />}
            {guide && <GuidePrices />}
            <TreatmentCostScope slug={page.slug} />
            {page.sections.map((section) => <Fragment key={section.title}><section className="content-section">
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul className="check-list">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              {section.cards && <div className="cards">{section.cards.map((card) => <div className="info-card" key={card.title}><h3>{card.title}</h3><p>{card.text}</p></div>)}</div>}
              {section.table && <div className="table-wrap"><table><thead><tr>{section.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row) => <tr key={row.join("|")}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>}
              <SectionVisual slug={page.slug} sectionTitle={section.title} />
            </section>
              {page.slug === "przed-i-po" && section.title === "Jak czytać materiał przed i po" && <BeforeAfterCaseHub formEnabled={formEnabled} />}
              {page.slug === "antalya" && section.title === "Przed wyjazdem" && <AntalyaJourneyImages />}
              {page.slug === "jak-wybrac-klinike" && section.title === "Lista kontroli przed wpłatą" && <ClinicTeamImage />}
            </Fragment>)}
            {page.form && <section className="content-section" id="assessment-form"><LeadForm enabled={formEnabled} /></section>}
            {page.faq && <section className="content-section" id="faq"><h2>Najczęstsze pytania</h2><div className="faq-list">{page.faq.map((item, index) => <details id={`faq-${index + 1}`} key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div><p><Link className="text-link" href="/pytania-i-odpowiedzi">Wszystkie pytania pacjentów →</Link></p></section>}
            {page.sources && <SourceList sources={page.sources} />}
            {guide && <GuideNextSteps source={`/${page.slug}`} />}
            {!page.form && <nav className="content-section" aria-label="Biblioteka poradników"><Link className="text-link" href="/poradniki">Wszystkie poradniki dla pacjentów z Polski →</Link>{!guide && <p><Link href="/poradniki/leczenie-zebow-w-turcji">Od czego zacząć?</Link> · <Link href="/poradniki/calkowity-koszt-wyjazdu">Budżet całego wyjazdu</Link> · <Link href="/poradniki/opieka-po-leczeniu">Opieka po powrocie do Polski</Link></p>}</nav>}
            {related.length > 0 && <nav className="content-section related-guides" aria-label="Powiązane przewodniki"><h2>Powiązane przewodniki</h2><div className="related-grid">{related.map((item) => <TrackedLink href={item.href} key={item.href} event={item.href.startsWith("/koszt") ? "guide_to_pricing" : ["/implanty", "/korony-cyrkonowe", "/licowki", "/cala-szczeka", "/all-on-4"].some((href) => item.href.split("#")[0] === href) ? "guide_to_treatment" : "guide_open"} tracking={{ destination_path: item.href.split("#")[0] }}><strong>{item.label}</strong><span>{item.text}</span></TrackedLink>)}</div></nav>}
          </div>
          {!legalSlugs.includes(page.slug) && <TrustPanel review={review} reviewer={reviewer} published={page.published} history={pageHistory[page.slug]} />}
        </article>
        {!page.form && <section className="closing-cta"><div className="shell narrow"><p className="eyebrow">Indywidualny przypadek</p><h2>Najpierw ustal, jakie leczenie może być potrzebne</h2><p>Opisz, czego potrzebujesz. Nie przesyłaj dokumentacji medycznej, dopóki nie otrzymasz bezpiecznego kanału kontaktu.</p><TrackedLink href={guideAssessmentHref(`/${page.slug}`, guide ? "guide_bottom" : (page.ctaEvent ?? "page_cta"))} event={guide ? "guide_contact_cta" : (page.ctaEvent ?? "page_cta")} tracking={guide ? { guide_source: `/${page.slug}`, cta_location: "guide_bottom" } : undefined} className="button button-light">Poproś o wstępną wycenę</TrackedLink></div></section>}
      </main>
    </>
  );
}
