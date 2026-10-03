import { NextRequest, NextResponse } from "next/server";

function validPhone(value: string) {
  return /^[+\d][\d\s().-]{6,39}$/.test(value) && value.replace(/\D/g, "").length >= 7;
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  if (process.env.CONTACT_FORM_ENABLED === "false") return NextResponse.json({ error: "Formularz nie jest aktywny." }, { status: 503 });
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ error: "Nieprawidłowe źródło." }, { status: 403 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ error: "Nieprawidłowe zgłoszenie." }, { status: 400 });
  if (body.website) return NextResponse.json({ ok: true });
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const whatsapp = String(body.whatsapp ?? "").trim();
  const email = String(body.email ?? "").trim();
  const country = String(body.country ?? "").trim();
  const message = String(body.message ?? "").trim();
  const channels = ["whatsapp", "phone", "email"];
  const topics = ["implants", "veneers", "crowns", "full-arch", "other"];
  const topic = topics.includes(String(body.topic ?? "")) ? String(body.topic) : "";
  const preferredChannel = channels.includes(String(body.preferred_channel ?? "")) ? String(body.preferred_channel) : "";
  const leadSource = String(body.lead_source ?? "OGZ-PL").slice(0, 40);
  const ctaLocation = String(body.cta_location ?? "contact_page").slice(0, 80);
  const sourcePagePath = String(body.source_page_path ?? "/kontakt").slice(0, 160);
  const guideSource = String(body.guide_source ?? "").slice(0, 160);
  const landingPage = String(body.landing_page ?? "/kontakt").slice(0, 160);
  const caseReference = String(body.case_reference ?? "").slice(0, 80);
  const utmSource = String(body.utm_source ?? "").slice(0, 120);
  const utmMedium = String(body.utm_medium ?? "").slice(0, 120);
  const utmCampaign = String(body.utm_campaign ?? "").slice(0, 160);
  const utmContent = String(body.utm_content ?? "").slice(0, 160);
  const utmTerm = String(body.utm_term ?? "").slice(0, 160);
  const fieldErrors: Record<string, string> = {};
  if (!name || name.length > 80) fieldErrors.name = "Podaj imię i nazwisko (maksymalnie 80 znaków).";
  // At least one way to reach the patient is required; every value that is provided must be valid.
  if (phone && !validPhone(phone)) fieldErrors.phone = "Podaj prawidłowy numer telefonu z numerem kierunkowym.";
  if (whatsapp && !validPhone(whatsapp)) fieldErrors.whatsapp = "Podaj prawidłowy numer WhatsApp z numerem kierunkowym.";
  if (email && (!validEmail(email) || email.length > 254)) fieldErrors.email = "Podaj prawidłowy adres e-mail.";
  const contacts: Record<string, string> = { whatsapp, phone, email };
  if (!phone && !whatsapp && !email) fieldErrors[preferredChannel || "contact"] = "Podaj numer WhatsApp, telefonu lub adres e-mail, abyśmy mogli odpowiedzieć.";
  else if (preferredChannel && !contacts[preferredChannel]) fieldErrors[preferredChannel] = "Uzupełnij wybrany sposób kontaktu.";
  if (!country || country.length > 100) fieldErrors.country = "Wybierz kraj.";
  if (message.length > 1200) fieldErrors.message = "Wiadomość może zawierać maksymalnie 1200 znaków.";
  if (Object.keys(fieldErrors).length) return NextResponse.json({ error: "Sprawdź zaznaczone pola.", fieldErrors }, { status: 400 });

  try {
    const response = await fetch("https://formspree.io/f/mvkgleln", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Preserve the verified site origin for Formspree's domain restrictions.
        Referer: `${request.nextUrl.origin}/`
      },
      body: JSON.stringify({
        name, phone, whatsapp, email, country, message, topic, preferred_channel: preferredChannel,
        ...(email ? { _replyto: email } : {}),
        _subject: "Nowe zapytanie o konsultację | leczeniezebowwturcji.pl",
        contact: (preferredChannel && contacts[preferredChannel]) || whatsapp || phone || email, contact_requested: true, source: "leczeniezebowwturcji.pl",
        lead_source: leadSource, cta_location: ctaLocation, page_path: sourcePagePath,
        guide_source: guideSource, source_page_path: sourcePagePath, landing_page: landingPage, case_reference: caseReference,
        utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign,
        utm_content: utmContent, utm_term: utmTerm
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000)
    });
    if (response.status === 429) return NextResponse.json({ error: "Zbyt wiele zgłoszeń. Odczekaj kilka minut i spróbuj ponownie." }, { status: 429 });
    if (!response.ok) return NextResponse.json({ error: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie później." }, { status: 502 });
    const result = await response.json().catch(() => null);
    // Formspree's React client recognises a `next` URL as its success receipt.
    const confirmed = !result?.error && !result?.errors?.length && (result?.ok === true || typeof result?.next === "string");
    if (!confirmed) return NextResponse.json({ error: "Nie otrzymaliśmy potwierdzenia wysłania. Spróbuj ponownie później." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Nie udało się połączyć. Sprawdź połączenie i spróbuj ponownie." }, { status: 502 });
  }
}
