import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/page-template";
import { ukArticles } from "@/lib/uk";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(ukArticles).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = ukArticles[slug];
  if (!page) return {};
  return buildMetadata(page);
}

export default async function UkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = ukArticles[slug];
  if (!page) notFound();
  return <PageTemplate page={page} formEnabled={process.env.CONTACT_FORM_ENABLED !== "false"} section={{ label: "Dla Polaków w UK", href: "/uk" }} />;
}
