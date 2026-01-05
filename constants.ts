import { LogoStyle, LogoStyleKey, Template, Language } from './types';
import { Zap, Shield, Component, Hexagon } from 'lucide-react';

export const LOGO_STYLES: Record<LogoStyleKey, LogoStyle> = {
  ESPORT: {
    id: 'ESPORT',
    label: { zh: '电竞风格', en: 'E-Sport' },
    description: { zh: '粗线条、激进、矢量美学', en: 'Bold lines, aggressive, vector aesthetics' },
    promptSuffix: 'esports logo, vector art, bold thick lines, aggressive styling, sharp angles, centered composition',
    icon: 'Zap'
  },
  MINIMAL: {
    id: 'MINIMAL',
    label: { zh: '极简主义', en: 'Minimal' },
    description: { zh: '干净、扁平、Apple 风格设计', en: 'Clean, flat, Apple-esque design' },
    promptSuffix: 'minimalist logo, flat design, simple shapes, high contrast, apple style, elegant, negative space',
    icon: 'Component'
  },
  MASCOT: {
    id: 'MASCOT',
    label: { zh: '3D 吉祥物', en: 'Mascot' },
    description: { zh: '可爱、3D 渲染、粘土质感', en: 'Cute, 3D render, clay texture' },
    promptSuffix: 'cute mascot character, 3d render style, clay texture, soft lighting, friendly, vibrant colors',
    icon: 'Hexagon'
  },
  EMBLEM: {
    id: 'EMBLEM',
    label: { zh: '徽章刺绣', en: 'Emblem' },
    description: { zh: '编织质感、补丁风格', en: 'Woven texture, patch style' },
    promptSuffix: 'embroidery patch style, woven texture, stitching details, badge, emblem, high quality fabric look',
    icon: 'Shield'
  }
};

export const TRANSLATIONS = {
  zh: {
    title: "AI Logo 生成器",
    subtitle: "极速构建品牌形象",
    desc: "专为 Logo 设计优化。由最新图像生成模型驱动，支持极速推理与精准文字绘制。",
    subjectLabel: "Logo 主体描述",
    subjectPlaceholder: "例如：一只戴着宇航员头盔的猫...",
    subjectHelper: "支持中文输入",
    textLabel: "Logo 文字内容",
    textPlaceholder: "例如：EDGE",
    textHelper: "Z-Image 引擎可精准绘制 Logo 文字",
    styleLabel: "设计风格",
    generate: "生成 Logo",
    generating: "设计中...",
    preview: "Logo 预览",
    ready: "等待指令",
    removeBg: "智能去背景",
    save: "下载 Logo",
    errorEmpty: "请输入 Logo 的主体描述",
    errorGen: "生成失败，请重试",
    lucky: "试试手气",
    poweredBy: "Powered by Aliyun ESA & Latest AI Model",
    styleSectionTitle: "风格预设"
  },
  en: {
    title: "AI Logo Generator",
    subtitle: "Instant Brand Design",
    desc: "Optimized for Logo Design. Powered by the latest image generation model, supporting turbo inference and precise text rendering.",
    subjectLabel: "Logo Subject",
    subjectPlaceholder: "e.g. A cat wearing an astronaut helmet...",
    subjectHelper: "Describe the icon clearly",
    textLabel: "Logo Text",
    textPlaceholder: "e.g. EDGE",
    textHelper: "Precise text rendering via Z-Image engine",
    styleLabel: "Design Style",
    generate: "Generate Logo",
    generating: "Designing...",
    preview: "Logo Preview",
    ready: "Ready to create",
    removeBg: "Remove BG",
    save: "Download Logo",
    errorEmpty: "Please describe the logo subject",
    errorGen: "Generation failed, please try again",
    lucky: "I'm Feeling Lucky",
    poweredBy: "Powered by Aliyun ESA & Latest AI Model",
    styleSectionTitle: "Style Preset"
  }
};

export const TEMPLATES: Template[] = [
  { subject: "A cybernetic fox head", text: "FOX", style: "ESPORT" },
  { subject: "A steaming coffee cup with a leaf", text: "BREW", style: "MINIMAL" },
  { subject: "A cute baby dragon holding a gem", text: "DRACO", style: "MASCOT" },
  { subject: "A vintage rocket ship launching", text: "APOLLO", style: "EMBLEM" },
  { subject: "A geometric mountain peak", text: "SUMMIT", style: "MINIMAL" },
  { subject: "A fierce spartan helmet", text: "TITAN", style: "ESPORT" },
  { subject: "A friendly robot waving hand", text: "BOT", style: "MASCOT" },
  { subject: "A golden lion shield", text: "GUARD", style: "EMBLEM" },
  { subject: "An abstract brain circuit connection", text: "NEURAL", style: "MINIMAL" },
  { subject: "A ninja holding two swords", text: "SHADOW", style: "ESPORT" },
];
