import { priceCsv } from "@/lib/price-dataset";

export const dynamic = "force-static";

export function GET() {
  return new Response(priceCsv(), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Language": "pl", "Content-Disposition": 'inline; filename="cennik-kliniki.csv"', "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" } });
}
