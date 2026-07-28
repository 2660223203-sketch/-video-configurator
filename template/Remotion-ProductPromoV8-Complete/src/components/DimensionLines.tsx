import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config/brand";

interface DimensionLinesProps {
  /** 尺寸文本，如 "68mm × 78.5mm × 9.5mm" */
  dimensions: string;
  /** 重量文本，如 "120g" */
  weight: string;
  /** 起始帧 */
  startFrame?: number;
  /** 淡出帧 */
  fadeOutStart?: number;
}

/**
 * 尺寸标注组件
 *
 * 在产品周围显示三维尺寸线和重量标注。
 * 使用 SVG 绘制清晰的工程尺寸线。
 */
export const DimensionLines: React.FC<DimensionLinesProps> = ({
  dimensions,
  weight,
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

  // 模拟产品矩形区域
  const rectW = 420;
  const rectH = 50;
  const rectX = 960 - rectW / 2;
  const rectY = 480 - rectH / 2;

  // 尺寸线逐条展开
  const line1Progress = interpolate(
    frame,
    [startFrame, startFrame + 12],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const line2Progress = interpolate(
    frame,
    [startFrame + 8, startFrame + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const line3Progress = interpolate(
    frame,
    [startFrame + 16, startFrame + 28],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 尺寸文字
  const parts = dimensions.split("×").map((p) => p.trim());

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
        {/* 产品主体矩形（半透明） */}
        <rect
          x={rectX}
          y={rectY}
          width={rectW}
          height={rectH}
          fill={COLORS.accent}
          opacity={0.06}
          rx={4}
          stroke={COLORS.accent}
          strokeWidth={1}
          strokeOpacity={0.3}
          strokeDasharray="6 3"
        />

        {/* 宽度标注线（水平 — 顶部） */}
        <DimensionLine
          x1={rectX}
          y1={rectY - 50}
          x2={rectX + rectW}
          y2={rectY - 50}
          progress={line1Progress}
          label={parts[0] || ""}
          position="top"
        />

        {/* 深度标注线（水平 — 底部） */}
        <DimensionLine
          x1={rectX}
          y1={rectY + rectH + 50}
          x2={rectX + rectW}
          y2={rectY + rectH + 50}
          progress={line2Progress}
          label={parts[1] || ""}
          position="bottom"
        />

        {/* 高度标注线（垂直 — 右侧） */}
        <VerticalDimensionLine
          x={rectX + rectW + 60}
          y1={rectY}
          y2={rectY + rectH}
          progress={line3Progress}
          label={parts[2] || ""}
        />

        {/* 重量标注 — 单独显示 */}
        <g opacity={interpolate(
          frame,
          [startFrame + 24, startFrame + 36],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )}>
          <rect
            x={rectX + rectW / 2 - 80}
            y={rectY + rectH + 100}
            width={160}
            height={48}
            rx={8}
            fill={COLORS.cardBg}
            stroke={COLORS.accent}
            strokeWidth={1}
            strokeOpacity={0.4}
          />
          <text
            x={rectX + rectW / 2}
            y={rectY + rectH + 120}
            textAnchor="middle"
            fill={COLORS.textSecondary}
            fontSize={13}
            fontFamily="sans-serif"
            letterSpacing={1}
          >
            重量
          </text>
          <text
            x={rectX + rectW / 2}
            y={rectY + rectH + 138}
            textAnchor="middle"
            fill={COLORS.accentLight}
            fontSize={20}
            fontWeight={700}
            fontFamily="sans-serif"
          >
            {weight}
          </text>
        </g>
      </svg>
    </div>
  );
};

// ── 标注线子组件 ──

function DimensionLine({
  x1,
  y1,
  x2,
  y2,
  progress,
  label,
  position,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: number;
  label: string;
  position: "top" | "bottom";
}) {
  const endX = x1 + (x2 - x1) * progress;
  const endArrowSize = progress > 0.95 ? 8 : 0;

  return (
    <g>
      {/* 主尺寸线 */}
      <line
        x1={x1}
        y1={y1}
        x2={endX}
        y2={y2}
        stroke={COLORS.accent}
        strokeWidth={1.5}
        opacity={0.7}
      />
      {/* 左端线 */}
      <line
        x1={x1}
        y1={y1 - 10}
        x2={x1}
        y2={y1 + 10}
        stroke={COLORS.accent}
        strokeWidth={1.5}
        opacity={0.7}
      />
      {/* 右端线 */}
      {progress > 0.9 && (
        <line
          x1={x2}
          y1={y2 - 10}
          x2={x2}
          y2={y2 + 10}
          stroke={COLORS.accent}
          strokeWidth={1.5}
          opacity={0.7}
        />
      )}
      {/* 标签 */}
      <rect
        x={(x1 + x2) / 2 - 40}
        y={position === "top" ? y1 - 30 : y1 + 8}
        width={80}
        height={22}
        rx={4}
        fill={COLORS.bg}
        opacity={progress > 0.5 ? 0.9 : 0}
      />
      <text
        x={(x1 + x2) / 2}
        y={position === "top" ? y1 - 14 : y1 + 24}
        textAnchor="middle"
        fill={COLORS.accentLight}
        fontSize={13}
        fontWeight={600}
        fontFamily="sans-serif"
        opacity={progress > 0.5 ? 1 : 0}
      >
        {label}
      </text>
      {/* 箭头 */}
      {endArrowSize > 0 && (
        <>
          <polygon
            points={`${x2},${y2} ${x2 - endArrowSize},${y2 - 4} ${x2 - endArrowSize},${y2 + 4}`}
            fill={COLORS.accent}
            opacity={0.7}
          />
        </>
      )}
    </g>
  );
}

function VerticalDimensionLine({
  x,
  y1,
  y2,
  progress,
  label,
}: {
  x: number;
  y1: number;
  y2: number;
  progress: number;
  label: string;
}) {
  const endY = y1 + (y2 - y1) * progress;

  return (
    <g>
      {/* 主尺寸线 */}
      <line
        x1={x}
        y1={y1}
        x2={x}
        y2={endY}
        stroke={COLORS.accent}
        strokeWidth={1.5}
        opacity={0.7}
      />
      {/* 上端线 */}
      <line
        x1={x - 10}
        y1={y1}
        x2={x + 10}
        y2={y1}
        stroke={COLORS.accent}
        strokeWidth={1.5}
        opacity={0.7}
      />
      {/* 下端线 */}
      {progress > 0.9 && (
        <line
          x1={x - 10}
          y1={y2}
          x2={x + 10}
          y2={y2}
          stroke={COLORS.accent}
          strokeWidth={1.5}
          opacity={0.7}
        />
      )}
      {/* 标签 */}
      <rect
        x={x + 6}
        y={(y1 + y2) / 2 - 11}
        width={80}
        height={22}
        rx={4}
        fill={COLORS.bg}
        opacity={progress > 0.5 ? 0.9 : 0}
      />
      <text
        x={x + 46}
        y={(y1 + y2) / 2 + 5}
        textAnchor="middle"
        fill={COLORS.accentLight}
        fontSize={13}
        fontWeight={600}
        fontFamily="sans-serif"
        opacity={progress > 0.5 ? 1 : 0}
      >
        {label}
      </text>
    </g>
  );
}
