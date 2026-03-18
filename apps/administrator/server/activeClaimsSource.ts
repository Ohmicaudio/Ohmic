import { readdir, readFile, stat } from 'fs/promises'
import path from 'path'

const DEFAULT_ACTIVE_JOBS_DIR = 'B:\\ohmic\\agent-system\\jobs\\active'
const GITKEEP = '.gitkeep'

export interface ActiveClaimsProjection {
  generated_at: string
  count: number
  claims: Array<{
    claim_id: string
    title: string
    owner: string
    status: string
    paths: string[]
    file_path: string
  }>
}

function buildTitleFromFileName(fileName: string): string {
  return fileName.replace(/\.md$/i, '')
}

export async function readActiveClaimsFromDisk(
  activeJobsDir =
    process.env.ADMINISTRATOR_ACTIVE_JOBS_DIR?.trim() || DEFAULT_ACTIVE_JOBS_DIR
): Promise<ActiveClaimsProjection> {
  const entries = await readdir(activeJobsDir, { withFileTypes: true })
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.md') && entry.name !== GITKEEP)
    .map((entry) => entry.name)
    .sort()

  const claims = await Promise.all(
    files.map(async (fileName) => {
      const filePath = path.join(activeJobsDir, fileName)
      let body = ''
      try {
        body = await readFile(filePath, 'utf-8')
      } catch {
        body = ''
      }

      const titleMatch = body.match(/^task:\s*(.+)$/im)
      const ownerMatch = body.match(/^owner:\s*(.+)$/im)
      const statusMatch = body.match(/^status:\s*(.+)$/im)
      const paths = Array.from(body.matchAll(/^- (.+)$/gim)).map((match) => match[1].trim())

      return {
        claim_id: fileName.replace(/\.md$/i, ''),
        title: titleMatch?.[1]?.trim() || buildTitleFromFileName(fileName),
        owner: ownerMatch?.[1]?.trim() || '--',
        status: statusMatch?.[1]?.trim() || 'active',
        paths,
        file_path: filePath,
      }
    })
  )

  let generatedAt = new Date(0).toISOString()
  try {
    const claimStats = await Promise.all(
      files.map(async (fileName) => stat(path.join(activeJobsDir, fileName)))
    )
    const latest = claimStats.reduce((max, current) => {
      const time = current.mtime.getTime()
      return time > max ? time : max
    }, 0)
    generatedAt = new Date(latest || Date.now()).toISOString()
  } catch {
    generatedAt = new Date().toISOString()
  }

  return {
    generated_at: generatedAt,
    count: claims.length,
    claims,
  }
}
