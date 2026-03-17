import { useEffect } from 'react'
import { publishIntakeFocus } from '@/api/focus'
import { useCommandStore } from '@/store/commandStore'
import { useIntakeStore } from '@/store/intakeStore'
import { useStatusHistoryStore } from '@/store/statusHistoryStore'
import { StatusBadge } from '@/components/StatusBadge'
import { buildStatusHistoryContextNote } from '@/panels/statusHistoryContext'

export function StatusHistoryPanel() {
  const {
    recentActions,
    auditLoading,
    loadAuditTrail,
    noteText,
    setIntakeId,
    setActionInput,
    setNoteText,
  } = useCommandStore()
  const { selectedId, items } = useIntakeStore()
  const {
    items: historyItems,
    loading,
    available,
    fetch,
  } = useStatusHistoryStore()

  useEffect(() => {
    fetch()
    if (recentActions.length === 0) {
      void loadAuditTrail()
    }
  }, [fetch, recentActions.length, loadAuditTrail, selectedId])

  useEffect(() => {
    void publishIntakeFocus(selectedId || null).catch(() => undefined)
  }, [selectedId])

  const selectedItem = items.find((item) => item.intake_id === selectedId) ?? null
  const fallbackHistory = selectedId
    ? recentActions.filter((action) => action.intake_id === selectedId)
    : []

  function primeStatusContext(entry: (typeof historyItems)[number]) {
    if (!selectedId) {
      return
    }

    setIntakeId(selectedId)
    setActionInput('add_note')
    setNoteText(buildStatusHistoryContextNote(noteText, entry))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Status History
        </h2>
        {selectedId && (
          <span className="text-xs text-ohmic-text-dim">
            {(available ? historyItems.length : fallbackHistory.length)} event
            {(available ? historyItems.length : fallbackHistory.length) === 1 ? '' : 's'}
          </span>
        )}
      </div>

      {!selectedItem ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          Select an intake item to inspect its command and status timeline.
        </div>
      ) : available ? (
        loading ? (
          <div className="panel text-sm text-ohmic-text-dim py-6 animate-pulse">
            Loading status history...
          </div>
        ) : historyItems.length === 0 ? (
          <div className="panel text-sm text-ohmic-text-dim py-6">
            No status history is projected yet for this intake item.
          </div>
        ) : (
          <div className="space-y-2">
            {historyItems.map((entry) => (
              <div key={entry.status_history_record_id} className="panel space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={entry.new_status} />
                      {entry.is_current ? (
                        <span className="rounded-full border border-ohmic-accent/40 bg-ohmic-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-accent">
                          Current
                        </span>
                      ) : null}
                    </div>
                    <div className="text-xs text-ohmic-text-dim">
                      {entry.changed_at ? new Date(entry.changed_at).toLocaleString() : '--'}
                    </div>
                  </div>
                  {entry.previous_status ? (
                    <span className="text-xs text-ohmic-text-dim text-right">
                      {entry.previous_status} {'->'} {entry.new_status}
                    </span>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 gap-1 text-xs text-ohmic-text-dim">
                  <div>
                    Actor: <span className="text-ohmic-text">{entry.actor_label || '--'}</span>
                  </div>
                  <div>
                    Reason:{' '}
                    <span className="text-ohmic-text">
                      {entry.transition_reason || 'No transition reason recorded'}
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => primeStatusContext(entry)}
                    className="rounded border border-ohmic-border px-3 py-1.5 text-xs font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                  >
                    Prime Status Context
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        auditLoading && recentActions.length === 0 ? (
          <div className="panel text-sm text-ohmic-text-dim py-6 animate-pulse">
            Loading status history...
          </div>
        ) : fallbackHistory.length === 0 ? (
          <div className="panel text-sm text-ohmic-text-dim py-6">
            No command history is recorded yet for this intake item.
          </div>
        ) : (
          <div className="space-y-2">
            {fallbackHistory.map((action) => (
              <div key={action.command_id} className="panel space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="text-sm font-medium text-ohmic-text break-words">
                      {action.summary_label || action.action}
                    </div>
                    <div className="text-xs text-ohmic-text-dim">
                      {action.occurred_at ? new Date(action.occurred_at).toLocaleString() : '--'}
                    </div>
                  </div>
                  <StatusBadge status={action.resulting_status || action.validation_status} />
                </div>

                <div className="grid grid-cols-1 gap-1 text-xs text-ohmic-text-dim">
                  <div>
                    Action: <span className="text-ohmic-text">{action.action}</span>
                  </div>
                  <div>
                    Validation:{' '}
                    <span className="text-ohmic-text">{action.validation_status}</span>
                  </div>
                  <div>
                    Result: <span className="text-ohmic-text">{action.resulting_status}</span>
                  </div>
                  <div>
                    Command ID:{' '}
                    <span className="text-ohmic-text font-mono">{action.command_id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}
