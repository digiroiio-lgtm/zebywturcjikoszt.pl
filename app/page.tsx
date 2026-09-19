import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";
import { CuratedCaseGallery } from "@/components/case-gallery";
import { PUBLISHED_DATE, PUBLISHED_ISO_DATE, SITE_NAME, SITE_URL, UPDATED_DATE, UPDATED_ISO_DATE } from "@/lib/site";

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
    <section className="home-hero"><div className="shell hero-grid"><div><p className="eyebrow">Przewodnik dla pacjentów z Polski</p><h1>Zęby w Turcji – możliwości leczenia i świadoma decyzja</h1><p className="hero-lead">Sprawdź dostępne kierunki leczenia, zrozum wycenę i przygotuj właściwe pytania przed konsultacją oraz wyjazdem.</p><div className="button-row"><TrackedLink href="/kontakt" event="home_assessment_cta" className="button">Sprawdź koszt swojego leczenia</TrackedLink><TrackedLink href="/jak-wybrac-klinike" event="home_clinic_guide_cta" className="text-link">Jak wybrać klinikę <span aria-hidden="true">→</span></TrackedLink></div><p className="microcopy">Bez fikcyjnych cen, opinii i obietnic rezultatu. Formularz zostanie aktywowany po potwierdzeniu bezpiecznego procesu kontaktu.</p></div><div className="hero-panel"><p className="mini-label">Zacznij od swojej potrzeby</p><ol><li><span>01</span><div><strong>Porównaj możliwości</strong><p>Implanty, licówki i pełna odbudowa mają inne wskazania.</p></div></li><li><span>02</span><div><strong>Zrozum pełny koszt</strong><p>Zakres, materiały, etapy, podróż i opieka po leczeniu.</p></div></li><li><span>03</span><div><strong>Poproś o indywidualny plan</strong><p>Ostateczna decyzja wymaga diagnostyki i konsultacji.</p></div></li></ol></div></div></section>
    <section className="shell section-space"><div className="section-heading"><div><p className="eyebrow">Ścieżki leczenia</p><h2>Znajdź właściwy punkt startu</h2></div><p>Każda strona odpowiada na inny dominujący zamiar wyszukiwania. Koszt, metoda leczenia i wybór kliniki nie są mieszane w jedną obietnicę.</p></div><div className="treatment-grid">{treatments.map((item, index) => <Link className="treatment-card" href={item.href} key={item.href}><div className="treatment-visual"><span>0{index + 1}</span><Image src={item.image} alt={item.alt} width={640} height={360} sizes="(max-width: 760px) 100vw, 360px" /></div><h3>{item.label}</h3><p>{item.text}</p><b>Przeczytaj przewodnik →</b></Link>)}</div></section>
    <section className="soft-section"><div className="shell split-section"><div><p className="eyebrow">Najpierw diagnoza</p><h2>„Nowe zęby” nie są nazwą jednego leczenia</h2><p>To samo oczekiwanie estetyczne może prowadzić do różnych planów. Czasem priorytetem jest zachowanie własnych zębów, czasem uzupełnienie braków, a czasem rozległa odbudowa. Metody nie powinny być wybierane jak gotowe pakiety.</p><Link className="text-link" href="/cala-szczeka">Zobacz możliwości pełnej odbudowy →</Link></div><div className="principles"><div><strong>Problem</strong><span>Co wymaga leczenia?</span></div><div><strong>Diagnoza</strong><span>Co można zachować?</span></div><div><strong>Możliwości</strong><span>Jakie są alternatywy?</span></div><div><strong>Plan</strong><span>Jakie są etapy i koszty?</span></div></div></div></section>
    <CuratedCaseGallery />
    <section className="shell section-space"><div className="section-heading"><div><p className="eyebrow">Przed decyzją</p><h2>Sprawdź więcej niż efekt na zdjęciu</h2></div></div><div className="decision-grid"><Link href="/opinie"><span>Opinie</span><h3>Jak odróżnić doświadczenie pacjenta od reklamy</h3><p>Lista sygnałów wiarygodności i czerwonych flag.</p></Link><Link href="/przed-i-po"><span>Przed i po</span><h3>Jak odpowiedzialnie oceniać metamorfozy</h3><p>Zdjęcie nie pokazuje diagnozy, funkcji ani trwałości.</p></Link><Link href="/jak-wybrac-klinike"><span>Klinika</span><h3>Co zweryfikować przed wpłatą</h3><p>Lekarz, podmiot, plan, materiały i opieka po powrocie.</p></Link></div></section>
    <section className="closing-cta"><div className="shell narrow"><p className="eyebrow">Wstępna ocena</p><h2>Sprawdź, jakie informacje są potrzebne do wyceny</h2><p>Przygotuj krótki opis potrzeby. Nie wysyłaj zdjęć ani dokumentacji przez niepotwierdzone kanały.</p><TrackedLink href="/kontakt" event="home_bottom_cta" className="button button-light">Poproś o plan leczenia</TrackedLink></div></section>
    <section className="shell editorial-strip"><p><strong>Autor:</strong> Redakcja serwisu</p><p><strong>Publikacja:</strong> {PUBLISHED_DATE}</p><p><strong>Ostatnia aktualizacja:</strong> {UPDATED_DATE}</p><p><strong>Recenzja medyczna:</strong> jeszcze nieprzeprowadzona</p><Link href="/polityka-redakcyjna">Standard redakcyjny</Link></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      name: "Zęby w Turcji – możliwości leczenia i świadoma decyzja",
      url: SITE_URL,
      inLanguage: "pl-PL",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      author: { "@type": "Organization", name: `Redakcja serwisu ${SITE_NAME}`, url: `${SITE_URL}/o-nas` },
      datePublished: PUBLISHED_ISO_DATE,
      dateModified: UPDATED_ISO_DATE
    }) }} />
  </main>;
}
