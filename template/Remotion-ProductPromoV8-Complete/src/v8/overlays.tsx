import React from "react";
import {Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import captionsJson from "./captions.json";
import {clamp} from "./components";
import {V8} from "./theme";

type Caption = {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number | null;
  confidence: number | null;
};

const captions = captionsJson as Caption[];

export const CornerLogoV8: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: "absolute", right: 96, top: 42, zIndex: 80, height: 64, display: "flex", alignItems: "center", gap: 12, padding: "7px 14px 7px 7px", borderRadius: 13, background: "rgba(5,13,20,.76)", border: `1px solid ${V8.colors.line}`, opacity: interpolate(frame, [0, 14], [0, 1], clamp), translate: `${interpolate(frame, [0, 14], [18, 0], clamp)}px 0`}}>
      <div style={{width: 50, height: 50, background: "white", overflow: "hidden", borderRadius: 9}}><Img src={staticFile("assets/brand/logo.png")} style={{width: "100%", height: "100%", objectFit: "contain"}} /></div>
      <div><div style={{fontFamily: V8.font, fontSize: 17, fontWeight: 700}}>中远创视</div><div style={{fontFamily: V8.mono, color: V8.colors.muted, fontSize: 10, marginTop: 3, letterSpacing: 1}}>ZCVISION · RF</div></div>
    </div>
  );
};

export const NarrationSubtitlesV8: React.FC = () => {
  const frame = useCurrentFrame();
  const milliseconds = frame / V8.fps * 1000;
  const active = captions.find((item) => milliseconds >= item.startMs && milliseconds < item.endMs);
  if (!active) return null;
  const localFrame = frame - active.startMs / 1000 * V8.fps;
  const duration = (active.endMs - active.startMs) / 1000 * V8.fps;
  return (
    <div style={{position: "absolute", left: "50%", bottom: 38, translate: "-50% 0", zIndex: 90, maxWidth: 1460, padding: "12px 28px 14px", borderRadius: 11, background: "rgba(3,10,16,.78)", border: `1px solid ${V8.colors.line}`, color: V8.colors.text, fontFamily: V8.font, fontSize: 25, fontWeight: 520, lineHeight: 1.4, letterSpacing: 0.3, textAlign: "center", whiteSpace: "normal", opacity: Math.min(interpolate(localFrame, [0, 7], [0, 1], clamp), interpolate(localFrame, [duration - 7, duration], [1, 0], clamp))}}>{active.text}</div>
  );
};
