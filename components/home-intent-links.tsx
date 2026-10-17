import { TrackedLink } from "./tracked-link";

const entries = [
  { href: "/koszt", key: "koszt", title: "Ceny leczenia", text: "Cennik w EUR i PLN z datą i kursem oraz to, co trzeba doliczyć." },
  { href: "/przed-i-po", key: "przed_i_po", title: "Prawdziwe efekty", text: "Zdjęcia przed i po oraz jak je czytać, zanim podejmiesz decyzję." },
  { href: "/jak-wybrac-klinike", key: "klinika", title: "Jak wybrać klinikę", text: "Lista kontrolna: lekarz, plan leczenia, dokumentacja i opieka po powrocie." }
];

/** Three clear entrances to the specialised pages: prices, real results, choosing a clinic. */
export function HomeIntentLinks() {
  return <section className="home-intent" aria-labelledby="home-intent-title">
    <div className="shell">
      <h2 id="home-intent-title" className="sr-only">Zacznij od tego, co jest dla Ciebie najważniejsze</h2>
      <ul className="home-intent-list">{entries.map((entry) => <li key={entry.key}>
        <TrackedLink href={entry.href} event="home_intent_click" tracking={{ cta_location: `home_intent_${entry.key}`, destination_path: entry.href }} className="home-intent-card"><strong>{entry.title}</strong><span>{entry.text}</span><b aria-hidden="true">→</b></TrackedLink>
      </li>)}</ul>
    </div>
  </section>;
}
