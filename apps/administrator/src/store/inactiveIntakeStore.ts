import { create } from 'zustand'
import type { InactiveIntakeItem, InactiveIntakeStatus } from '@/types/intake'
import { fetchInactiveIntake } from '@/api/projections'

export type InactiveFilterPreset =
  | 'inactive_all'
  | 'archived_only'
  | 'routed_only'
  | 'held_only'
  | 'waiting_only'

interface InactiveIntakeState {
  items: InactiveIntakeItem[]
  count: number
  generatedAt: string | null
  loading: boolean
  error: string | null
  activeFilter: InactiveFilterPreset
  fetch: () => Promise<void>
  setFilter: (filter: InactiveFilterPreset) => void
}

export const useInactiveIntakeStore = create<InactiveIntakeState>((set) => ({
  items: [],
  count: 0,
  generatedAt: null,
  loading: false,
  error: null,
  activeFilter: 'inactive_all',

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data = await fetchInactiveIntake()
      set({
        items: data.inactive_items,
        count: data.count,
        generatedAt: data.generated_at,
        loading: false,
        error: null,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load inactive intake'
      const isMissingProjection = message.includes('404')

      set({
        items: [],
        count: 0,
        generatedAt: null,
        loading: false,
        error: isMissingProjection ? null : message,
      })
    }
  },

  setFilter: (filter) => set({ activeFilter: filter }),
}))

export function matchesInactiveFilter(
  status: InactiveIntakeStatus,
  filter: InactiveFilterPreset
): boolean {
  switch (filter) {
    case 'archived_only':
      return status === 'archived'
    case 'routed_only':
      return status === 'routed'
    case 'held_only':
      return status === 'held'
    case 'waiting_only':
      return status === 'waiting_on_human' || status === 'waiting_on_provider'
    default:
      return true
  }
}
