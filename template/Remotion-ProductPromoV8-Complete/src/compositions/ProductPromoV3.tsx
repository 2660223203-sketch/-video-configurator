import React from "react";
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from "remotion";
import {
  CapabilitiesV3,
  CompanyIntroV3,
  EndV3,
  FrequencyV3,
  IntegrationValueV3,
  OpeningV3,
  OperationV3,
  PerformanceV3,
  ProductV3,
  TestV3,
} from "../v3/scenes";
import {V3, V3_TIMELINE} from "../v3/theme";
import {CornerLogo, NarrationSubtitles} from "../v3/overlays";

const narrationWindows = [
  {start: 0.1, end: 7.6},
  {start: 8.2, end: 46.6},
  {start: 48.2, end: 66.3},
];

const musicVolume = (frame: number) => {
  const seconds = frame / V3.fps;
  const base = interpolate(frame, [0, 24, V3.durationInFrames - 90, V3.durationInFrames], [0, 0.52, 0.52, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const duckFactor = narrationWindows.reduce((level, {start, end}) => {
    if (seconds < start - 0.45 || seconds > end + 0.45) return level;
    if (seconds < start) return Math.min(level, interpolate(seconds, [start - 0.45, start], [1, 0.27], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}));
    if (seconds <= end) return Math.min(level, 0.27);
    return Math.min(level, interpolate(seconds, [end, end + 0.45], [0.27, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}));
  }, 1);
  return base * duckFactor;
};

export const ProductPromoV3: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: V3.colors.bg}}>
    <Audio
      src={staticFile("assets/audio/music.mp3")}
      volume={musicVolume}
    />
    <Sequence from={V3_TIMELINE.companyIntro.start} durationInFrames={V3_TIMELINE.companyIntro.duration}><CompanyIntroV3 /></Sequence>
    <Sequence from={V3_TIMELINE.opening.start} durationInFrames={V3_TIMELINE.opening.duration}><OpeningV3 /></Sequence>
    <Sequence from={V3_TIMELINE.product.start} durationInFrames={V3_TIMELINE.product.duration}><ProductV3 /></Sequence>
    <Sequence from={V3_TIMELINE.capabilities.start} durationInFrames={V3_TIMELINE.capabilities.duration}><CapabilitiesV3 /></Sequence>
    <Sequence from={V3_TIMELINE.frequency.start} durationInFrames={V3_TIMELINE.frequency.duration}><FrequencyV3 /></Sequence>
    <Sequence from={V3_TIMELINE.operation.start} durationInFrames={V3_TIMELINE.operation.duration}><OperationV3 /></Sequence>
    <Sequence from={V3_TIMELINE.test.start} durationInFrames={V3_TIMELINE.test.duration}><TestV3 /></Sequence>
    <Sequence from={V3_TIMELINE.performance.start} durationInFrames={V3_TIMELINE.performance.duration}><PerformanceV3 /></Sequence>
    <Sequence from={V3_TIMELINE.integration.start} durationInFrames={V3_TIMELINE.integration.duration}><IntegrationValueV3 /></Sequence>
    <Sequence from={V3_TIMELINE.end.start} durationInFrames={V3_TIMELINE.end.duration}><EndV3 /></Sequence>
    <Sequence from={V3_TIMELINE.opening.start} durationInFrames={V3_TIMELINE.end.start - V3_TIMELINE.opening.start}><CornerLogo /></Sequence>
    <Sequence from={3}><Audio src={staticFile("assets/audio/voiceover-v4/intro.mp3")} volume={1} /></Sequence>
    <Sequence from={246}><Audio src={staticFile("assets/audio/voiceover-v4/product-a.mp3")} volume={1} /></Sequence>
    <Sequence from={699}><Audio src={staticFile("assets/audio/voiceover-v4/product-b.mp3")} volume={1} /></Sequence>
    <Sequence from={930}><Audio src={staticFile("assets/audio/voiceover-v4/product-c.mp3")} volume={1} /></Sequence>
    <Sequence from={1155}><Audio src={staticFile("assets/audio/voiceover-v4/product-d.mp3")} volume={1} /></Sequence>
    <Sequence from={1446}><Audio src={staticFile("assets/audio/voiceover-v4/value.mp3")} volume={1} /></Sequence>
    <NarrationSubtitles />
  </AbsoluteFill>
);
