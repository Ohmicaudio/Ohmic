import type { AdministratorAuditSummaryItem } from '@/types/intake'

export function deriveAuditFollowUpAction(eventFamily: string): string | null {
  switch (eventFamily) {
    case 'tag':
      return 'tag_item'
    case 'note':
    case 'filing_migration':
    case 'reopen':
    case 'status_transition':
      return 'add_note'
    default:
      return null
  }
}

export function buildAuditFollowUpNote(
  existingNote: string,
  item: Pick<
    AdministratorAuditSummaryItem,
    'event_family' | 'summary_label' | 'target_label' | 'status_delta'
  >
): string {
  const header = `Audit follow-up: ${item.summary_label || item.event_family}`
  if (existingNote.includes(header)) {
    return existingNote
  }

  const lines = [header, `Event family: ${item.event_family || 'unknown'}`]
  if (item.target_label) {
    lines.push(`Target: ${item.target_label}`)
  }
  if (item.status_delta) {
    lines.push(`Status delta: ${item.status_delta}`)
  }

  const nextBlock = lines.join('\n')
  if (!existingNote.trim()) {
    return nextBlock
  }

  return `${existingNote.trim()}\n\n${nextBlock}`
}
