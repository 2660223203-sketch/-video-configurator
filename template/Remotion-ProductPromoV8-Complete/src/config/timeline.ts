/**
 * 时间线配置
 *
 * 统一管理所有场景的起止帧和转场参数。
 * 帧率: 30fps, 总时长: 45秒 = 1350帧
 */

export const FPS = 30;

/** 场景帧区间 (按新规范调整) */
export const TIMELINE = {
  /** 0-5s: 开场 */
  hook: {
    start: 0,
    end: 5 * FPS, // 150
    durationInFrames: 5 * FPS,
  },
  /** 5-9s: 产品展示 */
  productReveal: {
    start: 5 * FPS, // 150
    end: 9 * FPS, // 270
    durationInFrames: 4 * FPS,
  },
  /** 9-16s: 功能介绍 */
  integration: {
    start: 9 * FPS, // 270
    end: 16 * FPS, // 480
    durationInFrames: 7 * FPS,
  },
  /** 16-24s: 频率和带宽测试 */
  frequencyBandwidth: {
    start: 16 * FPS, // 480
    end: 24 * FPS, // 720
    durationInFrames: 8 * FPS,
  },
  /** 24-30s: 频谱性能 */
  spectrum: {
    start: 24 * FPS, // 720
    end: 30 * FPS, // 900
    durationInFrames: 6 * FPS,
  },
  /** 30-36s: SPI控制 */
  spiControl: {
    start: 30 * FPS, // 900
    end: 36 * FPS, // 1080
    durationInFrames: 6 * FPS,
  },
  /** 36-41s: 紧凑结构 */
  compactDesign: {
    start: 36 * FPS, // 1080
    end: 41 * FPS, // 1230
    durationInFrames: 5 * FPS,
  },
  /** 41-45s: 品牌片尾 */
  brandEnd: {
    start: 41 * FPS, // 1230
    end: 45 * FPS, // 1350
    durationInFrames: 4 * FPS,
  },
} as const;

/** 总帧数 */
export const TOTAL_FRAMES = 45 * FPS; // 1350
/** 总时长（秒） */
export const TOTAL_DURATION = 45;

/** 转场时长（帧） */
export const TRANSITION = {
  /** 场景间交叉淡化 */
  crossfade: 15,
  /** 快速切换 */
  quick: 6,
  /** 元素进入 */
  enter: 15,
  /** 元素退出 */
  exit: 12,
} as const;

/** 单个场景内的元素交错延迟（帧） */
export const STAGGER = {
  /** 标题出现后，副标题延迟 */
  subtitle: 12,
  /** 参数卡片依次出现间隔 */
  paramCard: 15,
  /** 模块依次出现间隔 */
  module: 20,
} as const;

/** 获取场景内相对帧 (当前帧 - 场景起始帧) */
export function localFrame(globalFrame: number, sceneStart: number): number {
  return Math.max(0, globalFrame - sceneStart);
}

/** 检查是否在场景区间内 */
export function inScene(
  globalFrame: number,
  start: number,
  end: number,
): boolean {
  return globalFrame >= start && globalFrame < end;
}
