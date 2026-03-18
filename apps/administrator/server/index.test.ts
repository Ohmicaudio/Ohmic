import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'fs/promises'
import http from 'http'
import path from 'path'

const localRuntimeBase = 'B:\\ohmic-local\\runtime\\administrator-tests'
const localQueueBase = 'B:\\ohmic-local\\runtime\\administrator-ready-tests'
const localActiveClaimsBase = 'B:\\ohmic-local\\runtime\\administrator-active-tests'

async function importServer() {
  vi.resetModules()
  return import('./index')
}

describe('administrator server', () => {
  let previousRuntimeDir: string | undefined
  let tempRuntimeDir: string | null = null
  let tempReadyQueueDir: string | null = null
  let tempActiveClaimsDir: string | null = null
  let stopServer: (() => Promise<void>) | null = null
  let tandemProbeServer: http.Server | null = null

  beforeEach(async () => {
    previousRuntimeDir = process.env.ADMINISTRATOR_RUNTIME_DIR
    await mkdir(localRuntimeBase, { recursive: true })
    await mkdir(localQueueBase, { recursive: true })
    await mkdir(localActiveClaimsBase, { recursive: true })
    tempRuntimeDir = await mkdtemp(path.join(localRuntimeBase, 'server-'))
    tempReadyQueueDir = await mkdtemp(path.join(localQueueBase, 'ready-'))
    tempActiveClaimsDir = await mkdtemp(path.join(localActiveClaimsBase, 'active-'))
    process.env.ADMINISTRATOR_RUNTIME_DIR = tempRuntimeDir
    process.env.ADMINISTRATOR_READY_QUEUE_DIR = tempReadyQueueDir
    process.env.ADMINISTRATOR_ACTIVE_JOBS_DIR = tempActiveClaimsDir

    await writeFile(
      path.join(tempRuntimeDir, 'dashboard_status_cards.json'),
      JSON.stringify(
        {
          generated_at: '2026-03-17T16:00:00Z',
          source: {
            kind: 'test',
            path: 'runtime',
          },
          staleness: {
            status: 'fresh',
            reason: null,
          },
          count: 1,
          cards: [
            {
              card_id: 'summary',
              title: 'Summary',
              freshness: 'fresh',
              emphasis: 'normal',
              fields: [
                {
                  label: 'Ready',
                  value: '5',
                },
              ],
            },
          ],
        },
        null,
        2
      ),
      'utf-8'
    )
  })

  afterEach(async () => {
    if (stopServer) {
      await stopServer()
      stopServer = null
    }

    if (previousRuntimeDir === undefined) {
      delete process.env.ADMINISTRATOR_RUNTIME_DIR
    } else {
      process.env.ADMINISTRATOR_RUNTIME_DIR = previousRuntimeDir
    }

    if (tempRuntimeDir) {
      await rm(tempRuntimeDir, { recursive: true, force: true })
      tempRuntimeDir = null
    }

    if (tempReadyQueueDir) {
      await rm(tempReadyQueueDir, { recursive: true, force: true })
      tempReadyQueueDir = null
    }
    if (tempActiveClaimsDir) {
      await rm(tempActiveClaimsDir, { recursive: true, force: true })
      tempActiveClaimsDir = null
    }

    if (tandemProbeServer) {
      await new Promise<void>((resolve, reject) => {
        tandemProbeServer?.close((error) => {
          if (error) reject(error)
          else resolve()
        })
      })
      tandemProbeServer = null
    }

    delete process.env.ADMINISTRATOR_TANDEM_BASE_URL
    delete process.env.ADMINISTRATOR_TANDEM_SESSION_LABEL
    delete process.env.ADMINISTRATOR_TANDEM_SESSION_STATE
    delete process.env.ADMINISTRATOR_TANDEM_ACTIVE_TARGET_LABEL
    delete process.env.ADMINISTRATOR_TANDEM_TARGET_PRESETS
    delete process.env.ADMINISTRATOR_TANDEM_STATUS_URL
    delete process.env.ADMINISTRATOR_READY_QUEUE_DIR
    delete process.env.ADMINISTRATOR_ACTIVE_JOBS_DIR
  })

  async function writeActiveQueueFixture(intakeId: string, title: string) {
    await writeFile(
      path.join(tempRuntimeDir!, 'administrator_intake_queue.json'),
      JSON.stringify(
        {
          generated_at: '2026-03-17T16:05:00Z',
          projection_name: 'administrator_intake_queue',
          staleness: {
            status: 'fresh',
            reason: null,
          },
          refresh_triggers: ['routing_change'],
          metadata: {
            ordering: 'priority_then_received_at_desc',
            includes_warning_state: true,
          },
          count: 1,
          queue_items: [
            {
              intake_id: intakeId,
              title,
              intake_kind: 'manual',
              received_at: '2026-03-17T16:04:00Z',
              status: 'triaging',
              routing_target: '',
              trust_tier: '2',
              priority_hint: 'high',
              tags: [],
              warning_state: 'clean',
              warning_count: 0,
              summary_label: title,
            },
          ],
        },
        null,
        2
      ),
      'utf-8'
    )
  }

  it('serves health and loaded projections from the runtime root', async () => {
    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const healthRes = await fetch(`${baseUrl}/api/health`)
    expect(healthRes.ok).toBe(true)
    const health = (await healthRes.json()) as {
      runtime_dir: string
      loaded_projections: string[]
      expected_projections: string[]
    }

    expect(health.runtime_dir).toBe(tempRuntimeDir)
    expect(health.loaded_projections).toContain('dashboard_status_cards')
    expect(health.expected_projections).toContain('administrator_attachment_preview')
    expect(health.expected_projections).toContain('administrator_audit_summary')
    expect(health.expected_projections).toContain('administrator_filing_history_projection')
    expect(health.expected_projections).toContain('administrator_inactive_intake')
    expect(health.expected_projections).toContain('administrator_status_history')

    const projectionRes = await fetch(`${baseUrl}/api/projections/dashboard_status_cards`)
    expect(projectionRes.ok).toBe(true)
    const projection = (await projectionRes.json()) as {
      cards: Array<{ card_id: string }>
    }

    expect(projection.cards[0].card_id).toBe('summary')
  })

  it('serves ready tasks from the live queue directory instead of stale runtime cache', async () => {
    await writeFile(
      path.join(tempReadyQueueDir!, '2026-03-18-fix-provider-desk-truth.md'),
      `scope: task\nstatus: ready\npriority: high\nproject: administrator\n\n# Fix provider desk truth\n`,
      'utf-8'
    )

    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const readyRes = await fetch(`${baseUrl}/api/projections/ready_tasks`)
    expect(readyRes.ok).toBe(true)
    const ready = (await readyRes.json()) as {
      count: number
      tasks: Array<{
        task_id: string
        title: string
        priority: string
        project: string
        status: string
      }>
    }

    expect(ready.count).toBe(1)
    expect(ready.tasks[0]).toMatchObject({
      task_id: '2026-03-18-fix-provider-desk-truth',
      title: 'Fix provider desk truth',
      priority: 'high',
      project: 'administrator',
      status: 'ready',
    })
  })

  it('serves workspace activity for the administrator lane', async () => {
    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const activityRes = await fetch(`${baseUrl}/api/projections/administrator_workspace_activity`)
    expect(activityRes.ok).toBe(true)
    const activity = (await activityRes.json()) as {
      status: string
      scope_label: string
      workspace_dir: string
      recent_commits: Array<{
        hash: string
        summary: string
        committed_at: string
      }>
    }

    expect(activity.status).toBe('available')
    expect(activity.scope_label).toBe('apps/administrator')
    expect(activity.workspace_dir).toMatch(/ohmic/i)
    expect(activity.recent_commits.length).toBeGreaterThan(0)
    expect(activity.recent_commits[0]).toMatchObject({
      hash: expect.any(String),
      summary: expect.any(String),
      committed_at: expect.any(String),
    })
  })

  it('serves active claims from the live active-jobs directory', async () => {
    await writeFile(
      path.join(tempActiveClaimsDir!, '20260318T080000Z-test-claim.md'),
      `owner: d\nstatus: active\ntask: dogfood administrator queue truth\n`,
      'utf-8'
    )

    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const activeRes = await fetch(`${baseUrl}/api/projections/active_claims`)
    expect(activeRes.ok).toBe(true)
    const active = (await activeRes.json()) as {
      count: number
      claims: Array<{
        claim_id: string
        title: string
        owner: string
        status: string
      }>
    }

    expect(active.count).toBe(1)
    expect(active.claims[0]).toMatchObject({
      claim_id: '20260318T080000Z-test-claim',
      title: 'dogfood administrator queue truth',
      owner: 'd',
      status: 'active',
    })
  })

  it('serves filing options for an active intake item', async () => {
    await writeActiveQueueFixture('intake-1', 'Customer escalation')

    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const filingRes = await fetch(`${baseUrl}/api/filing/options?intakeId=intake-1`)
    expect(filingRes.ok).toBe(true)
    const filing = (await filingRes.json()) as {
      intake_id: string
      destinations: Array<{ filing_destination_id: string }>
    }

    expect(filing.intake_id).toBe('intake-1')
    expect(filing.destinations.length).toBeGreaterThan(0)
    expect(filing.destinations[0]).toHaveProperty('filing_destination_id')
  })

  it('records filing history for an active intake item', async () => {
    await writeActiveQueueFixture('intake-2', 'Archive for provider reference')

    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const filingRes = await fetch(`${baseUrl}/api/filing/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intake_id: 'intake-2',
        filing_destination_id: 'customer_archive',
        reason: 'Retained after operator review.',
      }),
    })

    expect(filingRes.ok).toBe(true)
    const filing = (await filingRes.json()) as {
      writeback: {
        writeback_status: string
        filing_destination_id: string
        filing_history_count: number
      }
    }

    expect(filing.writeback.writeback_status).toBe('accepted')
    expect(filing.writeback.filing_destination_id).toBe('customer_archive')
    expect(filing.writeback.filing_history_count).toBe(1)
  })

  it('publishes the selected intake focus into the runtime root', async () => {
    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const focusRes = await fetch(`${baseUrl}/api/focus/intake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intake_id: 'intake-focus-1',
      }),
    })

    expect(focusRes.ok).toBe(true)

    const focusRaw = await readFile(
      path.join(tempRuntimeDir!, 'administrator_focus_selection.json'),
      'utf-8'
    )
    const focus = JSON.parse(focusRaw) as {
      focus_kind: string
      selected_intake_id: string | null
      source: string
    }

    expect(focus.focus_kind).toBe('intake')
    expect(focus.selected_intake_id).toBe('intake-focus-1')
    expect(focus.source).toBe('administrator_app')
  })

  it('serves the Tandem status seam from environment configuration', async () => {
    process.env.ADMINISTRATOR_TANDEM_BASE_URL = 'http://127.0.0.1:8765'
    process.env.ADMINISTRATOR_TANDEM_SESSION_LABEL = 'gmail-triage'
    process.env.ADMINISTRATOR_TANDEM_SESSION_STATE = 'attached'
    process.env.ADMINISTRATOR_TANDEM_ACTIVE_TARGET_LABEL = 'Gmail support inbox'
    process.env.ADMINISTRATOR_TANDEM_TARGET_PRESETS =
      'gmail-support;Gmail Support;Gmail support inbox;email;Support;Ask provider to verify attachment context.|github-bugs;GitHub Bugs;GitHub issues queue;issue;Engineering;Confirm issue routing and required evidence.'

    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const tandemRes = await fetch(`${baseUrl}/api/tandem/status`)
    expect(tandemRes.ok).toBe(true)
    const tandem = (await tandemRes.json()) as {
      configured: boolean
      available: boolean
      session_state: string
      base_url: string | null
      session_label: string | null
      active_target_label: string | null
      target_presets: Array<{
        preset_id: string
        display_label: string
        target_label: string
      }>
      target_health: Array<{
        target_label: string
        status: string
        message?: string | null
      }>
      launch_url: string | null
      mode: string
    }

    expect(tandem).toMatchObject({
      configured: true,
      available: true,
      status_source: 'env',
      probe_state: 'unavailable',
      session_state: 'attached',
      base_url: 'http://127.0.0.1:8765',
      session_label: 'gmail-triage',
      active_target_label: 'Gmail support inbox',
      launch_url: 'http://127.0.0.1:8765/?sessionLabel=gmail-triage',
      mode: 'configured',
      target_health: [],
    })
    expect(tandem.target_presets).toMatchObject([
      {
        preset_id: 'gmail-support',
        display_label: 'Gmail Support',
        target_label: 'Gmail support inbox',
        target_kind: 'email',
        team_label: 'Support',
        default_note: 'Ask provider to verify attachment context.',
      },
      {
        preset_id: 'github-bugs',
        display_label: 'GitHub Bugs',
        target_label: 'GitHub issues queue',
        target_kind: 'issue',
        team_label: 'Engineering',
        default_note: 'Confirm issue routing and required evidence.',
      },
    ])
  })

  it('prefers a live Tandem probe when a status URL is configured', async () => {
    process.env.ADMINISTRATOR_TANDEM_BASE_URL = 'http://127.0.0.1:8765'
    process.env.ADMINISTRATOR_TANDEM_SESSION_LABEL = 'gmail-triage'
    process.env.ADMINISTRATOR_TANDEM_SESSION_STATE = 'idle'
    process.env.ADMINISTRATOR_TANDEM_ACTIVE_TARGET_LABEL = 'Old env target'

    tandemProbeServer = http.createServer((req, res) => {
      if (req.url === '/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            session_state: 'attached',
            active_target_label: 'Live Gmail support inbox',
            available: true,
            target_health: [
              {
                target_label: 'Live Gmail support inbox',
                status: 'attached',
                message: 'Inbox session attached.',
              },
            ],
            message: 'Live Tandem status reached the inbox target.',
          })
        )
        return
      }

      res.writeHead(404)
      res.end()
    })

    const probeBaseUrl = await new Promise<string>((resolve) => {
      tandemProbeServer!.listen(0, () => {
        const address = tandemProbeServer!.address() as { port: number }
        resolve(`http://127.0.0.1:${address.port}/status`)
      })
    })

    process.env.ADMINISTRATOR_TANDEM_STATUS_URL = probeBaseUrl

    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const tandemRes = await fetch(`${baseUrl}/api/tandem/status`)
    expect(tandemRes.ok).toBe(true)
    const tandem = (await tandemRes.json()) as {
      status_source: string
      probe_state: string
      session_state: string
      active_target_label: string | null
      available: boolean
      target_health: Array<{
        target_label: string
        status: string
        message?: string | null
      }>
      probe_message?: string | null
    }

    expect(tandem).toMatchObject({
      status_source: 'probe',
      probe_state: 'reachable',
      session_state: 'attached',
      active_target_label: 'Live Gmail support inbox',
      available: true,
      target_health: [
        {
          target_label: 'Live Gmail support inbox',
          status: 'attached',
          message: 'Inbox session attached.',
        },
      ],
      probe_message: 'Live Tandem status reached the inbox target.',
    })
  })

  it('records tandem launch intent into the audit summary', async () => {
    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    await writeFile(
      path.join(tempRuntimeDir!, 'administrator_tandem_handshake_state.json'),
      JSON.stringify(
        {
          generated_at: '2026-03-18T10:01:00Z',
          projection_name: 'administrator_tandem_handshake_state',
          handshake: {
            event_id: 'handshake-seeded',
            intake_id: 'intake-tandem-1',
            target_preset_id: 'gmail-support',
            target_label: 'Gmail support inbox',
            handshake_note: 'Prepare provider session before launch.',
            occurred_at: '2026-03-18T10:00:00Z',
            state: 'pending',
          },
        },
        null,
        2
      ),
      'utf-8'
    )

    const tandemRes = await fetch(`${baseUrl}/api/tandem/launch-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intake_id: 'intake-tandem-1',
        target_preset_id: 'gmail-support',
        target_label: 'Gmail support inbox',
        launch_url: 'http://127.0.0.1:8765/?sessionLabel=gmail-triage',
        attachment_id: 'asset-77',
        handoff_note: 'Need provider confirmation on the captured attachment.',
      }),
    })

    expect(tandemRes.ok).toBe(true)

    const auditSummaryRaw = await readFile(
      path.join(tempRuntimeDir!, 'administrator_audit_summary.json'),
      'utf-8'
    )
    const auditSummary = JSON.parse(auditSummaryRaw) as {
      filter_presets: Array<{
        preset_id: string
      }>
      rows: Array<{
        event_family: string
        intake_id: string
        target_label: string
        status_delta: string
        attachment_id?: string
        handoff_note?: string
      }>
    }

    expect(auditSummary.rows[0]).toMatchObject({
      event_family: 'provider_handoff',
      intake_id: 'intake-tandem-1',
      target_label: 'Gmail support inbox',
      status_delta: 'attachment_review',
      attachment_id: 'asset-77',
      handoff_note: 'Need provider confirmation on the captured attachment.',
    })
    expect(auditSummary.filter_presets.map((preset) => preset.preset_id)).toContain(
      'provider_handoffs'
    )

    const handshakeStateRaw = await readFile(
      path.join(tempRuntimeDir!, 'administrator_tandem_handshake_state.json'),
      'utf-8'
    )
    const handshakeState = JSON.parse(handshakeStateRaw) as {
      handshake: null | {
        event_id: string
      }
    }

    expect(handshakeState.handshake).toBeNull()
  })

  it('records tandem target handshake into the audit summary', async () => {
    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const handshakeRes = await fetch(`${baseUrl}/api/tandem/handshake-target`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intake_id: 'intake-handshake-1',
        target_preset_id: 'gmail-support',
        target_label: 'Gmail support inbox',
        handshake_note: 'Prepare provider session before the next launch.',
      }),
    })

    expect(handshakeRes.ok).toBe(true)

    const auditSummaryRaw = await readFile(
      path.join(tempRuntimeDir!, 'administrator_audit_summary.json'),
      'utf-8'
    )
    const auditSummary = JSON.parse(auditSummaryRaw) as {
      rows: Array<{
        event_family: string
        intake_id: string
        target_label: string
        status_delta: string
        handoff_note?: string
      }>
    }

    expect(auditSummary.rows[0]).toMatchObject({
      event_family: 'provider_handoff',
      intake_id: 'intake-handshake-1',
      target_label: 'Gmail support inbox',
      status_delta: 'handshake_pending',
      handoff_note: 'Prepare provider session before the next launch.',
    })

    const handshakeStateRaw = await readFile(
      path.join(tempRuntimeDir!, 'administrator_tandem_handshake_state.json'),
      'utf-8'
    )
    const handshakeState = JSON.parse(handshakeStateRaw) as {
      handshake: {
        event_id: string
        intake_id: string | null
        target_preset_id: string | null
        target_label: string | null
        handshake_note: string | null
        state: string
      } | null
    }

    expect(handshakeState.handshake).toMatchObject({
      intake_id: 'intake-handshake-1',
      target_preset_id: 'gmail-support',
      target_label: 'Gmail support inbox',
      handshake_note: 'Prepare provider session before the next launch.',
      state: 'pending',
    })

    const tandemStatusRes = await fetch(`${baseUrl}/api/tandem/status`)
    expect(tandemStatusRes.ok).toBe(true)
    const tandemStatus = (await tandemStatusRes.json()) as {
      pending_handshake: {
        event_id: string
        intake_id: string | null
        target_preset_id: string | null
        target_label: string | null
        handshake_note: string | null
        state: string
      } | null
    }

    expect(tandemStatus.pending_handshake).toMatchObject({
      intake_id: 'intake-handshake-1',
      target_preset_id: 'gmail-support',
      target_label: 'Gmail support inbox',
      handshake_note: 'Prepare provider session before the next launch.',
      state: 'pending',
    })
  })

  it('resolves tandem handshake state and can clear it', async () => {
    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const handshakeRes = await fetch(`${baseUrl}/api/tandem/handshake-target`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intake_id: 'intake-handshake-2',
        target_preset_id: 'gmail-support',
        target_label: 'Gmail support inbox',
        handshake_note: 'Prepare provider session before launch.',
      }),
    })

    expect(handshakeRes.ok).toBe(true)

    const attachedRes = await fetch(`${baseUrl}/api/tandem/handshake-resolution`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        state: 'attached',
        event_id: 'handoff-resolution-attached',
        intake_id: 'intake-handshake-2',
        target_preset_id: 'gmail-support',
        target_label: 'Gmail support inbox',
        resolution_note: 'Handshake attached to the live provider session.',
      }),
    })

    expect(attachedRes.ok).toBe(true)

    const attachedStatusRes = await fetch(`${baseUrl}/api/tandem/status`)
    expect(attachedStatusRes.ok).toBe(true)
    const attachedStatus = (await attachedStatusRes.json()) as {
      pending_handshake: {
        state: string
        handshake_note: string | null
      } | null
    }

    expect(attachedStatus.pending_handshake).toMatchObject({
      state: 'attached',
      handshake_note: 'Handshake attached to the live provider session.',
    })

    const clearRes = await fetch(`${baseUrl}/api/tandem/handshake-resolution`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        state: 'cleared',
        intake_id: 'intake-handshake-2',
        target_preset_id: 'gmail-support',
        target_label: 'Gmail support inbox',
        resolution_note: 'Operator cleared the handshake state.',
      }),
    })

    expect(clearRes.ok).toBe(true)

    const clearedStatusRes = await fetch(`${baseUrl}/api/tandem/status`)
    expect(clearedStatusRes.ok).toBe(true)
    const clearedStatus = (await clearedStatusRes.json()) as {
      pending_handshake: null | {
        state: string
      }
    }

    expect(clearedStatus.pending_handshake).toBeNull()
  })

  it('records provider follow-up completion into the audit summary', async () => {
    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const completeRes = await fetch(`${baseUrl}/api/tandem/follow-up-complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intake_id: 'intake-provider-1',
        target_preset_id: 'gmail-support',
        target_label: 'Gmail support inbox',
        completion_note: 'Provider confirmed the screenshot and closed the loop.',
      }),
    })

    expect(completeRes.ok).toBe(true)

    const auditSummaryRaw = await readFile(
      path.join(tempRuntimeDir!, 'administrator_audit_summary.json'),
      'utf-8'
    )
    const auditSummary = JSON.parse(auditSummaryRaw) as {
      rows: Array<{
        event_family: string
        intake_id: string
        target_label: string
        status_delta: string
        handoff_note?: string
      }>
    }

    expect(auditSummary.rows[0]).toMatchObject({
      event_family: 'provider_follow_up',
      intake_id: 'intake-provider-1',
      target_label: 'Gmail support inbox',
      status_delta: 'completed',
      handoff_note: 'Provider confirmed the screenshot and closed the loop.',
    })
  })

  it('reopens provider follow-up into the audit summary', async () => {
    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const reopenRes = await fetch(`${baseUrl}/api/tandem/follow-up-reopen`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intake_id: 'intake-provider-1',
        target_preset_id: 'gmail-support',
        target_label: 'Gmail support inbox',
        reopen_note: 'Need another pass after provider clarification.',
      }),
    })

    expect(reopenRes.ok).toBe(true)

    const auditSummaryRaw = await readFile(
      path.join(tempRuntimeDir!, 'administrator_audit_summary.json'),
      'utf-8'
    )
    const auditSummary = JSON.parse(auditSummaryRaw) as {
      rows: Array<{
        event_family: string
        intake_id: string
        target_label: string
        status_delta: string
        handoff_note?: string
      }>
    }

    expect(auditSummary.rows[0]).toMatchObject({
      event_family: 'provider_handoff',
      intake_id: 'intake-provider-1',
      target_label: 'Gmail support inbox',
      status_delta: 'reopened_follow_up',
      handoff_note: 'Need another pass after provider clarification.',
    })
  })

  it('validates and executes command routes against the live runtime root', async () => {
    await writeActiveQueueFixture('intake-3', 'Validate and execute target')

    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const validateRes = await fetch(`${baseUrl}/api/commands/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intake_id: 'intake-3',
        action: 'route_to_orchestrator',
        queue_target: 'orchestrator',
        note: 'Validation route smoke',
      }),
    })

    expect(validateRes.ok).toBe(true)
    const validation = (await validateRes.json()) as {
      result: { validation: { validation_status: string } }
    }
    expect(validation.result.validation.validation_status).toBe('accepted')

    const executeRes = await fetch(`${baseUrl}/api/commands/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intake_id: 'intake-3',
        action: 'route_to_orchestrator',
        queue_target: 'orchestrator',
        note: 'Execute route smoke',
        tags: ['route-smoke'],
      }),
    })

    expect(executeRes.ok).toBe(true)
    const execute = (await executeRes.json()) as {
      writeback: { writeback_status: string; queue_item_updated: boolean }
    }
    expect(execute.writeback.writeback_status).toBe('accepted')
    expect(execute.writeback.queue_item_updated).toBe(true)
  }, 30000)

  it('reopens an inactive intake item through the server route', async () => {
    await writeFile(
      path.join(tempRuntimeDir!, 'administrator_intake_queue.json'),
      JSON.stringify(
        {
          generated_at: '2026-03-17T16:08:00Z',
          projection_name: 'administrator_intake_queue',
          staleness: {
            status: 'fresh',
            reason: null,
          },
          refresh_triggers: ['routing_change'],
          metadata: {
            ordering: 'priority_then_received_at_desc',
            includes_warning_state: true,
          },
          count: 0,
          queue_items: [],
        },
        null,
        2
      ),
      'utf-8'
    )

    await writeFile(
      path.join(tempRuntimeDir!, 'administrator_inactive_intake_projection.json'),
      JSON.stringify(
        {
          generated_at: '2026-03-17T16:08:01Z',
          projection_name: 'administrator_inactive_intake_projection',
          refresh_triggers: ['archive_writeback'],
          metadata: {
            ordering: 'inactive_since_desc',
            default_visibility: 'opt_in_only',
          },
          count: 1,
          inactive_items: [
            {
              intake_id: 'inactive-3',
              title: 'Archived follow-up',
              inactive_status: 'archived',
              inactive_since: '2026-03-17T16:00:00Z',
              last_active_status: 'triaging',
              reopen_allowed: true,
              reopen_target_status: 'queued',
              summary_label: 'Archived after duplicate confirmation',
            },
          ],
        },
        null,
        2
      ),
      'utf-8'
    )

    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const reopenRes = await fetch(`${baseUrl}/api/inactive/reopen`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intake_id: 'inactive-3',
        restored_status: 'queued',
      }),
    })

    expect(reopenRes.ok).toBe(true)
    const reopen = (await reopenRes.json()) as {
      writeback: { writeback_status: string; queue_item_updated: boolean; inactive_item_removed: boolean }
    }
    expect(reopen.writeback.writeback_status).toBe('accepted')
    expect(reopen.writeback.queue_item_updated).toBe(true)
    expect(reopen.writeback.inactive_item_removed).toBe(true)
  }, 30000)

  it('returns 400 for invalid JSON and missing required provider fields', async () => {
    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const invalidJsonRes = await fetch(`${baseUrl}/api/commands/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad json',
    })
    expect(invalidJsonRes.status).toBe(400)

    const missingQueryRes = await fetch(`${baseUrl}/api/filing/options`)
    expect(missingQueryRes.status).toBe(400)

    const missingFollowUpIntakeRes = await fetch(`${baseUrl}/api/tandem/follow-up-complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        target_label: 'Gmail support inbox',
      }),
    })
    expect(missingFollowUpIntakeRes.status).toBe(400)

    const invalidReopenJsonRes = await fetch(`${baseUrl}/api/tandem/follow-up-reopen`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad json',
    })
    expect(invalidReopenJsonRes.status).toBe(400)

    const invalidHandshakeJsonRes = await fetch(`${baseUrl}/api/tandem/handshake-target`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad json',
    })
    expect(invalidHandshakeJsonRes.status).toBe(400)

    const invalidHandshakeResolutionJsonRes = await fetch(
      `${baseUrl}/api/tandem/handshake-resolution`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{bad json',
      }
    )
    expect(invalidHandshakeResolutionJsonRes.status).toBe(400)

    const invalidHandshakeResolutionStateRes = await fetch(
      `${baseUrl}/api/tandem/handshake-resolution`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: 'mystery',
        }),
      }
    )
    expect(invalidHandshakeResolutionStateRes.status).toBe(400)

    const missingReopenIntakeRes = await fetch(`${baseUrl}/api/tandem/follow-up-reopen`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        target_label: 'Gmail support inbox',
      }),
    })
    expect(missingReopenIntakeRes.status).toBe(400)
  })

  it('ignores malformed tandem probe target health rows', async () => {
    process.env.ADMINISTRATOR_TANDEM_BASE_URL = 'http://127.0.0.1:8765'

    tandemProbeServer = http.createServer((req, res) => {
      if (req.url === '/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            session_state: 'attached',
            active_target_label: 'Live Gmail support inbox',
            available: true,
            target_health: [
              {
                target_label: 'Live Gmail support inbox',
                status: 'attached',
                message: 'Inbox session attached.',
              },
              {
                target_label: '',
                status: 'ready',
              },
              {
                targetLabel: 'Broken target',
                status: 'mystery',
              },
              'bad-row',
            ],
          })
        )
        return
      }

      res.writeHead(404)
      res.end()
    })

    const probeBaseUrl = await new Promise<string>((resolve) => {
      tandemProbeServer!.listen(0, () => {
        const address = tandemProbeServer!.address() as { port: number }
        resolve(`http://127.0.0.1:${address.port}/status`)
      })
    })

    process.env.ADMINISTRATOR_TANDEM_STATUS_URL = probeBaseUrl

    const { createAdministratorServer } = await importServer()
    const app = createAdministratorServer(0)
    const baseUrl = await app.start()
    stopServer = app.stop

    const tandemRes = await fetch(`${baseUrl}/api/tandem/status`)
    expect(tandemRes.ok).toBe(true)
    const tandem = (await tandemRes.json()) as {
      target_health: Array<{
        target_label: string
        status: string
      }>
    }

    expect(tandem.target_health).toEqual([
      {
        target_label: 'Live Gmail support inbox',
        status: 'attached',
        message: 'Inbox session attached.',
      },
      {
        target_label: 'Broken target',
        status: 'unknown',
        message: null,
      },
    ])
  })
})
