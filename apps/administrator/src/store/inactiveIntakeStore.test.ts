import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  DEFAULT_INACTIVE_FILTERS,
  matchesInactiveFilter,
  useInactiveIntakeStore,
} from '@/store/inactiveIntakeStore'
import { fetchInactiveIntake, fetchInactiveIntakeShell } from '@/api/projections'
import { reopenInactiveIntake } from '@/api/inactive'

vi.mock('@/api/projections', () => ({
  fetchInactiveIntake: vi.fn(),
  fetchInactiveIntakeShell: vi.fn(),
}))

vi.mock('@/api/inactive', () => ({
  reopenInactiveIntake: vi.fn(),
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
      reopeningId: null,
      activeFilter: 'inactive_all',
      filterPresets: DEFAULT_INACTIVE_FILTERS,
      shellAvailable: false,
    })
  })

  it('prefers the optional inactive shell module when present', async () => {
    vi.mocked(fetchInactiveIntakeShell).mockResolvedValue({
      module_id: 'administrator_inactive_intake',
      generated_at: '2026-03-17T15:24:00Z',
      row_count: 1,
      filter_presets: [
        {
          preset_id: 'archived_only',
          display_label: 'Archived',
          included_statuses: ['archived'],
          default_sort: 'inactive_since_desc',
        },
      ],
      empty_state: {
        title: 'No inactive intake items',
        body: 'Inactive rows appear here.',
      },
      metadata: {
        active_filter_preset: 'archived_only',
      },
      rows: [
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
      activeFilter: 'archived_only',
      shellAvailable: true,
      loading: false,
      error: null,
    })
    expect(useInactiveIntakeStore.getState().filterPresets).toHaveLength(1)
  })

  it('loads inactive intake items when the projection is present', async () => {
    vi.mocked(fetchInactiveIntakeShell).mockRejectedValue(
      new Error('Projection fetch failed: 404')
    )
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
      shellAvailable: false,
    })
    expect(useInactiveIntakeStore.getState().items).toHaveLength(1)
  })

  it('treats a missing inactive projection as an empty optional surface', async () => {
    vi.mocked(fetchInactiveIntakeShell).mockRejectedValue(
      new Error('Projection fetch failed: 404')
    )
    vi.mocked(fetchInactiveIntake).mockRejectedValue(new Error('Projection fetch failed: 404'))

    await useInactiveIntakeStore.getState().fetch()

    expect(useInactiveIntakeStore.getState()).toMatchObject({
      count: 0,
      loading: false,
      error: null,
      shellAvailable: false,
    })
  })

  it('removes a reopened item from the inactive list after successful writeback', async () => {
    useInactiveIntakeStore.setState({
      items: [
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
      count: 1,
      generatedAt: '2026-03-17T15:25:00Z',
      loading: false,
      error: null,
      reopeningId: null,
      activeFilter: 'inactive_all',
      filterPresets: DEFAULT_INACTIVE_FILTERS,
      shellAvailable: false,
    })

    vi.mocked(reopenInactiveIntake).mockResolvedValue({
      writeback: {
        writeback_status: 'accepted',
        intake_id: 'inactive-1',
        restored_status: 'queued',
        recent_actions_count: 2,
        queue_item_updated: true,
        inactive_item_removed: true,
      },
      updated_intake: {
        intake_id: 'inactive-1',
        status: 'queued',
      },
    })

    const response = await useInactiveIntakeStore.getState().reopen('inactive-1', 'queued')

    expect(reopenInactiveIntake).toHaveBeenCalledWith({
      intake_id: 'inactive-1',
      restored_status: 'queued',
    })
    expect(response.writeback.writeback_status).toBe('accepted')
    expect(useInactiveIntakeStore.getState()).toMatchObject({
      items: [],
      count: 0,
      reopeningId: null,
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
