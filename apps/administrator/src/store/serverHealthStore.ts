import { create } from 'zustand'
import { fetchAdministratorHealth } from '@/api/health'
import type { AdministratorHealthStatus } from '@/types/health'

interface ServerHealthState {
  status: 'ok' | 'error' | 'unknown'
  uptime: number | null
  runtimeDir: string | null
  expectedProjections: string[]
  loadedProjections: string[]
  missingProjections: string[]
  loading: boolean
  error: string | null
  fetch: () => Promise<void>
}

export const useServerHealthStore = create<ServerHealthState>((set) => ({
  status: 'unknown',
  uptime: null,
  runtimeDir: null,
  expectedProjections: [],
  loadedProjections: [],
  missingProjections: [],
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
        expectedProjections: data.expected_projections,
        loadedProjections: data.loaded_projections,
        missingProjections: data.missing_projections,
        loading: false,
      })
    } catch (err) {
      set({
        status: 'error',
        expectedProjections: [],
        loadedProjections: [],
        missingProjections: [],
        error: err instanceof Error ? err.message : 'Failed to load health status',
        loading: false,
      })
    }
  },
}))
