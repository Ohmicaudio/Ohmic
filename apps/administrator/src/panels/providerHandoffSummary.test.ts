import { describe, expect, it } from 'vitest'
import {
  buildProviderFollowUpLookup,
  buildProviderFollowUpQueue,
  buildProviderHandoffSummary,
  buildProviderTargetTrendCards,
  groupProviderHandoffsByTarget,
} from '@/panels/providerHandoffSummary'

describe('providerHandoffSummary', () => {
  const nowMs = Date.parse('2026-03-18T12:00:00Z')
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
      event_id: 'evt-3b',
      event_family: 'provider_follow_up',
      intake_id: 'intake-3',
      summary_label: 'Completed provider follow-up',
      actor_label: 'operator:d',
      occurred_at: '2026-03-18T09:00:00Z',
      status_delta: 'completed',
      target_label: 'Gmail support inbox',
      target_preset_id: 'gmail-support',
      launch_url: 'http://127.0.0.1:8765/?targetPreset=gmail-support',
      attachment_id: '',
      handoff_note: 'Provider replied.',
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
    expect(buildProviderHandoffSummary(rows, nowMs)).toEqual({
      totalCount: 3,
      attachmentReviewCount: 1,
      uniqueTargetCount: 2,
      unresolvedCount: 2,
      staleFollowUpCount: 2,
      latestOccurredAt: '2026-03-17T12:00:00Z',
    })
  })

  it('groups provider handoffs by target label', () => {
    expect(
      groupProviderHandoffsByTarget(rows, 'Gmail support inbox', 'attached', 3, nowMs)
    ).toEqual([
      {
        targetLabel: 'GitHub issues queue',
        count: 1,
        unresolvedCount: 1,
        latestOccurredAt: '2026-03-17T11:00:00Z',
        oldestOutstandingAt: '2026-03-17T11:00:00Z',
        ageBand: 'stale',
        ageLabel: 'Stale',
        status: 'attention',
        statusLabel: 'Needs follow-up',
        requiresFollowUp: true,
      },
      {
        targetLabel: 'Gmail support inbox',
        count: 2,
        unresolvedCount: 1,
        latestOccurredAt: '2026-03-17T12:00:00Z',
        oldestOutstandingAt: '2026-03-17T10:00:00Z',
        ageBand: 'stale',
        ageLabel: 'Stale',
        status: 'attached',
        statusLabel: 'Attached',
        requiresFollowUp: true,
      },
    ])
  })

  it('builds a provider follow-up queue ordered by priority and recency', () => {
    expect(
      buildProviderFollowUpQueue(rows, [
        {
          intake_id: 'intake-1',
          title: 'Provider handoff one',
          intake_kind: 'manual',
          received_at: '2026-03-17T09:30:00Z',
          status: 'triaging',
          routing_target: '',
          trust_tier: '2',
          priority_hint: 'high',
          tags: [],
          warning_state: 'clean',
          warning_count: 0,
          summary_label: 'Provider handoff one',
        },
        {
          intake_id: 'intake-2',
          title: 'Attachment needs review',
          intake_kind: 'manual',
          received_at: '2026-03-17T10:30:00Z',
          status: 'triaging',
          routing_target: '',
          trust_tier: '2',
          priority_hint: 'high',
          tags: [],
          warning_state: 'clean',
          warning_count: 0,
          summary_label: 'Attachment needs review',
        },
        {
          intake_id: 'intake-3',
          title: 'Provider handoff three',
          intake_kind: 'manual',
          received_at: '2026-03-17T11:30:00Z',
          status: 'triaging',
          routing_target: '',
          trust_tier: '2',
          priority_hint: 'high',
          tags: [],
          warning_state: 'clean',
          warning_count: 0,
          summary_label: 'Provider handoff three',
        },
      ], 5, nowMs)
    ).toEqual([
      {
        intakeId: 'intake-2',
        intakeTitle: 'Attachment needs review',
        targetLabel: 'GitHub issues queue',
        targetPresetId: 'github-bugs',
        occurredAt: '2026-03-17T11:00:00Z',
        launchUrl: 'http://127.0.0.1:8765/?targetPreset=github-bugs',
        attachmentId: 'asset-7',
        handoffNote: 'Need screenshot review.',
        priority: 'needs_attachment_review',
        priorityLabel: 'Needs attachment review',
        ageBand: 'stale',
        ageLabel: 'Stale',
      },
      {
        intakeId: 'intake-1',
        intakeTitle: 'Provider handoff one',
        targetLabel: 'Gmail support inbox',
        targetPresetId: 'gmail-support',
        occurredAt: '2026-03-17T10:00:00Z',
        launchUrl: 'http://127.0.0.1:8765/?targetPreset=gmail-support',
        attachmentId: null,
        handoffNote: '',
        priority: 'follow_up_pending',
        priorityLabel: 'Follow-up pending',
        ageBand: 'stale',
        ageLabel: 'Stale',
      },
    ])
  })

  it('supports alternate sort modes for the follow-up queue', () => {
    const queue = buildProviderFollowUpQueue(
      rows,
      [
        {
          intake_id: 'intake-1',
          title: 'Provider handoff one',
          intake_kind: 'manual',
          received_at: '2026-03-17T09:30:00Z',
          status: 'triaging',
          routing_target: '',
          trust_tier: '2',
          priority_hint: 'high',
          tags: [],
          warning_state: 'clean',
          warning_count: 0,
          summary_label: 'Provider handoff one',
        },
        {
          intake_id: 'intake-2',
          title: 'Attachment needs review',
          intake_kind: 'manual',
          received_at: '2026-03-17T10:30:00Z',
          status: 'triaging',
          routing_target: '',
          trust_tier: '2',
          priority_hint: 'high',
          tags: [],
          warning_state: 'clean',
          warning_count: 0,
          summary_label: 'Attachment needs review',
        },
      ],
      5,
      nowMs,
      'target'
    )

    expect(queue.map((item) => item.targetLabel)).toEqual([
      'GitHub issues queue',
      'Gmail support inbox',
    ])
  })

  it('builds a provider follow-up lookup for active intake workload badges', () => {
    const lookup = buildProviderFollowUpLookup(
      rows,
      [
        {
          intake_id: 'intake-1',
          title: 'Provider handoff one',
          intake_kind: 'manual',
          received_at: '2026-03-17T09:30:00Z',
          status: 'triaging',
          routing_target: '',
          trust_tier: '2',
          priority_hint: 'high',
          tags: [],
          warning_state: 'clean',
          warning_count: 0,
          summary_label: 'Provider handoff one',
        },
        {
          intake_id: 'intake-2',
          title: 'Attachment needs review',
          intake_kind: 'manual',
          received_at: '2026-03-17T10:30:00Z',
          status: 'triaging',
          routing_target: '',
          trust_tier: '2',
          priority_hint: 'high',
          tags: [],
          warning_state: 'clean',
          warning_count: 0,
          summary_label: 'Attachment needs review',
        },
      ],
      nowMs
    )

    expect(lookup.get('intake-2')?.priority).toBe('needs_attachment_review')
    expect(lookup.get('intake-1')?.ageBand).toBe('stale')
    expect(lookup.has('intake-3')).toBe(false)
  })

  it('keeps a reopened follow-up visible after a completion event', () => {
    const reopenedRows = [
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
        event_family: 'provider_follow_up',
        intake_id: 'intake-1',
        summary_label: 'Completed provider follow-up',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T11:00:00Z',
        status_delta: 'completed',
        target_label: 'Gmail support inbox',
        target_preset_id: 'gmail-support',
        launch_url: '',
        attachment_id: '',
        handoff_note: 'Provider closed the loop.',
      },
      {
        event_id: 'evt-3',
        event_family: 'provider_handoff',
        intake_id: 'intake-1',
        summary_label: 'Reopened provider follow-up',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T12:00:00Z',
        status_delta: 'reopened_follow_up',
        target_label: 'Gmail support inbox',
        target_preset_id: 'gmail-support',
        launch_url: '',
        attachment_id: '',
        handoff_note: 'Need another pass.',
      },
    ]

    expect(
      buildProviderFollowUpQueue(
        reopenedRows,
        [
          {
            intake_id: 'intake-1',
            title: 'Provider handoff one',
            intake_kind: 'manual',
            received_at: '2026-03-17T09:30:00Z',
            status: 'triaging',
            routing_target: '',
            trust_tier: '2',
            priority_hint: 'high',
            tags: [],
            warning_state: 'clean',
            warning_count: 0,
            summary_label: 'Provider handoff one',
          },
        ],
        5,
        nowMs
      )
    ).toHaveLength(1)
  })

  it('builds target trend cards from provider activity', () => {
    expect(buildProviderTargetTrendCards(rows, 2)).toEqual([
      {
        targetLabel: 'Gmail support inbox',
        unresolvedCount: 2,
        completedCount: 1,
        attachmentReviewCount: 0,
        latestOccurredAt: '2026-03-18T09:00:00Z',
        trend: 'rising',
        trendLabel: 'Rising load',
      },
      {
        targetLabel: 'GitHub issues queue',
        unresolvedCount: 1,
        completedCount: 0,
        attachmentReviewCount: 1,
        latestOccurredAt: '2026-03-17T11:00:00Z',
        trend: 'rising',
        trendLabel: 'Rising load',
      },
    ])
  })
})
