import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdir, mkdtemp, rm, writeFile } from 'fs/promises'
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

    const projectionRes = await fetch(`${baseUrl}/api/projections/dashboard_status_cards`)
    expect(projectionRes.ok).toBe(true)
    const projection = (await projectionRes.json()) as {
      cards: Array<{ card_id: string }>
    }

    expect(projection.cards[0].card_id).toBe('summary')
  })

  it('serves filing options for an active intake item', async () => {
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
              intake_id: 'intake-1',
              title: 'Customer escalation',
              intake_kind: 'email',
              received_at: '2026-03-17T16:04:00Z',
              status: 'triaging',
              routing_target: '',
              trust_tier: '2',
              priority_hint: 'high',
              tags: [],
              warning_state: 'clean',
              warning_count: 0,
              summary_label: 'Customer escalation',
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
})
