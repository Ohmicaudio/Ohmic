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
      statusSource: 'env',
      probeState: 'unavailable',
      sessionState: 'missing',
      baseUrl: null,
      sessionLabel: null,
      activeTargetLabel: null,
      targetPresets: [],
      targetHealth: [],
      pendingHandshake: null,
      selectedPresetId: '',
      handoffNote: '',
      launchUrl: null,
      probeMessage: null,
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
      status_source: 'env',
      probe_state: 'unavailable',
      session_state: 'attached',
      base_url: 'http://127.0.0.1:8765',
      session_label: 'gmail-triage',
      active_target_label: 'Gmail support inbox',
      target_presets: [
        {
          preset_id: 'gmail-support',
          display_label: 'Gmail Support',
          target_label: 'Gmail support inbox',
          target_kind: 'email',
          team_label: 'Support',
          default_note: 'Ask provider to verify attachment context.',
        },
      ],
      target_health: [
        {
          target_label: 'Gmail support inbox',
          status: 'attached',
          message: 'Live provider session attached.',
        },
      ],
      pending_handshake: {
        event_id: 'handshake-1',
        intake_id: 'intake-7',
        target_preset_id: 'gmail-support',
        target_label: 'Gmail support inbox',
        handshake_note: 'Prepare provider session before launch.',
        occurred_at: '2026-03-18T10:00:00Z',
        state: 'pending',
      },
      launch_url: 'http://127.0.0.1:8765/?sessionLabel=gmail-triage',
      probe_message: null,
      message: 'Tandem is attached to Gmail support inbox. Open the live provider session from here.',
    })

    await useTandemStore.getState().fetch()

    expect(useTandemStore.getState()).toMatchObject({
      configured: true,
      available: true,
      mode: 'configured',
      statusSource: 'env',
      probeState: 'unavailable',
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
      targetHealth: [
        {
          target_label: 'Gmail support inbox',
          status: 'attached',
          message: 'Live provider session attached.',
        },
      ],
      pendingHandshake: {
        event_id: 'handshake-1',
        intake_id: 'intake-7',
        target_preset_id: 'gmail-support',
        target_label: 'Gmail support inbox',
        handshake_note: 'Prepare provider session before launch.',
        occurred_at: '2026-03-18T10:00:00Z',
        state: 'pending',
      },
      selectedPresetId: 'gmail-support',
      handoffNote: '',
      launchUrl: 'http://127.0.0.1:8765/?sessionLabel=gmail-triage',
      probeMessage: null,
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
      status_source: 'env',
      probe_state: 'unavailable',
      session_state: 'idle',
      base_url: 'http://127.0.0.1:8765',
      session_label: 'ops',
      active_target_label: null,
      target_presets: [
        {
          preset_id: 'gmail-support',
          display_label: 'Gmail Support',
          target_label: 'Gmail support inbox',
          target_kind: 'email',
          team_label: 'Support',
          default_note: 'Ask provider to verify attachment context.',
        },
        {
          preset_id: 'github-bugs',
          display_label: 'GitHub Bugs',
          target_label: 'GitHub issues queue',
          target_kind: 'issue',
          team_label: 'Engineering',
          default_note: 'Confirm issue routing and required evidence.',
        },
      ],
      target_health: [],
      pending_handshake: null,
      launch_url: 'http://127.0.0.1:8765/?sessionLabel=ops',
      probe_message: null,
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
      status_source: 'env',
      probe_state: 'unavailable',
      session_state: 'idle',
      base_url: 'http://127.0.0.1:8765',
      session_label: 'ops',
      active_target_label: null,
      target_presets: [
        {
          preset_id: 'gmail-support',
          display_label: 'Gmail Support',
          target_label: 'Gmail support inbox',
          target_kind: 'email',
          team_label: 'Support',
          default_note: 'Ask provider to verify attachment context.',
        },
      ],
      target_health: [],
      pending_handshake: null,
      launch_url: 'http://127.0.0.1:8765/?sessionLabel=ops',
      probe_message: null,
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
