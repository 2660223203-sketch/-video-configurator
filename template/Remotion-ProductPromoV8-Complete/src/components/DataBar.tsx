import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config/brand";
import { DATA_BAR, BODY, ANIM, LAYOUT } from "../config/layout";

interface DataBarItem {
  label: string;
  value: string;
}

interface DataBarProps {
  /** 数据项列表 (最多3个) */
  items: DataBarItem[];
  /** 进入起始帧 */
  startFrame?: number;
}

/**
 * 底部半透明数据栏
 *
 * 横向放置最多3个关键参数，统一背景 + 等间距排列。
 */
export const DataBar: React.FC<DataBarProps> = ({
  items,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const limitedItems = items.slice(0, 3);

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        left: LAYOUT.marginX,
        right: LAYOUT.marginX,
        bottom: DATA_BAR.bottom,
        height: DATA_BAR.height,
        opacity,
        zIndex: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 10,
        background: `rgba(15, 23, 42, ${DATA_BAR.bgOpacity})`,
        backdropFilter: "blur(8px)",
        border: `1px solid ${COLORS.accent}22`,
      }}
    >
      {limitedItems.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: BODY.labelSize,
              color: COLORS.textMuted,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {item.label}
          </div>
          <div
            style={{
              fontSize: BODY.fontSize,
              fontWeight: 600,
              color: COLORS.accentLight,
              fontFamily: "monospace",
            }}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};
