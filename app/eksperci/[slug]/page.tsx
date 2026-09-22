import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { verifiedExperts } from "@/lib/evidence";
import { SITE_URL } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() { return verifiedExperts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const expert = verifiedExperts.find((item) => item.slug === slug);
  return expert ? { title: expert.name, description: expert.biography, alternates: { canonical: `/eksperci/${slug}` } } : {};
}
export default async function ExpertProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const expert = verifiedExperts.find((item) => item.slug === slug);
  if (!expert) notFound();
  const schema = { "@context": "https://schema.org", "@type": "Person", "@id": `${SITE_URL}/eksperci/${slug}#person`, name: expert.name, jobTitle: expert.professionalTitle, url: `${SITE_URL}/eksperci/${slug}`, sameAs: [expert.verificationUrl] };
  return <main className="shell narrow content-section"><h1>{expert.name}</h1><p>{expert.professionalTitle}</p><p>{expert.biography}</p><p><a href={expert.verificationUrl}>Potwierdzenie kwalifikacji</a></p><p>Ostatnia weryfikacja: {expert.lastVerified}</p><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></main>;
}
