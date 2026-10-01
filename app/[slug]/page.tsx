import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/page-template";
import { pages } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return {};
  return buildMetadata(page);
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  return <PageTemplate page={page} formEnabled={process.env.CONTACT_FORM_ENABLED !== "false"} />;
}
