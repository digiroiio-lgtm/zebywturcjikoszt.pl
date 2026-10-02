import Image from "next/image";
import { CREDENTIAL_KIND_LABEL, credentialRows, type OfficialCredential } from "@/lib/credentials";

/** Renders nothing until entries have been verified against official documents (lib/credentials.ts). */
export function CredentialList({ credentials, heading = "Dokumenty i wpisy rejestrowe", compact = false }: { credentials: OfficialCredential[]; heading?: string; compact?: boolean }) {
  if (!credentials.length) return null;
  const Heading = compact ? "h3" : "h2";
  return <section className={compact ? "credential-list credential-list-compact" : "content-section credential-list"} id={compact ? undefined : "dokumenty"}>
    <Heading>{heading}</Heading>
    {credentials.map((credential) => <article className="info-card" key={credential.id}>
      <p className="mini-label">{CREDENTIAL_KIND_LABEL[credential.kind]}</p>
      <h3>{credential.title}</h3>
      <dl>{credentialRows(credential).map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
      {credential.verifyUrl && <a className="text-link" href={credential.verifyUrl} target="_blank" rel="noopener noreferrer">Sprawdź w rejestrze →</a>}
      {credential.document && !compact && <Image src={credential.document.src} alt={credential.document.alt} width={credential.document.width} height={credential.document.height} sizes="(max-width: 760px) 100vw, 480px" loading="lazy" />}
    </article>)}
  </section>;
}
