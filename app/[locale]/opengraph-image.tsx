import { ImageResponse } from "next/og";
import { getDictionary, isLocale } from "@/lib/i18n";

export const alt = "Izikwen product experience";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: candidate } = await params;
  const locale = isLocale(candidate) ? candidate : "en";
  const copy = getDictionary(locale);

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#101312", color: "white", padding: "72px 84px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ position: "absolute", width: 560, height: 560, borderRadius: 999, right: -50, top: 28, background: "radial-gradient(circle, rgba(198,243,109,.36), rgba(39,122,67,.1) 48%, transparent 70%)" }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", maxWidth: 820 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 48, height: 48, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: "#c6f36d", color: "#101312", fontSize: 20, fontWeight: 800 }}>Iz</div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>Izikwen</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>{copy.hero.title}</div>
          <div style={{ marginTop: 26, fontSize: 28, lineHeight: 1.35, color: "rgba(255,255,255,.72)" }}>{copy.seo.ogDescription}</div>
        </div>
      </div>
    </div>,
    size,
  );
}
