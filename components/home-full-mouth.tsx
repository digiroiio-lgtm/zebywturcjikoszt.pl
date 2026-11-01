import Image from "next/image";
import Link from "next/link";
import { FINAL_PLAN_NOTE, TREATMENT_CTA } from "@/lib/cta";
import { SectionCta } from "./section-cta";

const options = [
  { href: "/all-on-4", title: "All-on-4", text: "Koncepcja odbudowy pełnołukowej na czterech implantach. Kwalifikacja zależy od warunków kostnych, zgryzu i diagnostyki.", label: "Co decyduje o kwalifikacji" },
  { href: "/cala-szczeka", title: "All-on-4, All-on-6 i inne drogi", text: "To różne koncepcje podparcia odbudowy. Większa liczba implantów sama nie przesądza o lepszym wyniku.", label: "Porównaj drogi odbudowy" },
  { href: "/koszt", title: "Cena całej szczęki", text: "Nie podajemy jednej kwoty: zależy od wariantu, liczby implantów oraz odbudowy tymczasowej i docelowej. Zobacz pozycje cennika w EUR i PLN.", label: "Cennik kliniki" }
];

/** Dedicated home entry for patients who need many teeth replaced. Names only the concepts the reviewed pages describe; no total price and no availability claims. */
export function HomeFullMouth() {
  return <section className="shell section-space home-full-mouth" aria-labelledby="home-full-mouth-title">
    <div className="home-full-mouth-grid">
      <figure className="home-full-mouth-visual"><Image src="/images/leczenie/cala-szczeka.webp" alt="Model protetyczny dolnego i górnego łuku jako przykład pełnej odbudowy uzębienia" width={800} height={450} sizes="(max-width: 900px) 100vw, 380px" loading="lazy" /></figure>
      <div>
        <p className="eyebrow">Pełna odbudowa uzębienia</p>
        <h2 id="home-full-mouth-title">Wszystkie zęby na implantach: pełna odbudowa uzębienia</h2>
        <p className="home-full-mouth-lead">Brakuje wielu zębów albo cały łuk wymaga odbudowy? To nie jest jeden zabieg: plan może obejmować implanty, korony lub odbudowę pełnołukową i zależy od diagnostyki.</p>
        <ul className="home-full-mouth-list">{options.map((option) => <li key={option.href}>
          <h3>{option.title}</h3><p>{option.text}</p><Link className="text-link" href={option.href}>{option.label} →</Link>
        </li>)}</ul>
        <div className="button-row"><SectionCta location="home_full_mouth" topic="full-arch" event="home_full_mouth_cta">{TREATMENT_CTA["/cala-szczeka"]}</SectionCta></div>
        <p className="microcopy">{FINAL_PLAN_NOTE}</p>
      </div>
    </div>
  </section>;
}
