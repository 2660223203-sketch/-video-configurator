import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { SectionTitle } from "../components/SectionTitle";
import { COLORS } from "../config/brand";
import { SCENE_CONTENT } from "../config/content";
import { ASSETS } from "../config/assets";
import { TRANSITION } from "../config/timeline";
import { OVERLAY, LAYOUT, ANIM } from "../config/layout";

/**
 * 31-37s: SPI串口控制 — 真实控制画面 + 左上标题 + SPI标签 + 3个标注点
 */
export const SPIControlScene: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 6 * 30;

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

  const spiChars = ["S", "P", "I"];
  const spiLabels = ["Serial", "Peripheral", "Interface"];

  // 3个测试标注点位置 — 分布在画面右侧区域，互不交叉
  const annotations = [
    {
      x: 780,
      y: 420,
      label: "频率控制",
    },
    {
      x: 780,
      y: 560,
      label: "衰减控制",
    },
    {
      x: 1050,
      y: 500,
      label: "SPI总线",
    },
  ];

  return (
    <AbsoluteFill
      style={{ opacity: fadeIn * fadeOut, backgroundColor: COLORS.bg }}
    >
      {/* 真实控制测试画面全屏展示 */}
      <BackgroundVideo
        src={ASSETS.video.demo2}
        startFrom={10}
        brightness={1}
        contrast={1.05}
        saturation={0.7}
        blur={0}
        darkOverlay={OVERLAY.darkOverlay}
        muted
      />

      {/* 左上标题 */}
      <SectionTitle
        title={SCENE_CONTENT.spiControl.title}
        subtitle={SCENE_CONTENT.spiControl.subtitle}
        startFrame={4}
      />

      {/* S P I 横向小标签 — 标题下方 */}
      <div
        style={{
          position: "absolute",
          left: LAYOUT.marginX,
          top: 170,
          display: "flex",
          gap: 12,
          zIndex: 20,
        }}
      >
        {spiChars.map((char, i) => {
          const glow = interpolate(
            frame,
            [10 + i * 8, 10 + i * 8 + 8],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return (
            <div
              key={i}
              style={{
                width: 48,
                height: 56,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                border: `1px solid ${COLORS.accent}${Math.round(glow * 99).toString(16).padStart(2, "0")}`,
                background: `rgba(14, 165, 233, ${glow * 0.12})`,
                opacity: glow,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: COLORS.accentLight,
                }}
              >
                {char}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: COLORS.textMuted,
                  letterSpacing: 0.5,
                }}
              >
                {spiLabels[i]}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3个测试标注点 — 圆点 + 短引导线 + 文字 */}
      {annotations.map((ann, i) => {
        const annOpacity = interpolate(
          frame,
          [30 + i * 10, 30 + i * 10 + ANIM.fadeIn],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        // 引导线方向：从标注点向左上方或右上方的短线
        const labelX = ann.x - 180;
        const labelY = ann.y - 12;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: ann.x,
              top: ann.y,
              opacity: annOpacity,
              zIndex: 15,
              pointerEvents: "none",
            }}
          >
            {/* 圆点标注 */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: COLORS.accentLight,
                border: `2px solid ${COLORS.text}`,
                boxShadow: `0 0 8px ${COLORS.accent}`,
              }}
            />

            {/* 短引导线 — 水平向左 60px */}
            <div
              style={{
                position: "absolute",
                left: -68,
                top: 4,
                width: 60,
                height: 1,
                background: `linear-gradient(to left, ${COLORS.accent}88, transparent)`,
              }}
            />

            {/* 标注文字 — 引导线末端 */}
            <div
              style={{
                position: "absolute",
                left: labelX - ann.x,
                top: labelY - ann.y,
                fontSize: 18,
                fontWeight: 500,
                color: COLORS.accentLight,
                whiteSpace: "nowrap",
                textShadow: "0 0 8px rgba(0,0,0,0.8)",
              }}
            >
              {ann.label}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
