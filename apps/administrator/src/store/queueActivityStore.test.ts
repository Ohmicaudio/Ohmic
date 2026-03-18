import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useQueueActivityStore } from '@/store/queueActivityStore'
import { fetchActiveClaims, fetchReadyTasks } from '@/api/projections'

vi.mock('@/api/projections', () => ({
  fetchReadyTasks: vi.fn(),
  fetchActiveClaims: vi.fn(),
}))

describe('queueActivityStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useQueueActivityStore.setState({
      generatedAt: null,
      readyTasks: [],
      readyCount: 0,
      activeClaims: [],
      activeClaimCount: 0,
      loading: false,
      error: null,
    })
  })

  it('stores live ready tasks and active claims together', async () => {
    vi.mocked(fetchReadyTasks).mockResolvedValue({
      generated_at: '2026-03-18T12:00:00Z',
      count: 2,
      tasks: [
        {
          task_id: 'task-1',
          title: 'Fix provider desk truth',
          priority: 'high',
          project: 'administrator',
          status: 'ready',
          file_path: 'B:\\ohmic\\agent-system\\requests\\ready\\task-1.md',
        },
      ],
    })
    vi.mocked(fetchActiveClaims).mockResolvedValue({
      generated_at: '2026-03-18T12:01:00Z',
      count: 1,
      claims: [
        {
          claim_id: 'claim-1',
          title: 'dogfood administrator queue truth',
          owner: 'd',
          status: 'active',
          file_path: 'B:\\ohmic\\agent-system\\jobs\\active\\claim-1.md',
        },
      ],
    })

    await useQueueActivityStore.getState().fetch()

    expect(useQueueActivityStore.getState()).toMatchObject({
      generatedAt: '2026-03-18T12:01:00Z',
      readyCount: 2,
      activeClaimCount: 1,
      loading: false,
      error: null,
    })
  })
})
