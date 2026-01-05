import { LogoRequest } from "../types";
import { LOGO_STYLES } from "../constants";

// ModelScope Z-Image API 配置（通过边缘函数代理）
const EDGE_PROXY = 'https://billowing-snowflake-6706.4b972e1d.er.aliyun-esa.net/api';
const BASE_URL = `${EDGE_PROXY}/modelscope/`;

const commonHeaders = {
  "Content-Type": "application/json",
};

/**
 * 将图片 URL 转换为 base64（通过代理获取）
 */
const fetchImageAsBase64 = async (imageUrl: string): Promise<string> => {
  // 将 OSS URL 转换为代理路径
  const proxyUrl = imageUrl.replace(
    'https://muse-ai.oss-cn-hangzhou.aliyuncs.com',
    `${EDGE_PROXY}/oss-image`
  );
  
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error('图片下载失败');
  }
  
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * 轮询等待任务完成
 */
const pollTaskResult = async (
  taskId: string, 
  onStatusChange?: (status: string) => void,
  maxAttempts = 60, 
  interval = 3000
): Promise<string> => {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`${BASE_URL}v1/tasks/${taskId}`, {
      method: 'GET',
      headers: {
        ...commonHeaders,
        "X-ModelScope-Task-Type": "image_generation",
      },
    });

    if (!response.ok) {
      throw new Error(`任务查询失败: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`轮询中... 状态: ${data.task_status}`);
    
    // 状态映射为中文
    const statusMap: Record<string, string> = {
      'PENDING': '排队中...',
      'PROCESSING': 'AI 绘制中...',
      'SUCCEED': '生成成功',
      'FAILED': '生成失败'
    };
    onStatusChange?.(statusMap[data.task_status] || data.task_status);

    if (data.task_status === 'SUCCEED') {
      // 获取生成的图片URL
      const imageUrl = data.output_images?.[0];
      if (!imageUrl) {
        throw new Error('未找到生成的图片');
      }
      return imageUrl;
    } else if (data.task_status === 'FAILED') {
      throw new Error('图片生成失败');
    }

    // 等待后继续轮询
    await new Promise(resolve => setTimeout(resolve, interval));
  }

  throw new Error('任务超时');
};

/**
 * 使用最新图像生成模型生成 Logo
 */
export const generateLogo = async (
  request: LogoRequest, 
  onStatusChange?: (status: string) => void
): Promise<string> => {
  const styleConfig = LOGO_STYLES[request.style];
  
  // 构建适合 Z-Image 的提示词
  const prompt = `
    Design a professional logo.
    Subject: ${request.subject}
    ${request.text ? `Text to include: "${request.text}"` : ''}
    Style: ${styleConfig.promptSuffix}
    Constraint: Pure white background (#FFFFFF), high resolution, centered, clear text rendering.
  `.trim();

  try {
    onStatusChange?.('提交任务中...');
    console.log('正在提交图片生成任务...');
    
    // 创建异步任务
    const response = await fetch(`${BASE_URL}v1/images/generations`, {
      method: 'POST',
      headers: {
        ...commonHeaders,
        "X-ModelScope-Async-Mode": "true",
      },
      body: JSON.stringify({
        model: "Tongyi-MAI/Z-Image-Turbo",
        prompt: prompt,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API请求失败: ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    const taskId = result.task_id;
    
    if (!taskId) {
      throw new Error('未获取到任务ID');
    }

    console.log(`任务已创建，ID: ${taskId}`);
    onStatusChange?.('排队中...');

    // 轮询获取结果
    const imageUrl = await pollTaskResult(taskId, onStatusChange);
    
    console.log('图片生成成功，正在下载...');
    onStatusChange?.('下载图片中...');
    
    // 通过代理下载图片并转换为 base64
    const base64Image = await fetchImageAsBase64(imageUrl);
    
    console.log('图片处理完成!');
    return base64Image;

  } catch (error: any) {
    console.error("Z-Image API Error:", error);
    throw new Error(error.message || "Logo生成失败");
  }
};
