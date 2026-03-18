import type {
  ClaimReadyTaskResponse,
  CompleteClaimResponse,
  ReadyTask,
} from '@/types/intake'

const API_BASE = '/api'

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Queue action failed: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export async function claimQueueTask(task: ReadyTask): Promise<ClaimReadyTaskResponse> {
  return postJson<ClaimReadyTaskResponse>('/queue/claim', task)
}

export async function completeQueueClaim(claimId: string): Promise<CompleteClaimResponse> {
  return postJson<CompleteClaimResponse>('/queue/complete-claim', {
    claim_id: claimId,
  })
}
