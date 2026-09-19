"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { trackEvent } from "./tracked-link";

export type LeadContext = {
  leadSource?: string;
  ctaLocation?: string;
  sourcePagePath?: string;
  caseReference?: string;
};

export function LeadForm({ enabled, context = {} }: { enabled: boolean; context?: LeadContext }) {
  const started = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  function getLeadContext() {
    const params = new URLSearchParams(window.location.search);
    return {
      lead_source: context.leadSource ?? params.get("lead_source") ?? "OGZ-PL",
      cta_location: context.ctaLocation ?? params.get("cta_location") ?? "contact_page",
      source_page_path: context.sourcePagePath ?? params.get("page_path") ?? window.location.pathname,
      case_reference: context.caseReference ?? params.get("case_reference") ?? "",
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_content: params.get("utm_content") ?? "",
      utm_term: params.get("utm_term") ?? ""
    };
  }
  function startForm() { if (!started.current) { started.current = true; trackEvent("form_start", getLeadContext()); } }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled) return;
    setStatus("sending");
    const form = event.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form)), ...getLeadContext() };
    const response = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (response.ok) { trackEvent("form_submit", getLeadContext()); setStatus("sent"); form.reset(); } else { setStatus("error"); }
  }
  return (
    <form className="lead-form" onFocus={startForm} onSubmit={submit}>
      <div className="form-grid">
        <label>Imię i nazwisko *<input name="name" type="text" autoComplete="name" maxLength={80} required disabled={!enabled} /></label>
        <label>Telefon *<input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} required disabled={!enabled} placeholder="np. +48 123 456 789" /></label>
        <label>Numer WhatsApp *<input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} required disabled={!enabled} placeholder="np. +48 123 456 789" /></label>
        <label>E-mail *<input name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} required disabled={!enabled} /></label>
        <label className="full">Kraj *<input name="country" type="text" autoComplete="country-name" maxLength={100} required disabled={!enabled} /></label>
        <label className="full">Wiadomość<textarea name="message" maxLength={1200} rows={4} disabled={!enabled} placeholder="Napisz krótko, w czym możemy pomóc." /></label>
      </div>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="consent"><input type="checkbox" name="consent" required disabled={!enabled} /> <span>Akceptuję <Link href="/polityka-prywatnosci">politykę prywatności</Link> i proszę o kontakt w sprawie mojego zapytania.</span></label>
      {!enabled && <p className="form-notice"><strong>Formularz jeszcze nie przyjmuje zgłoszeń.</strong> Czekamy na potwierdzenie administratora danych i bezpiecznego odbiorcy wiadomości.</p>}
      <button className="button" type="submit" disabled={!enabled || status === "sending"}>{status === "sending" ? "Wysyłanie…" : "Poproś o wstępną ocenę"}</button>
      {status === "sent" && <p role="status" className="success">Dziękujemy. Zgłoszenie zostało wysłane.</p>}
      {status === "error" && <p role="alert" className="error">Nie udało się wysłać zgłoszenia. Spróbuj ponownie później.</p>}
    </form>
  );
}
