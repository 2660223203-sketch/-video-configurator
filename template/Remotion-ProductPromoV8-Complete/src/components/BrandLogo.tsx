import React from "react";
import { Img, useCurrentFrame, interpolate } from "remotion";
import { getAssetPath } from "../utils/media";
import { COLORS, COMPANY } from "../config/brand";
import { hasAsset } from "../config/assets";

interface BrandLogoProps {
  /** Logo 图片路径 */
  src?: string | null;
  /** 公司名称 */
  companyName?: string;
  /** 联系方式文本 */
  contactInfo?: string;
  /** 显示宽度 */
  width?: number;
  /** X 位置 */
  x?: number;
  /** Y 位置 */
  y?: number;
  /** 进入帧 */
  startFrame?: number;
  /** 淡出帧 */
  fadeOutStart?: number;
  /** 是否显示联系方式 */
  showContact?: boolean;
}

/**
 * 品牌 Logo 和公司信息组件
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  src,
  companyName = COMPANY.name,
  contactInfo,
  width = 180,
  x = 960 - 90,
  y = 400,
  startFrame = 0,
  fadeOutStart = 99999,
  showContact = false,
}) => {
  const frame = useCurrentFrame();
  const resolvedSrc = src ? getAssetPath(src) : null;

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const fadeOut = interpolate(
    frame,
    [fadeOutStart, fadeOutStart + 12],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const slideY = interpolate(
    frame,
    [startFrame, startFrame + 20],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        opacity: opacity * fadeOut,
        transform: `translateY(${slideY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Logo 图片 */}
      {resolvedSrc ? (
        <Img
          src={resolvedSrc}
          style={{
            width,
            height: "auto",
            maxHeight: 120,
            objectFit: "contain",
            marginBottom: 16,
          }}
        />
      ) : (
        /* Logo 占位 */
        <div
          style={{
            width,
            height: 80,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${COLORS.bgSecondary}, ${COLORS.bg})`,
            border: `1px solid ${COLORS.accent}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            color: COLORS.textMuted,
            fontSize: 14,
          }}
        >
          公司 Logo
        </div>
      )}

      {/* 公司名称 */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: COLORS.text,
          letterSpacing: 1,
          marginBottom: 8,
        }}
      >
        {companyName}
      </div>

      {/* 联系方式 */}
      {showContact && contactInfo && (
        <div
          style={{
            fontSize: 14,
            color: COLORS.textMuted,
            lineHeight: 1.6,
            whiteSpace: "pre-line",
          }}
        >
          {contactInfo}
        </div>
      )}
    </div>
  );
};
