import { create } from 'zustand'
import type {
  AdministratorTandemPendingHandshake,
  AdministratorTandemTargetHealth,
  AdministratorTandemTargetPreset,
} from '@/types/tandem'
import { fetchTandemStatus } from '@/api/tandem'

interface TandemState {
  configured: boolean
  available: boolean
  mode: 'unconfigured' | 'configured'
  statusSource: 'env' | 'probe'
  probeState: 'unavailable' | 'reachable' | 'error'
  sessionState: 'missing' | 'idle' | 'attached'
  baseUrl: string | null
  sessionLabel: string | null
  activeTargetLabel: string | null
  targetPresets: AdministratorTandemTargetPreset[]
  targetHealth: AdministratorTandemTargetHealth[]
  pendingHandshake: AdministratorTandemPendingHandshake | null
  selectedPresetId: string
  handoffNote: string
  launchUrl: string | null
  probeMessage: string | null
  message: string | null
  loading: boolean
  error: string | null
  setSelectedPreset: (presetId: string) => void
  setHandoffNote: (note: string) => void
  fetch: () => Promise<void>
}

export const useTandemStore = create<TandemState>((set) => ({
  configured: false,
  available: false,
  mode: 'unconfigured',
  statusSource: 'env',
  probeState: 'unavailable',
  sessionState: 'missing',
  baseUrl: null,
  sessionLabel: null,
  activeTargetLabel: null,
  targetPresets: [],
  targetHealth: [],
  pendingHandshake: null,
  selectedPresetId: '',
  handoffNote: '',
  launchUrl: null,
  probeMessage: null,
  message: null,
  loading: false,
  error: null,

  setSelectedPreset: (presetId) => set({ selectedPresetId: presetId }),
  setHandoffNote: (note) => set({ handoffNote: note }),

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data = await fetchTandemStatus()
      const selectedPresetId = useTandemStore.getState().selectedPresetId
      const nextSelectedPresetId =
        selectedPresetId && data.target_presets.some((preset) => preset.preset_id === selectedPresetId)
          ? selectedPresetId
          : data.target_presets[0]?.preset_id ?? ''
      set({
        configured: data.configured,
        available: data.available,
        mode: data.mode,
        statusSource: data.status_source,
        probeState: data.probe_state,
        sessionState: data.session_state,
        baseUrl: data.base_url,
        sessionLabel: data.session_label,
        activeTargetLabel: data.active_target_label,
        targetPresets: data.target_presets,
        targetHealth: data.target_health,
        pendingHandshake: data.pending_handshake,
        selectedPresetId: nextSelectedPresetId,
        launchUrl: data.launch_url,
        probeMessage: data.probe_message ?? null,
        message: data.message,
        loading: false,
        error: null,
      })
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load Tandem status',
      })
    }
  },
}))
