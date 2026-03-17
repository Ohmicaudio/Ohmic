import { describe, expect, it } from 'vitest'
import { buildWarningReviewContextNote } from '@/panels/warningReviewContext'

describe('warningReviewContext', () => {
  it('builds a warning review note block with key warning details', () => {
    const note = buildWarningReviewContextNote('', {
      intake_id: 'warn-1',
      primary_warning_family: 'parse_confidence',
      warning_reasons: ['body_parse_failed', 'attachment_missing_preview'],
      parse_confidence: 'low',
      reprocess_eligible: true,
      latest_reprocess_status: 'not_attempted',
      recommended_next_action: 'request_approval',
    })

    expect(note).toContain('Warning review focus: warn-1')
    expect(note).toContain('Primary warning family: parse_confidence')
    expect(note).toContain(
      'Warning reasons: body_parse_failed, attachment_missing_preview'
    )
    expect(note).toContain('Parse confidence: low')
    expect(note).toContain('Reprocess: eligible (not_attempted)')
    expect(note).toContain('Recommended next action: request_approval')
  })

  it('does not duplicate the same warning review block twice', () => {
    const first = buildWarningReviewContextNote('', {
      intake_id: 'warn-2',
      primary_warning_family: 'provider_gap',
      warning_reasons: ['provider_reference_missing'],
      parse_confidence: 'medium',
      reprocess_eligible: false,
      latest_reprocess_status: 'not_eligible',
      recommended_next_action: '',
    })

    const second = buildWarningReviewContextNote(first, {
      intake_id: 'warn-2',
      primary_warning_family: 'provider_gap',
      warning_reasons: ['provider_reference_missing'],
      parse_confidence: 'medium',
      reprocess_eligible: false,
      latest_reprocess_status: 'not_eligible',
      recommended_next_action: '',
    })

    expect(second).toBe(first)
  })
})
