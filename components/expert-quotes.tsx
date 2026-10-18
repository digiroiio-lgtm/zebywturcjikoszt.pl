import Link from "next/link";
import { approvedQuotes } from "@/lib/expert-quotes";

/** Renders only quotes the clinician has approved in writing (see lib/expert-quotes.ts); renders nothing otherwise. */
export function ExpertQuotes() {
  const quotes = approvedQuotes();
  if (quotes.length === 0) return null;
  return <section className="shell section-space expert-quotes" aria-labelledby="expert-quotes-title">
    <div className="section-heading"><div><p className="eyebrow">Głos lekarzy</p><h2 id="expert-quotes-title">Co o planowaniu leczenia mówią lekarze Akdeniz Dental?</h2></div><p>Wypowiedzi lekarzy kliniki prowadzonej przez operatora serwisu. Mają charakter informacyjny i nie zastępują badania ani indywidualnego planu leczenia.</p></div>
    <div className="expert-quote-grid">{quotes.map((quote) => <figure key={quote.id} className="expert-quote">
      <blockquote cite={`/eksperci/${quote.slug}`}><p>„{quote.text}”</p></blockquote>
      <figcaption><Link href={`/eksperci/${quote.slug}`}>{quote.name}</Link>, {quote.role}</figcaption>
    </figure>)}</div>
  </section>;
}
