import { create } from 'zustand'
import type { FilingPickerReadModel } from '@/types/intake'
import { fetchFilingOptions } from '@/api/filing'

interface FilingPickerState {
  model: FilingPickerReadModel | null
  selectedDestinationId: string | null
  loading: boolean
  error: string | null
  fetch: (intakeId: string | null) => Promise<void>
  setSelectedDestination: (destinationId: string | null) => void
}

export const useFilingPickerStore = create<FilingPickerState>((set) => ({
  model: null,
  selectedDestinationId: null,
  loading: false,
  error: null,

  fetch: async (intakeId) => {
    if (!intakeId) {
      set({ model: null, selectedDestinationId: null, loading: false, error: null })
      return
    }

    set({ loading: true, error: null })
    try {
      const model = await fetchFilingOptions(intakeId)
      const selectedDestinationId =
        model.destinations.find((destination) => destination.is_default)?.filing_destination_id ??
        model.destinations.find((destination) => destination.selectable)?.filing_destination_id ??
        model.destinations[0]?.filing_destination_id ??
        null

      set({ model, selectedDestinationId, loading: false, error: null })
    } catch (err) {
      set({
        model: null,
        selectedDestinationId: null,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load filing options',
      })
    }
  },

  setSelectedDestination: (destinationId) => set({ selectedDestinationId: destinationId }),
}))
