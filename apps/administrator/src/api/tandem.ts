import type { AdministratorTandemStatus } from '@/types/tandem'

const API_BASE = '/api'

export async function fetchTandemStatus(): Promise<AdministratorTandemStatus> {
  const res = await fetch(`${API_BASE}/tandem/status`)
  if (!res.ok) {
    throw new Error(`Tandem status fetch failed: ${res.status}`)
  }
  return res.json()
}
