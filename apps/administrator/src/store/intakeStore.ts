import { create } from 'zustand'
import type { IntakeQueueItem } from '@/types/intake'
import { fetchIntakeQueue } from '@/api/projections'

interface IntakeState {
  items: IntakeQueueItem[]
  count: number
  generatedAt: string | null
  loading: boolean
  error: string | null
  selectedId: string | null

  fetch: () => Promise<void>
  select: (intakeId: string | null) => void
}

export const useIntakeStore = create<IntakeState>((set) => ({
  items: [],
  count: 0,
  generatedAt: null,
  loading: false,
  error: null,
  selectedId: null,

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data = await fetchIntakeQueue()
      set({
        items: data.queue_items,
        count: data.count,
        generatedAt: data.generated_at,
        loading: false,
      })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to load intake queue',
        loading: false,
      })
    }
  },

  select: (intakeId) => set({ selectedId: intakeId }),
}))
