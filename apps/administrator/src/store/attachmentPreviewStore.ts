import { create } from 'zustand'
import type { AttachmentPreviewItem } from '@/types/intake'
import { fetchAttachmentPreviewProjection } from '@/api/projections'

interface AttachmentPreviewState {
  items: AttachmentPreviewItem[]
  generatedAt: string | null
  loading: boolean
  error: string | null
  available: boolean
  fetch: () => Promise<void>
}

export const useAttachmentPreviewStore = create<AttachmentPreviewState>((set) => ({
  items: [],
  generatedAt: null,
  loading: false,
  error: null,
  available: false,

  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data = await fetchAttachmentPreviewProjection()
      set({
        items: data.rows,
        generatedAt: data.generated_at,
        loading: false,
        error: null,
        available: true,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load attachment preview'
      const isMissingProjection = message.includes('404')

      set({
        items: [],
        generatedAt: null,
        loading: false,
        error: isMissingProjection ? null : message,
        available: !isMissingProjection,
      })
    }
  },
}))
