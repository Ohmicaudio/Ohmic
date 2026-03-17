import http from 'http'
import { ProjectionReader } from './projectionReader.js'
import {
  executeCommand,
  validateCommand,
  getComposerOptions,
} from './powerShellRunner.js'

const PORT = 5181
const reader = new ProjectionReader()

// Track SSE clients
const sseClients = new Set<http.ServerResponse>()

reader.on('updated', (projectionName: string) => {
  const payload = JSON.stringify({ name: projectionName })
  for (const client of sseClients) {
    client.write(`event: projection_changed\ndata: ${payload}\n\n`)
  }
})

function sendJson(res: http.ServerResponse, data: unknown, status = 200): void {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
  res.end(JSON.stringify(data))
}

function send404(res: http.ServerResponse, message: string): void {
  sendJson(res, { error: message }, 404)
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`)
  const path = url.pathname

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end()
    return
  }

  // Health check
  if (path === '/api/health') {
    sendJson(res, { status: 'ok', uptime: process.uptime() })
    return
  }

  // SSE stream for live updates
  if (path === '/api/projections/stream') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    })
    res.write(`event: connected\ndata: ${JSON.stringify({ time: new Date().toISOString() })}\n\n`)

    sseClients.add(res)
    req.on('close', () => sseClients.delete(res))
    return
  }

  // Projection API: /api/projections/:name
  const projMatch = path.match(/^\/api\/projections\/([a-z_]+)$/)
  if (projMatch) {
    const name = projMatch[1]
    const data = reader.get(name)
    if (data) {
      sendJson(res, data)
    } else {
      send404(res, `Projection "${name}" not found or not yet generated`)
    }
    return
  }

  // Command composer options: GET /api/commands/options
  if (path === '/api/commands/options' && req.method === 'GET') {
    getComposerOptions()
      .then((data) => sendJson(res, data))
      .catch((err) => sendJson(res, { error: err.message }, 500))
    return
  }

  // Command validation: POST /api/commands/validate
  if (path === '/api/commands/validate' && req.method === 'POST') {
    let body = ''
    req.on('data', (chunk: Buffer) => { body += chunk.toString() })
    req.on('end', () => {
      try {
        const input = JSON.parse(body)
        validateCommand(input)
          .then((result) => sendJson(res, { result }))
          .catch((err) => sendJson(res, { error: err.message }, 500))
      } catch {
        sendJson(res, { error: 'Invalid JSON body' }, 400)
      }
    })
    return
  }

  // Command execution: POST /api/commands/execute
  if (path === '/api/commands/execute' && req.method === 'POST') {
    let body = ''
    req.on('data', (chunk: Buffer) => { body += chunk.toString() })
    req.on('end', () => {
      try {
        const input = JSON.parse(body)
        executeCommand(input)
          .then((result) => sendJson(res, result))
          .catch((err) => sendJson(res, { error: err.message }, 500))
      } catch {
        sendJson(res, { error: 'Invalid JSON body' }, 400)
      }
    })
    return
  }

  send404(res, 'Not found')
})

async function start(): Promise<void> {
  await reader.loadAll()
  reader.startWatching()

  server.listen(PORT, () => {
    console.log(`[administrator-server] listening on http://localhost:${PORT}`)
    console.log(`[administrator-server] projection API at /api/projections/:name`)
    console.log(`[administrator-server] SSE stream at /api/projections/stream`)
  })
}

start().catch((err) => {
  console.error('[administrator-server] Failed to start:', err)
  process.exit(1)
})

// Graceful shutdown
process.on('SIGINT', () => {
  reader.stopWatching()
  server.close()
  process.exit(0)
})
