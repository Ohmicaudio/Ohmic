export interface AdministratorTandemStatus {
  configured: boolean
  available: boolean
  mode: 'unconfigured' | 'configured'
  session_state: 'missing' | 'idle' | 'attached'
  base_url: string | null
  session_label: string | null
  active_target_label: string | null
  launch_url: string | null
  message: string
}
