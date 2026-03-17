import { useIntakeStore } from '@/store/intakeStore'
import { useWarningReviewStore } from '@/store/warningReviewStore'
import { StatusBadge } from '@/components/StatusBadge'
import { TagChip } from '@/components/TagChip'

export function WarningReviewPanel() {
  const { items, select, selectedId } = useIntakeStore()
  const {
    items: warningRows,
    generatedAt,
    loading,
    error,
    available,
    fetch,
  } = useWarningReviewStore()
  const warningItems = items.filter((item) => item.warning_state === 'warnings_present')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Warning Review
        </h2>
        <span className="text-xs text-ohmic-text-dim">
          {available ? `${warningRows.length} flagged` : `${warningItems.length} flagged`}
        </span>
      </div>

      {available && generatedAt && (
        <div className="text-[10px] text-ohmic-text-dim">
          Projection updated {new Date(generatedAt).toLocaleString()}
        </div>
      )}

      {loading ? (
        <div className="panel text-sm text-ohmic-text-dim py-6 animate-pulse">
          Loading warning review...
        </div>
      ) : error ? (
        <div className="panel text-sm text-ohmic-danger py-6">{error}</div>
      ) : available ? (
        warningRows.length === 0 ? (
          <div className="panel text-sm text-ohmic-text-dim py-6">
            No warning-review rows are currently present in the runtime module.
          </div>
        ) : (
          <div className="space-y-2">
            {warningRows.map((item) => (
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
                      {item.intake_id} - {item.primary_warning_family || 'warning'}
                    </div>
                  </div>
                  <StatusBadge status={item.warning_level || 'warning'} />
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.warning_reasons.map((reason) => (
                    <TagChip key={reason} tag={reason} />
                  ))}
                </div>

                <div className="mt-2 grid grid-cols-1 gap-1 text-xs text-ohmic-text-dim">
                  <div>
                    Parse confidence:{' '}
                    <span className="text-ohmic-text">{item.parse_confidence || '--'}</span>
                  </div>
                  <div>
                    Reprocess:{' '}
                    <span className="text-ohmic-text">
                      {item.reprocess_eligible ? 'eligible' : 'not eligible'}
                    </span>
                    {item.latest_reprocess_status
                      ? ` - ${item.latest_reprocess_status}`
                      : ''}
                  </div>
                  {item.recommended_next_action && (
                    <div>
                      Recommended next action:{' '}
                      <span className="text-ohmic-text">{item.recommended_next_action}</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )
      ) : warningItems.length === 0 ? (
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

      {!available && (
        <button
          onClick={fetch}
          className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors"
        >
          Check for runtime warning module
        </button>
      )}
    </div>
  )
}
