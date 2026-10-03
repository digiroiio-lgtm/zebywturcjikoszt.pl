import { CLINIC_TIME_ZONE_NOTE, openingHours, serviceLanguages } from "@/lib/clinic-hours";

/** Opening hours and service languages of the clinic. The same data feeds the clinic JSON-LD and the form assurance lines. */
export function OpeningHours() {
  return <section className="content-section opening-hours" id="godziny-otwarcia">
    <h2>Godziny otwarcia kliniki i języki obsługi</h2>
    <div className="table-wrap"><table><caption>Godziny otwarcia kliniki Akdeniz Dental w Antalyi ({CLINIC_TIME_ZONE_NOTE})</caption><thead><tr><th scope="col">Dni</th><th scope="col">Godziny</th></tr></thead><tbody>{openingHours.map((row) => <tr key={row.days}><th scope="row">{row.days}</th><td>{row.opens ? `${row.opens.replace(/^0/, "")} – ${row.closes}` : "Nieczynne"}</td></tr>)}</tbody></table></div>
    <p className="opening-hours-note">Godziny podano w czasie tureckim. W Polsce jest to o godzinę wcześniej w czasie letnim i o dwie godziny wcześniej w zimowym, w Wielkiej Brytanii o dwie godziny wcześniej latem i o trzy zimą. Godziny otwarcia nie są terminem odpowiedzi na zapytanie z formularza.</p>
    <p><strong>Języki obsługi:</strong> {serviceLanguages.map((language) => language.label).join(", ")}.</p>
  </section>;
}
