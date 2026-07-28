import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { ProductHero } from "../components/ProductHero";
import { SectionTitle } from "../components/SectionTitle";
import { COLORS } from "../config/brand";
import { SCENE_CONTENT, PRODUCT_PARAMS } from "../config/content";
import { ASSETS } from "../config/assets";
import { TRANSITION } from "../config/timeline";
import { LAYOUT, ANIM, CARD } from "../config/layout";

/**
 * 37-41s: 紧凑轻量 — 左上标题 + 左侧规格列表 + 右侧产品图 + 简单尺寸线
 */
export const CompactDesignScene: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 5 * 30; // 150 frames

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

  const specs = [
    { label: "外形尺寸", value: PRODUCT_PARAMS.dimensions },
    { label: "重量", value: PRODUCT_PARAMS.weight },
    { label: "工作频率", value: PRODUCT_PARAMS.frequencyRange },
    { label: "瞬时带宽", value: PRODUCT_PARAMS.instantaneousBandwidth },
  ];

  const productScale = interpolate(
    frame,
    [6, 6 + ANIM.duration],
    [ANIM.scaleFrom, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const productOpacity = interpolate(
    frame,
    [3, 3 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 产品图居中偏右，高度约 50% 画面 (540px)
  const productSize = 540;

  // 尺寸线 (宽、长、高三组)
  const dimLineOpacity = interpolate(
    frame,
    [20, 20 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const parts = PRODUCT_PARAMS.dimensions.split("×").map((p) => p.trim());

  return (
    <AbsoluteFill
      style={{ opacity: fadeIn * fadeOut, backgroundColor: COLORS.bg }}
    >
      <BackgroundVideo
        src={ASSETS.video.demo4}
        startFrom={2}
        brightness={1}
        contrast={1.05}
        saturation={0.4}
        blur={1}
        darkOverlay={0.5}
        muted
      />

      {/* 左上标题 */}
      <SectionTitle
        title={SCENE_CONTENT.compactDesign.tagline}
        subtitle={SCENE_CONTENT.compactDesign.subtitle}
        startFrame={3}
      />

      {/* 左侧规格列表 */}
      <div
        style={{
          position: "absolute",
          left: LAYOUT.marginX,
          top: 210,
          zIndex: 15,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {specs.map((spec, i) => {
          const itemOpacity = interpolate(
            frame,
            [10 + i * 10, 10 + i * 10 + ANIM.fadeIn],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return (
            <div
              key={i}
              style={{
                opacity: itemOpacity,
                background: `rgba(15, 23, 42, ${CARD.bgOpacity})`,
                backdropFilter: `blur(${CARD.blur}px)`,
                borderRadius: CARD.radius,
                border: `1px solid ${COLORS.accent}33`,
                padding: `${CARD.paddingY}px ${CARD.paddingX}px`,
                width: CARD.width,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  color: COLORS.textMuted,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                {spec.label}
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: COLORS.accentLight,
                  fontFamily: i >= 2 ? "sans-serif" : "monospace",
                }}
              >
                {spec.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* 右侧产品图 — 居中偏右 */}
      <div
        style={{
          position: "absolute",
          left: 1920 / 2 + 30,
          top: 1080 / 2 - productSize / 2 + 20,
          opacity: productOpacity,
          transform: `scale(${productScale})`,
          zIndex: 12,
        }}
      >
        <ProductHero
          src={ASSETS.product.main}
          width={productSize}
          height={productSize}
          x={0}
          y={0}
          glowColor={COLORS.accent}
          startFrame={6}
          edgeLightWidth={2}
        />
      </div>

      {/* 简洁尺寸线 — 3组：宽、长、高 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: dimLineOpacity,
          pointerEvents: "none",
          zIndex: 18,
        }}
      >
        <svg width={1920} height={1080}>
          {/* 宽度线 — 产品顶部水平 */}
          <line
            x1={990}
            y1={300}
            x2={1500}
            y2={300}
            stroke={COLORS.accent}
            strokeWidth={1.5}
            opacity={0.6}
          />
          <line x1={990} y1={290} x2={990} y2={310} stroke={COLORS.accent} strokeWidth={1.5} opacity={0.6} />
          <line x1={1500} y1={290} x2={1500} y2={310} stroke={COLORS.accent} strokeWidth={1.5} opacity={0.6} />
          <text x={1245} y={288} textAnchor="middle" fill={COLORS.accentLight} fontSize={22} fontWeight={600} fontFamily="sans-serif">
            {parts[0]}
          </text>

          {/* 长度线 — 产品底部水平 */}
          <line
            x1={990}
            y1={840}
            x2={1500}
            y2={840}
            stroke={COLORS.accent}
            strokeWidth={1.5}
            opacity={0.6}
          />
          <line x1={990} y1={830} x2={990} y2={850} stroke={COLORS.accent} strokeWidth={1.5} opacity={0.6} />
          <line x1={1500} y1={830} x2={1500} y2={850} stroke={COLORS.accent} strokeWidth={1.5} opacity={0.6} />
          <text x={1245} y={868} textAnchor="middle" fill={COLORS.accentLight} fontSize={22} fontWeight={600} fontFamily="sans-serif">
            {parts[1]}
          </text>

          {/* 高度线 — 产品右侧垂直 */}
          <line
            x1={1530}
            y1={300}
            x2={1530}
            y2={840}
            stroke={COLORS.accent}
            strokeWidth={1.5}
            opacity={0.6}
          />
          <line x1={1520} y1={300} x2={1540} y2={300} stroke={COLORS.accent} strokeWidth={1.5} opacity={0.6} />
          <line x1={1520} y1={840} x2={1540} y2={840} stroke={COLORS.accent} strokeWidth={1.5} opacity={0.6} />
          <text x={1560} y={575} fill={COLORS.accentLight} fontSize={22} fontWeight={600} fontFamily="sans-serif">
            {parts[2]}
          </text>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
