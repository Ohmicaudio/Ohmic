import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAttachmentPreviewStore } from '@/store/attachmentPreviewStore'
import { fetchAttachmentPreviewProjection } from '@/api/projections'

vi.mock('@/api/projections', () => ({
  fetchAttachmentPreviewProjection: vi.fn(),
}))

describe('attachmentPreviewStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAttachmentPreviewStore.setState({
      items: [],
      generatedAt: null,
      loading: false,
      error: null,
      available: false,
    })
  })

  it('loads the optional attachment preview module when present', async () => {
    vi.mocked(fetchAttachmentPreviewProjection).mockResolvedValue({
      module_id: 'administrator_attachment_preview',
      generated_at: '2026-03-17T15:55:00Z',
      row_count: 1,
      filter_presets: [],
      empty_state: {
        title: 'No previews',
        body: 'Preview refs will appear here',
      },
      rows: [
        {
          preview_ref_id: 'preview-1',
          asset_id: 'asset-1',
          preview_kind: 'pdf',
          availability: 'ready',
          preview_url: 'https://example.com/preview.pdf',
          fallback_label: 'Provider quote PDF',
          failure_reason: '',
          review_handoff_action: null,
        },
      ],
    })

    await useAttachmentPreviewStore.getState().fetch()

    expect(useAttachmentPreviewStore.getState()).toMatchObject({
      available: true,
      loading: false,
      error: null,
    })
    expect(useAttachmentPreviewStore.getState().items).toHaveLength(1)
  })

  it('treats a missing attachment preview module as an optional surface', async () => {
    vi.mocked(fetchAttachmentPreviewProjection).mockRejectedValue(
      new Error('Projection fetch failed: 404')
    )

    await useAttachmentPreviewStore.getState().fetch()

    expect(useAttachmentPreviewStore.getState()).toMatchObject({
      available: false,
      loading: false,
      error: null,
      items: [],
    })
  })
})
