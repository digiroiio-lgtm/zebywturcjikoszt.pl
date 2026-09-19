import { NextRequest, NextResponse } from "next/server";

function validPhone(value: string) {
  return /^[+\d][\d\s().-]{6,39}$/.test(value) && value.replace(/\D/g, "").length >= 7;
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  const endpoint = process.env.LEAD_WEBHOOK_URL;
  if (!endpoint) return NextResponse.json({ error: "Formularz nie jest aktywny." }, { status: 503 });
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ error: "Nieprawidłowe źródło." }, { status: 403 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || body.website) return NextResponse.json({ ok: true });
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const whatsapp = String(body.whatsapp ?? "").trim();
  const email = String(body.email ?? "").trim();
  const country = String(body.country ?? "").trim();
  const message = String(body.message ?? "").trim();
  const consent = body.consent === "on";
  const leadSource = String(body.lead_source ?? "OGZ-PL").slice(0, 40);
  const ctaLocation = String(body.cta_location ?? "contact_page").slice(0, 80);
  const sourcePagePath = String(body.source_page_path ?? "/kontakt").slice(0, 160);
  const caseReference = String(body.case_reference ?? "").slice(0, 80);
  const utmSource = String(body.utm_source ?? "").slice(0, 120);
  const utmMedium = String(body.utm_medium ?? "").slice(0, 120);
  const utmCampaign = String(body.utm_campaign ?? "").slice(0, 160);
  const utmContent = String(body.utm_content ?? "").slice(0, 160);
  const utmTerm = String(body.utm_term ?? "").slice(0, 160);
  if (!name || !validPhone(phone) || !validPhone(whatsapp) || !validEmail(email) || !country || !consent || name.length > 80 || email.length > 254 || country.length > 100 || message.length > 1200) return NextResponse.json({ error: "Sprawdź wymagane pola." }, { status: 400 });
  const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.LEAD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify({ name, phone, whatsapp, email, country, message, contact: phone, consent: true, source: "zebywturcjikoszt.pl", lead_source: leadSource, cta_location: ctaLocation, page_path: sourcePagePath, case_reference: caseReference, utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign, utm_content: utmContent, utm_term: utmTerm }), cache: "no-store" });
  if (!response.ok) return NextResponse.json({ error: "Nie udało się przekazać zgłoszenia." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
