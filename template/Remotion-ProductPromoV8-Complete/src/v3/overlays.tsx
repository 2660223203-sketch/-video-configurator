import React from "react";
import {Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import {V3} from "./theme";
import captionsJson from "./product-captions.json";

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const CornerLogo: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        right: V3.safeX,
        top: 46,
        zIndex: 80,
        height: 72,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "8px 16px 8px 8px",
        borderRadius: 14,
        background: "rgba(7,16,24,0.76)",
        border: "1px solid rgba(72,214,255,0.2)",
        backdropFilter: "blur(10px)",
        opacity: interpolate(frame, [0, 14], [0, 1], clamp),
        translate: `${interpolate(frame, [0, 14], [20, 0], clamp)}px 0`,
      }}
    >
      <div style={{width: 56, height: 56, overflow: "hidden", borderRadius: 10, background: "white"}}>
        <Img src={staticFile("assets/brand/logo.png")} style={{width: "100%", height: "100%", objectFit: "contain"}} />
      </div>
      <div>
        <div style={{fontFamily: V3.font, fontSize: 18, fontWeight: 700, color: V3.colors.text}}>中远创视</div>
        <div style={{fontFamily: V3.mono, fontSize: 11, letterSpacing: 1.2, color: V3.colors.muted, marginTop: 3}}>ZCVISION · RF</div>
      </div>
    </div>
  );
};

type Caption = {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number | null;
  confidence: number | null;
};

const SUBTITLES = captionsJson as Caption[];

export const NarrationSubtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const milliseconds = frame / V3.fps * 1000;
  const active = SUBTITLES.find((item) => milliseconds >= item.startMs && milliseconds < item.endMs);
  if (!active) return null;
  const localFrame = frame - active.startMs / 1000 * V3.fps;
  const totalFrames = (active.endMs - active.startMs) / 1000 * V3.fps;
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: 46,
        translate: "-50% 0",
        zIndex: 90,
        width: "fit-content",
        maxWidth: 1460,
        padding: "13px 30px 15px",
        borderRadius: 12,
        background: "rgba(3,10,16,0.72)",
        border: "1px solid rgba(72,214,255,0.18)",
        backdropFilter: "blur(9px)",
        color: "white",
        fontFamily: V3.font,
        fontSize: 27,
        fontWeight: 500,
        lineHeight: 1.45,
        letterSpacing: 0.4,
        textAlign: "center",
        whiteSpace: "normal",
        opacity: Math.min(
          interpolate(localFrame, [0, 8], [0, 1], clamp),
          interpolate(localFrame, [totalFrames - 8, totalFrames], [1, 0], clamp),
        ),
      }}
    >
      {active.text}
    </div>
  );
};
