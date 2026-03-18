import { useMemo, useState } from 'react'
import {
  recordProviderFollowUpCompletion,
  recordProviderFollowUpReopen,
  recordTandemLaunchIntent,
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
  groupProviderHandoffsByTarget,
} from '@/panels/providerHandoffSummary'
import {
  selectRecentProviderEvents,
  resolveRecentTandemLaunchSelection,
  selectLatestTandemLaunchForIntake,
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
    return `Attachment review completed for ${item.targetLabel}.`
  }
  if (preset?.team_label) {
    return `${preset.team_label} follow-up completed for ${item.targetLabel}.`
  }
  return `Provider follow-up completed for ${item.targetLabel}.`
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

export function ProviderHandoffPanel() {
  const [focusedTargetLabel, setFocusedTargetLabel] = useState<string | null>(null)
  const [followUpFilter, setFollowUpFilter] = useState<
    'all' | 'needs_attachment_review' | 'follow_up_pending'
  >('all')
  const [followUpScope, setFollowUpScope] = useState<'all' | 'selected'>('all')
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
  const tandemLaunchUrl = useTandemStore((state) => state.launchUrl)
  const tandemHandoffNote = useTandemStore((state) => state.handoffNote)
  const setSelectedTandemPreset = useTandemStore((state) => state.setSelectedPreset)
  const setTandemHandoffNote = useTandemStore((state) => state.setHandoffNote)

  const selectedIntake = intakeItems.find((item) => item.intake_id === selectedId) ?? null
  const selectedHandoff = selectLatestTandemLaunchForIntake(auditItems, selectedId)
  const recentHandoffs = useMemo(() => selectRecentTandemLaunches(auditItems, 5), [auditItems])
  const recentProviderEvents = useMemo(() => selectRecentProviderEvents(auditItems, 8), [auditItems])
  const providerSummary = useMemo(() => buildProviderHandoffSummary(auditItems), [auditItems])
  const providerFollowUpQueue = useMemo(
    () => buildProviderFollowUpQueue(auditItems, intakeItems),
    [auditItems, intakeItems]
  )
  const providerTargetGroups = useMemo(
    () => groupProviderHandoffsByTarget(auditItems, tandemActiveTargetLabel, tandemSessionState),
    [auditItems, tandemActiveTargetLabel, tandemSessionState]
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

  async function handleRefresh() {
    await fetchAuditSummary()
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
        <button
          onClick={() => void handleRefresh()}
          className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors"
        >
          refresh
        </button>
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
          </div>
        ) : null}
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
            {providerSummary.staleFollowUpCount} stale
          </div>
        </div>
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
                    <div className="space-y-1 min-w-0">
                      <div className="text-xs text-ohmic-text">{item.intakeTitle}</div>
                      <div className="text-[11px] text-ohmic-text-dim">
                        {item.targetLabel}
                        {item.attachmentId ? ` | ${item.attachmentId}` : ''}
                      </div>
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-amber-300">
                      {item.ageLabel}
                    </div>
                  </div>
                  {item.handoffNote ? (
                    <div className="text-[11px] text-ohmic-text-dim whitespace-pre-wrap">
                      {item.handoffNote}
                    </div>
                  ) : null}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => {
                        if (item.targetPresetId) {
                          setSelectedTandemPreset(item.targetPresetId)
                        }
                        setTandemHandoffNote(
                          item.handoffNote ??
                            buildCompletionTemplate(item, tandemTargetPresets)
                        )
                        selectIntake(item.intakeId)
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
                  <div className="space-y-1 min-w-0">
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
                      {item.ageLabel}
                    </div>
                    <div className="text-[10px] text-ohmic-text-dim whitespace-nowrap">
                      {item.occurredAt ? new Date(item.occurredAt).toLocaleString() : '--'}
                    </div>
                  </div>
                </div>
                {item.handoffNote ? (
                  <div className="text-[11px] text-ohmic-text-dim whitespace-pre-wrap">
                    {item.handoffNote}
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => {
                      if (item.targetPresetId) {
                        setSelectedTandemPreset(item.targetPresetId)
                      }
                      setTandemHandoffNote(
                        item.handoffNote ??
                          buildCompletionTemplate(item, tandemTargetPresets)
                      )
                      selectIntake(item.intakeId)
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
                      {group.ageLabel}
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
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => loadProviderTarget(preset.preset_id)}
                            className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                          >
                            Load target
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
                    handoffNote: selectedHandoff.handoff_note ?? null,
                  })
                }
                className="rounded border border-emerald-400/30 px-2.5 py-1 text-[11px] font-medium text-emerald-300 transition-colors hover:border-emerald-300 hover:bg-emerald-300/10"
              >
                Mark complete
              </button>
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
