import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, TYPOGRAPHY, SHADOWS, RADIUS } from "../config/brand";

interface ParameterCardProps {
  /** 参数名称 */
  label: string;
  /** 参数值 */
  value: string;
  /** 进入起始帧 */
  startFrame?: number;
  /** 退出起始帧 */
  fadeOutStart?: number;
  /** X 偏移 */
  x?: number;
  /** Y 偏移 */
  y?: number;
  /** 强调色 */
  accentColor?: string;
}

/**
 * 参数卡片组件
 * 用于展示单个技术参数，带玻璃质感和滑入动画。
 */
export const ParameterCard: React.FC<ParameterCardProps> = ({
  label,
  value,
  startFrame = 0,
  fadeOutStart = 99999,
  x = 0,
  y = 0,
  accentColor = COLORS.accent,
}) => {
  const frame = useCurrentFrame();

  // 卡片滑入
  const slideY = interpolate(
    frame,
    [startFrame, startFrame + 20],
    [30, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 淡出
  const fadeOut = interpolate(
    frame,
    [fadeOutStart, fadeOutStart + 12],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: opacity * fadeOut,
        transform: `translateY(${slideY}px)`,
      }}
    >
      <div
        style={{
          background: COLORS.cardBg,
          backdropFilter: "blur(12px)",
          borderRadius: RADIUS.lg,
          border: `1px solid ${accentColor}33`,
          padding: "20px 32px",
          minWidth: 220,
          boxShadow: SHADOWS.card,
        }}
      >
        {/* 参数名 */}
        <div
          style={{
            fontSize: TYPOGRAPHY.caption.fontSize,
            color: COLORS.textMuted,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 6,
          }}
        >
          {label}
        </div>
        {/* 参数值 */}
        <div
          style={{
            fontSize: TYPOGRAPHY.h3.fontSize,
            fontWeight: 700,
            color: accentColor,
            letterSpacing: 0,
            lineHeight: 1.2,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};
