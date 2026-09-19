import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "./tracked-link";

type CaseAsset = { reference: string; src: string; label: string };

const cases: CaseAsset[] = Array.from({ length: 20 }, (_, index) => {
  const number = index + 1;
  return {
    reference: `before-after${number}`,
    src: `/images/diagrams/before-after${number}.webp`,
    label: `Przykładowa metamorfoza ${String(number).padStart(2, "0")}`
  };
});

function assessmentHref(location: string, pagePath: string, caseReference?: string) {
  const params = new URLSearchParams({ lead_source: "OGZ-PL", cta_location: location, page_path: pagePath });
  if (caseReference) params.set("case_reference", caseReference);
  return `/kontakt?${params.toString()}`;
}

function CaseCard({ item, priority = false }: { item: CaseAsset; priority?: boolean }) {
  return <figure className="case-card">
    <Image src={item.src} alt="Porównanie uśmiechu przed i po leczeniu stomatologicznym" width={700} height={700} sizes="(max-width: 760px) calc(100vw - 28px), (max-width: 1100px) 45vw, 360px" priority={priority} />
    <figcaption><strong>{item.label}</strong><span>Zakres zastosowanego leczenia nie został opisany w metadanych obrazu.</span></figcaption>
  </figure>;
}

function CaseCta({ title, label, location, caseReference }: { title: string; label: string; location: string; caseReference?: string }) {
  return <aside className="case-cta">
    <div><p className="mini-label">Indywidualna ocena</p><h3>{title}</h3><p>Fotografia pokazuje zmianę wizualną, ale nie diagnozę, zgryz, stan kości ani długoterminowe rokowanie.</p></div>
    <TrackedLink href={assessmentHref(location, "/przed-i-po", caseReference)} event="visual_assessment_cta" tracking={{ lead_source: "OGZ-PL", cta_location: location, case_reference: caseReference ?? "" }} className="button">{label}</TrackedLink>
  </aside>;
}

export function CuratedCaseGallery() {
  const featured = [cases[0], cases[6], cases[18]];
  return <section className="shell section-space visual-proof" aria-labelledby="visual-proof-title">
    <div className="section-heading"><div><p className="eyebrow">Przykładowe rezultaty</p><h2 id="visual-proof-title">Zobacz przykładowe metamorfozy</h2></div><p>Materiały pokazują zmianę wyglądu uśmiechu. Nie potwierdzają metody leczenia ani tego, czy podobny plan będzie odpowiedni dla innej osoby.</p></div>
    <div className="case-grid case-grid-featured">{featured.map((item) => <CaseCard item={item} key={item.reference} />)}</div>
    <div className="visual-proof-actions"><Link className="text-link" href="/przed-i-po">Zobacz więcej przypadków <span aria-hidden="true">→</span></Link><TrackedLink href={assessmentHref("home_visual_proof", "/")} event="home_visual_assessment_cta" tracking={{ lead_source: "OGZ-PL", cta_location: "home_visual_proof" }} className="button">Poproś o wstępną ocenę</TrackedLink></div>
  </section>;
}

export function BeforeAfterCaseHub() {
  return <section className="case-hub" aria-labelledby="case-hub-title">
    <div className="case-hub-heading"><p className="eyebrow">Biblioteka wizualna</p><h2 id="case-hub-title">Przykładowe metamorfozy</h2><p>Rezultaty różnią się między pacjentami. Zdjęcia nie pozwalają ustalić kwalifikacji do leczenia; potrzebne są diagnostyka i konsultacja.</p></div>
    <div className="case-grid">{cases.slice(0, 4).map((item) => <CaseCard item={item} key={item.reference} />)}</div>
    <CaseCta title="Zastanawiasz się, jakie możliwości dotyczą Twojego przypadku?" label="Poproś o wstępną ocenę" location="before_after_cases_1_4" caseReference="before-after4" />
    <div className="case-grid">{cases.slice(4, 10).map((item) => <CaseCard item={item} key={item.reference} />)}</div>
    <CaseCta title="Chcesz poznać możliwy zakres leczenia i elementy wyceny?" label="Sprawdź swój przypadek" location="before_after_cases_5_10" caseReference="before-after10" />
    <div className="case-grid">{cases.slice(10).map((item) => <CaseCard item={item} key={item.reference} />)}</div>
    <CaseCta title="Zdjęcie to początek pytań, nie gotowy plan leczenia" label="Przejdź do wstępnej oceny" location="before_after_cases_final" caseReference="before-after20" />
  </section>;
}
