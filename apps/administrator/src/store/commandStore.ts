import { create } from 'zustand'
import type {
  ValidationFeedback,
  CommandValidationResult,
  RecentAction,
} from '@/types/commands'
import {
  fetchComposerOptions,
  validateCommand,
  fetchRecentActions,
} from '@/api/commands'

interface ActionOption {
  action_id: string
  display_label: string
  aliases: string[]
}

interface TargetOption {
  queue_target_id: string
  display_label: string
  status: string
  capability_flags: string[]
}

interface CommandState {
  // Composer form state
  selectedIntakeId: string
  actionInput: string
  noteText: string
  tagInput: string
  tags: string[]
  queueTargetId: string

  // Options from PowerShell
  availableActions: ActionOption[]
  availableTargets: TargetOption[]
  optionsLoaded: boolean

  // Validation result
  validation: ValidationFeedback
  lastResult: CommandValidationResult | null
  validating: boolean
  error: string | null

  // Audit trail
  recentActions: RecentAction[]
  auditLoading: boolean

  // Actions
  setIntakeId: (id: string) => void
  setActionInput: (input: string) => void
  setNoteText: (text: string) => void
  setTagInput: (input: string) => void
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
  setQueueTarget: (id: string) => void
  loadOptions: () => Promise<void>
  validate: () => Promise<void>
  reset: () => void
  loadAuditTrail: () => Promise<void>
}

const emptyValidation: ValidationFeedback = {
  validation_status: 'idle',
  rejection_reasons: [],
  warning_reasons: [],
  rejection_details: [],
  warning_details: [],
}

export const useCommandStore = create<CommandState>((set, get) => ({
  selectedIntakeId: '',
  actionInput: '',
  noteText: '',
  tagInput: '',
  tags: [],
  queueTargetId: '',

  availableActions: [],
  availableTargets: [],
  optionsLoaded: false,

  validation: { ...emptyValidation },
  lastResult: null,
  validating: false,
  error: null,

  recentActions: [],
  auditLoading: false,

  setIntakeId: (id) => set({ selectedIntakeId: id, validation: { ...emptyValidation } }),
  setActionInput: (input) => set({ actionInput: input, validation: { ...emptyValidation } }),
  setNoteText: (text) => set({ noteText: text }),
  setTagInput: (input) => set({ tagInput: input }),
  addTag: (tag) => {
    const trimmed = tag.trim().toLowerCase()
    if (!trimmed) return
    const current = get().tags
    if (!current.includes(trimmed)) {
      set({ tags: [...current, trimmed], tagInput: '' })
    }
  },
  removeTag: (tag) => set({ tags: get().tags.filter((t) => t !== tag) }),
  setQueueTarget: (id) => set({ queueTargetId: id, validation: { ...emptyValidation } }),

  loadOptions: async () => {
    try {
      const data = await fetchComposerOptions()
      set({
        availableActions: data.available_actions,
        availableTargets: data.available_targets,
        optionsLoaded: true,
      })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to load options' })
    }
  },

  validate: async () => {
    const state = get()
    set({ validating: true, error: null, validation: { ...emptyValidation, validation_status: 'validating' } })

    try {
      const response = await validateCommand({
        intake_id: state.selectedIntakeId,
        action: state.actionInput,
        queue_target: state.queueTargetId || undefined,
        note: state.noteText || undefined,
        tags: state.tags.length > 0 ? state.tags : undefined,
      })

      const result = response.result as CommandValidationResult
      set({
        validating: false,
        lastResult: result,
        validation: {
          validation_status: result.validation.validation_status,
          rejection_reasons: result.validation.rejection_reasons,
          warning_reasons: result.validation.warning_reasons,
          rejection_details: result.validation.rejection_details,
          warning_details: result.validation.warning_details,
        },
      })
    } catch (err) {
      set({
        validating: false,
        error: err instanceof Error ? err.message : 'Validation failed',
        validation: { ...emptyValidation },
      })
    }
  },

  reset: () => set({
    actionInput: '',
    noteText: '',
    tagInput: '',
    tags: [],
    queueTargetId: '',
    validation: { ...emptyValidation },
    lastResult: null,
    error: null,
  }),

  loadAuditTrail: async () => {
    set({ auditLoading: true })
    try {
      const data = await fetchRecentActions()
      set({ recentActions: data.recent_actions, auditLoading: false })
    } catch {
      // Projection may not exist yet — that's fine
      set({ recentActions: [], auditLoading: false })
    }
  },
}))
