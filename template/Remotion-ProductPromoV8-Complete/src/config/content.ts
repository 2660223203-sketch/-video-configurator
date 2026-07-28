/**
 * 文案内容配置
 *
 * 所有出现在视频中的文字集中管理在此处。
 * 支持简体中文，可方便替换为其他语言。
 */

/** 产品型号 — 必须完整正确 */
export const PRODUCT_MODEL = "ZCUFDF-RF0218-IF1.8-BW1G-B";
export const PRODUCT_NAME = "宽带变频组件";
export const PRODUCT_TYPE = "上变频＋下变频＋频率源一体化变频组件";

/** 产品技术参数 */
export const PRODUCT_PARAMS = {
  frequencyRange: "2～18GHz",
  ifRange: "1.3～2.3GHz",
  instantaneousBandwidth: "1GHz",
  spurSuppression: "≥50dBc",
  builtinSource: "跳频源＋点频源",
  control: "SPI串口控制频率和衰减",
  dimensions: "68mm × 78.5mm × 9.5mm",
  weight: "120g",
} as const;

/** ========== 场景文案 ========== */

export const SCENE_CONTENT = {
  /** 0-4s 技术场景钩子 */
  hook: {
    title: "宽带变频能力",
    subtitle: "如何实现更高集成度？",
    disclaimer: "产品操作场景展示",
  },

  /** 4-9s 产品正式亮相 */
  productReveal: {
    title: PRODUCT_NAME,
    model: PRODUCT_MODEL,
  },

  /** 9-17s 三大功能一体化 */
  integration: {
    modules: [
      { en: "UP CONVERSION", zh: "上变频" },
      { en: "DOWN CONVERSION", zh: "下变频" },
      { en: "FREQUENCY SOURCE", zh: "跳频源＋点频源" },
    ],
    conclusion: "上变频＋下变频＋频率源",
    tagline: "一体化集成",
  },

  /** 17-25s 频率和带宽 */
  frequencyBandwidth: {
    params: [
      { label: "工作频率", value: PRODUCT_PARAMS.frequencyRange },
      { label: "中频", value: PRODUCT_PARAMS.ifRange },
      { label: "瞬时带宽", value: PRODUCT_PARAMS.instantaneousBandwidth },
    ],
    tagline: "宽频覆盖 · 宽带处理",
  },

  /** 25-31s 频谱性能 */
  spectrum: {
    title: "输出交调及杂散抑制",
    value: PRODUCT_PARAMS.spurSuppression,
    indicator: "产品关键指标",
  },

  /** 31-37s SPI控制 */
  spiControl: {
    title: "SPI串口控制",
    subtitle: "灵活控制频率与衰减",
    modules: ["频率控制", "衰减控制"],
  },

  /** 37-41s 紧凑结构 */
  compactDesign: {
    dimensions: PRODUCT_PARAMS.dimensions,
    weight: PRODUCT_PARAMS.weight,
    tagline: "紧凑轻量",
    subtitle: "便于系统集成",
  },

  /** 41-45s 品牌片尾 */
  brandEnd: {
    tagline: "宽频覆盖 · 一体变频",
    subtitle: "灵活控制 · 紧凑集成",
    cta: "联系我们，获取详细技术资料",
  },
} as const;

/** ========== 免责声明 ========== */

export const DISCLAIMERS = {
  /** 操作场景标注 */
  operationScene: "产品操作场景展示",
  /** 参数来源说明 */
  paramsNote: "参数以正式技术资料为准",
} as const;
