export interface AdministratorTandemTargetPreset {
  preset_id: string
  display_label: string
  target_label: string
}

export interface AdministratorTandemStatus {
  configured: boolean
  available: boolean
  mode: 'unconfigured' | 'configured'
  session_state: 'missing' | 'idle' | 'attached'
  base_url: string | null
  session_label: string | null
  active_target_label: string | null
  target_presets: AdministratorTandemTargetPreset[]
  launch_url: string | null
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

export interface AdministratorTandemFollowUpCompletionRequest {
  intake_id: string
  target_preset_id?: string | null
  target_label?: string | null
  completion_note?: string | null
}
