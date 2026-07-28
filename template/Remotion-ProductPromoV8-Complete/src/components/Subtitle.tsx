import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, TYPOGRAPHY, SHADOWS } from "../config/brand";

interface SubtitleProps {
  /** 主标题 */
  title: string;
  /** 副标题（可选） */
  subtitle?: string;
  /** 小字说明（可选） */
  caption?: string;
  /** 标题进入帧 */
  titleStartFrame?: number;
  /** 副标题进入帧 */
  subtitleStartFrame?: number;
  /** 小字进入帧 */
  captionStartFrame?: number;
  /** 整体淡出帧 */
  fadeOutStart?: number;
  /** 位置：左上/中上/右上/居中/左下/中下/右下 */
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  /** 文字对齐 */
  textAlign?: "left" | "center" | "right";
}

/**
 * 字幕/文字叠层组件
 */
export const Subtitle: React.FC<SubtitleProps> = ({
  title,
  subtitle,
  caption,
  titleStartFrame = 0,
  subtitleStartFrame = 12,
  captionStartFrame = 24,
  fadeOutStart = 99999,
  position = "center",
  textAlign = "center",
}) => {
  const frame = useCurrentFrame();

  // 进入动画
  const titleOpacity = interpolate(
    frame,
    [titleStartFrame, titleStartFrame + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const titleY = interpolate(
    frame,
    [titleStartFrame, titleStartFrame + 18],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const subOpacity =
    subtitleStartFrame > 0 && subtitle
      ? interpolate(
          frame,
          [subtitleStartFrame, subtitleStartFrame + 15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      : 0;

  const captionOpacity =
    captionStartFrame > 0 && caption
      ? interpolate(
          frame,
          [captionStartFrame, captionStartFrame + 15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      : 0;

  // 整体淡出
  const fadeOut = interpolate(
    frame,
    [fadeOutStart, fadeOutStart + 12],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 位置映射
  const positionStyles: Record<string, React.CSSProperties> = {
    "top-left": {
      top: 60,
      left: 80,
      alignItems: "flex-start",
    },
    "top-center": {
      top: 60,
      left: "50%",
      transform: "translateX(-50%)",
      alignItems: "center",
    },
    "top-right": {
      top: 60,
      right: 80,
      alignItems: "flex-end",
    },
    center: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      alignItems: "center",
    },
    "bottom-left": {
      bottom: 80,
      left: 80,
      alignItems: "flex-start",
    },
    "bottom-center": {
      bottom: 80,
      left: "50%",
      transform: "translateX(-50%)",
      alignItems: "center",
    },
    "bottom-right": {
      bottom: 80,
      right: 80,
      alignItems: "flex-end",
    },
  };

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyles[position],
        textAlign,
        zIndex: 20,
        opacity: fadeOut,
        maxWidth: "85%",
      }}
    >
      {/* 主标题 */}
      <div
        style={{
          fontSize: TYPOGRAPHY.h1.fontSize,
          fontWeight: TYPOGRAPHY.h1.fontWeight,
          color: COLORS.text,
          letterSpacing: TYPOGRAPHY.h1.letterSpacing,
          lineHeight: TYPOGRAPHY.h1.lineHeight,
          textShadow: SHADOWS.textGlow,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        {title}
      </div>

      {/* 副标题 */}
      {subtitle && (
        <div
          style={{
            fontSize: TYPOGRAPHY.h3.fontSize,
            fontWeight: TYPOGRAPHY.h3.fontWeight,
            color: COLORS.textSecondary,
            letterSpacing: TYPOGRAPHY.h3.letterSpacing,
            lineHeight: TYPOGRAPHY.h3.lineHeight,
            marginTop: 12,
            opacity: subOpacity,
          }}
        >
          {subtitle}
        </div>
      )}

      {/* 小字 */}
      {caption && (
        <div
          style={{
            fontSize: TYPOGRAPHY.caption.fontSize,
            fontWeight: TYPOGRAPHY.caption.fontWeight,
            color: COLORS.textMuted,
            marginTop: 8,
            opacity: captionOpacity,
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
};
