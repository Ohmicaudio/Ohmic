import { describe, expect, it } from 'vitest'
import { selectRecentTandemLaunches } from '@/panels/tandemHistory'

describe('selectRecentTandemLaunches', () => {
  it('returns only provider handoff events', () => {
    const rows = [
      {
        event_id: 'a',
        event_family: 'provider_handoff',
        intake_id: 'intake-1',
        summary_label: 'Opened Tandem handoff',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T20:00:00Z',
        status_delta: '',
        target_label: 'Gmail support inbox',
      },
      {
        event_id: 'b',
        event_family: 'status_transition',
        intake_id: 'intake-2',
        summary_label: 'Queued',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T20:01:00Z',
        status_delta: 'new -> queued',
        target_label: 'orchestrator',
      },
      {
        event_id: 'c',
        event_family: 'provider_handoff',
        intake_id: 'intake-3',
        summary_label: 'Opened Tandem handoff',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T20:02:00Z',
        status_delta: 'attachment_review',
        target_label: 'GitHub issues queue',
      },
    ]

    expect(selectRecentTandemLaunches(rows)).toEqual([rows[0], rows[2]])
  })

  it('limits the number of returned handoff events', () => {
    const rows = Array.from({ length: 5 }, (_, index) => ({
      event_id: `evt-${index + 1}`,
      event_family: 'provider_handoff',
      intake_id: `intake-${index + 1}`,
      summary_label: 'Opened Tandem handoff',
      actor_label: 'operator:d',
      occurred_at: `2026-03-17T20:0${index}:00Z`,
      status_delta: '',
      target_label: `target-${index + 1}`,
    }))

    expect(selectRecentTandemLaunches(rows, 2)).toEqual(rows.slice(0, 2))
  })
})
