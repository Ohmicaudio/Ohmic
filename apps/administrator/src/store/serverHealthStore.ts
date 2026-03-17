import { create } from 'zustand'
import { fetchAdministratorHealth } from '@/api/health'
import type { AdministratorHealthStatus } from '@/types/health'

interface ServerHealthState {
  status: 'ok' | 'error' | 'unknown'
  uptime: number | null
  runtimeDir: string | null
  loading: boolean
  error: string | null
  fetch: () => Promise<void>
}

export const useServerHealthStore = create<ServerHealthState>((set) => ({
  status: 'unknown',
  uptime: null,
  runtimeDir: null,
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data: AdministratorHealthStatus = await fetchAdministratorHealth()
      set({
        status: data.status,
        uptime: data.uptime,
        runtimeDir: data.runtime_dir,
        loading: false,
      })
    } catch (err) {
      set({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to load health status',
        loading: false,
      })
    }
  },
}))
