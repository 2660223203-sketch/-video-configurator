import React from "react";

interface TwoColumnLayoutProps {
  /** 左侧内容 */
  left: React.ReactNode;
  /** 右侧内容 */
  right: React.ReactNode;
  /** 左栏宽度 (px) */
  leftWidth: number;
  /** 右栏宽度 (px) */
  rightWidth: number;
  /** 栏间距 */
  gap?: number;
  /** 整体 Y 偏移 */
  top?: number;
  /** X 起始偏移 */
  x?: number;
}

/**
 * 统一两栏布局组件
 *
 * 所有使用左右分栏的场景统一使用此组件，
 * 保证左栏和右栏始终在同一水平基线上。
 */
export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  left,
  right,
  leftWidth,
  rightWidth,
  gap = 60,
  top = 180,
  x = 96,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top,
        display: "flex",
        flexDirection: "row",
        gap,
        alignItems: "flex-start",
        zIndex: 10,
      }}
    >
      {/* 左栏 */}
      <div style={{ width: leftWidth, flexShrink: 0 }}>{left}</div>
      {/* 右栏 */}
      <div
        style={{
          width: rightWidth,
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {right}
      </div>
    </div>
  );
};
