import { llmsIndex } from "@/lib/ai-content";
import { AI_TEXT_HEADERS } from "@/lib/seo";
export const dynamic = "force-static";
export function GET() {
  return new Response(llmsIndex(), { headers: AI_TEXT_HEADERS });
}
