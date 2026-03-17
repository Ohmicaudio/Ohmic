import type {
  AdministratorNoteProjection,
  AdministratorTagAssignmentProjection,
  DashboardStatusCards,
  InactiveIntakeProjection,
  IntakeQueueProjection,
  ReadyTasksProjection,
  WarningReviewProjection,
} from '@/types/intake'

const API_BASE = '/api'

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) {
    throw new Error(`Projection fetch failed: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export async function fetchDashboardCards(): Promise<DashboardStatusCards> {
  return fetchJson<DashboardStatusCards>('/projections/dashboard_status_cards')
}

export async function fetchIntakeQueue(): Promise<IntakeQueueProjection> {
  return fetchJson<IntakeQueueProjection>('/projections/administrator_intake_queue')
}

export async function fetchInactiveIntake(): Promise<InactiveIntakeProjection> {
  return fetchJson<InactiveIntakeProjection>(
    '/projections/administrator_inactive_intake_projection'
  )
}

export async function fetchNoteProjection(): Promise<AdministratorNoteProjection> {
  return fetchJson<AdministratorNoteProjection>('/projections/administrator_note_projection')
}

export async function fetchTagAssignmentProjection(): Promise<AdministratorTagAssignmentProjection> {
  return fetchJson<AdministratorTagAssignmentProjection>(
    '/projections/administrator_tag_assignment_projection'
  )
}

export async function fetchWarningReviewProjection(): Promise<WarningReviewProjection> {
  return fetchJson<WarningReviewProjection>('/projections/administrator_warning_review')
}

export async function fetchReadyTasks(): Promise<ReadyTasksProjection> {
  return fetchJson<ReadyTasksProjection>('/projections/ready_tasks')
}

// SSE stream for live updates.
export function subscribeToUpdates(
  onUpdate: (projectionName: string) => void
): () => void {
  const source = new EventSource(`${API_BASE}/projections/stream`)

  source.addEventListener('projection_changed', (event) => {
    try {
      const data = JSON.parse(event.data) as { name: string }
      onUpdate(data.name)
    } catch {
      // Ignore malformed events.
    }
  })

  source.onerror = () => {
    // EventSource auto-reconnects.
  }

  return () => source.close()
}
