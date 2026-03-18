import { describe, expect, it } from 'vitest'
import {
  resolveRecentTandemLaunchSelection,
  selectProviderEventsForIntake,
  selectRecentProviderEvents,
  selectLatestTandemLaunchForIntake,
  selectRecentTandemLaunches,
} from '@/panels/tandemHistory'

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
        target_preset_id: 'gmail-support',
        launch_url: 'http://127.0.0.1:8765/?targetPreset=gmail-support',
        attachment_id: '',
        handoff_note: '',
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
        target_preset_id: 'github-bugs',
        launch_url: 'http://127.0.0.1:8765/?targetPreset=github-bugs',
        attachment_id: 'asset-1',
        handoff_note: 'Need issue reproduction screenshot.',
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
      target_preset_id: `preset-${index + 1}`,
      launch_url: `http://127.0.0.1:8765/?targetPreset=preset-${index + 1}`,
      attachment_id: '',
      handoff_note: '',
    }))

    expect(selectRecentTandemLaunches(rows, 2)).toEqual(rows.slice(0, 2))
  })

  it('returns recent provider events including completions', () => {
    const rows = [
      {
        event_id: 'handoff-1',
        event_family: 'provider_handoff',
        intake_id: 'intake-1',
        summary_label: 'Opened Tandem handoff',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T20:00:00Z',
        status_delta: '',
        target_label: 'Gmail support inbox',
      },
      {
        event_id: 'complete-1',
        event_family: 'provider_follow_up',
        intake_id: 'intake-1',
        summary_label: 'Completed provider follow-up',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T21:00:00Z',
        status_delta: 'completed',
        target_label: 'Gmail support inbox',
      },
      {
        event_id: 'ignored-1',
        event_family: 'status_transition',
        intake_id: 'intake-2',
        summary_label: 'Queued',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T21:01:00Z',
        status_delta: 'new -> queued',
        target_label: 'orchestrator',
      },
    ]

    expect(selectRecentProviderEvents(rows)).toEqual([rows[0], rows[1]])
  })

  it('returns provider timeline items for a selected intake', () => {
    const rows = [
      {
        event_id: 'handoff-1',
        event_family: 'provider_handoff',
        intake_id: 'intake-1',
        summary_label: 'Opened Tandem handoff',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T20:00:00Z',
        status_delta: '',
        target_label: 'Gmail support inbox',
      },
      {
        event_id: 'complete-1',
        event_family: 'provider_follow_up',
        intake_id: 'intake-1',
        summary_label: 'Completed provider follow-up',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T21:00:00Z',
        status_delta: 'completed',
        target_label: 'Gmail support inbox',
      },
      {
        event_id: 'other-1',
        event_family: 'provider_handoff',
        intake_id: 'intake-2',
        summary_label: 'Opened Tandem handoff',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T22:00:00Z',
        status_delta: '',
        target_label: 'GitHub issues queue',
      },
    ]

    expect(selectProviderEventsForIntake(rows, 'intake-1')).toEqual([rows[0], rows[1]])
    expect(selectProviderEventsForIntake(rows, 'missing')).toEqual([])
  })

  it('returns the latest handoff row for the selected intake', () => {
    const rows = [
      {
        event_id: 'evt-1',
        event_family: 'provider_handoff',
        intake_id: 'intake-1',
        summary_label: 'Opened Tandem handoff',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T20:00:00Z',
        status_delta: '',
        target_label: 'Old target',
        target_preset_id: 'old-target',
        launch_url: 'http://127.0.0.1:8765/?targetPreset=old-target',
        attachment_id: '',
        handoff_note: '',
      },
      {
        event_id: 'evt-2',
        event_family: 'provider_handoff',
        intake_id: 'intake-2',
        summary_label: 'Opened Tandem handoff',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T20:01:00Z',
        status_delta: '',
        target_label: 'Other target',
        target_preset_id: 'other-target',
        launch_url: 'http://127.0.0.1:8765/?targetPreset=other-target',
        attachment_id: '',
        handoff_note: '',
      },
      {
        event_id: 'evt-3',
        event_family: 'provider_handoff',
        intake_id: 'intake-1',
        summary_label: 'Opened Tandem handoff',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T20:02:00Z',
        status_delta: 'attachment_review',
        target_label: 'Newest target',
        target_preset_id: 'new-target',
        launch_url: 'http://127.0.0.1:8765/?targetPreset=new-target',
        attachment_id: 'asset-9',
        handoff_note: 'Need the latest captured screenshot in Gmail.',
      },
    ]

    expect(selectLatestTandemLaunchForIntake(rows, 'intake-1')).toEqual(rows[2])
    expect(selectLatestTandemLaunchForIntake(rows, 'missing-intake')).toBeNull()
    expect(selectLatestTandemLaunchForIntake(rows, null)).toBeNull()
  })

  it('restores selection using the exact preset id and active intake', () => {
    const result = resolveRecentTandemLaunchSelection(
      {
        event_id: 'evt-1',
        event_family: 'provider_handoff',
        intake_id: 'intake-2',
        summary_label: 'Opened Tandem handoff',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T20:05:00Z',
        status_delta: '',
        target_label: 'Wrong label',
        target_preset_id: 'github-bugs',
        launch_url: 'http://127.0.0.1:8765/?targetPreset=github-bugs',
        attachment_id: '',
        handoff_note: '',
      },
      [
        {
          preset_id: 'gmail-support',
          display_label: 'Gmail Support',
          target_label: 'Gmail support inbox',
        },
        {
          preset_id: 'github-bugs',
          display_label: 'GitHub Bugs',
          target_label: 'GitHub issues queue',
        },
      ],
      [
        {
          intake_id: 'intake-2',
          title: 'Provider follow-up',
          intake_kind: 'email',
          received_at: '2026-03-17T20:00:00Z',
          status: 'triaging',
          routing_target: 'operator',
          trust_tier: '2',
          priority_hint: 'high',
          tags: [],
          warning_state: 'clean',
          warning_count: 0,
          summary_label: 'Provider follow-up',
        },
      ]
    )

    expect(result).toEqual({
      presetId: 'github-bugs',
      intakeId: 'intake-2',
      handoffNote: '',
    })
  })

  it('falls back to matching by target label and ignores inactive intakes', () => {
    const result = resolveRecentTandemLaunchSelection(
      {
        event_id: 'evt-2',
        event_family: 'provider_handoff',
        intake_id: 'intake-9',
        summary_label: 'Opened Tandem handoff',
        actor_label: 'operator:d',
        occurred_at: '2026-03-17T20:10:00Z',
        status_delta: '',
        target_label: 'Gmail support inbox',
        target_preset_id: '',
        launch_url: 'http://127.0.0.1:8765/?targetPreset=gmail-support',
        attachment_id: '',
        handoff_note: '',
      },
      [
        {
          preset_id: 'gmail-support',
          display_label: 'Gmail Support',
          target_label: 'Gmail support inbox',
        },
      ],
      []
    )

    expect(result).toEqual({
      presetId: 'gmail-support',
      intakeId: null,
      handoffNote: '',
    })
  })
})
