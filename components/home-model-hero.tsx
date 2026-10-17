import Image from "next/image";

/** Homepage hero visual: clinic promo photos (model, written permission), shown as promotional material and never as patient results. */
export function HomeModelHero() {
  return <figure className="home-model-hero">
    <div className="home-model-frame">
      <Image className="home-model-main" src="/images/hero/model-portrait.webp" alt="Uśmiechnięta modelka na tle logo Akdeniz Dental Clinic" width={960} height={1200} sizes="(min-width: 1180px) 460px, 40vw" unoptimized />
      <Image className="home-model-mobile" src="/images/hero/model-chair.webp" alt="Uśmiechnięta modelka w fotelu w klinice Akdeniz Dental, z lusterkiem z logo kliniki" width={720} height={900} sizes="(max-width: 760px) 360px, 1px" unoptimized />
      <Image className="home-model-card home-model-card-top" src="/images/hero/model-chair-card.webp" alt="Modelka z lusterkiem z logo kliniki Akdeniz Dental" width={360} height={450} sizes="150px" unoptimized />
      <Image className="home-model-card home-model-card-bottom" src="/images/hero/model-smile-card.webp" alt="Zbliżenie na uśmiech modelki" width={360} height={450} sizes="150px" unoptimized />
    </div>
    <figcaption><strong>Akdeniz Dental · Antalya, Turcja</strong><span>Zdjęcia promocyjne kliniki (modelka), nie dokumentacja leczenia pacjentów.</span></figcaption>
  </figure>;
}
