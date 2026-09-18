import Link from "next/link";
import type { PageContent } from "@/lib/site";
import { SITE_URL, UPDATED_DATE } from "@/lib/site";
import { Breadcrumbs } from "./breadcrumbs";
import { LeadForm } from "./lead-form";
import { TrackedLink } from "./tracked-link";

export function PageTemplate({ page, formEnabled }: { page: PageContent; formEnabled: boolean }) {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Strona główna", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: page.h1, item: `${SITE_URL}/${page.slug}/` }
  ]};
  const pageSchema = { "@context": "https://schema.org", "@type": "MedicalWebPage", name: page.h1, description: page.description, url: `${SITE_URL}/${page.slug}/`, dateModified: "2026-09-18", author: { "@type": "Organization", name: "Redakcja serwisu Zęby w Turcji" } };
  const faqSchema = page.faq ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) } : null;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <main>
        <section className="page-hero"><div className="shell narrow"><Breadcrumbs current={page.h1} /><p className="eyebrow">{page.eyebrow}</p><h1>{page.h1}</h1><p className="lead">{page.lead}</p>{page.ctaLabel && <TrackedLink href="/kontakt/" event={page.ctaEvent ?? "page_cta"} className="button">{page.ctaLabel}</TrackedLink>}</div></section>
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
          </div>
          <aside className="trust-panel" aria-label="Informacje o treści"><p className="mini-label">Transparentność</p><dl><div><dt>Autor</dt><dd>Redakcja serwisu</dd></div><div><dt>Aktualizacja</dt><dd>{UPDATED_DATE}</dd></div><div><dt>Recenzja medyczna</dt><dd>Jeszcze nieprzeprowadzona</dd></div></dl><p>Treść informacyjna. O kwalifikacji i planie leczenia decyduje lekarz po badaniu.</p><Link href="/weryfikacja-medyczna/">Jak weryfikujemy treści</Link></aside>
        </article>
        {!page.form && <section className="closing-cta"><div className="shell narrow"><p className="eyebrow">Indywidualny przypadek</p><h2>Plan zaczyna się od właściwych pytań</h2><p>Opisz, czego potrzebujesz. Nie przesyłaj dokumentacji medycznej, dopóki nie otrzymasz bezpiecznego kanału kontaktu.</p><TrackedLink href="/kontakt/" event={page.ctaEvent ?? "page_cta"} className="button button-light">Przejdź do wstępnej oceny</TrackedLink></div></section>}
      </main>
    </>
  );
}
