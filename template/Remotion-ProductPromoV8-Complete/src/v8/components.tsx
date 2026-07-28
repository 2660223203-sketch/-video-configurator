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
import {V8} from "./theme";

export const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const enter = (frame: number, delay = 0, distance = 22): React.CSSProperties => ({
  opacity: interpolate(frame, [delay, delay + V8.enterFrames], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  }),
  translate: `0 ${interpolate(frame, [delay, delay + V8.enterFrames], [distance, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })}px`,
});

export const TechBackground: React.FC<{focus?: "left" | "right" | "center"}> = ({focus = "center"}) => {
  const frame = useCurrentFrame();
  const x = focus === "left" ? 24 : focus === "right" ? 76 : 50;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: V8.colors.bg,
        backgroundImage: `radial-gradient(circle at ${x}% 45%, rgba(30, 159, 207, 0.20), transparent 35%), linear-gradient(135deg, #081722 0%, #04090F 100%)`,
      }}
    >
      <svg width={V8.width} height={V8.height} style={{opacity: 0.34}}>
        {Array.from({length: 8}).map((_, i) => (
          <line key={`h-${i}`} x1="96" x2="1824" y1={132 + i * 118} y2={132 + i * 118} stroke={V8.colors.line} />
        ))}
        {Array.from({length: 12}).map((_, i) => (
          <line key={`v-${i}`} y1="72" y2="1008" x1={96 + i * 157} x2={96 + i * 157} stroke={V8.colors.line} />
        ))}
        <line x1="96" y1="922" x2={interpolate(frame, [0, 45], [96, 1824], clamp)} y2="922" stroke={V8.colors.accent} strokeWidth="2" />
      </svg>
    </AbsoluteFill>
  );
};

export const SafeScene: React.FC<React.PropsWithChildren> = ({children}) => (
  <AbsoluteFill style={{fontFamily: V8.font, color: V8.colors.text, overflow: "hidden"}}>{children}</AbsoluteFill>
);

export const SceneHeader: React.FC<{kicker: string; title: string; subtitle?: string}> = ({kicker, title, subtitle}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: "absolute", left: V8.safeX, top: V8.safeY, zIndex: 30, ...enter(frame)}}>
      <div style={{fontFamily: V8.mono, fontSize: 18, color: V8.colors.accent, letterSpacing: 3, marginBottom: 12}}>{kicker}</div>
      <div style={{fontSize: 52, fontWeight: 700, lineHeight: 1.12}}>{title}</div>
      {subtitle ? <div style={{fontSize: 24, color: V8.colors.muted, marginTop: 13}}>{subtitle}</div> : null}
    </div>
  );
};

export const Panel: React.FC<React.PropsWithChildren<{style?: React.CSSProperties}>> = ({children, style}) => (
  <div
    style={{
      background: V8.colors.panel,
      border: `1px solid ${V8.colors.line}`,
      borderRadius: V8.radius,
      boxShadow: "0 26px 80px rgba(0,0,0,0.30)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const FootagePanel: React.FC<{src: string; darken?: number; objectPosition?: string; style?: React.CSSProperties}> = ({
  src,
  darken = 0.12,
  objectPosition = "center",
  style,
}) => (
  <Panel style={{position: "relative", overflow: "hidden", ...style}}>
    <OffthreadVideo
      src={staticFile(src)}
      muted
      volume={0}
      toneMapped={false}
      style={{width: "100%", height: "100%", objectFit: "cover", objectPosition}}
    />
    <AbsoluteFill style={{background: `linear-gradient(90deg, rgba(4,10,16,${darken}), rgba(4,10,16,${Math.max(0, darken - 0.06)}))`}} />
    <div style={{position: "absolute", inset: 0, border: `1px solid ${V8.colors.line}`, borderRadius: V8.radius}} />
  </Panel>
);

export const ProductVisual: React.FC<{width?: number; delay?: number}> = ({width = 590, delay = 0}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "relative",
        width,
        height: width,
        ...enter(frame, delay),
        scale: interpolate(frame, [delay, delay + 34], [0.96, 1], clamp),
      }}
    >
      <div style={{position: "absolute", inset: "15%", borderRadius: "50%", background: "rgba(82,217,255,0.16)", filter: "blur(68px)"}} />
      <Img src={staticFile("assets/product/product-main.png")} style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain"}} />
    </div>
  );
};

export const Advantage: React.FC<{title: string; value: string; note: string; delay?: number; valueSize?: number}> = ({
  title,
  value,
  note,
  delay = 0,
  valueSize = 82,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{...enter(frame, delay)}}>
      <div style={{fontSize: 27, fontWeight: 650, color: V8.colors.text}}>{title}</div>
      <div style={{fontFamily: V8.mono, fontSize: valueSize, lineHeight: 1.05, fontWeight: 750, color: V8.colors.accent, letterSpacing: -3, marginTop: 18}}>{value}</div>
      <div style={{fontSize: 25, color: V8.colors.muted, marginTop: 22}}>{note}</div>
    </div>
  );
};

export const PdfPanel: React.FC<{src: string; style?: React.CSSProperties; objectPosition?: string}> = ({src, style, objectPosition = "center"}) => (
  <Panel style={{overflow: "hidden", background: "#07131D", ...style}}>
    <Img src={staticFile(src)} style={{width: "100%", height: "100%", objectFit: "contain", objectPosition, filter: "invert(1) sepia(.22) saturate(1.35) hue-rotate(154deg) brightness(.72) contrast(1.14)"}} />
  </Panel>
);
