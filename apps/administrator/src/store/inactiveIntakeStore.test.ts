import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  matchesInactiveFilter,
  useInactiveIntakeStore,
} from '@/store/inactiveIntakeStore'
import { fetchInactiveIntake } from '@/api/projections'

vi.mock('@/api/projections', () => ({
  fetchInactiveIntake: vi.fn(),
}))

describe('inactiveIntakeStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useInactiveIntakeStore.setState({
      items: [],
      count: 0,
      generatedAt: null,
      loading: false,
      error: null,
      activeFilter: 'inactive_all',
    })
  })

  it('loads inactive intake items when the projection is present', async () => {
    vi.mocked(fetchInactiveIntake).mockResolvedValue({
      generated_at: '2026-03-17T15:25:00Z',
      projection_name: 'administrator_inactive_intake_projection',
      refresh_triggers: ['archive_writeback'],
      metadata: {
        ordering: 'inactive_since_desc',
        default_visibility: 'opt_in_only',
      },
      count: 1,
      inactive_items: [
        {
          intake_id: 'inactive-1',
          title: 'Archived customer follow-up',
          inactive_status: 'archived',
          inactive_since: '2026-03-17T14:00:00Z',
          last_active_status: 'triaging',
          reopen_allowed: true,
          reopen_target_status: 'queued',
          summary_label: 'Archived after duplicate confirmation',
        },
      ],
    })

    await useInactiveIntakeStore.getState().fetch()

    expect(useInactiveIntakeStore.getState()).toMatchObject({
      count: 1,
      generatedAt: '2026-03-17T15:25:00Z',
      loading: false,
      error: null,
    })
    expect(useInactiveIntakeStore.getState().items).toHaveLength(1)
  })

  it('treats a missing inactive projection as an empty optional surface', async () => {
    vi.mocked(fetchInactiveIntake).mockRejectedValue(new Error('Projection fetch failed: 404'))

    await useInactiveIntakeStore.getState().fetch()

    expect(useInactiveIntakeStore.getState()).toMatchObject({
      count: 0,
      loading: false,
      error: null,
    })
  })

  it('matches inactive filter presets against the runtime status', () => {
    expect(matchesInactiveFilter('archived', 'archived_only')).toBe(true)
    expect(matchesInactiveFilter('routed', 'archived_only')).toBe(false)
    expect(matchesInactiveFilter('waiting_on_provider', 'waiting_only')).toBe(true)
    expect(matchesInactiveFilter('held', 'inactive_all')).toBe(true)
  })
})
