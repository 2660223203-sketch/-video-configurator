/**
 * 品牌视觉配置
 *
 * 所有颜色、字体大小、间距统一在此定义。
 */

/** 调色板 */
export const COLORS = {
  /** 主背景 — 深蓝黑 */
  bg: "#0A0E17",
  /** 次背景 — 深灰蓝 */
  bgSecondary: "#111827",
  /** 卡片背景 */
  cardBg: "rgba(15, 23, 42, 0.85)",
  /** 主文字 */
  text: "#FFFFFF",
  /** 次文字 */
  textSecondary: "rgba(255, 255, 255, 0.7)",
  /** 弱文字 */
  textMuted: "rgba(255, 255, 255, 0.4)",
  /** 强调色 — 科技蓝 */
  accent: "#0EA5E9",
  /** 强调色变体 */
  accentLight: "#38BDF8",
  /** 辅助色 — 青色 */
  cyan: "#06B6D4",
  /** 状态色 — 绿色 */
  success: "#10B981",
  /** 警告 — 暗金 */
  warning: "#F59E0B",
  /** 科技网格线 */
  gridLine: "rgba(14, 165, 233, 0.15)",
  /** 信号线 */
  signalLine: "#0EA5E9",
  /** 信号节点 */
  signalNode: "#38BDF8",
} as const;

/** 字体层级 */
export const TYPOGRAPHY = {
  /** 超大数值 — 参数核心数字 */
  hero: {
    fontSize: 72,
    fontWeight: 700,
    letterSpacing: -1,
    lineHeight: 1.1,
  },
  /** 场景主标题 */
  h1: {
    fontSize: 48,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 1.2,
  },
  /** 场景副标题 */
  h2: {
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: 1.3,
  },
  /** 参数标签 */
  h3: {
    fontSize: 24,
    fontWeight: 500,
    letterSpacing: 1,
    lineHeight: 1.4,
  },
  /** 正文 */
  body: {
    fontSize: 20,
    fontWeight: 400,
    letterSpacing: 0.5,
    lineHeight: 1.5,
  },
  /** 小字 / 免责声明 */
  caption: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: 0.5,
    lineHeight: 1.4,
  },
  /** 型号 */
  model: {
    fontSize: 22,
    fontWeight: 500,
    letterSpacing: 0.5,
    lineHeight: 1.3,
  },
} as const;

/** 安全区域边距 */
export const SAFE_AREA = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80,
} as const;

/** 圆角 */
export const RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
} as const;

/** 阴影 */
export const SHADOWS = {
  card: "0 4px 24px rgba(0, 0, 0, 0.5)",
  glow: "0 0 20px rgba(14, 165, 233, 0.3)",
  textGlow: "0 0 10px rgba(14, 165, 233, 0.4)",
} as const;

/** 公司信息 */
export const COMPANY = {
  name: "成都中远创视科技有限公司",
  shortName: "中远创视",
  address: "成都市青羊区敬业路108号28栋1单元10层5号",
  phone: "13438820525",
  contact: "宋天春 13438820525",
  email: "stcgood@126.com",
} as const;
