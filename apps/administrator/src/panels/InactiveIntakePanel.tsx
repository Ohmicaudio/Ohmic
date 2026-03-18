import { useEffect } from 'react'
import {
  DEFAULT_INACTIVE_FILTERS,
  type InactiveFilterPreset,
  useInactiveIntakeStore,
} from '@/store/inactiveIntakeStore'
import { useIntakeStore } from '@/store/intakeStore'
import { useCommandStore } from '@/store/commandStore'
import { useAuditSummaryStore } from '@/store/auditSummaryStore'
import { useTandemStore } from '@/store/tandemStore'
import { StatusBadge } from '@/components/StatusBadge'
import { buildInactiveIntakeContextNote } from '@/panels/inactiveIntakeContext'
import { buildProviderFollowUpLookup } from '@/panels/providerHandoffSummary'
import {
  resolveRecentTandemLaunchSelection,
  selectLatestTandemLaunchForIntake,
} from '@/panels/tandemHistory'

export function InactiveIntakePanel() {
  const {
    items,
    count,
    generatedAt,
    loading,
    error,
    reopeningId,
    activeFilter,
    filterPresets,
    shellAvailable,
    fetch,
    reopen,
    setFilter,
  } = useInactiveIntakeStore()
  const fetchActiveIntake = useIntakeStore((s) => s.fetch)
  const selectActiveIntake = useIntakeStore((s) => s.select)
  const loadAuditTrail = useCommandStore((s) => s.loadAuditTrail)
  const noteText = useCommandStore((s) => s.noteText)
  const setIntakeId = useCommandStore((s) => s.setIntakeId)
  const setActionInput = useCommandStore((s) => s.setActionInput)
  const setNoteText = useCommandStore((s) => s.setNoteText)
  const auditItems = useAuditSummaryStore((s) => s.items)
  const auditAvailable = useAuditSummaryStore((s) => s.available)
  const auditLoading = useAuditSummaryStore((s) => s.loading)
  const fetchAuditSummary = useAuditSummaryStore((s) => s.fetch)
  const tandemTargetPresets = useTandemStore((s) => s.targetPresets)
  const setSelectedTandemPreset = useTandemStore((s) => s.setSelectedPreset)
  const setTandemHandoffNote = useTandemStore((s) => s.setHandoffNote)

  useEffect(() => {
    if (items.length === 0 && !loading) {
      void fetch()
    }
  }, [items.length, loading, fetch])

  useEffect(() => {
    if (items.length > 0 && !auditAvailable && !auditLoading) {
      void fetchAuditSummary()
    }
  }, [items.length, auditAvailable, auditLoading, fetchAuditSummary])

  const activePreset =
    filterPresets.find((preset) => preset.preset_id === activeFilter) ??
    DEFAULT_INACTIVE_FILTERS[0]
  const filteredItems = items.filter((item) =>
    activePreset.included_statuses.includes(item.inactive_status)
  )
  const providerFollowUpLookup = buildProviderFollowUpLookup(auditItems, [])

  async function handleReopen(intakeId: string, restoredStatus: string) {
    const response = await reopen(intakeId, restoredStatus || 'queued')
    if (response.writeback.writeback_status !== 'accepted') {
      return
    }

    await Promise.all([fetch(), fetchActiveIntake(), loadAuditTrail()])
    selectActiveIntake(intakeId)
  }

  function primeReopenContext(item: (typeof items)[number]) {
    setIntakeId(item.intake_id)
    setActionInput('add_note')
    setNoteText(buildInactiveIntakeContextNote(noteText, item))
  }

  function loadInactiveHandoffTarget(item: (typeof items)[number]) {
    const launch = selectLatestTandemLaunchForIntake(auditItems, item.intake_id)
    if (!launch) {
      return
    }

    const selection = resolveRecentTandemLaunchSelection(launch, tandemTargetPresets, [])
    if (selection.presetId) {
      setSelectedTandemPreset(selection.presetId)
    }
    setTandemHandoffNote(selection.handoffNote)
  }

  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
            Inactive Intake
          </h2>
          <div className="text-xs text-ohmic-text-dim mt-1">
            {generatedAt
              ? `Projection updated ${new Date(generatedAt).toLocaleString()}`
              : 'Optional runtime surface'}
          </div>
        </div>
        <div className="text-xs text-ohmic-text-dim">
          {count} total{shellAvailable ? ' - shell presets active' : ''}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterPresets.map((filter) => (
          <button
            key={filter.preset_id}
            onClick={() => setFilter(filter.preset_id as InactiveFilterPreset)}
            className={`rounded border px-2.5 py-1 text-xs transition-colors ${
              activeFilter === filter.preset_id
                ? 'border-ohmic-accent bg-ohmic-accent/10 text-ohmic-text'
                : 'border-ohmic-border text-ohmic-text-dim hover:text-ohmic-text'
            }`}
          >
            {filter.display_label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="panel text-sm text-ohmic-text-dim py-6 animate-pulse">
          Loading inactive intake projection...
        </div>
      ) : error ? (
        <div className="panel text-sm text-ohmic-danger py-6">{error}</div>
      ) : filteredItems.length === 0 ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          No inactive intake items are currently visible for this filter.
        </div>
      ) : (
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <div key={item.intake_id} className="panel space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="text-sm font-medium text-ohmic-text break-words">
                    {item.title}
                  </div>
                  <div className="text-xs text-ohmic-text-dim">
                    {item.intake_id} - inactive since{' '}
                    {item.inactive_since
                      ? new Date(item.inactive_since).toLocaleString()
                      : '--'}
                  </div>
                </div>
                <StatusBadge status={item.inactive_status || 'inactive'} />
              </div>

              {(() => {
                const providerFollowUp = providerFollowUpLookup.get(item.intake_id)
                if (!providerFollowUp) {
                  return null
                }

                return (
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                        providerFollowUp.priority === 'needs_attachment_review'
                          ? 'bg-amber-300/15 text-amber-300'
                          : 'bg-ohmic-accent/15 text-ohmic-accent'
                      }`}
                    >
                      {providerFollowUp.priorityLabel}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                        providerFollowUp.ageBand === 'stale'
                          ? 'bg-rose-300/15 text-rose-300'
                          : providerFollowUp.ageBand === 'aging'
                            ? 'bg-yellow-300/15 text-yellow-300'
                            : 'bg-emerald-300/15 text-emerald-300'
                      }`}
                    >
                      {providerFollowUp.ageLabel}
                    </span>
                    <span className="rounded-full bg-ohmic-bg px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-text-dim">
                      Provider workload
                    </span>
                  </div>
                )
              })()}

              {item.summary_label && (
                <div className="text-xs text-ohmic-text-dim">{item.summary_label}</div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-ohmic-text-dim">
                <div>
                  Last active:{' '}
                  <span className="text-ohmic-text">{item.last_active_status || '--'}</span>
                </div>
                <div>
                  Reopen allowed:{' '}
                  <span className="text-ohmic-text">{item.reopen_allowed ? 'yes' : 'no'}</span>
                </div>
                <div>
                  Reopen target:{' '}
                  <span className="text-ohmic-text">{item.reopen_target_status || '--'}</span>
                </div>
              </div>

              {(() => {
                const latestTandemLaunch = selectLatestTandemLaunchForIntake(
                  auditItems,
                  item.intake_id
                )

                if (!latestTandemLaunch) {
                  return null
                }

                const latestTandemSelection = resolveRecentTandemLaunchSelection(
                  latestTandemLaunch,
                  tandemTargetPresets,
                  []
                )

                return (
                  <div className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 space-y-1.5">
                    <div className="text-[10px] uppercase tracking-wider text-ohmic-text-dim">
                      Latest provider handoff
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-xs text-ohmic-text">
                        {latestTandemLaunch.target_label || latestTandemLaunch.summary_label}
                      </div>
                      <div className="text-[10px] text-ohmic-text-dim whitespace-nowrap">
                        {latestTandemLaunch.occurred_at
                          ? new Date(latestTandemLaunch.occurred_at).toLocaleString()
                          : '--'}
                      </div>
                    </div>
                    <div className="text-xs text-ohmic-text-dim">
                      {latestTandemLaunch.status_delta || 'provider_handoff'}
                      {latestTandemLaunch.attachment_id
                        ? ` | ${latestTandemLaunch.attachment_id}`
                        : ''}
                    </div>
                    {latestTandemLaunch.handoff_note ? (
                      <div className="text-xs text-ohmic-text-dim whitespace-pre-wrap">
                        {latestTandemLaunch.handoff_note}
                      </div>
                    ) : null}
                    {latestTandemLaunch.launch_url || latestTandemSelection.presetId ? (
                      <div className="pt-1 flex flex-wrap gap-2">
                        {latestTandemSelection.presetId ? (
                          <button
                            onClick={() => loadInactiveHandoffTarget(item)}
                            className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                          >
                            Load target into Tandem desk
                          </button>
                        ) : null}
                        {latestTandemLaunch.launch_url ? (
                          <a
                            href={latestTandemLaunch.launch_url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded border border-ohmic-accent/40 px-2.5 py-1 text-[11px] font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10"
                          >
                            Reopen last handoff
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                )
              })()}

              {item.reopen_allowed && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => primeReopenContext(item)}
                    className="rounded border border-ohmic-border px-3 py-1.5 text-xs font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                  >
                    Prime Reopen Context
                  </button>
                  <button
                    onClick={() => void handleReopen(item.intake_id, item.reopen_target_status)}
                    disabled={reopeningId === item.intake_id}
                    className="rounded bg-ohmic-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-ohmic-accent-dim disabled:bg-ohmic-border disabled:text-ohmic-muted"
                  >
                    {reopeningId === item.intake_id ? 'Reopening...' : 'Reopen Intake'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
