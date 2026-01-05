# EdgeCraft Turbo - AI Logo Generator

基于通义 Z-Image-Turbo 模型的极速 AI Logo 生成器。

🔗 **在线体验**: https://edgecraft.4b972e1d.er.aliyun-esa.net

## 功能特性

- 🎨 **多风格设计** - 电竞、极简、3D 吉祥物、徽章刺绣四种预设风格
- ⚡ **极速生成** - 基于最新图像生成模型，秒级出图
- 🔤 **精准文字** - 支持中英文文字精准渲染
- 🖼️ **智能去背** - 一键移除白色背景
- 📱 **响应式** - 完美适配移动端与桌面端

## 技术栈

- **前端**: React 19 + TypeScript + Vite 6
- **样式**: Tailwind CSS + Lucide Icons
- **AI 模型**: 通义 Z-Image-Turbo
- **部署**: 阿里云 ESA Pages + 边缘函数

## 架构

```
前端 (ESA Pages) → 边缘函数 (API 代理) → ModelScope API
```

边缘函数负责：
- 代理 ModelScope API 请求
- 注入 API Key（前端无需暴露）
- 处理 CORS 跨域
- 代理 OSS 图片下载

## 本地开发

```bash
npm install
npm run dev
```

## 部署

1. Fork 本仓库
2. 在阿里云 ESA 创建 Pages 项目，关联 GitHub 仓库
3. 创建边缘函数，配置 API 代理（参考 `edge-proxy.js`）
4. 自动构建部署

## License

MIT
