import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ObedNGL — Messages anonymes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#080810",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient blobs */}
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
            top: -200,
            left: -200,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)",
            bottom: -150,
            right: -100,
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.3)",
            borderRadius: 100,
            padding: "8px 20px",
            marginBottom: 28,
          }}
        >
          <span style={{ color: "#a855f7", fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>
            Anonyme · Libre · Instantané
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -4,
            background: "linear-gradient(135deg, #f0eeff 0%, #a855f7 50%, #ec4899 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 20,
            lineHeight: 1,
          }}
        >
          ObedNGL
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            color: "#8b85aa",
            fontStyle: "italic",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Ce que tu as peur de dire en Classe,{"\n"}
          <span style={{ color: "#f0eeff", fontStyle: "normal", fontWeight: 500 }}>
            faut dire ça ici.
          </span>
        </div>

        {/* Lock icon */}
        <div style={{ marginTop: 40, fontSize: 40 }}>🔒</div>
      </div>
    ),
    { ...size }
  );
}
