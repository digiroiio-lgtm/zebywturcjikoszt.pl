import { priceJson } from "@/lib/price-dataset";

export const dynamic = "force-static";

export function GET() {
  return Response.json(priceJson(), { headers: { "Content-Language": "pl", "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" } });
}
