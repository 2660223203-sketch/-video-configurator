/**
 * Remotion 项目渲染工具
 *
 * 用法:
 *   node render.js <project.zip>             → 渲染为 1080p MP4
 *   node render.js <project.zip> --preview    → 渲染为 540p 预览版
 *   node render.js <project-dir>              → 直接从已解压目录渲染
 *
 * 输出:
 *   生成的 MP4 放在 zip 同级目录下，文件名同项目名
 */

const fs = require("fs");
const path = require("path");
const { execSync, spawn } = require("child_process");
const { createReadStream } = require("fs");
const { pipeline } = require("stream/promises");

// ===== 配置 =====
const COMPOSITION = "ProductPromoV8";
const OUTPUT_DIR = "out";

// ===== 工具函数 =====

function log(emoji, msg) {
  const time = new Date().toLocaleTimeString("zh-CN", { hour12: false });
  console.log(`[${time}] ${emoji}  ${msg}`);
}

function exit(code, msg) {
  if (code !== 0) console.error(`\n❌  错误: ${msg}`);
  process.exit(code);
}

function run(cmd, cwd, label) {
  log("⏳", label || `执行: ${cmd}`);
  try {
    execSync(cmd, { cwd, stdio: "inherit", windowsHide: true });
  } catch (err) {
    log("❌", `${label || cmd} 失败 (退出码 ${err.status})`);
    throw err;
  }
}

function safeRm(dir) {
  try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
}

// ===== 解压 =====

async function extractZip(zipPath, destDir) {
  // 尝试使用系统 tar (Windows 10+ 内置)
  try {
    log("📦", `正在解压: ${path.basename(zipPath)}`);
    fs.mkdirSync(destDir, { recursive: true });
    execSync(`tar -xf "${zipPath}" -C "${destDir}"`, { stdio: "pipe", windowsHide: true });

    // tar 解压后可能有一层多余的根目录，自动探测并展平
    const entries = fs.readdirSync(destDir).filter(e => e !== "__MACOSX");
    if (entries.length === 1 && fs.statSync(path.join(destDir, entries[0])).isDirectory()) {
      const inner = path.join(destDir, entries[0]);
      const tmp = destDir + "_flat";
      fs.renameSync(inner, tmp);
      fs.rmdirSync(destDir);
      fs.renameSync(tmp, destDir);
    }

    log("✅", "解压完成");
  } catch {
    exit(1, "解压失败，请确认 .zip 文件未损坏且 tar 可用（Windows 10+ 内置）");
  }
}

// ===== 查找项目根目录（包含 package.json） =====

function findProjectRoot(dir) {
  // 可能嵌套了一层目录
  const direct = path.join(dir, "package.json");
  if (fs.existsSync(direct)) return dir;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory() && !e.name.startsWith(".") && e.name !== "__MACOSX") {
      const sub = path.join(dir, e.name);
      if (fs.existsSync(path.join(sub, "package.json"))) return sub;
      // 再深入一层
      const subEntries = fs.readdirSync(sub, { withFileTypes: true });
      for (const se of subEntries) {
        if (se.isDirectory() && !se.name.startsWith(".")) {
          const deep = path.join(sub, se.name);
          if (fs.existsSync(path.join(deep, "package.json"))) return deep;
        }
      }
    }
  }
  return dir; // fallback
}

// ===== 安装依赖 =====

function installDeps(projectDir) {
  const nm = path.join(projectDir, "node_modules");
  if (fs.existsSync(nm)) {
    log("⏭️", "node_modules 已存在，跳过 npm install");
    return;
  }
  run("npm install --prefer-offline", projectDir, "安装依赖 (npm install)");
}

// ===== 渲染 =====

