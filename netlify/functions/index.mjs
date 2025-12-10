import { handle } from 'hono/netlify' // 引入 Hono 的 Netlify 适配器
import app from '../../src/server.ts'

// 把 RSSHub 的 Hono 应用转换成 Netlify Function
export const handler = handle(app)
