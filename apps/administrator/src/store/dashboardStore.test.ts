import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useDashboardStore } from '@/store/dashboardStore'
import { fetchDashboardCards } from '@/api/projections'

vi.mock('@/api/projections', () => ({
  fetchDashboardCards: vi.fn(),
}))

describe('dashboardStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useDashboardStore.setState({
      cards: [],
      generatedAt: null,
      staleness: 'unknown',
      loading: false,
      error: null,
    })
  })

  it('stores dashboard cards with projection staleness', async () => {
    vi.mocked(fetchDashboardCards).mockResolvedValue({
      generated_at: '2026-03-17T10:00:00.000Z',
      source: {
        kind: 'file',
        path: 'B:\\ohmic\\generated\\agent-work\\runtime\\dashboard_status_cards.json',
      },
      staleness: {
        status: 'stale',
        reason: 'projection_lag',
      },
      count: 1,
      cards: [
        {
          card_id: 'queue-health',
          title: 'Queue Health',
          freshness: 'stale',
          emphasis: 'warning',
          fields: [{ label: 'Ready', value: '2' }],
        },
      ],
    })

    await useDashboardStore.getState().fetch()

    expect(useDashboardStore.getState()).toMatchObject({
      generatedAt: '2026-03-17T10:00:00.000Z',
      staleness: 'stale',
      loading: false,
      error: null,
    })
    expect(useDashboardStore.getState().cards).toHaveLength(1)
  })
})
