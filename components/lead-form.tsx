"use client";

import Link from "next/link";
import { FormEvent, useId, useRef, useState } from "react";
import { countries } from "@/lib/countries";
import { trackEvent } from "./tracked-link";

export type LeadContext = {
  leadSource?: string;
  ctaLocation?: string;
  sourcePagePath?: string;
  caseReference?: string;
};

export function LeadForm({ enabled, context = {}, headingId }: { enabled: boolean; context?: LeadContext; headingId?: string }) {
  const generatedId = useId();
  const titleId = headingId ?? `${generatedId}-consultation-title`;
  const descriptionId = `${generatedId}-consultation-description`;
  const started = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  function getLeadContext() {
    const params = new URLSearchParams(window.location.search);
    return {
      lead_source: context.leadSource ?? params.get("lead_source") ?? "OGZ-PL",
      cta_location: context.ctaLocation ?? params.get("cta_location") ?? "contact_page",
      source_page_path: context.sourcePagePath ?? params.get("page_path") ?? window.location.pathname,
      landing_page: window.location.pathname,
      case_reference: context.caseReference ?? params.get("case_reference") ?? "",
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_content: params.get("utm_content") ?? "",
      utm_term: params.get("utm_term") ?? ""
    };
  }
  function startForm() { if (!started.current) { started.current = true; trackEvent("contact_start"); } }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled) return;
    setStatus("sending");
    const form = event.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form)), ...getLeadContext() };
    try {
      const response = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (response.ok) { trackEvent("contact_submit"); setStatus("sent"); form.reset(); } else { setStatus("error"); }
    } catch { setStatus("error"); }
  }
  return (
    <form className="lead-form" aria-labelledby={titleId} aria-describedby={descriptionId} onFocus={startForm} onSubmit={submit}>
      <h2 id={titleId}>Poproś o bezpłatną konsultację</h2>
      <p id={descriptionId} className="consultation-intro">Wypełnij formularz, a skontaktujemy się z Tobą w ciągu 24 godzin, aby umówić bezpłatną konsultację telefoniczną, przez rozmowę wideo lub WhatsApp.</p>
      <div className="form-grid">
        <label>Imię i nazwisko *<input name="name" type="text" autoComplete="name" maxLength={80} required disabled={!enabled} placeholder="Twoje imię i nazwisko" /></label>
        <label>Telefon *<input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} required disabled={!enabled} placeholder="np. +48 123 456 789" /></label>
        <label>Numer WhatsApp *<input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} required disabled={!enabled} placeholder="np. +48 123 456 789" /></label>
        <label>E-mail *<input name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} required disabled={!enabled} placeholder="twoj@email.com" /></label>
        <label className="full">Kraj *<select name="country" autoComplete="country-name" required disabled={!enabled} defaultValue=""><option value="" disabled>Wybierz swój kraj...</option>{countries.map((country) => <option key={country.code} value={country.label}>{country.label}</option>)}</select></label>
        <label className="full">Wiadomość<textarea name="message" maxLength={1200} rows={4} disabled={!enabled} placeholder="Opisz swoje oczekiwania dotyczące leczenia lub pytania, które chcesz zadać..." /></label>
      </div>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {!enabled && <p className="form-notice"><strong>Formularz jeszcze nie przyjmuje zgłoszeń.</strong> Spróbuj ponownie później.</p>}
      <button className="button consultation-submit" type="submit" disabled={!enabled || status === "sending"}>{status === "sending" ? "Wysyłanie…" : <>Poproś o bezpłatną konsultację <span aria-hidden="true">→</span></>}</button>
      <p className="form-privacy"><Link href="/polityka-prywatnosci">Informacje o prywatności</Link></p>
      {status === "sent" && <p role="status" className="success">Dziękujemy. Zgłoszenie zostało wysłane.</p>}
      {status === "error" && <p role="alert" className="error">Nie udało się wysłać zgłoszenia. Spróbuj ponownie później.</p>}
    </form>
  );
}
