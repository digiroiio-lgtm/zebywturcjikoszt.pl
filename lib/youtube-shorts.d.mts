export type ShortsVideo = { url: string; title: string; description: string; thumbnail?: string; kind?: "patient-testimonial" | "other"; approved?: boolean; consentReference?: string; uploadDate?: string };
export type ShortsConfig = { videos: ShortsVideo[] };
export function parseYouTubeId(input: string): string | null;
export function approvedVideos(config: ShortsConfig, preview?: boolean): (ShortsVideo & { id: string })[];
export function allThumbnailsLocal(videos: ShortsVideo[]): boolean;
