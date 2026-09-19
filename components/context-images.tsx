import Image from "next/image";

export function AntalyaJourneyImages() {
  return <figure className="context-image-panel">
    <div className="context-image-copy"><p className="mini-label">Plan podróży</p><h3>Antalya jest częścią logistyki, nie planu medycznego</h3><p>Lot i pobyt warto organizować dopiero po potwierdzeniu harmonogramu wizyt, marginesu na kontrolę oraz sposobu kontaktu po powrocie.</p></div>
    <div className="context-image-grid">
      <Image src="/images/diagrams/setp-03.jpeg" alt="Samolot nad wybrzeżem w regionie Antalyi" width={240} height={240} sizes="(max-width: 760px) 50vw, 240px" />
      <Image src="/images/diagrams/setp-04.jpeg" alt="Wybrzeże i zabudowa Antalyi" width={240} height={240} sizes="(max-width: 760px) 50vw, 240px" />
    </div>
  </figure>;
}

export function ClinicTeamImage() {
  return <figure className="context-image-panel context-image-panel-single">
    <div className="context-image-copy"><p className="mini-label">Weryfikacja zespołu</p><h3>Zdjęcie zespołu nie zastępuje sprawdzenia kwalifikacji</h3><p>Przed wpłatą poproś o imię i nazwisko lekarza prowadzącego, jego rolę w planie oraz możliwość niezależnej weryfikacji uprawnień.</p></div>
    <Image src="/images/diagrams/img-02.png" alt="Trzy osoby z zespołu stomatologicznego w gabinecie" width={588} height={712} sizes="(max-width: 760px) 100vw, 320px" />
  </figure>;
}
