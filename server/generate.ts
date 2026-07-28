import fs from "fs";
import path from "path";
import archiver from "archiver";
import { Request, Response } from "express";

/** 模板根目录（相对于 server/ 的上级） */
const TEMPLATE_DIR = path.resolve(__dirname, "..", "template", "Remotion-ProductPromoV8-Complete");

/** 需要替换的占位符 → 表单字段映射 */
const PLACEHOLDER_MAP: Record<string, keyof ProductInput> = {
  "{{PRODUCT_MODEL}}": "model",
  "{{PRODUCT_NAME}}": "name",
  "{{PRODUCT_SUBTITLE}}": "subtitle",
  "{{PRODUCT_FREQUENCY}}": "frequency",
  "{{PRODUCT_IF}}": "intermediateFrequency",
  "{{PRODUCT_BANDWIDTH}}": "bandwidth",
  "{{PRODUCT_STEP}}": "step",
  "{{PRODUCT_ATTENUATION}}": "attenuation",
  "{{PRODUCT_SPUR}}": "spur",
  "{{PRODUCT_DIMENSIONS}}": "dimensions",
  "{{PRODUCT_FREQUENCY_SPAN}}": "frequencySpan",
};

interface ProductInput {
  model: string;
  name: string;
  subtitle: string;
  frequency: string;
  intermediateFrequency: string;
  bandwidth: string;
  step: string;
  attenuation: string;
  spur: string;
  dimensions: string;
  frequencySpan: string;
  featuresJson: string;
}

/**
 * 递归复制目录（跳过 node_modules 等不需要的目录）
 */
function copyDir(src: string, dest: string, skip: Set<string> = new Set(["node_modules", ".git", "out"])) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, skip);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * 占位符替换
 */
function injectPlaceholders(filePath: string, data: ProductInput, featuresJson: string, activeFlags: Record<string, boolean>) {
  let content = fs.readFileSync(filePath, "utf-8");
  for (const [placeholder, field] of Object.entries(PLACEHOLDER_MAP)) {
    content = content.replaceAll(placeholder, data[field]);
  }
  // 特殊处理: features JSON 数组直接注入
  content = content.replaceAll("{{PRODUCT_FEATURES_JSON}}", featuresJson);
  // HAS_* 场景开关注入
  for (const [flag, value] of Object.entries(activeFlags)) {
    content = content.replaceAll(`{{${flag}}}`, value ? "true" : "false");
  }
  fs.writeFileSync(filePath, content, "utf-8");
}

/** 根据表单数据判断哪些场景应该显示 */
function computeActiveFlags(body: Record<string, string>): Record<string, boolean> {
  const has = (s: string) => (body[s] || "").trim().length > 0;
  return {
    HAS_PRODUCT:    has("name") || has("model"),
    HAS_FREQUENCY:  has("frequency") || has("intermediateFrequency"),
    HAS_BANDWIDTH:  has("bandwidth"),
    HAS_CONTROL:    has("step") || has("attenuation"),
    HAS_PURITY:     has("spur"),
    HAS_COMPACT:    has("dimensions"),
  };
}

/**
 * 尝试从频率范围字符串推算频率跨度 (e.g. "2–18GHz" → "16GHz")
 */
function deriveFrequencySpan(frequency: string): string {
  // 匹配范围分隔符: 所有 Unicode 破折号 + hyphen + tilde
  // \p{Pd} = 所有 dash punctuation (en-dash, em-dash, hyphen, etc.)
  const match = frequency.match(/([\d.]+)\s*[\p{Pd}~]\s*([\d.]+)\s*(GHz|MHz|kHz)?/iu);
  if (match) {
    const low = parseFloat(match[1]);
    const high = parseFloat(match[2]);
    const unit = match[3] || "GHz";
    const span = high - low;
    // 保留合理精度
    if (span === Math.floor(span)) {
      return `${span}${unit}`;
    }
    return `${span.toFixed(1)}${unit}`;
  }
  return frequency; // fallback: 直接返回原值
}

/**
 * 默认产品特性（三个功能面板）
 */
const DEFAULT_FEATURES = [
  {en: "FEATURE 1", zh: "功能特性一"},
  {en: "FEATURE 2", zh: "功能特性二"},
  {en: "FEATURE 3", zh: "功能特性三"},
];

/** 上传字段名 → 模板内目标路径（相对于项目根目录的 public/） */
const ASSET_DEST_MAP: Record<string, string> = {
  productImage: "assets/product/product-main.png",
  productRig:   "assets/v8/video/product-rig.mp4",
  signalBlocks: "assets/v8/pdf/signal-blocks.png",
  operation:    "assets/v8/video/operation.mp4",
  spiTiming:    "assets/v8/pdf/spi-timing.png",
  instrument:   "assets/v8/video/instrument.mp4",
  spectrum:     "assets/v8/video/spectrum.mp4",
  downCurves:   "assets/v8/pdf/downconversion-curves.png",
  dimensions:   "assets/v8/pdf/dimensions.png",
};

