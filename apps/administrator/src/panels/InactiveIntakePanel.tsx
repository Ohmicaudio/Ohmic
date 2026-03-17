import { useEffect } from 'react'
import {
  DEFAULT_INACTIVE_FILTERS,
  type InactiveFilterPreset,
  useInactiveIntakeStore,
} from '@/store/inactiveIntakeStore'
import { useIntakeStore } from '@/store/intakeStore'
import { useCommandStore } from '@/store/commandStore'
import { StatusBadge } from '@/components/StatusBadge'

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

  useEffect(() => {
    if (items.length === 0 && !loading) {
      void fetch()
    }
  }, [items.length, loading, fetch])

  const activePreset =
    filterPresets.find((preset) => preset.preset_id === activeFilter) ??
    DEFAULT_INACTIVE_FILTERS[0]
  const filteredItems = items.filter((item) =>
    activePreset.included_statuses.includes(item.inactive_status)
  )

  async function handleReopen(intakeId: string, restoredStatus: string) {
    const response = await reopen(intakeId, restoredStatus || 'queued')
    if (response.writeback.writeback_status !== 'accepted') {
      return
    }

    await Promise.all([fetch(), fetchActiveIntake(), loadAuditTrail()])
    selectActiveIntake(intakeId)
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

              {item.reopen_allowed && (
                <div className="pt-1">
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
