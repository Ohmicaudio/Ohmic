import { useEffect } from 'react'
import { useTandemStore } from '@/store/tandemStore'

export function TandemPanel() {
  const {
    configured,
    available,
    mode,
    baseUrl,
    sessionLabel,
    launchUrl,
    message,
    loading,
    error,
    fetch,
  } = useTandemStore()

  useEffect(() => {
    void fetch()
  }, [fetch])

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
              Base URL: <span className="text-ohmic-text">{baseUrl || '--'}</span>
            </div>
            <div>
              Session label: <span className="text-ohmic-text">{sessionLabel || '--'}</span>
            </div>
            <div>
              Launch URL: <span className="text-ohmic-text break-all">{launchUrl || '--'}</span>
            </div>
          </div>

          <div className="text-xs text-ohmic-text-dim">
            {message ||
              'This is the first external-provider seam. Full tab/session handoff will build on this status floor.'}
          </div>

          {launchUrl ? (
            <div className="pt-1">
              <a
                href={launchUrl}
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
