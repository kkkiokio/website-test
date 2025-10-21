#!/usr/bin/env node
import http from 'node:http'
import { stat, readFile } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const args = process.argv.slice(2)
const positional = args.filter((arg) => !arg.startsWith('-'))
const rootDir = positional[0] ?? 'public'

const getFlagValue = (flag) => {
  const index = args.findIndex((arg, idx) => arg === flag || arg.startsWith(`${flag}=`))
  if (index === -1) return undefined
  const current = args[index]
  if (current.includes('=')) {
    return current.split('=')[1]
  }
  const next = args[index + 1]
  if (next && !next.startsWith('--')) {
    return next
  }
  return undefined
}

const host = getFlagValue('--host') ?? process.env.HOST ?? '127.0.0.1'
const portValue = getFlagValue('--port') ?? process.env.PORT ?? '5173'
const port = Number.parseInt(portValue, 10) || 5173

const resolvedRoot = path.resolve(__dirname, '..', rootDir)

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
}

function send404(res) {
  res.statusCode = 404
  res.setHeader('content-type', 'text/plain; charset=utf-8')
  res.end('Not found')
}

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = req.url ? decodeURIComponent(req.url.split('?')[0]) : '/'
    let filePath = path.join(resolvedRoot, urlPath)
    let stats

    try {
      stats = await stat(filePath)
    } catch {
      if (urlPath.endsWith('/')) {
        filePath = path.join(resolvedRoot, urlPath, 'index.html')
        stats = await stat(filePath)
      } else {
        filePath = path.join(resolvedRoot, 'index.html')
        stats = await stat(filePath)
      }
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html')
    }

    const ext = path.extname(filePath)
    const type = mimeTypes[ext] ?? 'application/octet-stream'
    res.statusCode = 200
    res.setHeader('content-type', type)

    if (type.startsWith('text') || type.includes('javascript') || type.includes('json')) {
      const content = await readFile(filePath, 'utf8')
      res.end(content)
    } else {
      const stream = createReadStream(filePath)
      stream.on('error', () => send404(res))
      stream.pipe(res)
    }
  } catch {
    if (!res.headersSent) {
      send404(res)
    }
  }
})

server.listen(port, host, () => {
  const baseUrl = `http://${host}:${port}`
  console.log(`Serving ${resolvedRoot} at ${baseUrl}`)
})
