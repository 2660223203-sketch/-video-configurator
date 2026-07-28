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
import {V8, V8_ASSETS, SCENE_DURATIONS} from "../v8/theme";
import {V8_ACTIVE} from "../v8/content";

type SceneKey = keyof typeof SCENE_DURATIONS;

/** 根据 V8_ACTIVE 动态计算每个场景的 start 帧 */
function buildTimeline() {
  let cursor = 0;
  const t: Record<SceneKey, {start: number; duration: number}> = {} as any;
  for (const key of Object.keys(SCENE_DURATIONS) as SceneKey[]) {
    if (V8_ACTIVE[key]) {
      t[key] = {start: cursor, duration: SCENE_DURATIONS[key]};
      cursor += SCENE_DURATIONS[key];
    }
  }
  return t;
}

const timeline = buildTimeline();
const totalFrames = Object.values(timeline).reduce((sum, s) => sum + s.duration, 0);

const musicVolume = (frame: number) => {
  const seconds = frame / V8.fps;
  const base = interpolate(frame, [0, 24, totalFrames - 90, totalFrames], [0, 0.48, 0.48, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (seconds < 0.1) return base;
  const mid = totalFrames / V8.fps * 0.94;
  if (seconds < mid) return base * 0.24;
  return base * interpolate(seconds, [mid, mid + 0.6], [0.24, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
};

const SceneIf = ({active, timeline, children}: {active: boolean; timeline: {start: number; duration: number}; children: React.ReactNode}) => {
  if (!active) return null;
  return <Sequence from={timeline.start} durationInFrames={timeline.duration}>{children}</Sequence>;
};

export const ProductPromoV8: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: V8.colors.bg}}>
    <Audio src={staticFile("assets/audio/music.mp3")} volume={musicVolume} />
    <SceneIf active={V8_ACTIVE.company} timeline={timeline.company}><CompanyIntroV8 /></SceneIf>
    <SceneIf active={V8_ACTIVE.product} timeline={timeline.product}><ProductRevealV8 /></SceneIf>
    <SceneIf active={V8_ACTIVE.frequency} timeline={timeline.frequency}><FrequencyV8 /></SceneIf>
    <SceneIf active={V8_ACTIVE.bandwidth} timeline={timeline.bandwidth}><BandwidthV8 /></SceneIf>
    <SceneIf active={V8_ACTIVE.control} timeline={timeline.control}><ControlV8 /></SceneIf>
    <SceneIf active={V8_ACTIVE.purity} timeline={timeline.purity}><PurityV8 /></SceneIf>
    <SceneIf active={V8_ACTIVE.compact} timeline={timeline.compact}><CompactV8 /></SceneIf>
    <SceneIf active={V8_ACTIVE.summary} timeline={timeline.summary}><SummaryV8 /></SceneIf>
    <SceneIf active={V8_ACTIVE.end} timeline={timeline.end}><EndV8 /></SceneIf>
    {V8_ACTIVE.product && (
      <Sequence from={timeline.product.start} durationInFrames={timeline.end.start - timeline.product.start}>
        <CornerLogoV8 />
      </Sequence>
    )}
    <Audio src={staticFile(V8_ASSETS.narration)} volume={1} />
    <NarrationSubtitlesV8 />
  </AbsoluteFill>
);
