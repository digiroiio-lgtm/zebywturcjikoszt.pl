import { OPERATOR, operatorRows } from "@/lib/operator";
import { clinicalTeam } from "@/lib/clinical-team";
import { clinicCredentials, doctorCredentials, type OfficialCredential } from "@/lib/credentials";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const record = (credential: OfficialCredential) => ({
  id: credential.id,
  kind: credential.kind,
  title: credential.title,
  issuer: credential.issuer,
  number: credential.number ?? null,
  validFrom: credential.validFrom ?? null,
  validUntil: credential.validUntil ?? null,
  verifyUrl: credential.verifyUrl ?? null,
  checkedDate: credential.checkedDate
});

/** Machine-readable list of official documents. Only values verified from official sources appear here; no personal data of patients. */
export function GET() {
  const body = {
    operator: {
      legalName: OPERATOR.legalName ?? null,
      address: operatorRows(OPERATOR, false).find((row) => row.label === "Adres")?.value ?? null,
      taxId: OPERATOR.taxId ?? null,
      mersisNo: OPERATOR.mersisNo ?? null
    },
    clinicCredentials: clinicCredentials.map(record),
    doctors: clinicalTeam
      .filter((doctor) => doctorCredentials[doctor.slug]?.length)
      .map((doctor) => ({ name: doctor.name, profileUrl: `${SITE_URL}/nasi-lekarze#${doctor.slug}`, credentials: doctorCredentials[doctor.slug].map(record) })),
    note: "Puste listy oznaczają, że dokument nie został jeszcze zweryfikowany i opublikowany; nie oznaczają braku dokumentu."
  };
  return Response.json(body, { headers: { "Content-Language": "pl", "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" } });
}
