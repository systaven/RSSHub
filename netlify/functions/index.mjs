import { handle } from 'hono/netlify';
import path from 'path';

// -----------------------------------------------------------
// 核心技巧：把路径拆开写，欺骗 esbuild
// 只要路径不是纯字符串，esbuild 就不会去尝试打包它，也不会报错
// -----------------------------------------------------------
const dir = '../../lib';
const file = 'pkg.js';
const dynamicPath = `${dir}/${file}`; 

let cachedApp;

export const handler = async (request, context) => {
  if (!cachedApp) {
    // 这里的 console.log 是为了方便你排错，看路径对不对
    console.log(`Loading RSSHub from ${dynamicPath}...`);
    
    // 动态加载！这时候是 Node.js 运行时在加载，支持所有高级语法
    const mod = await import(dynamicPath);
    cachedApp = mod.app;
  }
  return handle(cachedApp)(request, context);
};
