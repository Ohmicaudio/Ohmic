import { create } from 'zustand'
import type {
  ValidationFeedback,
  CommandValidationResult,
  CommandWritebackResult,
  RecentAction,
} from '@/types/commands'
import {
  fetchComposerOptions,
  validateCommand,
  executeCommand,
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
  selectedIntakeId: string
  actionInput: string
  noteText: string
  tagInput: string
  tags: string[]
  queueTargetId: string

  availableActions: ActionOption[]
  availableTargets: TargetOption[]
  optionsLoaded: boolean

  validation: ValidationFeedback
  lastResult: CommandValidationResult | null
  lastWriteback: CommandWritebackResult | null
  validating: boolean
  executing: boolean
  error: string | null

  recentActions: RecentAction[]
  auditLoading: boolean

  setIntakeId: (id: string) => void
  setActionInput: (input: string) => void
  setNoteText: (text: string) => void
  setTagInput: (input: string) => void
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
  setQueueTarget: (id: string) => void
  loadOptions: () => Promise<void>
  validate: () => Promise<void>
  execute: () => Promise<void>
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

function clearResultState() {
  return {
    validation: { ...emptyValidation },
    lastResult: null as CommandValidationResult | null,
    lastWriteback: null as CommandWritebackResult | null,
    error: null as string | null,
  }
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
  lastWriteback: null,
  validating: false,
  executing: false,
  error: null,

  recentActions: [],
  auditLoading: false,

  setIntakeId: (id) => set({ selectedIntakeId: id, ...clearResultState() }),
  setActionInput: (input) => set({ actionInput: input, ...clearResultState() }),
  setNoteText: (text) => set({ noteText: text, lastWriteback: null, error: null }),
  setTagInput: (input) => set({ tagInput: input }),
  addTag: (tag) => {
    const trimmed = tag.trim().toLowerCase()
    if (!trimmed) return
    const current = get().tags
    if (!current.includes(trimmed)) {
      set({ tags: [...current, trimmed], tagInput: '', lastWriteback: null, error: null })
    }
  },
  removeTag: (tag) =>
    set({
      tags: get().tags.filter((t) => t !== tag),
      lastWriteback: null,
      error: null,
    }),
  setQueueTarget: (id) => set({ queueTargetId: id, ...clearResultState() }),

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
    set({
      validating: true,
      error: null,
      lastWriteback: null,
      validation: { ...emptyValidation, validation_status: 'validating' },
    })

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

  execute: async () => {
    const state = get()
    set({ executing: true, error: null, lastWriteback: null })

    try {
      const response = await executeCommand({
        intake_id: state.selectedIntakeId,
        action: state.actionInput,
        queue_target: state.queueTargetId || undefined,
        note: state.noteText || undefined,
        tags: state.tags.length > 0 ? state.tags : undefined,
      })

      const result = response.result as CommandValidationResult
      const writeback = response.writeback

      set({
        executing: false,
        lastResult: result,
        lastWriteback: writeback,
        validation: {
          validation_status: result.validation.validation_status,
          rejection_reasons: result.validation.rejection_reasons,
          warning_reasons: result.validation.warning_reasons,
          rejection_details: result.validation.rejection_details,
          warning_details: result.validation.warning_details,
        },
      })

      await get().loadAuditTrail()
    } catch (err) {
      set({
        executing: false,
        error: err instanceof Error ? err.message : 'Command execution failed',
      })
    }
  },

  reset: () =>
    set({
      actionInput: '',
      noteText: '',
      tagInput: '',
      tags: [],
      queueTargetId: '',
      executing: false,
      ...clearResultState(),
    }),

  loadAuditTrail: async () => {
    set({ auditLoading: true })
    try {
      const data = await fetchRecentActions()
      set({ recentActions: data.recent_actions, auditLoading: false })
    } catch {
      // Projection may not exist yet; that is fine.
      set({ recentActions: [], auditLoading: false })
    }
  },
}))
