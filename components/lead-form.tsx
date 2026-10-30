"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { countries } from "@/lib/countries";
import { contactPromiseLines } from "@/lib/contact-promise";
import { contactChannels, leadTopics, topicFromPath, type ContactChannelId } from "@/lib/lead-options";
import { readAttribution, trackEvent } from "./tracked-link";
import { WhatsAppIcon } from "./whatsapp-icon";
import { CTA_ASSURANCE, SUBMIT_CTA, WHATSAPP_CTA, WHATSAPP_NEW_TAB } from "@/lib/cta";
import { campaigns } from "@/lib/campaigns";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { LEAD_ENGAGED_KEY, POPUP_DISMISSED_KEY, readStoredCampaign, storeCampaign, clearStoredCampaign } from "@/lib/campaign-state";

export type LeadContext = {
  leadSource?: string;
  ctaLocation?: string;
  sourcePagePath?: string;
  caseReference?: string;
};

/** The visitor sees the Polish display name; the tracking/notification label stays the campaign name. */
const campaignLabel = (name: string) => campaigns.find((item) => item.name === name)?.displayName ?? name;
const PINNED_COUNTRIES = ["Polska", "Wielka Brytania", "Niemcy"];
const orderedCountries = [...PINNED_COUNTRIES.map((label) => countries.find((country) => country.label === label)).filter((country): country is (typeof countries)[number] => Boolean(country)), ...countries.filter((country) => !PINNED_COUNTRIES.includes(country.label))];

