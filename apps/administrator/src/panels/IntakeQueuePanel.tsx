import { useEffect, useMemo, useState } from 'react'
import { useIntakeStore } from '@/store/intakeStore'
import { useAuditSummaryStore } from '@/store/auditSummaryStore'
import { StatusBadge } from '@/components/StatusBadge'
import { PriorityIndicator } from '@/components/PriorityIndicator'
import { TagChip } from '@/components/TagChip'
import { FreshnessIndicator } from '@/components/FreshnessIndicator'
import type { IntakeQueueItem } from '@/types/intake'
import { buildProviderFollowUpLookup } from '@/panels/providerHandoffSummary'

function getProjectionAgeHours(generatedAt: string | null): number | null {
  if (!generatedAt) {
    return null
  }

  const ageMs = Date.now() - new Date(generatedAt).getTime()
  if (Number.isNaN(ageMs) || ageMs < 0) {
    return null
  }

  return ageMs / (1000 * 60 * 60)
}

function IntakeRow({
  item,
  providerWorkload,
  selected,
  onSelect,
}: {
  item: IntakeQueueItem
  providerWorkload?: {
    priorityLabel: string
    ageLabel: string
    targetLabel: string
  } | null
  selected: boolean
  onSelect: () => void
}) {
  const warningBorder =
    item.warning_state === 'warnings_present'
      ? 'border-l-ohmic-warning border-l-2'
      : 'border-l-transparent border-l-2'

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-3 rounded-lg border transition-colors ${warningBorder} ${
        selected
          ? 'bg-ohmic-accent/10 border-ohmic-accent/30'
          : 'bg-ohmic-surface border-ohmic-border hover:border-ohmic-accent/20'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <PriorityIndicator priority={item.priority_hint} />
          <span className="text-sm font-medium truncate">{item.title}</span>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <div className="flex items-center gap-3 text-xs text-ohmic-text-dim">
        <span className="bg-ohmic-bg px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
          {item.intake_kind}
        </span>
        {item.routing_target && <span>-&gt; {item.routing_target}</span>}
        {item.trust_tier && <span className="opacity-60">T{item.trust_tier}</span>}
        <span className="ml-auto opacity-50">
          {item.received_at ? new Date(item.received_at).toLocaleString() : '--'}
        </span>
      </div>

      {item.summary_label && (
        <p className="text-xs text-ohmic-text-dim mt-1.5 line-clamp-2">
          {item.summary_label}
        </p>
      )}

      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {item.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      )}

      {item.warning_count > 0 && (
        <div className="flex items-center gap-1 mt-2 text-xs text-ohmic-warning">
          Warning: {item.warning_count} warning{item.warning_count !== 1 ? 's' : ''}
        </div>
      )}

      {providerWorkload ? (
        <div className="flex items-center gap-2 mt-2 text-[11px] text-ohmic-text-dim">
          <span className="rounded border border-ohmic-accent/30 px-1.5 py-0.5 text-ohmic-accent">
            Provider
          </span>
          <span>{providerWorkload.priorityLabel}</span>
          <span className="opacity-70">{providerWorkload.ageLabel}</span>
          <span className="truncate opacity-70">{providerWorkload.targetLabel}</span>
        </div>
      ) : null}
    </button>
  )
}

export function IntakeQueuePanel() {
  const [providerFilter, setProviderFilter] = useState<'all' | 'needs_provider_follow_up'>('all')
  const {
    items,
    count,
    generatedAt,
    staleness,
    loading,
    error,
    selectedId,
    fetch,
    select,
  } = useIntakeStore()
  const auditItems = useAuditSummaryStore((state) => state.items)
  const providerLookup = useMemo(
    () => buildProviderFollowUpLookup(auditItems, items),
    [auditItems, items]
  )
  const visibleItems = useMemo(
    () =>
      items.filter((item) =>
        providerFilter === 'needs_provider_follow_up'
          ? providerLookup.has(item.intake_id)
          : true
      ),
    [items, providerFilter, providerLookup]
  )
  const projectionAgeHours = useMemo(() => getProjectionAgeHours(generatedAt), [generatedAt])
  const showHistoricalProjectionWarning =
    staleness === 'stale' || (projectionAgeHours !== null && projectionAgeHours >= 8)

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Intake Queue
          {count > 0 && (
            <span className="ml-2 text-ohmic-text-dim font-normal">({count})</span>
          )}
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setProviderFilter((current) =>
                current === 'all' ? 'needs_provider_follow_up' : 'all'
              )
            }
            className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors"
          >
            {providerFilter === 'all' ? 'all intake' : 'provider follow-up'}
          </button>
          <FreshnessIndicator generatedAt={generatedAt} staleness={staleness} />
          <button
            onClick={fetch}
            disabled={loading}
            className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors disabled:opacity-50"
          >
            refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="panel border-ohmic-danger/40 text-ohmic-danger text-xs">
          {error}
        </div>
      )}

      {showHistoricalProjectionWarning ? (
        <div className="panel border-ohmic-warning/40 bg-ohmic-warning/5 text-xs text-ohmic-warning">
          Intake projection is reading as historical runtime data
          {projectionAgeHours !== null
            ? ` (${Math.floor(projectionAgeHours)}h old)`
            : ''}. Treat the intake list as queue context, not confirmed live operator activity.
        </div>
      ) : null}

      {loading && visibleItems.length === 0 ? (
        <div className="text-ohmic-text-dim text-xs animate-pulse">Loading intake queue...</div>
      ) : visibleItems.length === 0 ? (
        <div className="panel text-center text-ohmic-text-dim text-sm py-8">
          {providerFilter === 'needs_provider_follow_up'
            ? 'No intake items currently need provider follow-up'
            : 'Queue empty'}
        </div>
      ) : (
        <div className="space-y-2">
          {visibleItems.map((item) => (
            <IntakeRow
              key={item.intake_id}
              item={item}
              providerWorkload={providerLookup.get(item.intake_id) ?? null}
              selected={selectedId === item.intake_id}
              onSelect={() =>
                select(selectedId === item.intake_id ? null : item.intake_id)
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}
