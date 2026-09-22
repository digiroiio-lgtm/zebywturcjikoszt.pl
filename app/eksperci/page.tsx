import type { Metadata } from "next";
import { verifiedExperts } from "@/lib/evidence";

export const metadata: Metadata = { title: "Eksperci", description: "Informacje o weryfikacji ekspertów serwisu.", robots: { index: false, follow: true }, alternates: { canonical: "/eksperci" } };
export default function Experts() {
  return <main className="shell narrow content-section"><h1>Eksperci</h1><p>Nie opublikowano jeszcze profili ekspertów z potwierdzonymi kwalifikacjami i udokumentowaną recenzją treści.</p>{verifiedExperts.map((expert) => <p key={expert.slug}><a href={`/eksperci/${expert.slug}`}>{expert.name}</a></p>)}</main>;
}
