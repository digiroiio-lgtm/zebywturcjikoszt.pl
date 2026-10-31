import { directoryListings } from "./directory-listings";

/** Five vertical screenshots of the clinic's Instagram profile (before/after smiles and patients after treatment), cropped to the feed and recompressed to WebP. */
export const SMILE_GALLERY_WIDTH = 560;
export const SMILE_GALLERY_HEIGHT = 990;

export type SmileGalleryImage = { n: string; alt: string };

/** The SEO audit requires 25 to 125 characters. */
const alt = (part: number) => `Instagram kliniki Akdeniz Dental: uśmiechy pacjentów przed i po leczeniu (część ${part} z 5)`;

export const smileGalleryImages: SmileGalleryImage[] = [1, 2, 3, 4, 5].map((part) => ({ n: `0${part}`, alt: alt(part) }));

/** The clinic's own profile, confirmed by the owner (lib/directory-listings.ts). */
export const SMILE_GALLERY_INSTAGRAM_URL = directoryListings.find((listing) => listing.id === "instagram" && listing.verified)?.url;
