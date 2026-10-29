import { citationKit } from "@/lib/clinic-facts";

export const dynamic = "force-static";

/** Machine-readable clinic data for directories, portals and editors. Built from lib/clinic-facts.ts, the same source as /dane-kliniki. */
export function GET() {
  return Response.json(citationKit(), { headers: { "Content-Language": "pl", "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" } });
}
