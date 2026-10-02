import type { Metadata } from "next";
import Link from "next/link";
import { SourceList } from "@/components/source-list";
import { FAQ_PATH, FAQ_PUBLISHED_DATE, faqGroups } from "@/lib/ai-content";
import { SITE_URL } from "@/lib/site";
import { OG_IMAGES, TWITTER_IMAGES } from "@/lib/seo";

const title = "Leczenie zębów w Turcji – pytania i odpowiedzi";
const description = "Odpowiedzi na pytania o ceny, implanty, korony, licówki, All-on-4, wybór kliniki i wyjazd do Antalyi. Przejdź do szczegółowych przewodników i źródeł.";
export const metadata: Metadata = { title, description, alternates: { canonical: FAQ_PATH }, openGraph: { images: OG_IMAGES, title, description, url: FAQ_PATH, type: "website" }, twitter: { images: TWITTER_IMAGES, card: "summary_large_image", title, description } };
export default function PatientFAQ() {
  const url = `${SITE_URL}${FAQ_PATH}`;
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "pl-PL", datePublished: FAQ_PUBLISHED_DATE, author: { "@id": `${SITE_URL}/#organization` }, isPartOf: { "@id": `${SITE_URL}/#website` }, mainEntity: faqGroups.flatMap((page) => page.faq!.map((faq, index) => ({ "@type": "Question", "@id": `${url}#${page.slug}-${index + 1}`, name: faq.question, url: `${url}#${page.slug}-${index + 1}`, citation: `${SITE_URL}/${page.slug}#faq-${index + 1}`, acceptedAnswer: { "@type": "Answer", text: faq.answer } }))) };
  const breadcrumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Strona główna", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Pytania i odpowiedzi", item: url }] };
  return <main className="shell expert-profile content-section faq-hub">
    <nav aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link> / Pytania i odpowiedzi</nav>
    <p className="eyebrow">Pytania pacjentów</p><h1>{title}</h1><p className="lead">Znajdź odpowiedź i przejdź do przewodnika z pełnym kontekstem, cenami oraz źródłami.</p>
    <p>Odpowiedzi pochodzą z istniejących przewodników. Status recenzji medycznej dotyczy wskazanej strony źródłowej, a nie automatycznie całego zestawienia. Indywidualny plan ustala lekarz po badaniu.</p>
    <p><Link className="text-link" href="/poradniki">Poradniki dla pacjentów z Polski →</Link></p>
    <nav aria-label="Tematy pytań"><ul>{faqGroups.map((page) => <li key={page.slug}><a href={`#${page.slug}`}>{page.h1}</a></li>)}</ul></nav>
    {faqGroups.map((page) => <section className="content-section" id={page.slug} key={page.slug}><h2>{page.h1}</h2><p><Link className="text-link" href={`/${page.slug}`}>Pełny przewodnik, źródła i status recenzji →</Link></p><div className="faq-list">{page.faq!.map((faq, index) => <details id={`${page.slug}-${index + 1}`} key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p><Link className="text-link" href={`/${page.slug}#faq-${index + 1}`}>Zobacz odpowiedź w przewodniku →</Link></details>)}</div></section>)}
    <SourceList intro="Odpowiedzi pochodzą ze stron wskazanych w każdej grupie. Poniżej zewnętrzne źródła cytowane w tych przewodnikach." sources={[{ label: "Cennik kliniki Akdeniz Dental (pozycje w EUR, z datą)", href: "/koszt#cennik" }, ...Array.from(new Map(faqGroups.flatMap((page) => page.sources ?? []).filter((source) => !source.href.startsWith("/")).map((source) => [source.href, source])).values())]} />
    <p>Autor zestawienia: Redakcja serwisu. Publikacja: <time dateTime={FAQ_PUBLISHED_DATE}>30 września 2026</time>. <Link href="/polityka-redakcyjna">Standard redakcyjny</Link></p>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
  </main>;
}
