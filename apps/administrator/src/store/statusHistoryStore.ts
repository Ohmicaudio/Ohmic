import { create } from 'zustand'
import type { AdministratorStatusHistoryItem } from '@/types/intake'
import { fetchStatusHistoryProjection } from '@/api/projections'

interface StatusHistoryState {
  items: AdministratorStatusHistoryItem[]
  generatedAt: string | null
  loading: boolean
  error: string | null
  available: boolean
  fetch: () => Promise<void>
}

export const useStatusHistoryStore = create<StatusHistoryState>((set) => ({
  items: [],
  generatedAt: null,
  loading: false,
  error: null,
  available: false,

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data = await fetchStatusHistoryProjection()
      set({
        items: data.rows,
        generatedAt: data.generated_at,
        loading: false,
        error: null,
        available: true,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load status history'
      const isMissingProjection = message.includes('404')

      set({
        items: [],
        generatedAt: null,
        loading: false,
        error: isMissingProjection ? null : message,
        available: !isMissingProjection,
      })
    }
  },
}))
