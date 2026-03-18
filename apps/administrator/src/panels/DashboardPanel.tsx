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

function CardView({ card }: { card: StatusCard }) {
  const emphasisBorder =
    card.emphasis === 'warning'
      ? 'border-ohmic-warning/40'
      : card.emphasis === 'critical'
        ? 'border-ohmic-danger/40'
        : 'border-ohmic-border'

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
            refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="panel border-ohmic-danger/40 text-ohmic-danger text-xs">
          {error}
        </div>
      )}

      {loading && cards.length === 0 ? (
        <div className="text-ohmic-text-dim text-xs animate-pulse">Loading projections...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="panel border-ohmic-accent/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="panel-header mb-0">Next Best Action</h3>
              <StatusBadge status={nextProviderAction ? 'warning' : 'healthy'} />
            </div>
            {nextProviderAction ? (
              <div className="space-y-2">
                <div className="text-xs text-ohmic-text">
                  {nextProviderAction.intakeTitle}
                </div>
                <div className="text-xs text-ohmic-text-dim">
                  {nextProviderAction.priorityLabel} | {nextProviderAction.targetLabel}
                </div>
                <div className="text-xs text-ohmic-text-dim">
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
          <div className="panel border-ohmic-accent/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="panel-header mb-0">Provider Follow-up</h3>
              <StatusBadge
                status={providerSummary.staleFollowUpCount > 0 ? 'warning' : 'healthy'}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs text-ohmic-text-dim whitespace-nowrap">
                  Unresolved
                </span>
                <span className="text-xs text-ohmic-text text-right break-all max-w-[65%]">
                  {providerSummary.unresolvedCount}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs text-ohmic-text-dim whitespace-nowrap">
                  Stale
                </span>
                <span className="text-xs text-ohmic-text text-right break-all max-w-[65%]">
                  {providerSummary.staleFollowUpCount}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs text-ohmic-text-dim whitespace-nowrap">
                  Attachment reviews
                </span>
                <span className="text-xs text-ohmic-text text-right break-all max-w-[65%]">
                  {providerSummary.attachmentReviewCount}
                </span>
              </div>
            </div>
          </div>
          <div className="panel border-ohmic-accent/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="panel-header mb-0">Attachment Review</h3>
              <StatusBadge status={attachmentReviewCount > 0 ? 'warning' : 'healthy'} />
            </div>
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs text-ohmic-text-dim whitespace-nowrap">
                  Pending reviews
                </span>
                <span className="text-xs text-ohmic-text text-right break-all max-w-[65%]">
                  {attachmentReviewCount}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs text-ohmic-text-dim whitespace-nowrap">
                  Next target
                </span>
                <span className="text-xs text-ohmic-text text-right break-all max-w-[65%]">
                  {providerQueue.find((item) => item.priority === 'needs_attachment_review')
                    ?.targetLabel ?? '--'}
                </span>
              </div>
            </div>
          </div>
          {cards.map((card) => (
            <CardView key={card.card_id} card={card} />
          ))}
        </div>
      )}
    </div>
  )
}
