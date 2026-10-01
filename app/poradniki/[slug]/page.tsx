import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { newGuides } from "@/lib/guides";
import { PageTemplate } from "@/components/page-template";
import { buildMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(newGuides).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const page = newGuides[slug]; if (!page) return {};
  return buildMetadata(page);
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const page = newGuides[slug]; if (!page) notFound(); return <PageTemplate page={page} formEnabled={process.env.CONTACT_FORM_ENABLED !== "false"} guide />; }
