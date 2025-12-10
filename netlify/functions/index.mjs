import { handle } from 'hono/netlify';

// 动态引入，绕过编译检测
// 这里的 import 会在运行时执行，而不是打包时执行
const { app } = await import('../../lib/pkg.js'); 

export const handler = handle(app);
