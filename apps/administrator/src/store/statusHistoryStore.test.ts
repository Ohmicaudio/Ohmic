import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useStatusHistoryStore } from '@/store/statusHistoryStore'
import { fetchStatusHistoryProjection } from '@/api/projections'

vi.mock('@/api/projections', () => ({
  fetchStatusHistoryProjection: vi.fn(),
}))

describe('statusHistoryStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useStatusHistoryStore.setState({
      items: [],
      generatedAt: null,
      loading: false,
      error: null,
      available: false,
    })
  })

  it('loads the optional status history module when present', async () => {
    vi.mocked(fetchStatusHistoryProjection).mockResolvedValue({
      module_id: 'administrator_status_history',
      generated_at: '2026-03-17T19:11:00Z',
      row_count: 1,
      empty_state: {
        title: 'No status history yet',
        body: 'Status changes will appear here.',
      },
      rows: [
        {
          status_history_record_id: 'history-1',
          previous_status: 'queued',
          new_status: 'triaging',
          actor_label: 'operator',
          transition_reason: 'Escalated to active review',
          changed_at: '2026-03-17T19:10:00Z',
          is_current: true,
        },
      ],
    })

    await useStatusHistoryStore.getState().fetch()

    expect(useStatusHistoryStore.getState()).toMatchObject({
      available: true,
      loading: false,
      error: null,
      generatedAt: '2026-03-17T19:11:00Z',
    })
    expect(useStatusHistoryStore.getState().items).toHaveLength(1)
  })

  it('treats a missing status history module as an optional surface', async () => {
    vi.mocked(fetchStatusHistoryProjection).mockRejectedValue(
      new Error('Projection fetch failed: 404')
    )

    await useStatusHistoryStore.getState().fetch()

    expect(useStatusHistoryStore.getState()).toMatchObject({
      available: false,
      loading: false,
      error: null,
      items: [],
    })
  })
})
