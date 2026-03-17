import { create } from 'zustand'
import type { FilingHistoryItem } from '@/types/intake'
import { fetchFilingHistoryProjection } from '@/api/projections'

interface FilingHistoryState {
  items: FilingHistoryItem[]
  generatedAt: string | null
  loading: boolean
  error: string | null
  available: boolean
  fetch: () => Promise<void>
}

export const useFilingHistoryStore = create<FilingHistoryState>((set) => ({
  items: [],
  generatedAt: null,
  loading: false,
  error: null,
  available: false,

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data = await fetchFilingHistoryProjection()
      set({
        items: data.filing_history,
        generatedAt: data.generated_at,
        loading: false,
        error: null,
        available: true,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load filing history'
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
