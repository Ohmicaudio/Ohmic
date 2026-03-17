import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'fs/promises'
import path from 'path'

const localRuntimeBase = 'B:\\ohmic-local\\runtime\\administrator-tests'

async function importServer() {
  vi.resetModules()
  return import('./index')
}

describe('administrator server', () => {
  let previousRuntimeDir: string | undefined
  let tempRuntimeDir: string | null = null
  let stopServer: (() => Promise<void>) | null = null

  beforeEach(async () => {
    previousRuntimeDir = process.env.ADMINISTRATOR_RUNTIME_DIR
    await mkdir(localRuntimeBase, { recursive: true })
    tempRuntimeDir = await mkdtemp(path.join(localRuntimeBase, 'server-'))
    process.env.ADMINISTRATOR_RUNTIME_DIR = tempRuntimeDir

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
  })

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
  })

  it('returns 400 for invalid JSON and missing filing intake id', async () => {
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
  })
})
