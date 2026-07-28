import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../config/brand";
import { fadeIn, fadeOut } from "../utils/animations";

interface TechGridProps {
  /** 网格透明度 0-1 */
  opacity?: number;
  /** 网格大小 */
  cellSize?: number;
  /** 是否显示大网格 */
  showMajorGrid?: boolean;
  /** 是否在四周渐隐 */
  edgeFade?: boolean;
  /** 淡入起始帧 */
  fadeInStart?: number;
  /** 淡出起始帧 */
  fadeOutStart?: number;
}

/**
 * 科技网格背景组件
 * 使用 SVG 绘制，清晰且性能好。
 */
export const TechGrid: React.FC<TechGridProps> = ({
  opacity = 0.5,
  cellSize = 60,
  showMajorGrid = true,
  edgeFade = true,
  fadeInStart = 0,
  fadeOutStart = 99999,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const alpha =
    fadeIn(frame, fadeInStart, 20) * fadeOut(frame, fadeOutStart, 15) * opacity;

  // 绘制网格线
  const lines: React.ReactNode[] = [];
  const minorColor = COLORS.gridLine;
  const majorColor = "rgba(14, 165, 233, 0.25)";

  // 竖线
  for (let x = 0; x <= width; x += cellSize) {
    const isMajor = showMajorGrid && x % (cellSize * 5) === 0;
    lines.push(
      <line
        key={`v${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke={isMajor ? majorColor : minorColor}
        strokeWidth={isMajor ? 1 : 0.5}
      />,
    );
  }

  // 横线
  for (let y = 0; y <= height; y += cellSize) {
    const isMajor = showMajorGrid && y % (cellSize * 5) === 0;
    lines.push(
      <line
        key={`h${y}`}
        x1={0}
        y1={y}
        x2={width}
        y2={y}
        stroke={isMajor ? majorColor : minorColor}
        strokeWidth={isMajor ? 1 : 0.5}
      />,
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: alpha,
        pointerEvents: "none",
      }}
    >
      <svg width={width} height={height} style={{ display: "block" }}>
        {lines}
      </svg>
      {edgeFade && (
        <>
          {/* 四周渐隐遮罩 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `
                radial-gradient(
                  ellipse at 50% 50%,
                  transparent 40%,
                  ${COLORS.bg} 100%
                )
              `,
            }}
          />
        </>
      )}
    </div>
  );
};
