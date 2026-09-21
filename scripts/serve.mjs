#!/usr/bin/env node
/**
 * serve.mjs — servidor estatico minimo para abrir os templates localmente.
 *
 *   npm run serve        depois: http://localhost:4173/templates/base.html
 *
 * Serve a raiz do repositorio para que os templates alcancem node_modules/.
 */

import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { dirname, extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PORT = Number(process.env.PORT ?? 4173)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
}

createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
  let filePath = join(ROOT, normalize(urlPath).replace(/^(\.\.[/\\])+/, ''))

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403).end('Forbidden')
    return
  }
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html')
  }
  if (!existsSync(filePath)) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Não encontrado')
    return
  }

  res.writeHead(200, { 'content-type': TYPES[extname(filePath)] ?? 'application/octet-stream' })
  createReadStream(filePath).pipe(res)
}).listen(PORT, () => {
  console.log(`\n  GOVBR-DS kit em http://localhost:${PORT}/templates/base.html\n`)
})
