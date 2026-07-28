@echo off
chcp 65001 >nul
title Remotion 视频渲染

:: ===== Remotion 项目渲染器 =====
:: 用法1: 将 .zip 文件拖拽到此脚本上
:: 用法2: render.bat "C:\path\to\project.zip"
:: 用法3: 双击运行，手动输入路径
:: ================================

echo ╔══════════════════════════════════════╗
echo ║    Remotion 视频渲染工具             ║
echo ╚══════════════════════════════════════╝
echo.

:: 检查 Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未找到 Node.js，请先安装: https://nodejs.org
    pause
    exit /b 1
)

:: 获取输入路径
set "INPUT=%~1"
if "%INPUT%"=="" (
    set /p INPUT="请输入项目 .zip 路径 (或拖拽文件到此处): "
)

:: 去除引号
set INPUT=%INPUT:"=%

if "%INPUT%"=="" (
    echo 未输入路径，退出。
    pause
    exit /b 0
)

if not exist "%INPUT%" (
    echo [错误] 文件不存在: %INPUT%
    pause
    exit /b 1
)

:: 调用 Node.js 渲染脚本
set "SCRIPT_DIR=%~dp0"
node "%SCRIPT_DIR%render.js" "%INPUT%" %2 %3 %4

echo.
echo 按任意键关闭...
pause >nul
