import type { AggregationPanelItem } from '@/types/intake'

export function buildAggregationContextNote(
  existingNote: string,
  item: Pick<
    AggregationPanelItem,
    | 'aggregation_bundle_id'
    | 'bundle_label'
    | 'bundle_kind'
    | 'member_count'
    | 'summary_text'
    | 'recommended_next_action'
  >
): string {
  const header = `Bundle review focus: ${item.bundle_label || item.aggregation_bundle_id}`
  if (existingNote.includes(header)) {
    return existingNote
  }

  const lines = [
    header,
    `Bundle kind: ${item.bundle_kind || 'bundle'}`,
    `Member count: ${item.member_count}`,
  ]

  if (item.summary_text) {
    lines.push(`Summary: ${item.summary_text}`)
  }

  if (item.recommended_next_action) {
    lines.push(`Recommended next action: ${item.recommended_next_action}`)
  }

  const nextBlock = lines.join('\n')
  if (!existingNote.trim()) {
    return nextBlock
  }

  return `${existingNote.trim()}\n\n${nextBlock}`
}
