import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { verifiedExperts } from "@/lib/evidence";
import { SITE_URL, UPDATED_ISO_DATE, pages } from "@/lib/site";
import { reviewedPagesBy } from "@/lib/medical-review";
export const dynamicParams = false;
export function generateStaticParams() { return verifiedExperts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const expert = verifiedExperts.find((item) => item.slug === slug);
  return expert ? { title: `Lek. dent. ${expert.name} – Recenzent medyczny`, description: `Profil recenzenta medycznego serwisu: ${expert.name}, dentysta i właściciel Akdeniz Dental w Antalyi. Biografia, źródła i status recenzji treści.`, alternates: { canonical: expert.profileUrl } } : {};
}
export default async function ExpertProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const expert = verifiedExperts.find((item) => item.slug === slug);
  if (!expert) notFound();
  const reviewedPages = reviewedPagesBy(slug, UPDATED_ISO_DATE, pages);
  const schema = { "@context": "https://schema.org", "@type": "Person", "@id": `${SITE_URL}${expert.profileUrl}/#person`, name: expert.name, jobTitle: "Dentysta i recenzent medyczny serwisu", url: `${SITE_URL}${expert.profileUrl}`, description: expert.biography, knowsAbout: expert.professionalFocus, worksFor: { "@type": "Organization", name: "Akdeniz Dental", url: "https://akdenizdental.com" }, sameAs: expert.sources.map(({ url }) => url) };
  return <main className="shell expert-profile content-section">
    <nav aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link> / <Link href="/eksperci">Eksperci</Link> / {expert.name}</nav>
    <p className="eyebrow">Recenzent medyczny serwisu</p><h1>Lek. dent. {expert.name}</h1><p className="lead">Dentysta oraz założyciel i właściciel Akdeniz Dental w Antalyi, w Turcji.</p>
    <section><h2>Biografia i wykształcenie</h2><p>{expert.biography}</p></section>
    <section><h2>Doświadczenie zawodowe</h2><p>Publiczny profil kliniki opisuje go jako dentystę oraz założyciela i właściciela placówki. Dane o studiach i roli w klinice pochodzą od samej kliniki. Nie wskazują na formalnie potwierdzoną specjalizację stomatologiczną.</p></section>
    <section><h2>Obszary zainteresowania zawodowego</h2><p>Według profilu Akdeniz Dental Clinic są to:</p><ul>{expert.professionalFocus.map((focus) => <li key={focus}>{focus}</li>)}</ul><p>Są to obszary pracy opisane przez klinikę, nie tytuły specjalisty.</p></section>
    <section><h2>Rola recenzenta medycznego</h2><p>Rolą recenzenta jest ocena informacji stomatologicznych: opisów leczenia, wskazań, przeciwwskazań, ryzyka, alternatyw i opieki po zabiegu. Redakcja pozostaje autorem treści. Recenzja jest przypisywana konkretnej stronie dopiero po udokumentowaniu jej zakresu i daty.</p><Link className="text-link" href="/weryfikacja-medyczna">Jak weryfikujemy treści →</Link></section>
    <section><h2>Powiązanie z kliniką partnerską</h2><p>Mustafa Akça jest założycielem i właścicielem Akdeniz Dental, kliniki partnerskiej tego serwisu. Jest to powiązanie zawodowe i komercyjne; nie przedstawiamy go jako niezależnego recenzenta. Rola recenzenta nie oznacza gwarancji wyniku leczenia ani zastąpienia indywidualnego badania.</p></section>
    <section><h2>Publiczne źródła zawodowe</h2><p>Strona kliniki opisuje biografię i obszary pracy, a publiczne profile zawodowe podają zawód i lokalizację. Profil w serwisie Teeth Done in Turkey opisuje rolę recenzenta na tamtej stronie; nie potwierdza recenzji treści tego serwisu. Źródła nie stanowią rekomendacji naszego serwisu. Ostatnia aktualizacja źródeł: <time dateTime={expert.lastVerified}>{expert.lastVerified}</time>.</p><ul>{expert.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></section>
    <section><h2>Zweryfikowane treści</h2>{reviewedPages.length > 0 ? <ul>{reviewedPages.map((page) => <li key={page.slug}><Link href={`/${page.slug}`}>{page.title}</Link></li>)}</ul> : <p>Lista zweryfikowanych artykułów pojawi się po potwierdzeniu daty recenzji. Sam profil lekarza nie oznacza, że sprawdził treść danej strony.</p>}</section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
