// Action registry.
export interface ActionRegistryEntry {
  action_id: string
  display_label: string
  aliases: string[]
  status?: 'active' | 'deprecated' | 'retired'
  hidden?: boolean
  overlay_scope?: string
}

export interface QueueTargetEntry {
  queue_target_id: string
  display_label: string
  status: 'active' | 'deprecated' | 'retired'
  capability_flags: string[]
}

// Composer state.
export type ValidationStatus =
  | 'idle'
  | 'validating'
  | 'accepted'
  | 'accepted_with_warnings'
  | 'rejected'

export interface ReasonDetail {
  code: string
  label: string
  family: string
  severity?: string
  advisory_level?: string
  description: string
}

export interface ValidationFeedback {
  validation_status: ValidationStatus
  rejection_reasons: string[]
  warning_reasons: string[]
  rejection_details: ReasonDetail[]
  warning_details: ReasonDetail[]
}

export interface ComposerState {
  selectedIntakeId: string
  actionInput: string
  noteText: string
  tags: string[]
  queueTargetId: string
  validation: ValidationFeedback
}

// Command intent result from PowerShell validation.
export interface CommandValidationResult {
  command_id: string
  selected_intake_id: string
  action_input: string
  resolved_action_id: string | null
  resolved_action_label: string | null
  requested_queue_target_id: string
  resolved_queue_target_id: string | null
  note_text: string
  tags: string[]
  requested_by: string
  created_at: string
  validation: {
    validation_status: 'accepted' | 'accepted_with_warnings' | 'rejected'
    rejection_reasons: string[]
    warning_reasons: string[]
    rejection_details: ReasonDetail[]
    warning_details: ReasonDetail[]
    action_resolution: unknown
    queue_target_validation: unknown
    approval_evaluation: unknown
  }
}

// Recent actions audit trail.
export interface RecentAction {
  command_id: string
  action: string
  intake_id: string
  validation_status: string
  resulting_status: string
  occurred_at: string
  audit_id: string
  summary_label: string
}

export interface RecentActionsProjection {
  generated_at: string
  projection_name: string
  staleness: {
    status: 'fresh' | 'stale'
    reason: string | null
  }
  count: number
  recent_actions: RecentAction[]
}

// API request and response shapes.
export interface ValidateCommandRequest {
  intake_id: string
  action: string
  queue_target?: string
  note?: string
  tags?: string[]
}

export interface ValidateCommandResponse {
  result: CommandValidationResult
}

export interface CommandWritebackResult {
  writeback_status: 'accepted' | 'rejected'
  resulting_status: string | null
  recent_actions_count: number
  note_written: boolean
  tags_written: number
  queue_item_updated: boolean
}

export interface ExecuteCommandResponse {
  result: CommandValidationResult
  writeback: CommandWritebackResult
}
