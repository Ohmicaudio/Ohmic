import type {
  DashboardStatusCards,
  IntakeQueueProjection,
  ReadyTasksProjection,
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
