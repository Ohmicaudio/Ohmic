import { useIntakeStore } from '@/store/intakeStore'
import { StatusBadge } from '@/components/StatusBadge'

export function WarningReviewPanel() {
  const { items, select, selectedId } = useIntakeStore()
  const warningItems = items.filter((item) => item.warning_state === 'warnings_present')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Warning Review
        </h2>
        <span className="text-xs text-ohmic-text-dim">{warningItems.length} flagged</span>
      </div>

      {warningItems.length === 0 ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          No warning-state items are currently visible in the intake queue.
        </div>
      ) : (
        <div className="space-y-2">
          {warningItems.map((item) => (
            <button
              key={item.intake_id}
              onClick={() => select(item.intake_id)}
              className={`w-full text-left panel transition-colors ${
                selectedId === item.intake_id
                  ? 'border-ohmic-warning/60 bg-ohmic-warning/10'
                  : 'hover:border-ohmic-warning/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="text-sm font-medium text-ohmic-text break-words">
                    {item.title}
                  </div>
                  <div className="text-xs text-ohmic-text-dim">
                    {item.warning_count} warning{item.warning_count !== 1 ? 's' : ''} -{' '}
                    {item.intake_id}
                  </div>
                </div>
                <StatusBadge status={item.status} />
              </div>

              {item.summary_label && (
                <p className="mt-2 text-xs text-ohmic-text-dim line-clamp-2">
                  {item.summary_label}
                </p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
