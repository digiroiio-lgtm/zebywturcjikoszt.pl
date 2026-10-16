import config from "@/data/shorts.json";
import { allThumbnailsLocal, approvedVideos, type ShortsConfig } from "./youtube-shorts.mjs";

const preview = process.env.SHORTS_PREVIEW === "1" && process.env.NODE_ENV !== "production" && !process.env.VERCEL;
export const shortsVideos = approvedVideos(config as ShortsConfig, preview);
export const shortsThumbnailsLocal = allThumbnailsLocal(shortsVideos);

/** Homepage text changes when approved videos change, so its sitemap lastmod follows this date (only once a video is shown). */
export const shortsUpdatedIsoDate: string | null = shortsVideos.length > 0 && !preview ? config.updatedOn : null;
