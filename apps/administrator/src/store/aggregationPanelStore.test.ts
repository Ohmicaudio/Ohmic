import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAggregationPanelStore } from '@/store/aggregationPanelStore'
import { fetchAggregationPanelProjection } from '@/api/projections'

vi.mock('@/api/projections', () => ({
  fetchAggregationPanelProjection: vi.fn(),
}))

describe('aggregationPanelStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAggregationPanelStore.setState({
      items: [],
      generatedAt: null,
      loading: false,
      error: null,
      available: false,
    })
  })

  it('loads the optional aggregation panel module when present', async () => {
    vi.mocked(fetchAggregationPanelProjection).mockResolvedValue({
      module_id: 'administrator_aggregation_panel',
      generated_at: '2026-03-17T15:50:00Z',
      row_count: 1,
      filter_presets: [],
      empty_state: {
        title: 'No aggregation bundles',
        body: 'Bundle rows will appear here',
      },
      rows: [
        {
          aggregation_bundle_id: 'bundle-1',
          bundle_label: 'Three related provider replies',
          bundle_kind: 'duplicate_family',
          member_count: 3,
          summary_text: 'Likely duplicate replies to the same provider escalation',
          recommended_next_action: 'route_to_orchestrator',
          status: 'review',
          latest_activity_at: '2026-03-17T15:45:00Z',
          primary_member_intake_id: 'intake-2',
        },
      ],
    })

    await useAggregationPanelStore.getState().fetch()

    expect(useAggregationPanelStore.getState()).toMatchObject({
      available: true,
      loading: false,
      error: null,
    })
    expect(useAggregationPanelStore.getState().items).toHaveLength(1)
  })

  it('treats a missing aggregation panel as an optional surface', async () => {
    vi.mocked(fetchAggregationPanelProjection).mockRejectedValue(
      new Error('Projection fetch failed: 404')
    )

    await useAggregationPanelStore.getState().fetch()

    expect(useAggregationPanelStore.getState()).toMatchObject({
      available: false,
      loading: false,
      error: null,
      items: [],
    })
  })
})
