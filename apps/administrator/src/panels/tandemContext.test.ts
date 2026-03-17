import { describe, expect, it } from 'vitest'
import { buildTandemContextUrl } from '@/panels/tandemContext'

describe('buildTandemContextUrl', () => {
  it('returns null when no launch url exists', () => {
    expect(buildTandemContextUrl(null, null)).toBeNull()
  })

  it('returns the base launch url when no intake is selected', () => {
    expect(buildTandemContextUrl('http://127.0.0.1:8765/?sessionLabel=gmail-triage', null)).toBe(
      'http://127.0.0.1:8765/?sessionLabel=gmail-triage'
    )
  })

  it('adds intake context to the tandem launch url', () => {
    expect(
      buildTandemContextUrl('http://127.0.0.1:8765/?sessionLabel=gmail-triage', {
        intake_id: 'intake-42',
        title: 'Customer mail thread',
        intake_kind: 'email',
        received_at: '2026-03-17T10:00:00Z',
        status: 'triaging',
        routing_target: 'operator',
        trust_tier: '2',
        priority_hint: 'high',
        tags: [],
        warning_state: 'clean',
        warning_count: 0,
        summary_label: 'Customer needs follow-up',
      })
    ).toBe(
      'http://127.0.0.1:8765/?sessionLabel=gmail-triage&intakeId=intake-42&intakeTitle=Customer+mail+thread&routingTarget=operator'
    )
  })
})
