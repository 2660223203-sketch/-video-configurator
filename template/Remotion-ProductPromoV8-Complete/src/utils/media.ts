import { staticFile } from "remotion";
import { hasAsset } from "../config/assets";

/**
 * 素材工具函数
 */

/** 获取素材的 staticFile 路径。如果素材不存在，返回 null */
export function getAssetPath(path: string | null): string | null {
  if (!hasAsset(path)) return null;
  try {
    return staticFile(path);
  } catch {
    return null;
  }
}

/** 生成基于 index 的固定随机数 (0-1)，用于替代 Math.random */
export function seededRandom(index: number, seed: number = 42): number {
  const x = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** 固定种子生成指定范围内的随机整数 */
export function seededInt(
  index: number,
  min: number,
  max: number,
  seed: number = 42,
): number {
  return Math.floor(seededRandom(index, seed) * (max - min + 1)) + min;
}

/** 固定种子选取数组元素 */
export function seededPick<T>(
  arr: T[],
  index: number,
  seed: number = 42,
): T {
  return arr[seededInt(index, 0, arr.length - 1, seed)];
}

/** 判断是否为竖屏视频（高 > 宽） */
export function isVertical(width: number, height: number): boolean {
  return height > width;
}

/** 计算 16:9 容器内素材的 cover 缩放和位置 */
export function coverFit(
  contentW: number,
  contentH: number,
  containerW: number = 1920,
  containerH: number = 1080,
): { scale: number; x: number; y: number } {
  const scaleX = containerW / contentW;
  const scaleY = containerH / contentH;
  const scale = Math.max(scaleX, scaleY);
  const x = (containerW - contentW * scale) / 2;
  const y = (containerH - contentH * scale) / 2;
  return { scale, x, y };
}

/** 计算 16:9 容器内素材的 contain 缩放和位置 */
export function containFit(
  contentW: number,
  contentH: number,
  containerW: number = 1920,
  containerH: number = 1080,
): { scale: number; x: number; y: number } {
  const scaleX = containerW / contentW;
  const scaleY = containerH / contentH;
  const scale = Math.min(scaleX, scaleY);
  const x = (containerW - contentW * scale) / 2;
  const y = (containerH - contentH * scale) / 2;
  return { scale, x, y };
}
