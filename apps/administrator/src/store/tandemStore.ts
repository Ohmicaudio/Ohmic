import { create } from 'zustand'
import { fetchTandemStatus } from '@/api/tandem'

interface TandemState {
  configured: boolean
  available: boolean
  mode: 'unconfigured' | 'configured'
  sessionState: 'missing' | 'idle' | 'attached'
  baseUrl: string | null
  sessionLabel: string | null
  activeTargetLabel: string | null
  launchUrl: string | null
  message: string | null
  loading: boolean
  error: string | null
  fetch: () => Promise<void>
}

export const useTandemStore = create<TandemState>((set) => ({
  configured: false,
  available: false,
  mode: 'unconfigured',
  sessionState: 'missing',
  baseUrl: null,
  sessionLabel: null,
  activeTargetLabel: null,
  launchUrl: null,
  message: null,
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data = await fetchTandemStatus()
      set({
        configured: data.configured,
        available: data.available,
        mode: data.mode,
        sessionState: data.session_state,
        baseUrl: data.base_url,
        sessionLabel: data.session_label,
        activeTargetLabel: data.active_target_label,
        launchUrl: data.launch_url,
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
