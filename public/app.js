// ===== 标签页切换 =====
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`panel-${tab.dataset.tab}`).classList.add("active");
  });
});

// ===== 素材清单 =====
const ASSET_LIST = [
  { id: "productRig",   label: "产品测试台实拍", scene: "产品展示",       sceneIdx: 1, type: "video", accept: "video/mp4,video/webm,video/quicktime", icon: "🎬" },
  { id: "signalBlocks", label: "信号链路框图",   scene: "宽带信号处理",   sceneIdx: 3, type: "image", accept: "image/png,image/jpeg",                 icon: "🖼️" },
  { id: "operation",    label: "SPI 控制操作",   scene: "精准数字控制",   sceneIdx: 4, type: "video", accept: "video/mp4,video/webm,video/quicktime", icon: "🎬" },
  { id: "spiTiming",    label: "SPI 时序图",     scene: "精准数字控制",   sceneIdx: 4, type: "image", accept: "image/png,image/jpeg",                 icon: "🖼️" },
  { id: "instrument",   label: "仪器测试画面",   scene: "高纯度信号转换", sceneIdx: 5, type: "video", accept: "video/mp4,video/webm,video/quicktime", icon: "🎬" },
  { id: "spectrum",     label: "频谱仪画面",     scene: "高纯度信号转换", sceneIdx: 5, type: "video", accept: "video/mp4,video/webm,video/quicktime", icon: "🎬" },
  { id: "downCurves",   label: "下变频曲线图",   scene: "高纯度信号转换", sceneIdx: 5, type: "image", accept: "image/png,image/jpeg",                 icon: "🖼️" },
  { id: "dimensions",   label: "外形尺寸图",     scene: "小型化集成设计", sceneIdx: 6, type: "image", accept: "image/png,image/jpeg",                 icon: "🖼️" },
];

// 已选择的素材文件 { assetId: File }
const selectedAssets = {};

// ===== 生成素材卡片 =====
const assetCards = document.getElementById("assetCards");
const sceneNames = ["公司介绍", "产品展示", "宽频覆盖", "宽带信号处理", "精准数字控制", "高纯度信号转换", "小型化集成设计", "优势汇总", "结尾联络"];

ASSET_LIST.forEach((asset) => {
  const card = document.createElement("section");
  card.className = "card asset-card";
  card.innerHTML = `
    <div class="asset-header">
      <span class="asset-icon">${asset.icon}</span>
      <div class="asset-info">
        <h3>${asset.label}</h3>
        <span class="asset-scene">📍 ${asset.scene}</span>
      </div>
      <span class="asset-type-badge ${asset.type}">${asset.type === "video" ? "视频" : "图纸"}</span>
    </div>
    <div class="asset-body">
      <div class="asset-upload-zone" id="zone-${asset.id}">
        <input type="file" id="file-${asset.id}" accept="${asset.accept}" hidden>
        <div class="asset-placeholder" id="ph-${asset.id}">
          <span class="upload-icon">＋</span>
          <span>点击上传替换</span>
          <span class="upload-sub">留空使用模板默认素材</span>
        </div>
        <div class="asset-preview" id="preview-${asset.id}" style="display:none">
          <span class="asset-file-icon">📎</span>
          <span class="asset-file-name" id="name-${asset.id}"></span>
          <button type="button" class="btn-remove" data-asset="${asset.id}">✕</button>
        </div>
      </div>
    </div>
  `;
  assetCards.appendChild(card);

  // 绑定上传事件
  const zone = card.querySelector(`.asset-upload-zone`);
  const fileInput = card.querySelector(`input[type="file"]`);

  zone.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-remove")) return;
    fileInput.click();
  });

  zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.classList.add("drag-over"); });
  zone.addEventListener("dragleave", () => { zone.classList.remove("drag-over"); });
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file) handleAssetFile(asset.id, file);
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) handleAssetFile(asset.id, file);
  });

  // 移除按钮
  card.querySelector(".btn-remove").addEventListener("click", (e) => {
    e.stopPropagation();
    delete selectedAssets[asset.id];
    fileInput.value = "";
    document.getElementById(`ph-${asset.id}`).style.display = "flex";
    document.getElementById(`preview-${asset.id}`).style.display = "none";
  });
});

function handleAssetFile(assetId, file) {
  selectedAssets[assetId] = file;
  document.getElementById(`ph-${assetId}`).style.display = "none";
  document.getElementById(`preview-${assetId}`).style.display = "flex";
  document.getElementById(`name-${assetId}`).textContent = file.name;
}

