import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const ChromeTest: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#060b14", justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontSize: 60, color: "#0EA5E9", opacity, fontWeight: 700 }}>
        Chrome OK — 渲染正常
      </div>
    </AbsoluteFill>
  );
};
export default ChromeTest;
