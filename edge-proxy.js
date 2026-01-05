// edge-proxy.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // =========================================================
    // 对应 vite.config.js 中的 '/api/modelscope' 配置
    // target: 'https://api-inference.modelscope.cn'
    // =========================================================
    if (url.pathname.startsWith('/api/modelscope')) {
      // 1. rewrite: path.replace(/^\/api\/modelscope/, '')
      const newPath = url.pathname.replace('/api/modelscope', '');
      
      // 2. 目标地址
      const targetHost = 'api-inference.modelscope.cn';
      const targetUrl = `https://${targetHost}${newPath}${url.search}`;

      // 3. 构造请求
      const proxyRequest = new Request(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body
      });

      // 4. changeOrigin: true (模拟修改 Host 头)
      proxyRequest.headers.set('Host', targetHost);

      return fetch(proxyRequest);
    }

    // =========================================================
    // 对应 vite.config.js 中的 '/api/oss-image' 配置
    // target: 'https://muse-ai.oss-cn-hangzhou.aliyuncs.com'
    // =========================================================
    if (url.pathname.startsWith('/api/oss-image')) {
      // 1. rewrite
      const newPath = url.pathname.replace('/api/oss-image', '');
      
      // 2. 目标地址
      const targetHost = 'muse-ai.oss-cn-hangzhou.aliyuncs.com';
      const targetUrl = `https://${targetHost}${newPath}${url.search}`;

      const proxyRequest = new Request(targetUrl, {
        method: request.method,
        headers: request.headers,
      });

      // 3. changeOrigin: true
      proxyRequest.headers.set('Host', targetHost);
      // 移除 Referer 以防 OSS 拒绝（可选，但推荐）
      proxyRequest.headers.delete('Referer');

      const response = await fetch(proxyRequest);
      
      // 4. 特殊处理：强制添加跨域头 (解决 Canvas Tainted 问题)
      // 本地开发时 Vite 可能会忽略跨域，但线上 Canvas 操作必须要有这个头
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      
      return newResponse;
    }

    // =========================================================
    // 默认：返回静态资源
    // =========================================================
    return fetch(request);
  }
};