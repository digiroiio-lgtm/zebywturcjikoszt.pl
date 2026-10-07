// Usage: node scripts/verify-live.mjs [origin]   (default: https://leczeniezebowwturcji.pl)
// Read-only checks of a deployed site: canonical host, robots, sitemap, AI text files, social images, redirects, IndexNow key and headers.
import { readFile } from "node:fs/promises";
import path from "node:path";

const origin = (process.argv[2] ?? "https://leczeniezebowwturcji.pl").replace(/\/+$/, "");
const url = new URL(origin);
const local = ["localhost", "127.0.0.1"].includes(url.hostname);
const results = [];
const check = (name, ok, detail = "") => { results.push({ name, ok, detail }); console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`); };
const get = (target, init = {}) => fetch(target, { redirect: "manual", headers: { "User-Agent": "seo-verify/1.0" }, ...init });

const home = await get(`${origin}/`);
const html = await home.text();
check("home returns 200", home.status === 200, String(home.status));
const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
check("canonical host matches the site origin (NEXT_PUBLIC_SITE_URL)", local ? !!canonical : !!canonical && new URL(canonical).origin === origin, canonical ?? "missing");
// Against localhost the built-in site origin differs from the request origin, so absolute URLs are mapped back to it.
const site = local && canonical ? new URL(canonical).origin : origin;
const reach = (u) => u.replace(site, origin);
check("HSTS header", local || !!home.headers.get("strict-transport-security"));
check("no accidental noindex on home", !/<meta name="robots" content="[^"]*noindex/.test(html));

if (!local) {
  const http = await get(`http://${url.host}/`);
  check("http redirects to https", [301, 307, 308].includes(http.status) && (http.headers.get("location") ?? "").startsWith("https://"), `${http.status} ${http.headers.get("location") ?? ""}`);
  const alt = url.hostname.startsWith("www.") ? url.hostname.slice(4) : `www.${url.hostname}`;
  const other = await get(`https://${alt}/`).catch(() => null);
  check(`${alt} redirects to ${url.hostname}`, !!other && [301, 307, 308].includes(other.status) && new URL(other.headers.get("location") ?? "", `https://${alt}`).hostname === url.hostname, other ? `${other.status} ${other.headers.get("location") ?? ""}` : "unreachable");
}

const robots = await (await get(`${origin}/robots.txt`)).text();
for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "OAI-SearchBot", "Google-Extended"]) check(`robots.txt allows ${bot}`, robots.includes(`User-Agent: ${bot}`));
check("robots.txt lists the sitemap on this origin", robots.includes(`Sitemap: ${site}/sitemap.xml`));
check("robots.txt omits the unsupported Host directive", !/^Host:/im.test(robots));

const sitemap = await (await get(`${origin}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !/\.(webp|jpe?g|png|svg)$/i.test(u));
check("sitemap has only this origin", urls.length > 0 && urls.every((u) => new URL(u).origin === site), `${urls.length} urls`);
check("sitemap has image entries", sitemap.includes("image:loc"));
let badPages = [];
for (const u of urls) {
  const r = await get(reach(u)); const body = r.status === 200 ? await r.text() : "";
  if (r.status !== 200 || /<meta name="robots" content="[^"]*noindex/.test(body) || r.headers.get("x-robots-tag")?.includes("noindex")) badPages.push(`${u} -> ${r.status}`);
}
check("every sitemap URL is 200 and indexable", badPages.length === 0, badPages.slice(0, 3).join("; "));

for (const file of ["llms.txt", "llms-full.txt", "content-provenance.json", "clinic-verification.json"]) {
  const r = await get(`${origin}/${file}`);
  check(`/${file} is 200 without noindex`, r.status === 200 && !r.headers.get("x-robots-tag"), `${r.status} x-robots-tag=${r.headers.get("x-robots-tag") ?? "none"}`);
}

const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
const og = ogImage ? await get(reach(ogImage)) : null;
check("og:image resolves as an image", !!og && og.status === 200 && (og.headers.get("content-type") ?? "").startsWith("image/"), ogImage ?? "missing");
for (const p of ["/icon", "/apple-icon", "/manifest.webmanifest"]) check(`${p} is 200`, (await get(`${origin}${p}`)).status === 200);
const favicon = await get(`${origin}/favicon.ico`);
const faviconTarget = new URL(favicon.headers.get("location") ?? "", origin);
const faviconImage = [301, 308].includes(favicon.status) && faviconTarget.href === `${origin}/icon` ? await get(faviconTarget.href) : favicon;
check("/favicon.ico resolves to a real image", faviconImage.status === 200 && (faviconImage.headers.get("content-type") ?? "").startsWith("image/"), `${favicon.status} -> ${faviconImage.status}`);

const moved = await get(`${origin}/images/diagrams/team-2.jpeg`);
check("legacy image path redirects permanently", [301, 308].includes(moved.status) && (moved.headers.get("location") ?? "").includes("/images/zespol/team-2.jpeg"), `${moved.status} ${moved.headers.get("location") ?? ""}`);

const indexnow = (await readFile(path.join(process.cwd(), "scripts", "indexnow.mjs"), "utf8")).match(/const KEY = "([a-f0-9]+)"/)?.[1];
if (indexnow) { const r = await get(`${origin}/${indexnow}.txt`); check("IndexNow key file is served", r.status === 200 && (await r.text()).trim() === indexnow); }

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed against ${origin}`);
process.exit(failed.length ? 1 : 0);
