import { readdir, readFile, stat } from 'fs/promises'
import path from 'path'

const DEFAULT_QUEUE_DIR = 'B:\\ohmic\\agent-system\\requests\\ready'
const GITKEEP = '.gitkeep'

export interface ReadyTasksProjection {
  generated_at: string
  count: number
  tasks: Array<{
    task_id: string
    title: string
    priority: string
    project: string
    status: string
    file_path: string
  }>
}

function buildTitleFromFileName(fileName: string): string {
  return fileName
    .replace(/\.md$/i, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .replace(/-/g, ' ')
}

export async function readReadyTasksFromDisk(
  queueDir = process.env.ADMINISTRATOR_READY_QUEUE_DIR?.trim() || DEFAULT_QUEUE_DIR
): Promise<ReadyTasksProjection> {
  const entries = await readdir(queueDir, { withFileTypes: true })
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.md') && entry.name !== GITKEEP)
    .map((entry) => entry.name)
    .sort()

  const tasks = await Promise.all(
    files.map(async (fileName) => {
      const filePath = path.join(queueDir, fileName)
      let body = ''
      try {
        body = await readFile(filePath, 'utf-8')
      } catch {
        body = ''
      }

      const titleMatch = body.match(/^#\s+(.+)$/m)
      const priorityMatch = body.match(/^priority:\s*(.+)$/im)
      const projectMatch = body.match(/^project:\s*(.+)$/im)
      const statusMatch = body.match(/^status:\s*(.+)$/im)

      return {
        task_id: fileName.replace(/\.md$/i, ''),
        title: titleMatch?.[1]?.trim() || buildTitleFromFileName(fileName),
        priority: priorityMatch?.[1]?.trim() || 'normal',
        project: projectMatch?.[1]?.trim() || 'ohmic',
        status: statusMatch?.[1]?.trim() || 'ready',
        file_path: filePath,
      }
    })
  )

  let generatedAt = new Date(0).toISOString()
  try {
    const queueStats = await Promise.all(
      files.map(async (fileName) => stat(path.join(queueDir, fileName)))
    )
    const latest = queueStats.reduce((max, current) => {
      const time = current.mtime.getTime()
      return time > max ? time : max
    }, 0)
    generatedAt = new Date(latest || Date.now()).toISOString()
  } catch {
    generatedAt = new Date().toISOString()
  }

  return {
    generated_at: generatedAt,
    count: tasks.length,
    tasks,
  }
}
