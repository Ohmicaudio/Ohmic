import { create } from 'zustand'
import { fetchWorkspaceActivityProjection } from '@/api/projections'
import type {
  WorkspaceCommitActivity,
  WorkspaceFileActivity,
} from '@/types/intake'

interface WorkspaceActivityState {
  generatedAt: string | null
  workspaceDir: string | null
  branch: string | null
  scopeLabel: string
  headCommit: WorkspaceCommitActivity | null
  recentCommits: WorkspaceCommitActivity[]
  dirtyFiles: WorkspaceFileActivity[]
  dirtyFileCount: number
  status: 'available' | 'unavailable'
  loading: boolean
  error: string | null
  message: string | null
  fetch: () => Promise<void>
}

export const useWorkspaceActivityStore = create<WorkspaceActivityState>((set) => ({
  generatedAt: null,
  workspaceDir: null,
  branch: null,
  scopeLabel: 'apps/administrator',
  headCommit: null,
  recentCommits: [],
  dirtyFiles: [],
  dirtyFileCount: 0,
  status: 'unavailable',
  loading: false,
  error: null,
  message: null,

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data = await fetchWorkspaceActivityProjection()
      set({
        generatedAt: data.generated_at,
        workspaceDir: data.workspace_dir,
        branch: data.branch,
        scopeLabel: data.scope_label,
        headCommit: data.head_commit,
        recentCommits: data.recent_commits,
        dirtyFiles: data.dirty_files,
        dirtyFileCount: data.dirty_file_count,
        status: data.status,
        loading: false,
        error: null,
        message: data.message,
      })
    } catch (err) {
      set({
        generatedAt: null,
        workspaceDir: null,
        branch: null,
        headCommit: null,
        recentCommits: [],
        dirtyFiles: [],
        dirtyFileCount: 0,
        status: 'unavailable',
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load workspace activity',
        message: null,
      })
    }
  },
}))
