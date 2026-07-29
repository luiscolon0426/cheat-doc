import { ImageResponse } from "next/og";

export const alt = "DevMarks — Luis's Engineering Field Notes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "white",
          background:
            "linear-gradient(135deg, #0e1525 0%, #151e30 60%, #12352d 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#4ade80" }}>
          Dev<span style={{ color: "white" }}>Marks</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 950 }}>
            Luis&apos;s Engineering Field Notes
          </div>
          <div style={{ fontSize: 28, color: "#9ca3af" }}>
            Build systems. Learn from production. Grow with evidence.
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 20, color: "#86efac" }}>
          Technical references · Case studies · Project blueprints
        </div>
      </div>
    ),
    size,
  );
}