function renderVideo(projectDir, isPreview, outPath) {
  const outDir = path.join(projectDir, OUTPUT_DIR);
  fs.mkdirSync(outDir, { recursive: true });

  const outputFile = isPreview
    ? `${path.basename(outPath, ".mp4")}-preview-540p.mp4`
    : path.basename(outPath);

  const outputFull = path.join(outDir, outputFile);

  const args = [
    "remotion", "render", COMPOSITION, outputFull,
    "--codec=h264",
    ...(isPreview
      ? ["--scale=0.5", "--crf=28"]
      : ["--crf=18", "--audio-bitrate=192k"]),
  ];

  log("🎬", `开始渲染${isPreview ? " (预览模式 540p)" : " (1080p 最终版)"}...`);
  log("🎯", `输出: ${outPath}`);

  return new Promise((resolve, reject) => {
    const child = spawn("npx", args, {
      cwd: projectDir,
      stdio: "inherit",
      shell: true,
      windowsHide: true,
    });

    child.on("close", (code) => {
      if (code === 0) {
        // 移动 MP4 到目标位置
        if (fs.existsSync(outputFull)) {
          fs.mkdirSync(path.dirname(outPath), { recursive: true });
          fs.copyFileSync(outputFull, outPath);
          log("✅", `渲染完成 → ${outPath}`);
          // 显示文件大小
          const sizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(1);
          log("📊", `文件大小: ${sizeMB} MB`);
          resolve(outPath);
        } else {
          reject(new Error("渲染完成但未找到输出文件"));
        }
      } else {
        reject(new Error(`渲染进程退出码: ${code}`));
      }
    });

    child.on("error", (err) => {
      if (err.code === "ENOENT") {
        reject(new Error("未找到 npx 命令，请安装 Node.js: https://nodejs.org"));
      } else {
        reject(err);
      }
    });
  });
}

// ===== 清理 =====

function cleanup(dir, keepProject) {
  if (keepProject) {
    // 只删 node_modules（节省空间），保留项目目录
    safeRm(path.join(dir, "node_modules"));
    log("🧹", "已清理 node_modules");
  } else {
    safeRm(dir);
    log("🧹", "已清理临时文件");
  }
}

// ===== 主流程 =====

async function main() {
  console.log("╔══════════════════════════════════════╗");
  console.log("║  🎬  Remotion 视频渲染工具          ║");
  console.log("╚══════════════════════════════════════╝\n");

  // 解析参数
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("用法:");
    console.log("  node render.js <项目.zip>              → 渲染 1080p MP4");
    console.log("  node render.js <项目.zip> --preview     → 渲染 540p 预览");
    console.log("  node render.js <项目目录>               → 从已解压目录渲染");
    process.exit(0);
  }

  const inputPath = path.resolve(args[0]);
  const isPreview = args.includes("--preview");
  const keepProject = args.includes("--keep");

  if (!fs.existsSync(inputPath)) {
    exit(1, `找不到输入文件/目录: ${inputPath}`);
  }

  const stat = fs.statSync(inputPath);
  const isZip = stat.isFile() && inputPath.toLowerCase().endsWith(".zip");
  const isDir = stat.isDirectory();

  if (!isZip && !isDir) {
    exit(1, "请提供 .zip 文件或项目目录路径");
  }

  // 确定输出路径
  const inputBase = path.basename(inputPath, ".zip");
  const outPath = path.join(
    isDir ? inputPath : path.dirname(inputPath),
    `${inputBase}.mp4`
  );

  // 检查是否已存在
  if (fs.existsSync(outPath)) {
    log("⚠️", `输出文件已存在，将被覆盖: ${path.basename(outPath)}`);
  }

  let projectDir;
  let tmpDir;

  try {
    if (isZip) {
      // 解压到临时目录
      tmpDir = path.join(path.dirname(inputPath), `.remotion-build-${Date.now()}`);
      await extractZip(inputPath, tmpDir);
      projectDir = findProjectRoot(tmpDir);
    } else {
      projectDir = inputPath;
      tmpDir = null;
    }

    // 验证项目
    if (!fs.existsSync(path.join(projectDir, "package.json"))) {
      exit(1, "未找到 package.json，请确认是有效的 Remotion 项目");
    }

    // 安装依赖
    installDeps(projectDir);

    // 渲染
    await renderVideo(projectDir, isPreview, outPath);

    // 最终输出信息
    console.log(`\n${"=".repeat(50)}`);
    console.log(`🎉  渲染成功！`);
    console.log(`📁  ${outPath}`);
    console.log(`${"=".repeat(50)}\n`);

  } catch (err) {
    log("❌", err.message || "渲染过程中出现错误");
    console.error(err);
    process.exitCode = 1;
  } finally {
    // 清理临时目录
    if (tmpDir) {
      cleanup(tmpDir, keepProject);
    }
  }
}

main();
