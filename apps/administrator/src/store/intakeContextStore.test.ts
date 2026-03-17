import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useIntakeContextStore } from '@/store/intakeContextStore'
import {
  fetchNoteProjection,
  fetchTagAssignmentProjection,
} from '@/api/projections'

vi.mock('@/api/projections', () => ({
  fetchNoteProjection: vi.fn(),
  fetchTagAssignmentProjection: vi.fn(),
}))

describe('intakeContextStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useIntakeContextStore.setState({
      notes: [],
      tagAssignments: [],
      loading: false,
      error: null,
    })
  })

  it('loads note and tag projections together for intake detail context', async () => {
    vi.mocked(fetchNoteProjection).mockResolvedValue({
      projection_name: 'administrator_note_projection',
      generated_at: '2026-03-17T15:15:00Z',
      refresh_triggers: ['note_append'],
      visibility_context: 'desk',
      ordering: 'created_at_desc',
      notes: [
        {
          note_id: 'note-1',
          intake_id: 'intake-1',
          body_text: 'Follow up with the provider before routing',
          authorship_class: 'operator',
          authored_by: 'operator:d',
          created_at: '2026-03-17T15:10:00Z',
          visibility: 'desk',
          source_action_id: 'add_note',
          display_author_label: 'operator:d',
        },
      ],
    })

    vi.mocked(fetchTagAssignmentProjection).mockResolvedValue({
      projection_name: 'administrator_tag_assignment_projection',
      generated_at: '2026-03-17T15:15:01Z',
      refresh_triggers: ['tag_writeback'],
      ordering: 'class_then_applied_at',
      duplicate_suppression: 'effective_label_per_intake',
      tag_assignments: [
        {
          tag_assignment_id: 'tag-1',
          intake_id: 'intake-1',
          tag_id: 'provider_followup',
          tag_label: 'provider-followup',
          tag_class: 'operator_freeform',
          source: 'administrator_app',
          applied_by: 'operator:d',
          applied_at: '2026-03-17T15:10:00Z',
          is_default: false,
          is_suggested: false,
        },
      ],
    })

    await useIntakeContextStore.getState().fetch()

    expect(fetchNoteProjection).toHaveBeenCalled()
    expect(fetchTagAssignmentProjection).toHaveBeenCalled()
    expect(useIntakeContextStore.getState()).toMatchObject({
      loading: false,
      error: null,
    })
    expect(useIntakeContextStore.getState().notes).toHaveLength(1)
    expect(useIntakeContextStore.getState().tagAssignments).toHaveLength(1)
  })
})
