import React from "react";
import { Img, useCurrentFrame, interpolate } from "remotion";
import { getAssetPath } from "../utils/media";
import { COLORS, SHADOWS } from "../config/brand";
import { lightSweep, gentleScale, fadeIn } from "../utils/animations";

interface ProductHeroProps {
  /** 产品图片路径，或 null 使用占位 */
  src: string | null;
  /** 显示宽度 */
  width?: number;
  /** 显示高度 */
  height?: number;
  /** X 位置 */
  x?: number;
  /** Y 位置 */
  y?: number;
  /** 柔光颜色 */
  glowColor?: string;
  /** 边缘光宽度 */
  edgeLightWidth?: number;
  /** 进入起始帧 */
  startFrame?: number;
}

/**
 * 产品主体展示组件
 *
 * 包含轮廓发光、光线扫过、柔和缩放等动画效果。
 * 当图片不存在时渲染占位矩形。
 */
export const ProductHero: React.FC<ProductHeroProps> = ({
  src,
  width = 500,
  height = 500,
  x = 1920 / 2 - 250,
  y = 1080 / 2 - 250,
  glowColor = COLORS.accent,
  edgeLightWidth = 4,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const resolvedSrc = getAssetPath(src);

  const scale = gentleScale(frame, startFrame, 60);
  const opacity = fadeIn(frame, startFrame, 25);
  const sweep = lightSweep(frame, startFrame + 10, 50);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* 柔光背景 */}
      <div
        style={{
          position: "absolute",
          inset: -30,
          borderRadius: "20%",
          background: `radial-gradient(ellipse at 50% 50%, ${glowColor}22 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* 光边 — 使用 boxShadow 模拟 */}
      <div
        style={{
          position: "absolute",
          inset: -edgeLightWidth,
          borderRadius: 16,
          boxShadow: `0 0 ${edgeLightWidth * 8}px ${glowColor}66, inset 0 0 ${edgeLightWidth * 4}px ${glowColor}33`,
          opacity: 0.6,
        }}
      />

      {/* 产品图片或占位 */}
      {resolvedSrc ? (
        <Img
          src={resolvedSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 8,
            boxShadow: SHADOWS.card,
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 8,
            background: `linear-gradient(135deg, ${COLORS.bgSecondary} 0%, #1a2332 50%, ${COLORS.bgSecondary} 100%)`,
            border: `1px solid ${glowColor}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.textMuted,
            fontSize: 16,
            boxShadow: SHADOWS.card,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>📡</div>
            <div>产品主图</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>
              替换 public/assets/product/
            </div>
          </div>
        </div>
      )}

      {/* 光线扫过效果 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${sweep * 100}%`,
          width: "30%",
          height: "100%",
          background: `linear-gradient(90deg, transparent 0%, ${glowColor}22 50%, transparent 100%)`,
          pointerEvents: "none",
          transform: "skewX(-15deg)",
        }}
      />

      {/* 顶部光带扫过 */}
      <div
        style={{
          position: "absolute",
          top: `${interpolate(sweep, [0, 1], [0, 100])}%`,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent 0%, ${glowColor}88 50%, transparent 100%)`,
        }}
      />
    </div>
  );
};
