import { create } from 'zustand'
import { fetchActiveClaims, fetchReadyTasks } from '@/api/projections'
import type { ActiveClaimItem, ReadyTask } from '@/types/intake'

interface QueueActivityState {
  generatedAt: string | null
  readyTasks: ReadyTask[]
  readyCount: number
  activeClaims: ActiveClaimItem[]
  activeClaimCount: number
  loading: boolean
  error: string | null
  fetch: () => Promise<void>
}

export const useQueueActivityStore = create<QueueActivityState>((set) => ({
  generatedAt: null,
  readyTasks: [],
  readyCount: 0,
  activeClaims: [],
  activeClaimCount: 0,
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const [ready, active] = await Promise.all([fetchReadyTasks(), fetchActiveClaims()])
      const generatedAt =
        ready.generated_at > active.generated_at ? ready.generated_at : active.generated_at

      set({
        generatedAt,
        readyTasks: ready.tasks,
        readyCount: ready.count,
        activeClaims: active.claims,
        activeClaimCount: active.count,
        loading: false,
        error: null,
      })
    } catch (err) {
      set({
        generatedAt: null,
        readyTasks: [],
        readyCount: 0,
        activeClaims: [],
        activeClaimCount: 0,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load queue activity',
      })
    }
  },
}))
