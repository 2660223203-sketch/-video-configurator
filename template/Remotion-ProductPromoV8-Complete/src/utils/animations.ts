import { interpolate, spring, Easing } from "remotion";

/**
 * 动画工具函数集合
 *
 * 所有动画由帧驱动，不使用 Math.random。
 */

// ── 常用进入/退出动画 ──

/** 淡入：opacity 0→1 */
export function fadeIn(
  frame: number,
  startFrame: number = 0,
  duration: number = 18,
): number {
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** 淡出：opacity 1→0 */
export function fadeOut(
  frame: number,
  startFrame: number,
  duration: number = 12,
): number {
  return interpolate(frame, [startFrame, startFrame + duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** 从下方滑入：translateY 50→0 */
export function slideUp(
  frame: number,
  startFrame: number = 0,
  duration: number = 24,
  distance: number = 50,
): number {
  return interpolate(frame, [startFrame, startFrame + duration], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
}

/** 从左侧滑入：translateX -60→0 */
export function slideRight(
  frame: number,
  startFrame: number = 0,
  duration: number = 24,
  distance: number = 60,
): number {
  return interpolate(frame, [startFrame, startFrame + duration], [-distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
}

/** 从右侧滑入：translateX 60→0 */
export function slideLeft(
  frame: number,
  startFrame: number = 0,
  duration: number = 24,
  distance: number = 60,
): number {
  return interpolate(frame, [startFrame, startFrame + duration], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
}

/** 弹簧缩放：0.8→1 */
export function springScale(
  frame: number,
  startFrame: number = 0,
  config?: { damping?: number; mass?: number },
): number {
  return spring({
    frame: frame - startFrame,
    fps: 30,
    config: { damping: config?.damping ?? 15, mass: config?.mass ?? 0.8 },
    durationInFrames: 30,
  });
}

/** 柔和缩放：0.95→1 */
export function gentleScale(
  frame: number,
  startFrame: number = 0,
  duration: number = 30,
): number {
  return interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0.95, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
}

/** 数字递增动画（用于参数值从 0 滚动到目标值） */
export function countUp(
  frame: number,
  startFrame: number,
  target: number,
  duration: number = 60,
  decimalPlaces: number = 0,
): number {
  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  return Number((progress * target).toFixed(decimalPlaces));
}

/** 脉冲动画（短暂放大后回弹） */
export function pulse(
  frame: number,
  peakFrame: number,
  amplitude: number = 1.05,
): number {
  const halfWidth = 6;
  return interpolate(
    frame,
    [peakFrame - halfWidth, peakFrame, peakFrame + halfWidth],
    [1, amplitude, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
}

/** 文字逐字出现的延迟数组 */
export function charStagger(
  charCount: number,
  startFrame: number,
  framesPerChar: number = 3,
): number[] {
  return Array.from({ length: charCount }, (_, i) => startFrame + i * framesPerChar);
}

/** 交错延迟 — 用于卡片/列表依次出现 */
export function staggerDelay(
  index: number,
  baseDelay: number = 0,
  step: number = 12,
): number {
  return baseDelay + index * step;
}

/** 光线扫过效果进度 0→1 */
export function lightSweep(
  frame: number,
  startFrame: number,
  duration: number = 40,
): number {
  return interpolate(
    frame,
    [startFrame, startFrame + duration],
    [-0.3, 1.3],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    },
  );
}

/** 持续旋转（用于科技感装饰） */
export function continuousRotation(frame: number, speed: number = 0.5): number {
  return frame * speed;
}

/** 绘制线条进度：用于信号线描边动画 */
export function drawLine(
  frame: number,
  startFrame: number,
  duration: number = 30,
): number {
  return interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    },
  );
}

/** 闪烁 — 用于科技节点 */
export function blink(
  frame: number,
  period: number = 30,
  dutyCycle: number = 0.5,
): number {
  const phase = (frame % period) / period;
  return phase < dutyCycle ? 1 : 0.2;
}

// ── 安全区域裁剪 ──

export function clampToSafeArea(
  value: number,
  min: number,
  max: number,
): number {
  return Math.max(min, Math.min(max, value));
}
