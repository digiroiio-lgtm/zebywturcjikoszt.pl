// Shared by the site (components), next.config.ts (CSP) and scripts/verify-shorts.mjs: parsing and approval rules for the homepage Shorts section.
const ID = /^[A-Za-z0-9_-]{11}$/;

/** Video ID from a Shorts, watch, youtu.be or embed URL; null when the URL is not a YouTube video URL. */
export function parseYouTubeId(input) {
  let url;
  try { url = new URL(String(input).trim()); } catch { return null; }
  const host = url.hostname.replace(/^(www|m|music)\./, "");
  let id = null;
  if (host === "youtu.be") id = url.pathname.split("/")[1];
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const parts = url.pathname.split("/").filter(Boolean);
    if (["shorts", "embed", "live", "v"].includes(parts[0])) id = parts[1];
    else if (parts[0] === "watch") id = url.searchParams.get("v");
  } else return null;
  return id && ID.test(id) ? id : null;
}

const PLACEHOLDERS = [
  { url: "https://www.youtube.com/shorts/PLACEHOLD01", title: "Przykładowy film 1 (zastępczy, do podmiany)", description: "Zastępczy opis filmu; nie jest to prawdziwa opinia pacjenta.", kind: "other" },
  { url: "https://www.youtube.com/shorts/PLACEHOLD02", title: "Przykładowy film 2 (zastępczy, do podmiany)", description: "Zastępczy opis filmu; nie jest to prawdziwa opinia pacjenta.", kind: "other" },
  { url: "https://www.youtube.com/shorts/PLACEHOLD03", title: "Przykładowy film 3 (zastępczy, do podmiany)", description: "Zastępczy opis filmu; nie jest to prawdziwa opinia pacjenta.", kind: "other" },
  { url: "https://www.youtube.com/shorts/PLACEHOLD04", title: "Przykładowy film 4 (zastępczy, do podmiany)", description: "Zastępczy opis filmu; nie jest to prawdziwa opinia pacjenta.", kind: "other" }
];

/**
 * Approved, valid videos. `preview` (SHORTS_PREVIEW=1 outside production) swaps in clearly labelled placeholders so the layout can be checked;
 * production never shows placeholders.
 */
export function approvedVideos(config, preview = false) {
  const source = preview ? PLACEHOLDERS.map((video) => ({ ...video, approved: true, consentReference: "preview" })) : config.videos ?? [];
  return source.filter((video) => video.approved === true && typeof video.consentReference === "string" && video.consentReference.trim())
    .map((video) => ({ ...video, id: parseYouTubeId(video.url) })).filter((video) => video.id);
}

/** True when every video has a self-hosted thumbnail, so nothing is requested from YouTube before Play. */
export const allThumbnailsLocal = (videos) => videos.every((video) => typeof video.thumbnail === "string" && video.thumbnail.startsWith("/"));
