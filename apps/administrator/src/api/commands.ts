import type {
  ValidateCommandRequest,
  ValidateCommandResponse,
  ExecuteCommandResponse,
  RecentActionsProjection,
} from '@/types/commands'

const API_BASE = '/api'

export async function fetchComposerOptions(): Promise<{
  available_actions: Array<{ action_id: string; display_label: string; aliases: string[] }>
  available_targets: Array<{ queue_target_id: string; display_label: string; status: string; capability_flags: string[] }>
}> {
  const res = await fetch(`${API_BASE}/commands/options`)
  if (!res.ok) throw new Error(`Options fetch failed: ${res.status}`)
  return res.json()
}

export async function validateCommand(
  request: ValidateCommandRequest
): Promise<ValidateCommandResponse> {
  const res = await fetch(`${API_BASE}/commands/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  if (!res.ok) throw new Error(`Validation failed: ${res.status}`)
  return res.json()
}

export async function executeCommand(
  request: ValidateCommandRequest
): Promise<ExecuteCommandResponse> {
  const res = await fetch(`${API_BASE}/commands/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  if (!res.ok) throw new Error(`Command execution failed: ${res.status}`)
  return res.json()
}

export async function fetchRecentActions(): Promise<RecentActionsProjection> {
  const res = await fetch(`${API_BASE}/projections/administrator_recent_actions`)
  if (!res.ok) throw new Error(`Recent actions fetch failed: ${res.status}`)
  return res.json()
}
