import { describe, expect, it } from 'vitest'
import { buildAggregationContextNote } from '@/panels/aggregationContext'

describe('aggregationContext', () => {
  it('builds a bundle review note with summary and recommended action', () => {
    const note = buildAggregationContextNote('', {
      aggregation_bundle_id: 'bundle-1',
      bundle_label: 'Three related provider replies',
      bundle_kind: 'duplicate_family',
      member_count: 3,
      summary_text: 'Likely duplicate replies to the same provider escalation',
      recommended_next_action: 'route_to_orchestrator',
    })

    expect(note).toContain('Bundle review focus: Three related provider replies')
    expect(note).toContain('Bundle kind: duplicate_family')
    expect(note).toContain('Member count: 3')
    expect(note).toContain(
      'Summary: Likely duplicate replies to the same provider escalation'
    )
    expect(note).toContain('Recommended next action: route_to_orchestrator')
  })

  it('does not duplicate the same bundle review block', () => {
    const first = buildAggregationContextNote('', {
      aggregation_bundle_id: 'bundle-2',
      bundle_label: 'Grouped customer follow-ups',
      bundle_kind: 'customer_thread',
      member_count: 2,
      summary_text: '',
      recommended_next_action: '',
    })

    const second = buildAggregationContextNote(first, {
      aggregation_bundle_id: 'bundle-2',
      bundle_label: 'Grouped customer follow-ups',
      bundle_kind: 'customer_thread',
      member_count: 2,
      summary_text: '',
      recommended_next_action: '',
    })

    expect(second).toBe(first)
  })
})
