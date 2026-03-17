import { create } from 'zustand'
import { fetchTandemStatus } from '@/api/tandem'

interface TandemState {
  configured: boolean
  available: boolean
  mode: 'unconfigured' | 'configured'
  baseUrl: string | null
  sessionLabel: string | null
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
  baseUrl: null,
  sessionLabel: null,
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
        baseUrl: data.base_url,
        sessionLabel: data.session_label,
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
