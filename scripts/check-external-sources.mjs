// Usage: node scripts/check-external-sources.mjs [--dry]
// Collects every external link from the visible source lists of the built pages (.next/server/app) and checks that each still resolves.
// A link with no HTTP response at all (timeout, connection reset) is reported as "unreachable from CI" and does not fail the job; 404/410/5xx and unknown hosts do.
// Not part of `npm run verify`: it needs network access and external sites can be flaky. Run it weekly (see .github/workflows/maintenance.yml).
import { appendFile, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { checkUrl, classify } from "./source-link-status.mjs";

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
const unreachable = [];
for (const [url, pages] of links) {
  const { status, errorCode } = await checkUrl(url);
  const kind = classify(status, errorCode);
  const label = { ok: "OK  ", warn: "WARN", unreachable: "WARN", fail: "FAIL" }[kind];
  console.log(`${label}  ${status}  ${url}${errorCode ? `  (${errorCode})` : ""}`);
  if (kind === "fail") failures.push(`${url} (${status || errorCode || "no response"}) used on ${pages.join(", ")}`);
  if (kind === "unreachable") unreachable.push(`${url} (${errorCode || "no response"}) used on ${pages.join(", ")}`);
}
if (unreachable.length) {
  const note = `${unreachable.length} link(s) unreachable from this runner (no HTTP response; the host may block CI). Open them in a browser to confirm they still work:\n- ${unreachable.join("\n- ")}`;
  console.warn(`\n${note}`);
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, `### Source links unreachable from CI\n\n${unreachable.map((item) => `- ${item}`).join("\n")}\n`);
}
if (failures.length) { console.error(`\n${failures.length} broken source link(s):\n- ${failures.join("\n- ")}`); process.exit(1); }
console.log(`\nNo broken source links${unreachable.length ? ` (${unreachable.length} unreachable from CI, see above)` : ": all resolved"}.`);
