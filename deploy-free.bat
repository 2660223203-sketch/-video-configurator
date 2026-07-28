@echo off
chcp 65001 >nul
title Cloudflare Tunnel - 永久免费公网部署

:: ============================================
::  使用 Cloudflare Tunnel 将本地服务免费上线
::  无需信用卡，无需注册账号（首次运行需联网验证）
:: ============================================

set "CFDIR=%USERPROFILE%\.cloudflared"
set "CFBIN=%CFDIR%\cloudflared.exe"

echo ╔══════════════════════════════════════╗
echo ║  🌐 Cloudflare Tunnel 免费部署      ║
echo ╚══════════════════════════════════════╝
echo.

:: 1. 检查本地服务器
curl -s http://localhost:3456 >nul 2>&1
if errorlevel 1 (
    echo [提示] 本地服务器未启动，正在启动...
    start "Configurator" /min cmd /c "cd /d "%~dp0" && npx tsx server/index.ts"
    echo 等待服务器就绪...
    timeout /t 4 /nobreak >nul
)

:: 2. 下载 cloudflared (如果第一次用)
if not exist "%CFBIN%" (
    echo.
    echo [下载] 首次使用，正在下载 Cloudflare Tunnel 客户端...
    mkdir "%CFDIR%" 2>nul

    :: 检测系统架构
    set "ARCH=amd64"
    if "%PROCESSOR_ARCHITECTURE%"=="ARM64" set "ARCH=arm64"

    set "CFURL=https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-%ARCH%.exe"

    echo 下载地址: !CFURL!
    echo 如果下载失败，请手动下载放到 %CFDIR%\cloudflared.exe
    echo 下载页面: https://github.com/cloudflare/cloudflared/releases
    echo.

    curl -L -o "%CFBIN%" "!CFURL!"

    if not exist "%CFBIN%" (
        echo.
        echo [失败] 无法自动下载 cloudflared
        echo.
        echo 请手动操作:
        echo   1. 浏览器打开: https://github.com/cloudflare/cloudflared/releases
        echo   2. 下载 cloudflared-windows-amd64.exe
        echo   3. 放到: %CFDIR%\cloudflared.exe
        echo   4. 重新运行此脚本
        pause
        exit /b 1
    )
    echo [完成] 下载成功
)

:: 3. 启动隧道
echo.
echo ══════════════════════════════════════
echo   隧道已启动！
echo   网址将显示在下方：
echo ══════════════════════════════════════
echo.
echo   把你的 TryCloudflare 网址发给任何人
echo   对方即可直接访问你的配置器
echo.
echo   按 Ctrl+C 停止分享
echo ══════════════════════════════════════
echo.

"%CFBIN%" tunnel --url http://localhost:3456
