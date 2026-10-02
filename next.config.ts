import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 2592000 },
  async redirects() {
    const moved = (file: string, folder: string) => ({ source: `/images/diagrams/:file(${file})`, destination: `/images/${folder}/:file`, permanent: true });
    return [
      moved("before-after\\d+\\.webp", "przed-i-po"),
      moved(".+\\.svg", "poradniki"),
      moved("(?:team-\\d|dr-selen|mehmet-buyuktarakci|duygu-kolay|funda-ozen|ayse-kus|ozer-ilhan|ali-burak-kacmaz|ayse-boharali)\\.jpeg", "zespol"),
      moved(".+", "klinika")
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }
    ];
  }
};

export default nextConfig;
