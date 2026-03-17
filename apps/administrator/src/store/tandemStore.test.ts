import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTandemStore } from '@/store/tandemStore'
import { fetchTandemStatus } from '@/api/tandem'

vi.mock('@/api/tandem', () => ({
  fetchTandemStatus: vi.fn(),
}))

describe('tandemStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useTandemStore.setState({
      configured: false,
      available: false,
      mode: 'unconfigured',
      baseUrl: null,
      sessionLabel: null,
      message: null,
      loading: false,
      error: null,
    })
  })

  it('stores configured Tandem status from the server', async () => {
    vi.mocked(fetchTandemStatus).mockResolvedValue({
      configured: true,
      available: false,
      mode: 'configured',
      base_url: 'http://127.0.0.1:8765',
      session_label: 'gmail-triage',
      message: 'Tandem base is configured but no session is attached yet.',
    })

    await useTandemStore.getState().fetch()

    expect(useTandemStore.getState()).toMatchObject({
      configured: true,
      available: false,
      mode: 'configured',
      baseUrl: 'http://127.0.0.1:8765',
      sessionLabel: 'gmail-triage',
      message: 'Tandem base is configured but no session is attached yet.',
      loading: false,
      error: null,
    })
  })
})
