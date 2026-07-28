import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config/brand";

interface BandwidthGraphicProps {
  /** 带宽文本 */
  bandwidth: string;
  /** 起始帧 */
  startFrame?: number;
  /** 淡出帧 */
  fadeOutStart?: number;
}

/**
 * 带宽光带组件
 *
 * 以光带形式展示瞬时带宽，带脉动和光流效果。
 */
export const BandwidthGraphic: React.FC<BandwidthGraphicProps> = ({
  bandwidth,
  startFrame = 0,
  fadeOutStart = 99999,
}) => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(
    frame,
    [fadeOutStart, fadeOutStart + 12],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const appear = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 光带宽度脉动
  const pulseWidth = interpolate(
    frame,
    [startFrame + 20, startFrame + 35, startFrame + 50],
    [300, 380, 300],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 光点从左到右移动
  const lightX = interpolate(
    frame,
    [startFrame + 10, startFrame + 70],
    [360, 1560],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const cy = 600;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: appear * fadeOut,
        pointerEvents: "none",
      }}
    >
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="bwGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={COLORS.bg} stopOpacity={0} />
            <stop offset="20%" stopColor={COLORS.accent} stopOpacity={0.4} />
            <stop offset="50%" stopColor={COLORS.accentLight} stopOpacity={0.7} />
            <stop offset="80%" stopColor={COLORS.accent} stopOpacity={0.4} />
            <stop offset="100%" stopColor={COLORS.bg} stopOpacity={0} />
          </linearGradient>
          <filter id="bwGlow">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* 标签 */}
        <text
          x={960}
          y={cy - 50}
          textAnchor="middle"
          fill={COLORS.textSecondary}
          fontSize={18}
          fontFamily="sans-serif"
          letterSpacing={2}
        >
          瞬时带宽
        </text>

        {/* 光带背景 */}
        <rect
          x={460}
          y={cy - 16}
          width={1000}
          height={32}
          rx={16}
          fill={COLORS.accent}
          opacity={0.08}
        />

        {/* 光带主体 */}
        <rect
          x={960 - pulseWidth / 2}
          y={cy - 12}
          width={pulseWidth}
          height={24}
          rx={12}
          fill="url(#bwGradient)"
          filter="url(#bwGlow)"
          opacity={0.8}
        />

        {/* 光带中心亮线 */}
        <line
          x1={960 - pulseWidth / 2 + 20}
          y1={cy}
          x2={960 + pulseWidth / 2 - 20}
          y2={cy}
          stroke={COLORS.accentLight}
          strokeWidth={2}
          opacity={0.9}
        />

        {/* 移动光点 */}
        <circle
          cx={lightX}
          cy={cy}
          r={8}
          fill={COLORS.accentLight}
          filter="url(#bwGlow)"
        />
        <circle cx={lightX} cy={cy} r={3} fill={COLORS.text} />

        {/* 带宽数值 */}
        <text
          x={960}
          y={cy + 50}
          textAnchor="middle"
          fill={COLORS.accentLight}
          fontSize={48}
          fontWeight={700}
          fontFamily="sans-serif"
        >
          {bandwidth}
        </text>

        {/* 频率标注 */}
        <text
          x={460}
          y={cy + 22}
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize={13}
          fontFamily="sans-serif"
        >
          低频
        </text>
        <text
          x={1460}
          y={cy + 22}
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize={13}
          fontFamily="sans-serif"
        >
          高频
        </text>
      </svg>
    </div>
  );
};
