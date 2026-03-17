import { create } from 'zustand'
import type {
  AdministratorAuditSummaryItem,
  AuditFilterPreset,
} from '@/types/intake'
import { fetchAuditSummaryProjection } from '@/api/projections'

interface AuditSummaryState {
  items: AdministratorAuditSummaryItem[]
  filterPresets: AuditFilterPreset[]
  activePresetId: string
  generatedAt: string | null
  loading: boolean
  error: string | null
  available: boolean
  setActivePreset: (presetId: string) => void
  fetch: () => Promise<void>
}

export const useAuditSummaryStore = create<AuditSummaryState>((set) => ({
  items: [],
  filterPresets: [],
  activePresetId: 'all_activity',
  generatedAt: null,
  loading: false,
  error: null,
  available: false,

  setActivePreset: (presetId) => set({ activePresetId: presetId }),

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data = await fetchAuditSummaryProjection()
      const defaultPresetId =
        data.metadata?.active_filter_preset ??
        data.filter_presets[0]?.preset_id ??
        'all_activity'

      set({
        items: data.rows,
        filterPresets: data.filter_presets,
        activePresetId: defaultPresetId,
        generatedAt: data.generated_at,
        loading: false,
        error: null,
        available: true,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load audit summary'
      const isMissingProjection = message.includes('404')

      set({
        items: [],
        filterPresets: [],
        activePresetId: 'all_activity',
        generatedAt: null,
        loading: false,
        error: isMissingProjection ? null : message,
        available: !isMissingProjection,
      })
    }
  },
}))
