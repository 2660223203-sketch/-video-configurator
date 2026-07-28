#!/bin/bash
# ===== Remotion 视频配置器 - VPS 一键部署脚本 =====
# 适用: Ubuntu/Debian/CentOS 云服务器
# 用法: bash deploy-vps.sh

set -e

echo "╔══════════════════════════════════════╗"
echo "║  🚀 视频配置器 - VPS 部署脚本       ║"
echo "╚══════════════════════════════════════╝"

# 检测系统
if [ -f /etc/debian_version ]; then
  PKG_MGR="apt"
elif [ -f /etc/redhat-release ]; then
  PKG_MGR="yum"
else
  echo "⚠️  未识别的系统，请手动安装 Node.js 22+"
fi

# 安装 Node.js 22 (如果未安装)
if ! command -v node &>/dev/null || [ "$(node -v | cut -d'v' -f2 | cut -d'.' -f1)" -lt 18 ]; then
  echo "📦 安装 Node.js 22..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo $PKG_MGR install -y nodejs
fi

# 创建应用目录
APP_DIR="/opt/video-configurator"
sudo mkdir -p "$APP_DIR"
sudo chown -R $USER:$USER "$APP_DIR"

# 复制项目（在本地项目目录执行）
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "📁 复制项目到 $APP_DIR ..."
rsync -av --exclude 'node_modules' --exclude '.tmp' --exclude '*.zip' "$SCRIPT_DIR/" "$APP_DIR/"

# 安装依赖
cd "$APP_DIR"
echo "📦 安装依赖..."
npm install --production

# 创建 systemd 服务（开机自启 + 后台运行）
echo "⚙️  配置 systemd 服务..."
sudo tee /etc/systemd/system/video-configurator.service > /dev/null <<EOF
[Unit]
Description=Remotion Video Configurator
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$APP_DIR
ExecStart=$(which node) $APP_DIR/node_modules/.bin/tsx server/index.ts
Restart=always
RestartSec=3
Environment=NODE_ENV=production
Environment=PORT=3456

# 安全加固
NoNewPrivileges=yes
PrivateTmp=yes

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable video-configurator
sudo systemctl restart video-configurator

# 获取服务器 IP
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ip.sb 2>/dev/null || echo "YOUR_IP")

echo ""
echo "══════════════════════════════════════"
echo "  ✅  部署完成！"
echo ""
echo "  访问地址: http://$SERVER_IP:3456"
echo ""
echo "  管理命令:"
echo "    sudo systemctl status video-configurator"
echo "    sudo systemctl restart video-configurator"
echo "    sudo journalctl -u video-configurator -f"
echo ""
echo "  ⚠️  请确保防火墙开放 3456 端口:"
echo "    sudo ufw allow 3456/tcp"
echo "══════════════════════════════════════"
