import { useEffect, useMemo, useState } from 'react'
import { useTandemStore } from '@/store/tandemStore'
import { useIntakeStore } from '@/store/intakeStore'
import { buildTandemContextUrl } from '@/panels/tandemContext'

export function TandemPanel() {
  const items = useIntakeStore((state) => state.items)
  const selectedId = useIntakeStore((state) => state.selectedId)
  const {
    configured,
    available,
    mode,
    sessionState,
    baseUrl,
    sessionLabel,
    activeTargetLabel,
    targetPresets,
    launchUrl,
    message,
    loading,
    error,
    fetch,
  } = useTandemStore()
  const [selectedPresetId, setSelectedPresetId] = useState<string>('')
  const selectedIntake = items.find((item) => item.intake_id === selectedId) ?? null
  const selectedPreset = useMemo(
    () => targetPresets.find((preset) => preset.preset_id === selectedPresetId) ?? null,
    [selectedPresetId, targetPresets]
  )
  const contextualLaunchUrl = buildTandemContextUrl(launchUrl, selectedIntake, selectedPreset)

  useEffect(() => {
    void fetch()
  }, [fetch])

  useEffect(() => {
    if (!targetPresets.length) {
      if (selectedPresetId) {
        setSelectedPresetId('')
      }
      return
    }

    if (!selectedPresetId || !targetPresets.some((preset) => preset.preset_id === selectedPresetId)) {
      setSelectedPresetId(targetPresets[0]?.preset_id ?? '')
    }
  }, [selectedPresetId, targetPresets])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Tandem Handoff
        </h2>
        <button
          onClick={() => void fetch()}
          className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors"
        >
          refresh
        </button>
      </div>

      {loading ? (
        <div className="panel text-sm text-ohmic-text-dim py-6 animate-pulse">
          Loading Tandem status...
        </div>
      ) : error ? (
        <div className="panel text-sm text-ohmic-danger py-6">{error}</div>
      ) : (
        <div className="panel space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-medium text-ohmic-text">
              {configured ? 'Tandem configured' : 'Tandem not configured'}
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                available
                  ? 'bg-ohmic-success/15 text-ohmic-success'
                  : configured
                    ? 'bg-ohmic-warning/15 text-ohmic-warning'
                    : 'bg-ohmic-border text-ohmic-text-dim'
              }`}
            >
              {available ? 'available' : mode}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1 text-xs text-ohmic-text-dim">
            <div>
              Session state: <span className="text-ohmic-text">{sessionState}</span>
            </div>
            <div>
              Active target:{' '}
              <span className="text-ohmic-text">{activeTargetLabel || '--'}</span>
            </div>
            <div>
              Base URL: <span className="text-ohmic-text">{baseUrl || '--'}</span>
            </div>
            <div>
              Session label: <span className="text-ohmic-text">{sessionLabel || '--'}</span>
            </div>
            <div>
              Launch URL:{' '}
              <span className="text-ohmic-text break-all">
                {contextualLaunchUrl || '--'}
              </span>
            </div>
          </div>

          {targetPresets.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
                Target presets
              </div>
              <select
                value={selectedPresetId}
                onChange={(event) => setSelectedPresetId(event.target.value)}
                className="w-full bg-ohmic-bg border border-ohmic-border rounded px-3 py-2 text-sm text-ohmic-text focus:border-ohmic-accent focus:outline-none transition-colors"
              >
                {targetPresets.map((preset) => (
                  <option key={preset.preset_id} value={preset.preset_id}>
                    {preset.display_label}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {targetPresets.map((preset) => (
                  <div
                    key={preset.preset_id}
                    className={`rounded border px-2.5 py-1.5 text-[11px] ${
                      preset.preset_id === selectedPresetId
                        ? 'border-ohmic-accent/40 bg-ohmic-accent/10 text-ohmic-text'
                        : 'border-ohmic-border text-ohmic-text-dim'
                    }`}
                  >
                    <span className="text-ohmic-text">{preset.display_label}</span>
                    <span>{' -> '}{preset.target_label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="text-xs text-ohmic-text-dim">
            {message ||
              'This is the first external-provider seam. Full tab/session handoff will build on this status floor.'}
          </div>

          {selectedIntake ? (
            <div className="text-[11px] text-ohmic-text-dim">
              Opening Tandem will carry the current intake context for{' '}
              <span className="text-ohmic-text">{selectedIntake.intake_id}</span>.
            </div>
          ) : null}

          {contextualLaunchUrl ? (
            <div className="pt-1">
              <a
                href={contextualLaunchUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-md border border-ohmic-accent/40 px-3 py-1.5 text-xs font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10"
              >
                Open Tandem
              </a>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
