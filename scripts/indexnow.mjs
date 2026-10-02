// Usage: node scripts/indexnow.mjs [--dry]
// Submits every sitemap URL to IndexNow (Bing, Yandex and other participating engines). Run after a production deploy.
import { readFile } from "node:fs/promises";
import path from "node:path";

const KEY = "eacf7c7863924702d17d32acd6039ad3";
const dry = process.argv.includes("--dry");
const sitemap = await readFile(path.join(process.cwd(), ".next", "server", "app", "sitemap.xml.body"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (!urls.length) throw new Error("No URLs found. Run npm run build first.");
const origin = new URL(urls[0]).origin;
const payload = { host: new URL(origin).host, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList: urls };
if (dry) {
  console.log(JSON.stringify(payload, null, 2));
} else {
  const response = await fetch("https://api.indexnow.org/IndexNow", { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify(payload) });
  console.log(`IndexNow: HTTP ${response.status} for ${urls.length} URL(s)`);
  if (!response.ok && response.status !== 202) process.exit(1);
}
