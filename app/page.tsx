import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";
import { CuratedCaseGallery } from "@/components/case-gallery";
import { PUBLISHED_DATE, PUBLISHED_ISO_DATE, SITE_URL, UPDATED_DATE, UPDATED_ISO_DATE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zęby w Turcji – leczenie, możliwości i świadomy wybór",
  description: "Przewodnik dla osób z Polski rozważających leczenie zębów w Turcji: możliwości, koszty, Antalya, wybór kliniki i przygotowanie do konsultacji.",
  alternates: { canonical: "/" }
};

const treatments = [
  { href: "/koszt", label: "Koszt leczenia", text: "Co wpływa na cenę i jak porównać pełny zakres wyceny.", image: "/images/diagrams/cost-scope.svg", alt: "Elementy pełnego kosztu leczenia" },
  { href: "/implanty", label: "Implanty", text: "Kwalifikacja, etapy, odbudowa i pytania do kliniki.", image: "/images/diagrams/implant-plan.svg", alt: "Etapy planowania leczenia implantologicznego" },
  { href: "/licowki", label: "Licówki", text: "Plan estetyczny, materiały i alternatywy dla licówek.", image: "/images/diagrams/veneer-options.svg", alt: "Porównanie metod odbudowy estetycznej" },
  { href: "/cala-szczeka", label: "Cała szczęka", text: "Dlaczego pełna odbudowa nie oznacza jednego zabiegu.", image: "/images/diagrams/full-arch-options.svg", alt: "Możliwe kierunki pełnej odbudowy" },
  { href: "/all-on-4", label: "All-on-4", text: "Na czym polega koncepcja i co decyduje o kwalifikacji.", image: "/images/diagrams/all-on-4-plan.svg", alt: "Schemat koncepcji All-on-4" },
  { href: "/antalya", label: "Leczenie w Antalyi", text: "Jak przygotować wyjazd, wizyty i opiekę po powrocie.", image: "/images/diagrams/antalya-journey.svg", alt: "Etapy wyjazdu na leczenie do Antalyi" }
];

export default function Home() {
  return <main>
    <section className="home-hero"><div className="shell hero-grid"><div><p className="eyebrow">Przewodnik dla pacjentów z Polski</p><h1>Zęby w Turcji – możliwości leczenia i świadoma decyzja</h1><p className="hero-lead">Poznaj możliwości leczenia, dowiedz się, co wpływa na cenę, i przygotuj pytania przed konsultacją oraz wyjazdem.</p><div className="button-row"><TrackedLink href="/kontakt" event="home_assessment_cta" className="button">Sprawdź koszt swojego leczenia</TrackedLink><TrackedLink href="/jak-wybrac-klinike" event="home_clinic_guide_cta" className="text-link">Jak wybrać klinikę <span aria-hidden="true">→</span></TrackedLink></div><p className="microcopy">Rzetelne informacje, bez niezweryfikowanych cen i obietnic efektu.</p></div><div className="hero-panel"><p className="mini-label">Najpierw ustal, czego potrzebujesz</p><ol><li><span>01</span><div><strong>Porównaj możliwości</strong><p>Implanty, licówki i pełna odbudowa mają inne wskazania.</p></div></li><li><span>02</span><div><strong>Zrozum pełny koszt</strong><p>Zakres, materiały, etapy, podróż i opieka po leczeniu.</p></div></li><li><span>03</span><div><strong>Zapytaj o plan leczenia</strong><p>Ostateczna decyzja wymaga diagnostyki i konsultacji.</p></div></li></ol></div></div></section>
    <section className="shell section-space"><div className="section-heading"><div><p className="eyebrow">Możliwości leczenia</p><h2>Od czego zacząć?</h2></div><p>Nie wiesz, od czego zacząć? Sprawdź informacje o kosztach, implantach, licówkach, pełnej odbudowie zębów i leczeniu w Antalyi.</p></div><div className="treatment-grid">{treatments.map((item, index) => <Link className="treatment-card" href={item.href} key={item.href}><div className="treatment-visual"><span>0{index + 1}</span><Image src={item.image} alt={item.alt} width={640} height={360} sizes="(max-width: 760px) 100vw, 360px" /></div><h3>{item.label}</h3><p>{item.text}</p><b>Przeczytaj przewodnik →</b></Link>)}</div></section>
    <section className="soft-section"><div className="shell split-section"><div><p className="eyebrow">Najpierw diagnoza</p><h2>„Nowe zęby” nie są nazwą jednego leczenia</h2><p>To samo oczekiwanie estetyczne może prowadzić do różnych planów. Czasem priorytetem jest zachowanie własnych zębów, czasem uzupełnienie braków, a czasem rozległa odbudowa. Metody nie powinny być wybierane jak gotowe pakiety.</p><Link className="text-link" href="/cala-szczeka">Zobacz możliwości pełnej odbudowy →</Link></div><div className="principles"><div><strong>Problem</strong><span>Co wymaga leczenia?</span></div><div><strong>Diagnoza</strong><span>Co można zachować?</span></div><div><strong>Możliwości</strong><span>Jakie są alternatywy?</span></div><div><strong>Plan</strong><span>Jakie są etapy i koszty?</span></div></div></div></section>
    <CuratedCaseGallery />
    <section className="shell section-space"><div className="section-heading"><div><p className="eyebrow">Przed decyzją</p><h2>Zdjęcia to tylko część informacji</h2></div></div><div className="decision-grid"><Link href="/opinie"><span>Opinie</span><h3>Jak odróżnić doświadczenie pacjenta od reklamy</h3><p>Na co zwrócić uwagę, czytając opinie.</p></Link><Link href="/przed-i-po"><span>Przed i po</span><h3>Co naprawdę pokazują zdjęcia przed i po</h3><p>Zdjęcie nie pokazuje diagnozy, funkcji ani trwałości.</p></Link><Link href="/jak-wybrac-klinike"><span>Klinika</span><h3>Co zweryfikować przed wpłatą</h3><p>Sprawdź lekarza, plan leczenia i opiekę po powrocie do Polski.</p></Link></div></section>
    <section className="closing-cta"><div className="shell narrow"><p className="eyebrow">Wstępna ocena</p><h2>Sprawdź, jakie informacje są potrzebne do wyceny</h2><p>Opisz krótko, jakie leczenie rozważasz. Zdjęcia i dokumentację medyczną przekaż dopiero bezpiecznym kanałem.</p><TrackedLink href="/kontakt" event="home_bottom_cta" className="button button-light">Zapytaj o plan leczenia</TrackedLink></div></section>
    <section className="shell editorial-strip"><p><strong>Autor:</strong> Redakcja serwisu</p><p><strong>Publikacja:</strong> {PUBLISHED_DATE}</p><p><strong>Ostatnia aktualizacja:</strong> {UPDATED_DATE}</p><p><strong>Recenzja medyczna:</strong> jeszcze nieprzeprowadzona</p><Link href="/polityka-redakcyjna">Standard redakcyjny</Link></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      name: "Zęby w Turcji – możliwości leczenia i świadoma decyzja",
      url: SITE_URL,
      inLanguage: "pl-PL",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      author: { "@id": `${SITE_URL}/#organization` },
      datePublished: PUBLISHED_ISO_DATE,
      dateModified: UPDATED_ISO_DATE
    }) }} />
  </main>;
}
