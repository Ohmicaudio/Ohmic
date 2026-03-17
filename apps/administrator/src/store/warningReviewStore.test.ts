import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useWarningReviewStore } from '@/store/warningReviewStore'
import { fetchWarningReviewProjection } from '@/api/projections'

vi.mock('@/api/projections', () => ({
  fetchWarningReviewProjection: vi.fn(),
}))

describe('warningReviewStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useWarningReviewStore.setState({
      items: [],
      generatedAt: null,
      loading: false,
      error: null,
      available: false,
    })
  })

  it('loads the optional warning review module when the runtime provides it', async () => {
    vi.mocked(fetchWarningReviewProjection).mockResolvedValue({
      module_id: 'administrator_warning_review',
      generated_at: '2026-03-17T15:40:00Z',
      row_count: 1,
      filter_presets: [],
      empty_state: {
        title: 'No items',
        body: 'Warning review is empty',
      },
      rows: [
        {
          intake_id: 'warn-1',
          source_type: 'email',
          title: 'Needs operator review',
          received_at: '2026-03-17T15:35:00Z',
          warning_level: 'blocking',
          primary_warning_family: 'parse_confidence',
          warning_reasons: ['body_parse_failed', 'attachment_missing_preview'],
          parse_confidence: 'low',
          attachment_warning_count: 1,
          latest_reprocess_status: 'not_attempted',
          reprocess_eligible: true,
          recommended_next_action: 'request_approval',
        },
      ],
    })

    await useWarningReviewStore.getState().fetch()

    expect(useWarningReviewStore.getState()).toMatchObject({
      available: true,
      loading: false,
      error: null,
    })
    expect(useWarningReviewStore.getState().items).toHaveLength(1)
  })

  it('treats a missing warning review module as an optional surface', async () => {
    vi.mocked(fetchWarningReviewProjection).mockRejectedValue(
      new Error('Projection fetch failed: 404')
    )

    await useWarningReviewStore.getState().fetch()

    expect(useWarningReviewStore.getState()).toMatchObject({
      available: false,
      loading: false,
      error: null,
      items: [],
    })
  })
})
