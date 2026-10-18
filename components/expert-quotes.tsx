import Link from "next/link";
import { approvedQuotes } from "@/lib/expert-quotes";

/** One approved clinician quote (see lib/expert-quotes.ts); renders nothing while the quote is still a draft. */
export function ExpertQuote({ id }: { id: string }) {
  const quote = approvedQuotes().find((item) => item.id === id);
  if (!quote) return null;
  return <section className="shell expert-quote-section" aria-label={`Wypowiedź lekarza: ${quote.topic}`}>
    <figure className="expert-quote">
      <blockquote cite={`/eksperci/${quote.slug}`}><p>„{quote.text}”</p></blockquote>
      <figcaption><cite><Link href={`/eksperci/${quote.slug}`}>{quote.name}</Link></cite><span>{quote.role}</span></figcaption>
    </figure>
  </section>;
}
