import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zęby w Turcji",
    short_name: "Zęby w Turcji",
    description: "Polskojęzyczny serwis informacyjny o leczeniu zębów w Turcji: ceny, metody i wybór kliniki.",
    lang: "pl",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#075b54",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }, { src: "/apple-icon", sizes: "180x180", type: "image/png" }]
  };
}
