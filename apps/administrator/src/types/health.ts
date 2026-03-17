export interface AdministratorHealthStatus {
  status: 'ok' | 'error'
  uptime: number
  runtime_dir: string
}
