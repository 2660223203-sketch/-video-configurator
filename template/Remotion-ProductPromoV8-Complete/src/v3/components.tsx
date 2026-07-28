import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {V3} from "./theme";

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const enter = (frame: number, delay = 0): React.CSSProperties => ({
  opacity: interpolate(frame, [delay, delay + V3.enterFrames], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  }),
  translate: `0 ${interpolate(frame, [delay, delay + V3.enterFrames], [22, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })}px`,
});

export const TechBackground: React.FC<{focus?: "left" | "right" | "center"}> = ({focus = "center"}) => {
  const frame = useCurrentFrame();
  const x = focus === "left" ? 28 : focus === "right" ? 72 : 50;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: V3.colors.bg,
        backgroundImage: `radial-gradient(circle at ${x}% 48%, rgba(31, 149, 189, 0.2), transparent 38%), linear-gradient(135deg, #091722 0%, #050B11 100%)`,
      }}
    >
      <svg width="1920" height="1080" style={{opacity: 0.34}}>
        {Array.from({length: 7}).map((_, i) => (
          <line key={`h-${i}`} x1="96" x2="1824" y1={180 + i * 120} y2={180 + i * 120} stroke={V3.colors.line} strokeWidth="1" />
        ))}
        {Array.from({length: 11}).map((_, i) => (
          <line key={`v-${i}`} y1="72" y2="1008" x1={160 + i * 160} x2={160 + i * 160} stroke={V3.colors.line} strokeWidth="1" />
        ))}
        <line
          x1="96"
          y1="920"
          x2={interpolate(frame, [0, 45], [96, 1824], clamp)}
          y2="920"
          stroke={V3.colors.accent}
          strokeWidth="2"
        />
      </svg>
    </AbsoluteFill>
  );
};

export const SceneTitle: React.FC<{kicker?: string; title: string; subtitle?: string}> = ({kicker, title, subtitle}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: "absolute", left: V3.safeX, top: V3.safeY, zIndex: 20, ...enter(frame)}}>
      {kicker ? <div style={{fontSize: 20, color: V3.colors.accent, letterSpacing: 3, marginBottom: 12}}>{kicker}</div> : null}
      <div style={{fontSize: 52, lineHeight: 1.12, fontWeight: 700, color: V3.colors.text}}>{title}</div>
      {subtitle ? <div style={{fontSize: 24, color: V3.colors.muted, marginTop: 14}}>{subtitle}</div> : null}
    </div>
  );
};

export const Footage: React.FC<{
  src: string;
  startSecond: number;
  darken?: number;
  objectPosition?: string;
  radius?: number;
}> = ({src, startSecond, darken = 0, objectPosition = "center", radius = 0}) => (
  <AbsoluteFill style={{overflow: "hidden", borderRadius: radius, backgroundColor: V3.colors.bg}}>
    <OffthreadVideo
      src={staticFile(src)}
      startFrom={Math.round(startSecond * V3.fps)}
      muted={true}
      volume={0}
      toneMapped={false}
      style={{width: "100%", height: "100%", objectFit: "cover", objectPosition}}
    />
    {darken > 0 ? <AbsoluteFill style={{backgroundColor: `rgba(3, 10, 16, ${darken})`}} /> : null}
  </AbsoluteFill>
);

export const ProductVisual: React.FC<{width?: number; delay?: number}> = ({width = 620, delay = 0}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: "relative", width, height: width, ...enter(frame, delay), scale: interpolate(frame, [delay, delay + 30], [0.97, 1], clamp)}}>
      <div style={{position: "absolute", inset: "16%", borderRadius: "50%", background: "rgba(72, 214, 255, 0.15)", filter: "blur(64px)"}} />
      <Img src={staticFile("assets/product/product-main.png")} style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain"}} />
    </div>
  );
};

export const Panel: React.FC<React.PropsWithChildren<{style?: React.CSSProperties}>> = ({children, style}) => (
  <div style={{border: `1px solid ${V3.colors.line}`, background: V3.colors.panel, borderRadius: V3.radius, boxShadow: "0 24px 70px rgba(0,0,0,0.28)", ...style}}>{children}</div>
);

export const Metric: React.FC<{label: string; value: string; note?: string; delay?: number; large?: boolean}> = ({label, value, note, delay = 0, large = false}) => {
  const frame = useCurrentFrame();
  return (
    <Panel style={{padding: large ? "34px 38px" : "26px 30px", ...enter(frame, delay)}}>
      <div style={{fontSize: 20, color: V3.colors.muted, marginBottom: 10}}>{label}</div>
      <div style={{fontFamily: V3.mono, fontSize: large ? 68 : 44, fontWeight: 700, color: V3.colors.text, letterSpacing: -2}}>{value}</div>
      {note ? <div style={{fontSize: 20, color: V3.colors.accent2, marginTop: 10}}>{note}</div> : null}
    </Panel>
  );
};

export const SafeFrame: React.FC<React.PropsWithChildren> = ({children}) => (
  <AbsoluteFill style={{fontFamily: V3.font, color: V3.colors.text, overflow: "hidden"}}>{children}</AbsoluteFill>
);
