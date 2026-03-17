import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdir, mkdtemp, rm, writeFile } from 'fs/promises'
import path from 'path'

const localRuntimeBase = 'B:\\ohmic-local\\runtime\\administrator-tests'

async function importReader() {
  vi.resetModules()
  return import('./projectionReader')
}

describe('ProjectionReader', () => {
  let previousRuntimeDir: string | undefined
  let tempRuntimeDir: string | null = null

  beforeEach(async () => {
    previousRuntimeDir = process.env.ADMINISTRATOR_RUNTIME_DIR
    await mkdir(localRuntimeBase, { recursive: true })
    tempRuntimeDir = await mkdtemp(path.join(localRuntimeBase, 'projection-reader-'))
    process.env.ADMINISTRATOR_RUNTIME_DIR = tempRuntimeDir
  })

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

  it('loads note, tag, audit, and status projections into the watched projection floor', async () => {
    await writeFile(
      path.join(tempRuntimeDir!, 'administrator_note_projection.json'),
      JSON.stringify({
        projection_name: 'administrator_note_projection',
        generated_at: '2026-03-17T15:20:00Z',
        refresh_triggers: ['note_append'],
        visibility_context: 'desk',
        ordering: 'created_at_desc',
        notes: [],
      }),
      'utf-8'
    )

    await writeFile(
      path.join(tempRuntimeDir!, 'administrator_tag_assignment_projection.json'),
      JSON.stringify({
        projection_name: 'administrator_tag_assignment_projection',
        generated_at: '2026-03-17T15:20:01Z',
        refresh_triggers: ['tag_writeback'],
        ordering: 'class_then_applied_at',
        duplicate_suppression: 'effective_label_per_intake',
        tag_assignments: [],
      }),
      'utf-8'
    )

    await writeFile(
      path.join(tempRuntimeDir!, 'administrator_audit_summary.json'),
      JSON.stringify({
        module_id: 'administrator_audit_summary',
        generated_at: '2026-03-17T15:20:02Z',
        row_count: 0,
        filter_presets: [],
        empty_state: {
          title: 'No audit rows',
          body: 'Audit rows appear here',
        },
        rows: [],
      }),
      'utf-8'
    )

    await writeFile(
      path.join(tempRuntimeDir!, 'administrator_status_history.json'),
      JSON.stringify({
        module_id: 'administrator_status_history',
        generated_at: '2026-03-17T15:20:03Z',
        row_count: 0,
        empty_state: {
          title: 'No status history',
          body: 'Status rows appear here',
        },
        rows: [],
      }),
      'utf-8'
    )

    const { ProjectionReader } = await importReader()
    const reader = new ProjectionReader()

    await reader.loadAll()

    expect(reader.getExpectedProjectionNames()).toContain('administrator_note_projection')
    expect(reader.getExpectedProjectionNames()).toContain(
      'administrator_tag_assignment_projection'
    )
    expect(reader.getExpectedProjectionNames()).toContain('administrator_audit_summary')
    expect(reader.getExpectedProjectionNames()).toContain('administrator_status_history')
    expect(reader.getLoadedProjectionNames()).toContain('administrator_note_projection')
    expect(reader.getLoadedProjectionNames()).toContain(
      'administrator_tag_assignment_projection'
    )
    expect(reader.getLoadedProjectionNames()).toContain('administrator_audit_summary')
    expect(reader.getLoadedProjectionNames()).toContain('administrator_status_history')
  })
})
