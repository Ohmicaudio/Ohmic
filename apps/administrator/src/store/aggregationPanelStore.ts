import { create } from 'zustand'
import type { AggregationPanelItem } from '@/types/intake'
import { fetchAggregationPanelProjection } from '@/api/projections'

interface AggregationPanelState {
  items: AggregationPanelItem[]
  generatedAt: string | null
  loading: boolean
  error: string | null
  available: boolean
  fetch: () => Promise<void>
}

export const useAggregationPanelStore = create<AggregationPanelState>((set) => ({
  items: [],
  generatedAt: null,
  loading: false,
  error: null,
  available: false,

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data = await fetchAggregationPanelProjection()
      set({
        items: data.rows,
        generatedAt: data.generated_at,
        loading: false,
        error: null,
        available: true,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load aggregation panel'
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
