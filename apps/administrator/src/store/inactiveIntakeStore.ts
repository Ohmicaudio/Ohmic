import { create } from 'zustand'
import type {
  InactiveFilterPresetRow,
  InactiveIntakeItem,
  InactiveIntakeStatus,
  ReopenInactiveIntakeResponse,
} from '@/types/intake'
import { fetchInactiveIntake, fetchInactiveIntakeShell } from '@/api/projections'
import { reopenInactiveIntake } from '@/api/inactive'

export type InactiveFilterPreset =
  | 'inactive_all'
  | 'archived_only'
  | 'routed_only'
  | 'held_only'
  | 'waiting_only'

export const DEFAULT_INACTIVE_FILTERS: InactiveFilterPresetRow[] = [
  {
    preset_id: 'inactive_all',
    display_label: 'All Inactive',
    included_statuses: ['archived', 'routed', 'held', 'waiting_on_human', 'waiting_on_provider'],
    default_sort: 'inactive_since_desc',
  },
  {
    preset_id: 'archived_only',
    display_label: 'Archived',
    included_statuses: ['archived'],
    default_sort: 'inactive_since_desc',
  },
  {
    preset_id: 'routed_only',
    display_label: 'Routed',
    included_statuses: ['routed'],
    default_sort: 'inactive_since_desc',
  },
  {
    preset_id: 'held_only',
    display_label: 'Held',
    included_statuses: ['held'],
    default_sort: 'inactive_since_desc',
  },
  {
    preset_id: 'waiting_only',
    display_label: 'Waiting',
    included_statuses: ['waiting_on_human', 'waiting_on_provider'],
    default_sort: 'inactive_since_desc',
  },
]

interface InactiveIntakeState {
  items: InactiveIntakeItem[]
  count: number
  generatedAt: string | null
  loading: boolean
  error: string | null
  reopeningId: string | null
  activeFilter: InactiveFilterPreset
  filterPresets: InactiveFilterPresetRow[]
  shellAvailable: boolean
  fetch: () => Promise<void>
  setFilter: (filter: InactiveFilterPreset) => void
  reopen: (intakeId: string, restoredStatus?: string) => Promise<ReopenInactiveIntakeResponse>
}

export const useInactiveIntakeStore = create<InactiveIntakeState>((set) => ({
  items: [],
  count: 0,
  generatedAt: null,
  loading: false,
  error: null,
  reopeningId: null,
  activeFilter: 'inactive_all',
  filterPresets: DEFAULT_INACTIVE_FILTERS,
  shellAvailable: false,

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      try {
        const shell = await fetchInactiveIntakeShell()
        const nextFilter = (shell.metadata?.active_filter_preset ?? 'inactive_all') as InactiveFilterPreset

        set({
          items: shell.rows,
          count: shell.row_count,
          generatedAt: shell.generated_at,
          loading: false,
          error: null,
          activeFilter: nextFilter,
          filterPresets: shell.filter_presets,
          shellAvailable: true,
        })
        return
      } catch (shellError) {
        const message =
          shellError instanceof Error ? shellError.message : 'Failed to load inactive shell'
        const isMissingShell = message.includes('404')
        if (!isMissingShell) {
          throw shellError
        }
      }

      const data = await fetchInactiveIntake()
      set({
        items: data.inactive_items,
        count: data.count,
        generatedAt: data.generated_at,
        loading: false,
        error: null,
        filterPresets: DEFAULT_INACTIVE_FILTERS,
        shellAvailable: false,
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
        filterPresets: DEFAULT_INACTIVE_FILTERS,
        shellAvailable: false,
      })
    }
  },

  setFilter: (filter) => set({ activeFilter: filter }),

  reopen: async (intakeId, restoredStatus) => {
    set({ reopeningId: intakeId, error: null })
    try {
      const response = await reopenInactiveIntake({
        intake_id: intakeId,
        restored_status: restoredStatus,
      })

      if (response.writeback.writeback_status === 'accepted') {
        set((state) => ({
          reopeningId: null,
          items: state.items.filter((item) => item.intake_id !== intakeId),
          count: Math.max(0, state.count - 1),
          generatedAt: new Date().toISOString(),
        }))
      } else {
        set({
          reopeningId: null,
          error: response.writeback.rejection_reason ?? 'Reopen was rejected',
        })
      }

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reopen inactive intake'
      set({
        reopeningId: null,
        error: message,
      })
      throw err
    }
  },
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
