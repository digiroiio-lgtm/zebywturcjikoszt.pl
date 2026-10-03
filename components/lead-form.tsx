"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { countries } from "@/lib/countries";
import { contactPromiseLines } from "@/lib/contact-promise";
import { contactChannels, leadTopics, topicFromPath, type ContactChannelId } from "@/lib/lead-options";
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
  const [channel, setChannel] = useState<ContactChannelId>("whatsapp");
  const [contactValue, setContactValue] = useState("");
  const [topic, setTopic] = useState("");
  const [sentChannel, setSentChannel] = useState<ContactChannelId>("whatsapp");
  const channelConfig = contactChannels.find((item) => item.id === channel)!;
  const promiseLines = contactPromiseLines();
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
  function startForm() {
    if (started.current) return;
    started.current = true;
    const leadContext = getLeadContext();
    if (!topic) setTopic(topicFromPath(leadContext.source_page_path));
    trackEvent("contact_start", leadContext);
  }
  function chooseChannel(next: ContactChannelId) {
    if (next === channel) return;
    // A number stays when switching between WhatsApp and phone; an e-mail address never carries over.
    if (next === "email" || channel === "email") setContactValue("");
    setFieldErrors({});
    setChannel(next);
    trackEvent("contact_channel_select", { preferred_channel: next });
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || submitting.current || status === "sent") return;
    submitting.current = true;
    setStatus("sending");
    setErrorMessage("");
    setFieldErrors({});
    const form = event.currentTarget;
    const entries = Object.fromEntries(new FormData(form));
    const data = { name: entries.name, country: entries.country, message: entries.message, website: entries.website, [channelConfig.field]: contactValue.trim(), preferred_channel: channel, topic, ...getLeadContext() };
    try {
      const response = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.ok === true) {
        trackEvent("contact_submit", { ...getLeadContext(), preferred_channel: channel, topic });
        setSentChannel(channel);
        setStatus("sent");
        form.reset();
        setContactValue("");
        setTopic("");
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
      const labels: Record<string, string> = { name: "Podaj imię i nazwisko.", contact: channel === "email" ? "Podaj prawidłowy adres e-mail." : "Podaj numer telefonu z numerem kierunkowym.", country: "Wybierz kraj.", message: "Sprawdź długość wiadomości." };
      field.setCustomValidity(labels[field.name] ?? "Uzupełnij wymagane pole.");
    }} onInput={(event) => (event.target as HTMLInputElement).setCustomValidity("")} onFocus={startForm} onSubmit={submit}>
      <h2 id={titleId}>Bezpłatna indywidualna wstępna ocena</h2>
      <p id={descriptionId} className="consultation-intro">Opisz swoją sytuację i oczekiwania. Na podstawie przekazanych informacji otrzymasz bezpłatną wstępną ocenę możliwych opcji leczenia. Ostateczny plan leczenia wymaga konsultacji i badania przez lekarza.</p>
      <div className="form-grid" hidden={status === "sent"}>
        <label className="full">Imię *<input name="name" type="text" autoComplete="name" maxLength={80} required disabled={!enabled} {...errorProps("name")} placeholder="Jak mamy się do Ciebie zwracać?" />{fieldError("name")}</label>
        <fieldset className="full choice-group" disabled={!enabled}>
          <legend>Jak mamy się z Tobą skontaktować? *</legend>
          <div className="choice-chips">{contactChannels.map((item) => <label key={item.id} className="choice-chip"><input type="radio" name="preferred_channel" value={item.id} checked={channel === item.id} onChange={() => chooseChannel(item.id)} /><span>{item.label}</span></label>)}</div>
        </fieldset>
        <label className="full">{channelConfig.inputLabel} *<input key={channelConfig.id} name="contact" type={channelConfig.inputType} inputMode={channelConfig.inputType === "email" ? "email" : "tel"} autoComplete={channelConfig.inputType === "email" ? "email" : "tel"} maxLength={254} required disabled={!enabled} value={contactValue} onChange={(event) => setContactValue(event.target.value)} aria-invalid={Boolean(fieldErrors[channelConfig.field] || fieldErrors.contact)} aria-describedby={fieldErrors[channelConfig.field] || fieldErrors.contact ? `${generatedId}-contact-error` : undefined} placeholder={channelConfig.placeholder} />{(fieldErrors[channelConfig.field] || fieldErrors.contact) && <span id={`${generatedId}-contact-error`} className="field-error">{fieldErrors[channelConfig.field] ?? fieldErrors.contact}</span>}</label>
        <label className="full">Kraj *<select name="country" autoComplete="country-name" required disabled={!enabled} {...errorProps("country")} defaultValue=""><option value="" disabled>Wybierz swój kraj...</option>{countries.map((country) => <option key={country.code} value={country.label}>{country.label}</option>)}</select>{fieldError("country")}</label>
        <fieldset className="full choice-group" disabled={!enabled}>
          <legend>Czego dotyczy zapytanie? <span className="optional">(opcjonalnie)</span></legend>
          <div className="choice-chips">{leadTopics.map((item) => <label key={item.id} className="choice-chip"><input type="radio" name="topic" value={item.id} checked={topic === item.id} onChange={() => setTopic(item.id)} /><span>{item.label}</span></label>)}</div>
        </fieldset>
        <label className="full">Wiadomość <span className="optional">(opcjonalnie)</span><textarea name="message" maxLength={1200} rows={3} disabled={!enabled} {...errorProps("message")} placeholder="Opisz krótko swoją sytuację lub pytania do lekarza. Nie wysyłaj dokumentacji medycznej." />{fieldError("message")}</label>
      </div>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {!enabled && <p className="form-notice"><strong>Formularz jeszcze nie przyjmuje zgłoszeń.</strong> Spróbuj ponownie później.</p>}
      {status !== "sent" && <button className="button consultation-submit" type="submit" disabled={!enabled || status === "sending"}>{status === "sending" ? "Wysyłanie…" : <>Poproś o bezpłatną wstępną ocenę <span aria-hidden="true">→</span></>}</button>}
      {status !== "sent" && <ul className="form-assurance"><li>Bezpłatna wstępna ocena. Plan leczenia ustala lekarz po badaniu.</li><li>Nie przesyłaj dokumentacji medycznej przez formularz.</li>{promiseLines.map((line) => <li key={line}>{line}</li>)}</ul>}
      <p className="form-privacy">Zgłoszenie jest przesyłane przez Formspree. <Link href="/polityka-prywatnosci">Informacje o prywatności</Link></p>
      {status === "sent" && <div className="form-sent"><p ref={feedbackRef} tabIndex={-1} role="status" className="success">Dziękujemy! Twoje zgłoszenie zostało wysłane. Skontaktujemy się z Tobą, aby omówić Twoje potrzeby i wstępną ocenę.</p>
        <h3>Co dalej</h3>
        <ol className="next-steps"><li><strong>Przeglądamy Twój opis.</strong> Zgłoszenie trafiło do operatora serwisu.</li><li><strong>Odpowiemy przez {contactChannels.find((item) => item.id === sentChannel)!.label}.</strong>{promiseLines.length ? ` ${promiseLines.join(" ")}` : " Użyjemy sposobu kontaktu, który wskazano w formularzu."}</li><li><strong>Możesz się przygotować.</strong> Zapisz pytania do lekarza i oferty z innych klinik do porównania zakresu. Dokumentację medyczną prześlij dopiero po otrzymaniu bezpiecznego kanału.</li></ol>
        <p className="form-sent-links"><Link className="text-link" href="/poradniki/calkowity-koszt-wyjazdu">Policz koszt całego wyjazdu →</Link> <Link className="text-link" href="/listy-kontrolne">Listy kontrolne dla pacjentów →</Link></p>
        <button type="button" className="button" onClick={() => { started.current = false; setStatus("idle"); }}>Wyślij kolejne zgłoszenie</button></div>}
      {status === "error" && <p ref={feedbackRef} tabIndex={-1} role="alert" className="error">{errorMessage}</p>}
    </form>
  );
}
