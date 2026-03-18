import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useWorkspaceActivityStore } from '@/store/workspaceActivityStore'
import { fetchWorkspaceActivityProjection } from '@/api/projections'

vi.mock('@/api/projections', () => ({
  fetchWorkspaceActivityProjection: vi.fn(),
}))

describe('workspaceActivityStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useWorkspaceActivityStore.setState({
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
    })
  })

  it('stores live workspace activity', async () => {
    vi.mocked(fetchWorkspaceActivityProjection).mockResolvedValue({
      generated_at: '2026-03-18T12:00:00Z',
      workspace_dir: 'B:\\ohmic',
      branch: 'codex/administrator-app-scaffold',
      scope_label: 'apps/administrator',
      head_commit: {
        hash: 'abc123',
        summary: 'Dogfood administrator live truth surfaces',
        committed_at: '2026-03-18T11:59:00Z',
      },
      recent_commits: [
        {
          hash: 'abc123',
          summary: 'Dogfood administrator live truth surfaces',
          committed_at: '2026-03-18T11:59:00Z',
        },
      ],
      dirty_files: [
        {
          path: 'apps/administrator/src/App.tsx',
          status: 'M',
        },
      ],
      dirty_file_count: 1,
      status: 'available',
      message: null,
    })

    await useWorkspaceActivityStore.getState().fetch()

    expect(useWorkspaceActivityStore.getState()).toMatchObject({
      generatedAt: '2026-03-18T12:00:00Z',
      workspaceDir: 'B:\\ohmic',
      branch: 'codex/administrator-app-scaffold',
      scopeLabel: 'apps/administrator',
      dirtyFileCount: 1,
      status: 'available',
      error: null,
    })
  })
})
