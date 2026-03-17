// ── Dashboard Status Cards ──────────────────────────────────────────

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

// ── Intake Queue ────────────────────────────────────────────────────

export type IntakeKind =
  | 'email'
  | 'github_issue'
  | 'github_pr'
  | 'discord_message'
  | 'web_form'
  | 'manual'
  | 'unknown'

export type IntakeStatus =
  | 'new'
  | 'triaging'
  | 'pending_approval'
  | 'waiting_on_provider'
  | 'waiting_on_human'
  | 'hold'
  | 'archived'
  | 'routed'
  | 'rejected'

export type PriorityHint =
  | 'critical'
  | 'high'
  | 'normal'
  | 'low'
  | ''

export type WarningState =
  | 'clean'
  | 'warnings_present'

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

// ── Ready Tasks ─────────────────────────────────────────────────────

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

// ── Commands (Phase 2 prep) ─────────────────────────────────────────

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
