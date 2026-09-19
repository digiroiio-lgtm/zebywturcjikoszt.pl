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
        <label>Jakiego leczenia szukasz?<select name="treatment" required disabled={!enabled} onChange={() => trackEvent("treatment_selected")}><option value="">Wybierz</option><option>Implanty</option><option>Licówki</option><option>Cała szczęka</option><option>All-on-4</option><option>Inne / nie wiem</option></select></label>
        <label>Preferowany kontakt<select name="contactMethod" required disabled={!enabled}><option value="">Wybierz</option><option>Telefon</option><option>WhatsApp</option><option>E-mail</option></select></label>
        <label className="full">Krótko opisz, czego potrzebujesz<textarea name="message" maxLength={1200} rows={4} disabled={!enabled} placeholder="Bez załączników i szczegółowej dokumentacji medycznej." /></label>
        <label>Imię<input name="name" autoComplete="name" maxLength={80} required disabled={!enabled} /></label>
        <label>Telefon, WhatsApp lub e-mail<input name="contact" autoComplete="email" maxLength={160} required disabled={!enabled} /></label>
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
