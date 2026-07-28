import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { SectionTitle } from "../components/SectionTitle";
import { DataBar } from "../components/DataBar";
import { COLORS } from "../config/brand";
import { SCENE_CONTENT, PRODUCT_PARAMS } from "../config/content";
import { ASSETS } from "../config/assets";
import { TRANSITION } from "../config/timeline";
import { OVERLAY, ANIM } from "../config/layout";

/**
 * 17-25s: 宽频覆盖测试 — 全屏测试画面 + 左上标题 + 底部数据栏
 */
export const FrequencyBandwidthScene: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 8 * 30;

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

  const dataBarItems = [
    { label: "输入频率", value: "2～18GHz" },
    { label: "输出频率", value: "2～18GHz" },
    { label: "变频范围", value: "1.3～2.3GHz IF" },
  ];

  // 简洁频率范围线 (水平，位于画面中上部)
  const rangeLineOpacity = interpolate(
    frame,
    [25, 25 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{ opacity: fadeIn * fadeOut, backgroundColor: COLORS.bg }}
    >
      {/* 全屏测试画面 — 35% 暗色遮罩，保证看清 */}
      <BackgroundVideo
        src={ASSETS.video.demo3}
        startFrom={0}
        brightness={1}
        contrast={1.05}
        saturation={0.7}
        blur={0}
        darkOverlay={OVERLAY.darkOverlay}
        muted
      />

      {/* 左上标题 */}
      <SectionTitle
        title="宽频覆盖测试"
        subtitle={SCENE_CONTENT.frequencyBandwidth.tagline}
        startFrame={4}
      />

      {/* 简洁频率范围线 — 一条横线 + 两端标注 */}
      <div
        style={{
          position: "absolute",
          left: 200,
          right: 200,
          top: 440,
          height: 50,
          opacity: rangeLineOpacity,
          zIndex: 15,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 1,
            background: `linear-gradient(to right, ${COLORS.accent}44, ${COLORS.accent}, ${COLORS.accent}44)`,
            position: "absolute",
            top: 25,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 8,
            fontSize: 18,
            color: COLORS.accent,
            fontWeight: 600,
            fontFamily: "monospace",
          }}
        >
          2GHz
        </div>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 8,
            fontSize: 18,
            color: COLORS.accent,
            fontWeight: 600,
            fontFamily: "monospace",
          }}
        >
          18GHz
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            transform: "translateX(-50%)",
            fontSize: 20,
            fontWeight: 700,
            color: COLORS.accentLight,
            letterSpacing: 1,
          }}
        >
          {PRODUCT_PARAMS.instantaneousBandwidth} 瞬时带宽
        </div>
      </div>

      {/* 底部数据栏 — 3个关键参数 */}
      <DataBar items={dataBarItems} startFrame={50} />
    </AbsoluteFill>
  );
};
