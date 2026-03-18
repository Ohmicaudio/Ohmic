import { useEffect, useMemo } from 'react'
import { useDashboardStore } from '@/store/dashboardStore'
import { useAuditSummaryStore } from '@/store/auditSummaryStore'
import { useIntakeStore } from '@/store/intakeStore'
import { useQueueActivityStore } from '@/store/queueActivityStore'
import { useServerHealthStore } from '@/store/serverHealthStore'
import { useWorkspaceActivityStore } from '@/store/workspaceActivityStore'
import { useDeskFocusStore } from '@/store/deskFocusStore'
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

function SnapshotCard({
  title,
  status,
  children,
}: {
  title: string
  status: 'healthy' | 'warning' | 'stale' | 'unknown'
  children: React.ReactNode
}) {
  return (
    <div className="panel h-full border-ohmic-accent/20 p-3">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="panel-header mb-0">{title}</h3>
        <StatusBadge status={status} />
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function MetricRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[10px] whitespace-nowrap text-ohmic-text-dim">{label}</span>
      <span className="max-w-[60%] break-words text-right text-[12px] leading-5 text-ohmic-text">
        {value}
      </span>
    </div>
  )
}

function formatProjectionCoverage(loaded: number, expected: number): string {
  return `${loaded}/${expected}`
}

function truncateValue(value: string, maxLength = 48): string {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value
}

function getRuntimeStatus(
  status: 'ok' | 'error' | 'unknown',
  missingProjectionCount: number
): 'healthy' | 'warning' | 'unknown' {
  if (status === 'error') {
    return 'warning'
  }
  if (status === 'unknown') {
    return 'unknown'
  }
  return missingProjectionCount > 0 ? 'warning' : 'healthy'
}

function getQueueStatus(readyCount: number, activeClaimCount: number): 'healthy' | 'warning' {
  return readyCount > 0 || activeClaimCount > 0 ? 'healthy' : 'warning'
}

function getWorkspaceStatus(dirtyFileCount: number): 'healthy' | 'warning' {
  return dirtyFileCount > 0 ? 'warning' : 'healthy'
}

