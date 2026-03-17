export function buildFilingContextNote(
  existingNote: string,
  destinationLabel: string,
  reason?: string
): string {
  const header = `Filing destination: ${destinationLabel}`
  if (existingNote.includes(header)) {
    return existingNote
  }

  const lines = [header]
  if (reason) {
    lines.push(`Filing reason: ${reason}`)
  }

  const nextBlock = lines.join('\n')
  if (!existingNote.trim()) {
    return nextBlock
  }

  return `${existingNote.trim()}\n${nextBlock}`
}
