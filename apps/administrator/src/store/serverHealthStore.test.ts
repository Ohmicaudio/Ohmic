import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useServerHealthStore } from '@/store/serverHealthStore'
import { fetchAdministratorHealth } from '@/api/health'

vi.mock('@/api/health', () => ({
  fetchAdministratorHealth: vi.fn(),
}))

describe('serverHealthStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useServerHealthStore.setState({
      status: 'unknown',
      uptime: null,
      runtimeDir: null,
      expectedProjections: [],
      loadedProjections: [],
      missingProjections: [],
      loading: false,
      error: null,
    })
  })

  it('stores backend health and runtime root', async () => {
    vi.mocked(fetchAdministratorHealth).mockResolvedValue({
      status: 'ok',
      uptime: 42,
      runtime_dir: 'B:\\ohmic-local\\runtime\\administrator',
      expected_projections: [
        'administrator_intake_queue',
        'administrator_recent_actions',
      ],
      loaded_projections: ['administrator_intake_queue'],
      missing_projections: ['administrator_recent_actions'],
    })

    await useServerHealthStore.getState().fetch()

    expect(useServerHealthStore.getState()).toMatchObject({
      status: 'ok',
      uptime: 42,
      runtimeDir: 'B:\\ohmic-local\\runtime\\administrator',
      expectedProjections: [
        'administrator_intake_queue',
        'administrator_recent_actions',
      ],
      loadedProjections: ['administrator_intake_queue'],
      missingProjections: ['administrator_recent_actions'],
      loading: false,
      error: null,
    })
  })
})
