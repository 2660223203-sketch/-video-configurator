import express from "express";
import multer from "multer";
import path from "path";
import { handleGenerate } from "./generate";
import { handleParse } from "./parse";

const app = express();
const PORT = process.env.PORT || 3456;

// 素材清单（前端也有一份，这里用于校验）
const ASSET_UPLOAD_FIELDS = [
  { name: "productImage", maxCount: 1 },
  { name: "productRig", maxCount: 1 },
  { name: "signalBlocks", maxCount: 1 },
  { name: "operation", maxCount: 1 },
  { name: "spiTiming", maxCount: 1 },
  { name: "instrument", maxCount: 1 },
  { name: "spectrum", maxCount: 1 },
  { name: "downCurves", maxCount: 1 },
  { name: "dimensions", maxCount: 1 },
];

// 文件上传临时存储（单文件最大 500MB）
const upload = multer({
  dest: path.resolve(__dirname, "..", ".tmp", "uploads"),
  limits: { fileSize: 500 * 1024 * 1024 },
});

// JSON body 解析
app.use(express.json({ limit: "2mb" }));

// 静态文件服务（前端页面）
app.use(express.static(path.resolve(__dirname, "..", "public")));

// API: 获取素材清单
app.get("/api/assets", (_req, res) => {
  const assets = [
    { id: "productRig",     label: "产品测试台实拍", scene: "产品展示",       sceneIndex: 1, type: "video", ext: ".mp4" },
    { id: "signalBlocks",   label: "信号链路框图",   scene: "宽带信号处理",   sceneIndex: 3, type: "image", ext: ".png" },
    { id: "operation",      label: "SPI控制操作",    scene: "精准数字控制",   sceneIndex: 4, type: "video", ext: ".mp4" },
    { id: "spiTiming",      label: "SPI时序图",      scene: "精准数字控制",   sceneIndex: 4, type: "image", ext: ".png" },
    { id: "instrument",     label: "仪器测试画面",   scene: "高纯度信号转换", sceneIndex: 5, type: "video", ext: ".mp4" },
    { id: "spectrum",       label: "频谱仪画面",     scene: "高纯度信号转换", sceneIndex: 5, type: "video", ext: ".mp4" },
    { id: "downCurves",     label: "下变频曲线图",   scene: "高纯度信号转换", sceneIndex: 5, type: "image", ext: ".png" },
    { id: "dimensions",     label: "外形尺寸图",     scene: "小型化集成设计", sceneIndex: 6, type: "image", ext: ".png" },
  ];
  res.json(assets);
});

// API: 智能解析产品信息
app.post("/api/parse", handleParse);

// API: 生成视频项目 zip（支持多文件上传）
app.post("/api/generate", upload.fields(ASSET_UPLOAD_FIELDS), handleGenerate);

app.listen(PORT, () => {
  console.log(`🚀 视频配置器已启动: http://localhost:${PORT}`);
  console.log(`📋 素材上传上限: 500MB / 文件`);
});
