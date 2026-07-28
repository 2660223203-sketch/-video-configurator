import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config/brand";

interface SpectrumGraphicProps {
  /** 起始帧 */
  startFrame?: number;
  /** 淡出帧 */
  fadeOutStart?: number;
  /** 主峰频率标签 */
  mainPeakLabel?: string;
}

/**
 * 频谱示意图组件
 *
 * 抽象频谱展示：主峰升起 → 杂散降低 → Marker 线 → 数据卡片。
 */
export const SpectrumGraphic: React.FC<SpectrumGraphicProps> = ({
  startFrame = 0,
  fadeOutStart = 99999,
  mainPeakLabel = "主信号",
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

  const baseY = 620;
  const peakHeight = 260;
  const chartX1 = 200;
  const chartX2 = 1720;

  // 主峰升起动画
  const peakScale = interpolate(
    frame,
    [startFrame, startFrame + 25],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Marker 线进入
  const markerY = interpolate(
    frame,
    [startFrame + 20, startFrame + 35],
    [baseY, baseY - peakHeight * 0.85],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const markerOpacity = interpolate(
    frame,
    [startFrame + 18, startFrame + 28],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 杂散抑制区域
  const spurOpacity = interpolate(
    frame,
    [startFrame + 20, startFrame + 35],
    [0, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 用固定种子生成频谱曲线点
  const curvePoints = generateSpectrumPoints(chartX1, chartX2, baseY, peakHeight);

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
        {/* 基线 */}
        <line
          x1={chartX1}
          y1={baseY}
          x2={chartX2}
          y2={baseY}
          stroke={COLORS.gridLine}
          strokeWidth={1}
        />

        {/* 频谱曲线填充区域 */}
        <path
          d={buildFilledPath(curvePoints, baseY, peakScale)}
          fill={COLORS.accent}
          opacity={0.12}
        />

        {/* 频谱曲线 */}
        <path
          d={buildLinePath(curvePoints, baseY, peakScale)}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth={2.5}
          opacity={0.8}
        />

        {/* 杂散抑制区域标注 */}
        <rect
          x={chartX1 + 100}
          y={baseY - peakHeight * peakScale * 0.5}
          width={chartX2 - chartX1 - 200}
          height={peakHeight * peakScale * 0.4}
          fill={COLORS.success}
          opacity={spurOpacity * 0.08}
          rx={4}
        />
        <text
          x={(chartX1 + chartX2) / 2}
          y={baseY - peakHeight * peakScale * 0.55}
          textAnchor="middle"
          fill={COLORS.success}
          fontSize={14}
          fontFamily="sans-serif"
          opacity={spurOpacity}
          letterSpacing={1}
        >
          杂散抑制 ≥50dBc
        </text>

        {/* Marker 线 */}
        <line
          x1={chartX1 + 50}
          y1={markerY - 30}
          x2={chartX2 - 50}
          y2={markerY - 30}
          stroke={COLORS.accentLight}
          strokeWidth={1}
          strokeDasharray="8 4"
          opacity={markerOpacity}
        />
        <text
          x={chartX2 - 60}
          y={markerY - 40}
          textAnchor="end"
          fill={COLORS.accentLight}
          fontSize={14}
          fontFamily="sans-serif"
          opacity={markerOpacity}
        >
          Marker
        </text>

        {/* 主峰标签 */}
        {peakScale > 0.3 && (
          <text
            x={880}
            y={baseY - peakHeight * peakScale - 20}
            textAnchor="middle"
            fill={COLORS.text}
            fontSize={16}
            fontWeight={600}
            fontFamily="sans-serif"
            opacity={peakScale}
          >
            {mainPeakLabel}
          </text>
        )}

        {/* 坐标轴标签 */}
        <text
          x={chartX1 - 10}
          y={baseY - peakHeight / 2}
          textAnchor="end"
          fill={COLORS.textMuted}
          fontSize={12}
          fontFamily="sans-serif"
        >
          幅度
        </text>
        <text
          x={(chartX1 + chartX2) / 2}
          y={baseY + 40}
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize={12}
          fontFamily="sans-serif"
        >
          频率
        </text>
      </svg>
    </div>
  );
};

// ── 频谱曲线生成工具 ──

interface Point {
  x: number;
  y: number;
}

/** 基于固定种子生成频谱曲线点（不使用 Math.random） */
function generateSpectrumPoints(
  x1: number,
  x2: number,
  baseY: number,
  peakHeight: number,
  numPoints: number = 60,
): Point[] {
  const points: Point[] = [];
  const step = (x2 - x1) / (numPoints - 1);
  // 主峰位置在 55% 处
  const peakX = x1 + (x2 - x1) * 0.55;

  for (let i = 0; i < numPoints; i++) {
    const x = x1 + i * step;
    // 用正弦组合模拟频谱包络（固定种子）
    const distFromPeak = Math.abs(i - Math.floor(numPoints * 0.55)) / (numPoints * 0.3);
    let y: number;
    if (distFromPeak < 1) {
      // 主峰：高斯近似
      y = baseY - peakHeight * Math.exp(-distFromPeak * distFromPeak * 3);
    } else {
      // 旁瓣/杂散：用确定性波动
      const noise = Math.sin(i * 2.7 + 1.3) * 0.15 + Math.sin(i * 5.1 + 0.7) * 0.1;
      y = baseY - peakHeight * (0.1 + noise);
    }
    points.push({ x, y });
  }
  return points;
}

function buildLinePath(
  points: Point[],
  _baseY: number,
  scale: number,
): string {
  if (points.length === 0) return "";
  const baseY = points[0].y + (points[0].y > 600 ? 0 : 0);
  // Scale around baseY
  const scaled = points.map((p) => ({
    x: p.x,
    y: baseY + (p.y - baseY) * scale,
  }));
  let d = `M ${scaled[0].x} ${scaled[0].y}`;
  for (let i = 1; i < scaled.length; i++) {
    const prev = scaled[i - 1];
    const curr = scaled[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` Q ${prev.x} ${prev.y} ${cpx} ${(prev.y + curr.y) / 2}`;
    d += ` Q ${curr.x} ${curr.y} ${curr.x} ${curr.y}`;
  }
  return d;
}

function buildFilledPath(
  points: Point[],
  baseY: number,
  scale: number,
): string {
  const scaled = points.map((p) => ({
    x: p.x,
    y: baseY + (p.y - baseY) * scale,
  }));
  let d = `M ${scaled[0].x} ${baseY}`;
  d += ` L ${scaled[0].x} ${scaled[0].y}`;
  for (let i = 1; i < scaled.length; i++) {
    const prev = scaled[i - 1];
    const curr = scaled[i];
    d += ` Q ${prev.x} ${prev.y} ${(prev.x + curr.x) / 2} ${(prev.y + curr.y) / 2}`;
    d += ` Q ${curr.x} ${curr.y} ${curr.x} ${curr.y}`;
  }
  d += ` L ${scaled[scaled.length - 1].x} ${baseY}`;
  d += " Z";
  return d;
}
