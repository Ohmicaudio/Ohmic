type ProjectionFallback = Record<string, unknown>

const INACTIVE_FILTER_PRESETS = [
  {
    preset_id: 'inactive_all',
    display_label: 'All Inactive',
    included_statuses: ['archived', 'routed', 'held', 'waiting_on_human', 'waiting_on_provider'],
    default_sort: 'inactive_since_desc',
  },
  {
    preset_id: 'archived_only',
    display_label: 'Archived',
    included_statuses: ['archived'],
    default_sort: 'inactive_since_desc',
  },
  {
    preset_id: 'routed_only',
    display_label: 'Routed',
    included_statuses: ['routed'],
    default_sort: 'inactive_since_desc',
  },
  {
    preset_id: 'held_only',
    display_label: 'Held',
    included_statuses: ['held'],
    default_sort: 'inactive_since_desc',
  },
  {
    preset_id: 'waiting_only',
    display_label: 'Waiting',
    included_statuses: ['waiting_on_human', 'waiting_on_provider'],
    default_sort: 'inactive_since_desc',
  },
]

function buildGeneratedAt(): string {
  return new Date().toISOString()
}

function buildRowsProjectionFallback(
  moduleId: string,
  emptyState: { title: string; body: string }
): ProjectionFallback {
  return {
    module_id: moduleId,
    generated_at: buildGeneratedAt(),
    row_count: 0,
    filter_presets: [],
    empty_state: emptyState,
    rows: [],
  }
}

function buildInactiveIntakeFallback(): ProjectionFallback {
  return {
    generated_at: buildGeneratedAt(),
    projection_name: 'administrator_inactive_intake_projection',
    refresh_triggers: ['archive_writeback', 'reopen_writeback'],
    metadata: {
      ordering: 'inactive_since_desc',
      default_visibility: 'opt_in_only',
    },
    count: 0,
    inactive_items: [],
  }
}

function buildInactiveIntakeShellFallback(): ProjectionFallback {
  return {
    module_id: 'administrator_inactive_intake',
    generated_at: buildGeneratedAt(),
    row_count: 0,
    filter_presets: INACTIVE_FILTER_PRESETS,
    empty_state: {
      title: 'No inactive intake yet',
      body: 'Archived, routed, held, and waiting items will appear here when the runtime publishes them.',
    },
    metadata: {
      active_filter_preset: 'inactive_all',
    },
    rows: [],
  }
}

export function buildProjectionFallback(name: string): ProjectionFallback | null {
  switch (name) {
    case 'administrator_inactive_intake':
      return buildInactiveIntakeShellFallback()
    case 'administrator_inactive_intake_projection':
      return buildInactiveIntakeFallback()
    case 'administrator_warning_review':
      return buildRowsProjectionFallback('administrator_warning_review', {
        title: 'No warning review runtime yet',
        body: 'Warning review rows will appear here when that runtime module is active.',
      })
    case 'administrator_aggregation_panel':
      return buildRowsProjectionFallback('administrator_aggregation_panel', {
        title: 'No aggregation bundles yet',
        body: 'Aggregation rows will appear here when the runtime publishes them.',
      })
    case 'administrator_attachment_preview':
      return buildRowsProjectionFallback('administrator_attachment_preview', {
        title: 'No attachment previews yet',
        body: 'Attachment preview rows will appear here when preview generation is enabled.',
      })
    case 'administrator_filing_history_projection':
      return {
        projection_name: 'administrator_filing_history_projection',
        generated_at: buildGeneratedAt(),
        refresh_triggers: ['filing_writeback'],
        filing_history: [],
      }
    case 'administrator_audit_summary':
      return {
        module_id: 'administrator_audit_summary',
        generated_at: buildGeneratedAt(),
        row_count: 0,
        filter_presets: [],
        empty_state: {
          title: 'No audit activity yet',
          body: 'Desk and provider activity will appear here once writebacks start landing.',
        },
        rows: [],
      }
    case 'administrator_status_history':
      return {
        module_id: 'administrator_status_history',
        generated_at: buildGeneratedAt(),
        row_count: 0,
        empty_state: {
          title: 'No status transitions yet',
          body: 'Status history will appear here when an intake moves through the desk.',
        },
        rows: [],
      }
    case 'administrator_focus_selection':
      return {
        projection_name: 'administrator_focus_selection',
        generated_at: buildGeneratedAt(),
        selection: null,
      }
    default:
      return null
  }
}
