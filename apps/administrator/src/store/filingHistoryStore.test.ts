import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useFilingHistoryStore } from '@/store/filingHistoryStore'
import { fetchFilingHistoryProjection } from '@/api/projections'

vi.mock('@/api/projections', () => ({
  fetchFilingHistoryProjection: vi.fn(),
}))

describe('filingHistoryStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useFilingHistoryStore.setState({
      items: [],
      generatedAt: null,
      loading: false,
      error: null,
      available: false,
    })
  })

  it('loads the optional filing history projection when present', async () => {
    vi.mocked(fetchFilingHistoryProjection).mockResolvedValue({
      projection_name: 'administrator_filing_history_projection',
      generated_at: '2026-03-17T19:40:00Z',
      refresh_triggers: ['filing_writeback'],
      filing_history: [
        {
          filing_record_id: 'filing-1',
          intake_id: 'intake-7',
          filing_destination_id: 'ops_bug_archive',
          display_label: 'Bug Archive',
          archive_marker: true,
          reason: 'Retained after final operator review.',
          filed_by: 'switchyard',
          filed_at: '2026-03-17T19:35:00Z',
          status: 'active',
        },
      ],
    })

    await useFilingHistoryStore.getState().fetch()

    expect(useFilingHistoryStore.getState()).toMatchObject({
      available: true,
      loading: false,
      error: null,
      generatedAt: '2026-03-17T19:40:00Z',
    })
    expect(useFilingHistoryStore.getState().items).toHaveLength(1)
  })

  it('treats a missing filing history projection as an optional surface', async () => {
    vi.mocked(fetchFilingHistoryProjection).mockRejectedValue(
      new Error('Projection fetch failed: 404')
    )

    await useFilingHistoryStore.getState().fetch()

    expect(useFilingHistoryStore.getState()).toMatchObject({
      available: false,
      loading: false,
      error: null,
      items: [],
    })
  })
})
