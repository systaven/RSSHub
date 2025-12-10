import { handle } from 'hono/netlify';

let cachedApp;

export const handler = async (request, context) => {
  // 1. 如果还没加载过，就在函数内部加载（这里可以使用 await）
  if (!cachedApp) {
    // 这里的路径指向 lib/pkg.js，Netlify 会在运行时动态读取
    const mod = await import('../../lib/pkg.js');
    cachedApp = mod.app;
  }

  // 2. 拿到 app 后，交给 Hono 处理请求
  return handle(cachedApp)(request, context);
};
