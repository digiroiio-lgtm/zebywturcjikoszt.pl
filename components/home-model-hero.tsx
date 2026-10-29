import Image, { getImageProps } from "next/image";

/** Homepage hero visual: clinic promo photos (model, written permission), shown as promotional material and never as patient results. */
export function HomeModelHero() {
  // A picture selects one portrait for the viewport before downloading it. Two CSS-hidden images
  // still expose both URLs; unoptimized also prevents Next from serving an appropriately sized file.
  const desktop = getImageProps({ src: "/images/hero/model-portrait.webp", alt: "Uśmiechnięta modelka na tle logo Akdeniz Dental Clinic", width: 960, height: 1200, sizes: "(min-width: 1180px) 460px, 40vw" }).props;
  const mobile = getImageProps({ src: "/images/hero/model-chair.webp", alt: "Uśmiechnięta modelka w fotelu w klinice Akdeniz Dental, z lusterkiem z logo kliniki", width: 720, height: 900, sizes: "(max-width: 760px) calc(100vw - 28px), 40vw" }).props;
  return <figure className="home-model-hero">
    <div className="home-model-frame">
      <picture>
        <source media="(min-width: 761px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
        <img {...mobile} alt="Uśmiechnięta modelka w klinice Akdeniz Dental" className="home-model-main" />
      </picture>
      <Image className="home-model-card home-model-card-top" src="/images/hero/model-chair-card.webp" alt="Modelka z lusterkiem z logo kliniki Akdeniz Dental" width={360} height={450} sizes="(max-width: 1000px) 1px, 160px" />
      <Image className="home-model-card home-model-card-bottom" src="/images/hero/model-smile-card.webp" alt="Zbliżenie na uśmiech modelki" width={360} height={450} sizes="(max-width: 1000px) 1px, 160px" />
    </div>
    <figcaption><strong>Akdeniz Dental · Antalya, Turcja</strong><span>Zdjęcia promocyjne kliniki (modelka), nie dokumentacja leczenia pacjentów.</span></figcaption>
  </figure>;
}
