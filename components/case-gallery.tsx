import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "./tracked-link";
import { InPageLeadCta } from "./in-page-lead-cta";

import type { VerifiedCase } from "@/lib/evidence";
type CaseAsset = { reference: string; src: string; label: string; verified?: VerifiedCase };

const cases: CaseAsset[] = Array.from({ length: 20 }, (_, index) => {
  const number = index + 1;
  return {
    reference: `before-after${number}`,
    src: `/images/diagrams/before-after${number}.webp`,
    label: `Metamorfoza ${number}`
  };
});

function assessmentHref(location: string, pagePath: string, caseReference?: string) {
  const params = new URLSearchParams({ lead_source: "OGZ-PL", cta_location: location, page_path: pagePath });
  if (caseReference) params.set("case_reference", caseReference);
  return `/kontakt?${params.toString()}`;
}

function CaseCard({ item, priority = false }: { item: CaseAsset; priority?: boolean }) {
  return <figure className="case-card">
    <Image src={item.src} alt={`Zdjęcia oznaczone jako ${item.label}: porównanie wyglądu uśmiechu; metoda leczenia niepotwierdzona`} width={700} height={700} sizes="(max-width: 760px) calc(100vw - 28px), (max-width: 1100px) 45vw, 360px" priority={priority} />
    <figcaption><strong>{item.label}</strong><span>{item.verified?.status === "verified" ? item.verified.treatment : "Zakres leczenia nie został jeszcze zweryfikowany."}</span></figcaption>
  </figure>;
}

export function CuratedCaseGallery() {
  const featured = [cases[0], cases[6], cases[18]];
  return <section className="shell section-space visual-proof" aria-labelledby="visual-proof-title">
    <div className="section-heading"><div><p className="eyebrow">Przykładowe rezultaty</p><h2 id="visual-proof-title">Zobacz przykładowe metamorfozy</h2></div><p>Materiały pokazują zmianę wyglądu uśmiechu. Nie potwierdzają metody leczenia ani tego, czy podobny plan będzie odpowiedni dla innej osoby.</p></div>
    <div className="case-grid case-grid-featured">{featured.map((item) => <CaseCard item={item} key={item.reference} />)}</div>
    <div className="visual-proof-actions"><Link className="text-link" href="/przed-i-po">Zobacz więcej przypadków <span aria-hidden="true">→</span></Link><TrackedLink href={assessmentHref("home_visual_proof", "/")} event="home_visual_assessment_cta" tracking={{ lead_source: "OGZ-PL", cta_location: "home_visual_proof" }} className="button">Poproś o wstępną ocenę</TrackedLink></div>
  </section>;
}

export function BeforeAfterCaseHub({ formEnabled }: { formEnabled: boolean }) {
  return <section className="case-hub" aria-labelledby="case-hub-title">
    <div className="case-hub-heading"><p className="eyebrow">Biblioteka wizualna</p><h2 id="case-hub-title">Przykładowe metamorfozy</h2><p>Rezultaty różnią się między pacjentami. Zdjęcia nie pozwalają ustalić kwalifikacji do leczenia; potrzebne są diagnostyka i konsultacja.</p></div>
    <div className="case-grid">{cases.slice(0, 4).map((item) => <CaseCard item={item} key={item.reference} />)}</div>
    <InPageLeadCta title="Zastanawiasz się, jakie możliwości dotyczą Twojego przypadku?" text="Opisz krótko swoją sytuację, aby rozpocząć wstępną ocenę możliwego zakresu leczenia." buttonLabel="Poproś o wstępną ocenę" location="before_after_cases_1_4" caseReference="before-after4" formEnabled={formEnabled} />
    <div className="case-grid">{cases.slice(4, 10).map((item) => <CaseCard item={item} key={item.reference} />)}</div>
    <InPageLeadCta title="Chcesz poznać możliwy zakres leczenia i elementy wyceny?" text="Wstępny opis potrzeby pomoże przygotować właściwe pytania przed diagnostyką i konsultacją." buttonLabel="Sprawdź swój przypadek" location="before_after_cases_5_10" caseReference="before-after10" formEnabled={formEnabled} />
    <div className="case-grid">{cases.slice(10, 16).map((item) => <CaseCard item={item} key={item.reference} />)}</div>
    <aside className="case-education"><p className="mini-label">Jak czytać rezultaty</p><h3>Porównuj zmianę, ale pytaj o plan</h3><p>Podobny efekt wizualny może wynikać z różnych metod. Zdjęcia warto oceniać razem z opisem zakresu leczenia, datą wykonania i informacją o kontroli.</p></aside>
    <div className="case-grid">{cases.slice(16).map((item) => <CaseCard item={item} key={item.reference} />)}</div>
    <InPageLeadCta title="Chcesz sprawdzić możliwości dla swojego uśmiechu?" text="Każdy przypadek jest inny. Opisz krótko swoją sytuację, aby rozpocząć wstępną ocenę możliwości leczenia." buttonLabel="Sprawdź mój przypadek" location="before_after_cases_final" caseReference="before-after20" formEnabled={formEnabled} final />
  </section>;
}
