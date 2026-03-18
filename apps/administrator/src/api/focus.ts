import type {
  AdministratorDeskFocusProjection,
  ActiveClaimItem,
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
    throw new Error(`Desk focus writeback failed: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export async function fetchDeskFocus(): Promise<AdministratorDeskFocusProjection> {
  const res = await fetch(`${API_BASE}/projections/administrator_focus_selection`)
  if (!res.ok) {
    throw new Error(`Desk focus fetch failed: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export async function publishIntakeFocus(
  intakeId: string | null
): Promise<AdministratorDeskFocusProjection> {
  return postJson<AdministratorDeskFocusProjection>('/focus/intake', {
    intake_id: intakeId,
  })
}

export async function publishReadyTaskFocus(
  task: ReadyTask
): Promise<AdministratorDeskFocusProjection> {
  return postJson<AdministratorDeskFocusProjection>('/focus/current-action', {
    focus_kind: 'ready_task',
    task_id: task.task_id,
    title: task.title,
    file_path: task.file_path,
  })
}

export async function publishClaimFocus(
  claim: ActiveClaimItem
): Promise<AdministratorDeskFocusProjection> {
  return postJson<AdministratorDeskFocusProjection>('/focus/current-action', {
    focus_kind: 'claim',
    claim_id: claim.claim_id,
    title: claim.title,
    file_path: claim.file_path,
  })
}
