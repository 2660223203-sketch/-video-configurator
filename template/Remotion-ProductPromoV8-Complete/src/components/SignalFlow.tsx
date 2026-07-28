import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config/brand";
import { blink, drawLine } from "../utils/animations";

interface SignalNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface SignalFlowProps {
  /** 信号节点列表 */
  nodes: SignalNode[];
  /** 节点之间的连接（[fromIndex, toIndex]） */
  connections: Array<[number, number]>;
  /** 动画开始帧 */
  startFrame?: number;
  /** 线宽 */
  lineWidth?: number;
  /** 信号色 */
  color?: string;
  /** 整体淡出帧 */
  fadeOutStart?: number;
}

/**
 * 信号流动画组件
 *
 * 绘制节点和信号线，用于表示功能模块之间的信号连接。
 * 线从两端向中间绘制，节点带闪烁效果。
 */
export const SignalFlow: React.FC<SignalFlowProps> = ({
  nodes,
  connections,
  startFrame = 0,
  lineWidth = 2,
  color = COLORS.accent,
  fadeOutStart = 99999,
}) => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(
    frame,
    [fadeOutStart, fadeOutStart + 12],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: fadeOut,
        pointerEvents: "none",
      }}
    >
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* 连接线 */}
        {connections.map(([from, to], ci) => {
          const fromNode = nodes[from];
          const toNode = nodes[to];
          const lineProgress = drawLine(frame, startFrame + ci * 8, 30);

          // 计算当前应该绘制的线段长度
          const dx = toNode.x - fromNode.x;
          const dy = toNode.y - fromNode.y;
          const currentX = fromNode.x + dx * lineProgress;
          const currentY = fromNode.y + dy * lineProgress;

          return (
            <g key={`conn-${ci}`}>
              {/* 绘制完整的暗线（背景） */}
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={color}
                strokeWidth={0.5}
                opacity={0.2}
                strokeDasharray="4 4"
              />
              {/* 亮线随进度展开 */}
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={currentX}
                y2={currentY}
                stroke={color}
                strokeWidth={lineWidth}
                opacity={0.8}
              />
              {/* 移动的信号点 */}
              {lineProgress > 0.05 && (
                <circle
                  cx={currentX}
                  cy={currentY}
                  r={4}
                  fill={COLORS.signalNode}
                  opacity={0.9}
                />
              )}
            </g>
          );
        })}

        {/* 节点 */}
        {nodes.map((node, ni) => {
          const nodeAppear = interpolate(
            frame,
            [startFrame + ni * 10, startFrame + ni * 10 + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const nodeBlink = blink(frame + ni * 7, 40, 0.6);

          return (
            <g key={`node-${ni}`} opacity={nodeAppear}>
              {/* 外圈发光 */}
              <circle
                cx={node.x}
                cy={node.y}
                r={18}
                fill="none"
                stroke={color}
                strokeWidth={1}
                opacity={0.3 * nodeBlink}
              />
              {/* 节点圆 */}
              <circle
                cx={node.x}
                cy={node.y}
                r={10}
                fill={color}
                opacity={0.15}
                stroke={color}
                strokeWidth={2}
              />
              {/* 内芯 */}
              <circle
                cx={node.x}
                cy={node.y}
                r={3}
                fill={COLORS.signalNode}
                opacity={nodeBlink}
              />
              {/* 标签 */}
              <text
                x={node.x}
                y={node.y + 30}
                textAnchor="middle"
                fill={COLORS.textSecondary}
                fontSize={13}
                fontFamily="sans-serif"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
