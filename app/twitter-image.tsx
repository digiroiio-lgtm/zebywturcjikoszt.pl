import { ImageResponse } from "next/og";

export const alt = "Zęby w Turcji – ceny i leczenie w Antalyi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#161213 0%,#4a0f1d 60%,#b3122a 100%)", color: "#ffffff" }}>
        <div style={{ fontSize: 34, color: "#f3c4cb", marginBottom: 24 }}>Serwis informacyjny dla pacjentów z Polski</div>
        <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>Zęby w Turcji</div>
        <div style={{ fontSize: 40, marginTop: 28, color: "#fdf1f2" }}>Ceny, implanty i korony. Klinika prowadzona przez operatora serwisu: Akdeniz Dental, Antalya.</div>
      </div>
    ),
    size
  );
}
