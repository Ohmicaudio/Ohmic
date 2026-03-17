import { useEffect, useState } from 'react'
import { recordFiling } from '@/api/filing'
import { useFilingPickerStore } from '@/store/filingPickerStore'
import { useFilingHistoryStore } from '@/store/filingHistoryStore'
import { useCommandStore } from '@/store/commandStore'
import { useIntakeStore } from '@/store/intakeStore'
import { StatusBadge } from '@/components/StatusBadge'

function buildFilingContextNote(existingNote: string, destinationLabel: string): string {
  const nextLine = `Filing destination: ${destinationLabel}`

  if (!existingNote.trim()) {
    return nextLine
  }

  if (existingNote.includes(nextLine)) {
    return existingNote
  }

  return `${existingNote.trim()}\n${nextLine}`
}

export function FilingPickerPanel() {
  const [filingReason, setFilingReason] = useState('')
  const [filingError, setFilingError] = useState<string | null>(null)
  const [filingResult, setFilingResult] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)
  const selectedId = useIntakeStore((s) => s.selectedId)
  const { model, selectedDestinationId, loading, error, fetch, setSelectedDestination } =
    useFilingPickerStore()
  const refreshFilingHistory = useFilingHistoryStore((s) => s.fetch)
  const { noteText, setIntakeId, setActionInput, setNoteText } = useCommandStore()

  useEffect(() => {
    void fetch(selectedId)
    setFilingError(null)
    setFilingResult(null)
  }, [selectedId, fetch])

  const selectedDestination =
    model?.destinations.find(
      (destination) => destination.filing_destination_id === selectedDestinationId
    ) ?? null

  function primeDestinationContext() {
    if (!selectedId) {
      return
    }

    setIntakeId(selectedId)
    if (selectedDestination?.archive_marker_default) {
      setActionInput('archive')
    }
    if (selectedDestination) {
      setNoteText(buildFilingContextNote(noteText, selectedDestination.display_label))
    }
  }

  async function handleRecordFiling() {
    if (!selectedId || !selectedDestination || !selectedDestination.selectable) {
      return
    }

    setRecording(true)
    setFilingError(null)
    setFilingResult(null)

    try {
      const response = await recordFiling({
        intake_id: selectedId,
        filing_destination_id: selectedDestination.filing_destination_id,
        archive_marker: selectedDestination.archive_marker_default,
        reason: filingReason.trim() || undefined,
      })

      if (response.writeback.writeback_status !== 'accepted') {
        setFilingError(response.writeback.rejection_reason ?? 'Filing writeback was rejected')
        return
      }

      setFilingResult(
        `Recorded ${selectedDestination.display_label} for ${selectedId}`
      )
      setFilingReason('')
      await refreshFilingHistory()
    } catch (err) {
      setFilingError(err instanceof Error ? err.message : 'Failed to record filing')
    } finally {
      setRecording(false)
    }
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
            <button
              key={destination.filing_destination_id}
              type="button"
              onClick={() => setSelectedDestination(destination.filing_destination_id)}
              className={`panel space-y-2 w-full text-left transition-colors ${
                selectedDestinationId === destination.filing_destination_id
                  ? 'border-ohmic-accent/50 bg-ohmic-accent/10'
                  : 'hover:border-ohmic-accent/30'
              }`}
            >
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
                <div>
                  Selected:{' '}
                  <span className="text-ohmic-text">
                    {selectedDestinationId === destination.filing_destination_id ? 'yes' : 'no'}
                  </span>
                </div>
                {!destination.selectable && destination.disabled_reason && (
                  <div>
                    Disabled reason:{' '}
                    <span className="text-ohmic-text">{destination.disabled_reason}</span>
                  </div>
                )}
              </div>
            </button>
          ))}

          <div className="panel space-y-3">
            <div>
              <label className="block text-xs text-ohmic-text-dim mb-1">
                Filing reason (optional)
              </label>
              <textarea
                value={filingReason}
                onChange={(event) => setFilingReason(event.target.value)}
                placeholder="Why this filing destination fits the current intake..."
                rows={2}
                className="w-full bg-ohmic-bg border border-ohmic-border rounded px-3 py-2 text-sm text-ohmic-text placeholder:text-ohmic-muted focus:border-ohmic-accent focus:outline-none transition-colors resize-none"
              />
            </div>

            {filingError ? (
              <div className="text-xs text-ohmic-danger">{filingError}</div>
            ) : null}
            {filingResult ? (
              <div className="text-xs text-ohmic-success">{filingResult}</div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                onClick={primeDestinationContext}
                disabled={!selectedDestination || !selectedDestination.selectable}
                className="rounded bg-ohmic-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-ohmic-accent-dim disabled:bg-ohmic-border disabled:text-ohmic-muted"
              >
                {selectedDestination?.archive_marker_default
                  ? 'Prime Archive Action'
                  : 'Prime Filing Context'}
              </button>
              <button
                onClick={() => void handleRecordFiling()}
                disabled={!selectedDestination || !selectedDestination.selectable || recording}
                className="rounded bg-ohmic-success px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-ohmic-success/80 disabled:bg-ohmic-border disabled:text-ohmic-muted"
              >
                {recording ? 'Recording...' : 'Record Filing'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
