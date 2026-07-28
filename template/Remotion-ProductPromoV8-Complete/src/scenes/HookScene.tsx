import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { COLORS } from "../config/brand";
import { SCENE_CONTENT } from "../config/content";
import { ASSETS } from "../config/assets";
import { TRANSITION } from "../config/timeline";
import { ANIM, OVERLAY, LAYOUT } from "../config/layout";

/**
 * 0-5s: 开场 — 真实测试画面全屏背景 + 大标题 + 副标题
 */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 5 * 30; // 150 frames

  const sceneFadeIn = interpolate(
    frame,
    [0, 4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const sceneFadeOut = interpolate(
    frame,
    [duration - TRANSITION.crossfade, duration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 标题：淡入 + 上移
  const titleOpacity = interpolate(
    frame,
    [6, 6 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const titleSlide = interpolate(
    frame,
    [6, 6 + ANIM.fadeIn],
    [ANIM.slideUp, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        opacity: sceneFadeIn * sceneFadeOut,
        backgroundColor: COLORS.bg,
      }}
    >
      {/* 真实测试画面全屏背景 + 35% 暗色遮罩 */}
      <BackgroundVideo
        src={ASSETS.video.demo1}
        startFrom={0}
        brightness={1}
        contrast={1}
        saturation={0.6}
        blur={0}
        darkOverlay={OVERLAY.darkOverlay}
        muted
      />

      {/* 左侧居中标题区域 */}
      <div
        style={{
          position: "absolute",
          left: LAYOUT.marginX,
          top: "50%",
          transform: `translateY(calc(-50% + ${titleSlide}px))`,
          opacity: titleOpacity,
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: 4,
            lineHeight: 1.2,
          }}
        >
          {SCENE_CONTENT.hook.title}
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: COLORS.accentLight,
            letterSpacing: 2,
            marginTop: 14,
          }}
        >
          {SCENE_CONTENT.hook.subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