export function LeadForm({ enabled, context = {}, headingId, heading = "Twoja bezpłatna wstępna wycena", headingLevel = "h2" }: { enabled: boolean; context?: LeadContext; headingId?: string; headingLevel?: "h2" | "h3"; heading?: string }) {
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
  const [sentInfo, setSentInfo] = useState<{ topic: string; campaign: string }>({ topic: "", campaign: "" });
  const [inModal, setInModal] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [waLink, setWaLink] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const popupRef = useRef<HTMLDialogElement>(null);
  const ctaOverride = useRef("");
  const [campaign, setCampaign] = useState("");
  const channelConfig = contactChannels.find((item) => item.id === channel)!;
  const promiseLines = contactPromiseLines();
  useEffect(() => {
    if (status === "sent" || status === "error") feedbackRef.current?.focus();
  }, [status]);
  // A "Poproś o wycenę" button elsewhere on the page can preselect the topic and name the section the visitor came from.
  useEffect(() => {
    const onTopic = (event: Event) => {
      const detail = (event as CustomEvent<{ topic?: string; cta_location?: string; campaign?: string }>).detail ?? {};
      if (detail.campaign) { setCampaign(detail.campaign); storeCampaign({ name: detail.campaign, cta_location: detail.cta_location, page_path: window.location.pathname }); }
      if (detail.topic && leadTopics.some((item) => item.id === detail.topic)) setTopic(detail.topic);
      if (detail.cta_location) ctaOverride.current = detail.cta_location;
    };
    window.addEventListener("lead-form:topic", onTopic);
    // A campaign picked on another page (popup CTA followed by a navigation) travels in sessionStorage.
    const stored = readStoredCampaign();
    if (stored?.cta_location) ctaOverride.current = stored.cta_location;
    // Opened from a treatment page: preselect the matching topic (the visitor can change it).
    const initialTopic = topicFromPath(getLeadContext().source_page_path);
    const frame = requestAnimationFrame(() => { if (stored) setCampaign(stored.name); if (initialTopic) setTopic((current) => current || initialTopic); });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("lead-form:topic", onTopic); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (popupOpen) popupRef.current?.showModal();
  }, [popupOpen]);
  function errorProps(field: string) {
    return { "aria-invalid": Boolean(fieldErrors[field]), "aria-describedby": fieldErrors[field] ? `${generatedId}-${field}-error` : undefined };
  }
  function fieldError(field: string) {
    return fieldErrors[field] ? <span id={`${generatedId}-${field}-error`} className="field-error">{fieldErrors[field]}</span> : null;
  }
  function getLeadContext() {
    const params = new URLSearchParams(window.location.search);
    const attribution = readAttribution();
    return {
      lead_source: context.leadSource ?? attribution.lead_source ?? "OGZ-PL",
      cta_location: ctaOverride.current || (context.ctaLocation ?? attribution.cta_location ?? "contact_page"),
      source_page_path: context.sourcePagePath ?? readStoredCampaign()?.page_path ?? attribution.page_path ?? window.location.pathname,
      landing_page: window.location.pathname,
      guide_source: attribution.guide_source ?? "",
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
    try { sessionStorage.setItem(LEAD_ENGAGED_KEY, "1"); } catch { /* best effort */ }
    window.dispatchEvent(new CustomEvent("lead-form:started"));
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
    const data = { name: entries.name, country: entries.country, message: entries.message, website: entries.website, [channelConfig.field]: contactValue.trim(), preferred_channel: channel, topic, ...(campaign ? { campaign } : {}), ...getLeadContext() };
    try {
      const response = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.ok === true) {
        trackEvent("contact_submit", { ...getLeadContext(), preferred_channel: channel, topic, ...(campaign ? { campaign } : {}) });
        if (campaign) trackEvent("campaign_lead_submit", { cta_location: getLeadContext().cta_location, campaign, topic });
        try { sessionStorage.setItem(LEAD_ENGAGED_KEY, "1"); localStorage.setItem(POPUP_DISMISSED_KEY, String(Date.now())); } catch { /* best effort */ }
        setSentInfo({ topic, campaign });
        clearStoredCampaign(); setCampaign("");
        // A form already inside a modal turns into the confirmation; otherwise the confirmation opens as its own dialog (never two modals).
        const host = form.closest("dialog");
        setInModal(Boolean(host));
        setPopupOpen(!host);
        setStatus("sent");
        form.reset();
        setContactValue("");
        setTopic("");
      } else {
        const fields = result?.fieldErrors ?? {};
        const hasFields = Object.keys(fields).length > 0;
        setFieldErrors(fields);
        setWaLink(!hasFields);
        setErrorMessage(hasFields ? "Sprawdź zaznaczone pola." : response.status === 429 && result?.error ? `${result.error} Możesz też napisać do nas na` : "Nie udało się wysłać formularza. Spróbuj ponownie lub napisz do nas na");
        setStatus("error");
      }
    } catch {
      setWaLink(true);
      setErrorMessage("Nie udało się wysłać formularza. Spróbuj ponownie lub napisz do nas na");
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }
  function closeSuccess() {
    if (inModal) { formRef.current?.closest("dialog")?.close(); started.current = false; setStatus("idle"); return; }
    popupRef.current?.close();
  }
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;
  const trackWhatsapp = () => trackEvent("whatsapp_click", { button_location: "form_success_popup", ...(sentInfo.topic ? { treatment: sentInfo.topic } : {}), ...(sentInfo.campaign ? { campaign: sentInfo.campaign } : {}) });
  const successBody = <div className="form-success-body">
    <h3 id={`${generatedId}-success-title`}>Dziękujemy! Twoje zapytanie zostało wysłane.</h3>
    <p>Skontaktujemy się z Tobą wybranym kanałem.</p>
    <p className="form-success-whatsapp">Chcesz skontaktować się z nami szybciej? Możesz również napisać na WhatsApp.</p>
    <div className="form-success-actions">
      <a className="whatsapp-button" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={`${WHATSAPP_CTA} ${WHATSAPP_NEW_TAB}`} onClick={trackWhatsapp}><WhatsAppIcon /><span>{WHATSAPP_CTA}</span></a>
      <button type="button" className="button button-secondary" onClick={closeSuccess}>Zamknij</button>
    </div>
  </div>;
  return (
    <form ref={formRef} className="lead-form" aria-labelledby={titleId} aria-describedby={descriptionId} aria-busy={status === "sending"} onInvalid={(event) => {
      const field = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      const labels: Record<string, string> = { name: "Podaj imię.", contact: channel === "email" ? "Podaj prawidłowy adres e-mail." : "Podaj numer telefonu z numerem kierunkowym.", country: "Wybierz kraj zamieszkania.", message: "Sprawdź długość wiadomości." };
      field.setCustomValidity(labels[field.name] ?? "Uzupełnij wymagane pole.");
    }} onInput={(event) => (event.target as HTMLInputElement).setCustomValidity("")} onFocus={startForm} onSubmit={submit}>
      {status === "sent" && inModal ? successBody : <>
      {headingLevel === "h3" ? <h3 id={titleId}>{heading}</h3> : <h2 id={titleId}>{heading}</h2>}
      <p id={descriptionId} className="consultation-intro">Podaj imię i wybierz sposób kontaktu. Skontaktujemy się z Tobą po polsku, aby omówić Twoje potrzeby i przygotowanie wstępnej wyceny.</p>
      <div className="form-grid" hidden={status === "sent"}>
        <label className="full"><span className="label-text">Imię *</span><input name="name" type="text" autoComplete="given-name" maxLength={80} required disabled={!enabled} {...errorProps("name")} placeholder="Jak mamy się do Ciebie zwracać?" />{fieldError("name")}</label>
        <fieldset className="full choice-group" disabled={!enabled}>
          <legend>Jak mamy się z Tobą skontaktować? *</legend>
          <div className="choice-chips">{contactChannels.map((item) => <label key={item.id} className="choice-chip"><input type="radio" name="preferred_channel" value={item.id} checked={channel === item.id} onChange={() => chooseChannel(item.id)} /><span>{item.label}</span></label>)}</div>
        </fieldset>
        <label className="full"><span className="label-text">{channelConfig.inputLabel} *</span><input key={channelConfig.id} name="contact" type={channelConfig.inputType} inputMode={channelConfig.inputType === "email" ? "email" : "tel"} autoComplete={channelConfig.inputType === "email" ? "email" : "tel"} maxLength={254} required disabled={!enabled} value={contactValue} onChange={(event) => setContactValue(event.target.value)} aria-invalid={Boolean(fieldErrors[channelConfig.field] || fieldErrors.contact)} aria-describedby={fieldErrors[channelConfig.field] || fieldErrors.contact ? `${generatedId}-contact-error` : undefined} placeholder={channelConfig.placeholder} />{(fieldErrors[channelConfig.field] || fieldErrors.contact) && <span id={`${generatedId}-contact-error`} className="field-error">{fieldErrors[channelConfig.field] ?? fieldErrors.contact}</span>}</label>
        <label className="full"><span className="label-text">Kraj zamieszkania *</span><select name="country" autoComplete="country-name" required disabled={!enabled} {...errorProps("country")} defaultValue=""><option value="" disabled>Wybierz kraj zamieszkania…</option>{orderedCountries.map((country) => <option key={country.code} value={country.label}>{country.label}</option>)}</select>{fieldError("country")}</label>
        <fieldset className="full choice-group" disabled={!enabled}>
          <legend>Czego dotyczy zapytanie? <span className="optional">(opcjonalnie)</span></legend>
          <div className="choice-chips">{leadTopics.map((item) => <label key={item.id} className="choice-chip"><input type="radio" name="topic" value={item.id} checked={topic === item.id} onChange={() => setTopic(item.id)} /><span>{item.label}</span></label>)}</div>
        </fieldset>
        <label className="full"><span className="label-text">Wiadomość <span className="optional">(opcjonalnie)</span></span><textarea name="message" maxLength={1200} rows={3} disabled={!enabled} {...errorProps("message")} placeholder="Co chcesz poprawić w swoim uśmiechu?" />{fieldError("message")}<span className="field-hint">Nie przesyłaj dokumentacji medycznej przez formularz.</span></label>
      </div>
      {campaign && status !== "sent" && <p className="campaign-note" data-campaign-note>Wybrana oferta: <strong>{campaignLabel(campaign)}</strong></p>}
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {!enabled && <p className="form-notice"><strong>Formularz jeszcze nie przyjmuje zgłoszeń.</strong> Spróbuj ponownie później.</p>}
      {status !== "sent" && <button className="button consultation-submit" type="submit" disabled={!enabled || status === "sending"}>{status === "sending" ? "Wysyłanie…" : <>{SUBMIT_CTA} <span aria-hidden="true">→</span></>}</button>}
      {status !== "sent" && <div className="form-assurance"><p>{CTA_ASSURANCE}</p><p>Ostateczny plan i koszt leczenia ustala lekarz po badaniu i diagnostyce.</p>{promiseLines.length > 0 && <p className="form-assurance-facts">{promiseLines.join(" ")}</p>}</div>}
      <p className="form-privacy">Zgłoszenie jest przesyłane przez Formspree. <Link href="/polityka-prywatnosci">Informacje o prywatności</Link></p>
      {status === "sent" && <div className="form-sent"><p ref={feedbackRef} tabIndex={-1} role="status" className="success">Dziękujemy! Twoje zapytanie zostało wysłane. Skontaktujemy się z Tobą wybranym kanałem.</p>
        <p className="form-sent-links"><Link className="text-link" href="/poradniki/calkowity-koszt-wyjazdu">Policz koszt całego wyjazdu →</Link> <Link className="text-link" href="/listy-kontrolne">Listy kontrolne dla pacjentów →</Link></p>
        <button type="button" className="button" onClick={() => { started.current = false; setStatus("idle"); }}>Wyślij kolejne zapytanie</button></div>}
      {status === "error" && <p ref={feedbackRef} tabIndex={-1} role="alert" className="error">{errorMessage}{waLink && <> <a className="text-link" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>.</>}</p>}
      {popupOpen && <dialog ref={popupRef} className="case-lead-dialog form-success-dialog" aria-labelledby={`${generatedId}-success-title`} onClose={() => { setPopupOpen(false); feedbackRef.current?.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) closeSuccess(); }}>
        <div className="case-lead-dialog-inner">
          <button type="button" className="dialog-close" aria-label="Zamknij" onClick={closeSuccess}>×</button>
          {successBody}
        </div>
      </dialog>}
      </>}
    </form>
  );
}
