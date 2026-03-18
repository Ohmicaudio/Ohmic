export interface AdministratorTandemTargetPreset {
  preset_id: string
  display_label: string
  target_label: string
  target_kind?: string | null
  team_label?: string | null
  default_note?: string | null
}

export interface AdministratorTandemTargetHealth {
  target_label: string
  status: 'unknown' | 'ready' | 'attention' | 'attached' | 'error'
  message?: string | null
}

export interface AdministratorTandemHandshakeState {
  event_id: string
  intake_id: string | null
  target_preset_id: string | null
  target_label: string | null
  handshake_note?: string | null
  occurred_at: string
  state: 'pending' | 'attached' | 'failed'
}

export interface AdministratorTandemStatus {
  configured: boolean
  available: boolean
  mode: 'unconfigured' | 'configured'
  status_source: 'env' | 'probe'
  probe_state: 'unavailable' | 'reachable' | 'error'
  session_state: 'missing' | 'idle' | 'attached'
  base_url: string | null
  session_label: string | null
  active_target_label: string | null
  target_presets: AdministratorTandemTargetPreset[]
  target_health: AdministratorTandemTargetHealth[]
  pending_handshake: AdministratorTandemHandshakeState | null
  launch_url: string | null
  probe_message?: string | null
  message: string
}

export interface AdministratorTandemLaunchIntentRequest {
  intake_id?: string | null
  target_preset_id?: string | null
  target_label?: string | null
  launch_url?: string | null
  attachment_id?: string | null
  handoff_note?: string | null
}

export interface AdministratorTandemTargetHandshakeRequest {
  intake_id?: string | null
  target_preset_id?: string | null
  target_label?: string | null
  handshake_note?: string | null
}

export interface AdministratorTandemHandshakeResolutionRequest {
  state: 'attached' | 'failed' | 'cleared'
  event_id?: string | null
  intake_id?: string | null
  target_preset_id?: string | null
  target_label?: string | null
  resolution_note?: string | null
}

export interface AdministratorTandemFollowUpCompletionRequest {
  intake_id: string
  target_preset_id?: string | null
  target_label?: string | null
  completion_note?: string | null
}

export interface AdministratorTandemFollowUpReopenRequest {
  intake_id: string
  target_preset_id?: string | null
  target_label?: string | null
  reopen_note?: string | null
}
