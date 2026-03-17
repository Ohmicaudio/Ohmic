import { watch, readFile } from 'fs'
import { join, basename } from 'path'
import { EventEmitter } from 'events'
import { getAdministratorRuntimeDir } from './runtimeConfig.js'

const RUNTIME_DIR = getAdministratorRuntimeDir()

const PROJECTION_FILES = [
  'dashboard_status_cards.json',
  'administrator_intake_queue.json',
  'administrator_inactive_intake_projection.json',
  'administrator_recent_actions.json',
  'administrator_note_projection.json',
  'administrator_tag_assignment_projection.json',
  'administrator_warning_review.json',
  'administrator_aggregation_panel.json',
  'administrator_attachment_preview.json',
  'administrator_filing_history_projection.json',
  'administrator_audit_summary.json',
  'administrator_status_history.json',
  'ready_tasks.json',
]

export interface ProjectionCache {
  [name: string]: unknown
}

export class ProjectionReader extends EventEmitter {
  private cache: ProjectionCache = {}
  private watchers: ReturnType<typeof watch>[] = []

  async loadAll(): Promise<void> {
    const loads = PROJECTION_FILES.map((file) => this.loadFile(file))
    await Promise.allSettled(loads)
  }

  private async loadFile(filename: string): Promise<void> {
    const filePath = join(RUNTIME_DIR, filename)
    const name = basename(filename, '.json')

    try {
      const raw = await new Promise<string>((resolve, reject) => {
        readFile(filePath, 'utf-8', (err, data) => {
          if (err) reject(err)
          else resolve(data)
        })
      })
      this.cache[name] = JSON.parse(raw)
      this.emit('updated', name)
    } catch {
      // File may not exist yet; that is fine.
    }
  }

  get(name: string): unknown {
    return this.cache[name] ?? null
  }

  getLoadedProjectionNames(): string[] {
    return Object.keys(this.cache).sort()
  }

  getExpectedProjectionNames(): string[] {
    return PROJECTION_FILES.map((file) => basename(file, '.json')).sort()
  }

  startWatching(): void {
    try {
      const watcher = watch(RUNTIME_DIR, (_eventType, filename) => {
        if (!filename || !filename.endsWith('.json')) return
        if (!PROJECTION_FILES.includes(filename)) return

        // Debounce slightly so file writes finish before reload.
        setTimeout(() => {
          this.loadFile(filename)
        }, 100)
      })
      this.watchers.push(watcher)
    } catch {
      console.warn('[projectionReader] Could not watch runtime dir; polling disabled')
    }
  }

  stopWatching(): void {
    for (const w of this.watchers) {
      w.close()
    }
    this.watchers = []
  }
}
