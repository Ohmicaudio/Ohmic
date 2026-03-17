import { useEffect } from 'react'
import { useCommandStore } from '@/store/commandStore'
import { useIntakeStore } from '@/store/intakeStore'
import { StatusBadge } from '@/components/StatusBadge'

export function StatusHistoryPanel() {
  const { recentActions, auditLoading, loadAuditTrail } = useCommandStore()
  const { selectedId, items } = useIntakeStore()

  useEffect(() => {
    if (recentActions.length === 0) {
      void loadAuditTrail()
    }
  }, [recentActions.length, loadAuditTrail])

  const selectedItem = items.find((item) => item.intake_id === selectedId) ?? null
  const history = selectedId
    ? recentActions.filter((action) => action.intake_id === selectedId)
    : []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Status History
        </h2>
        {selectedId && (
          <span className="text-xs text-ohmic-text-dim">
            {history.length} event{history.length === 1 ? '' : 's'}
          </span>
        )}
      </div>

      {!selectedItem ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          Select an intake item to inspect its command and status timeline.
        </div>
      ) : auditLoading && recentActions.length === 0 ? (
        <div className="panel text-sm text-ohmic-text-dim py-6 animate-pulse">
          Loading status history...
        </div>
      ) : history.length === 0 ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          No command history is recorded yet for this intake item.
        </div>
      ) : (
        <div className="space-y-2">
          {history.map((action) => (
            <div key={action.command_id} className="panel space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="text-sm font-medium text-ohmic-text break-words">
                    {action.summary_label || action.action}
                  </div>
                  <div className="text-xs text-ohmic-text-dim">
                    {action.occurred_at
                      ? new Date(action.occurred_at).toLocaleString()
                      : '--'}
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
                  Command ID: <span className="text-ohmic-text font-mono">{action.command_id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
