import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#090b0d",
          color: "#f0ede6",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          fontSize: 26,
          fontWeight: 800,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-0.12em",
          position: "relative",
          width: "100%",
        }}
      >
        RR
        <span
          style={{
            background: "#ff6b4a",
            borderRadius: 999,
            bottom: 13,
            display: "flex",
            height: 6,
            position: "absolute",
            right: 11,
            width: 6,
          }}
        />
      </div>
    ),
    size,
  );
}
// 