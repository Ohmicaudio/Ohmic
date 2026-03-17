import { useEffect } from 'react'
import { useFilingPickerStore } from '@/store/filingPickerStore'
import { useCommandStore } from '@/store/commandStore'
import { useIntakeStore } from '@/store/intakeStore'
import { StatusBadge } from '@/components/StatusBadge'

export function FilingPickerPanel() {
  const selectedId = useIntakeStore((s) => s.selectedId)
  const { model, loading, error, fetch } = useFilingPickerStore()
  const { setIntakeId, setActionInput } = useCommandStore()

  useEffect(() => {
    void fetch(selectedId)
  }, [selectedId, fetch])

  function primeArchiveAction() {
    if (!selectedId) {
      return
    }

    setIntakeId(selectedId)
    setActionInput('archive')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Filing Picker
        </h2>
        {model && (
          <span className="text-xs text-ohmic-text-dim">
            {model.destinations.length} destination{model.destinations.length === 1 ? '' : 's'}
          </span>
        )}
      </div>

      {!selectedId ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          Select an intake item to inspect filing destinations.
        </div>
      ) : loading ? (
        <div className="panel text-sm text-ohmic-text-dim py-6 animate-pulse">
          Loading filing options...
        </div>
      ) : error ? (
        <div className="panel text-sm text-ohmic-danger py-6">{error}</div>
      ) : !model || model.destinations.length === 0 ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          No filing destinations are currently available for this intake item.
        </div>
      ) : (
        <div className="space-y-2">
          {model.destinations.map((destination) => (
            <div key={destination.filing_destination_id} className="panel space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="text-sm font-medium text-ohmic-text break-words">
                    {destination.display_label}
                  </div>
                  <div className="text-xs text-ohmic-text-dim">
                    {destination.description || destination.filing_destination_id}
                  </div>
                </div>
                <StatusBadge
                  status={destination.selectable ? destination.status : 'pending_input'}
                />
              </div>

              <div className="grid grid-cols-1 gap-1 text-xs text-ohmic-text-dim">
                <div>
                  Default destination:{' '}
                  <span className="text-ohmic-text">{destination.is_default ? 'yes' : 'no'}</span>
                </div>
                <div>
                  Archive marker default:{' '}
                  <span className="text-ohmic-text">
                    {destination.archive_marker_default ? 'yes' : 'no'}
                  </span>
                </div>
                <div>
                  Flow:{' '}
                  <span className="text-ohmic-text">
                    {destination.requires_advanced_flow ? 'advanced' : 'direct'}
                  </span>
                </div>
                {!destination.selectable && destination.disabled_reason && (
                  <div>
                    Disabled reason:{' '}
                    <span className="text-ohmic-text">{destination.disabled_reason}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="pt-1">
            <button
              onClick={primeArchiveAction}
              className="rounded bg-ohmic-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-ohmic-accent-dim"
            >
              Prime Archive Action
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
