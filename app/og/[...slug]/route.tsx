import { ImageResponse } from "next/og";
import { pages } from "@/lib/site";
import { newGuides } from "@/lib/guides";
import { allUkPages } from "@/lib/uk";
import { verifiedExperts } from "@/lib/evidence";

export const dynamic = "force-static";
export const dynamicParams = false;

type Card = { slug: string; eyebrow: string; h1: string };
// Indexable pages that are not records in lib/site.ts, lib/guides.ts or lib/uk.ts but have their own metadata.
const standalone: Card[] = [
  { slug: "poradniki", eyebrow: "Poradniki dla pacjentów", h1: "Poradniki dla pacjentów z Polski" },
  { slug: "pytania-i-odpowiedzi", eyebrow: "Pytania i odpowiedzi", h1: "Pytania pacjentów o leczenie zębów w Turcji" },
  { slug: "nasi-lekarze", eyebrow: "Zespół kliniki", h1: "Nasi lekarze: zespół Akdeniz Dental w Antalyi" },
  { slug: "eksperci", eyebrow: "Recenzja medyczna", h1: "Eksperci serwisu" },
  ...verifiedExperts.map((expert) => ({ slug: `eksperci/${expert.slug}`, eyebrow: "Recenzent medyczny", h1: `Lek. dent. ${expert.name}` }))
];
const indexable: Card[] = [...[...Object.values(pages), ...Object.values(newGuides), ...allUkPages].filter((page) => !page.noindex), ...standalone];

export function generateStaticParams() {
  return indexable.map((page) => ({ slug: page.slug.split("/") }));
}

/** Social card with the page's own heading. Same visual identity as the default card in app/opengraph-image.tsx. */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = indexable.find((item) => item.slug === slug.join("/"));
  if (!page) return new Response("Not found", { status: 404 });
  const title = page.h1.length > 100 ? `${page.h1.slice(0, 97)}…` : page.h1;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#075b54", color: "#ffffff" }}>
        <div style={{ fontSize: 34, color: "#bfe6df" }}>{page.eyebrow}</div>
        <div style={{ fontSize: title.length > 60 ? 64 : 78, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, fontWeight: 700 }}>Zęby w Turcji</div>
          <div style={{ fontSize: 28, marginTop: 8, color: "#e8f4f1" }}>Serwis informacyjny dla pacjentów z Polski. Klinika prowadzona przez operatora serwisu: Akdeniz Dental, Antalya.</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
