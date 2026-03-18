import { promisify } from 'util'
import { execFile as execFileCallback } from 'child_process'
import { getAdministratorWorkspaceDir } from './runtimeConfig.js'

const execFile = promisify(execFileCallback)

export interface WorkspaceCommitActivity {
  hash: string
  summary: string
  committed_at: string
}

export interface WorkspaceFileActivity {
  path: string
  status: string
}

export interface WorkspaceActivityProjection {
  generated_at: string
  workspace_dir: string
  branch: string | null
  scope_label: string
  head_commit: WorkspaceCommitActivity | null
  recent_commits: WorkspaceCommitActivity[]
  dirty_files: WorkspaceFileActivity[]
  dirty_file_count: number
  status: 'available' | 'unavailable'
  message: string | null
}

async function runGit(args: string[], cwd: string): Promise<string> {
  const { stdout } = await execFile('git', args, {
    cwd,
    windowsHide: true,
    maxBuffer: 1024 * 1024,
  })
  return stdout.trim()
}

function parseCommitLog(output: string): WorkspaceCommitActivity[] {
  if (!output.trim()) {
    return []
  }

  return output
    .split(/\r?\n/)
    .map((line) => {
      const [hash, summary, committedAt] = line.split('\u001f')
      if (!hash || !summary || !committedAt) {
        return null
      }
      return {
        hash,
        summary,
        committed_at: committedAt,
      }
    })
    .filter((entry): entry is WorkspaceCommitActivity => Boolean(entry))
}

function parseStatus(output: string): WorkspaceFileActivity[] {
  if (!output.trim()) {
    return []
  }

  return output
    .split(/\r?\n/)
    .map((line) => {
      const trimmed = line.trimEnd()
      if (trimmed.length < 4) {
        return null
      }

      const status = trimmed.slice(0, 2).trim() || '??'
      const filePath = trimmed.slice(3).trim()
      if (!filePath) {
        return null
      }

      return {
        path: filePath,
        status,
      }
    })
    .filter((entry): entry is WorkspaceFileActivity => Boolean(entry))
}

export async function readWorkspaceActivity(
  workspaceDir = getAdministratorWorkspaceDir()
): Promise<WorkspaceActivityProjection> {
  try {
    const [branch, headLog, recentLog, statusOutput] = await Promise.all([
      runGit(['rev-parse', '--abbrev-ref', 'HEAD'], workspaceDir),
      runGit(['log', '-1', '--pretty=format:%H%x1f%s%x1f%cI', '--', 'apps/administrator'], workspaceDir),
      runGit(['log', '-5', '--pretty=format:%H%x1f%s%x1f%cI', '--', 'apps/administrator'], workspaceDir),
      runGit(['status', '--short', '--', 'apps/administrator'], workspaceDir),
    ])

    const recentCommits = parseCommitLog(recentLog)
    const headCommit = parseCommitLog(headLog)[0] ?? recentCommits[0] ?? null
    const dirtyFiles = parseStatus(statusOutput)

    return {
      generated_at: new Date().toISOString(),
      workspace_dir: workspaceDir,
      branch: branch || null,
      scope_label: 'apps/administrator',
      head_commit: headCommit,
      recent_commits: recentCommits,
      dirty_files: dirtyFiles,
      dirty_file_count: dirtyFiles.length,
      status: 'available',
      message: null,
    }
  } catch (error) {
    return {
      generated_at: new Date().toISOString(),
      workspace_dir: workspaceDir,
      branch: null,
      scope_label: 'apps/administrator',
      head_commit: null,
      recent_commits: [],
      dirty_files: [],
      dirty_file_count: 0,
      status: 'unavailable',
      message:
        error instanceof Error
          ? error.message
          : 'Workspace activity is unavailable right now.',
    }
  }
}
