import type {
  ReopenInactiveIntakeRequest,
  ReopenInactiveIntakeResponse,
} from '@/types/intake'

const API_BASE = '/api'

export async function reopenInactiveIntake(
  request: ReopenInactiveIntakeRequest
): Promise<ReopenInactiveIntakeResponse> {
  const res = await fetch(`${API_BASE}/inactive/reopen`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!res.ok) {
    throw new Error(`Inactive reopen failed: ${res.status}`)
  }

  return res.json()
}
