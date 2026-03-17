export interface AdministratorTandemStatus {
  configured: boolean
  available: boolean
  mode: 'unconfigured' | 'configured'
  base_url: string | null
  session_label: string | null
  message: string
}
