import type {
  AdministratorTandemFollowUpCompletionRequest,
  AdministratorTandemLaunchIntentRequest,
  AdministratorTandemStatus,
} from '@/types/tandem'

const API_BASE = '/api'

export async function fetchTandemStatus(): Promise<AdministratorTandemStatus> {
  const res = await fetch(`${API_BASE}/tandem/status`)
  if (!res.ok) {
    throw new Error(`Tandem status fetch failed: ${res.status}`)
  }
  return res.json()
}

export async function recordTandemLaunchIntent(
  input: AdministratorTandemLaunchIntentRequest
): Promise<void> {
  const res = await fetch(`${API_BASE}/tandem/launch-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    throw new Error(`Tandem launch intent writeback failed: ${res.status}`)
  }
}

export async function recordProviderFollowUpCompletion(
  input: AdministratorTandemFollowUpCompletionRequest
): Promise<void> {
  const res = await fetch(`${API_BASE}/tandem/follow-up-complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    throw new Error(`Provider follow-up completion writeback failed: ${res.status}`)
  }
}
