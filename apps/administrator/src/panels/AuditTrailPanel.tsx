import { useEffect } from 'react'
import { useCommandStore } from '@/store/commandStore'
import { StatusBadge } from '@/components/StatusBadge'

export function AuditTrailPanel() {
  const { recentActions, auditLoading, loadAuditTrail } = useCommandStore()

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
          ↻ refresh
        </button>
      </div>

      {auditLoading ? (
        <div className="text-ohmic-text-dim text-xs animate-pulse">Loading audit trail…</div>
      ) : recentActions.length === 0 ? (
        <div className="panel text-center text-ohmic-text-dim text-sm py-6">
          <div className="text-2xl mb-2">📋</div>
          No recent actions
        </div>
      ) : (
        <div className="space-y-1">
          {recentActions.map((action) => (
            <div
              key={action.command_id}
              className="panel py-2 px-3 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-medium text-ohmic-text whitespace-nowrap">
                  {action.action}
                </span>
                <span className="text-xs text-ohmic-text-dim truncate">
                  {action.intake_id}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <StatusBadge status={action.validation_status} />
                <span className="text-[10px] text-ohmic-text-dim whitespace-nowrap">
                  {action.occurred_at
                    ? new Date(action.occurred_at).toLocaleString()
                    : '—'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
