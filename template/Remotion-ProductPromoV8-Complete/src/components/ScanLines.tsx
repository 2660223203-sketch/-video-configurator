import React from "react";
import { COLORS } from "../config/brand";

interface ScanLinesProps {
  /** 透明度 0-1 */
  opacity?: number;
  /** 线间距（像素） */
  spacing?: number;
  /** 线条颜色（默认白色） */
  color?: string;
}

/**
 * 扫描线效果组件
 * 克制的横向扫描线，增加技术感。
 */
export const ScanLines: React.FC<ScanLinesProps> = ({
  opacity = 0.06,
  spacing = 4,
  color = "rgba(255,255,255,0.5)",
}) => {
  const lineCount = Math.floor(1080 / spacing);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: lineCount }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: i * spacing,
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};
