import { guideMarkdown, markdownSlugs } from "@/lib/ai-content";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return markdownSlugs.map((slug) => ({ slug: slug.split("/") }));
}

/** Markdown twin of a patient page, served as `/<slug>.md` (rewrite in next.config.ts). Not indexed: the HTML page stays canonical. */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const slug = (await params).slug.join("/");
  const body = guideMarkdown(slug);
  if (!body) return new Response("Not found", { status: 404 });
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Language": "pl",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "Link": `<${SITE_URL}/${slug}>; rel="canonical"`,
      "X-Robots-Tag": "noindex, follow"
    }
  });
}
