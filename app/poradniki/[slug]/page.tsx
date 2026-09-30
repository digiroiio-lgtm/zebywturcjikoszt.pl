import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { newGuides } from "@/lib/guides";
import { PageTemplate } from "@/components/page-template";
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(newGuides).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const page = newGuides[slug]; if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/${page.slug}` }, robots: { index: true, follow: true }, openGraph: { title: page.title, description: page.description, url: `/${page.slug}`, type: "article" }, twitter: { card: "summary", title: page.title, description: page.description } };
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const page = newGuides[slug]; if (!page) notFound(); return <PageTemplate page={page} formEnabled={process.env.CONTACT_FORM_ENABLED !== "false"} guide />; }
