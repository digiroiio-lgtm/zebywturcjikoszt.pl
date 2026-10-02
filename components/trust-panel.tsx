import Link from "next/link";
import type { VerifiedExpert } from "@/lib/evidence";
import { siteMedicalReviewer } from "@/lib/evidence";
import type { ReviewState } from "@/lib/medical-review";
import { PUBLISHED_ISO_DATE } from "@/lib/site";
import type { HistoryEntry } from "@/lib/page-history";

function polishDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export function TrustPanel({ review, reviewer, published = PUBLISHED_ISO_DATE, history = [] }: { review: ReviewState; reviewer: VerifiedExpert | null; published?: string; history?: HistoryEntry[] }) {
  const reviewed = reviewer && review.reviewStatus === "reviewed";
  const stale = !reviewer && review.reviewStatus === "reviewed";
  const status = reviewed ? "Treść zweryfikowana medycznie" : stale ? "Recenzja: wymaga ponownego potwierdzenia po aktualizacji" : review.reviewStatus === "review-pending" ? "Recenzja: oczekuje na potwierdzenie daty" : "Recenzja: jeszcze nieprzeprowadzona";
  return <aside className="trust-panel" aria-label="Informacje o treści">
    <p className="trust-reviewer"><span className="mini-label">{reviewed ? "Recenzja medyczna tej strony" : "Recenzent medyczny serwisu"}</span><Link href={reviewed ? reviewer.profileUrl : siteMedicalReviewer.profileUrl}>Lek. dent. {reviewed ? reviewer.name : siteMedicalReviewer.name}</Link><br />Akdeniz Dental, Antalya{reviewed && <><br />Zweryfikowano: <time dateTime={review.reviewDate}>{polishDate(review.reviewDate)}</time></>}</p>
    <details className="trust-details">
      <summary><span className="mini-label">Informacje o treści</span><span className="trust-summary-status">{status}</span><span className="trust-summary-action">Autor, daty i zasady weryfikacji</span></summary>
      <div className="trust-panel-body">
        <dl>
          <div><dt>Autor</dt><dd>Redakcja serwisu</dd></div>
          <div><dt>Publikacja</dt><dd>{polishDate(published)}</dd></div>
          <div><dt>Aktualizacja</dt><dd>{polishDate(review.lastUpdated)}</dd></div>
          {reviewed ? <div><dt>Weryfikacja medyczna</dt><dd><Link href={reviewer.profileUrl}>Lek. dent. {reviewer.name}</Link><br />Dentysta, Antalya<br />Treść zweryfikowana pod kątem informacji stomatologicznych.<br />Zweryfikowano: {polishDate(review.reviewDate)}</dd></div> : <div><dt>Recenzja medyczna</dt><dd>{stale && review.reviewStatus === "reviewed" ? `Poprzednia recenzja z ${polishDate(review.reviewDate)} nie obejmuje zmian z ${polishDate(review.lastUpdated)}. Oczekuje na ponowne potwierdzenie.` : review.reviewStatus === "review-pending" ? "Data recenzji jest w trakcie potwierdzania." : "Jeszcze nieprzeprowadzona"}</dd></div>}
        </dl>
        {history.length > 0 && <><p className="mini-label">Historia zmian</p><ul>{history.map((entry) => <li key={entry.date + entry.note}><time dateTime={entry.date}>{polishDate(entry.date)}</time>: {entry.note}</li>)}</ul></>}
        <p>Treść informacyjna. O kwalifikacji i planie leczenia decyduje lekarz po badaniu.</p>
        <Link href="/weryfikacja-medyczna">Jak weryfikujemy treści</Link> · <Link href="/polityka-redakcyjna">Standard redakcyjny</Link>
      </div>
    </details>
  </aside>;
}
