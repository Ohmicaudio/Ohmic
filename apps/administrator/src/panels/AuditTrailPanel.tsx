import { useEffect } from 'react'
import { useCommandStore } from '@/store/commandStore'
import { useIntakeStore } from '@/store/intakeStore'
import { useAuditSummaryStore } from '@/store/auditSummaryStore'
import { StatusBadge } from '@/components/StatusBadge'
import type { AdministratorAuditSummaryItem, AuditFilterPreset } from '@/types/intake'
import {
  buildAuditFollowUpNote,
  deriveAuditFollowUpAction,
} from '@/panels/auditFollowUp'

function filterAuditRows(
  rows: AdministratorAuditSummaryItem[],
  preset: AuditFilterPreset | null
): AdministratorAuditSummaryItem[] {
  if (!preset || preset.included_event_families.length === 0) {
    return rows
  }

  return rows.filter((row) => preset.included_event_families.includes(row.event_family))
}

export function AuditTrailPanel() {
  const {
    recentActions,
    auditLoading,
    loadAuditTrail,
    noteText,
    setIntakeId,
    setActionInput,
    setNoteText,
  } = useCommandStore()
  const { selectedId, select } = useIntakeStore()
  const {
    items,
    filterPresets,
    activePresetId,
    loading,
    available,
    fetch,
    setActivePreset,
  } = useAuditSummaryStore()

  useEffect(() => {
    fetch()
    loadAuditTrail()
  }, [fetch, loadAuditTrail])

  const activePreset =
    filterPresets.find((preset) => preset.preset_id === activePresetId) ?? null
  const filteredItems = filterAuditRows(items, activePreset)

  function primeAuditFollowUp(item: AdministratorAuditSummaryItem, action: string) {
    if (!item.intake_id) {
      return
    }

    const nextNote = buildAuditFollowUpNote(noteText, item)
    setIntakeId(item.intake_id)
    setActionInput(action)
    setNoteText(nextNote)
    select(item.intake_id)
  }

  function primeRecentActionFollowUp(
    intakeId: string,
    action: string,
    summaryLabel: string
  ) {
    setIntakeId(intakeId)
    setActionInput(action)
    setNoteText(buildAuditFollowUpNote(noteText, {
      event_family: 'status_transition',
      summary_label: summaryLabel,
      target_label: '',
      status_delta: '',
    }))
    select(intakeId)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Audit Trail
        </h2>
        <div className="flex items-center gap-3">
          {available && activePreset && (
            <span className="text-[10px] uppercase tracking-widest text-ohmic-text-dim">
              {activePreset.display_label}
            </span>
          )}
          <button
            onClick={() => {
              fetch()
              loadAuditTrail()
            }}
            disabled={loading || auditLoading}
            className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors disabled:opacity-50"
          >
            refresh
          </button>
        </div>
      </div>

      {available && filterPresets.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {filterPresets.map((preset) => (
            <button
              key={preset.preset_id}
              onClick={() => setActivePreset(preset.preset_id)}
              className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-widest transition-colors ${
                preset.preset_id === activePresetId
                  ? 'border-ohmic-accent/60 bg-ohmic-accent/15 text-ohmic-accent'
                  : 'border-ohmic-border text-ohmic-text-dim hover:border-ohmic-accent/30 hover:text-ohmic-text'
              }`}
            >
              {preset.display_label}
            </button>
          ))}
        </div>
      ) : null}

      {available ? (
        loading ? (
          <div className="text-ohmic-text-dim text-xs animate-pulse">Loading audit summary...</div>
        ) : filteredItems.length === 0 ? (
          <div className="panel text-center text-ohmic-text-dim text-sm py-6">
            No audit summary rows match this preset
          </div>
        ) : (
          <div className="space-y-1">
            {filteredItems.map((item) => (
              <div key={item.event_id} className="panel py-2 px-3 space-y-2">
                <button
                  onClick={() => item.intake_id && select(item.intake_id)}
                  className={`w-full text-left flex items-center justify-between gap-3 transition-colors ${
                    selectedId === item.intake_id
                      ? 'border-ohmic-accent/50 bg-ohmic-accent/10'
                      : 'hover:border-ohmic-accent/30'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xs font-medium text-ohmic-text truncate">
                        {item.summary_label || item.event_family}
                      </span>
                      {item.event_family ? (
                        <span className="rounded-full border border-ohmic-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-text-dim">
                          {item.event_family.replace(/_/g, ' ')}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-ohmic-text-dim">
                      {item.intake_id ? <span>{item.intake_id}</span> : null}
                      {item.actor_label ? <span>{item.actor_label}</span> : null}
                      {item.status_delta ? <span>{item.status_delta}</span> : null}
                      {item.target_label ? <span>{item.target_label}</span> : null}
                    </div>
                  </div>
                  <span className="text-[10px] text-ohmic-text-dim whitespace-nowrap">
                    {item.occurred_at ? new Date(item.occurred_at).toLocaleString() : '--'}
                  </span>
                </button>

                {item.intake_id && deriveAuditFollowUpAction(item.event_family) ? (
                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        primeAuditFollowUp(item, deriveAuditFollowUpAction(item.event_family)!)
                      }
                      className="rounded border border-ohmic-border px-2.5 py-1 text-[10px] uppercase tracking-widest text-ohmic-text-dim transition-colors hover:border-ohmic-accent/30 hover:text-ohmic-text"
                    >
                      Prime Follow-up
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )
      ) : (
        auditLoading ? (
          <div className="text-ohmic-text-dim text-xs animate-pulse">Loading audit trail...</div>
        ) : recentActions.length === 0 ? (
          <div className="panel text-center text-ohmic-text-dim text-sm py-6">
            No recent actions
          </div>
        ) : (
          <div className="space-y-1">
            {recentActions.map((action) => (
              <div key={action.command_id} className="panel py-2 px-3 space-y-2">
                <button
                  onClick={() => select(action.intake_id)}
                  className={`w-full text-left flex items-center justify-between gap-3 transition-colors ${
                    selectedId === action.intake_id
                      ? 'border-ohmic-accent/50 bg-ohmic-accent/10'
                      : 'hover:border-ohmic-accent/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-medium text-ohmic-text truncate">
                      {action.summary_label || action.action}
                    </span>
                    <span className="text-xs text-ohmic-text-dim whitespace-nowrap">
                      {action.intake_id}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <StatusBadge status={action.validation_status} />
                    <span className="text-[10px] text-ohmic-text-dim whitespace-nowrap">
                      {action.occurred_at ? new Date(action.occurred_at).toLocaleString() : '--'}
                    </span>
                  </div>
                </button>

                {action.intake_id && action.action ? (
                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        primeRecentActionFollowUp(
                          action.intake_id,
                          action.action,
                          action.summary_label || action.action
                        )
                      }
                      className="rounded border border-ohmic-border px-2.5 py-1 text-[10px] uppercase tracking-widest text-ohmic-text-dim transition-colors hover:border-ohmic-accent/30 hover:text-ohmic-text"
                    >
                      Reuse Action
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}
