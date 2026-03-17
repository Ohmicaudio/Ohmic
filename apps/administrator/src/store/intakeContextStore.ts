import { create } from 'zustand'
import type {
  AdministratorNote,
  AdministratorTagAssignment,
} from '@/types/intake'
import {
  fetchNoteProjection,
  fetchTagAssignmentProjection,
} from '@/api/projections'

interface IntakeContextState {
  notes: AdministratorNote[]
  tagAssignments: AdministratorTagAssignment[]
  loading: boolean
  error: string | null
  fetch: () => Promise<void>
}

export const useIntakeContextStore = create<IntakeContextState>((set) => ({
  notes: [],
  tagAssignments: [],
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null })

    const [noteResult, tagResult] = await Promise.allSettled([
      fetchNoteProjection(),
      fetchTagAssignmentProjection(),
    ])

    const nextState: Partial<IntakeContextState> = {
      notes: noteResult.status === 'fulfilled' ? noteResult.value.notes : [],
      tagAssignments:
        tagResult.status === 'fulfilled' ? tagResult.value.tag_assignments : [],
      loading: false,
    }

    if (noteResult.status === 'rejected' && tagResult.status === 'rejected') {
      nextState.error = 'No note or tag context projections are available yet'
    } else {
      nextState.error = null
    }

    set(nextState)
  },
}))
