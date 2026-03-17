import { useEffect } from 'react'
import { useCommandStore } from '@/store/commandStore'
import { useIntakeStore } from '@/store/intakeStore'
import { StatusBadge } from '@/components/StatusBadge'

export function AuditTrailPanel() {
  const { recentActions, auditLoading, loadAuditTrail } = useCommandStore()
  const { selectedId, select } = useIntakeStore()

  useEffect(() => {
    loadAuditTrail()
  }, [loadAuditTrail])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Audit Trail
        </h2>
        <button
          onClick={loadAuditTrail}
          disabled={auditLoading}
          className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors disabled:opacity-50"
        >
          refresh
        </button>
      </div>

      {auditLoading ? (
        <div className="text-ohmic-text-dim text-xs animate-pulse">Loading audit trail...</div>
      ) : recentActions.length === 0 ? (
        <div className="panel text-center text-ohmic-text-dim text-sm py-6">
          No recent actions
        </div>
      ) : (
        <div className="space-y-1">
          {recentActions.map((action) => (
            <button
              key={action.command_id}
              onClick={() => select(action.intake_id)}
              className={`panel py-2 px-3 w-full text-left flex items-center justify-between gap-3 transition-colors ${
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
                  {action.occurred_at
                    ? new Date(action.occurred_at).toLocaleString()
                    : '--'}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
