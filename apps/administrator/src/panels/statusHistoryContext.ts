import type { AdministratorStatusHistoryItem } from '@/types/intake'

export function buildStatusHistoryContextNote(
  existingNote: string,
  entry: Pick<
    AdministratorStatusHistoryItem,
    'changed_at' | 'previous_status' | 'new_status' | 'actor_label' | 'transition_reason'
  >
): string {
  const header = `Status history focus: ${entry.new_status || 'unknown'} @ ${entry.changed_at || '--'}`
  if (existingNote.includes(header)) {
    return existingNote
  }

  const lines = [header]
  if (entry.previous_status) {
    lines.push(`Transition: ${entry.previous_status} -> ${entry.new_status}`)
  } else {
    lines.push(`Current status: ${entry.new_status || '--'}`)
  }
  if (entry.actor_label) {
    lines.push(`Actor: ${entry.actor_label}`)
  }
  if (entry.transition_reason) {
    lines.push(`Reason: ${entry.transition_reason}`)
  }

  const nextBlock = lines.join('\n')
  if (!existingNote.trim()) {
    return nextBlock
  }

  return `${existingNote.trim()}\n\n${nextBlock}`
}
