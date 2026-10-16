import config from "@/data/shorts.json";
import { allThumbnailsLocal, approvedVideos, type ShortsConfig } from "./youtube-shorts.mjs";

const preview = process.env.SHORTS_PREVIEW === "1" && process.env.NODE_ENV !== "production" && !process.env.VERCEL;
export const shortsVideos = approvedVideos(config as ShortsConfig, preview);
export const shortsThumbnailsLocal = allThumbnailsLocal(shortsVideos);
