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
  })
})