export function DashboardPanel() {
  const { cards, generatedAt, staleness, loading, error, fetch } = useDashboardStore()
  const auditItems = useAuditSummaryStore((state) => state.items)
  const auditAvailable = useAuditSummaryStore((state) => state.available)
  const auditAttempted = useAuditSummaryStore((state) => state.attempted)
  const fetchAuditSummary = useAuditSummaryStore((state) => state.fetch)
  const intakeItems = useIntakeStore((state) => state.items)
  const fetchQueueActivity = useQueueActivityStore((state) => state.fetch)
  const readyTasks = useQueueActivityStore((state) => state.readyTasks)
  const readyCount = useQueueActivityStore((state) => state.readyCount)
  const activeClaimCount = useQueueActivityStore((state) => state.activeClaimCount)
  const queueGeneratedAt = useQueueActivityStore((state) => state.generatedAt)
  const fetchWorkspaceActivity = useWorkspaceActivityStore((state) => state.fetch)
  const branch = useWorkspaceActivityStore((state) => state.branch)
  const headCommit = useWorkspaceActivityStore((state) => state.headCommit)
  const dirtyFileCount = useWorkspaceActivityStore((state) => state.dirtyFileCount)
  const workspaceGeneratedAt = useWorkspaceActivityStore((state) => state.generatedAt)
  const fetchDeskFocus = useDeskFocusStore((state) => state.fetch)
  const focusedSelection = useDeskFocusStore((state) => state.selection)
  const focusGeneratedAt = useDeskFocusStore((state) => state.generatedAt)
  const fetchHealth = useServerHealthStore((state) => state.fetch)
  const runtimeStatus = useServerHealthStore((state) => state.status)
  const loadedProjections = useServerHealthStore((state) => state.loadedProjections)
  const expectedProjections = useServerHealthStore((state) => state.expectedProjections)
  const missingProjections = useServerHealthStore((state) => state.missingProjections)
  const healthLoading = useServerHealthStore((state) => state.loading)

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
  const secondaryCards = cards.filter(
    (card) => !['Queue Health', 'Current Action', 'Blockers And Risk', 'Summary'].includes(card.title)
  )
  const nextQueueTask = readyTasks[0] ?? null
  const deskMode = focusedSelection?.focus_kind
    ? focusedSelection.focus_kind === 'intake'
      ? 'intake-led'
      : 'queue-led'
    : nextQueueTask
      ? 'queue-led'
      : 'idle'
  const currentDeskAction = useMemo(() => {
    if (focusedSelection?.title) {
      return focusedSelection.title
    }
    if (focusedSelection?.focus_kind === 'intake' && focusedSelection.selected_intake_id) {
      return `Focused intake ${focusedSelection.selected_intake_id}`
    }
    if (activeClaimCount > 0) {
      return 'Claim in progress'
    }
    if (nextQueueTask) {
      return nextQueueTask.title
    }
    return 'No ready work visible'
  }, [activeClaimCount, focusedSelection, nextQueueTask])
  const currentDeskStatus =
    focusedSelection?.focus_kind === 'claim'
      ? 'focused_claim'
      : focusedSelection?.focus_kind === 'ready_task'
        ? 'focused_ready_task'
        : focusedSelection?.focus_kind === 'intake'
      ? 'focused_intake'
          : activeClaimCount > 0
            ? 'active_claim'
            : nextQueueTask
              ? 'ready'
              : 'idle'
  const providerNextLabel =
    nextProviderAction?.targetLabel ||
    nextProviderAction?.intakeTitle ||
    nextProviderAction?.intakeId ||
    '--'

  useEffect(() => {
    fetch()
  }, [fetch])

  useEffect(() => {
    if (!auditAvailable && !auditAttempted) {
      void fetchAuditSummary()
    }
  }, [auditAttempted, auditAvailable, fetchAuditSummary])

  useEffect(() => {
    if (!queueGeneratedAt) {
      void fetchQueueActivity()
    }
    if (!workspaceGeneratedAt) {
      void fetchWorkspaceActivity()
    }
    if (!focusGeneratedAt) {
      void fetchDeskFocus()
    }
    if (loadedProjections.length === 0 && !healthLoading) {
      void fetchHealth()
    }
  }, [
    fetchDeskFocus,
    fetchHealth,
    fetchQueueActivity,
    fetchWorkspaceActivity,
    focusGeneratedAt,
    healthLoading,
    loadedProjections.length,
    queueGeneratedAt,
    workspaceGeneratedAt,
  ])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
            Desk Snapshot
          </h2>
          <div className="text-sm text-ohmic-text-dim">
            Live desk truth first, secondary runtime detail second.
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FreshnessIndicator generatedAt={queueGeneratedAt || generatedAt} staleness={staleness} />
          <button
            onClick={() => {
              void fetch()
              void fetchQueueActivity()
              void fetchWorkspaceActivity()
              void fetchHealth()
            }}
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

      {loading && cards.length === 0 && !queueGeneratedAt ? (
        <div className="text-xs text-ohmic-text-dim animate-pulse">Loading projections...</div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-ohmic-accent/20 bg-ohmic-surface/70 px-4 py-3">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.8fr))]">
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-ohmic-accent">
                  Operator Header
                </div>
                <div className="text-sm text-ohmic-text">
                  {deskMode === 'intake-led'
                    ? 'Desk is following intake context.'
                    : deskMode === 'queue-led'
                      ? 'Desk is following live queue work.'
                      : 'Desk is waiting for the next live action.'}
                </div>
                <div className="text-[11px] text-ohmic-text-dim">
                  {truncateValue(currentDeskAction, 80)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-ohmic-text-dim">
                  Mode
                </div>
                <div className="text-sm text-ohmic-text">{deskMode}</div>
                <div className="text-[11px] text-ohmic-text-dim">
                  Focus {focusedSelection?.focus_kind ?? '--'}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-ohmic-text-dim">
                  Next queue task
                </div>
                <div className="text-sm text-ohmic-text">
                  {nextQueueTask ? truncateValue(nextQueueTask.title, 46) : '--'}
                </div>
                <div className="text-[11px] text-ohmic-text-dim">
                  {nextQueueTask?.task_id ?? 'No ready work visible'}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-ohmic-text-dim">
                  Next provider item
                </div>
                <div className="text-sm text-ohmic-text">
                  {truncateValue(providerNextLabel, 46)}
                </div>
                <div className="text-[11px] text-ohmic-text-dim">
                  {nextProviderAction?.priority ?? 'No provider follow-up pending'}
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))' }}
          >
            <SnapshotCard
              title="Runtime Health"
              status={getRuntimeStatus(runtimeStatus, missingProjections.length)}
            >
              <MetricRow
                label="Coverage"
                value={formatProjectionCoverage(
                  loadedProjections.length,
                  expectedProjections.length
                )}
              />
              <MetricRow label="Missing" value={String(missingProjections.length)} />
              <MetricRow
                label="Source"
                value={runtimeStatus === 'ok' ? 'live admin server' : runtimeStatus}
              />
            </SnapshotCard>

            <SnapshotCard
              title="Queue Status"
              status={getQueueStatus(readyCount, activeClaimCount)}
            >
              <MetricRow label="Ready" value={String(readyCount)} />
              <MetricRow label="Active claims" value={String(activeClaimCount)} />
              <MetricRow
                label="Next task"
                value={nextQueueTask ? truncateValue(nextQueueTask.task_id, 28) : '--'}
              />
            </SnapshotCard>

            <SnapshotCard
              title="Current Desk Action"
              status={nextQueueTask ? 'healthy' : 'unknown'}
            >
              <MetricRow label="Mode" value={deskMode} />
              <MetricRow label="Status" value={currentDeskStatus} />
              <MetricRow label="Current" value={truncateValue(currentDeskAction, 30)} />
              <MetricRow
                label="Focus"
                value={focusedSelection?.focus_kind ?? (nextQueueTask ? 'queued_task' : '--')}
              />
            </SnapshotCard>

            <SnapshotCard
              title="Workspace State"
              status={getWorkspaceStatus(dirtyFileCount)}
            >
              <MetricRow label="Branch" value={truncateValue(branch || '--', 28)} />
              <MetricRow label="Dirty" value={String(dirtyFileCount)} />
              <MetricRow
                label="Head"
                value={headCommit ? truncateValue(headCommit.summary, 30) : '--'}
              />
            </SnapshotCard>

            <SnapshotCard
              title="Provider Follow-up"
              status={providerSummary.staleFollowUpCount > 0 ? 'warning' : 'healthy'}
            >
              <MetricRow label="Unresolved" value={String(providerSummary.unresolvedCount)} />
              <MetricRow label="Next" value={truncateValue(providerNextLabel, 26)} />
              <MetricRow label="Attachment reviews" value={String(attachmentReviewCount)} />
            </SnapshotCard>
          </div>

          <details className="panel border-ohmic-border/70 bg-ohmic-surface/55">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <div>
                <h3 className="panel-header mb-0">Runtime Detail</h3>
                <div className="mt-1 text-[11px] text-ohmic-text-dim">
                  Secondary projection cards and slower-moving runtime detail.
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
              {secondaryCards.length > 0 ? (
                secondaryCards.map((card) => (
                  <CardView key={card.card_id} card={card} compact />
                ))
              ) : (
                <div className="rounded-xl border border-ohmic-border bg-ohmic-bg px-3 py-3 text-sm text-ohmic-text-dim">
                  No additional runtime detail cards are published right now.
                </div>
              )}
            </div>
          </details>
        </div>
      )}
    </div>
  )
}
