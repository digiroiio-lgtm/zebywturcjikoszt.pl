import { newGuides } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const xml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (iso: string) => new Date(`${iso.slice(0, 10)}T00:00:00Z`).toUTCString();

/** RSS feed of the standalone patient guides, newest first. Built from the same records as the pages, so it cannot drift. */
export function GET() {
  const guides = Object.values(newGuides).sort((a, b) => (b.lastUpdated ?? "").localeCompare(a.lastUpdated ?? ""));
  const items = guides.map((guide) => `<item><title>${xml(guide.title)}</title><link>${SITE_URL}/${guide.slug}</link><guid isPermaLink="true">${SITE_URL}/${guide.slug}</guid><pubDate>${rfc822(guide.published ?? guide.lastUpdated!)}</pubDate><description>${xml(guide.description)}</description></item>`);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Zęby w Turcji: poradniki dla pacjentów</title><link>${SITE_URL}/poradniki</link><atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/><description>Poradniki dla pacjentów z Polski o leczeniu zębów w Turcji: koszty, wybór kliniki, opieka po leczeniu.</description><language>pl-PL</language><lastBuildDate>${rfc822(guides[0]?.lastUpdated ?? "2026-10-03")}</lastBuildDate>\n${items.join("\n")}\n</channel></rss>\n`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Content-Language": "pl", "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" } });
}
