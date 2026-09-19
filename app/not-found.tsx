import Link from "next/link";

export default function NotFound() {
  return <main className="not-found shell narrow"><p className="eyebrow">Błąd 404</p><h1>Nie znaleźliśmy tej strony</h1><p>Adres mógł się zmienić. Wróć do przewodnika lub przejdź do kosztów leczenia.</p><div className="button-row"><Link className="button" href="/">Strona główna</Link><Link className="text-link" href="/koszt">Koszt leczenia →</Link></div></main>;
}
