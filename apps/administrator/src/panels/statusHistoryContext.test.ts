import { describe, expect, it } from 'vitest'
import { buildStatusHistoryContextNote } from '@/panels/statusHistoryContext'

describe('statusHistoryContext', () => {
  it('builds a status history note block with transition details', () => {
    const note = buildStatusHistoryContextNote('', {
      changed_at: '2026-03-17T17:00:00Z',
      previous_status: 'triaging',
      new_status: 'pending_approval',
      actor_label: 'operator:d',
      transition_reason: 'Escalated for manual approval.',
    })

    expect(note).toContain('Status history focus: pending_approval @ 2026-03-17T17:00:00Z')
    expect(note).toContain('Transition: triaging -> pending_approval')
    expect(note).toContain('Actor: operator:d')
    expect(note).toContain('Reason: Escalated for manual approval.')
  })

  it('does not duplicate the same status history block', () => {
    const first = buildStatusHistoryContextNote('', {
      changed_at: '2026-03-17T17:10:00Z',
      previous_status: 'archived',
      new_status: 'queued',
      actor_label: 'operator:d',
      transition_reason: 'Reopened after review.',
    })

    const second = buildStatusHistoryContextNote(first, {
      changed_at: '2026-03-17T17:10:00Z',
      previous_status: 'archived',
      new_status: 'queued',
      actor_label: 'operator:d',
      transition_reason: 'Reopened after review.',
    })

    expect(second).toBe(first)
  })
})
