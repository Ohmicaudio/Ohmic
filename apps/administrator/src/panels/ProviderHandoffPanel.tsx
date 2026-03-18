import { useEffect, useMemo, useRef, useState } from 'react'
import { executeCommand } from '@/api/commands'
import {
  recordProviderFollowUpCompletion,
  recordProviderFollowUpReopen,
  recordTandemLaunchIntent,
  recordTandemTargetHandshake,
} from '@/api/tandem'
import { useAuditSummaryStore } from '@/store/auditSummaryStore'
import { useCommandStore } from '@/store/commandStore'
import { useIntakeStore } from '@/store/intakeStore'
import { useTandemStore } from '@/store/tandemStore'
import { buildTandemContextUrl } from '@/panels/tandemContext'
import {
  buildAuditFollowUpNote,
  deriveAuditFollowUpAction,
} from '@/panels/auditFollowUp'
import {
  buildProviderFollowUpQueue,
  buildProviderHandoffSummary,
  buildProviderTargetTrendCards,
  groupProviderHandoffsByTarget,
  type ProviderFollowUpItem,
  type ProviderFollowUpSortMode,
} from '@/panels/providerHandoffSummary'
import {
  selectRecentProviderEvents,
  resolveRecentTandemLaunchSelection,
  selectLatestTandemLaunchForIntake,
  selectProviderEventsForIntake,
  selectRecentTandemLaunches,
} from '@/panels/tandemHistory'

function formatTargetGroupLabel(teamLabel: string | null, targetKind: string | null): string {
  if (teamLabel && targetKind) {
    return `${teamLabel} | ${targetKind}`
  }
  if (teamLabel) {
    return teamLabel
  }
  if (targetKind) {
    return targetKind
  }
  return 'Unassigned'
}

function buildFollowUpSelectionKey(item: {
  intakeId: string
  occurredAt: string | null
  attachmentId?: string | null
}): string {
  return `${item.intakeId}::${item.occurredAt ?? 'provider'}::${item.attachmentId ?? ''}`
}

function buildCompletionTemplate(
  item: {
    priority?: 'needs_attachment_review' | 'follow_up_pending'
    targetLabel: string
    targetPresetId?: string | null
  },
  presets: ReturnType<typeof useTandemStore.getState>['targetPresets']
): string {
  const preset = item.targetPresetId
    ? presets.find((candidate) => candidate.preset_id === item.targetPresetId)
    : null

  if (item.priority === 'needs_attachment_review') {
    return preset?.default_note
      ? `Attachment review completed for ${item.targetLabel}. ${preset.default_note}`
      : `Attachment review completed for ${item.targetLabel}.`
  }
  if (preset?.team_label) {
    return preset?.default_note
      ? `${preset.team_label} follow-up completed for ${item.targetLabel}. ${preset.default_note}`
      : `${preset.team_label} follow-up completed for ${item.targetLabel}.`
  }
  if (preset?.target_kind) {
    return `Provider ${preset.target_kind} follow-up completed for ${item.targetLabel}.`
  }
  return `Provider follow-up completed for ${item.targetLabel}.`
}

function buildCompletionReasonPresets(
  targetKind: string | null | undefined,
  targetLabel: string
): string[] {
  switch (targetKind) {
    case 'email':
      return [
        `Provider confirmed email review for ${targetLabel}.`,
        `Inbox triage completed for ${targetLabel}.`,
      ]
    case 'issue':
      return [
        `Issue review completed for ${targetLabel}.`,
        `Provider confirmed evidence and routing for ${targetLabel}.`,
      ]
    default:
      return [
        `Provider follow-up completed for ${targetLabel}.`,
        `Operator closed the provider loop for ${targetLabel}.`,
      ]
  }
}

function buildReopenTemplate(
  item: {
    targetLabel: string
    targetPresetId?: string | null
  },
  presets: ReturnType<typeof useTandemStore.getState>['targetPresets']
): string {
  const preset = item.targetPresetId
    ? presets.find((candidate) => candidate.preset_id === item.targetPresetId)
    : null

  if (preset?.default_note) {
    return `Reopened provider follow-up for ${item.targetLabel}. ${preset.default_note}`
  }
  return `Reopened provider follow-up for ${item.targetLabel}.`
}

function buildReopenReasonPresets(
  targetKind: string | null | undefined,
  targetLabel: string
): string[] {
  switch (targetKind) {
    case 'email':
      return [
        `Reopen ${targetLabel} for another inbox pass.`,
        `Need provider clarification in ${targetLabel}.`,
      ]
    case 'issue':
      return [
        `Reopen ${targetLabel} pending issue clarification.`,
        `Need more evidence before closing ${targetLabel}.`,
      ]
    default:
      return [
        `Reopened provider follow-up for ${targetLabel}.`,
        `Need another provider pass for ${targetLabel}.`,
      ]
  }
}

function shouldIgnoreKeyboardShortcut(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  const tagName = target.tagName.toLowerCase()
  return (
    tagName === 'input' ||
    tagName === 'textarea' ||
    tagName === 'select' ||
    target.isContentEditable
  )
}

function formatSlaTimer(value: string | null): string {
  if (!value) {
    return 'SLA unknown'
  }

  const parsed = Date.parse(value)
  if (!Number.isFinite(parsed)) {
    return 'SLA unknown'
  }

  const hoursOpen = Math.max(0, Math.floor((Date.now() - parsed) / (1000 * 60 * 60)))
  if (hoursOpen >= 24) {
    return `${hoursOpen}h open - overdue`
  }
  if (hoursOpen >= 4) {
    return `${hoursOpen}h open - attention`
  }
  return `${hoursOpen}h open - within SLA`
}

