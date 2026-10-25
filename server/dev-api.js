// Local API server for development.
//
// Why this exists: Vercel runs api/*.js as serverless functions in the cloud,
// but `npm run dev` (Vite) only serves the frontend. This file gives you the
// same /api/* URLs on localhost, so you can test the contact form and
// newsletter without deploying anything or creating an account.
//
//   Terminal 1:  npm run dev:api     (this server, port 3001)
//   Terminal 2:  npm run dev         (Vite, port 5173)
//
// Vite proxies /api to port 3001 (see vite.config.js), so the frontend can
// always call fetch('/api/contact') — identical in dev and production.

import { createServer } from 'node:http'
import { existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const apiDir = join(root, 'api')
const PORT = Number(process.env.API_PORT || 3001)

// Load .env so RESEND_API_KEY / CONTACT_TO are available, same as on Vercel.
if (existsSync(join(root, '.env'))) {
  try {
    process.loadEnvFile(join(root, '.env'))
  } catch {
    console.warn('[api] .env found but could not be parsed — ignoring it.')
  }
}

// Collect one route per api/*.js file. Underscore-prefixed files are modules.
const routes = new Map()
for (const file of readdirSync(apiDir)) {
  if (!file.endsWith('.js') || file.startsWith('_')) continue
  const name = file.replace(/\.js$/, '')
  const module = await import(pathToFileURL(join(apiDir, file)).href)
  routes.set(`/api/${name}`, module.default)
}

// Vercel adds status()/json() to the response object. Node's http.ServerResponse
// does not, so add them here and the handler code stays identical.
function decorate(res) {
  res.status = (code) => {
    res.statusCode = code
    return res
  }
  res.json = (payload) => {
    const body = JSON.stringify(payload)
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Content-Length', Buffer.byteLength(body))
    res.end(body)
    return res
  }
  return res
}

const server = createServer(async (req, res) => {
  // Only needed if you call the API directly on port 3001 instead of through
  // the Vite proxy. Harmless otherwise.
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  decorate(res)

  const url = new URL(req.url, `http://${req.headers.host}`)
  const handler = routes.get(url.pathname)

  if (!handler) {
    res.status(404).json({
      error: `No API route for ${url.pathname}`,
      available: [...routes.keys()],
    })
    return
  }

  const started = Date.now()
  try {
    await handler(req, res)
  } catch (error) {
    console.error(`[api] ${req.method} ${url.pathname} crashed:`, error)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error.' })
    }
  } finally {
    console.log(
      `[api] ${req.method} ${url.pathname} → ${res.statusCode} (${Date.now() - started}ms)`,
    )
  }
})

server.listen(PORT, () => {
  const keyState = process.env.RESEND_API_KEY
    ? 'live (RESEND_API_KEY is set)'
    : 'console only (no RESEND_API_KEY — emails print here)'
  const toState = process.env.CONTACT_TO || '(CONTACT_TO not set)'

  console.log(`\n  API dev server  http://localhost:${PORT}`)
  console.log(`  Routes:         ${[...routes.keys()].join(', ')}`)
  console.log(`  Mail:           ${keyState}`)
  console.log(`  Delivering to:  ${toState}\n`)
})
