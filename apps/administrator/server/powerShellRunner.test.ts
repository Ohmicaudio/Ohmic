import { afterEach, describe, expect, it, vi } from 'vitest'
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'fs/promises'
import { constants as fsConstants } from 'fs'
import path from 'path'

const localRuntimeBase = 'B:\\ohmic-local\\runtime\\administrator-tests'

async function importRunner() {
  vi.resetModules()
  return import('./powerShellRunner')
}

describe('powerShellRunner', () => {
  let previousRuntimeDir: string | undefined
  let tempRuntimeDir: string | null = null

  afterEach(async () => {
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

  it('writes command results and projections into the configured local-only runtime root', async () => {
    previousRuntimeDir = process.env.ADMINISTRATOR_RUNTIME_DIR

    await mkdir(localRuntimeBase, { recursive: true })
    tempRuntimeDir = await mkdtemp(path.join(localRuntimeBase, 'smoke-'))
    process.env.ADMINISTRATOR_RUNTIME_DIR = tempRuntimeDir

    await writeFile(
      path.join(tempRuntimeDir, 'administrator_intake_queue.json'),
      JSON.stringify(
        {
          generated_at: '2026-03-17T18:00:00Z',
          projection_name: 'administrator_intake_queue',
          staleness: {
            status: 'fresh',
            reason: null,
          },
          refresh_triggers: ['intake_change', 'routing_change', 'warning_change'],
          metadata: {
            ordering: 'priority_then_received_at_desc',
            includes_warning_state: true,
          },
          count: 1,
          queue_items: [
            {
              intake_id: 'admin-test-intake',
              title: 'Runtime smoke target',
              intake_kind: 'manual',
              received_at: '2026-03-17T18:00:00Z',
              status: 'new',
              routing_target: '',
              trust_tier: 'internal',
              priority_hint: 'high',
              tags: ['seed'],
              warning_state: 'clean',
              warning_count: 0,
              summary_label: 'Runtime smoke target',
            },
          ],
        },
        null,
        2
      ),
      'utf-8'
    )

    const { executeCommand } = await importRunner()

    const result = await executeCommand({
      intake_id: 'admin-test-intake',
      action: 'route_to_orchestrator',
      queue_target: 'orchestrator',
      note: 'Server smoke writeback into local runtime',
      tags: ['server-smoke'],
    })

    expect(result).toMatchObject({
      writeback: {
        writeback_status: 'accepted',
        resulting_status: 'routed',
        note_written: true,
        tags_written: 1,
        queue_item_updated: true,
      },
    })

    const expectedFiles = [
      'administrator_command_results.jsonl',
      'administrator_audit_events.jsonl',
      'administrator_audit_summary.json',
      'administrator_notes.jsonl',
      'administrator_tag_assignments.jsonl',
      'administrator_recent_actions.json',
      'administrator_note_projection.json',
      'administrator_tag_assignment_projection.json',
      'administrator_intake_queue.json',
    ]

    for (const fileName of expectedFiles) {
      await access(path.join(tempRuntimeDir, fileName), fsConstants.F_OK)
    }

    const recentActionsRaw = await readFile(
      path.join(tempRuntimeDir, 'administrator_recent_actions.json'),
      'utf-8'
    )
    const recentActions = JSON.parse(recentActionsRaw) as {
      recent_actions: Array<{ intake_id: string; resulting_status: string }>
    }

    expect(recentActions.recent_actions[0]).toMatchObject({
      intake_id: 'admin-test-intake',
      resulting_status: 'routed',
    })

    const intakeQueueRaw = await readFile(
      path.join(tempRuntimeDir, 'administrator_intake_queue.json'),
      'utf-8'
    )
    const intakeQueue = JSON.parse(intakeQueueRaw) as {
      queue_items: Array<{ intake_id: string; status: string; routing_target: string; tags: string[] }>
    }

    expect(intakeQueue.queue_items[0]).toMatchObject({
      intake_id: 'admin-test-intake',
      status: 'routed',
      routing_target: 'orchestrator',
    })
    expect(intakeQueue.queue_items[0].tags).toEqual(['seed', 'server-smoke'])

    const auditSummaryRaw = await readFile(
      path.join(tempRuntimeDir, 'administrator_audit_summary.json'),
      'utf-8'
    )
    const auditSummary = JSON.parse(auditSummaryRaw) as {
      rows: Array<{ event_family: string; intake_id: string; target_label: string }>
    }

    expect(auditSummary.rows.map((row) => row.event_family).sort()).toEqual([
      'note',
      'status_transition',
      'tag',
    ])
    expect(
      auditSummary.rows.find((row) => row.event_family === 'status_transition')
    ).toMatchObject({
      intake_id: 'admin-test-intake',
      target_label: 'orchestrator',
    })
  })

  it('reopens an inactive intake item back into the active queue and audit trail', async () => {
    previousRuntimeDir = process.env.ADMINISTRATOR_RUNTIME_DIR

    await mkdir(localRuntimeBase, { recursive: true })
    tempRuntimeDir = await mkdtemp(path.join(localRuntimeBase, 'reopen-'))
    process.env.ADMINISTRATOR_RUNTIME_DIR = tempRuntimeDir

    await writeFile(
      path.join(tempRuntimeDir, 'administrator_intake_queue.json'),
      JSON.stringify(
        {
          generated_at: '2026-03-17T19:00:00Z',
          projection_name: 'administrator_intake_queue',
          staleness: {
            status: 'fresh',
            reason: null,
          },
          refresh_triggers: ['intake_change', 'routing_change', 'warning_change'],
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
      path.join(tempRuntimeDir, 'administrator_inactive_intake_projection.json'),
      JSON.stringify(
        {
          generated_at: '2026-03-17T19:00:01Z',
          projection_name: 'administrator_inactive_intake_projection',
          refresh_triggers: ['archive_writeback'],
          metadata: {
            ordering: 'inactive_since_desc',
            default_visibility: 'opt_in_only',
          },
          count: 1,
          inactive_items: [
            {
              intake_id: 'inactive-reopen-1',
              title: 'Archived status packet',
              inactive_status: 'archived',
              inactive_since: '2026-03-17T18:30:00Z',
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

    const { reopenInactiveIntake } = await importRunner()

    const result = await reopenInactiveIntake({
      intake_id: 'inactive-reopen-1',
      restored_status: 'queued',
    })

    expect(result).toMatchObject({
      writeback: {
        writeback_status: 'accepted',
        intake_id: 'inactive-reopen-1',
        restored_status: 'queued',
        queue_item_updated: true,
        inactive_item_removed: true,
      },
    })

    const recentActionsRaw = await readFile(
      path.join(tempRuntimeDir, 'administrator_recent_actions.json'),
      'utf-8'
    )
    const recentActions = JSON.parse(recentActionsRaw) as {
      recent_actions: Array<{ intake_id: string; action: string; resulting_status: string }>
    }

    expect(recentActions.recent_actions[0]).toMatchObject({
      intake_id: 'inactive-reopen-1',
      action: 'reopen',
      resulting_status: 'queued',
    })

    const intakeQueueRaw = await readFile(
      path.join(tempRuntimeDir, 'administrator_intake_queue.json'),
      'utf-8'
    )
    const intakeQueue = JSON.parse(intakeQueueRaw) as {
      queue_items: Array<{ intake_id: string; status: string }>
    }

    expect(intakeQueue.queue_items[0]).toMatchObject({
      intake_id: 'inactive-reopen-1',
      status: 'queued',
    })

    const inactiveRaw = await readFile(
      path.join(tempRuntimeDir, 'administrator_inactive_intake_projection.json'),
      'utf-8'
    )
    const inactiveProjection = JSON.parse(inactiveRaw) as {
      count: number
      inactive_items: Array<{ intake_id: string }>
    }

    expect(inactiveProjection.count).toBe(0)
    expect(inactiveProjection.inactive_items).toEqual([])

    const auditSummaryRaw = await readFile(
      path.join(tempRuntimeDir, 'administrator_audit_summary.json'),
      'utf-8'
    )
    const auditSummary = JSON.parse(auditSummaryRaw) as {
      rows: Array<{ event_family: string; intake_id: string; status_delta: string }>
    }

    expect(auditSummary.rows[0]).toMatchObject({
      event_family: 'reopen',
      intake_id: 'inactive-reopen-1',
      status_delta: 'archived -> queued',
    })
  })

  it('records a filing record and regenerates filing history in the local runtime root', async () => {
    previousRuntimeDir = process.env.ADMINISTRATOR_RUNTIME_DIR

    await mkdir(localRuntimeBase, { recursive: true })
    tempRuntimeDir = await mkdtemp(path.join(localRuntimeBase, 'filing-'))
    process.env.ADMINISTRATOR_RUNTIME_DIR = tempRuntimeDir

    await writeFile(
      path.join(tempRuntimeDir, 'administrator_intake_queue.json'),
      JSON.stringify(
        {
          generated_at: '2026-03-17T20:00:00Z',
          projection_name: 'administrator_intake_queue',
          staleness: {
            status: 'fresh',
            reason: null,
          },
          refresh_triggers: ['intake_change', 'routing_change', 'warning_change'],
          metadata: {
            ordering: 'priority_then_received_at_desc',
            includes_warning_state: true,
          },
          count: 1,
          queue_items: [
            {
              intake_id: 'filing-intake-1',
              title: 'Provider follow-up packet',
              intake_kind: 'manual',
              received_at: '2026-03-17T19:55:00Z',
              status: 'triaging',
              routing_target: '',
              trust_tier: 'internal',
              priority_hint: 'normal',
              tags: [],
              warning_state: 'clean',
              warning_count: 0,
              summary_label: 'Provider follow-up packet',
            },
          ],
        },
        null,
        2
      ),
      'utf-8'
    )

    const { recordFiling } = await importRunner()

    const result = await recordFiling({
      intake_id: 'filing-intake-1',
      filing_destination_id: 'customer_archive',
      reason: 'Retained as reference after intake review.',
    })

    expect(result).toMatchObject({
      writeback: {
        writeback_status: 'accepted',
        intake_id: 'filing-intake-1',
        filing_destination_id: 'customer_archive',
        filing_history_count: 1,
      },
    })

    await access(
      path.join(tempRuntimeDir, 'administrator_filing_history.jsonl'),
      fsConstants.F_OK
    )
    await access(
      path.join(tempRuntimeDir, 'administrator_filing_history_projection.json'),
      fsConstants.F_OK
    )
    await access(
      path.join(tempRuntimeDir, 'administrator_audit_summary.json'),
      fsConstants.F_OK
    )

    const filingProjectionRaw = await readFile(
      path.join(tempRuntimeDir, 'administrator_filing_history_projection.json'),
      'utf-8'
    )
    const filingProjection = JSON.parse(filingProjectionRaw) as {
      filing_history: Array<{ intake_id: string; filing_destination_id: string; archive_marker: boolean }>
    }

    expect(filingProjection.filing_history[0]).toMatchObject({
      intake_id: 'filing-intake-1',
      filing_destination_id: 'customer_archive',
      archive_marker: true,
    })

    const auditSummaryRaw = await readFile(
      path.join(tempRuntimeDir, 'administrator_audit_summary.json'),
      'utf-8'
    )
    const auditSummary = JSON.parse(auditSummaryRaw) as {
      rows: Array<{ event_family: string; intake_id: string; target_label: string }>
    }

    expect(auditSummary.rows[0]).toMatchObject({
      event_family: 'filing_migration',
      intake_id: 'filing-intake-1',
      target_label: 'Customer Archive',
    })
  })
})
