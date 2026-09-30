"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
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
  const submitting = useRef(false);
  const feedbackRef = useRef<HTMLParagraphElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (status === "sent" || status === "error") feedbackRef.current?.focus();
  }, [status]);
  function errorProps(field: string) {
    return { "aria-invalid": Boolean(fieldErrors[field]), "aria-describedby": fieldErrors[field] ? `${generatedId}-${field}-error` : undefined };
  }
  function fieldError(field: string) {
    return fieldErrors[field] ? <span id={`${generatedId}-${field}-error`} className="field-error">{fieldErrors[field]}</span> : null;
  }
  function getLeadContext() {
    const params = new URLSearchParams(window.location.search);
    return {
      lead_source: context.leadSource ?? params.get("lead_source") ?? "OGZ-PL",
      cta_location: context.ctaLocation ?? params.get("cta_location") ?? "contact_page",
      source_page_path: context.sourcePagePath ?? params.get("page_path") ?? window.location.pathname,
      landing_page: window.location.pathname,
      guide_source: params.get("guide_source") ?? "",
      case_reference: context.caseReference ?? params.get("case_reference") ?? "",
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_content: params.get("utm_content") ?? "",
      utm_term: params.get("utm_term") ?? ""
    };
  }
  function startForm() { if (!started.current) { started.current = true; trackEvent("contact_start", getLeadContext()); } }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || submitting.current || status === "sent") return;
    submitting.current = true;
    setStatus("sending");
    setErrorMessage("");
    setFieldErrors({});
    const form = event.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form)), ...getLeadContext() };
    try {
      const response = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.ok === true) {
        trackEvent("contact_submit", getLeadContext());
        setStatus("sent");
        form.reset();
      } else {
        setErrorMessage(result?.error ?? "Nie udało się wysłać zgłoszenia. Spróbuj ponownie później.");
        setFieldErrors(result?.fieldErrors ?? {});
        setStatus("error");
      }
    } catch {
      setErrorMessage("Nie udało się połączyć. Sprawdź połączenie i spróbuj ponownie.");
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }
  return (
    <form className="lead-form" aria-labelledby={titleId} aria-describedby={descriptionId} aria-busy={status === "sending"} onInvalid={(event) => {
      const field = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      const labels: Record<string, string> = { name: "Podaj imię i nazwisko.", phone: "Podaj numer telefonu.", whatsapp: "Podaj numer WhatsApp.", email: "Podaj prawidłowy adres e-mail.", country: "Wybierz kraj.", message: "Sprawdź długość wiadomości." };
      field.setCustomValidity(labels[field.name] ?? "Uzupełnij wymagane pole.");
    }} onInput={(event) => (event.target as HTMLInputElement).setCustomValidity("")} onFocus={startForm} onSubmit={submit}>
      <h2 id={titleId}>Poproś o wstępną wycenę</h2>
      <p id={descriptionId} className="consultation-intro">Opisz po polsku swoje potrzeby i poproś o wstępną wycenę. Skontaktujemy się z Tobą, aby ustalić potrzebne informacje; ostateczny plan leczenia wymaga badania przez lekarza.</p>
      <div className="form-grid" hidden={status === "sent"}>
        <label>Imię i nazwisko *<input name="name" type="text" autoComplete="name" maxLength={80} required disabled={!enabled} {...errorProps("name")} placeholder="Twoje imię i nazwisko" />{fieldError("name")}</label>
        <label>Telefon *<input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} required disabled={!enabled} {...errorProps("phone")} placeholder="np. +48 123 456 789" />{fieldError("phone")}</label>
        <label>Numer WhatsApp *<input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} required disabled={!enabled} {...errorProps("whatsapp")} placeholder="np. +48 123 456 789" />{fieldError("whatsapp")}</label>
        <label>E-mail *<input name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} required disabled={!enabled} {...errorProps("email")} placeholder="twoj@email.com" />{fieldError("email")}</label>
        <label className="full">Kraj *<select name="country" autoComplete="country-name" required disabled={!enabled} {...errorProps("country")} defaultValue=""><option value="" disabled>Wybierz swój kraj...</option>{countries.map((country) => <option key={country.code} value={country.label}>{country.label}</option>)}</select>{fieldError("country")}</label>
        <label className="full">Wiadomość<textarea name="message" maxLength={1200} rows={4} disabled={!enabled} {...errorProps("message")} placeholder="Opisz swoje oczekiwania dotyczące leczenia lub pytania, które chcesz zadać..." />{fieldError("message")}</label>
      </div>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {!enabled && <p className="form-notice"><strong>Formularz jeszcze nie przyjmuje zgłoszeń.</strong> Spróbuj ponownie później.</p>}
      {status !== "sent" && <button className="button consultation-submit" type="submit" disabled={!enabled || status === "sending"}>{status === "sending" ? "Wysyłanie…" : <>Poproś o wstępną wycenę <span aria-hidden="true">→</span></>}</button>}
      <p className="form-privacy">Zgłoszenie jest przesyłane przez Formspree. <Link href="/polityka-prywatnosci">Informacje o prywatności</Link></p>
      {status === "sent" && <><p ref={feedbackRef} tabIndex={-1} role="status" className="success">Dziękujemy! Twoje zgłoszenie zostało wysłane. Skontaktujemy się z Tobą, aby omówić Twoje potrzeby i wstępną wycenę.</p><button type="button" className="button" onClick={() => { started.current = false; setStatus("idle"); }}>Wyślij kolejne zgłoszenie</button></>}
      {status === "error" && <p ref={feedbackRef} tabIndex={-1} role="alert" className="error">{errorMessage}</p>}
    </form>
  );
}
