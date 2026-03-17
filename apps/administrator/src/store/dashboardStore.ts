import { create } from 'zustand'
import type { DashboardStatusCards, StatusCard } from '@/types/intake'
import { fetchDashboardCards } from '@/api/projections'

interface DashboardState {
  cards: StatusCard[]
  generatedAt: string | null
  staleness: 'fresh' | 'stale' | 'unknown'
  loading: boolean
  error: string | null
  fetch: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
  cards: [],
  generatedAt: null,
  staleness: 'unknown',
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data: DashboardStatusCards = await fetchDashboardCards()
      set({
        cards: data.cards,
        generatedAt: data.generated_at,
        staleness: data.staleness.status,
        loading: false,
      })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to load dashboard',
        loading: false,
      })
    }
  },
}))
