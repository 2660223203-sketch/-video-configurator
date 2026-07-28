import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { ProductHero } from "../components/ProductHero";
import { TwoColumnLayout } from "../components/TwoColumnLayout";
import { MetricCard } from "../components/MetricCard";
import { COLORS } from "../config/brand";
import { SCENE_CONTENT, PRODUCT_PARAMS } from "../config/content";
import { ASSETS } from "../config/assets";
import { TRANSITION } from "../config/timeline";
import { TWO_COL, LAYOUT, OVERLAY, ANIM, BODY } from "../config/layout";

/**
 * 5-9s: 产品展示 — 左右两栏，左 40% 文字+参数，右 60% 产品图
 */
export const ProductRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 4 * 30; // 120 frames

  const fadeIn = interpolate(
    frame,
    [0, TRANSITION.crossfade],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const fadeOut = interpolate(
    frame,
    [duration - TRANSITION.crossfade, duration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const productScale = interpolate(
    frame,
    [10, 10 + ANIM.duration],
    [ANIM.scaleFrom, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const productOpacity = interpolate(
    frame,
    [8, 8 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Left column: product name intro
  const titleOpacity = interpolate(
    frame,
    [4, 4 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const params = [
    { label: "工作频率", value: PRODUCT_PARAMS.frequencyRange },
    { label: "瞬时带宽", value: PRODUCT_PARAMS.instantaneousBandwidth },
    { label: "中频范围", value: PRODUCT_PARAMS.ifRange },
  ];

  const leftContent = (
    <div style={{ opacity: titleOpacity }}>
      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.text,
          letterSpacing: 3,
          marginBottom: 8,
        }}
      >
        {SCENE_CONTENT.productReveal.title}
      </div>
      <div
        style={{
          fontSize: BODY.fontSize,
          color: COLORS.textSecondary,
          letterSpacing: 1,
          marginBottom: 32,
        }}
      >
        上变频＋下变频＋频率源一体化变频组件
      </div>
      <div
        style={{
          fontSize: 18,
          color: COLORS.textMuted,
          letterSpacing: 1,
          marginBottom: 24,
          fontFamily: "monospace",
        }}
      >
        {SCENE_CONTENT.productReveal.model}
      </div>

      {/* 参数卡片纵向排列 */}
      {params.map((p, i) => (
        <MetricCard
          key={p.label}
          label={p.label}
          value={p.value}
          index={i}
          startFrame={20}
          accentColor={i === 0 ? COLORS.accent : i === 1 ? COLORS.accentLight : COLORS.cyan}
        />
      ))}
    </div>
  );

  const rightContent = (
    <div
      style={{
        opacity: productOpacity,
        transform: `scale(${productScale})`,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ProductHero
        src={ASSETS.product.main}
        width={550}
        height={550}
        x={0}
        y={0}
        glowColor={COLORS.accent}
        startFrame={8}
        edgeLightWidth={2}
      />
    </div>
  );

  return (
    <AbsoluteFill
      style={{ opacity: fadeIn * fadeOut, backgroundColor: COLORS.bg }}
    >
      <BackgroundVideo
        src={ASSETS.video.demo2}
        startFrom={0}
        brightness={1}
        contrast={1}
        saturation={0.5}
        blur={0}
        darkOverlay={OVERLAY.darkOverlay}
        muted
      />

      <TwoColumnLayout
        left={leftContent}
        right={rightContent}
        leftWidth={TWO_COL.left40}
        rightWidth={TWO_COL.right60}
        gap={48}
        top={140}
        x={LAYOUT.marginX}
      />
    </AbsoluteFill>
  );
};
