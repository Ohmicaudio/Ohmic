import { useEffect } from 'react'
import {
  matchesInactiveFilter,
  type InactiveFilterPreset,
  useInactiveIntakeStore,
} from '@/store/inactiveIntakeStore'
import { StatusBadge } from '@/components/StatusBadge'

const FILTERS: Array<{ id: InactiveFilterPreset; label: string }> = [
  { id: 'inactive_all', label: 'All Inactive' },
  { id: 'archived_only', label: 'Archived' },
  { id: 'routed_only', label: 'Routed' },
  { id: 'held_only', label: 'Held' },
  { id: 'waiting_only', label: 'Waiting' },
]

export function InactiveIntakePanel() {
  const {
    items,
    count,
    generatedAt,
    loading,
    error,
    activeFilter,
    fetch,
    setFilter,
  } = useInactiveIntakeStore()

  useEffect(() => {
    if (items.length === 0 && !loading) {
      void fetch()
    }
  }, [items.length, loading, fetch])

  const filteredItems = items.filter((item) =>
    matchesInactiveFilter(item.inactive_status, activeFilter)
  )

  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
            Inactive Intake
          </h2>
          <div className="text-xs text-ohmic-text-dim mt-1">
            {generatedAt ? `Projection updated ${new Date(generatedAt).toLocaleString()}` : 'Optional runtime surface'}
          </div>
        </div>
        <div className="text-xs text-ohmic-text-dim">{count} total</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setFilter(filter.id)}
            className={`rounded border px-2.5 py-1 text-xs transition-colors ${
              activeFilter === filter.id
                ? 'border-ohmic-accent bg-ohmic-accent/10 text-ohmic-text'
                : 'border-ohmic-border text-ohmic-text-dim hover:text-ohmic-text'
            }`}
          >
            {filter.label}
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
            <div key={item.intake_id} className="panel space-y-2">
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
