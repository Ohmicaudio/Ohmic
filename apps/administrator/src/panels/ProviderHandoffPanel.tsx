import { useMemo, useState } from 'react'
import { recordTandemLaunchIntent } from '@/api/tandem'
import { useAuditSummaryStore } from '@/store/auditSummaryStore'
import { useIntakeStore } from '@/store/intakeStore'
import { useTandemStore } from '@/store/tandemStore'
import { buildTandemContextUrl } from '@/panels/tandemContext'
import {
  buildProviderHandoffSummary,
  groupProviderHandoffsByTarget,
} from '@/panels/providerHandoffSummary'
import {
  resolveRecentTandemLaunchSelection,
  selectLatestTandemLaunchForIntake,
  selectRecentTandemLaunches,
} from '@/panels/tandemHistory'

export function ProviderHandoffPanel() {
  const [focusedTargetLabel, setFocusedTargetLabel] = useState<string | null>(null)
  const intakeItems = useIntakeStore((state) => state.items)
  const selectedId = useIntakeStore((state) => state.selectedId)
  const selectIntake = useIntakeStore((state) => state.select)
  const auditItems = useAuditSummaryStore((state) => state.items)
  const auditAvailable = useAuditSummaryStore((state) => state.available)
  const auditLoading = useAuditSummaryStore((state) => state.loading)
  const fetchAuditSummary = useAuditSummaryStore((state) => state.fetch)
  const tandemTargetPresets = useTandemStore((state) => state.targetPresets)
  const selectedTandemPresetId = useTandemStore((state) => state.selectedPresetId)
  const tandemLaunchUrl = useTandemStore((state) => state.launchUrl)
  const tandemHandoffNote = useTandemStore((state) => state.handoffNote)
  const setSelectedTandemPreset = useTandemStore((state) => state.setSelectedPreset)
  const setTandemHandoffNote = useTandemStore((state) => state.setHandoffNote)

  const selectedIntake = intakeItems.find((item) => item.intake_id === selectedId) ?? null
  const selectedHandoff = selectLatestTandemLaunchForIntake(auditItems, selectedId)
  const recentHandoffs = useMemo(() => selectRecentTandemLaunches(auditItems, 5), [auditItems])
  const providerSummary = useMemo(() => buildProviderHandoffSummary(auditItems), [auditItems])
  const providerTargetGroups = useMemo(
    () => groupProviderHandoffsByTarget(auditItems),
    [auditItems]
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

  async function handleRefresh() {
    await fetchAuditSummary()
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  </div>
                </div>
                <div className="space-y-2 text-right">
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
          <div className="space-y-2">
            {tandemTargetPresets.map((preset) => {
              const contextualLaunchUrl = buildTandemContextUrl(
                tandemLaunchUrl,
                selectedIntake,
                preset
              )

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
                    </div>
                    {preset.preset_id === selectedTandemPresetId ? (
                      <span className="rounded-full border border-ohmic-accent/40 px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-accent">
                        active
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => loadProviderTarget(preset.preset_id)}
                      className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                    >
                      Load target
                    </button>
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
                    ) : null}
                  </div>
                </div>
              )
            })}
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
            {visibleRecentHandoffs.map((item, index) => (
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
