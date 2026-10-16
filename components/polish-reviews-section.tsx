import config from "@/data/trustpilot-reviews.json";
import { sourceVerifiedReviews } from "@/lib/trustpilot-reviews.mjs";
import { PolishReviewsCarousel } from "./polish-reviews-carousel";

export function PolishReviewsSection() {
  const reviews = sourceVerifiedReviews(config);
  if (!reviews.length) return null;
  return <section className="shell home-polish-reviews" aria-labelledby="polish-reviews-title">
    <div className="section-heading"><div><p className="eyebrow">Opinie pacjentów · Akdeniz Dental</p><h2 id="polish-reviews-title">Opinie napisane po polsku</h2></div><p>Wybraliśmy pozytywne opinie w języku polskim. Przeczytaj także opinie krytyczne i pełne wypowiedzi na zewnętrznym profilu kliniki.</p></div>
    <PolishReviewsCarousel reviews={reviews} />
    <div className="polish-reviews-footer"><p>Opinie opisują indywidualne doświadczenia i nie gwarantują wyniku leczenia. Sprawdziliśmy publikację u źródła, nie przebieg leczenia. Odczyt źródeł: 17.10.2026.</p><a className="text-link" href="https://pl.trustpilot.com/review/akdenizdental.com" target="_blank" rel="noopener noreferrer">Zobacz wszystkie opinie na Trustpilot →<span className="sr-only"> (nowa karta)</span></a></div>
  </section>;
}
