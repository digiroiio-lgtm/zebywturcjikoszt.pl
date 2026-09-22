import type { Metadata } from "next";
import Link from "next/link";
import { verifiedExperts } from "@/lib/evidence";

export const metadata: Metadata = { title: "Eksperci", description: "Profile ekspertów i źródła potwierdzające ich tożsamość zawodową oraz status recenzji treści.", alternates: { canonical: "/eksperci" } };
export default function Experts() {
  return <main className="shell narrow content-section"><h1>Eksperci</h1><p>Profile przedstawiają potwierdzone informacje o tożsamości zawodowej. Samo umieszczenie eksperta na tej stronie nie oznacza, że zrecenzował treść serwisu.</p>{verifiedExperts.map((expert) => <p key={expert.slug}><Link href={expert.profileUrl}>Lek. dent. {expert.name}</Link> · {expert.location}</p>)}</main>;
}
