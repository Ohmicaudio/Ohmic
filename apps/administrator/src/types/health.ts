export interface AdministratorHealthStatus {
  status: 'ok' | 'error'
  uptime: number
  runtime_dir: string
  expected_projections: string[]
  loaded_projections: string[]
  missing_projections: string[]
}
