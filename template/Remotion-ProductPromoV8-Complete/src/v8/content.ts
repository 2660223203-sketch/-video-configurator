export const PRODUCT = {
  model: "{{PRODUCT_MODEL}}",
  name: "{{PRODUCT_NAME}}",
  subtitle: "{{PRODUCT_SUBTITLE}}",
  frequency: "{{PRODUCT_FREQUENCY}}",
  intermediateFrequency: "{{PRODUCT_IF}}",
  bandwidth: "{{PRODUCT_BANDWIDTH}}",
  step: "{{PRODUCT_STEP}}",
  attenuation: "{{PRODUCT_ATTENUATION}}",
  spur: "{{PRODUCT_SPUR}}",
  dimensions: "{{PRODUCT_DIMENSIONS}}",
  frequencySpan: "{{PRODUCT_FREQUENCY_SPAN}}",
  features: {{PRODUCT_FEATURES_JSON}},
} as const;

export const COMPANY_V8 = {
  name: "成都中远创视科技有限公司",
  positioning: "专注射频微波技术创新",
  value: "提供高性能信号处理解决方案",
  contact: "宋经理",
  phone: "13438820525",
  email: "stcgood@126.com",
} as const;

export const SELLING_POINTS = [
  {title: "宽频覆盖能力", value: PRODUCT.frequency, note: "实现宽范围信号转换"},
  {title: "宽带信号处理", value: `${PRODUCT.bandwidth} 瞬时带宽`, note: "满足宽带信号处理需求"},
  {title: "精准数字控制", value: `${PRODUCT.step} / ${PRODUCT.attenuation}`, note: "SPI灵活配置频率与衰减"},
  {title: "高纯度转换", value: PRODUCT.spur, note: "提升输出信号质量"},
] as const;

// 场景开关：对应字段有值则显示该场景，为空时自动隐藏并重新拼接时间线
export const V8_ACTIVE = {
  company:   true,  // 公司介绍 — 始终显示
  product:   {{HAS_PRODUCT}},
  frequency: {{HAS_FREQUENCY}},
  bandwidth: {{HAS_BANDWIDTH}},
  control:   {{HAS_CONTROL}},
  purity:    {{HAS_PURITY}},
  compact:   {{HAS_COMPACT}},
  summary:   true,  // 优势汇总 — 始终显示（引用 PRODUCT 字段，无数据时自动留白）
  end:       true,  // 结尾联络 — 始终显示
} as const;
