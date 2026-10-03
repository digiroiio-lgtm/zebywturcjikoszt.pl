import { readFile } from "node:fs/promises";
import path from "node:path";

const appDir = path.join(process.cwd(), ".next", "server", "app");
const figures = JSON.parse(await readFile(path.join(process.cwd(), "lib", "page-figures.json"), "utf8"));
const failures = [];
const decode = (text) => text.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").trim();
let count = 0;

for (const [slug, items] of Object.entries(figures)) {
  const html = await readFile(path.join(appDir, `${slug}.html`), "utf8").catch(() => null);
  if (!html) { failures.push(`${slug}: no prerendered page for lib/page-figures.json entry.`); continue; }
  const headings = [...html.matchAll(/<h2(?:\s[^>]*)?>(.*?)<\/h2>/g)].map((match) => decode(match[1]));
  const imgs = [...html.matchAll(/<figure class="content-figure[^"]*">(.*?)<\/figure>/g)].map((match) => match[1]);
  const rendered = imgs.map((block) => {
    const tag = block.match(/<img\b[^>]*>/)?.[0] ?? "";
    const src = tag.match(/\bsrc="([^"]*)"/)?.[1] ?? "";
    return { src: decodeURIComponent(src.match(/[?&]url=([^&]+)/)?.[1] ?? src), alt: decode(tag.match(/\balt="([^"]*)"/)?.[1] ?? ""), caption: decode(block.match(/<figcaption>(.*?)<\/figcaption>/)?.[1] ?? "") };
  });
  for (const figure of items) {
    count += 1;
    if (!headings.includes(figure.after)) failures.push(`${slug}: section "${figure.after}" is not an H2 on the page, so its figure would be lost.`);
    const match = rendered.find((item) => item.src === figure.src && item.alt === figure.alt);
    if (!match) failures.push(`${slug}: figure ${figure.src} with the declared alt text is not in the built HTML.`);
    else if (match.caption !== figure.caption) failures.push(`${slug}: figure ${figure.src} has a different caption in the built HTML.`);
  }
  if (rendered.length !== items.length) failures.push(`${slug}: ${items.length} figure(s) declared, ${rendered.length} rendered.`);
}

if (failures.length) {
  console.error(`Figure check failed with ${failures.length} issue(s):`);
  for (const issue of failures) console.error(`- ${issue}`);
  process.exit(1);
}
console.log(`Figure check passed: ${count} figures on ${Object.keys(figures).length} pages.`);