export function ProviderHandoffPanel() {
  const [focusedTargetLabel, setFocusedTargetLabel] = useState<string | null>(null)
  const [followUpFilter, setFollowUpFilter] = useState<
    'all' | 'needs_attachment_review' | 'follow_up_pending'
  >('all')
  const [followUpScope, setFollowUpScope] = useState<'all' | 'selected'>('all')
  const [followUpSort, setFollowUpSort] = useState<ProviderFollowUpSortMode>('priority')
  const [selectedFollowUpKeys, setSelectedFollowUpKeys] = useState<string[]>([])
  const [selectedCompletedEventIds, setSelectedCompletedEventIds] = useState<string[]>([])
  const [providerNoteDraft, setProviderNoteDraft] = useState('')
  const previousSummaryRef = useRef<{
    unresolvedCount: number
    staleFollowUpCount: number
  } | null>(null)
  const intakeItems = useIntakeStore((state) => state.items)
  const selectedId = useIntakeStore((state) => state.selectedId)
  const selectIntake = useIntakeStore((state) => state.select)
  const auditItems = useAuditSummaryStore((state) => state.items)
  const auditAvailable = useAuditSummaryStore((state) => state.available)
  const auditLoading = useAuditSummaryStore((state) => state.loading)
  const fetchAuditSummary = useAuditSummaryStore((state) => state.fetch)
  const commandNoteText = useCommandStore((state) => state.noteText)
  const setCommandIntakeId = useCommandStore((state) => state.setIntakeId)
  const setCommandActionInput = useCommandStore((state) => state.setActionInput)
  const setCommandNoteText = useCommandStore((state) => state.setNoteText)
  const tandemTargetPresets = useTandemStore((state) => state.targetPresets)
  const selectedTandemPresetId = useTandemStore((state) => state.selectedPresetId)
  const tandemSessionState = useTandemStore((state) => state.sessionState)
  const tandemStatusSource = useTandemStore((state) => state.statusSource)
  const tandemProbeState = useTandemStore((state) => state.probeState)
  const tandemProbeMessage = useTandemStore((state) => state.probeMessage)
  const tandemActiveTargetLabel = useTandemStore((state) => state.activeTargetLabel)
  const tandemTargetHealth = useTandemStore((state) => state.targetHealth)
  const tandemLaunchUrl = useTandemStore((state) => state.launchUrl)
  const tandemHandoffNote = useTandemStore((state) => state.handoffNote)
  const setSelectedTandemPreset = useTandemStore((state) => state.setSelectedPreset)
  const setTandemHandoffNote = useTandemStore((state) => state.setHandoffNote)

  const selectedIntake = intakeItems.find((item) => item.intake_id === selectedId) ?? null
  const selectedHandoff = selectLatestTandemLaunchForIntake(auditItems, selectedId)
  const recentHandoffs = useMemo(() => selectRecentTandemLaunches(auditItems, 5), [auditItems])
  const recentProviderEvents = useMemo(() => selectRecentProviderEvents(auditItems, 8), [auditItems])
  const providerSummary = useMemo(() => buildProviderHandoffSummary(auditItems), [auditItems])
  const providerSummaryDelta = useMemo(() => {
    if (!previousSummaryRef.current) {
      return { unresolved: 0, stale: 0 }
    }

    return {
      unresolved: providerSummary.unresolvedCount - previousSummaryRef.current.unresolvedCount,
      stale: providerSummary.staleFollowUpCount - previousSummaryRef.current.staleFollowUpCount,
    }
  }, [providerSummary])
  const providerFollowUpQueue = useMemo(
    () => buildProviderFollowUpQueue(auditItems, intakeItems, 5, Date.now(), followUpSort),
    [auditItems, intakeItems, followUpSort]
  )
  const providerTargetGroups = useMemo(
    () => groupProviderHandoffsByTarget(auditItems, tandemActiveTargetLabel, tandemSessionState),
    [auditItems, tandemActiveTargetLabel, tandemSessionState]
  )
  const providerTargetTrends = useMemo(
    () => buildProviderTargetTrendCards(auditItems, 4),
    [auditItems]
  )
  const visibleProviderFollowUpQueue = useMemo(
    () =>
      providerFollowUpQueue.filter((item) => {
        if (focusedTargetLabel && item.targetLabel !== focusedTargetLabel) {
          return false
        }
        if (followUpScope === 'selected' && item.intakeId !== selectedId) {
          return false
        }
        if (followUpFilter !== 'all' && item.priority !== followUpFilter) {
          return false
        }
        return true
      }),
    [focusedTargetLabel, followUpFilter, followUpScope, providerFollowUpQueue, selectedId]
  )
  const visibleRecentHandoffs = useMemo(
    () =>
      focusedTargetLabel
        ? recentHandoffs.filter((item) => item.target_label === focusedTargetLabel)
        : recentHandoffs,
    [focusedTargetLabel, recentHandoffs]
  )
  const selectedTandemPreset = useMemo(
    () =>
      tandemTargetPresets.find((preset) => preset.preset_id === selectedTandemPresetId) ?? null,
    [selectedTandemPresetId, tandemTargetPresets]
  )
  const targetHealthMap = useMemo(
    () => new Map(tandemTargetHealth.map((item) => [item.target_label, item])),
    [tandemTargetHealth]
  )
  const selectedProviderEvents = useMemo(
    () => selectProviderEventsForIntake(auditItems, selectedId, 6),
    [auditItems, selectedId]
  )
  const selectedLatestProviderEvent = selectedProviderEvents[0] ?? null
  const recentCompletedProviderEvents = useMemo(
    () =>
      selectRecentProviderEvents(auditItems, 20).filter(
        (item) => item.event_family === 'provider_follow_up'
      ),
    [auditItems]
  )
  const attachmentReviewQueue = useMemo(
    () =>
      visibleProviderFollowUpQueue.filter(
        (item) => item.priority === 'needs_attachment_review'
      ),
    [visibleProviderFollowUpQueue]
  )
  const generalFollowUpQueue = useMemo(
    () =>
      visibleProviderFollowUpQueue.filter(
        (item) => item.priority !== 'needs_attachment_review'
      ),
    [visibleProviderFollowUpQueue]
  )
  const renderedFollowUpQueue = useMemo(() => {
    if (followUpFilter === 'needs_attachment_review') {
      return attachmentReviewQueue
    }
    if (followUpFilter === 'follow_up_pending') {
      return generalFollowUpQueue
    }
    return generalFollowUpQueue
  }, [attachmentReviewQueue, followUpFilter, generalFollowUpQueue])
  const selectedFollowUpItems = useMemo(
    () =>
      renderedFollowUpQueue.filter((item) =>
        selectedFollowUpKeys.includes(buildFollowUpSelectionKey(item))
      ),
    [renderedFollowUpQueue, selectedFollowUpKeys]
  )
  const groupedTargetPresets = useMemo(() => {
    const groups = new Map<
      string,
      {
        groupLabel: string
        presets: typeof tandemTargetPresets
      }
    >()

    for (const preset of tandemTargetPresets) {
      const groupLabel = formatTargetGroupLabel(
        preset.team_label ?? null,
        preset.target_kind ?? null
      )
      const existing = groups.get(groupLabel)
      if (existing) {
        existing.presets.push(preset)
      } else {
        groups.set(groupLabel, { groupLabel, presets: [preset] })
      }
    }

    return Array.from(groups.values()).sort((left, right) =>
      left.groupLabel.localeCompare(right.groupLabel)
    )
  }, [tandemTargetPresets])
  const selectedTargetAttached =
    selectedTandemPreset?.target_label === tandemActiveTargetLabel &&
    tandemSessionState === 'attached'
  const selectedTargetLaunchReady = Boolean(selectedTandemPreset && tandemLaunchUrl)
  const selectedTargetHealth = selectedTandemPreset
    ? targetHealthMap.get(selectedTandemPreset.target_label)
    : null
  const selectedTargetMismatch =
    tandemSessionState === 'attached' &&
    Boolean(selectedTandemPreset?.target_label) &&
    Boolean(tandemActiveTargetLabel) &&
    selectedTandemPreset?.target_label !== tandemActiveTargetLabel
  const selectedContextualLaunchUrl = selectedTandemPreset
    ? buildTandemContextUrl(tandemLaunchUrl, selectedIntake, selectedTandemPreset)
    : null

  useEffect(() => {
    previousSummaryRef.current = {
      unresolvedCount: providerSummary.unresolvedCount,
      staleFollowUpCount: providerSummary.staleFollowUpCount,
    }
  }, [providerSummary])

  async function handleRefresh() {
    await fetchAuditSummary()
  }

  function toggleFollowUpSelection(item: ProviderFollowUpItem) {
    const key = buildFollowUpSelectionKey(item)
    setSelectedFollowUpKeys((current) =>
      current.includes(key)
        ? current.filter((candidate) => candidate !== key)
        : [...current, key]
    )
  }

  function clearFollowUpSelection() {
    setSelectedFollowUpKeys([])
  }

  function toggleCompletedSelection(eventId: string) {
    setSelectedCompletedEventIds((current) =>
      current.includes(eventId)
        ? current.filter((candidate) => candidate !== eventId)
        : [...current, eventId]
    )
  }

  function clearCompletedSelection() {
    setSelectedCompletedEventIds([])
  }

  async function handleCompleteFollowUp(item: {
    intakeId: string
    targetPresetId: string | null
    targetLabel: string
    handoffNote: string | null
    priority?: 'needs_attachment_review' | 'follow_up_pending'
  }) {
    try {
      await recordProviderFollowUpCompletion({
        intake_id: item.intakeId,
        target_preset_id: item.targetPresetId,
        target_label: item.targetLabel,
        completion_note:
          item.handoffNote?.trim() ||
          buildCompletionTemplate(item, tandemTargetPresets),
      })
      await fetchAuditSummary()
    } catch {
      // Keep completion non-blocking for the desk.
    }
  }

  async function handleReopenFollowUp(item: {
    intakeId: string
    targetPresetId: string | null
    targetLabel: string
  }) {
    try {
      await recordProviderFollowUpReopen({
        intake_id: item.intakeId,
        target_preset_id: item.targetPresetId,
        target_label: item.targetLabel,
        reopen_note: buildReopenTemplate(item, tandemTargetPresets),
      })
      await fetchAuditSummary()
    } catch {
      // Keep reopen non-blocking for the desk.
    }
  }

  function loadHandoffContext(intakeId: string | null, eventIndex: number) {
    const handoff = eventIndex >= 0 ? recentHandoffs[eventIndex] : selectedHandoff
    if (!handoff) {
      return
    }

    const selection = resolveRecentTandemLaunchSelection(
      handoff,
      tandemTargetPresets,
      intakeItems
    )

    if (selection.presetId) {
      setSelectedTandemPreset(selection.presetId)
    }
    setTandemHandoffNote(selection.handoffNote)
    if (selection.intakeId) {
      selectIntake(selection.intakeId)
      return
    }
    if (intakeId) {
      selectIntake(intakeId)
    }
  }

  function loadProviderTarget(presetId: string) {
    setSelectedTandemPreset(presetId)
  }

  async function handleProviderLaunch(
    launchUrl: string,
    preset: { preset_id: string; target_label: string }
  ) {
    try {
      await recordTandemLaunchIntent({
        intake_id: selectedIntake?.intake_id ?? null,
        target_preset_id: preset.preset_id,
        target_label: preset.target_label,
        launch_url: launchUrl,
        handoff_note: tandemHandoffNote.trim() || null,
      })
      await fetchAuditSummary()
    } catch {
      // Keep provider launch non-blocking even if audit writeback fails.
    }
  }

  function primeProviderFollowUp(item: (typeof recentHandoffs)[number]) {
    if (!item.intake_id) {
      return
    }

    const action = deriveAuditFollowUpAction(item.event_family) ?? 'add_note'
    setCommandIntakeId(item.intake_id)
    setCommandActionInput(action)
    setCommandNoteText(buildAuditFollowUpNote(commandNoteText, item))
    selectIntake(item.intake_id)
  }

  function loadProviderItemIntoDesk(item: ProviderFollowUpItem) {
    if (item.targetPresetId) {
      setSelectedTandemPreset(item.targetPresetId)
    }
    setTandemHandoffNote(
      item.handoffNote ?? buildCompletionTemplate(item, tandemTargetPresets)
    )
    selectIntake(item.intakeId)
  }

  async function handleBulkComplete() {
    for (const item of selectedFollowUpItems) {
      await handleCompleteFollowUp(item)
    }
    clearFollowUpSelection()
  }

  function handleBulkPrime() {
    for (const item of selectedFollowUpItems) {
      primeProviderFollowUp({
        event_id: `${item.intakeId}-${item.occurredAt ?? 'provider-handoff'}`,
        event_family: 'provider_handoff',
        intake_id: item.intakeId,
        summary_label: item.intakeTitle,
        actor_label: 'provider_workspace',
        occurred_at: item.occurredAt ?? '',
        status_delta:
          item.priority === 'needs_attachment_review'
            ? 'attachment_review'
            : 'follow_up_pending',
        target_label: item.targetLabel,
        target_preset_id: item.targetPresetId ?? undefined,
        launch_url: item.launchUrl ?? undefined,
        attachment_id: item.attachmentId ?? undefined,
        handoff_note: item.handoffNote ?? undefined,
      })
    }
  }

  function handleBulkLoad() {
    const first = selectedFollowUpItems[0]
    if (!first) {
      return
    }
    loadProviderItemIntoDesk(first)
  }

  async function handleBulkReassignToSelectedTarget() {
    if (!selectedTandemPreset) {
      return
    }

    for (const item of selectedFollowUpItems) {
      const intakeItem = intakeItems.find((candidate) => candidate.intake_id === item.intakeId) ?? null
      const contextualLaunchUrl = buildTandemContextUrl(
        tandemLaunchUrl,
        intakeItem,
        selectedTandemPreset
      )

      if (!contextualLaunchUrl) {
        continue
      }

      await recordTandemLaunchIntent({
        intake_id: item.intakeId,
        target_preset_id: selectedTandemPreset.preset_id,
        target_label: selectedTandemPreset.target_label,
        launch_url: contextualLaunchUrl,
        attachment_id: item.attachmentId,
        handoff_note:
          tandemHandoffNote.trim() ||
          item.handoffNote ||
          selectedTandemPreset.default_note ||
          null,
      })
    }

    clearFollowUpSelection()
    await fetchAuditSummary()
  }

  async function handleBulkReopenCompleted() {
    const selectedEvents = recentCompletedProviderEvents.filter((item) =>
      selectedCompletedEventIds.includes(item.event_id)
    )

    for (const item of selectedEvents) {
      if (!item.intake_id) {
        continue
      }

      await handleReopenFollowUp({
        intakeId: item.intake_id,
        targetPresetId: item.target_preset_id ?? null,
        targetLabel: item.target_label || item.summary_label,
      })
    }

    clearCompletedSelection()
  }

  async function handleCreateProviderNote() {
    if (!selectedId || !providerNoteDraft.trim()) {
      return
    }

    try {
      await executeCommand({
        intake_id: selectedId,
        action: 'add_note',
        note: providerNoteDraft.trim(),
      })
      setProviderNoteDraft('')
      await fetchAuditSummary()
    } catch {
      // Keep provider note creation non-blocking for the desk.
    }
  }

  function exportProviderActivity() {
    const payload = JSON.stringify(
      {
        exported_at: new Date().toISOString(),
        selected_intake_id: selectedId,
        focused_target_label: focusedTargetLabel,
        events: selectRecentProviderEvents(auditItems, 250),
      },
      null,
      2
    )

    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `provider-handoff-audit-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  async function handleTargetHandshake(
    preset: { preset_id: string; target_label: string; default_note?: string | null },
    noteOverride?: string | null
  ) {
    try {
      await recordTandemTargetHandshake({
        intake_id: selectedIntake?.intake_id ?? null,
        target_preset_id: preset.preset_id,
        target_label: preset.target_label,
        handshake_note:
          noteOverride?.trim() ||
          tandemHandoffNote.trim() ||
          preset.default_note ||
          null,
      })
      await fetchAuditSummary()
    } catch {
      // Keep target handshake non-blocking for the desk.
    }
  }

  useEffect(() => {
    function handleKeyboardShortcut(event: KeyboardEvent) {
      if (!event.ctrlKey || !event.shiftKey || shouldIgnoreKeyboardShortcut(event.target)) {
        return
      }

      const key = event.key.toLowerCase()
      if (key === 'l' && selectedFollowUpItems.length > 0) {
        event.preventDefault()
        handleBulkLoad()
      } else if (key === 'p' && selectedFollowUpItems.length > 0) {
        event.preventDefault()
        handleBulkPrime()
      } else if (key === 'enter' && selectedFollowUpItems.length > 0) {
        event.preventDefault()
        void handleBulkComplete()
      } else if (key === 'r' && selectedCompletedEventIds.length > 0) {
        event.preventDefault()
        void handleBulkReopenCompleted()
      } else if (key === 'n' && selectedId && providerNoteDraft.trim()) {
        event.preventDefault()
        void handleCreateProviderNote()
      }
    }

    window.addEventListener('keydown', handleKeyboardShortcut)
    return () => window.removeEventListener('keydown', handleKeyboardShortcut)
  }, [
    providerNoteDraft,
    selectedCompletedEventIds,
    selectedFollowUpItems,
    selectedId,
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
            Provider Handoff
          </h2>
          <div className="text-[10px] text-ohmic-text-dim mt-1">
            Centralized outbound provider context and recent Tandem activity.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportProviderActivity}
            className="rounded border border-ohmic-border px-2 py-1 text-[10px] uppercase tracking-widest text-ohmic-text-dim transition-colors hover:border-ohmic-accent/30 hover:text-ohmic-text"
          >
            Export history
          </button>
          <button
            onClick={() => void handleRefresh()}
            className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors"
          >
            refresh
          </button>
        </div>
      </div>

      <div className="panel space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
            Provider Session Truth
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest">
            <span
              className={`rounded-full px-2 py-0.5 ${
                tandemStatusSource === 'probe'
                  ? 'bg-emerald-300/15 text-emerald-300'
                  : 'bg-ohmic-border text-ohmic-text-dim'
              }`}
            >
              {tandemStatusSource === 'probe' ? 'Live probe' : 'Env floor'}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 ${
                tandemProbeState === 'reachable'
                  ? 'bg-emerald-300/15 text-emerald-300'
                  : tandemProbeState === 'error'
                    ? 'bg-amber-300/15 text-amber-300'
                    : 'bg-ohmic-border text-ohmic-text-dim'
              }`}
            >
              {tandemProbeState}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 ${
                tandemSessionState === 'attached'
                  ? 'bg-emerald-300/15 text-emerald-300'
                  : tandemSessionState === 'idle'
                    ? 'bg-amber-300/15 text-amber-300'
                    : 'bg-ohmic-border text-ohmic-text-dim'
              }`}
            >
              {tandemSessionState}
            </span>
          </div>
        </div>
        <div className="text-xs text-ohmic-text-dim">
          {tandemProbeMessage || 'Tandem session truth is still configuration-backed.'}
        </div>
        {selectedTargetHealth?.status === 'error' ? (
          <div className="rounded border border-rose-300/30 bg-rose-300/10 px-3 py-2 text-[11px] text-rose-300">
            {selectedTargetHealth.message ||
              'Selected target health is failing. Use env truth carefully and re-check Tandem before launching.'}
          </div>
        ) : selectedTargetHealth?.status === 'attention' ? (
          <div className="rounded border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-[11px] text-amber-300">
            {selectedTargetHealth.message ||
              'Selected target needs attention before the next provider pass.'}
          </div>
        ) : null}
        {selectedTargetMismatch ? (
          <div className="rounded border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-[11px] text-amber-300">
            Attached session target is {tandemActiveTargetLabel}, but the desk is pointed at{' '}
            {selectedTandemPreset?.target_label}. Load the attached target or switch the provider
            session before you continue.
          </div>
        ) : null}
        {selectedTandemPreset ? (
          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                selectedTargetAttached
                  ? 'bg-emerald-300/15 text-emerald-300'
                  : selectedTargetLaunchReady
                    ? 'bg-ohmic-accent/15 text-ohmic-accent'
                    : 'bg-amber-300/15 text-amber-300'
              }`}
            >
              {selectedTargetAttached
                ? 'Selected target attached'
                : selectedTargetLaunchReady
                  ? 'Selected target ready'
                  : 'Selected target not ready'}
            </span>
            {selectedTandemPreset.team_label ? (
              <span className="rounded-full bg-ohmic-bg px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-text-dim">
                {selectedTandemPreset.team_label}
              </span>
            ) : null}
            {selectedTandemPreset.target_kind ? (
              <span className="rounded-full bg-ohmic-bg px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-text-dim">
                {selectedTandemPreset.target_kind}
              </span>
            ) : null}
            {targetHealthMap.get(selectedTandemPreset.target_label) ? (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                  targetHealthMap.get(selectedTandemPreset.target_label)?.status === 'attached'
                    ? 'bg-emerald-300/15 text-emerald-300'
                    : targetHealthMap.get(selectedTandemPreset.target_label)?.status === 'error'
                      ? 'bg-rose-300/15 text-rose-300'
                      : targetHealthMap.get(selectedTandemPreset.target_label)?.status === 'attention'
                        ? 'bg-amber-300/15 text-amber-300'
                        : 'bg-ohmic-accent/15 text-ohmic-accent'
                }`}
              >
                {targetHealthMap.get(selectedTandemPreset.target_label)?.status}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="panel space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
            Operator Loop
          </div>
          <div className="text-[10px] text-ohmic-text-dim">
            Select -&gt; launch -&gt; follow up -&gt; complete -&gt; reopen
          </div>
        </div>
        {!selectedIntake ? (
          <div className="text-sm text-ohmic-text-dim">
            Select an intake item to walk the provider loop from the desk.
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm text-ohmic-text">{selectedIntake.title}</div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              <div className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2">
                <div className="text-[10px] uppercase tracking-widest text-ohmic-text-dim">
                  Step 1
                </div>
                <div className="mt-1 text-xs text-ohmic-text">
                  {selectedTandemPreset ? selectedTandemPreset.display_label : 'Choose target'}
                </div>
              </div>
              <div className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2">
                <div className="text-[10px] uppercase tracking-widest text-ohmic-text-dim">
                  Step 2
                </div>
                <div className="mt-1 text-xs text-ohmic-text">
                  {selectedTargetLaunchReady ? 'Launch ready' : 'Launch blocked'}
                </div>
              </div>
              <div className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2">
                <div className="text-[10px] uppercase tracking-widest text-ohmic-text-dim">
                  Step 3
                </div>
                <div className="mt-1 text-xs text-ohmic-text">
                  {selectedHandoff ? 'Handoff recorded' : 'No handoff yet'}
                </div>
              </div>
              <div className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2">
                <div className="text-[10px] uppercase tracking-widest text-ohmic-text-dim">
                  Step 4
                </div>
                <div className="mt-1 text-xs text-ohmic-text">
                  {selectedLatestProviderEvent?.event_family === 'provider_follow_up'
                    ? 'Completed'
                    : selectedLatestProviderEvent
                      ? 'Needs follow-up'
                      : 'No provider event'}
                </div>
              </div>
              <div className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2">
                <div className="text-[10px] uppercase tracking-widest text-ohmic-text-dim">
                  Step 5
                </div>
                <div className="mt-1 text-xs text-ohmic-text">
                  {selectedLatestProviderEvent?.event_family === 'provider_follow_up'
                    ? 'Can reopen'
                    : 'Complete or continue'}
                </div>
              </div>
            </div>
            {selectedLatestProviderEvent?.handoff_note ? (
              <div className="text-xs text-ohmic-text-dim whitespace-pre-wrap">
                {selectedLatestProviderEvent.handoff_note}
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="panel">
          <div className="text-[10px] uppercase tracking-wider text-ohmic-text-dim">
            Total handoffs
          </div>
          <div className="mt-2 text-2xl font-semibold text-ohmic-text">
            {providerSummary.totalCount}
          </div>
        </div>
        <div className="panel">
          <div className="text-[10px] uppercase tracking-wider text-ohmic-text-dim">
            Attachment reviews
          </div>
          <div className="mt-2 text-2xl font-semibold text-ohmic-text">
            {providerSummary.attachmentReviewCount}
          </div>
        </div>
        <div className="panel">
          <div className="text-[10px] uppercase tracking-wider text-ohmic-text-dim">
            Active targets
          </div>
          <div className="mt-2 text-2xl font-semibold text-ohmic-text">
            {providerSummary.uniqueTargetCount}
          </div>
        </div>
        <div className="panel">
          <div className="text-[10px] uppercase tracking-wider text-ohmic-text-dim">
            Unresolved follow-up
          </div>
          <div className="mt-2 text-2xl font-semibold text-ohmic-text">
            {providerSummary.unresolvedCount}
          </div>
          <div className="mt-1 text-[11px] text-ohmic-text-dim">
            {providerSummaryDelta.unresolved !== 0
              ? `${providerSummaryDelta.unresolved > 0 ? '+' : ''}${providerSummaryDelta.unresolved} since last refresh | `
              : ''}
            {providerSummary.staleFollowUpCount} stale
            {providerSummaryDelta.stale !== 0
              ? ` (${providerSummaryDelta.stale > 0 ? '+' : ''}${providerSummaryDelta.stale} since last refresh)`
              : ''}
          </div>
            </div>
          </div>

      <div className="panel space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
            Target trends
          </div>
          <div className="text-[10px] text-ohmic-text-dim">
            Queue pressure by provider target
          </div>
        </div>
        {providerTargetTrends.length === 0 ? (
          <div className="text-sm text-ohmic-text-dim">
            Provider target trends will appear after handoff and follow-up activity.
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
            {providerTargetTrends.map((trend) => (
              <div
                key={`trend-${trend.targetLabel}`}
                className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 space-y-1.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-xs text-ohmic-text">{trend.targetLabel}</div>
                  <div
                    className={`text-[10px] uppercase tracking-widest ${
                      trend.trend === 'rising'
                        ? 'text-amber-300'
                        : trend.trend === 'clearing'
                          ? 'text-emerald-300'
                          : 'text-ohmic-accent'
                    }`}
                  >
                    {trend.trendLabel}
                  </div>
                </div>
                <div className="text-[11px] text-ohmic-text-dim">
                  {trend.unresolvedCount} open
                  {trend.completedCount > 0 ? ` | ${trend.completedCount} completed` : ''}
                  {trend.attachmentReviewCount > 0
                    ? ` | ${trend.attachmentReviewCount} attachments`
                    : ''}
                </div>
                {trend.unresolvedCount >= 3 ? (
                  <div className="text-[10px] uppercase tracking-widest text-rose-300">
                    Target overload warning
                  </div>
                ) : null}
                <div className="text-[10px] text-ohmic-text-dim">
                  {trend.latestOccurredAt
                    ? `Latest ${new Date(trend.latestOccurredAt).toLocaleString()}`
                    : 'No recent activity'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="panel space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
            Provider Follow-up Queue
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="text-[10px] text-ohmic-text-dim">
              {visibleProviderFollowUpQueue.length === 0
              ? 'No follow-up queued'
              : `${visibleProviderFollowUpQueue.length} visible item${visibleProviderFollowUpQueue.length === 1 ? '' : 's'}`}
            </div>
            <button
              onClick={() =>
                setFollowUpSort((current) =>
                  current === 'priority'
                    ? 'age'
                    : current === 'age'
                      ? 'target'
                      : current === 'target'
                        ? 'recent'
                        : 'priority'
                )
              }
              className="rounded border border-ohmic-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-text-dim transition-colors hover:border-ohmic-accent/30 hover:text-ohmic-text"
            >
              {followUpSort === 'priority'
                ? 'Sort: priority'
                : followUpSort === 'age'
                  ? 'Sort: age'
                  : followUpSort === 'target'
                    ? 'Sort: target'
                    : 'Sort: recent'}
            </button>
            <button
              onClick={() => setFollowUpScope(followUpScope === 'all' ? 'selected' : 'all')}
              className="rounded border border-ohmic-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-text-dim transition-colors hover:border-ohmic-accent/30 hover:text-ohmic-text"
            >
              {followUpScope === 'selected' ? 'Selected intake only' : 'All intake'}
            </button>
            <button
              onClick={() =>
                setFollowUpFilter((current) =>
                  current === 'all'
                    ? 'needs_attachment_review'
                    : current === 'needs_attachment_review'
                      ? 'follow_up_pending'
                      : 'all'
                )
              }
              className="rounded border border-ohmic-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-text-dim transition-colors hover:border-ohmic-accent/30 hover:text-ohmic-text"
            >
              {followUpFilter === 'all'
                ? 'All priorities'
                : followUpFilter === 'needs_attachment_review'
                  ? 'Attachment review'
                  : 'Follow-up pending'}
            </button>
          </div>
        </div>
        {selectedFollowUpItems.length > 0 ? (
          <div className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 flex flex-wrap items-center justify-between gap-3">
            <div className="text-[11px] text-ohmic-text-dim">
              {selectedFollowUpItems.length} selected for bulk provider action
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleBulkLoad}
                className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
              >
                Load first into desk
              </button>
              <button
                onClick={handleBulkPrime}
                className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
              >
                Prime selected
              </button>
              <button
                onClick={() => void handleBulkComplete()}
                className="rounded border border-emerald-400/30 px-2.5 py-1 text-[11px] font-medium text-emerald-300 transition-colors hover:border-emerald-300 hover:bg-emerald-300/10"
              >
                Complete selected
              </button>
              <button
                onClick={() => void handleBulkReassignToSelectedTarget()}
                disabled={!selectedTandemPreset}
                className="rounded border border-ohmic-accent/40 px-2.5 py-1 text-[11px] font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10 disabled:opacity-50"
              >
                Reassign to current target
              </button>
              <button
                onClick={clearFollowUpSelection}
                className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text-dim transition-colors hover:border-ohmic-accent/30 hover:text-ohmic-text"
              >
                Clear selection
              </button>
            </div>
          </div>
        ) : null}
        <div className="text-[10px] text-ohmic-text-dim">
          Shortcuts: Ctrl+Shift+L load, Ctrl+Shift+P prime, Ctrl+Shift+Enter complete,
          Ctrl+Shift+R reopen completed, Ctrl+Shift+N save provider note.
        </div>
        {attachmentReviewQueue.length > 0 ? (
          <div className="rounded border border-amber-300/25 bg-amber-300/5 px-3 py-3 space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-amber-300">
              Attachment review lane
            </div>
            <div className="space-y-2">
              {attachmentReviewQueue.map((item) => (
                <div
                  key={`${item.intakeId}-${item.attachmentId ?? 'attachment-review'}`}
                  className="rounded border border-amber-300/20 bg-ohmic-bg px-3 py-2 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="text-xs text-ohmic-text">{item.intakeTitle}</div>
                      <div className="text-[11px] text-ohmic-text-dim">
                        {item.targetLabel}
                        {item.attachmentId ? ` | ${item.attachmentId}` : ''}
                      </div>
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-amber-300">
                      {formatSlaTimer(item.occurredAt)}
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-[11px] text-ohmic-text-dim">
                    <input
                      type="checkbox"
                      checked={selectedFollowUpKeys.includes(buildFollowUpSelectionKey(item))}
                      onChange={() => toggleFollowUpSelection(item)}
                    />
                    Select for bulk action
                  </label>
                  {item.handoffNote ? (
                    <div className="text-[11px] text-ohmic-text-dim whitespace-pre-wrap">
                      {item.handoffNote}
                    </div>
                  ) : null}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => {
                        loadProviderItemIntoDesk(item)
                      }}
                      className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                    >
                      Load into Tandem desk
                    </button>
                    {item.launchUrl ? (
                      <a
                        href={item.launchUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded border border-ohmic-accent/40 px-2.5 py-1 text-[11px] font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10"
                      >
                        Open recorded launch
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {visibleProviderFollowUpQueue.length === 0 ? (
          <div className="text-sm text-ohmic-text-dim">
            Recent provider handoffs that still need operator review will appear here.
          </div>
        ) : renderedFollowUpQueue.length === 0 ? (
          <div className="text-sm text-ohmic-text-dim">
            No general provider follow-up items match the current filter.
          </div>
        ) : (
          <div className="space-y-2">
            {renderedFollowUpQueue.map((item) => (
              <div
                key={`${item.intakeId}-${item.occurredAt ?? 'provider'}`}
                className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 space-y-1.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="text-xs text-ohmic-text">{item.intakeTitle}</div>
                    <div className="text-[11px] text-ohmic-text-dim">
                      {item.intakeId}
                      {` | ${item.targetLabel}`}
                      {item.attachmentId ? ` | ${item.attachmentId}` : ''}
                    </div>
                  </div>
                  <div className="space-y-1 text-right">
                    <div
                      className={`text-[10px] uppercase tracking-widest ${item.priority === 'needs_attachment_review' ? 'text-amber-300' : 'text-ohmic-accent'}`}
                    >
                      {item.priorityLabel}
                    </div>
                    <div
                      className={`text-[10px] uppercase tracking-widest ${
                        item.ageBand === 'stale'
                          ? 'text-rose-300'
                          : item.ageBand === 'aging'
                            ? 'text-yellow-300'
                            : 'text-emerald-300'
                      }`}
                    >
                      {formatSlaTimer(item.occurredAt)}
                    </div>
                    <div className="text-[10px] text-ohmic-text-dim whitespace-nowrap">
                      {item.occurredAt ? new Date(item.occurredAt).toLocaleString() : '--'}
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-[11px] text-ohmic-text-dim">
                    <input
                      type="checkbox"
                      checked={selectedFollowUpKeys.includes(buildFollowUpSelectionKey(item))}
                      onChange={() => toggleFollowUpSelection(item)}
                    />
                    Select
                  </label>
                </div>
                {item.handoffNote ? (
                  <div className="text-[11px] text-ohmic-text-dim whitespace-pre-wrap">
                    {item.handoffNote}
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => {
                      loadProviderItemIntoDesk(item)
                    }}
                    className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                  >
                    Load into Tandem desk
                  </button>
                  <button
                    onClick={() =>
                      primeProviderFollowUp({
                        event_id: `${item.intakeId}-${item.occurredAt ?? 'provider-handoff'}`,
                        event_family: 'provider_handoff',
                        intake_id: item.intakeId,
                        summary_label: item.intakeTitle,
                        actor_label: 'provider_workspace',
                        occurred_at: item.occurredAt ?? '',
                        status_delta:
                          item.priority === 'needs_attachment_review'
                            ? 'attachment_review'
                            : 'follow_up_pending',
                        target_label: item.targetLabel,
                        target_preset_id: item.targetPresetId ?? undefined,
                        launch_url: item.launchUrl ?? undefined,
                        attachment_id: item.attachmentId ?? undefined,
                        handoff_note: item.handoffNote ?? undefined,
                      })
                    }
                    className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                  >
                    Prime follow-up
                  </button>
                  <button
                    onClick={() => void handleCompleteFollowUp(item)}
                    className="rounded border border-emerald-400/30 px-2.5 py-1 text-[11px] font-medium text-emerald-300 transition-colors hover:border-emerald-300 hover:bg-emerald-300/10"
                  >
                    Mark complete
                  </button>
                  {item.launchUrl ? (
                    <a
                      href={item.launchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded border border-ohmic-accent/40 px-2.5 py-1 text-[11px] font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10"
                    >
                      Open recorded launch
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="panel space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
            Target runway
          </div>
          <div className="flex items-center gap-2">
            {focusedTargetLabel ? (
              <button
                onClick={() => setFocusedTargetLabel(null)}
                className="rounded border border-ohmic-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-text-dim transition-colors hover:border-ohmic-accent/30 hover:text-ohmic-text"
              >
                Clear focus
              </button>
            ) : null}
            <div className="text-[10px] text-ohmic-text-dim">
              {providerSummary.latestOccurredAt
                ? `Last handoff ${new Date(providerSummary.latestOccurredAt).toLocaleString()}`
                : 'No provider activity yet'}
            </div>
          </div>
        </div>
        {providerTargetGroups.length === 0 ? (
          <div className="text-sm text-ohmic-text-dim">
            Provider target groups will appear here after handoff activity.
          </div>
        ) : (
          <div className="space-y-2">
            {providerTargetGroups.map((group) => (
              <div
                key={group.targetLabel}
                className={`rounded border px-3 py-2 flex items-start justify-between gap-3 ${
                  focusedTargetLabel === group.targetLabel
                    ? 'border-ohmic-accent/40 bg-ohmic-accent/10'
                    : 'border-ohmic-border bg-ohmic-bg'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="text-xs text-ohmic-text">{group.targetLabel}</div>
                  <div className="text-[11px] text-ohmic-text-dim">
                    {group.count} handoff{group.count === 1 ? '' : 's'}
                    {group.unresolvedCount > 0
                      ? ` | ${group.unresolvedCount} open`
                      : ''}
                  </div>
                  {group.oldestOutstandingAt ? (
                    <div className="text-[10px] text-ohmic-text-dim">
                      Oldest open {new Date(group.oldestOutstandingAt).toLocaleString()}
                    </div>
                  ) : null}
                </div>
                <div className="space-y-2 text-right">
                  <div
                    className={`text-[10px] uppercase tracking-widest ${
                      group.status === 'attention'
                        ? 'text-amber-300'
                        : group.status === 'attached'
                          ? 'text-emerald-300'
                          : 'text-ohmic-accent'
                    }`}
                  >
                    {group.statusLabel}
                  </div>
                  {group.unresolvedCount > 0 ? (
                    <div
                      className={`text-[10px] uppercase tracking-widest ${
                        group.ageBand === 'stale'
                          ? 'text-rose-300'
                          : group.ageBand === 'aging'
                            ? 'text-yellow-300'
                            : 'text-emerald-300'
                      }`}
                    >
                      {formatSlaTimer(group.oldestOutstandingAt ?? group.latestOccurredAt)}
                    </div>
                  ) : null}
                  <div className="text-[10px] text-ohmic-text-dim whitespace-nowrap">
                    {group.latestOccurredAt
                      ? new Date(group.latestOccurredAt).toLocaleString()
                      : '--'}
                  </div>
                  <button
                    onClick={() => setFocusedTargetLabel(group.targetLabel)}
                    className="rounded border border-ohmic-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-text-dim transition-colors hover:border-ohmic-accent/30 hover:text-ohmic-text"
                  >
                    Focus target
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="panel space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
            Provider targets
          </div>
          <div className="text-[10px] text-ohmic-text-dim">
            {selectedTandemPreset
              ? `Selected ${selectedTandemPreset.display_label}`
              : 'No target selected'}
          </div>
        </div>
        {tandemTargetPresets.length === 0 ? (
          <div className="text-sm text-ohmic-text-dim">
            Add Tandem target presets to start provider-target launch work from this desk.
          </div>
        ) : (
          <div className="space-y-3">
            {groupedTargetPresets.map((group) => (
              <div key={group.groupLabel} className="space-y-2">
                <div className="text-[10px] uppercase tracking-widest text-ohmic-text-dim">
                  {group.groupLabel}
                </div>
                <div className="space-y-2">
                  {group.presets.map((preset) => {
                    const contextualLaunchUrl = buildTandemContextUrl(
                      tandemLaunchUrl,
                      selectedIntake,
                      preset
                    )
                    const presetAttached =
                      tandemSessionState === 'attached' &&
                      tandemActiveTargetLabel === preset.target_label

                    return (
                      <div
                        key={preset.preset_id}
                        className={`rounded border px-3 py-2 space-y-2 ${
                          preset.preset_id === selectedTandemPresetId
                            ? 'border-ohmic-accent/40 bg-ohmic-accent/10'
                            : 'border-ohmic-border bg-ohmic-bg'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 min-w-0">
                            <div className="text-xs text-ohmic-text">{preset.display_label}</div>
                            <div className="text-[11px] text-ohmic-text-dim break-words">
                              {preset.target_label}
                            </div>
                            <div className="text-[10px] text-ohmic-text-dim">
                              {preset.team_label || 'Unassigned'}
                              {preset.target_kind ? ` | ${preset.target_kind}` : ''}
                            </div>
                            {preset.default_note ? (
                              <div className="text-[10px] text-ohmic-text-dim whitespace-pre-wrap">
                                {preset.default_note}
                              </div>
                            ) : null}
                            {targetHealthMap.get(preset.target_label)?.message ? (
                              <div className="text-[10px] text-ohmic-text-dim whitespace-pre-wrap">
                                {targetHealthMap.get(preset.target_label)?.message}
                              </div>
                            ) : null}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {preset.preset_id === selectedTandemPresetId ? (
                              <span className="rounded-full border border-ohmic-accent/40 px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-accent">
                                active
                              </span>
                            ) : null}
                            {presetAttached ? (
                              <span className="rounded-full bg-emerald-300/15 px-2 py-0.5 text-[10px] uppercase tracking-widest text-emerald-300">
                                attached
                              </span>
                            ) : null}
                            {targetHealthMap.get(preset.target_label) &&
                            targetHealthMap.get(preset.target_label)?.status !== 'attached' ? (
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                                  targetHealthMap.get(preset.target_label)?.status === 'error'
                                    ? 'bg-rose-300/15 text-rose-300'
                                    : targetHealthMap.get(preset.target_label)?.status === 'attention'
                                      ? 'bg-amber-300/15 text-amber-300'
                                      : 'bg-ohmic-accent/15 text-ohmic-accent'
                                }`}
                              >
                                {targetHealthMap.get(preset.target_label)?.status}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => loadProviderTarget(preset.preset_id)}
                            className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                          >
                            Load target
                          </button>
                          <button
                            onClick={() => {
                              loadProviderTarget(preset.preset_id)
                              void handleTargetHandshake(preset)
                            }}
                            className="rounded border border-amber-400/30 px-2.5 py-1 text-[11px] font-medium text-amber-300 transition-colors hover:border-amber-300 hover:bg-amber-300/10"
                          >
                            Prepare handshake
                          </button>
                          {preset.default_note ? (
                            <button
                              onClick={() => setTandemHandoffNote(preset.default_note ?? '')}
                              className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                            >
                              Use default note
                            </button>
                          ) : null}
                          {contextualLaunchUrl ? (
                            <a
                              href={contextualLaunchUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => {
                                loadProviderTarget(preset.preset_id)
                                void handleProviderLaunch(contextualLaunchUrl, preset)
                              }}
                              className="rounded border border-ohmic-accent/40 px-2.5 py-1 text-[11px] font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10"
                            >
                              Open in Tandem
                            </a>
                          ) : (
                            <div className="rounded border border-ohmic-warning/30 px-2.5 py-1 text-[11px] text-ohmic-warning">
                              Launch not ready
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="panel space-y-3">
        <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
          Selected Intake
        </div>
        {!selectedIntake ? (
          <div className="text-sm text-ohmic-text-dim">
            Select an intake item to focus provider handoff work.
          </div>
        ) : !selectedHandoff ? (
          <div className="space-y-2">
            <div className="text-sm text-ohmic-text">
              {selectedIntake.title}
            </div>
            <div className="text-xs text-ohmic-text-dim">
              No provider handoff has been recorded for this intake yet.
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="text-sm text-ohmic-text">
                  {selectedHandoff.target_label || selectedHandoff.summary_label}
                </div>
                <div className="text-xs text-ohmic-text-dim">
                  {selectedIntake.intake_id}
                  {selectedHandoff.status_delta ? ` | ${selectedHandoff.status_delta}` : ''}
                  {selectedHandoff.attachment_id ? ` | ${selectedHandoff.attachment_id}` : ''}
                </div>
              </div>
              <div className="text-[10px] text-ohmic-text-dim whitespace-nowrap">
                {selectedHandoff.occurred_at
                  ? new Date(selectedHandoff.occurred_at).toLocaleString()
                  : '--'}
              </div>
            </div>
            {selectedHandoff.handoff_note ? (
              <div className="text-xs text-ohmic-text-dim whitespace-pre-wrap">
                {selectedHandoff.handoff_note}
              </div>
            ) : null}
            {selectedTandemPreset ? (
              <div className="flex flex-wrap gap-2">
                {buildCompletionReasonPresets(
                  selectedTandemPreset.target_kind,
                  selectedTandemPreset.target_label
                ).map((reason) => (
                  <button
                    key={`selected-complete-${reason}`}
                    onClick={() => setTandemHandoffNote(reason)}
                    className="rounded border border-ohmic-border px-2 py-0.5 text-[10px] text-ohmic-text-dim transition-colors hover:border-ohmic-accent/30 hover:text-ohmic-text"
                  >
                    Completion note
                  </button>
                ))}
                {buildReopenReasonPresets(
                  selectedTandemPreset.target_kind,
                  selectedTandemPreset.target_label
                ).map((reason) => (
                  <button
                    key={`selected-reopen-${reason}`}
                    onClick={() => setTandemHandoffNote(reason)}
                    className="rounded border border-ohmic-border px-2 py-0.5 text-[10px] text-ohmic-text-dim transition-colors hover:border-ohmic-accent/30 hover:text-ohmic-text"
                  >
                    Reopen note
                  </button>
                ))}
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => loadHandoffContext(selectedIntake.intake_id, -1)}
                className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
              >
                Load into Tandem desk
              </button>
              <button
                onClick={() => primeProviderFollowUp(selectedHandoff)}
                className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
              >
                Prime follow-up
              </button>
              <button
                onClick={() =>
                  void handleCompleteFollowUp({
                    intakeId: selectedIntake.intake_id,
                    targetPresetId: selectedHandoff.target_preset_id ?? null,
                    targetLabel:
                      selectedHandoff.target_label || selectedHandoff.summary_label,
                    handoffNote:
                      tandemHandoffNote.trim() ||
                      selectedHandoff.handoff_note ||
                      null,
                  })
                }
                className="rounded border border-emerald-400/30 px-2.5 py-1 text-[11px] font-medium text-emerald-300 transition-colors hover:border-emerald-300 hover:bg-emerald-300/10"
              >
                Mark complete
              </button>
              {selectedTandemPreset ? (
                <button
                  onClick={() => void handleTargetHandshake(selectedTandemPreset, tandemHandoffNote)}
                  className="rounded border border-amber-400/30 px-2.5 py-1 text-[11px] font-medium text-amber-300 transition-colors hover:border-amber-300 hover:bg-amber-300/10"
                >
                  Prepare handshake
                </button>
              ) : null}
              {selectedContextualLaunchUrl && selectedTandemPreset ? (
                <a
                  href={selectedContextualLaunchUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => void handleProviderLaunch(selectedContextualLaunchUrl, selectedTandemPreset)}
                  className="rounded border border-ohmic-accent/40 px-2.5 py-1 text-[11px] font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10"
                >
                  Open selected target
                </a>
              ) : null}
              {selectedHandoff.launch_url ? (
                <a
                  href={selectedHandoff.launch_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border border-ohmic-accent/40 px-2.5 py-1 text-[11px] font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10"
                >
                  Open last handoff
                </a>
              ) : null}
            </div>
          </div>
        )}
      </div>

      <div className="panel space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
            Provider Notes and Recovery
          </div>
          <div className="text-[10px] text-ohmic-text-dim">
            Desk notes, export, and completed follow-up recovery
          </div>
        </div>
        <div className="space-y-2">
          <textarea
            value={providerNoteDraft}
            onChange={(event) => setProviderNoteDraft(event.target.value)}
            placeholder={
              selectedId
                ? 'Add a provider-specific note for the selected intake...'
                : 'Select an intake to add a provider-specific note.'
            }
            disabled={!selectedId}
            className="min-h-24 w-full rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 text-sm text-ohmic-text outline-none transition-colors placeholder:text-ohmic-text-dim focus:border-ohmic-accent/40 disabled:opacity-50"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => void handleCreateProviderNote()}
              disabled={!selectedId || !providerNoteDraft.trim()}
              className="rounded border border-ohmic-accent/40 px-2.5 py-1 text-[11px] font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10 disabled:opacity-50"
            >
              Save provider note
            </button>
            <button
              onClick={exportProviderActivity}
              className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
            >
              Export provider activity
            </button>
          </div>
        </div>
        {recentCompletedProviderEvents.length === 0 ? (
          <div className="text-sm text-ohmic-text-dim">
            Completed provider follow-ups will appear here for recovery.
          </div>
        ) : (
          <div className="space-y-2">
            {selectedCompletedEventIds.length > 0 ? (
              <div className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 flex flex-wrap items-center justify-between gap-3">
                <div className="text-[11px] text-ohmic-text-dim">
                  {selectedCompletedEventIds.length} completed follow-up item
                  {selectedCompletedEventIds.length === 1 ? '' : 's'} selected
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => void handleBulkReopenCompleted()}
                    className="rounded border border-amber-400/30 px-2.5 py-1 text-[11px] font-medium text-amber-300 transition-colors hover:border-amber-300 hover:bg-amber-300/10"
                  >
                    Reopen selected
                  </button>
                  <button
                    onClick={clearCompletedSelection}
                    className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text-dim transition-colors hover:border-ohmic-accent/30 hover:text-ohmic-text"
                  >
                    Clear selection
                  </button>
                </div>
              </div>
            ) : null}
            {recentCompletedProviderEvents.slice(0, 6).map((item) => (
              <div
                key={`completed-${item.event_id}`}
                className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 space-y-1.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="text-xs text-ohmic-text">
                      {item.target_label || item.summary_label}
                    </div>
                    <div className="text-[11px] text-ohmic-text-dim">
                      {item.intake_id || 'No intake context'}
                      {item.status_delta ? ` | ${item.status_delta}` : ''}
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-[11px] text-ohmic-text-dim">
                    <input
                      type="checkbox"
                      checked={selectedCompletedEventIds.includes(item.event_id)}
                      onChange={() => toggleCompletedSelection(item.event_id)}
                    />
                    Select
                  </label>
                </div>
                {item.handoff_note ? (
                  <div className="text-[11px] text-ohmic-text-dim whitespace-pre-wrap">
                    {item.handoff_note}
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      item.intake_id
                        ? void handleReopenFollowUp({
                            intakeId: item.intake_id,
                            targetPresetId: item.target_preset_id ?? null,
                            targetLabel: item.target_label || item.summary_label,
                          })
                        : undefined
                    }
                    className="rounded border border-amber-400/30 px-2.5 py-1 text-[11px] font-medium text-amber-300 transition-colors hover:border-amber-300 hover:bg-amber-300/10"
                  >
                    Reopen follow-up
                  </button>
                  {selectedTandemPreset && item.target_label
                    ? buildReopenReasonPresets(
                        selectedTandemPreset.target_kind,
                        item.target_label
                      ).map((reason) => (
                        <button
                          key={`${item.event_id}-${reason}`}
                          onClick={() => setTandemHandoffNote(reason)}
                          className="rounded border border-ohmic-border px-2 py-0.5 text-[10px] text-ohmic-text-dim transition-colors hover:border-ohmic-accent/30 hover:text-ohmic-text"
                        >
                          Reopen note
                        </button>
                      ))
                    : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="panel space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
            Recent Provider Activity
          </div>
          <div className="text-[10px] text-ohmic-text-dim">
            {focusedTargetLabel ? `Focused: ${focusedTargetLabel}` : 'All targets'}
          </div>
        </div>
        {auditLoading && !auditAvailable ? (
          <div className="text-sm text-ohmic-text-dim animate-pulse">
            Loading provider activity...
          </div>
        ) : visibleRecentHandoffs.length === 0 ? (
          <div className="text-sm text-ohmic-text-dim">
            {focusedTargetLabel
              ? 'No provider handoffs match the focused target yet.'
              : 'Provider handoffs will appear here after operator launch activity.'}
          </div>
        ) : (
          <div className="space-y-2">
            {selectRecentProviderEvents(
              focusedTargetLabel
                ? recentProviderEvents.filter((item) => item.target_label === focusedTargetLabel)
                : recentProviderEvents,
              8
            ).map((item) => (
              <div
                key={item.event_id}
                className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 space-y-1.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="text-xs text-ohmic-text">
                      {item.target_label || item.summary_label}
                    </div>
                    <div className="text-[11px] text-ohmic-text-dim">
                      {item.intake_id || 'No intake context'}
                      {item.status_delta ? ` | ${item.status_delta}` : ''}
                      {item.attachment_id ? ` | ${item.attachment_id}` : ''}
                    </div>
                  </div>
                  <div className="text-[10px] text-ohmic-text-dim whitespace-nowrap">
                    {item.occurred_at ? new Date(item.occurred_at).toLocaleString() : '--'}
                  </div>
                </div>
                {item.handoff_note ? (
                  <div className="text-[11px] text-ohmic-text-dim whitespace-pre-wrap">
                    {item.handoff_note}
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() =>
                      loadHandoffContext(
                        item.intake_id || null,
                        recentHandoffs.findIndex((candidate) => candidate.event_id === item.event_id)
                      )
                    }
                    className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                  >
                    Load into Tandem desk
                  </button>
                  {item.event_family === 'provider_follow_up' ? (
                    <button
                      onClick={() =>
                        item.intake_id
                          ? void handleReopenFollowUp({
                              intakeId: item.intake_id,
                              targetPresetId: item.target_preset_id ?? null,
                              targetLabel: item.target_label || item.summary_label,
                            })
                          : undefined
                      }
                      className="rounded border border-amber-400/30 px-2.5 py-1 text-[11px] font-medium text-amber-300 transition-colors hover:border-amber-300 hover:bg-amber-300/10"
                    >
                      Reopen follow-up
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => primeProviderFollowUp(item)}
                        className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                      >
                        Prime follow-up
                      </button>
                      <button
                        onClick={() =>
                          item.intake_id
                            ? void handleCompleteFollowUp({
                                intakeId: item.intake_id,
                                targetPresetId: item.target_preset_id ?? null,
                                targetLabel: item.target_label || item.summary_label,
                                handoffNote: item.handoff_note ?? null,
                              })
                            : undefined
                        }
                        className="rounded border border-emerald-400/30 px-2.5 py-1 text-[11px] font-medium text-emerald-300 transition-colors hover:border-emerald-300 hover:bg-emerald-300/10"
                      >
                        Mark complete
                      </button>
                    </>
                  )}
                  {item.launch_url ? (
                    <a
                      href={item.launch_url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded border border-ohmic-accent/40 px-2.5 py-1 text-[11px] font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10"
                    >
                      Open recorded launch
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
