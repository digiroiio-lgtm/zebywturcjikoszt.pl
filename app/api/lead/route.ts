import { NextRequest, NextResponse } from "next/server";

const allowedTreatments = new Set(["Implanty", "Licówki", "Cała szczęka", "All-on-4", "Inne / nie wiem"]);
const allowedMethods = new Set(["Telefon", "WhatsApp", "E-mail"]);

export async function POST(request: NextRequest) {
  const endpoint = process.env.LEAD_WEBHOOK_URL;
  if (!endpoint) return NextResponse.json({ error: "Formularz nie jest aktywny." }, { status: 503 });
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ error: "Nieprawidłowe źródło." }, { status: 403 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || body.website) return NextResponse.json({ ok: true });
  const treatment = String(body.treatment ?? "");
  const contactMethod = String(body.contactMethod ?? "");
  const name = String(body.name ?? "").trim();
  const contact = String(body.contact ?? "").trim();
  const message = String(body.message ?? "").trim();
  const consent = body.consent === "on";
  if (!allowedTreatments.has(treatment) || !allowedMethods.has(contactMethod) || !name || !contact || !consent || name.length > 80 || contact.length > 160 || message.length > 1200) return NextResponse.json({ error: "Sprawdź wymagane pola." }, { status: 400 });
  const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.LEAD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify({ treatment, contactMethod, name, contact, message, consent: true, source: "zebywturcjikoszt.pl" }), cache: "no-store" });
  if (!response.ok) return NextResponse.json({ error: "Nie udało się przekazać zgłoszenia." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
