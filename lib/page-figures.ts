import type { ContentFigureData } from "@/components/content-figure";
import data from "./page-figures.json";

/** slug → figures placed after the named H2 section. Checked against the built HTML by scripts/verify-figures.mjs. */
export const pageFigures = data as Record<string, ContentFigureData[]>;

export function figuresAfter(slug: string, sectionTitle: string): ContentFigureData[] {
  return (pageFigures[slug] ?? []).filter((figure) => figure.after === sectionTitle);
}
