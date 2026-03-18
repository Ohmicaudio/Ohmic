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

export interface InactiveFilterPresetRow {
  preset_id: string
  display_label: string
  included_statuses: string[]
  default_sort: string
}

export interface InactiveIntakeShellProjection {
  module_id: string
  generated_at: string
  row_count: number
  filter_presets: InactiveFilterPresetRow[]
  empty_state: {
    title: string
    body: string
  }
  metadata?: {
    active_filter_preset?: string
  }
  rows: InactiveIntakeItem[]
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

export interface ReleaseClaimResponse {
  writeback: {
    writeback_status: 'accepted'
    claim_id: string
    released_claim_path: string
  }
}

export interface WorkspaceCommitActivity {
  hash: string
  summary: string
  committed_at: string
}

export interface WorkspaceFileActivity {
  path: string
  status: string
}

export interface WorkspaceActivityProjection {
  generated_at: string
  workspace_dir: string
  branch: string | null
  scope_label: string
  head_commit: WorkspaceCommitActivity | null
  recent_commits: WorkspaceCommitActivity[]
  dirty_files: WorkspaceFileActivity[]
  dirty_file_count: number
  status: 'available' | 'unavailable'
  message: string | null
}

export interface ActiveClaimItem {
  claim_id: string
  title: string
  owner: string
  status: string
  paths: string[]
  file_path: string
}

export interface ActiveClaimsProjection {
  generated_at: string
  count: number
  claims: ActiveClaimItem[]
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

export interface AuditFilterPreset {
  preset_id: string
  display_label: string
  included_event_families: string[]
  included_statuses: string[]
  include_archived: boolean
  include_routed: boolean
}

export interface AdministratorAuditSummaryItem {
  event_id: string
  event_family: string
  intake_id: string
  summary_label: string
  actor_label: string
  occurred_at: string
  status_delta: string
  target_label: string
  target_preset_id?: string
  launch_url?: string
  attachment_id?: string
  handoff_note?: string
}

export interface AdministratorAuditSummaryProjection {
  module_id: string
  generated_at: string
  row_count: number
  filter_presets: AuditFilterPreset[]
  empty_state: {
    title: string
    body: string
  }
  metadata?: {
    active_filter_preset?: string
  }
  rows: AdministratorAuditSummaryItem[]
}

export interface AdministratorStatusHistoryItem {
  status_history_record_id: string
  previous_status: string
  new_status: string
  actor_label: string
  transition_reason: string
  changed_at: string
  is_current: boolean
}

export interface AdministratorStatusHistoryProjection {
  module_id: string
  generated_at: string
  row_count: number
  empty_state: {
    title: string
    body: string
  }
  rows: AdministratorStatusHistoryItem[]
}

export interface FilingDestinationOption {
  filing_destination_id: string
  display_label: string
  description: string
  archive_marker_default: boolean
  allowed_for_current_intake: boolean
  status: string
  selectable: boolean
  disabled_reason: string | null
  is_default: boolean
  requires_advanced_flow: boolean
}

export interface FilingPickerReadModel {
  intake_id: string
  overlay_context_id: string
  default_destination_ids: string[]
  advanced_destination_ids: string[]
  destinations: FilingDestinationOption[]
}

export interface FilingHistoryItem {
  filing_record_id: string
  intake_id: string
  filing_destination_id: string
  display_label: string
  archive_marker: boolean
  reason: string
  filed_by: string
  filed_at: string
  status: string
}

export interface FilingHistoryProjection {
  projection_name?: string
  generated_at: string
  refresh_triggers?: string[]
  filing_history: FilingHistoryItem[]
}

export interface RecordFilingRequest {
  intake_id: string
  filing_destination_id: string
  archive_marker?: boolean
  reason?: string
}

export interface RecordFilingResponse {
  writeback: {
    writeback_status: 'accepted' | 'rejected'
    intake_id: string
    filing_record_id: string | null
    filing_destination_id: string | null
    filing_history_count: number
    rejection_reason?: string
  }
  filing_record?: FilingHistoryItem
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

export interface QueueDocumentContext {
  file_path: string
  title: string
  excerpt: string
  source_heading: string | null
}

export interface AdministratorDeskFocusSelection {
  focus_kind: 'intake' | 'ready_task' | 'claim'
  selected_intake_id: string | null
  task_id: string | null
  claim_id: string | null
  title: string | null
  file_path: string | null
  updated_at: string
  source: 'administrator_app'
}

export interface AdministratorDeskFocusProjection {
  projection_name: 'administrator_focus_selection'
  generated_at: string
  selection: AdministratorDeskFocusSelection | null
}

export interface ClaimReadyTaskResponse {
  writeback: {
    writeback_status: 'accepted'
    claim_id: string
    task_id: string
    owner: string
    claim_file_path: string
  }
}

export interface CompleteClaimResponse {
  writeback: {
    writeback_status: 'accepted'
    claim_id: string
    completed_claim_path: string
  }
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
