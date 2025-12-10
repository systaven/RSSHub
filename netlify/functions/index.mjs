import { handle } from 'hono/netlify';

// 核心修改：使用 "障眼法" 引入
// 1. new URL(...) 会欺骗打包工具，让它以为这不是一个需要打包的模块
// 2. 这样 esbuild 就会跳过 lib/pkg.js 的解析，直接放行
const modulePath = new URL('../../lib/pkg.js', import.meta.url).href;
const { app } = await import(modulePath);

export const handler = handle(app);
