import { useEffect } from 'react'
import { useDashboardStore } from '@/store/dashboardStore'
import { useAuditSummaryStore } from '@/store/auditSummaryStore'
import { useIntakeStore } from '@/store/intakeStore'
import { StatusBadge } from '@/components/StatusBadge'
import { FreshnessIndicator } from '@/components/FreshnessIndicator'
import type { StatusCard } from '@/types/intake'
import {
  buildProviderFollowUpQueue,
  buildProviderHandoffSummary,
} from '@/panels/providerHandoffSummary'

function CardView({
  card,
  compact = false,
}: {
  card: StatusCard
  compact?: boolean
}) {
  const emphasisBorder =
    card.emphasis === 'warning'
      ? 'border-ohmic-warning/40'
      : card.emphasis === 'critical'
        ? 'border-ohmic-danger/40'
        : 'border-ohmic-border'

  return (
    <div className={`panel h-full ${emphasisBorder} ${compact ? 'p-3.5' : ''}`}>
      <div className={`flex items-center justify-between ${compact ? 'mb-2' : 'mb-3'}`}>
        <h3 className="panel-header mb-0">{card.title}</h3>
        <StatusBadge status={card.freshness} />
      </div>
      <div className={compact ? 'space-y-1.5' : 'space-y-2'}>
        {card.fields.map((field) => (
          <div key={field.label} className="flex items-start justify-between gap-4">
            <span className={`${compact ? 'text-[10px]' : 'text-[11px]'} whitespace-nowrap text-ohmic-text-dim`}>
              {field.label}
            </span>
            <span
              className={`max-w-[60%] break-words text-right text-ohmic-text ${
                compact ? 'text-[12px] leading-5' : 'text-[13px] leading-6'
              }`}
            >
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
  const auditItems = useAuditSummaryStore((state) => state.items)
  const auditAvailable = useAuditSummaryStore((state) => state.available)
  const auditAttempted = useAuditSummaryStore((state) => state.attempted)
  const fetchAuditSummary = useAuditSummaryStore((state) => state.fetch)
  const intakeItems = useIntakeStore((state) => state.items)
  const providerSummary = buildProviderHandoffSummary(auditItems)
  const providerQueue = buildProviderFollowUpQueue(
    auditItems,
    intakeItems,
    25,
    Date.now(),
    'priority'
  )
  const nextProviderAction = providerQueue[0] ?? null
  const attachmentReviewCount = providerQueue.filter(
    (item) => item.priority === 'needs_attachment_review'
  ).length
  const featuredCards = cards.filter((card) =>
    ['Queue Health', 'Current Action'].includes(card.title)
  )
  const secondaryCards = cards.filter(
    (card) => !['Queue Health', 'Current Action'].includes(card.title)
  )

  useEffect(() => {
    fetch()
  }, [fetch])

  useEffect(() => {
    if (!auditAvailable && !auditAttempted) {
      void fetchAuditSummary()
    }
  }, [auditAttempted, auditAvailable, fetchAuditSummary])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
            Desk Snapshot
          </h2>
          <div className="text-sm text-ohmic-text-dim">
            Compact runtime truth for what matters before you drop into queue and provider work.
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FreshnessIndicator generatedAt={generatedAt} staleness={staleness} />
          <button
            onClick={fetch}
            disabled={loading}
            className="text-xs text-ohmic-text-dim transition-colors hover:text-ohmic-text disabled:opacity-50"
          >
            refresh
          </button>
        </div>
      </div>

      {error ? (
        <div className="panel border-ohmic-danger/40 text-xs text-ohmic-danger">
          {error}
        </div>
      ) : null}

      {loading && cards.length === 0 ? (
        <div className="text-xs text-ohmic-text-dim animate-pulse">Loading projections...</div>
      ) : (
        <div className="space-y-4">
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))' }}
          >
            <div className="panel h-full border-ohmic-accent/20 p-3">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="panel-header mb-0">Next Best Action</h3>
                <StatusBadge status={nextProviderAction ? 'warning' : 'healthy'} />
              </div>
              {nextProviderAction ? (
                <div className="space-y-1.5">
                  <div className="text-sm leading-6 text-ohmic-text">
                    {nextProviderAction.intakeTitle}
                  </div>
                  <div className="text-[11px] text-ohmic-text-dim">
                    {nextProviderAction.priorityLabel} | {nextProviderAction.targetLabel}
                  </div>
                  <div className="text-[11px] text-ohmic-text-dim">
                    {nextProviderAction.ageLabel} |{' '}
                    {nextProviderAction.occurredAt
                      ? new Date(nextProviderAction.occurredAt).toLocaleString()
                      : '--'}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-ohmic-text-dim">
                  No provider action is waiting right now.
                </div>
              )}
            </div>

            <div className="panel h-full border-ohmic-accent/20 p-3">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="panel-header mb-0">Provider Follow-up</h3>
                <StatusBadge
                  status={providerSummary.staleFollowUpCount > 0 ? 'warning' : 'healthy'}
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[10px] whitespace-nowrap text-ohmic-text-dim">
                    Unresolved
                  </span>
                  <span className="max-w-[60%] break-words text-right text-[12px] leading-5 text-ohmic-text">
                    {providerSummary.unresolvedCount}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[10px] whitespace-nowrap text-ohmic-text-dim">
                    Stale
                  </span>
                  <span className="max-w-[60%] break-words text-right text-[12px] leading-5 text-ohmic-text">
                    {providerSummary.staleFollowUpCount}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[10px] whitespace-nowrap text-ohmic-text-dim">
                    Attachment reviews
                  </span>
                  <span className="max-w-[60%] break-words text-right text-[12px] leading-5 text-ohmic-text">
                    {providerSummary.attachmentReviewCount}
                  </span>
                </div>
              </div>
            </div>

            <div className="panel h-full border-ohmic-accent/20 p-3">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="panel-header mb-0">Attachment Review</h3>
                <StatusBadge status={attachmentReviewCount > 0 ? 'warning' : 'healthy'} />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[10px] whitespace-nowrap text-ohmic-text-dim">
                    Pending reviews
                  </span>
                  <span className="max-w-[60%] break-words text-right text-[12px] leading-5 text-ohmic-text">
                    {attachmentReviewCount}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[10px] whitespace-nowrap text-ohmic-text-dim">
                    Next target
                  </span>
                  <span className="max-w-[60%] break-words text-right text-[12px] leading-5 text-ohmic-text">
                    {providerQueue.find((item) => item.priority === 'needs_attachment_review')
                      ?.targetLabel ?? '--'}
                  </span>
                </div>
              </div>
            </div>

            {featuredCards.map((card) => (
              <CardView key={card.card_id} card={card} compact />
            ))}
          </div>

          {secondaryCards.length > 0 ? (
            <details className="panel border-ohmic-border/70 bg-ohmic-surface/55">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <div>
                  <h3 className="panel-header mb-0">Runtime Detail</h3>
                  <div className="mt-1 text-[11px] text-ohmic-text-dim">
                    Secondary desk state that is useful, but should not crowd the main operator lane.
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-ohmic-text-dim">
                  Expand
                </span>
              </summary>
              <div
                className="mt-4 grid gap-3"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))' }}
              >
                {secondaryCards.map((card) => (
                  <CardView key={card.card_id} card={card} compact />
                ))}
              </div>
            </details>
          ) : null}
        </div>
      )}
    </div>
  )
}
