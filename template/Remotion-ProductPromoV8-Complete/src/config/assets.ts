export const ASSETS = {
  product: {
    main: "assets/product/product-main.png",
    side: null as string | null,
    interface: null as string | null,
  },
  video: {
    demo1: "assets/video/operation-demo.mp4",   // 素材1, 99s
    demo2: "assets/video/素材2.mp4",              // 素材2, 51s
    demo3: "assets/video/素材3.mp4",              // 素材3, 12s
    demo4: "assets/video/素材4.mp4",              // 素材4, 7.6s
  },
  brand: {
    logo: "assets/brand/logo.png",
    qrCode: null as string | null,
  },
  audio: {
    music: "assets/audio/music.mp3",
  },
  fonts: {
    chinese: "Noto Sans SC, Microsoft YaHei, sans-serif",
    mono: "JetBrains Mono, Consolas, monospace",
  },
} as const;

export function hasAsset(path: string | null): path is string {
  return path !== null && path !== undefined && path.length > 0;
}
