import React from "react";
import { AbsoluteFill, Sequence, Audio, useVideoConfig } from "remotion";
import { HookScene } from "../scenes/HookScene";
import { ProductRevealScene } from "../scenes/ProductRevealScene";
import { IntegrationScene } from "../scenes/IntegrationScene";
import { FrequencyBandwidthScene } from "../scenes/FrequencyBandwidthScene";
import { SpectrumScene } from "../scenes/SpectrumScene";
import { SPIControlScene } from "../scenes/SPIControlScene";
import { CompactDesignScene } from "../scenes/CompactDesignScene";
import { BrandEndScene } from "../scenes/BrandEndScene";
import { TIMELINE, TOTAL_FRAMES, FPS } from "../config/timeline";
import { ASSETS, hasAsset } from "../config/assets";
import { getAssetPath } from "../utils/media";
import { COLORS } from "../config/brand";

/**
 * ZCUFDF0218ProductPromo — 宽带变频组件产品宣传视频
 *
 * 总时长：45秒 / 1350帧 @ 30fps
 * 分辨率：1920×1080
 */
export const ZCUFDF0218ProductPromo: React.FC = () => {
  const musicPath = getAssetPath(ASSETS.audio.music);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: "Noto Sans SC, Microsoft YaHei, PingFang SC, sans-serif",
      }}
    >
      {/* 背景音乐（如有） */}
      {musicPath && (
        <Audio
          src={musicPath}
          volume={0.6}
        />
      )}

      {/* ========== 场景序列 ========== */}

      {/* 0-4s: 技术场景钩子 */}
      <Sequence
        from={TIMELINE.hook.start}
        durationInFrames={TIMELINE.hook.durationInFrames}
      >
        <HookScene />
      </Sequence>

      {/* 4-9s: 产品正式亮相 */}
      <Sequence
        from={TIMELINE.productReveal.start}
        durationInFrames={TIMELINE.productReveal.durationInFrames}
      >
        <ProductRevealScene />
      </Sequence>

      {/* 9-17s: 三大功能一体化 */}
      <Sequence
        from={TIMELINE.integration.start}
        durationInFrames={TIMELINE.integration.durationInFrames}
      >
        <IntegrationScene />
      </Sequence>

      {/* 17-25s: 频率和带宽 */}
      <Sequence
        from={TIMELINE.frequencyBandwidth.start}
        durationInFrames={TIMELINE.frequencyBandwidth.durationInFrames}
      >
        <FrequencyBandwidthScene />
      </Sequence>

      {/* 25-31s: 频谱性能 */}
      <Sequence
        from={TIMELINE.spectrum.start}
        durationInFrames={TIMELINE.spectrum.durationInFrames}
      >
        <SpectrumScene />
      </Sequence>

      {/* 31-37s: SPI控制 */}
      <Sequence
        from={TIMELINE.spiControl.start}
        durationInFrames={TIMELINE.spiControl.durationInFrames}
      >
        <SPIControlScene />
      </Sequence>

      {/* 37-41s: 紧凑结构 */}
      <Sequence
        from={TIMELINE.compactDesign.start}
        durationInFrames={TIMELINE.compactDesign.durationInFrames}
      >
        <CompactDesignScene />
      </Sequence>

      {/* 41-45s: 品牌片尾 */}
      <Sequence
        from={TIMELINE.brandEnd.start}
        durationInFrames={TIMELINE.brandEnd.durationInFrames}
      >
        <BrandEndScene />
      </Sequence>
    </AbsoluteFill>
  );
};
