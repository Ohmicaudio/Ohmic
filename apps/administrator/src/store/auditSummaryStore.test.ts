import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuditSummaryStore } from '@/store/auditSummaryStore'
import { fetchAuditSummaryProjection } from '@/api/projections'

vi.mock('@/api/projections', () => ({
  fetchAuditSummaryProjection: vi.fn(),
}))

describe('auditSummaryStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuditSummaryStore.setState({
      items: [],
      filterPresets: [],
      activePresetId: 'all_activity',
      generatedAt: null,
      loading: false,
      error: null,
      available: false,
      attempted: false,
    })
  })

  it('loads the optional audit summary module and applies the runtime default preset', async () => {
    vi.mocked(fetchAuditSummaryProjection).mockResolvedValue({
      module_id: 'administrator_audit_summary',
      generated_at: '2026-03-17T19:10:00Z',
      row_count: 1,
      filter_presets: [
        {
          preset_id: 'all_activity',
          display_label: 'All Activity',
          included_event_families: [],
          included_statuses: [],
          include_archived: true,
          include_routed: true,
        },
        {
          preset_id: 'status_changes',
          display_label: 'Status Changes',
          included_event_families: ['status_transition'],
          included_statuses: [],
          include_archived: true,
          include_routed: true,
        },
      ],
      empty_state: {
        title: 'No recent audit activity',
        body: 'Audit summaries will appear here after routing changes.',
      },
      metadata: {
        active_filter_preset: 'status_changes',
      },
      rows: [
        {
          event_id: 'evt-1',
          event_family: 'status_transition',
          intake_id: 'intake-1',
          summary_label: 'Moved to triaging',
          actor_label: 'operator',
          occurred_at: '2026-03-17T19:09:00Z',
          status_delta: 'queued -> triaging',
          target_label: '',
        },
      ],
    })

    await useAuditSummaryStore.getState().fetch()

    expect(useAuditSummaryStore.getState()).toMatchObject({
      available: true,
      loading: false,
      error: null,
      activePresetId: 'status_changes',
      generatedAt: '2026-03-17T19:10:00Z',
      attempted: true,
    })
    expect(useAuditSummaryStore.getState().items).toHaveLength(1)
    expect(useAuditSummaryStore.getState().filterPresets).toHaveLength(2)
  })

  it('treats a missing audit summary module as an optional surface', async () => {
    vi.mocked(fetchAuditSummaryProjection).mockRejectedValue(
      new Error('Projection fetch failed: 404')
    )

    await useAuditSummaryStore.getState().fetch()

    expect(useAuditSummaryStore.getState()).toMatchObject({
      available: false,
      loading: false,
      error: null,
      items: [],
      filterPresets: [],
      activePresetId: 'all_activity',
      attempted: true,
    })
  })
})
