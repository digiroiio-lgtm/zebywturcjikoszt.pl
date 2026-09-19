import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/page-template";
import { pages } from "@/lib/site";

export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/${page.slug}` }, robots: page.noindex ? { index: false, follow: true } : { index: true, follow: true }, openGraph: { title: page.title, description: page.description, url: `/${page.slug}`, locale: "pl_PL", type: "article" } };
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  return <PageTemplate page={page} formEnabled={Boolean(process.env.LEAD_WEBHOOK_URL)} />;
}
