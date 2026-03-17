import { describe, expect, it } from 'vitest'
import { buildInactiveIntakeContextNote } from '@/panels/inactiveIntakeContext'

describe('inactiveIntakeContext', () => {
  it('builds inactive intake context with reopen details', () => {
    const note = buildInactiveIntakeContextNote('', {
      intake_id: 'inactive-1',
      inactive_status: 'archived',
      last_active_status: 'triaging',
      reopen_target_status: 'queued',
      summary_label: 'Archived after duplicate confirmation',
    })

    expect(note).toContain('Inactive intake focus: inactive-1')
    expect(note).toContain('Inactive status: archived')
    expect(note).toContain('Last active status: triaging')
    expect(note).toContain('Reopen target status: queued')
    expect(note).toContain('Summary: Archived after duplicate confirmation')
  })

  it('does not duplicate the same inactive context block', () => {
    const first = buildInactiveIntakeContextNote('', {
      intake_id: 'inactive-2',
      inactive_status: 'routed',
      last_active_status: 'queued',
      reopen_target_status: 'queued',
      summary_label: '',
    })

    const second = buildInactiveIntakeContextNote(first, {
      intake_id: 'inactive-2',
      inactive_status: 'routed',
      last_active_status: 'queued',
      reopen_target_status: 'queued',
      summary_label: '',
    })

    expect(second).toBe(first)
  })
})
