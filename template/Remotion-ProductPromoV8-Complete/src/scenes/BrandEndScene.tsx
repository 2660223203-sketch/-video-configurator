import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { ProductHero } from "../components/ProductHero";
import { BrandLogo } from "../components/BrandLogo";
import { COLORS, COMPANY } from "../config/brand";
import { SCENE_CONTENT } from "../config/content";
import { ASSETS } from "../config/assets";
import { TRANSITION } from "../config/timeline";
import { LAYOUT, ANIM } from "../config/layout";

/**
 * 41-45s: 结尾页 — Logo左上 + 产品图 + 口号居中 + 公司信息底部
 */
export const BrandEndScene: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(
    frame,
    [0, TRANSITION.crossfade],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // 各元素依次出现
  const logoOpacity = interpolate(
    frame,
    [6, 6 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const productOpacity = interpolate(
    frame,
    [10, 10 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const productScale = interpolate(
    frame,
    [10, 10 + ANIM.duration],
    [ANIM.scaleFrom, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const sloganOpacity = interpolate(
    frame,
    [18, 18 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const sloganSlide = interpolate(
    frame,
    [18, 18 + ANIM.fadeIn],
    [ANIM.slideUp, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const bottomOpacity = interpolate(
    frame,
    [30, 30 + ANIM.fadeIn],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const contactLines = `电话：${COMPANY.phone}  |  ${COMPANY.contact}\n邮箱：${COMPANY.email}\n${COMPANY.address}`;

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn,
        backgroundColor: COLORS.bg,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 55%, ${COLORS.bgSecondary} 0%, ${COLORS.bg} 100%)`,
        }}
      />

      {/* Logo — 左上角，不贴边缘 */}
      <div
        style={{
          position: "absolute",
          left: LAYOUT.marginX,
          top: LAYOUT.marginY,
          opacity: logoOpacity,
          zIndex: 20,
        }}
      >
        <BrandLogo
          src={ASSETS.brand.logo}
          companyName=""
          width={140}
          x={0}
          y={0}
          startFrame={6}
          showContact={false}
        />
      </div>

      {/* 产品图 — 画面上方左侧，尺寸适中 */}
      <div
        style={{
          position: "absolute",
          left: LAYOUT.marginX + 120,
          top: 180,
          opacity: productOpacity,
          transform: `scale(${productScale})`,
          zIndex: 10,
        }}
      >
        <ProductHero
          src={ASSETS.product.main}
          width={240}
          height={240}
          x={0}
          y={0}
          glowColor={COLORS.accent}
          startFrame={10}
          edgeLightWidth={2}
        />
      </div>

      {/* 品牌口号 — 画面核心，居中 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "48%",
          transform: `translateY(calc(-50% + ${sloganSlide}px))`,
          textAlign: "center",
          opacity: sloganOpacity,
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: 5,
            lineHeight: 1.3,
          }}
        >
          {SCENE_CONTENT.brandEnd.tagline}
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 500,
            color: COLORS.textSecondary,
            letterSpacing: 3,
            marginTop: 16,
          }}
        >
          {SCENE_CONTENT.brandEnd.subtitle}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            color: COLORS.accentLight,
            letterSpacing: 2,
            padding: "14px 36px",
            border: `1px solid ${COLORS.accent}66`,
            borderRadius: 10,
            display: "inline-block",
            background: `${COLORS.accent}0a`,
          }}
        >
          {SCENE_CONTENT.brandEnd.cta}
        </div>
      </div>

      {/* 底部公司信息 — 统一一行 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: COLORS.text,
            letterSpacing: 2,
            marginBottom: 10,
          }}
        >
          {COMPANY.name}
        </div>
        <div
          style={{
            fontSize: 15,
            color: COLORS.textMuted,
            lineHeight: 1.8,
            whiteSpace: "pre-line",
          }}
        >
          {contactLines}
        </div>
      </div>
    </AbsoluteFill>
  );
};
