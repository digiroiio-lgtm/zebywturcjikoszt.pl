import Link from "next/link";
import { guideCards } from "@/lib/guides";
import { TrackedLink } from "./tracked-link";

const guideHrefs = [
  "/poradniki/leczenie-zebow-w-turcji",
  "/poradniki/licowki-czy-korony",
  "/poradniki/calkowity-koszt-wyjazdu",
  "/poradniki/pakiety-leczenia-zebow",
  "/poradniki/tureckie-zeby",
  "/poradniki/rankingi-klinik-dentystycznych-w-turcji"
];

const ukLinks = [
  { href: "/uk/jak-zaplacic-za-leczenie-zebow-w-turcji", key: "payment", title: "Jak zapłacić za leczenie mieszkając w UK", text: "Sposoby płatności, ich ryzyka i pytania, które warto zadać przed wpłatą." },
  { href: "/uk/ceny-leczenia-zebow-w-turcji-w-funtach", key: "gbp_prices", title: "Ceny leczenia w funtach (GBP)", text: "Pozycje cennika kliniki przeliczone na funty, z datą i źródłem kursu." },
  { href: "/uk/szkocja", key: "scotland", title: "Polacy w Szkocji", text: "Co ustalić przed wyjazdem na leczenie do Antalyi, mieszkając w Szkocji." }
];

/** Plain internal links from the home page to the long guides and the UK pages, so crawlers and readers reach them in one click. */
export function HomeGuidesUk() {
  const guides = guideHrefs.map((href) => guideCards.find((card) => card.href === href)).filter((card): card is (typeof guideCards)[number] => Boolean(card));
  return <section className="shell section-space home-guides" aria-labelledby="home-guides-title">
    <div className="section-heading"><div><p className="eyebrow">Rehberler</p><h2 id="home-guides-title">Poradniki przed decyzją o wyjeździe</h2></div><p>Szczegółowe poradniki o kosztach całego wyjazdu, pakietach, wyborze metody leczenia i ocenie ryzyka. Wszystkie są informacją edukacyjną; plan leczenia ustala lekarz po badaniu.</p></div>
    <ul className="home-guide-list">{guides.map((card) => <li key={card.href}>
      <TrackedLink href={card.href} event="home_guide_click" tracking={{ cta_location: "home_guides", destination_path: card.href }} className="home-guide-card"><strong>{card.title}</strong><span>{card.description}</span><b aria-hidden="true">→</b></TrackedLink>
    </li>)}</ul>
    <div className="button-row"><Link className="text-link" href="/poradniki">Zobacz wszystkie poradniki →</Link></div>
    <div className="home-uk" aria-labelledby="home-uk-title">
      <p className="eyebrow">Polacy w Wielkiej Brytanii</p>
      <h3 id="home-uk-title">Mieszkasz w UK? Zacznij tutaj</h3>
      <ul className="home-guide-list">{ukLinks.map((entry) => <li key={entry.key}>
        <TrackedLink href={entry.href} event="home_uk_click" tracking={{ cta_location: `home_uk_${entry.key}`, destination_path: entry.href }} className="home-guide-card"><strong>{entry.title}</strong><span>{entry.text}</span><b aria-hidden="true">→</b></TrackedLink>
      </li>)}</ul>
      <div className="button-row"><Link className="text-link" href="/uk">Wszystko dla Polaków w UK →</Link></div>
    </div>
  </section>;
}
