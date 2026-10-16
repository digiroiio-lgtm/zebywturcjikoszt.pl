import { YouTubeShortsCarousel } from "./youtube-shorts-carousel";
import { shortsThumbnailsLocal, shortsVideos } from "@/lib/shorts";
import { SITE_URL } from "@/lib/site";

const testimonials = shortsVideos.length > 0 && shortsVideos.every((video) => video.kind === "patient-testimonial");

/** Homepage section after "Akdeniz Dental w Antalyi". Renders nothing until approved videos exist in data/shorts.json. */
export function PatientStoriesSection() {
  if (shortsVideos.length === 0) return null;
  const items = shortsVideos.map(({ id, url, title, description, thumbnail }) => ({ id, url, title, description, thumbnail }));
  // VideoObject only where valid metadata exists: upload date and a thumbnail that is self-hosted (so the URL is ours and stable).
  const schema = shortsVideos.filter((video) => video.uploadDate && video.thumbnail?.startsWith("/")).map((video) => ({
    "@context": "https://schema.org", "@type": "VideoObject", name: video.title, description: video.description, uploadDate: video.uploadDate,
    thumbnailUrl: `${SITE_URL}${video.thumbnail}`, embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`, contentUrl: video.url
  }));
  return <section className="shell section-space patient-stories" aria-labelledby="patient-stories-title">
    <div className="section-heading"><div>
      <p className="eyebrow">{testimonials ? "Opinie pacjentów" : "Filmy"}</p>
      <h2 id="patient-stories-title">{testimonials ? "Poznaj historie naszych pacjentów" : "Filmy Akdeniz Dental"}</h2></div>
      <p>{testimonials ? "Zobacz krótkie filmy, w których pacjenci Akdeniz Dental opowiadają o swoich doświadczeniach z leczenia w Antalyi." : "Zobacz krótkie filmy Akdeniz Dental z Antalyi."}</p></div>
    <YouTubeShortsCarousel videos={items} label="Filmy do przewijania" />
    <p className="shorts-note">{shortsThumbnailsLocal ? "Film ładuje się z YouTube (youtube-nocookie.com, Google) dopiero po kliknięciu Odtwórz; wcześniej nie łączymy się z YouTube." : "Miniatury pochodzą z serwerów YouTube, a sam film ładuje się z YouTube (youtube-nocookie.com, Google) dopiero po kliknięciu Odtwórz."} Wypowiedzi są doświadczeniami pojedynczych osób i nie gwarantują takiego samego wyniku u innych pacjentów.</p>
    {schema.map((item) => <script key={item.embedUrl} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }} />)}
  </section>;
}
