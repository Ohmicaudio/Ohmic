import { useEffect, useMemo } from 'react'
import { recordTandemLaunchIntent } from '@/api/tandem'
import { useTandemStore } from '@/store/tandemStore'
import { useIntakeStore } from '@/store/intakeStore'
import { buildTandemContextUrl } from '@/panels/tandemContext'
import { useAuditSummaryStore } from '@/store/auditSummaryStore'
import {
  resolveRecentTandemLaunchSelection,
  selectRecentTandemLaunches,
} from '@/panels/tandemHistory'

export function TandemPanel() {
  const items = useIntakeStore((state) => state.items)
  const selectedId = useIntakeStore((state) => state.selectedId)
  const selectIntake = useIntakeStore((state) => state.select)
  const {
    configured,
    available,
    mode,
    statusSource,
    probeState,
    sessionState,
    baseUrl,
    sessionLabel,
    activeTargetLabel,
    targetPresets,
    targetHealth,
    pendingHandshake,
    selectedPresetId,
    handoffNote,
    launchUrl,
    probeMessage,
    message,
    loading,
    error,
    setSelectedPreset,
    setHandoffNote,
    fetch,
  } = useTandemStore()
  const auditItems = useAuditSummaryStore((state) => state.items)
  const auditAvailable = useAuditSummaryStore((state) => state.available)
  const auditLoading = useAuditSummaryStore((state) => state.loading)
  const refreshAuditSummary = useAuditSummaryStore((state) => state.fetch)
  const selectedIntake = items.find((item) => item.intake_id === selectedId) ?? null
  const selectedPreset = useMemo(
    () => targetPresets.find((preset) => preset.preset_id === selectedPresetId) ?? null,
    [selectedPresetId, targetPresets]
  )
  const targetHealthMap = useMemo(
    () => new Map(targetHealth.map((item) => [item.target_label, item])),
    [targetHealth]
  )
  const contextualLaunchUrl = buildTandemContextUrl(launchUrl, selectedIntake, selectedPreset)
  const recentLaunches = useMemo(
    () => selectRecentTandemLaunches(auditItems),
    [auditItems]
  )

  useEffect(() => {
    void fetch()
  }, [fetch])

  useEffect(() => {
    if (!auditAvailable && !auditLoading) {
      void refreshAuditSummary()
    }
  }, [auditAvailable, auditLoading, refreshAuditSummary])

  async function handleTandemLaunch() {
    if (!contextualLaunchUrl) {
      return
    }

    try {
      await recordTandemLaunchIntent({
        intake_id: selectedIntake?.intake_id ?? null,
        target_preset_id: selectedPreset?.preset_id ?? null,
        target_label: selectedPreset?.target_label ?? activeTargetLabel ?? null,
        launch_url: contextualLaunchUrl,
        handoff_note: handoffNote.trim() || null,
      })
      await refreshAuditSummary()
    } catch {
      // Keep the handoff non-blocking even if audit writeback fails.
    }
  }

  function handleRestoreRecentLaunch(item: (typeof recentLaunches)[number]) {
    const selection = resolveRecentTandemLaunchSelection(item, targetPresets, items)
    if (selection.presetId) {
      setSelectedPreset(selection.presetId)
    }
    if (selection.intakeId) {
      selectIntake(selection.intakeId)
    }
    setHandoffNote(selection.handoffNote)
  }

  function handleResumePendingHandshake() {
    if (!pendingHandshake) {
      return
    }

    if (pendingHandshake.target_preset_id) {
      setSelectedPreset(pendingHandshake.target_preset_id)
    }
    if (pendingHandshake.intake_id) {
      selectIntake(pendingHandshake.intake_id)
    }
    setHandoffNote(pendingHandshake.handshake_note ?? '')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Tandem Handoff
        </h2>
        <button
          onClick={() => void fetch()}
          className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors"
        >
          refresh
        </button>
      </div>

      {loading ? (
        <div className="panel text-sm text-ohmic-text-dim py-6 animate-pulse">
          Loading Tandem status...
        </div>
      ) : error ? (
        <div className="panel text-sm text-ohmic-danger py-6">{error}</div>
      ) : (
        <div className="panel space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-medium text-ohmic-text">
              {configured ? 'Tandem configured' : 'Tandem not configured'}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                  available
                    ? 'bg-ohmic-success/15 text-ohmic-success'
                    : configured
                      ? 'bg-ohmic-warning/15 text-ohmic-warning'
                      : 'bg-ohmic-border text-ohmic-text-dim'
                }`}
              >
                {available ? 'available' : mode}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                  statusSource === 'probe'
                    ? 'bg-emerald-300/15 text-emerald-300'
                    : 'bg-ohmic-border text-ohmic-text-dim'
                }`}
              >
                {statusSource === 'probe' ? 'live probe' : 'env floor'}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                  probeState === 'reachable'
                    ? 'bg-emerald-300/15 text-emerald-300'
                    : probeState === 'error'
                      ? 'bg-amber-300/15 text-amber-300'
                      : 'bg-ohmic-border text-ohmic-text-dim'
                }`}
              >
                {probeState}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 text-xs text-ohmic-text-dim">
            <div>
              Session state: <span className="text-ohmic-text">{sessionState}</span>
            </div>
            <div>
              Active target:{' '}
              <span className="text-ohmic-text">{activeTargetLabel || '--'}</span>
            </div>
            <div>
              Base URL: <span className="text-ohmic-text">{baseUrl || '--'}</span>
            </div>
            <div>
              Session label: <span className="text-ohmic-text">{sessionLabel || '--'}</span>
            </div>
            <div>
              Launch URL:{' '}
              <span className="text-ohmic-text break-all">
                {contextualLaunchUrl || '--'}
              </span>
            </div>
          </div>

          {targetPresets.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
                Target presets
              </div>
              <select
                value={selectedPresetId}
                onChange={(event) => setSelectedPreset(event.target.value)}
                className="w-full bg-ohmic-bg border border-ohmic-border rounded px-3 py-2 text-sm text-ohmic-text focus:border-ohmic-accent focus:outline-none transition-colors"
              >
                {targetPresets.map((preset) => (
                  <option key={preset.preset_id} value={preset.preset_id}>
                    {preset.display_label}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {targetPresets.map((preset) => (
                  <div
                    key={preset.preset_id}
                    className={`rounded border px-2.5 py-1.5 text-[11px] ${
                      preset.preset_id === selectedPresetId
                        ? 'border-ohmic-accent/40 bg-ohmic-accent/10 text-ohmic-text'
                        : 'border-ohmic-border text-ohmic-text-dim'
                    }`}
                  >
                    <span className="text-ohmic-text">{preset.display_label}</span>
                    <span>{' -> '}{preset.target_label}</span>
                    {preset.team_label ? <span>{` | ${preset.team_label}`}</span> : null}
                    {preset.target_kind ? <span>{` | ${preset.target_kind}`}</span> : null}
                    {targetHealthMap.get(preset.target_label) ? (
                      <span>{` | ${targetHealthMap.get(preset.target_label)?.status}`}</span>
                    ) : null}
                  </div>
                ))}
              </div>
              {selectedPreset ? (
                <div className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 space-y-2 text-[11px] text-ohmic-text-dim">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-ohmic-text">
                      {selectedPreset.display_label}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-ohmic-text-dim">
                      {selectedPreset.team_label || 'Unassigned'}
                    </div>
                  </div>
                  <div>
                    {selectedPreset.target_label}
                    {selectedPreset.target_kind ? ` | ${selectedPreset.target_kind}` : ''}
                    {targetHealthMap.get(selectedPreset.target_label)
                      ? ` | ${targetHealthMap.get(selectedPreset.target_label)?.status}`
                      : ''}
                  </div>
                  {targetHealthMap.get(selectedPreset.target_label)?.message ? (
                    <div className="whitespace-pre-wrap">
                      {targetHealthMap.get(selectedPreset.target_label)?.message}
                    </div>
                  ) : null}
                  {selectedPreset.default_note ? (
                    <div className="space-y-2">
                      <div className="whitespace-pre-wrap">{selectedPreset.default_note}</div>
                      <button
                        onClick={() => setHandoffNote(selectedPreset.default_note ?? '')}
                        className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                      >
                        Use target default note
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="text-xs text-ohmic-text-dim">
            {probeMessage ||
              message ||
              'This is the first external-provider seam. Full tab/session handoff will build on this status floor.'}
          </div>

          {pendingHandshake ? (
            <div className="rounded border border-amber-300/30 bg-amber-300/10 px-3 py-2 space-y-2 text-[11px] text-amber-300">
              <div className="flex items-center justify-between gap-3">
                <div className="uppercase tracking-widest">Pending handshake</div>
                <div className="text-[10px] whitespace-nowrap">
                  {new Date(pendingHandshake.occurred_at).toLocaleString()}
                </div>
              </div>
              <div>
                {pendingHandshake.target_label || pendingHandshake.target_preset_id || 'Unlabeled target'}
                {pendingHandshake.intake_id ? ` | ${pendingHandshake.intake_id}` : ''}
              </div>
              {pendingHandshake.handshake_note ? (
                <div className="whitespace-pre-wrap text-ohmic-text-dim">
                  {pendingHandshake.handshake_note}
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleResumePendingHandshake}
                  className="rounded border border-amber-300/30 px-2.5 py-1 text-[11px] font-medium text-amber-300 transition-colors hover:border-amber-300 hover:bg-amber-300/10"
                >
                  Resume handshake
                </button>
              </div>
            </div>
          ) : null}

          {!configured || !selectedPreset || !contextualLaunchUrl ? (
            <div className="rounded border border-ohmic-warning/30 bg-ohmic-warning/10 px-3 py-2 text-[11px] text-ohmic-warning">
              {!configured
                ? 'Tandem launch is not ready until the base URL is configured.'
                : !selectedPreset
                  ? 'Choose a provider target preset before launch.'
                  : 'Launch URL is not ready yet for the selected provider target.'}
            </div>
          ) : null}

          <div className="space-y-1">
            <label className="block text-xs uppercase tracking-wider text-ohmic-text-dim">
              Handoff note
            </label>
            <textarea
              value={handoffNote}
              onChange={(event) => setHandoffNote(event.target.value)}
              placeholder="Optional context for why this provider handoff is happening..."
              rows={2}
              className="w-full bg-ohmic-bg border border-ohmic-border rounded px-3 py-2 text-sm text-ohmic-text placeholder:text-ohmic-muted focus:border-ohmic-accent focus:outline-none transition-colors resize-none"
            />
          </div>

          {selectedIntake ? (
            <div className="text-[11px] text-ohmic-text-dim">
              Opening Tandem will carry the current intake context for{' '}
              <span className="text-ohmic-text">{selectedIntake.intake_id}</span>.
            </div>
          ) : null}

          {contextualLaunchUrl ? (
            <div className="pt-1">
              <a
                href={contextualLaunchUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  void handleTandemLaunch()
                }}
                className="inline-flex items-center rounded-md border border-ohmic-accent/40 px-3 py-1.5 text-xs font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10"
              >
                Open Tandem
              </a>
            </div>
          ) : null}

          <div className="space-y-2 pt-1">
            <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
              Recent handoffs
            </div>
            {recentLaunches.length === 0 ? (
              <div className="text-[11px] text-ohmic-text-dim">
                Tandem launch events will appear here after operator handoff activity.
              </div>
            ) : (
              <div className="space-y-2">
                {recentLaunches.map((item) => (
                  <div
                    key={item.event_id}
                    className="rounded border border-ohmic-border px-3 py-2 text-[11px] text-ohmic-text-dim"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="text-ohmic-text">
                          {item.target_label || item.summary_label}
                        </div>
                        <div className="break-words">
                          {item.intake_id || 'No intake context'}
                          {item.status_delta ? ` | ${item.status_delta}` : ''}
                          {item.attachment_id ? ` | ${item.attachment_id}` : ''}
                        </div>
                        {item.handoff_note ? (
                          <div className="break-words text-[10px]">
                            {item.handoff_note}
                          </div>
                        ) : null}
                      </div>
                      <div className="whitespace-nowrap">
                        {item.occurred_at
                          ? new Date(item.occurred_at).toLocaleString()
                          : '--'}
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleRestoreRecentLaunch(item)}
                        className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                      >
                        Load into desk
                      </button>
                      {item.launch_url ? (
                        <a
                          href={item.launch_url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            handleRestoreRecentLaunch(item)
                          }}
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
      )}
    </div>
  )
}
