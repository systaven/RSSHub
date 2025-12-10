import { handle } from 'hono/netlify';
// 核心修改：不要指向 src/server.ts，而是指向编译后的 lib/server.js
// Netlify 已经在前一步把 TS 编译成 JS 了，直接用！
import app from '../../lib/server.js'; 

export const handler = handle(app);
