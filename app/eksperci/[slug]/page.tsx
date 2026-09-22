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
  return expert ? { title: `Lek. dent. ${expert.name}`, description: `Dentysta w Antalyi związany z Akdeniz Dental Clinic. Źródła potwierdzające tożsamość zawodową.`, alternates: { canonical: expert.profileUrl } } : {};
}
export default async function ExpertProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const expert = verifiedExperts.find((item) => item.slug === slug);
  if (!expert) notFound();
  const reviewedPages = reviewedPagesBy(slug, UPDATED_ISO_DATE, pages);
  const schema = { "@context": "https://schema.org", "@type": "Person", "@id": `${SITE_URL}${expert.profileUrl}/#person`, name: expert.name, jobTitle: "Dentist", url: `${SITE_URL}${expert.profileUrl}/`, sameAs: expert.sources.map(({ url }) => url) };
  return <main className="shell narrow content-section">
    <nav aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link> / <Link href="/eksperci">Eksperci</Link> / {expert.name}</nav>
    <h1>Lek. dent. {expert.name}</h1><p className="lead">Dentysta w Antalyi związany z Akdeniz Dental Clinic.</p>
    <section><h2>Mustafa Akça</h2><p>{expert.biography}</p></section>
    <section><h2>Doświadczenie zawodowe</h2><p>Publiczny profil kliniki opisuje go jako dentystę oraz założyciela i właściciela placówki. Dane o studiach i roli w klinice pochodzą od samej kliniki. Nie wskazują na formalnie potwierdzoną specjalizację stomatologiczną.</p></section>
    <section><h2>Obszary zainteresowania zawodowego</h2><p>Według profilu Akdeniz Dental Clinic są to:</p><ul>{expert.professionalFocus.map((focus) => <li key={focus}>{focus}</li>)}</ul><p>Są to obszary pracy opisane przez klinikę, nie tytuły specjalisty.</p></section>
    <section><h2>Weryfikacja tożsamości zawodowej</h2><p>Tożsamość zawodowa lekarza została sprawdzona na podstawie publicznie dostępnych profili zawodowych i strony kliniki. Źródła te nie popierają ani nie rekomendują tego serwisu. Ostatnie sprawdzenie źródeł: {expert.lastVerified}.</p><ul>{expert.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></section>
    <section><h2>Zweryfikowane treści</h2>{reviewedPages.length > 0 ? <ul>{reviewedPages.map((page) => <li key={page.slug}><Link href={`/${page.slug}`}>{page.title}</Link></li>)}</ul> : <p>Lista zweryfikowanych artykułów pojawi się po potwierdzeniu daty recenzji. Sam profil lekarza nie oznacza, że sprawdził treść danej strony.</p>}</section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
