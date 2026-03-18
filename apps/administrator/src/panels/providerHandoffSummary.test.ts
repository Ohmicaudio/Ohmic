import { describe, expect, it } from 'vitest'
import {
  buildProviderHandoffSummary,
  groupProviderHandoffsByTarget,
} from '@/panels/providerHandoffSummary'

describe('providerHandoffSummary', () => {
  const rows = [
    {
      event_id: 'evt-1',
      event_family: 'provider_handoff',
      intake_id: 'intake-1',
      summary_label: 'Opened Tandem handoff',
      actor_label: 'operator:d',
      occurred_at: '2026-03-17T10:00:00Z',
      status_delta: '',
      target_label: 'Gmail support inbox',
      target_preset_id: 'gmail-support',
      launch_url: 'http://127.0.0.1:8765/?targetPreset=gmail-support',
      attachment_id: '',
      handoff_note: '',
    },
    {
      event_id: 'evt-2',
      event_family: 'provider_handoff',
      intake_id: 'intake-2',
      summary_label: 'Opened Tandem handoff',
      actor_label: 'operator:d',
      occurred_at: '2026-03-17T11:00:00Z',
      status_delta: 'attachment_review',
      target_label: 'GitHub issues queue',
      target_preset_id: 'github-bugs',
      launch_url: 'http://127.0.0.1:8765/?targetPreset=github-bugs',
      attachment_id: 'asset-7',
      handoff_note: 'Need screenshot review.',
    },
    {
      event_id: 'evt-3',
      event_family: 'provider_handoff',
      intake_id: 'intake-3',
      summary_label: 'Opened Tandem handoff',
      actor_label: 'operator:d',
      occurred_at: '2026-03-17T12:00:00Z',
      status_delta: '',
      target_label: 'Gmail support inbox',
      target_preset_id: 'gmail-support',
      launch_url: 'http://127.0.0.1:8765/?targetPreset=gmail-support',
      attachment_id: '',
      handoff_note: 'Need provider reply.',
    },
    {
      event_id: 'evt-4',
      event_family: 'status_transition',
      intake_id: 'intake-4',
      summary_label: 'Queued',
      actor_label: 'operator:d',
      occurred_at: '2026-03-17T13:00:00Z',
      status_delta: 'new -> queued',
      target_label: 'orchestrator',
    },
  ]

  it('builds top-level provider handoff metrics', () => {
    expect(buildProviderHandoffSummary(rows)).toEqual({
      totalCount: 3,
      attachmentReviewCount: 1,
      uniqueTargetCount: 2,
      latestOccurredAt: '2026-03-17T12:00:00Z',
    })
  })

  it('groups provider handoffs by target label', () => {
    expect(groupProviderHandoffsByTarget(rows)).toEqual([
      {
        targetLabel: 'Gmail support inbox',
        count: 2,
        latestOccurredAt: '2026-03-17T12:00:00Z',
      },
      {
        targetLabel: 'GitHub issues queue',
        count: 1,
        latestOccurredAt: '2026-03-17T11:00:00Z',
      },
    ])
  })
})
