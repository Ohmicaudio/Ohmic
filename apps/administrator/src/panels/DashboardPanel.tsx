import { useEffect } from 'react'
import { useDashboardStore } from '@/store/dashboardStore'
import { StatusBadge } from '@/components/StatusBadge'
import { FreshnessIndicator } from '@/components/FreshnessIndicator'
import type { StatusCard } from '@/types/intake'

function CardView({ card }: { card: StatusCard }) {
  const emphasisBorder =
    card.emphasis === 'warning' ? 'border-ohmic-warning/40' :
    card.emphasis === 'critical' ? 'border-ohmic-danger/40' :
    'border-ohmic-border'

  return (
    <div className={`panel ${emphasisBorder}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="panel-header mb-0">{card.title}</h3>
        <StatusBadge status={card.freshness} />
      </div>
      <div className="space-y-2">
        {card.fields.map((field) => (
          <div key={field.label} className="flex items-start justify-between gap-4">
            <span className="text-xs text-ohmic-text-dim whitespace-nowrap">
              {field.label}
            </span>
            <span className="text-xs text-ohmic-text text-right break-all max-w-[65%]">
              {field.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DashboardPanel() {
  const { cards, generatedAt, staleness, loading, error, fetch } = useDashboardStore()

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Dashboard
        </h2>
        <div className="flex items-center gap-3">
          <FreshnessIndicator generatedAt={generatedAt} staleness={staleness} />
          <button
            onClick={fetch}
            disabled={loading}
            className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors disabled:opacity-50"
          >
            ↻ refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="panel border-ohmic-danger/40 text-ohmic-danger text-xs">
          {error}
        </div>
      )}

      {loading && cards.length === 0 ? (
        <div className="text-ohmic-text-dim text-xs animate-pulse">Loading projections…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cards.map((card) => (
            <CardView key={card.card_id} card={card} />
          ))}
        </div>
      )}
    </div>
  )
}
