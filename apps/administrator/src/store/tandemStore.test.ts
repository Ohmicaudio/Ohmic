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
      sessionState: 'missing',
      baseUrl: null,
      sessionLabel: null,
      activeTargetLabel: null,
      targetPresets: [],
      selectedPresetId: '',
      handoffNote: '',
      launchUrl: null,
      message: null,
      loading: false,
      error: null,
    })
  })

  it('stores configured Tandem status from the server', async () => {
    vi.mocked(fetchTandemStatus).mockResolvedValue({
      configured: true,
      available: true,
      mode: 'configured',
      session_state: 'attached',
      base_url: 'http://127.0.0.1:8765',
      session_label: 'gmail-triage',
      active_target_label: 'Gmail support inbox',
      target_presets: [
        {
          preset_id: 'gmail-support',
          display_label: 'Gmail Support',
          target_label: 'Gmail support inbox',
        },
      ],
      launch_url: 'http://127.0.0.1:8765/?sessionLabel=gmail-triage',
      message: 'Tandem is attached to Gmail support inbox. Open the live provider session from here.',
    })

    await useTandemStore.getState().fetch()

    expect(useTandemStore.getState()).toMatchObject({
      configured: true,
      available: true,
      mode: 'configured',
      sessionState: 'attached',
      baseUrl: 'http://127.0.0.1:8765',
      sessionLabel: 'gmail-triage',
      activeTargetLabel: 'Gmail support inbox',
      targetPresets: [
        {
          preset_id: 'gmail-support',
          display_label: 'Gmail Support',
          target_label: 'Gmail support inbox',
        },
      ],
      selectedPresetId: 'gmail-support',
      handoffNote: '',
      launchUrl: 'http://127.0.0.1:8765/?sessionLabel=gmail-triage',
      message: 'Tandem is attached to Gmail support inbox. Open the live provider session from here.',
      loading: false,
      error: null,
    })
  })

  it('keeps a valid selected preset across status refreshes', async () => {
    useTandemStore.setState({ selectedPresetId: 'github-bugs' })

    vi.mocked(fetchTandemStatus).mockResolvedValue({
      configured: true,
      available: false,
      mode: 'configured',
      session_state: 'idle',
      base_url: 'http://127.0.0.1:8765',
      session_label: 'ops',
      active_target_label: null,
      target_presets: [
        {
          preset_id: 'gmail-support',
          display_label: 'Gmail Support',
          target_label: 'Gmail support inbox',
        },
        {
          preset_id: 'github-bugs',
          display_label: 'GitHub Bugs',
          target_label: 'GitHub issues queue',
        },
      ],
      launch_url: 'http://127.0.0.1:8765/?sessionLabel=ops',
      message: 'Tandem is configured and idle. Open the handoff to attach it to a live provider target.',
    })

    await useTandemStore.getState().fetch()

    expect(useTandemStore.getState().selectedPresetId).toBe('github-bugs')
  })

  it('falls back to the first preset when the selected preset disappears', async () => {
    useTandemStore.setState({ selectedPresetId: 'old-preset' })

    vi.mocked(fetchTandemStatus).mockResolvedValue({
      configured: true,
      available: false,
      mode: 'configured',
      session_state: 'idle',
      base_url: 'http://127.0.0.1:8765',
      session_label: 'ops',
      active_target_label: null,
      target_presets: [
        {
          preset_id: 'gmail-support',
          display_label: 'Gmail Support',
          target_label: 'Gmail support inbox',
        },
      ],
      launch_url: 'http://127.0.0.1:8765/?sessionLabel=ops',
      message: 'Tandem is configured and idle. Open the handoff to attach it to a live provider target.',
    })

    await useTandemStore.getState().fetch()

    expect(useTandemStore.getState().selectedPresetId).toBe('gmail-support')
  })

  it('stores a shared handoff note for provider launch actions', () => {
    useTandemStore.getState().setHandoffNote('Customer asked for screenshot confirmation.')

    expect(useTandemStore.getState().handoffNote).toBe(
      'Customer asked for screenshot confirmation.'
    )
  })
})
