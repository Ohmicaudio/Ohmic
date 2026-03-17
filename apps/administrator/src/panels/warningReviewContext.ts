import type { WarningReviewItem } from '@/types/intake'

export function buildWarningReviewContextNote(
  existingNote: string,
  item: Pick<
    WarningReviewItem,
    | 'intake_id'
    | 'primary_warning_family'
    | 'warning_reasons'
    | 'parse_confidence'
    | 'reprocess_eligible'
    | 'latest_reprocess_status'
    | 'recommended_next_action'
  >
): string {
  const header = `Warning review focus: ${item.intake_id}`
  if (existingNote.includes(header)) {
    return existingNote
  }

  const lines = [
    header,
    `Primary warning family: ${item.primary_warning_family || 'warning'}`,
    `Warning reasons: ${
      item.warning_reasons.length > 0 ? item.warning_reasons.join(', ') : 'none recorded'
    }`,
    `Parse confidence: ${item.parse_confidence || '--'}`,
    `Reprocess: ${
      item.reprocess_eligible
        ? `eligible${item.latest_reprocess_status ? ` (${item.latest_reprocess_status})` : ''}`
        : `not eligible${item.latest_reprocess_status ? ` (${item.latest_reprocess_status})` : ''}`
    }`,
  ]

  if (item.recommended_next_action) {
    lines.push(`Recommended next action: ${item.recommended_next_action}`)
  }

  const nextBlock = lines.join('\n')
  if (!existingNote.trim()) {
    return nextBlock
  }

  return `${existingNote.trim()}\n\n${nextBlock}`
}
