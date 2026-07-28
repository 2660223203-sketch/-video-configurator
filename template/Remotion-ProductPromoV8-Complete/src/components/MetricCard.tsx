import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config/brand";
import { CARD, BODY, ANIM } from "../config/layout";

interface MetricCardProps {
  /** 参数标签 */
  label: string;
  /** 参数值 */
  value: string;
  /** 出现顺序 index (用于交错动画) */
  index?: number;
  /** 进入起始帧 */
  startFrame?: number;
  /** 强调色 */
  accentColor?: string;
}

/**
 * 统一参数卡片组件
 *
 * 统一尺寸 (260px×auto)、圆角 (10px)、描边、背景透明度和内边距。
 * 使用淡入 + 上移动画，时长 14 帧，与索引交错。
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  index = 0,
  startFrame = 0,
  accentColor = COLORS.accent,
}) => {
  const frame = useCurrentFrame();
  const itemStart = startFrame + index * 12;

  const opacity = interpolate(
    frame,
    [itemStart, itemStart + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const slideY = interpolate(
    frame,
    [itemStart, itemStart + ANIM.fadeIn],
    [ANIM.slideUp, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${slideY}px)`,
        marginBottom: CARD.gap,
      }}
    >
      <div
        style={{
          width: CARD.width,
          padding: `${CARD.paddingY}px ${CARD.paddingX}px`,
          borderRadius: CARD.radius,
          background: `rgba(15, 23, 42, ${CARD.bgOpacity})`,
          backdropFilter: `blur(${CARD.blur}px)`,
          border: `1px solid ${accentColor}${Math.round(CARD.borderOpacity * 255).toString(16).padStart(2, "0")}`,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: BODY.labelSize,
            color: COLORS.textMuted,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: BODY.valueSize,
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
