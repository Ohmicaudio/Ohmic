import { useEffect } from 'react'
import { useFilingHistoryStore } from '@/store/filingHistoryStore'
import { useIntakeStore } from '@/store/intakeStore'
import { StatusBadge } from '@/components/StatusBadge'

export function FilingHistoryPanel() {
  const selectedId = useIntakeStore((s) => s.selectedId)
  const { items, generatedAt, loading, error, available, fetch } = useFilingHistoryStore()

  useEffect(() => {
    void fetch()
  }, [fetch])

  const filteredItems = selectedId
    ? items.filter((item) => item.intake_id === selectedId)
    : []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
            Filing History
          </h2>
          <div className="text-xs text-ohmic-text-dim mt-1">
            {available && generatedAt
              ? `Projection updated ${new Date(generatedAt).toLocaleString()}`
              : 'Optional runtime surface'}
          </div>
        </div>
        {selectedId ? (
          <span className="text-xs text-ohmic-text-dim">
            {filteredItems.length} row{filteredItems.length === 1 ? '' : 's'}
          </span>
        ) : null}
      </div>

      {!selectedId ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          Select an intake item to inspect filing history.
        </div>
      ) : loading ? (
        <div className="panel text-sm text-ohmic-text-dim py-6 animate-pulse">
          Loading filing history...
        </div>
      ) : error ? (
        <div className="panel text-sm text-ohmic-danger py-6">{error}</div>
      ) : !available ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          Filing history is not projected yet for this runtime.
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          No filing history is recorded yet for this intake item.
        </div>
      ) : (
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <div key={item.filing_record_id} className="panel space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="text-sm font-medium text-ohmic-text break-words">
                    {item.display_label || item.filing_destination_id}
                  </div>
                  <div className="text-xs text-ohmic-text-dim">
                    {item.filed_at ? new Date(item.filed_at).toLocaleString() : '--'}
                  </div>
                </div>
                <StatusBadge status={item.status || 'pending_input'} />
              </div>

              <div className="grid grid-cols-1 gap-1 text-xs text-ohmic-text-dim">
                <div>
                  Destination:{' '}
                  <span className="text-ohmic-text">{item.filing_destination_id}</span>
                </div>
                <div>
                  Filed by: <span className="text-ohmic-text">{item.filed_by || '--'}</span>
                </div>
                <div>
                  Archive marker:{' '}
                  <span className="text-ohmic-text">
                    {item.archive_marker ? 'yes' : 'no'}
                  </span>
                </div>
                <div>
                  Reason: <span className="text-ohmic-text">{item.reason || '--'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
