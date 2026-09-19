import Link from "next/link";
import type { PageContent } from "@/lib/site";
import { PUBLISHED_DATE, SITE_URL, UPDATED_DATE } from "@/lib/site";
import { Breadcrumbs } from "./breadcrumbs";
import { LeadForm } from "./lead-form";
import { TrackedLink } from "./tracked-link";

const contextualLinks: Record<string, { href: string; label: string; text: string }[]> = {
  koszt: [
    { href: "/implanty", label: "Koszt implantów", text: "Sprawdź, co składa się na pełny plan implantologiczny." },
    { href: "/licowki", label: "Koszt licówek", text: "Zobacz, od czego zależy zakres i cena leczenia estetycznego." },
    { href: "/cala-szczeka", label: "Cała szczęka", text: "Poznaj różne drogi pełnej odbudowy uzębienia." },
    { href: "/all-on-4", label: "All-on-4", text: "Sprawdź, dlaczego nazwa metody nie wystarcza do porównania ofert." }
  ],
  implanty: [
    { href: "/koszt", label: "Jak porównać wyceny", text: "Porównaj zakres, materiały, etapy i opiekę po leczeniu." },
    { href: "/cala-szczeka", label: "Pełna odbudowa", text: "Zobacz, kiedy potrzeba pacjenta wykracza poza pojedyncze implanty." },
    { href: "/all-on-4", label: "All-on-4", text: "Przejdź do osobnego przewodnika po pełnołukowej odbudowie." }
  ],
  licowki: [
    { href: "/koszt", label: "Jak czytać wycenę", text: "Sprawdź zakres, materiał i możliwe koszty dodatkowe." },
    { href: "/przed-i-po", label: "Jak oceniać efekty", text: "Dowiedz się, czego nie pokazują same fotografie." },
    { href: "/jak-wybrac-klinike", label: "Wybór kliniki", text: "Przejdź przez pytania o lekarza, plan i alternatywy." }
  ],
  "cala-szczeka": [
    { href: "/implanty", label: "Implanty", text: "Poznaj ogólne zasady kwalifikacji do leczenia implantologicznego." },
    { href: "/all-on-4", label: "All-on-4", text: "Sprawdź szczegóły jednej z możliwych koncepcji pełnołukowych." },
    { href: "/koszt", label: "Pełny koszt leczenia", text: "Porównaj oferty według zakresu, etapów i opieki po powrocie." }
  ],
  "all-on-4": [
    { href: "/cala-szczeka", label: "Cała szczęka", text: "Zobacz inne możliwe kierunki leczenia pełnego łuku." },
    { href: "/implanty", label: "Implanty", text: "Poznaj szerszy kontekst leczenia implantologicznego." },
    { href: "/koszt", label: "Porównanie ofert", text: "Sprawdź elementy, które powinny znaleźć się w wycenie." }
  ],
  opinie: [
    { href: "/jak-wybrac-klinike", label: "Lista kontroli kliniki", text: "Zweryfikuj lekarza, placówkę, plan i odpowiedzialność." },
    { href: "/przed-i-po", label: "Przed i po", text: "Sprawdź zasady oceny materiałów wizualnych." },
    { href: "/koszt", label: "Porównanie wycen", text: "Nie oceniaj oferty tylko na podstawie opinii i ceny końcowej." }
  ],
  "przed-i-po": [
    { href: "/jak-wybrac-klinike", label: "Jak wybrać klinikę", text: "Zdjęcia uzupełnij weryfikacją lekarza i planu." },
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

export function PageTemplate({ page, formEnabled }: { page: PageContent; formEnabled: boolean }) {
  const pageUrl = `${SITE_URL}/${page.slug}`;
  const related = contextualLinks[page.slug] ?? [];
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Strona główna", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: page.h1, item: pageUrl }
  ]};
  const pageSchema = { "@context": "https://schema.org", "@type": page.schemaType ?? "WebPage", name: page.h1, description: page.description, url: pageUrl, datePublished: "2026-09-18", dateModified: "2026-09-19", author: { "@type": "Organization", name: "Redakcja serwisu Zęby w Turcji" } };
  const faqSchema = page.faq ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) } : null;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <main>
        <section className="page-hero"><div className="shell narrow"><Breadcrumbs current={page.h1} /><p className="eyebrow">{page.eyebrow}</p><h1>{page.h1}</h1><p className="lead">{page.lead}</p>{page.ctaLabel && <TrackedLink href={page.ctaHref ?? "/kontakt"} event={page.ctaEvent ?? "page_cta"} className="button">{page.ctaLabel}</TrackedLink>}</div></section>
        <article className="shell content-layout">
          <div className="article-main">
            <section className="direct-answer" aria-labelledby="direct-answer-title"><p className="mini-label">Krótka odpowiedź</p><h2 id="direct-answer-title">Najważniejsze przed decyzją</h2><p>{page.answer}</p></section>
            {page.sections.map((section) => <section className="content-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul className="check-list">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              {section.cards && <div className="cards">{section.cards.map((card) => <div className="info-card" key={card.title}><h3>{card.title}</h3><p>{card.text}</p></div>)}</div>}
              {section.table && <div className="table-wrap"><table><thead><tr>{section.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row) => <tr key={row.join("|")}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>}
            </section>)}
            {page.form && <section className="content-section"><h2>Formularz wstępnej oceny</h2><LeadForm enabled={formEnabled} /></section>}
            {page.faq && <section className="content-section"><h2>Najczęstsze pytania</h2><div className="faq-list">{page.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>}
            {page.sources && <section className="content-section sources"><h2>Źródła i dalsza lektura</h2><ul>{page.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></section>}
            {related.length > 0 && <nav className="content-section related-guides" aria-label="Powiązane przewodniki"><h2>Powiązane przewodniki</h2><div className="related-grid">{related.map((item) => <Link href={item.href} key={item.href}><strong>{item.label}</strong><span>{item.text}</span></Link>)}</div></nav>}
          </div>
          <aside className="trust-panel" aria-label="Informacje o treści"><p className="mini-label">Transparentność</p><dl><div><dt>Autor</dt><dd>Redakcja serwisu</dd></div><div><dt>Publikacja</dt><dd>{PUBLISHED_DATE}</dd></div><div><dt>Aktualizacja</dt><dd>{UPDATED_DATE}</dd></div><div><dt>Recenzja medyczna</dt><dd>Jeszcze nieprzeprowadzona</dd></div></dl><p>Treść informacyjna. O kwalifikacji i planie leczenia decyduje lekarz po badaniu.</p><Link href="/weryfikacja-medyczna">Jak weryfikujemy treści</Link></aside>
        </article>
        {!page.form && <section className="closing-cta"><div className="shell narrow"><p className="eyebrow">Indywidualny przypadek</p><h2>Plan zaczyna się od właściwych pytań</h2><p>Opisz, czego potrzebujesz. Nie przesyłaj dokumentacji medycznej, dopóki nie otrzymasz bezpiecznego kanału kontaktu.</p><TrackedLink href="/kontakt" event={page.ctaEvent ?? "page_cta"} className="button button-light">Przejdź do wstępnej oceny</TrackedLink></div></section>}
      </main>
    </>
  );
}
