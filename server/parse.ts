import { Request, Response } from "express";

/**
 * 关键词 → 字段名映射（按优先级排列，更具体的模式放前面）
 */
const RULES: { field: string; patterns: RegExp[] }[] = [
  {
    field: "model",
    patterns: [
      /型号[：:]\s*(.+)/i,
      /model[：:=]?\s*(.+)/i,
      /订货号[：:]\s*(.+)/i,
    ],
  },
  {
    field: "name",
    patterns: [
      /产品?名称[：:]\s*(.+)/i,
      /品名[：:]\s*(.+)/i,
      /组件名称[：:]\s*(.+)/i,
    ],
  },
  {
    field: "frequency",
    patterns: [
      /射频\s*(范围|频率|工作频率)[：:]\s*(.+)/i,
      /工作频[率段][：:]\s*(.+)/i,
      /RF\s*(范围|频率)[：:]?\s*(.+)/i,
      /频率范围[：:]\s*(.+)/i,
      /输入频率[：:]\s*(.+)/i,
    ],
  },
  {
    field: "intermediateFrequency",
    patterns: [
      /中频\s*(范围|频率|输出)?[：:]\s*(.+)/i,
      /IF\s*(范围|频率)?[：:]?\s*(.+)/i,
      /输出中频[：:]\s*(.+)/i,
    ],
  },
  {
    field: "bandwidth",
    patterns: [
      /瞬时带宽[：:]\s*(.+)/i,
      /带宽[：:]\s*(.+)/i,
      /工作带宽[：:]\s*(.+)/i,
      /信号带宽[：:]\s*(.+)/i,
      /bandwidth[：:]?\s*(.+)/i,
    ],
  },
  {
    field: "step",
    patterns: [
      /频率步进[：:]\s*(.+)/i,
      /步进[：:]\s*(.+)/i,
      /频点间隔[：:]\s*(.+)/i,
      /step[：:]?\s*(.+)/i,
    ],
  },
  {
    field: "attenuation",
    patterns: [
      /衰减\s*(范围|量|值)?[：:]\s*(.+)/i,
      /数控衰减[：:]\s*(.+)/i,
      /attenuation[：:]?\s*(.+)/i,
    ],
  },
  {
    field: "spur",
    patterns: [
      /杂散\s*(抑制|指标)?[：:]\s*(.+)/i,
      /杂散抑制[：:]\s*(.+)/i,
      /交调[：:]\s*(.+)/i,
      /spur[：:]?\s*(.+)/i,
      /谐波抑制[：:]\s*(.+)/i,
    ],
  },
  {
    field: "dimensions",
    patterns: [
      /(?:外形)?尺寸[：:]\s*(.+)/i,
      /体积[：:]\s*(.+)/i,
      /外形[：:]\s*(.+)/i,
      /尺寸[：:]\s*(.+)/i,
      /dimensions?[：:]?\s*(.+)/i,
    ],
  },
];

/**
 * 清理提取的值：去除前后空白、去除首尾标点
 */
function clean(value: string): string {
  return value.replace(/^[：:,\s]+/, "").replace(/[，,。.]$/, "").trim();
}

/**
 * 从一行或多行文本中提取结构化产品参数
 */
export function parseProductText(raw: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = raw.split(/\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    for (const rule of RULES) {
      // 如果该字段已经匹配到，跳过（取第一个匹配）
      if (result[rule.field]) continue;

      for (const pattern of rule.patterns) {
        const match = trimmed.match(pattern);
        if (match) {
          // 取最后一个捕获组的值
          const value = clean(match[match.length - 1]);
          if (value && value.length < 120) {
            result[rule.field] = value;
          }
          break;
        }
      }
    }
  }

  // 如果没有单独的行匹配，尝试对整个文本做全文字段匹配
  for (const rule of RULES) {
    if (result[rule.field]) continue;
    for (const pattern of rule.patterns) {
      const match = raw.match(pattern);
      if (match) {
        const value = clean(match[match.length - 1]);
        if (value && value.length < 120) {
          result[rule.field] = value;
        }
        break;
      }
    }
  }

  return result;
}

/**
 * POST /api/parse
 * 接收原始文本，返回解析后的结构化参数
 */
export function handleParse(req: Request, res: Response) {
  const { text } = req.body as { text?: string };

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "请提供产品信息文本" });
  }

  const parsed = parseProductText(text);
  const foundCount = Object.keys(parsed).length;

  res.json({
    data: parsed,
    found: foundCount,
    total: RULES.length,
    message: foundCount === 0
      ? "未能识别任何参数，请手动填写或调整文本格式"
      : foundCount >= RULES.length - 2
        ? `成功识别 ${foundCount}/${RULES.length} 项参数`
        : `已识别 ${foundCount}/${RULES.length} 项，未找到的请手动补充`,
  });
}
