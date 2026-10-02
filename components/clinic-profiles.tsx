import { CLINIC_NAME, clinicProfiles } from "@/lib/clinic-profiles";

export function ClinicProfiles() {
  return <section className="clinic-profiles" aria-labelledby="clinic-profiles-title">
    <h2 id="clinic-profiles-title">Profile kliniki w niezależnych serwisach</h2>
    <p>{CLINIC_NAME} ma publiczne profile na zewnętrznych platformach. Serwis nie przytacza ocen ani liczby opinii, bo zmieniają się w czasie. Sprawdź aktualne dane bezpośrednio na tych stronach i czytaj opinie krytycznie, także te negatywne.</p>
    <ul>{clinicProfiles.map((profile) => <li key={profile.key}><a className="text-link" href={profile.href} target="_blank" rel="noopener noreferrer">{profile.label}</a>: {profile.description}</li>)}</ul>
  </section>;
}
