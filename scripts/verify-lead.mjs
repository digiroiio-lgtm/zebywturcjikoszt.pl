import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";
import { NextRequest } from "next/server.js";

// Exercise the actual route with mocked outbound delivery; never send test leads.
const source = await readFile(new URL("../app/api/lead/route.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;
const require = createRequire(import.meta.url);
const origin = "https://leczeniezebowwturcji.pl";
const lead = {
  name: "Test Contact", phone: "+48 123 456 789", whatsapp: "+48 123 456 789",
  email: "test@example.com", country: "Polska", message: "",
  lead_source: "OGZ-PL", cta_location: "before_after_cases_final",
  guide_source: "/poradniki/calkowity-koszt-wyjazdu", source_page_path: "/przed-i-po", landing_page: "/kontakt", case_reference: "before-after20",
  utm_source: "google", utm_medium: "cpc", utm_campaign: "consultation"
};

async function submit(body, { env = {}, requestOrigin = origin, upstream, rawBody } = {}) {
  const calls = [];
  const routeModule = { exports: {} };
  const sandbox = {
    module: routeModule, exports: routeModule.exports, require, AbortSignal,
    process: { env },
    fetch: async (url, options) => {
      calls.push({ url, options });
      return upstream ? upstream() : Response.json({ ok: true, next: "/thanks" });
    }
  };
  vm.runInNewContext(compiled, sandbox);
  const request = new NextRequest(`${origin}/api/lead`, {
    method: "POST", headers: { "Content-Type": "application/json", Origin: requestOrigin },
    body: rawBody ?? JSON.stringify(body)
  });
  const response = await routeModule.exports.POST(request);
  return { status: response.status, result: await response.json(), calls };
}

const accepted = await submit(lead);
assert.equal(accepted.status, 200);
assert.equal(accepted.result.ok, true);
assert.equal(accepted.calls.length, 1);
assert.equal(accepted.calls[0].url, "https://formspree.io/f/mvkgleln");
assert.equal(accepted.calls[0].options.headers.Accept, "application/json");
assert.equal(accepted.calls[0].options.headers.Referer, `${origin}/`);
assert.ok(accepted.calls[0].options.signal instanceof AbortSignal);
const payload = JSON.parse(accepted.calls[0].options.body);
for (const field of Object.keys(lead)) assert.equal(payload[field], lead[field]);
assert.equal(payload.source, "leczeniezebowwturcji.pl");
assert.equal(payload.page_path, lead.source_page_path);
assert.equal(payload.contact_requested, true);
assert.ok(payload._subject.includes("leczeniezebowwturcji.pl"));
// This is the success shape recognised by Formspree's official React client.
assert.equal((await submit(lead, { upstream: () => Response.json({ next: "https://formspree.io/thanks" }) })).status, 200);

for (const body of [null, [], "invalid", { ...lead, email: "bad" }, { ...lead, phone: "123" }, { ...lead, whatsapp: "abc" }, { ...lead, name: "" }, { ...lead, country: "" }, { ...lead, message: "x".repeat(1201) }]) {
  const invalid = await submit(body);
  assert.equal(invalid.status, 400);
  assert.equal(invalid.calls.length, 0);
}
assert.equal((await submit(lead, { rawBody: "{" })).status, 400);
const validation = await submit({ ...lead, email: "bad" });
assert.ok(validation.result.fieldErrors.email);
const spam = await submit({ ...lead, website: "https://spam.example" });
assert.equal(spam.status, 200);
assert.equal(spam.calls.length, 0);
const foreignOrigin = await submit(lead, { requestOrigin: "https://other.example" });
assert.equal(foreignOrigin.status, 403);
assert.equal(foreignOrigin.calls.length, 0);
const disabled = await submit(lead, { env: { CONTACT_FORM_ENABLED: "false" } });
assert.equal(disabled.status, 503);
assert.equal(disabled.calls.length, 0);
const legacy = await submit(lead, { env: { LEAD_WEBHOOK_URL: "https://old.example", LEAD_WEBHOOK_TOKEN: "old-token", CONTACT_PROCESS_VERIFIED: "false" } });
assert.equal(legacy.status, 200);
assert.equal(legacy.calls[0].url, "https://formspree.io/f/mvkgleln");
assert.equal(legacy.calls[0].options.headers.Authorization, undefined);

for (const upstream of [
  () => Response.json({ error: "Rejected" }, { status: 400 }),
  () => Response.json({ error: "Unavailable" }, { status: 503 }),
  () => Response.json({ ok: false }),
  () => Response.json({ next: "/thanks", errors: [{ message: "Rejected" }] }),
  () => new Response("<html>Not a delivery receipt</html>"),
  () => { throw new Error("Network failure"); },
  () => { throw new DOMException("Timeout", "TimeoutError"); }
]) {
  const failed = await submit(lead, { upstream });
  assert.equal(failed.status, 502);
  assert.equal(failed.result.ok, undefined);
  assert.ok(failed.result.error);
}
assert.equal((await submit(lead, { upstream: () => Response.json({}, { status: 429 }) })).status, 429);
console.log("Lead delivery checks passed: payload, attribution, validation, spam, origin, disabled state, rejection, rate limit and network/timeout failures.");
