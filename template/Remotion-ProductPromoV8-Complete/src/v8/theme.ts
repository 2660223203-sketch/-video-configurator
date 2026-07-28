export const V8 = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 56 * 30,
  safeX: 96,
  safeY: 72,
  font: "Microsoft YaHei, PingFang SC, Noto Sans SC, sans-serif",
  mono: "Consolas, JetBrains Mono, monospace",
  colors: {
    bg: "#050B12",
    bg2: "#081824",
    panel: "rgba(9, 27, 40, 0.86)",
    panelSoft: "rgba(11, 35, 50, 0.68)",
    line: "rgba(92, 218, 255, 0.24)",
    accent: "#52D9FF",
    accent2: "#61F0C5",
    text: "#F4FAFF",
    muted: "rgba(226, 242, 250, 0.68)",
    faint: "rgba(226, 242, 250, 0.34)",
  },
  radius: 22,
  enterFrames: 16,
} as const;

export const V8_TIMELINE = {
  company: {start: 0, duration: 198},
  product: {start: 198, duration: 235},
  frequency: {start: 433, duration: 240},
  bandwidth: {start: 673, duration: 129},
  control: {start: 802, duration: 260},
  purity: {start: 1062, duration: 176},
  compact: {start: 1238, duration: 166},
  summary: {start: 1404, duration: 170},
  end: {start: 1574, duration: 106},
} as const;

export const V8_ASSETS = {
  productRig: "assets/v8/video/product-rig.mp4",
  instrument: "assets/v8/video/instrument.mp4",
  operation: "assets/v8/video/operation.mp4",
  spectrum: "assets/v8/video/spectrum.mp4",
  signalBlocks: "assets/v8/pdf/signal-blocks.png",
  downCurves: "assets/v8/pdf/downconversion-curves.png",
  upCurves: "assets/v8/pdf/upconversion-curves.png",
  spiTiming: "assets/v8/pdf/spi-timing.png",
  dimensions: "assets/v8/pdf/dimensions.png",
  narration: "assets/v8/audio/narration.mp3",
} as const;
