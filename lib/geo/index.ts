import locationsFile from "@/data/geo/uk/locations.json";
import { publishedGeoPages, previewGeoPages } from "./workflow";
import type { GeoCountry, GeoLocation, GeoPageRecord } from "./types";
import type { PageContent } from "../site";

export const geoCountries = locationsFile.countries as GeoCountry[];
export const geoLocations = locationsFile.locations as GeoLocation[];
export { publishedGeoPages, previewGeoPages, geoPreviewEnabled } from "./workflow";

const withNoindex = (record: GeoPageRecord): PageContent => ({ ...record.content!, slug: record.slug, noindex: true });
/** Pages published into the site. Empty until a human moves a record through every gate. */
const shortSlug = (record: GeoPageRecord) => record.slug.replace(/^uk\//, "");
export const publishedGeoContent: Record<string, PageContent> = Object.fromEntries(publishedGeoPages.map((record) => [shortSlug(record), { ...record.content!, slug: record.slug }]));
/** Local-only drafts (GEO_PREVIEW=1), rendered noindex and absent from the sitemap and llms files. */
export const previewGeoContent: Record<string, PageContent> = Object.fromEntries(previewGeoPages.map((record) => [shortSlug(record), withNoindex(record)]));
