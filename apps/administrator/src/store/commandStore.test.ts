import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCommandStore } from '@/store/commandStore'
import {
  executeCommand,
  fetchComposerOptions,
  fetchRecentActions,
  validateCommand,
} from '@/api/commands'

vi.mock('@/api/commands', () => ({
  fetchComposerOptions: vi.fn(),
  validateCommand: vi.fn(),
  executeCommand: vi.fn(),
  fetchRecentActions: vi.fn(),
}))

describe('commandStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useCommandStore.setState({
      selectedIntakeId: 'intake-1',
      actionInput: 'route_to_orchestrator',
      noteText: 'Escalate this packet',
      tagInput: '',
      tags: ['urgent'],
      queueTargetId: 'orchestrator',
      availableActions: [],
      availableTargets: [],
      optionsLoaded: false,
      validation: {
        validation_status: 'accepted',
        rejection_reasons: [],
        warning_reasons: [],
        rejection_details: [],
        warning_details: [],
      },
      lastResult: null,
      lastWriteback: null,
      validating: false,
      executing: false,
      error: null,
      recentActions: [],
      auditLoading: false,
    })
  })

  it('stores writeback details and refreshes the audit trail after execute', async () => {
    vi.mocked(executeCommand).mockResolvedValue({
      result: {
        command_id: 'admin_cmd_1',
        selected_intake_id: 'intake-1',
        action_input: 'route_to_orchestrator',
        resolved_action_id: 'route_to_orchestrator',
        resolved_action_label: 'Route to Orchestrator',
        requested_queue_target_id: 'orchestrator',
        resolved_queue_target_id: 'orchestrator',
        note_text: 'Escalate this packet',
        tags: ['urgent'],
        requested_by: 'operator:d',
        created_at: '2026-03-17T15:00:00Z',
        validation: {
          validation_status: 'accepted',
          rejection_reasons: [],
          warning_reasons: [],
          rejection_details: [],
          warning_details: [],
          action_resolution: {},
          queue_target_validation: {},
          approval_evaluation: {},
        },
      },
      writeback: {
        writeback_status: 'accepted',
        resulting_status: 'routed',
        recent_actions_count: 1,
        note_written: true,
        tags_written: 1,
      },
    })

    vi.mocked(fetchRecentActions).mockResolvedValue({
      generated_at: '2026-03-17T15:00:01Z',
      projection_name: 'administrator_recent_actions',
      staleness: {
        status: 'fresh',
        reason: null,
      },
      count: 1,
      recent_actions: [
        {
          command_id: 'admin_cmd_1',
          action: 'route_to_orchestrator',
          intake_id: 'intake-1',
          validation_status: 'accepted',
          resulting_status: 'routed',
          occurred_at: '2026-03-17T15:00:00Z',
          audit_id: 'audit_admin_cmd_1',
          summary_label: 'Route to Orchestrator -> routed',
        },
      ],
    })

    await useCommandStore.getState().execute()

    expect(executeCommand).toHaveBeenCalledWith({
      intake_id: 'intake-1',
      action: 'route_to_orchestrator',
      queue_target: 'orchestrator',
      note: 'Escalate this packet',
      tags: ['urgent'],
    })
    expect(fetchRecentActions).toHaveBeenCalled()
    expect(useCommandStore.getState().lastWriteback).toMatchObject({
      writeback_status: 'accepted',
      resulting_status: 'routed',
      note_written: true,
      tags_written: 1,
    })
    expect(useCommandStore.getState().recentActions).toHaveLength(1)
  })
})
