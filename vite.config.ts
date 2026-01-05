import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api/modelscope': {
            target: 'https://api-inference.modelscope.cn',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/modelscope/, ''),
          },
          '/api/oss-image': {
            target: 'https://muse-ai.oss-cn-hangzhou.aliyuncs.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/oss-image/, ''),
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
