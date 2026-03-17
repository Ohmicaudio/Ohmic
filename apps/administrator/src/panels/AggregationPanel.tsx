import { useCommandStore } from '@/store/commandStore'
import { useIntakeStore } from '@/store/intakeStore'
import { useAggregationPanelStore } from '@/store/aggregationPanelStore'
import { StatusBadge } from '@/components/StatusBadge'

export function AggregationPanel() {
  const { items, generatedAt, loading, error, available, fetch } = useAggregationPanelStore()
  const { select } = useIntakeStore()
  const { setIntakeId, setActionInput } = useCommandStore()

  function focusBundle(primaryIntakeId: string, recommendedAction?: string) {
    if (!primaryIntakeId) {
      return
    }

    select(primaryIntakeId)
    setIntakeId(primaryIntakeId)
    if (recommendedAction) {
      setActionInput(recommendedAction)
    }
  }

  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
            Aggregation Bundles
          </h2>
          {available && generatedAt && (
            <div className="text-[10px] text-ohmic-text-dim mt-1">
              Projection updated {new Date(generatedAt).toLocaleString()}
            </div>
          )}
        </div>
        {!available && (
          <button
            onClick={fetch}
            className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors"
          >
            Check for runtime module
          </button>
        )}
      </div>

      {loading ? (
        <div className="panel text-sm text-ohmic-text-dim py-6 animate-pulse">
          Loading aggregation bundles...
        </div>
      ) : error ? (
        <div className="panel text-sm text-ohmic-danger py-6">{error}</div>
      ) : !available ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          Aggregation bundles are not present in the current runtime yet.
        </div>
      ) : items.length === 0 ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          No aggregation bundles are currently present in the runtime module.
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.aggregation_bundle_id} className="panel space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="text-sm font-medium text-ohmic-text break-words">
                    {item.bundle_label}
                  </div>
                  <div className="text-xs text-ohmic-text-dim">
                    {item.bundle_kind || 'bundle'} - {item.member_count} member
                    {item.member_count === 1 ? '' : 's'}
                  </div>
                </div>
                <StatusBadge status={item.status || 'review'} />
              </div>

              {item.summary_text && (
                <div className="text-xs text-ohmic-text-dim">{item.summary_text}</div>
              )}

              <div className="grid grid-cols-1 gap-1 text-xs text-ohmic-text-dim">
                <div>
                  Primary intake:{' '}
                  <span className="text-ohmic-text">{item.primary_member_intake_id || '--'}</span>
                </div>
                <div>
                  Latest activity:{' '}
                  <span className="text-ohmic-text">
                    {item.latest_activity_at
                      ? new Date(item.latest_activity_at).toLocaleString()
                      : '--'}
                  </span>
                </div>
                {item.recommended_next_action && (
                  <div>
                    Recommended next action:{' '}
                    <span className="text-ohmic-text">{item.recommended_next_action}</span>
                  </div>
                )}
              </div>

              {item.primary_member_intake_id && (
                <div className="pt-1">
                  <button
                    onClick={() =>
                      focusBundle(
                        item.primary_member_intake_id,
                        item.recommended_next_action || undefined
                      )
                    }
                    className="rounded bg-ohmic-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-ohmic-accent-dim"
                  >
                    Open Bundle Focus
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
