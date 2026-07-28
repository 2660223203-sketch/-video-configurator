# ---- 构建阶段 ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# ---- 运行阶段 ----
FROM node:22-alpine
WORKDIR /app

# 安装 tsx 用于运行 TypeScript
RUN npm install -g tsx

# 复制依赖
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# 复制源码和模板
COPY server/ ./server/
COPY public/ ./public/
COPY template/ ./template/

# 创建临时目录
RUN mkdir -p .tmp/uploads

# 安全: 非 root 运行
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3456

CMD ["tsx", "server/index.ts"]
