import Image from "next/image";
import Link from "next/link";
import { caseImages } from "@/lib/gallery";

/** Mobile-only strip of existing before/after photos (the same files and labels as /przed-i-po). Hidden on desktop by CSS. */
const cases = caseImages.slice(0, 8);

export function HomeHeroCases() {
  return <div className="hero-cases">
    <div className="hero-cases-head"><h2>Efekty leczenia naszych pacjentów</h2><span aria-hidden="true">Przesuń →</span></div>
    <ul className="hero-cases-track" tabIndex={0} aria-label="Zdjęcia przed i po, przewijane poziomo">
      {cases.map((item) => <li key={item.reference}>
        <Link href={`/przed-i-po#${item.reference}`} className="hero-case">
          <Image src={item.src} alt={`${item.label}: uśmiech przed i po leczeniu`} width={84} height={84} sizes="84px" loading="lazy" />
          <span className="hero-case-tags" aria-hidden="true"><b>PRZED</b><b>PO</b></span>
        </Link>
      </li>)}
    </ul>
    <p className="hero-cases-link"><Link className="text-link" href="/przed-i-po">Zobacz metamorfozy pacjentów <span aria-hidden="true">→</span></Link></p>
    <p className="hero-cases-note">Efekty są indywidualne i nie gwarantują takiego samego rezultatu u innych osób.</p>
  </div>;
}
