import React from "react";
import { Composition } from "remotion";
import { ZCUFDF0218ProductPromo } from "./compositions/ZCUFDF0218ProductPromo";
import ChromeTest from "./compositions/ChromeTest";
import { TOTAL_FRAMES, FPS } from "./config/timeline";
import { ProductPromoV3 } from "./compositions/ProductPromoV3";
import { V3 } from "./v3/theme";
import { ProductPromoV8 } from "./compositions/ProductPromoV8";
import { V8 } from "./v8/theme";

/**
 * Remotion Root — 注册所有 Composition
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ZCUFDF0218ProductPromo"
        component={ZCUFDF0218ProductPromo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="ChromeTest"
        component={ChromeTest}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ProductPromoV3"
        component={ProductPromoV3}
        durationInFrames={V3.durationInFrames}
        fps={V3.fps}
        width={V3.width}
        height={V3.height}
      />
      <Composition
        id="ProductPromoV8"
        component={ProductPromoV8}
        durationInFrames={V8.durationInFrames}
        fps={V8.fps}
        width={V8.width}
        height={V8.height}
      />
    </>
  );
};
