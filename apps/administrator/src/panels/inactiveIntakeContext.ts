import type { InactiveIntakeItem } from '@/types/intake'

export function buildInactiveIntakeContextNote(
  existingNote: string,
  item: Pick<
    InactiveIntakeItem,
    | 'intake_id'
    | 'inactive_status'
    | 'last_active_status'
    | 'reopen_target_status'
    | 'summary_label'
  >
): string {
  const header = `Inactive intake focus: ${item.intake_id}`
  if (existingNote.includes(header)) {
    return existingNote
  }

  const lines = [
    header,
    `Inactive status: ${item.inactive_status || '--'}`,
    `Last active status: ${item.last_active_status || '--'}`,
    `Reopen target status: ${item.reopen_target_status || '--'}`,
  ]

  if (item.summary_label) {
    lines.push(`Summary: ${item.summary_label}`)
  }

  const nextBlock = lines.join('\n')
  if (!existingNote.trim()) {
    return nextBlock
  }

  return `${existingNote.trim()}\n\n${nextBlock}`
}
