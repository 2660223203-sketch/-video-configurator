import React from "react";
import {
  OffthreadVideo,
  AbsoluteFill,
  useCurrentFrame,
} from "remotion";
import { getAssetPath } from "../utils/media";
import { COLORS } from "../config/brand";

interface BackgroundVideoProps {
  /** 视频素材路径（staticFile 格式），或 null 使用深色占位 */
  src: string | null;
  /** 从第几秒开始 (秒) */
  startFrom?: number;
  /** 到第几秒结束 (秒) */
  endAt?: number;
  /** 播放速度 */
  playbackRate?: number;
  /** 缩放 */
  scale?: number;
  /** X 偏移 (px) */
  x?: number;
  /** Y 偏移 (px) */
  y?: number;
  /** 模糊程度 (px) */
  blur?: number;
  /** 亮度 0-2, 默认 1 */
  brightness?: number;
  /** 对比度 0-2, 默认 1 */
  contrast?: number;
  /** 饱和度 0-2, 默认 1 */
  saturation?: number;
  /** 不透明度 0-1 */
  opacity?: number;
  /** 叠加渐变方向: "top" | "bottom" | "left" | "right" | "both" | "none" */
  overlayGradient?: "top" | "bottom" | "left" | "right" | "both" | "none";
  /** 渐变颜色 */
  gradientColor?: string;
  /** 暗色遮罩透明度 (0-1)，叠加在整个视频上 */
  darkOverlay?: number;
  /** 圆角 */
  borderRadius?: number;
  /** 是否静音 (默认 true — 所有素材必须静音) */
  muted?: boolean;
}

/**
 * 统一背景视频组件
 *
 * 所有素材默认静音 (muted=true, volume=0)。
 * 支持暗色遮罩叠加，用于保证测试画面可见。
 */
export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  src,
  startFrom = 0,
  endAt,
  playbackRate = 1,
  scale = 1,
  x = 0,
  y = 0,
  blur = 0,
  brightness = 1,
  contrast = 1,
  saturation = 1,
  opacity = 1,
  overlayGradient = "none",
  gradientColor = COLORS.bg,
  darkOverlay = 0,
  borderRadius = 0,
  muted = true,
}) => {
  const frame = useCurrentFrame();
  const resolvedSrc = getAssetPath(src);

  const filterParts: string[] = [];
  if (blur > 0) filterParts.push(`blur(${blur}px)`);
  if (brightness !== 1) filterParts.push(`brightness(${brightness})`);
  if (contrast !== 1) filterParts.push(`contrast(${contrast})`);
  if (saturation !== 1) filterParts.push(`saturate(${saturation})`);
  const filter = filterParts.length > 0 ? filterParts.join(" ") : undefined;

  const videoStyle: React.CSSProperties = {
    transform: `scale(${scale}) translate(${x}px, ${y}px)`,
    filter,
    opacity,
    borderRadius,
    objectFit: "cover",
    width: "100%",
    height: "100%",
  };

  // 渐变遮罩
  const gradientOverlay =
    overlayGradient !== "none" ? (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: getGradient(overlayGradient, gradientColor),
          pointerEvents: "none",
        }}
      />
    ) : null;

  // 暗色遮罩 (用于测试画面可读性)
  const darkMask =
    darkOverlay > 0 ? (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(0, 0, 0, ${darkOverlay})`,
          pointerEvents: "none",
        }}
      />
    ) : null;

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: COLORS.bg }}>
      {resolvedSrc ? (
        <OffthreadVideo
          src={resolvedSrc}
          startFrom={startFrom}
          endAt={endAt}
          playbackRate={playbackRate}
          style={videoStyle}
          toneMapped={false}
          muted={muted}
          volume={0}
        />
      ) : (
        /* 无素材时的占位背景 */
        <div
          style={{
            ...videoStyle,
            background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bg} 70%)`,
          }}
        />
      )}
      {darkMask}
      {gradientOverlay}
    </AbsoluteFill>
  );
};

function getGradient(
  direction: string,
  color: string,
): string {
  const c = color;
  switch (direction) {
    case "top":
      return `linear-gradient(to bottom, ${c} 0%, transparent 40%)`;
    case "bottom":
      return `linear-gradient(to top, ${c} 0%, transparent 40%)`;
    case "left":
      return `linear-gradient(to right, ${c} 0%, transparent 40%)`;
    case "right":
      return `linear-gradient(to left, ${c} 0%, transparent 40%)`;
    case "both":
      return `linear-gradient(to bottom, ${c} 0%, transparent 30%, transparent 70%, ${c} 100%)`;
    default:
      return "none";
  }
}
