import Link from "next/link";
import type { VerifiedExpert } from "@/lib/evidence";
import type { ReviewState } from "@/lib/medical-review";
import { PUBLISHED_DATE } from "@/lib/site";

function polishDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export function TrustPanel({ review, reviewer }: { review: ReviewState; reviewer: VerifiedExpert | null }) {
  const reviewed = reviewer && review.reviewStatus === "reviewed";
  const status = reviewed ? "Treść zweryfikowana medycznie" : review.reviewStatus === "review-pending" ? "Recenzja: oczekuje na potwierdzenie daty" : "Recenzja: jeszcze nieprzeprowadzona";
  return <aside className="trust-panel" aria-label="Informacje o treści">
    <details className="trust-details">
      <summary><span className="mini-label">Informacje o treści</span><span className="trust-summary-status">{status}</span><span className="trust-summary-action">Autor, daty i zasady weryfikacji</span></summary>
      <div className="trust-panel-body">
        <dl>
          <div><dt>Autor</dt><dd>Redakcja serwisu</dd></div>
          <div><dt>Publikacja</dt><dd>{PUBLISHED_DATE}</dd></div>
          <div><dt>Aktualizacja</dt><dd>{polishDate(review.lastUpdated)}</dd></div>
          {reviewed ? <div><dt>Weryfikacja medyczna</dt><dd><Link href={reviewer.profileUrl}>Lek. dent. {reviewer.name}</Link><br />Dentysta, Antalya<br />Treść zweryfikowana pod kątem informacji stomatologicznych.<br />Zweryfikowano: {polishDate(review.reviewDate)}</dd></div> : <div><dt>Recenzja medyczna</dt><dd>{review.reviewStatus === "review-pending" ? "Data recenzji jest w trakcie potwierdzania." : "Jeszcze nieprzeprowadzona"}</dd></div>}
        </dl>
        <p>Treść informacyjna. O kwalifikacji i planie leczenia decyduje lekarz po badaniu.</p>
        <Link href="/weryfikacja-medyczna">Jak weryfikujemy treści</Link> · <Link href="/polityka-redakcyjna">Standard redakcyjny</Link>
      </div>
    </details>
  </aside>;
}