// ===== 产品主图上传（标签页1） =====
const uploadZone = document.getElementById("uploadZone");
const fileInput = document.getElementById("productImage");
const uploadPlaceholder = document.getElementById("uploadPlaceholder");
const uploadPreview = document.getElementById("uploadPreview");
const previewImg = document.getElementById("previewImg");
const removeBtn = document.getElementById("removeImage");

uploadZone.addEventListener("click", () => fileInput.click());
uploadZone.addEventListener("dragover", (e) => { e.preventDefault(); uploadZone.classList.add("drag-over"); });
uploadZone.addEventListener("dragleave", () => { uploadZone.classList.remove("drag-over"); });
uploadZone.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadZone.classList.remove("drag-over");
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) handleMainImage(file);
});
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) handleMainImage(file);
});
removeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  fileInput.value = "";
  previewImg.src = "";
  uploadPlaceholder.style.display = "flex";
  uploadPreview.style.display = "none";
});
function handleMainImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => { previewImg.src = e.target.result; };
  reader.readAsDataURL(file);
  uploadPlaceholder.style.display = "none";
  uploadPreview.style.display = "flex";
}

// ===== 智能解析 =====
const rawTextArea = document.getElementById("rawText");
const parseBtn = document.getElementById("parseBtn");
const parseMsg = document.getElementById("parseMsg");
const FIELD_IDS = ["model", "name", "frequency", "intermediateFrequency", "bandwidth", "step", "attenuation", "spur", "dimensions"];

parseBtn.addEventListener("click", async () => {
  const text = rawTextArea.value.trim();
  if (!text) { parseMsg.textContent = "请先粘贴产品信息文本"; parseMsg.className = "parse-msg error"; return; }
  parseBtn.disabled = true;
  parseBtn.textContent = "⏳ 解析中…";
  parseMsg.textContent = "";
  parseMsg.className = "parse-msg";
  FIELD_IDS.forEach((id) => { document.getElementById(id).classList.remove("matched"); });

  try {
    const res = await fetch("/api/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error("解析请求失败");
    const result = await res.json();
    const data = result.data || {};
    let filled = 0;
    for (const field of FIELD_IDS) {
      if (data[field]) {
        document.getElementById(field).value = data[field];
        document.getElementById(field).classList.add("matched");
        filled++;
      }
    }
    parseMsg.textContent = result.message || `已填入 ${filled}/${FIELD_IDS.length} 项`;
    parseMsg.className = filled > 0 ? "parse-msg success" : "parse-msg error";
    setTimeout(() => { FIELD_IDS.forEach((id) => { document.getElementById(id).classList.remove("matched"); }); }, 3000);
  } catch (err) {
    parseMsg.textContent = "解析失败: " + err.message;
    parseMsg.className = "parse-msg error";
  } finally {
    parseBtn.disabled = false;
    parseBtn.textContent = "🔍 智能解析";
  }
});

// ===== 表单提交（两个标签页共用） =====
const loadingOverlay = document.getElementById("loadingOverlay");
const form = document.getElementById("configForm");
const submitBtn = document.getElementById("submitBtn");
const submitBtn2 = document.getElementById("submitBtn2");

async function doSubmit() {
  // 基本验证
  const nameInput = document.getElementById("name");
  if (!nameInput.value.trim()) { alert("请至少填写产品名称"); nameInput.focus(); return; }

  submitBtn.disabled = true;
  if (submitBtn2) submitBtn2.disabled = true;
  loadingOverlay.style.display = "flex";

  try {
    const formData = new FormData();

    // 添加产品主图
    const imageFile = fileInput.files[0];
    if (imageFile) formData.append("productImage", imageFile);

    // 添加产品参数字段
    const fields = ["model", "name", "frequency", "intermediateFrequency", "bandwidth", "step", "attenuation", "spur", "dimensions"];
    for (const field of fields) {
      formData.append(field, document.getElementById(field).value.trim());
    }

    // 添加素材文件
    for (const asset of ASSET_LIST) {
      if (selectedAssets[asset.id]) {
        formData.append(asset.id, selectedAssets[asset.id], selectedAssets[asset.id].name);
      }
    }

    const response = await fetch("/api/generate", { method: "POST", body: formData });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: "未知错误" }));
      throw new Error(err.error || `HTTP ${response.status}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Remotion-ProductPromo.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    alert("生成失败: " + err.message);
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    if (submitBtn2) submitBtn2.disabled = false;
    loadingOverlay.style.display = "none";
  }
}

form.addEventListener("submit", (e) => { e.preventDefault(); doSubmit(); });
if (submitBtn2) submitBtn2.addEventListener("click", doSubmit);
