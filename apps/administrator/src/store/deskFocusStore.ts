import { create } from 'zustand'
import type {
  AdministratorDeskFocusProjection,
  AdministratorDeskFocusSelection,
} from '@/types/intake'
import { fetchDeskFocus } from '@/api/focus'

interface DeskFocusState {
  generatedAt: string | null
  selection: AdministratorDeskFocusSelection | null
  loading: boolean
  error: string | null
  setProjection: (projection: AdministratorDeskFocusProjection) => void
  fetch: () => Promise<void>
}

export const useDeskFocusStore = create<DeskFocusState>((set) => ({
  generatedAt: null,
  selection: null,
  loading: false,
  error: null,

  setProjection: (projection) =>
    set({
      generatedAt: projection.generated_at,
      selection: projection.selection,
      loading: false,
      error: null,
    }),

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data = await fetchDeskFocus()
      set({
        generatedAt: data.generated_at,
        selection: data.selection,
        loading: false,
        error: null,
      })
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load desk focus',
      })
    }
  },
}))