/**
 * POST /api/generate
 * 接收产品参数 + 素材文件，注入模板，返回 zip
 */
export async function handleGenerate(req: Request, res: Response) {
  const tmpId = `remotion-${Date.now()}`;
  const tmpDir = path.resolve(__dirname, "..", ".tmp", tmpId);
  const zipPath = path.resolve(__dirname, "..", ".tmp", `${tmpId}.zip`);

  try {
    // 1. 解析表单数据
    const body = req.body as Record<string, string>;
    const featuresJson = body.featuresJson || JSON.stringify(DEFAULT_FEATURES);
    const frequencyRaw = body.frequency || "";
    const productData: ProductInput = {
      model: body.model || "",
      name: body.name || "",
      subtitle: body.subtitle || `${body.name || "产品"} — 核心性能参数一览`,
      frequency: frequencyRaw,
      intermediateFrequency: body.intermediateFrequency || "",
      bandwidth: body.bandwidth || "",
      step: body.step || "",
      attenuation: body.attenuation || "",
      spur: body.spur || "",
      dimensions: body.dimensions || "",
      frequencySpan: body.frequencySpan || deriveFrequencySpan(frequencyRaw),
      featuresJson,
    };

    // 2. 复制模板到临时目录
    fs.mkdirSync(path.dirname(tmpDir), { recursive: true });
    copyDir(TEMPLATE_DIR, tmpDir);

    // 3. 注入占位符（含场景开关）
    const activeFlags = computeActiveFlags(body);
    injectPlaceholders(path.join(tmpDir, "src", "v8", "content.ts"), productData, featuresJson, activeFlags);
    injectPlaceholders(path.join(tmpDir, "src", "v8", "captions.json"), productData, featuresJson, activeFlags);
    console.log(`  🎬 场景开关: ${Object.entries(activeFlags).map(([k,v])=>`${k}=${v}`).join(", ")}`);

    // 4. 替换所有用户上传的素材文件
    const files = (req as any).files as Record<string, Express.Multer.File[]> | undefined;
    if (files) {
      for (const [fieldName, destRel] of Object.entries(ASSET_DEST_MAP)) {
        const uploaded = files[fieldName];
        if (uploaded && uploaded.length > 0) {
          const destPath = path.join(tmpDir, "public", destRel);
          fs.mkdirSync(path.dirname(destPath), { recursive: true });
          fs.copyFileSync(uploaded[0].path, destPath);
          console.log(`  📁 素材替换: ${fieldName} → ${destRel}`);
        }
      }
    }

    // 5. 写入自带的渲染脚本到项目根目录
    const renderBat = `@echo off
chcp 65001 >nul
title 视频渲染
echo.
echo   🎬 正在渲染视频，请勿关闭此窗口...
echo.
echo   [1/3] 安装依赖...
call npm install
echo.
echo   [2/3] 正在渲染 1080p MP4...
call npx remotion render ProductPromoV8 out\\output.mp4 --codec=h264 --crf=18 --audio-bitrate=192k
echo.
if exist "out\\output.mp4" (
  echo   [3/3] ✅ 渲染完成！
  echo.
  echo   📁 视频位置: out\\output.mp4
  start "" "out"
) else (
  echo   ❌ 渲染失败，请检查上方错误信息
)
echo.
echo   按任意键关闭...
pause >nul
`;
    fs.writeFileSync(path.join(tmpDir, "一键渲染.bat"), renderBat, "utf-8");

    // 6. 打包 zip
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 5 } });

    // 等到 zip 写入完成再返回
    await new Promise<void>((resolve, reject) => {
      output.on("close", resolve);
      archive.on("error", reject);

      archive.pipe(output);
      archive.directory(tmpDir, "Remotion-ProductPromoV8-Complete");
      archive.finalize();
    });

    // 6. 返回 zip 下载
    res.download(zipPath, "Remotion-ProductPromo.zip", (err) => {
      // 清理临时文件
      if (err) console.error("下载失败:", err);
      fs.rmSync(tmpDir, { recursive: true, force: true });
      fs.rmSync(zipPath, { force: true });
    });
  } catch (err) {
    console.error("生成失败:", err);
    // 清理残留
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
    try { fs.rmSync(zipPath, { force: true }); } catch {}
    res.status(500).json({ error: "生成失败，请重试" });
  }
}
