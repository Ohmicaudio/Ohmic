// Dashboard status cards.
export interface StatusCardField {
  label: string
  value: string
}

export interface StatusCard {
  card_id: string
  title: string
  freshness: 'fresh' | 'stale' | 'unknown'
  emphasis: 'normal' | 'warning' | 'critical'
  visible?: boolean
  fields: StatusCardField[]
}

export interface DashboardStatusCards {
  generated_at: string
  source: {
    kind: string
    path: string
  }
  staleness: {
    status: 'fresh' | 'stale'
    reason: string | null
  }
  count: number
  cards: StatusCard[]
}

// Intake queue.
export type IntakeKind =
  | 'email'
  | 'github_issue'
  | 'github_pr'
  | 'discord_message'
  | 'web_form'
  | 'manual'
  | 'unknown'

export type IntakeStatus =
  | 'queued'
  | 'new'
  | 'triaging'
  | 'pending_approval'
  | 'waiting_on_provider'
  | 'waiting_on_human'
  | 'hold'
  | 'archived'
  | 'routed'
  | 'rejected'

export type PriorityHint = 'critical' | 'high' | 'normal' | 'low' | ''

export type WarningState = 'clean' | 'warnings_present'

export interface IntakeQueueItem {
  intake_id: string
  title: string
  intake_kind: IntakeKind
  received_at: string
  status: IntakeStatus
  routing_target: string
  trust_tier: string
  priority_hint: PriorityHint
  tags: string[]
  warning_state: WarningState
  warning_count: number
  summary_label: string
}

export interface IntakeQueueProjection {
  generated_at: string
  projection_name: string
  staleness: {
    status: 'fresh' | 'stale'
    reason: string | null
  }
  refresh_triggers: string[]
  metadata: {
    ordering: string
    includes_warning_state: boolean
  }
  count: number
  queue_items: IntakeQueueItem[]
}

export type InactiveIntakeStatus =
  | 'archived'
  | 'routed'
  | 'held'
  | 'waiting_on_human'
  | 'waiting_on_provider'
  | ''

export interface InactiveIntakeItem {
  intake_id: string
  title: string
  inactive_status: InactiveIntakeStatus
  inactive_since: string
  last_active_status: string
  reopen_allowed: boolean
  reopen_target_status: string
  summary_label: string
}

export interface InactiveIntakeProjection {
  generated_at: string
  projection_name: string
  refresh_triggers: string[]
  metadata?: {
    ordering?: string
    default_visibility?: string
  }
  count: number
  inactive_items: InactiveIntakeItem[]
}

export interface ReopenInactiveIntakeRequest {
  intake_id: string
  restored_status?: string
  reopen_reason?: string
}

export interface ReopenInactiveIntakeResponse {
  writeback: {
    writeback_status: 'accepted' | 'rejected'
    intake_id: string
    restored_status: string | null
    recent_actions_count: number
    queue_item_updated: boolean
    inactive_item_removed: boolean
    rejection_reason?: string
  }
  updated_intake?: Record<string, unknown>
}

export interface AdministratorNote {
  note_id: string
  intake_id: string
  body_text: string
  authorship_class: string
  authored_by: string
  created_at: string
  visibility: string
  source_action_id: string
  display_author_label: string
}

export interface AdministratorNoteProjection {
  projection_name: string
  generated_at: string
  refresh_triggers: string[]
  visibility_context: string
  ordering: string
  notes: AdministratorNote[]
}

export interface AdministratorTagAssignment {
  tag_assignment_id: string
  intake_id: string
  tag_id: string
  tag_label: string
  tag_class: string
  source: string
  applied_by: string
  applied_at: string
  is_default: boolean
  is_suggested: boolean
}

export interface AdministratorTagAssignmentProjection {
  projection_name: string
  generated_at: string
  refresh_triggers: string[]
  ordering: string
  duplicate_suppression: string
  tag_assignments: AdministratorTagAssignment[]
}

export interface WarningReviewItem {
  intake_id: string
  source_type: string
  title: string
  received_at: string
  warning_level: string
  primary_warning_family: string
  warning_reasons: string[]
  parse_confidence: string
  attachment_warning_count: number
  latest_reprocess_status: string
  reprocess_eligible: boolean
  recommended_next_action: string
}

export interface WarningReviewProjection {
  module_id: string
  generated_at: string
  row_count: number
  filter_presets: Array<Record<string, unknown>>
  empty_state: {
    title: string
    body: string
  }
  rows: WarningReviewItem[]
}

export interface AggregationPanelItem {
  aggregation_bundle_id: string
  bundle_label: string
  bundle_kind: string
  member_count: number
  summary_text: string
  recommended_next_action: string
  status: string
  latest_activity_at: string
  primary_member_intake_id: string
}

export interface AggregationPanelProjection {
  module_id: string
  generated_at: string
  row_count: number
  filter_presets: Array<Record<string, unknown>>
  empty_state: {
    title: string
    body: string
  }
  rows: AggregationPanelItem[]
}

export interface AttachmentPreviewItem {
  preview_ref_id: string
  asset_id: string
  preview_kind: string
  availability: string
  preview_url: string
  fallback_label: string
  failure_reason: string
  review_handoff_action: string | null
}

export interface AttachmentPreviewProjection {
  module_id: string
  generated_at: string
  row_count: number
  filter_presets: Array<Record<string, unknown>>
  empty_state: {
    title: string
    body: string
  }
  rows: AttachmentPreviewItem[]
}

// Ready tasks.
export interface ReadyTask {
  task_id: string
  title: string
  priority: string
  project: string
  status: string
  file_path: string
}

export interface ReadyTasksProjection {
  generated_at: string
  count: number
  tasks: ReadyTask[]
}

// Commands.
export type ActionVerb =
  | 'route_to_orchestrator'
  | 'hold'
  | 'archive'
  | 'request_approval'
  | 'waiting_on_provider'
  | 'waiting_on_human'
  | 'add_note'
  | 'tag_item'

export interface CommandIntent {
  command_id: string
  action: ActionVerb
  intake_id: string
  params: Record<string, unknown>
  timestamp: string
}
