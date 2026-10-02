import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export type FaqItem = { question: string; answer: string };

export function faqSchema(path: string, items: FaqItem[]) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url: `${url}#faq`,
    inLanguage: "pl-PL",
    mainEntity: items.map((item, index) => ({ "@type": "Question", "@id": `${url}#faq-${index + 1}`, url: `${url}#faq-${index + 1}`, name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } }))
  };
}

export function FaqSection({ path, items, className = "content-section" }: { path: string; items: FaqItem[]; className?: string }) {
  return <section className={className} id="faq">
    <h2>Najczęstsze pytania</h2>
    <div className="faq-list">{items.map((item, index) => <details id={`faq-${index + 1}`} key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
    <p><Link className="text-link" href="/pytania-i-odpowiedzi">Wszystkie pytania pacjentów →</Link></p>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(path, items)) }} />
  </section>;
}
