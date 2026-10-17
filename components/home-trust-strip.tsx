import Link from "next/link";
import { homeTrustFacts } from "@/lib/home-trust-facts";

/** Compact strip of concrete clinic advantages; the ownership line stays visible under it. */
export function HomeTrustStrip() {
  return <section className="home-identity-strip home-trust-strip" aria-labelledby="home-trust-title">
    <div className="shell">
      <h2 id="home-trust-title" className="sr-only">Dlaczego pacjenci wybierają Akdeniz Dental</h2>
      <ul className="home-trust-list">{homeTrustFacts.map((fact) => <li key={fact.id}><strong>{fact.title}</strong><span>{fact.text}</span></li>)}</ul>
      <p className="home-trust-owner">Klinikę Akdeniz Dental w Antalyi prowadzi operator tego serwisu. <Link href="/wlasciciel-serwisu" className="text-link">Kto prowadzi serwis →</Link></p>
    </div>
  </section>;
}
