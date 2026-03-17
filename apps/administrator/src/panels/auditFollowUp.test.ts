import { describe, expect, it } from 'vitest'
import { buildAuditFollowUpNote, deriveAuditFollowUpAction } from '@/panels/auditFollowUp'

describe('auditFollowUp', () => {
  it('maps specialized and general audit families to safe follow-up actions', () => {
    expect(deriveAuditFollowUpAction('tag')).toBe('tag_item')
    expect(deriveAuditFollowUpAction('note')).toBe('add_note')
    expect(deriveAuditFollowUpAction('filing_migration')).toBe('add_note')
    expect(deriveAuditFollowUpAction('reopen')).toBe('add_note')
    expect(deriveAuditFollowUpAction('status_transition')).toBe('add_note')
    expect(deriveAuditFollowUpAction('unknown')).toBeNull()
  })

  it('builds an audit follow-up note with target and status context', () => {
    const note = buildAuditFollowUpNote('', {
      event_family: 'filing_migration',
      summary_label: 'Filing created',
      target_label: 'Customer Archive',
      status_delta: '',
    })

    expect(note).toContain('Audit follow-up: Filing created')
    expect(note).toContain('Event family: filing_migration')
    expect(note).toContain('Target: Customer Archive')
  })

  it('does not duplicate the same audit follow-up block', () => {
    const first = buildAuditFollowUpNote('', {
      event_family: 'reopen',
      summary_label: 'Reopened -> queued',
      target_label: 'queued',
      status_delta: 'archived -> queued',
    })

    const second = buildAuditFollowUpNote(first, {
      event_family: 'reopen',
      summary_label: 'Reopened -> queued',
      target_label: 'queued',
      status_delta: 'archived -> queued',
    })

    expect(second).toBe(first)
  })
})
