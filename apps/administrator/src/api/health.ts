import type { AdministratorHealthStatus } from '@/types/health'

const API_BASE = '/api'

export async function fetchAdministratorHealth(): Promise<AdministratorHealthStatus> {
  const res = await fetch(`${API_BASE}/health`)
  if (!res.ok) {
    throw new Error(`Health fetch failed: ${res.status}`)
  }
  return res.json()
}
