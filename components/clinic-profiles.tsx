import { CLINIC_ADDRESS_TEXT, CLINIC_NAME, RATINGS_CHECKED_DATE, RATINGS_CHECKED_ISO_DATE, clinicProfiles } from "@/lib/clinic-profiles";

export function ClinicProfiles() {
  return <section className="clinic-profiles" aria-labelledby="clinic-profiles-title">
    <h2 id="clinic-profiles-title">Profile kliniki w niezależnych serwisach</h2>
    <p>{CLINIC_NAME} ma publiczne profile na zewnętrznych platformach. Poniższe oceny pochodzą z tych serwisów, odczytano je <time dateTime={RATINGS_CHECKED_ISO_DATE}>{RATINGS_CHECKED_DATE}</time> i zmieniają się w czasie. To opinie użytkowników tych platform, a nie ocena medyczna ani rekomendacja serwisu. Sprawdź aktualne dane i przeczytaj także oceny negatywne.</p>
    <ul>{clinicProfiles.map((profile) => <li key={profile.key}><a className="text-link" href={profile.href} target="_blank" rel="noopener noreferrer">{profile.label}</a>: ocena {profile.rating}/5 na podstawie {profile.reviewCount} opinii. {profile.description}</li>)}</ul>
    <p><strong>Adres kliniki</strong> według Map Google i Trustpilot: {CLINIC_ADDRESS_TEXT}.</p>
  </section>;
}
