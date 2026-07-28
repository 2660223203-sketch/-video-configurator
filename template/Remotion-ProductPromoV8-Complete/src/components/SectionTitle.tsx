import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config/brand";
import { TITLE, ANIM, LAYOUT } from "../config/layout";

interface SectionTitleProps {
  /** 主标题 */
  title: string;
  /** 副标题 (可选) */
  subtitle?: string;
  /** 进入起始帧 (相对于场景) */
  startFrame?: number;
  /** 自定义 X (默认 96) */
  x?: number;
  /** 自定义 Y (默认 72) */
  y?: number;
}

/**
 * 统一场景标题组件
 *
 * 固定在左上角，主标题 48px / 副标题 24px。
 * 统一使用淡入 + 上移动画，时长 14 帧。
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  startFrame = 0,
  x = LAYOUT.marginX,
  y = LAYOUT.marginY,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const slideY = interpolate(
    frame,
    [startFrame, startFrame + ANIM.fadeIn],
    [ANIM.slideUp, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `translateY(${slideY}px)`,
        zIndex: 20,
      }}
    >
      <div
        style={{
          fontSize: TITLE.fontSize,
          fontWeight: TITLE.fontWeight,
          color: COLORS.text,
          letterSpacing: 2,
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: TITLE.subtitleSize,
            fontWeight: TITLE.subtitleWeight,
            color: COLORS.textSecondary,
            letterSpacing: 1,
            marginTop: TITLE.subtitleGap,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
