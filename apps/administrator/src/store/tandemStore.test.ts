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
      launchUrl: null,
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
      launch_url: 'http://127.0.0.1:8765/?sessionLabel=gmail-triage',
      message: 'Tandem base is configured. Open Tandem from here while deeper session browsing and provider capture stay in the next slice.',
    })

    await useTandemStore.getState().fetch()

    expect(useTandemStore.getState()).toMatchObject({
      configured: true,
      available: false,
      mode: 'configured',
      baseUrl: 'http://127.0.0.1:8765',
      sessionLabel: 'gmail-triage',
      launchUrl: 'http://127.0.0.1:8765/?sessionLabel=gmail-triage',
      message:
        'Tandem base is configured. Open Tandem from here while deeper session browsing and provider capture stay in the next slice.',
      loading: false,
      error: null,
    })
  })
})
