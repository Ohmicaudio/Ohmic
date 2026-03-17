import type { AttachmentPreviewItem } from '@/types/intake'

export function buildAttachmentPreviewContextNote(
  existingNote: string,
  item: Pick<
    AttachmentPreviewItem,
    'asset_id' | 'fallback_label' | 'preview_kind' | 'failure_reason' | 'review_handoff_action'
  >
): string {
  const label = item.fallback_label || item.asset_id
  const header = `Attachment preview focus: ${label}`
  if (existingNote.includes(header)) {
    return existingNote
  }

  const lines = [header]
  if (item.preview_kind) {
    lines.push(`Preview kind: ${item.preview_kind}`)
  }
  if (item.failure_reason) {
    lines.push(`Failure reason: ${item.failure_reason}`)
  }
  if (item.review_handoff_action) {
    lines.push(`Review handoff action: ${item.review_handoff_action}`)
  }

  const nextBlock = lines.join('\n')
  if (!existingNote.trim()) {
    return nextBlock
  }

  return `${existingNote.trim()}\n\n${nextBlock}`
}
