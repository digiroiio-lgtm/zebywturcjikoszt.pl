import { PRIMARY_CTA, SECTION_CTA } from "@/lib/cta";
import Image from "next/image";
import Link from "next/link";
import { InPageLeadCta } from "./in-page-lead-cta";
import { SectionCta } from "./section-cta";

import { verifiedCases, type VerifiedCase } from "@/lib/evidence";
import { caseImages } from "@/lib/gallery";
type CaseAsset = { reference: string; src: string; label: string; verified?: VerifiedCase };

const cases: CaseAsset[] = caseImages;

function CaseCard({ item, priority = false, neutralLabel }: { item: CaseAsset; priority?: boolean; neutralLabel?: string }) {
  if (neutralLabel && item.verified?.status !== "verified") return <figure className="case-card" id={item.reference}>
    <Image src={item.src} alt={`${neutralLabel}: uśmiech przed i po leczeniu`} width={700} height={700} sizes="(max-width: 760px) calc(100vw - 28px), (max-width: 1100px) 45vw, 360px" priority={priority} />
    <figcaption><strong>{neutralLabel}</strong></figcaption>
  </figure>;
  return <figure className="case-card" id={item.reference}>
    <Image src={item.src} alt={item.verified?.status === "verified" ? `${item.label}: uśmiech przed i po, ${item.verified.treatment}` : `${item.label}: uśmiech przed i po leczeniu (zakres leczenia niepotwierdzony)`} width={700} height={700} sizes="(max-width: 760px) calc(100vw - 28px), (max-width: 1100px) 45vw, 360px" priority={priority} />
    <figcaption><strong>{item.label}</strong><span>{item.verified?.status === "verified" ? item.verified.treatment : "Zakres leczenia nie został jeszcze zweryfikowany."}</span></figcaption>
  </figure>;
}

export function CuratedCaseGallery() {
  const featured = [cases[0], cases[6], cases[18]].map((item) => ({
    ...item,
    verified: verifiedCases.find((record) => record.id === item.reference && record.status === "verified" && record.consentDocumented && record.medicalVerificationDocumented),
  }));
  return <section className="shell section-space visual-proof" aria-labelledby="visual-proof-title">
    <div className="section-heading"><div><p className="eyebrow">Przykładowe rezultaty</p><h2 id="visual-proof-title">Zobacz przykładowe metamorfozy</h2></div><p>Materiały pokazują zmianę wyglądu uśmiechu. Nie potwierdzają metody leczenia ani tego, czy podobny plan będzie odpowiedni dla innej osoby.</p></div>
    <div className="case-grid case-grid-featured">{featured.map((item, index) => <CaseCard item={item} key={item.reference} neutralLabel={`Uśmiech 0${index + 1}`} />)}</div>
    <p className="visual-proof-note">Zakres leczenia nie jest potwierdzony dla każdego przypadku. Efekty są indywidualne i nie gwarantują takiego samego rezultatu.</p>
    <div className="visual-proof-actions"><Link className="text-link" href="/przed-i-po">Zobacz więcej zdjęć <span aria-hidden="true">→</span></Link><SectionCta location="home_visual_proof" topic="other">{SECTION_CTA.visualProof}</SectionCta></div>
  </section>;
}

export function BeforeAfterCaseHub({ formEnabled }: { formEnabled: boolean }) {
  return <section className="case-hub" aria-labelledby="case-hub-title">
    <div className="case-hub-heading"><p className="eyebrow">Zdjęcia przed i po</p><h2 id="case-hub-title">Przykładowe metamorfozy</h2><p>Rezultaty różnią się między pacjentami. Zdjęcia nie pozwalają ustalić kwalifikacji do leczenia; potrzebne są diagnostyka i konsultacja.</p></div>
    <div className="case-grid">{cases.slice(0, 4).map((item) => <CaseCard item={item} key={item.reference} />)}</div>
    <InPageLeadCta title="Zastanawiasz się, jakie możliwości dotyczą Twojego przypadku?" text="Opisz krótko swoją sytuację, aby rozpocząć wstępną ocenę możliwego zakresu leczenia." buttonLabel={SECTION_CTA.visualProof} formTitle="Wstępna ocena Twojego przypadku" location="before_after_cases_1_4" caseReference="before-after4" formEnabled={formEnabled} />
    <div className="case-grid">{cases.slice(4, 10).map((item) => <CaseCard item={item} key={item.reference} />)}</div>
    <InPageLeadCta title="Chcesz poznać możliwy zakres leczenia i elementy wyceny?" text="Krótki opis problemu pomoże ustalić, o co warto zapytać podczas konsultacji." buttonLabel={SECTION_CTA.visualProof} formTitle="Zapytaj o zakres leczenia i wycenę" location="before_after_cases_5_10" caseReference="before-after10" formEnabled={formEnabled} />
    <div className="case-grid">{cases.slice(10, 16).map((item) => <CaseCard item={item} key={item.reference} />)}</div>
    <aside className="case-education"><p className="mini-label">Jak czytać rezultaty</p><h3>Porównuj zmianę, ale pytaj o plan</h3><p>Podobny efekt wizualny może wynikać z różnych metod. Zdjęcia warto oceniać razem z opisem zakresu leczenia, datą wykonania i informacją o kontroli.</p></aside>
    <div className="case-grid">{cases.slice(16).map((item) => <CaseCard item={item} key={item.reference} />)}</div>
    <InPageLeadCta title="Chcesz sprawdzić możliwości dla swojego uśmiechu?" text="Każdy przypadek jest inny. Opisz krótko swoją sytuację, aby rozpocząć wstępną ocenę możliwości leczenia." buttonLabel={PRIMARY_CTA} formTitle="Rozpocznij ocenę możliwości leczenia" location="before_after_cases_final" caseReference="before-after20" formEnabled={formEnabled} final />
  </section>;
}
