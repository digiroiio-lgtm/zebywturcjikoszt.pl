import type { NextConfig } from "next";
import shortsConfig from "./data/shorts.json";
import { allThumbnailsLocal, approvedVideos, type ShortsConfig } from "./lib/youtube-shorts.mjs";

// The CSP only widens when the homepage Shorts section has approved videos: frames from youtube-nocookie.com, and YouTube thumbnails only if any video lacks a self-hosted one.
const shorts = approvedVideos(shortsConfig as ShortsConfig, process.env.SHORTS_PREVIEW === "1" && process.env.NODE_ENV !== "production");
const frameSrc = shorts.length ? " frame-src https://www.youtube-nocookie.com;" : "";
const ytImg = shorts.length && !allThumbnailsLocal(shorts) ? " https://i.ytimg.com" : "";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  // The site loads nothing from other origins. Inline scripts/styles stay allowed because Next.js bootstraps with inline
  // scripts and a nonce would need middleware, which turns the prerendered pages into dynamic ones.
  { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:" + ytImg + "; font-src 'self' data:; connect-src 'self'; object-src 'none';" + frameSrc + " base-uri 'self'; form-action 'self'; frame-ancestors 'none'" }
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 2592000 },
  async redirects() {
    const moved = (file: string, folder: string) => ({ source: `/images/diagrams/:file(${file})`, destination: `/images/${folder}/:file`, permanent: true });
    return [
      { source: "/favicon.ico", destination: "/icon", permanent: true },
      { source: "/wlasciciel-i-finansowanie", destination: "/wlasciciel-serwisu", permanent: true },
      moved("before-after\\d+\\.webp", "przed-i-po"),
      moved(".+\\.svg", "poradniki"),
      moved("(?:team-\\d|dr-selen|mehmet-buyuktarakci|duygu-kolay|funda-ozen|ayse-kus|ozer-ilhan|ali-burak-kacmaz|ayse-boharali)\\.jpeg", "zespol"),
      moved(".+", "klinika")
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] }
    ];
  }
};

export default nextConfig;
