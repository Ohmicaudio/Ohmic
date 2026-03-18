import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import { ProjectionReader } from './projectionReader.js'
import { writeIntakeFocusSelection } from './focusWriter.js'
import { getAdministratorRuntimeDir } from './runtimeConfig.js'
import { readActiveClaimsFromDisk } from './activeClaimsSource.js'
import { readReadyTasksFromDisk } from './readyTasksSource.js'
import { readTandemStatus } from './tandemProxy.js'
import { readWorkspaceActivity } from './workspaceActivitySource.js'
import {
  executeCommand,
  getFilingOptions,
  recordFiling,
  recordProviderFollowUpCompletion,
  recordProviderFollowUpReopen,
  recordTandemHandshakeResolution,
  recordTandemLaunchIntent,
  recordTandemTargetHandshake,
  reopenInactiveIntake,
  validateCommand,
  getComposerOptions,
} from './powershellRunner.js'

const PORT = 5181

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

export function createAdministratorServer(port = PORT) {
  const reader = new ProjectionReader()
  const sseClients = new Set<http.ServerResponse>()

  reader.on('updated', (projectionName: string) => {
    const payload = JSON.stringify({ name: projectionName })
    for (const client of sseClients) {
      client.write(`event: projection_changed\ndata: ${payload}\n\n`)
    }
  })

  const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? '/', `http://localhost:${port}`)
    const requestPath = url.pathname

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
    if (requestPath === '/api/health') {
      const expectedProjections = reader.getExpectedProjectionNames()
      const loadedProjections = reader.getLoadedProjectionNames()

      sendJson(res, {
        status: 'ok',
        uptime: process.uptime(),
        runtime_dir: getAdministratorRuntimeDir(),
        expected_projections: expectedProjections,
        loaded_projections: loadedProjections,
        missing_projections: expectedProjections.filter(
          (name) => !loadedProjections.includes(name)
        ),
      })
      return
    }

    if (requestPath === '/api/tandem/status') {
      readTandemStatus()
        .then((status) => sendJson(res, status))
        .catch((err) => sendJson(res, { error: err.message }, 500))
      return
    }

    if (requestPath === '/api/tandem/launch-intent' && req.method === 'POST') {
      let body = ''
      req.on('data', (chunk: Buffer) => { body += chunk.toString() })
      req.on('end', () => {
        try {
          const input = JSON.parse(body)
          recordTandemLaunchIntent(input)
            .then((result) => sendJson(res, result))
            .catch((err) => sendJson(res, { error: err.message }, 500))
        } catch {
          sendJson(res, { error: 'Invalid JSON body' }, 400)
        }
      })
      return
    }

    if (requestPath === '/api/tandem/handshake-target' && req.method === 'POST') {
      let body = ''
      req.on('data', (chunk: Buffer) => { body += chunk.toString() })
      req.on('end', () => {
        try {
          const input = JSON.parse(body)
          recordTandemTargetHandshake(input)
            .then((result) => sendJson(res, result))
            .catch((err) => sendJson(res, { error: err.message }, 500))
        } catch {
          sendJson(res, { error: 'Invalid JSON body' }, 400)
        }
      })
      return
    }

    if (requestPath === '/api/tandem/handshake-resolution' && req.method === 'POST') {
      let body = ''
      req.on('data', (chunk: Buffer) => { body += chunk.toString() })
      req.on('end', () => {
        try {
          const input = JSON.parse(body)
          if (!input?.state || !['attached', 'failed', 'cleared'].includes(input.state)) {
            sendJson(res, { error: 'Missing valid state in request body' }, 400)
            return
          }
          recordTandemHandshakeResolution(input)
            .then((result) => sendJson(res, result))
            .catch((err) => sendJson(res, { error: err.message }, 500))
        } catch {
          sendJson(res, { error: 'Invalid JSON body' }, 400)
        }
      })
      return
    }

    if (requestPath === '/api/tandem/follow-up-complete' && req.method === 'POST') {
      let body = ''
      req.on('data', (chunk: Buffer) => { body += chunk.toString() })
      req.on('end', () => {
        try {
          const input = JSON.parse(body)
          if (!input?.intake_id) {
            sendJson(res, { error: 'Missing intake_id in request body' }, 400)
            return
          }
          recordProviderFollowUpCompletion(input)
            .then((result) => sendJson(res, result))
            .catch((err) => sendJson(res, { error: err.message }, 500))
        } catch {
          sendJson(res, { error: 'Invalid JSON body' }, 400)
        }
      })
      return
    }

    if (requestPath === '/api/tandem/follow-up-reopen' && req.method === 'POST') {
      let body = ''
      req.on('data', (chunk: Buffer) => { body += chunk.toString() })
      req.on('end', () => {
        try {
          const input = JSON.parse(body)
          if (!input?.intake_id) {
            sendJson(res, { error: 'Missing intake_id in request body' }, 400)
            return
          }
          recordProviderFollowUpReopen(input)
            .then((result) => sendJson(res, result))
            .catch((err) => sendJson(res, { error: err.message }, 500))
        } catch {
          sendJson(res, { error: 'Invalid JSON body' }, 400)
        }
      })
      return
    }

    // SSE stream for live updates
    if (requestPath === '/api/projections/stream') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      })
      res.write(
        `event: connected\ndata: ${JSON.stringify({ time: new Date().toISOString() })}\n\n`
      )

      sseClients.add(res)
      req.on('close', () => sseClients.delete(res))
      return
    }

    // Projection API: /api/projections/:name
    const projMatch = requestPath.match(/^\/api\/projections\/([a-z_]+)$/)
    if (projMatch) {
      const name = projMatch[1]
      if (name === 'ready_tasks') {
        readReadyTasksFromDisk()
          .then((data) => sendJson(res, data))
          .catch((err) => sendJson(res, { error: err.message }, 500))
        return
      }
      if (name === 'active_claims') {
        readActiveClaimsFromDisk()
          .then((data) => sendJson(res, data))
          .catch((err) => sendJson(res, { error: err.message }, 500))
        return
      }
      if (name === 'administrator_workspace_activity') {
        readWorkspaceActivity()
          .then((data) => sendJson(res, data))
          .catch((err) => sendJson(res, { error: err.message }, 500))
        return
      }
      const data = reader.get(name)
      if (data) {
        sendJson(res, data)
      } else {
        send404(res, `Projection "${name}" not found or not yet generated`)
      }
      return
    }

    // Command composer options: GET /api/commands/options
    if (requestPath === '/api/commands/options' && req.method === 'GET') {
      getComposerOptions()
        .then((data) => sendJson(res, data))
        .catch((err) => sendJson(res, { error: err.message }, 500))
      return
    }

    // Filing picker options: GET /api/filing/options?intakeId=...
    if (requestPath === '/api/filing/options' && req.method === 'GET') {
      const intakeId = url.searchParams.get('intakeId')
      if (!intakeId) {
        sendJson(res, { error: 'Missing intakeId query parameter' }, 400)
        return
      }

      getFilingOptions(intakeId)
        .then((data) => sendJson(res, data))
        .catch((err) => sendJson(res, { error: err.message }, 500))
      return
    }

    // Filing writeback: POST /api/filing/record
    if (requestPath === '/api/filing/record' && req.method === 'POST') {
      let body = ''
      req.on('data', (chunk: Buffer) => { body += chunk.toString() })
      req.on('end', () => {
        try {
          const input = JSON.parse(body)
          recordFiling(input)
            .then((result) => sendJson(res, result))
            .catch((err) => sendJson(res, { error: err.message }, 500))
        } catch {
          sendJson(res, { error: 'Invalid JSON body' }, 400)
        }
      })
      return
    }

    // Focus publication: POST /api/focus/intake
    if (requestPath === '/api/focus/intake' && req.method === 'POST') {
      let body = ''
      req.on('data', (chunk: Buffer) => { body += chunk.toString() })
      req.on('end', () => {
        try {
          const input = JSON.parse(body) as { intake_id?: string | null }
          writeIntakeFocusSelection(input.intake_id ?? null)
            .then((selection) => sendJson(res, { selection }))
            .catch((err) => sendJson(res, { error: err.message }, 500))
        } catch {
          sendJson(res, { error: 'Invalid JSON body' }, 400)
        }
      })
      return
    }

    // Command validation: POST /api/commands/validate
    if (requestPath === '/api/commands/validate' && req.method === 'POST') {
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
    if (requestPath === '/api/commands/execute' && req.method === 'POST') {
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

    // Inactive reopen: POST /api/inactive/reopen
    if (requestPath === '/api/inactive/reopen' && req.method === 'POST') {
      let body = ''
      req.on('data', (chunk: Buffer) => { body += chunk.toString() })
      req.on('end', () => {
        try {
          const input = JSON.parse(body)
          reopenInactiveIntake(input)
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

  return {
    reader,
    server,
    async start(): Promise<string> {
      await reader.loadAll()
      reader.startWatching()

      await new Promise<void>((resolve) => {
        server.listen(port, resolve)
      })

      const address = server.address()
      const actualPort =
        typeof address === 'object' && address ? address.port : port
      return `http://localhost:${actualPort}`
    },
    async stop(): Promise<void> {
      reader.stopWatching()
      await new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err)
          else resolve()
        })
      })
    },
  }
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isDirectRun) {
  const app = createAdministratorServer(PORT)
  app.start()
    .then((baseUrl) => {
      console.log(`[administrator-server] listening on ${baseUrl}`)
      console.log('[administrator-server] projection API at /api/projections/:name')
      console.log('[administrator-server] SSE stream at /api/projections/stream')
    })
    .catch((err) => {
      console.error('[administrator-server] Failed to start:', err)
      process.exit(1)
    })

  process.on('SIGINT', () => {
    app.stop()
      .finally(() => process.exit(0))
  })
}
