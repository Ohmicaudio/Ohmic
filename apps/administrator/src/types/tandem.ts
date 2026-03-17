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
