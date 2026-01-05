const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// 创建 Canvas 并绘制图标
function createIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // 绘制白色背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  
  // 绘制黑色方块
  const padding = Math.floor(size * 0.167); // 1/6 of size for padding
  const rectSize = size - 2 * padding;
  ctx.fillStyle = '#000000'; // Black background
  ctx.fillRect(padding, padding, rectSize, rectSize);
  
  // 绘制 'E' 字母
  ctx.fillStyle = '#ffffff'; // White text
  ctx.font = `${Math.floor(size * 0.5)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('E', size / 2, size / 2);
  
  return canvas.toBuffer('image/png');
}

// 生成不同尺寸的图标
const sizes = [16, 32, 48, 180];
const publicDir = path.join(__dirname, 'public');

// 确保 public 目录存在
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

sizes.forEach(size => {
  const buffer = createIcon(size);
  const filename = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}x${size}.png`;
  fs.writeFileSync(path.join(publicDir, filename), buffer);
  console.log(`Generated ${filename} (${size}x${size})`);
});

// 也生成一个 SVG 图标（如果不存在）
if (!fs.existsSync(path.join(publicDir, 'favicon.svg'))) {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect width="48" height="48" fill="#ffffff"/>
  <rect x="8" y="8" width="32" height="32" rx="4" fill="#2563eb"/>
  <text x="24" y="30" text-anchor="middle" font-family="Inter, sans-serif" font-size="24" fill="#ffffff" font-weight="bold">E</text>
</svg>`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
}