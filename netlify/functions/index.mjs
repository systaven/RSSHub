import { handle } from 'hono/netlify';

// 全局变量缓存 App 实例，防止每次请求都重新加载
let cachedApp;

export const handler = async (request, context) => {
  // 核心逻辑：把 await import 放在函数内部（Lazy Load）
  // 这样既解决了 "Top-level await" 报错，
  // 又解决了 esbuild 的 CommonJS 格式冲突问题。
  if (!cachedApp) {
    const dir = '../../lib';
    const file = 'pkg.js';
    const dynamicPath = `${dir}/${file}`;
    
    // 只有当请求来的时候，才去加载 RSSHub
    const mod = await import(dynamicPath);
    cachedApp = mod.app;
  }

  return handle(cachedApp)(request, context);
};
