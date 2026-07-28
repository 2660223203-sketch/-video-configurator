export const V3 = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 75 * 30,
  safeX: 96,
  safeY: 72,
  colors: {
    bg: "#071018",
    panel: "rgba(10, 25, 36, 0.88)",
    panelSoft: "rgba(13, 34, 48, 0.68)",
    line: "rgba(85, 210, 255, 0.25)",
    accent: "#48D6FF",
    accent2: "#66F0C1",
    text: "#F4FAFF",
    muted: "rgba(224, 241, 250, 0.68)",
    faint: "rgba(224, 241, 250, 0.34)",
  },
  font: "Microsoft YaHei, PingFang SC, Noto Sans SC, sans-serif",
  mono: "Consolas, JetBrains Mono, monospace",
  radius: 22,
  enterFrames: 16,
} as const;

export const V3_TIMELINE = {
  companyIntro: {start: 0, duration: 8 * V3.fps},
  opening: {start: 8 * V3.fps, duration: 4 * V3.fps},
  product: {start: 12 * V3.fps, duration: 5 * V3.fps},
  capabilities: {start: 17 * V3.fps, duration: 6 * V3.fps},
  frequency: {start: 23 * V3.fps, duration: 8 * V3.fps},
  performance: {start: 31 * V3.fps, duration: 3.5 * V3.fps},
  test: {start: 34.5 * V3.fps, duration: 4 * V3.fps},
  operation: {start: 38.5 * V3.fps, duration: 4 * V3.fps},
  integration: {start: 42.5 * V3.fps, duration: 24.5 * V3.fps},
  end: {start: 67 * V3.fps, duration: 8 * V3.fps},
} as const;

export const V3_CLIPS = {
  productBench: {asset: "assets/video/素材2.mp4", startSecond: 32, duration: 5},
  operation: {asset: "assets/video/operation-demo.mp4", startSecond: 56, duration: 5},
  instrument: {asset: "assets/video/素材3.mp4", startSecond: 0, duration: 5},
} as const;
