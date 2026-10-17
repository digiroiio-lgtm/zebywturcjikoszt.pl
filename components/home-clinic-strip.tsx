import Image from "next/image";
import Link from "next/link";

/**
 * Mobile-only strip of clean clinic photos. Only photos already audited and published elsewhere on the site are used
 * (docs/visual-asset-audit.md): no patients, no wall artwork. Hidden on desktop by CSS; images are lazy so hidden ones are never fetched.
 */
const photos = [
  { src: "/images/klinika/portfolio-02b.webp", width: 1200, height: 1000, alt: "Recepcja kliniki Akdeniz Dental w Antalyi: lada z logo i strefa pierwszego kontaktu" },
  { src: "/images/klinika/clinic-3.jpeg", width: 770, height: 770, alt: "Wejście do kliniki Akdeniz Dental w Antalyi ze szklanymi drzwiami i tablicą z nazwą" },
  { src: "/images/klinika/portfolio-05b.webp", width: 1200, height: 1000, alt: "Gabinet Akdeniz Dental z niebieskim fotelem stomatologicznym i dużymi oknami" },
  { src: "/images/klinika/clinic-6.jpeg", width: 770, height: 770, alt: "Poczekalnia Akdeniz Dental z narożną sofą i oknami na miasto" },
  { src: "/images/klinika/portfolio-04b.webp", width: 1200, height: 1000, alt: "Gabinet Akdeniz Dental z czerwonym fotelem stomatologicznym i lampą zabiegową" },
  { src: "/images/klinika/clinic-4.jpeg", width: 770, height: 770, alt: "Strefa wypoczynkowa Akdeniz Dental z logo zęba z palmą na ścianie" },
  { src: "/images/klinika/portfolio-06b.jpeg", width: 1200, height: 1000, alt: "Jasny gabinet Akdeniz Dental z fotelem stomatologicznym i biurkiem" },
  { src: "/images/klinika/clinic-5.jpeg", width: 770, height: 770, alt: "Recepcja Akdeniz Dental z podświetlonym logo i marmurową ladą" }
];

export function HomeClinicStrip() {
  return <section className="shell clinic-strip" aria-labelledby="home-clinic-strip-title">
    <div className="clinic-strip-head"><h2 id="home-clinic-strip-title">Zajrzyj do kliniki w Antalyi</h2><span aria-hidden="true">Przesuń →</span></div>
    <ul className="clinic-strip-track" tabIndex={0} aria-label="Zdjęcia kliniki, przewijane poziomo">
      {photos.map((photo) => <li key={photo.src}>
        <Link href="/o-nas" className="clinic-strip-card"><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="112px" loading="lazy" /></Link>
      </li>)}
    </ul>
    <p className="clinic-strip-link"><Link className="text-link" href="/o-nas">Zobacz klinikę <span aria-hidden="true">→</span></Link></p>
    <p className="clinic-strip-note">Zdjęcia przedstawiają wnętrza kliniki Akdeniz Dental w Antalyi.</p>
  </section>;
}
