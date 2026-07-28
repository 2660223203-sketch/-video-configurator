import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { SpectrumGraphic } from "../components/SpectrumGraphic";
import { SectionTitle } from "../components/SectionTitle";
import { COLORS } from "../config/brand";
import { SCENE_CONTENT } from "../config/content";
import { ASSETS } from "../config/assets";
import { TRANSITION } from "../config/timeline";
import { CHART, ANIM } from "../config/layout";

/**
 * 25-31s: 频谱性能 — 左上标题 + 中央图表面板 + 右上角核心指标
 */
export const SpectrumScene: React.FC = () => {
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

  // 面板参数
  const panelW = 1920 * CHART.widthRatio; // 1440
  const panelH = 1080 * CHART.heightRatio; // 594
  const panelX = (1920 - panelW) / 2; // 240
  const panelY = (1080 - panelH) / 2 - 20; // ~223

  const panelOpacity = interpolate(
    frame,
    [4, 4 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 核心指标卡片 (右上角对齐面板)
  const metricOpacity = interpolate(
    frame,
    [25, 25 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{ opacity: fadeIn * fadeOut, backgroundColor: COLORS.bg }}
    >
      <BackgroundVideo
        src={ASSETS.video.demo4}
        startFrom={0}
        brightness={1}
        contrast={1.1}
        saturation={0.3}
        blur={1.5}
        darkOverlay={0.45}
        muted
      />

      {/* 左上标题 */}
      <SectionTitle
        title={SCENE_CONTENT.spectrum.title}
        subtitle={SCENE_CONTENT.spectrum.indicator}
        startFrame={3}
      />

      {/* 中央大型半透明面板 */}
      <div
        style={{
          position: "absolute",
          left: panelX,
          top: panelY,
          width: panelW,
          height: panelH,
          borderRadius: 14,
          background: `rgba(15, 23, 42, 0.8)`,
          backdropFilter: "blur(4px)",
          border: `1px solid ${COLORS.accent}22`,
          opacity: panelOpacity,
          zIndex: 12,
          overflow: "hidden",
        }}
      >
        {/* 频谱图 */}
        <SpectrumGraphic
          startFrame={8}
          fadeOutStart={duration - 8}
          mainPeakLabel="主信号"
        />

        {/* 右上角核心指标 — 对齐面板边缘 */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            opacity: metricOpacity,
            zIndex: 25,
            background: `rgba(16, 185, 129, 0.12)`,
            borderRadius: 8,
            border: `1px solid ${COLORS.success}44`,
            padding: "14px 28px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: COLORS.success,
              letterSpacing: 2,
              marginBottom: 4,
            }}
          >
            杂散抑制
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: COLORS.success,
              fontFamily: "monospace",
            }}
          >
            {SCENE_CONTENT.spectrum.value}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
