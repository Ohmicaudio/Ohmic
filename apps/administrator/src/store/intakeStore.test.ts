import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useIntakeStore } from '@/store/intakeStore'
import { fetchIntakeQueue } from '@/api/projections'

vi.mock('@/api/projections', () => ({
  fetchIntakeQueue: vi.fn(),
}))

describe('intakeStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useIntakeStore.setState({
      items: [],
      count: 0,
      generatedAt: null,
      staleness: 'unknown',
      loading: false,
      error: null,
      selectedId: null,
    })
  })

  it('stores intake items with the real projection staleness', async () => {
    vi.mocked(fetchIntakeQueue).mockResolvedValue({
      generated_at: '2026-03-17T10:05:00.000Z',
      projection_name: 'administrator_intake_queue',
      staleness: {
        status: 'stale',
        reason: 'projection_lag',
      },
      refresh_triggers: ['projection_changed'],
      metadata: {
        ordering: 'received_at_desc',
        includes_warning_state: true,
      },
      count: 1,
      queue_items: [
        {
          intake_id: 'intake-1',
          title: 'Follow up with provider',
          intake_kind: 'email',
          received_at: '2026-03-17T10:00:00.000Z',
          status: 'waiting_on_provider',
          routing_target: 'provider-response',
          trust_tier: '2',
          priority_hint: 'high',
          tags: ['provider'],
          warning_state: 'warnings_present',
          warning_count: 1,
          summary_label: 'Waiting on provider response',
        },
      ],
    })

    await useIntakeStore.getState().fetch()

    expect(useIntakeStore.getState()).toMatchObject({
      count: 1,
      generatedAt: '2026-03-17T10:05:00.000Z',
      staleness: 'stale',
      loading: false,
      error: null,
    })
    expect(useIntakeStore.getState().items).toHaveLength(1)
  })
})
