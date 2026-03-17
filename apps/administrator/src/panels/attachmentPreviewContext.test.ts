import { describe, expect, it } from 'vitest'
import { buildAttachmentPreviewContextNote } from '@/panels/attachmentPreviewContext'

describe('attachmentPreviewContext', () => {
  it('builds a preview note with preview and handoff details', () => {
    const note = buildAttachmentPreviewContextNote('', {
      asset_id: 'asset-1',
      fallback_label: 'DSP screenshot',
      preview_kind: 'image',
      failure_reason: '',
      review_handoff_action: 'add_note',
    })

    expect(note).toContain('Attachment preview focus: DSP screenshot')
    expect(note).toContain('Preview kind: image')
    expect(note).toContain('Review handoff action: add_note')
  })

  it('does not duplicate the same attachment preview block', () => {
    const first = buildAttachmentPreviewContextNote('', {
      asset_id: 'asset-2',
      fallback_label: '',
      preview_kind: 'pdf',
      failure_reason: 'preview_not_generated',
      review_handoff_action: 'request_approval',
    })

    const second = buildAttachmentPreviewContextNote(first, {
      asset_id: 'asset-2',
      fallback_label: '',
      preview_kind: 'pdf',
      failure_reason: 'preview_not_generated',
      review_handoff_action: 'request_approval',
    })

    expect(second).toBe(first)
  })
})
