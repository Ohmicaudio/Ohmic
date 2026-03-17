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
      loading: false,
      error: null,
    })
  })

  it('stores backend health and runtime root', async () => {
    vi.mocked(fetchAdministratorHealth).mockResolvedValue({
      status: 'ok',
      uptime: 42,
      runtime_dir: 'B:\\ohmic-local\\runtime\\administrator',
    })

    await useServerHealthStore.getState().fetch()

    expect(useServerHealthStore.getState()).toMatchObject({
      status: 'ok',
      uptime: 42,
      runtimeDir: 'B:\\ohmic-local\\runtime\\administrator',
      loading: false,
      error: null,
    })
  })
})
