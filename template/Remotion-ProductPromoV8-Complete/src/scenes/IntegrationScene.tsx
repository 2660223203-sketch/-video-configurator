import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { ProductHero } from "../components/ProductHero";
import { TwoColumnLayout } from "../components/TwoColumnLayout";
import { COLORS } from "../config/brand";
import { SCENE_CONTENT } from "../config/content";
import { ASSETS } from "../config/assets";
import { TRANSITION } from "../config/timeline";
import { TWO_COL, LAYOUT, ANIM, GUIDE } from "../config/layout";

/**
 * 9-17s: 功能介绍 — 左 36% 功能列表 + 右 64% 产品图 + 最多3条短线引导
 */
export const IntegrationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 7 * 30; // 210 frames

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

  const modules = SCENE_CONTENT.integration.modules;
  const descriptions = [
    "将低频信号转换为高频信号发射",
    "将接收到的高频信号转换为低频处理",
    "内置跳频源和点频源，提供稳定本振",
  ];

  // 引导线动画 (短线，不交叉)
  const lineOpacity = interpolate(
    frame,
    [30, 44],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const productScale = interpolate(
    frame,
    [15, 15 + ANIM.duration],
    [ANIM.scaleFrom, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const productOpacity = interpolate(
    frame,
    [12, 12 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 结论文案
  const conclusionOpacity = interpolate(
    frame,
    [145, 145 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const leftContent = (
    <div>
      {modules.map((mod, i) => {
        const itemOpacity = interpolate(
          frame,
          [8 + i * 16, 8 + i * 16 + ANIM.fadeIn],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const itemSlide = interpolate(
          frame,
          [8 + i * 16, 8 + i * 16 + ANIM.fadeIn],
          [ANIM.slideUp, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <div
            key={mod.en}
            style={{
              opacity: itemOpacity,
              transform: `translateY(${itemSlide}px)`,
              marginBottom: 44,
            }}
          >
            {/* 编号 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: `${COLORS.accent}22`,
                  border: `1px solid ${COLORS.accent}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  color: COLORS.accent,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div>
                {/* 英文缩写放在中文上方，≥18px */}
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: COLORS.accent,
                    letterSpacing: 2,
                    fontFamily: "monospace",
                  }}
                >
                  {mod.en.replace(" CONVERSION", "").replace("FREQUENCY SOURCE", "FREQ SOURCE")}
                </div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    color: COLORS.text,
                    letterSpacing: 1,
                    marginTop: 4,
                  }}
                >
                  {mod.zh}
                </div>
              </div>
            </div>
            {/* 一行说明 */}
            <div
              style={{
                fontSize: 18,
                color: COLORS.textSecondary,
                marginTop: 8,
                marginLeft: 46,
                lineHeight: 1.4,
              }}
            >
              {descriptions[i]}
            </div>
          </div>
        );
      })}

      {/* 短线引导指示 (3条水平短线，对应3个功能) */}
      <div style={{ opacity: lineOpacity, marginTop: 8 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 44,
              height: 2,
            }}
          >
            <div
              style={{
                width: GUIDE.shortLength,
                height: 1,
                background: `linear-gradient(to right, ${COLORS.accent}88, transparent)`,
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: COLORS.accentLight,
              }}
            />
          </div>
        ))}
      </div>

      {/* 底部结论 */}
      <div
        style={{
          opacity: conclusionOpacity,
          marginTop: 20,
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: 3,
          }}
        >
          {SCENE_CONTENT.integration.conclusion}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.accentLight,
            letterSpacing: 3,
            marginTop: 10,
          }}
        >
          {SCENE_CONTENT.integration.tagline}
        </div>
      </div>
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
        alignItems: "center",
      }}
    >
      <ProductHero
        src={ASSETS.product.main}
        width={580}
        height={580}
        x={0}
        y={0}
        glowColor={COLORS.accent}
        startFrame={12}
        edgeLightWidth={2}
      />
    </div>
  );

  return (
    <AbsoluteFill
      style={{ opacity: fadeIn * fadeOut, backgroundColor: COLORS.bg }}
    >
      {/* 纯深色背景 — 不使用素材视频 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 70% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bg} 60%)`,
        }}
      />

      <TwoColumnLayout
        left={leftContent}
        right={rightContent}
        leftWidth={TWO_COL.left36}
        rightWidth={TWO_COL.right64}
        gap={40}
        top={130}
        x={LAYOUT.marginX}
      />
    </AbsoluteFill>
  );
};
