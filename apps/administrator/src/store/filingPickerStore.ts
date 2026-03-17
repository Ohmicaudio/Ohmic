import { create } from 'zustand'
import type { FilingPickerReadModel } from '@/types/intake'
import { fetchFilingOptions } from '@/api/filing'

interface FilingPickerState {
  model: FilingPickerReadModel | null
  loading: boolean
  error: string | null
  fetch: (intakeId: string | null) => Promise<void>
}

export const useFilingPickerStore = create<FilingPickerState>((set) => ({
  model: null,
  loading: false,
  error: null,

  fetch: async (intakeId) => {
    if (!intakeId) {
      set({ model: null, loading: false, error: null })
      return
    }

    set({ loading: true, error: null })
    try {
      const model = await fetchFilingOptions(intakeId)
      set({ model, loading: false, error: null })
    } catch (err) {
      set({
        model: null,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load filing options',
      })
    }
  },
}))
