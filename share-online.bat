@echo off
chcp 65001 >nul
title 视频配置器 - 分享到公网

echo ╔══════════════════════════════════════╗
echo ║   🌐 一键公网分享                    ║
echo ╚══════════════════════════════════════╝
echo.
echo 这将创建一个临时公网地址，有效期到本窗口关闭。
echo 对方可以直接在浏览器中访问你的配置器。
echo.

:: 检查 Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未找到 Node.js
    pause
    exit /b 1
)

:: 检查本地服务器是否已启动
curl -s http://localhost:3456 >nul 2>&1
if errorlevel 1 (
    echo [提示] 本地服务器未启动，正在启动...
    start "VideoConfigurator" /min cmd /c "cd /d "%~dp0" && npx tsx server/index.ts"
    echo [等待] 等待服务器就绪...
    timeout /t 4 /nobreak >nul
)

echo.
echo ══════════════════════════════════════
echo   正在创建公网隧道...
echo ══════════════════════════════════════
echo.
echo 首次使用会下载 localtunnel，请稍候...
echo.
echo 公网地址将显示在下方（格式: https://xxx.loca.lt）
echo 把地址发给对方即可访问！
echo.
echo 按 Ctrl+C 关闭分享
echo ══════════════════════════════════════
echo.

npx localtunnel --port 3456 --print-requests
