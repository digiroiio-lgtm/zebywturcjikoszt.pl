import { llmsFull } from "@/lib/ai-content";
import { AI_TEXT_HEADERS } from "@/lib/seo";
export const dynamic = "force-static";
export function GET() {
  return new Response(llmsFull(), { headers: AI_TEXT_HEADERS });
}
