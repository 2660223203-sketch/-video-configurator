/**
 * 统一布局常量
 *
 * 所有场景共用安全边距、字号、卡片尺寸、动画时长等。
 * 不要在每个场景中使用不同的绝对坐标。
 */

// ── 安全区域 ──

export const LAYOUT = {
  /** 左右安全边距 */
  marginX: 96,
  /** 上下安全边距 */
  marginY: 72,
  /** 画面宽度 (减去边距后的可用宽度) */
  contentWidth: 1920 - 96 * 2, // 1728
  /** 画面高度 (减去边距后的可用高度) */
  contentHeight: 1080 - 72 * 2, // 936
} as const;

// ── 标题 ──

export const TITLE = {
  /** 主标题字号 */
  fontSize: 48,
  /** 主标题字重 */
  fontWeight: 700 as 700,
  /** 副标题字号 */
  subtitleSize: 24,
  /** 副标题字重 */
  subtitleWeight: 500 as 500,
  /** 主标题与副标题间距 */
  subtitleGap: 14,
  /** 标题 X 坐标 */
  x: 96,
  /** 标题 Y 坐标 */
  y: 72,
} as const;

// ── 正文 / 参数 ──

export const BODY = {
  /** 正文、参数、标注文字最小字号 */
  fontSize: 24,
  /** 正文行高 */
  lineHeight: 1.5,
  /** 参数值字号 */
  valueSize: 28,
  /** 参数标签字号 */
  labelSize: 14,
} as const;

// ── 参数卡片 ──

export const CARD = {
  /** 统一宽度 */
  width: 260,
  /** 统一内边距 */
  paddingX: 24,
  paddingY: 20,
  /** 统一圆角 */
  radius: 10,
  /** 统一描边透明度 */
  borderOpacity: 0.25,
  /** 统一背景透明度 */
  bgOpacity: 0.85,
  /** 卡片间距 (横向或纵向) */
  gap: 16,
  /** 背景模糊 */
  blur: 12,
} as const;

// ── 数据栏 ──

export const DATA_BAR = {
  /** 底部距离 */
  bottom: 40,
  /** 高度 */
  height: 100,
  /** 左右内边距 */
  paddingX: 40,
  /** 背景透明度 */
  bgOpacity: 0.45,
} as const;

// ── 两栏布局 ──

export const TWO_COL = {
  /** 场景内栏间距 */
  gap: 60,
  /** 左栏宽度 (40% 场景) */
  left40: Math.floor((1920 - 96 * 2) * 0.4),
  /** 右栏宽度 (60% 场景) */
  right60: Math.floor((1920 - 96 * 2) * 0.6),
  /** 左栏宽度 (36% 场景) */
  left36: Math.floor((1920 - 96 * 2) * 0.36),
  /** 右栏宽度 (64% 场景) */
  right64: Math.floor((1920 - 96 * 2) * 0.64),
} as const;

// ── 动画 ──

export const ANIM = {
  /** 统一动画时长 (帧)，10-18 帧范围 */
  duration: 15,
  /** 淡入时长 */
  fadeIn: 14,
  /** 上移距离 */
  slideUp: 24,
  /** 缩放起始值 */
  scaleFrom: 0.96,
} as const;

// ── 遮罩 ──

export const OVERLAY = {
  /** 测试画面暗色遮罩透明度 (25%-40%) */
  darkOverlay: 0.35,
  /** 图表面板背景透明度 */
  panelBg: 0.75,
} as const;

// ── 引导线 ──

export const GUIDE = {
  /** 最多引导线数量 */
  maxLines: 3,
  /** 短线长度 (从标注点到说明文字) */
  shortLength: 60,
} as const;

// ── 图表 ──

export const CHART = {
  /** 宽度占比 */
  widthRatio: 0.75,
  /** 高度占比 */
  heightRatio: 0.55,
} as const;
