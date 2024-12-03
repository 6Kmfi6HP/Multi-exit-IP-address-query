# 多出口 IP 检测工具

[English](README.md)

这是一个使用 Next.js 构建的现代化网络应用，用于检测和监控多个全球服务器的 IP 地址。该工具可以通过不同的出口节点识别和验证 IP 地址，对网络测试和监控非常有用。

## 主要功能

- **实时 IP 检测**：利用 WebSocket 连接同时检测多个服务器的 IP 地址
- **全球服务器覆盖**：连接全球各地的 SpeedTest 服务器，提供全面的 IP 检测
- **并行处理**：实现批处理机制，控制并发数量，高效进行 IP 检测
- **交互式界面**：使用 Radix UI 组件和 Tailwind CSS 构建的现代响应式界面
- **进度追踪**：实时显示 IP 检测的进度
- **可折叠结果**：组织良好的结果显示，每个服务器的详细信息可展开查看
- **错误处理**：针对不稳定连接的健壮错误处理和超时管理

## 技术栈

- **框架**：Next.js 13.5+
- **开发语言**：TypeScript
- **UI 组件**：Radix UI
- **样式**：Tailwind CSS
- **状态管理**：React Hooks
- **网络协议**：WebSocket

## 项目结构

```
mult-exit-ip/
├── app/                  # Next.js 应用目录
├── components/          
│   ├── IPChecker.tsx    # 主要的 IP 检测组件
│   └── ui/              # 可复用的 UI 组件
├── lib/
│   ├── types.ts         # TypeScript 类型定义
│   └── websocket.ts     # WebSocket 连接处理
└── hooks/               # 自定义 React hooks
```

## 核心组件

### IPChecker
主要的 IP 检测组件，功能包括：
- 服务器检测的批处理
- 进度跟踪
- 结果管理和显示
- 错误处理和重试功能

### WebSocket 处理器
管理与服务器的 WebSocket 连接，特性包括：
- 超时处理
- 连接错误管理
- 从服务器响应中提取 IP 地址

## 快速开始

1. 克隆仓库
2. 安装依赖：
   ```bash
   npm install
   ```
3. 运行开发服务器：
   ```bash
   npm run dev
   ```
4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 开发指南

- **开发模式**：`npm run dev`
- **构建**：`npm run build`
- **生产环境启动**：`npm run start`
- **代码检查**：`npm run lint`

## 依赖项

- Next.js 和 React
- Radix UI 组件库
- Tailwind CSS 样式框架
- 各种 UI 工具和辅助库

## 贡献指南

欢迎提交 Pull Request 来改进这个项目！

## 许可证

本项目为私有项目，不对外开放分发。
