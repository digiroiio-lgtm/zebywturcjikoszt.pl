import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const aiAndSearchBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot", "DuckAssistBot", "Amazonbot", "MistralAI-User", "Meta-ExternalAgent", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...aiAndSearchBots.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] }))
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
