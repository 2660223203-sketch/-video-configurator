import React from "react";
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from "remotion";
import {
  BandwidthV8,
  CompanyIntroV8,
  CompactV8,
  ControlV8,
  EndV8,
  FrequencyV8,
  ProductRevealV8,
  PurityV8,
  SummaryV8,
} from "../v8/scenes";
import {CornerLogoV8, NarrationSubtitlesV8} from "../v8/overlays";
import {V8, V8_ASSETS, V8_TIMELINE} from "../v8/theme";

const musicVolume = (frame: number) => {
  const seconds = frame / V8.fps;
  const base = interpolate(frame, [0, 24, V8.durationInFrames - 90, V8.durationInFrames], [0, 0.48, 0.48, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (seconds < 0.1) return base;
  if (seconds < 52.5) return base * 0.24;
  return base * interpolate(seconds, [52.5, 53.1], [0.24, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
};

export const ProductPromoV8: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: V8.colors.bg}}>
    <Audio src={staticFile("assets/audio/music.mp3")} volume={musicVolume} />
    <Sequence from={V8_TIMELINE.company.start} durationInFrames={V8_TIMELINE.company.duration}><CompanyIntroV8 /></Sequence>
    <Sequence from={V8_TIMELINE.product.start} durationInFrames={V8_TIMELINE.product.duration}><ProductRevealV8 /></Sequence>
    <Sequence from={V8_TIMELINE.frequency.start} durationInFrames={V8_TIMELINE.frequency.duration}><FrequencyV8 /></Sequence>
    <Sequence from={V8_TIMELINE.bandwidth.start} durationInFrames={V8_TIMELINE.bandwidth.duration}><BandwidthV8 /></Sequence>
    <Sequence from={V8_TIMELINE.control.start} durationInFrames={V8_TIMELINE.control.duration}><ControlV8 /></Sequence>
    <Sequence from={V8_TIMELINE.purity.start} durationInFrames={V8_TIMELINE.purity.duration}><PurityV8 /></Sequence>
    <Sequence from={V8_TIMELINE.compact.start} durationInFrames={V8_TIMELINE.compact.duration}><CompactV8 /></Sequence>
    <Sequence from={V8_TIMELINE.summary.start} durationInFrames={V8_TIMELINE.summary.duration}><SummaryV8 /></Sequence>
    <Sequence from={V8_TIMELINE.end.start} durationInFrames={V8_TIMELINE.end.duration}><EndV8 /></Sequence>
    <Sequence from={V8_TIMELINE.product.start} durationInFrames={V8_TIMELINE.end.start - V8_TIMELINE.product.start}><CornerLogoV8 /></Sequence>
    <Audio src={staticFile(V8_ASSETS.narration)} volume={1} />
    <NarrationSubtitlesV8 />
  </AbsoluteFill>
);
