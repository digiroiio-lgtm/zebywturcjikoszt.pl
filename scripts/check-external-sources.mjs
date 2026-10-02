// Usage: node scripts/check-external-sources.mjs [--dry]
// Collects every external link from the visible source lists of the built pages (.next/server/app) and checks that each still resolves.
// Not part of `npm run verify`: it needs network access and external sites can be flaky. Run it weekly (see .github/workflows/maintenance.yml).
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const dry = process.argv.includes("--dry");
const root = path.join(process.cwd(), ".next", "server", "app");

async function htmlFiles(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map(async (entry) => entry.isDirectory() ? htmlFiles(path.join(directory, entry.name), `${prefix}${entry.name}/`) : entry.name.endsWith(".html") && !entry.name.startsWith("_") ? [`${prefix}${entry.name}`] : []));
  return groups.flat();
}

const links = new Map();
for (const file of await htmlFiles(root)) {
  const html = await readFile(path.join(root, file), "utf8");
  const block = html.match(/id="zrodla">(.*?)<\/section>/s)?.[1] ?? "";
  for (const [, href] of block.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    const url = href.replaceAll("&amp;", "&");
    if (!links.has(url)) links.set(url, []);
    links.get(url).push(`/${file.replace(/\.html$/, "").replace(/^index$/, "")}`);
  }
}

console.log(`${links.size} external source link(s) on ${new Set([...links.values()].flat()).size} page(s)`);
if (dry) { for (const [url, pages] of links) console.log(`${url}  <- ${pages.join(", ")}`); process.exit(0); }

const failures = [];
for (const [url, pages] of links) {
  let status = 0;
  for (const method of ["HEAD", "GET"]) {
    try {
      const response = await fetch(url, { method, redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (compatible; source-check/1.0)" }, signal: AbortSignal.timeout(20000) });
      status = response.status;
      if (response.ok) break;
    } catch { status = 0; }
  }
  const ok = status >= 200 && status < 400;
  // 401/403/429 usually mean bot protection, not a dead link: report as a warning.
  const warn = [401, 403, 429].includes(status);
  console.log(`${ok ? "OK  " : warn ? "WARN" : "FAIL"}  ${status}  ${url}`);
  if (!ok && !warn) failures.push(`${url} (${status || "no response"}) used on ${pages.join(", ")}`);
}
if (failures.length) { console.error(`\n${failures.length} broken source link(s):\n- ${failures.join("\n- ")}`); process.exit(1); }
console.log("\nAll external source links resolved.");
