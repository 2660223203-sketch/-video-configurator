import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config/brand";

interface FrequencyScaleProps {
  /** 频率范围文本，如 "2~18GHz" */
  range: string;
  /** 中频范围文本，如 "1.3~2.3GHz" */
  ifRange: string;
  /** 起始帧 */
  startFrame?: number;
  /** 淡出帧 */
  fadeOutStart?: number;
}

/**
 * 频率刻度组件
 *
 * 绘制频率刻度尺，高亮中频范围，配光圈带。
 */
export const FrequencyScale: React.FC<FrequencyScaleProps> = ({
  range,
  ifRange,
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
  const appear = interpolate(
    frame,
    [startFrame, startFrame + 25],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 刻度尺参数
  const scaleY = 540;
  const scaleX1 = 160;
  const scaleX2 = 1760;
  const tickCount = 18; // 0-18GHz 简化刻度
  const tickSpacing = (scaleX2 - scaleX1) / (tickCount - 1);

  // 中频高亮区域 (1.3~2.3GHz 在整个刻度中的位置)
  const ifStartX = scaleX1 + (1.3 / 18) * (scaleX2 - scaleX1);
  const ifEndX = scaleX1 + (2.3 / 18) * (scaleX2 - scaleX1);

  // 扫描线从左到右
  const scanLineX = interpolate(
    frame,
    [startFrame + 10, startFrame + 80],
    [scaleX1, scaleX2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

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
        {/* 频率名称标签 */}
        <text
          x={scaleX1}
          y={scaleY - 120}
          fill={COLORS.textSecondary}
          fontSize={18}
          fontFamily="sans-serif"
          letterSpacing={2}
        >
          FREQUENCY RANGE
        </text>

        {/* 主刻度线 */}
        {Array.from({ length: tickCount }, (_, i) => {
          const x = scaleX1 + i * tickSpacing;
          const isMajor = i % 3 === 0;
          return (
            <g key={`tick-${i}`}>
              <line
                x1={x}
                y1={scaleY - (isMajor ? 20 : 10)}
                x2={x}
                y2={scaleY + (isMajor ? 20 : 10)}
                stroke={isMajor ? COLORS.textSecondary : COLORS.textMuted}
                strokeWidth={isMajor ? 1.5 : 0.5}
              />
              {isMajor && (
                <text
                  x={x}
                  y={scaleY + 36}
                  textAnchor="middle"
                  fill={COLORS.textSecondary}
                  fontSize={13}
                  fontFamily="sans-serif"
                >
                  {i}
                </text>
              )}
            </g>
          );
        })}

        {/* 频率范围横线 */}
        <line
          x1={scaleX1}
          y1={scaleY}
          x2={scaleX2}
          y2={scaleY}
          stroke={COLORS.textSecondary}
          strokeWidth={1}
          opacity={0.5}
        />

        {/* 端点标记 */}
        <text
          x={scaleX1}
          y={scaleY + 56}
          textAnchor="middle"
          fill={COLORS.accent}
          fontSize={18}
          fontWeight={700}
          fontFamily="sans-serif"
        >
          {range.split("~")[0]}
        </text>
        <text
          x={scaleX2}
          y={scaleY + 56}
          textAnchor="middle"
          fill={COLORS.accent}
          fontSize={18}
          fontWeight={700}
          fontFamily="sans-serif"
        >
          {range.split("~")[1]?.replace("GHz", "")}GHz
        </text>

        {/* 中频高亮区域 */}
        <rect
          x={ifStartX}
          y={scaleY - 80}
          width={ifEndX - ifStartX}
          height={160}
          fill={COLORS.accent}
          opacity={0.12}
          rx={2}
        />
        <text
          x={(ifStartX + ifEndX) / 2}
          y={scaleY - 60}
          textAnchor="middle"
          fill={COLORS.cyan}
          fontSize={16}
          fontWeight={600}
          fontFamily="sans-serif"
        >
          中频 {ifRange}
        </text>

        {/* 扫描线 */}
        <line
          x1={scanLineX}
          y1={scaleY - 80}
          x2={scanLineX}
          y2={scaleY + 80}
          stroke={COLORS.accentLight}
          strokeWidth={1.5}
          opacity={0.7}
        />
        <circle
          cx={scanLineX}
          cy={scaleY}
          r={5}
          fill={COLORS.accentLight}
          opacity={0.8}
        />

        {/* 范围标注 */}
        <line
          x1={scaleX1}
          y1={scaleY - 60}
          x2={scaleX2}
          y2={scaleY - 60}
          stroke={COLORS.accent}
          strokeWidth={1}
          opacity={0.4}
          strokeDasharray="3 6"
        />
        {/* 范围箭头 */}
        <text
          x={(scaleX1 + scaleX2) / 2}
          y={scaleY - 72}
          textAnchor="middle"
          fill={COLORS.accent}
          fontSize={14}
          fontFamily="sans-serif"
          letterSpacing={1}
        >
          {range}
        </text>
      </svg>
    </div>
  );
};
