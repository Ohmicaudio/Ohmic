import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'

const intakeState = {
  items: [
    {
      intake_id: 'intake-1',
      title: 'Provider escalation',
      intake_kind: 'email',
      received_at: '2026-03-18T10:00:00Z',
      status: 'triaging',
      routing_target: '',
      trust_tier: '2',
      priority_hint: 'high',
      tags: [],
      warning_state: 'clean',
      warning_count: 0,
      summary_label: 'Provider escalation',
    },
  ],
  selectedId: 'intake-1',
  select: vi.fn(),
}

const auditState = {
  items: [
    {
      event_id: 'handoff-1',
      event_family: 'provider_handoff',
      intake_id: 'intake-1',
      summary_label: 'Opened Tandem handoff',
      actor_label: 'operator:d',
      occurred_at: '2026-03-18T10:10:00Z',
      status_delta: 'attachment_review',
      target_label: 'Gmail support inbox',
      target_preset_id: 'gmail-support',
      launch_url: 'http://127.0.0.1:8765/?sessionLabel=gmail-triage',
      attachment_id: 'asset-77',
      handoff_note: 'Need provider confirmation on the screenshot.',
    },
    {
      event_id: 'follow-up-1',
      event_family: 'provider_follow_up',
      intake_id: 'intake-1',
      summary_label: 'Completed provider follow-up',
      actor_label: 'operator:d',
      occurred_at: '2026-03-18T11:10:00Z',
      status_delta: 'completed',
      target_label: 'Gmail support inbox',
      target_preset_id: 'gmail-support',
      launch_url: '',
      attachment_id: '',
      handoff_note: 'Provider confirmed the screenshot.',
    },
  ],
  available: true,
  loading: false,
  fetch: vi.fn(),
}

const commandState = {
  noteText: '',
  setIntakeId: vi.fn(),
  setActionInput: vi.fn(),
  setNoteText: vi.fn(),
}

const tandemState = {
  targetPresets: [
    {
      preset_id: 'gmail-support',
      display_label: 'Gmail Support',
      target_label: 'Gmail support inbox',
      target_kind: 'email',
      team_label: 'Support',
      default_note: 'Ask provider to verify attachment context.',
    },
  ],
  selectedPresetId: 'gmail-support',
  sessionState: 'attached',
  statusSource: 'probe',
  probeState: 'reachable',
  probeMessage: 'Live Tandem status reached the inbox target.',
  activeTargetLabel: 'Gmail support inbox',
  targetHealth: [
    {
      target_label: 'Gmail support inbox',
      status: 'attached',
      message: 'Inbox session attached.',
    },
  ],
  pendingHandshake: {
    event_id: 'handshake-1',
    intake_id: 'intake-1',
    target_preset_id: 'gmail-support',
    target_label: 'Gmail support inbox',
    handshake_note: 'Prepare provider session before launch.',
    occurred_at: '2026-03-18T10:30:00Z',
    state: 'pending',
  },
  launchUrl: 'http://127.0.0.1:8765/?sessionLabel=gmail-triage',
  handoffNote: 'Ask provider to verify attachment context.',
  setSelectedPreset: vi.fn(),
  setHandoffNote: vi.fn(),
}

vi.mock('@/store/intakeStore', () => ({
  useIntakeStore: (selector: (state: typeof intakeState) => unknown) => selector(intakeState),
}))

vi.mock('@/store/auditSummaryStore', () => ({
  useAuditSummaryStore: (selector: (state: typeof auditState) => unknown) => selector(auditState),
}))

vi.mock('@/store/commandStore', () => ({
  useCommandStore: (selector: (state: typeof commandState) => unknown) => selector(commandState),
}))

vi.mock('@/store/tandemStore', () => ({
  useTandemStore: (selector: (state: typeof tandemState) => unknown) => selector(tandemState),
}))

vi.mock('@/api/commands', () => ({
  executeCommand: vi.fn(),
}))

vi.mock('@/api/tandem', () => ({
  recordProviderFollowUpCompletion: vi.fn(),
  recordProviderFollowUpReopen: vi.fn(),
  recordTandemHandshakeResolution: vi.fn(),
  recordTandemLaunchIntent: vi.fn(),
  recordTandemTargetHandshake: vi.fn(),
}))

import { ProviderHandoffPanel } from '@/panels/ProviderHandoffPanel'

describe('ProviderHandoffPanel', () => {
  it('renders provider workspace controls for the selected intake', () => {
    const markup = renderToStaticMarkup(<ProviderHandoffPanel />)

    expect(markup).toContain('Provider Handoff')
    expect(markup).toContain('Operator Loop')
    expect(markup).toContain('Provider Notes and Recovery')
    expect(markup).toContain('Prepare handshake')
    expect(markup).toContain('Pending handshake')
    expect(markup).toContain('Resume handshake')
    expect(markup).toContain('Mark attached')
    expect(markup).toContain('Mark failed')
    expect(markup).toContain('Clear state')
    expect(markup).toContain('Export history')
    expect(markup).toContain('Gmail Support')
    expect(markup).toContain('Selected target attached')
  })
})
