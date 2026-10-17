import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { sourceVerifiedReviews } from "../lib/trustpilot-reviews.mjs";

const config = JSON.parse(readFileSync("data/trustpilot-reviews.json", "utf8"));
const items = sourceVerifiedReviews(config);
assert.equal(items.length, 5, "There are five verified sources, not twelve reviews");
assert(items.every((item) => !Object.hasOwn(item, "excerpt")), "No quotation permission has been documented");
assert(items.every((item) => !Object.hasOwn(item, "excerptPermissionReference")), "Do not expose permission records");
const sample = config.reviews[0];
for (const patch of [{ language: "en" }, { rating: 4 }, { sourceVerified: false }, { sourceVerified: "false" }, { author: "" }, { id: "missing" }, { sourceUrl: "https://example.com" }, { publishedAt: "unknown" }, { sourceCheckedOn: null }]) {
  assert.equal(sourceVerifiedReviews({ reviews: [{ ...sample, ...patch }] }).length, 0, JSON.stringify(patch));
}
assert.equal(sourceVerifiedReviews({ reviews: [sample, sample] }).length, 1);
assert.equal(sourceVerifiedReviews({ reviews: [{ ...sample, excerptPermissionReference: " " }] })[0].excerpt, undefined);
assert.equal(sourceVerifiedReviews({ reviews: [{ ...sample, excerptPermissionReference: "fixture-permission" }] })[0].excerpt, sample.excerpt);
const fixtures = Array.from({ length: 15 }, (_, index) => {
  const id = index.toString(16).padStart(24, "0");
  return { ...sample, id, sourceUrl: `https://pl.trustpilot.com/reviews/${id}` };
});
assert.equal(sourceVerifiedReviews({ reviews: fixtures }).length, 12);

const html = readFileSync(".next/server/app/index.html", "utf8");
const section = html.match(/<section class="shell home-polish-reviews"[\s\S]*?<\/section>/)?.[0];
assert(section);
assert.equal((section.match(/class="polish-review-card"/g) ?? []).length, 5);
assert.equal((section.match(/class="polish-review-stars"/g) ?? []).length, 5);
for (const item of items) { assert(section.includes(item.sourceUrl)); assert(section.includes(item.author)); }
for (const row of config.reviews) assert(!html.includes(row.excerpt), "Pending excerpts must not leak into HTML or hydration props");
assert(html.indexOf('aria-labelledby="home-trust-title"') < html.indexOf('aria-labelledby="polish-reviews-title"'));
assert(html.indexOf('aria-labelledby="polish-reviews-title"') < html.indexOf('aria-labelledby="home-treatments-title"'));
assert(section.includes('tabindex="0"') && section.includes('aria-describedby="polish-reviews-help"'));
assert(section.includes("Zobacz wszystkie opinie na Trustpilot"));
assert(!section.includes("<blockquote") && !section.includes("<iframe") && !section.includes("<img"));
assert(!section.includes('type="application/ld+json"'));
console.log("Reviews passed: five real source records, invalid/duplicate filtering, 12-card cap, permission gate, no draft quote leakage, SSR links and section order. Browser/Lighthouse checks are separate.");
