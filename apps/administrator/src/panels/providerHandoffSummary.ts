import type { AdministratorAuditSummaryItem, IntakeQueueItem } from '@/types/intake'

export interface ProviderHandoffSummary {
  totalCount: number
  attachmentReviewCount: number
  uniqueTargetCount: number
  unresolvedCount: number
  staleFollowUpCount: number
  latestOccurredAt: string | null
}

export type ProviderFollowUpAgeBand = 'fresh' | 'aging' | 'stale'
export type ProviderFollowUpSortMode = 'priority' | 'age' | 'target' | 'recent'

export interface ProviderHandoffTargetGroup {
  targetLabel: string
  count: number
  unresolvedCount: number
  latestOccurredAt: string | null
  oldestOutstandingAt: string | null
  ageBand: ProviderFollowUpAgeBand
  ageLabel: string
  status: 'attached' | 'attention' | 'ready'
  statusLabel: string
  requiresFollowUp: boolean
}

export interface ProviderFollowUpItem {
  intakeId: string
  intakeTitle: string
  targetLabel: string
  targetPresetId: string | null
  occurredAt: string | null
  launchUrl: string | null
  attachmentId: string | null
  handoffNote: string | null
  priority: 'needs_attachment_review' | 'follow_up_pending'
  priorityLabel: string
  ageBand: ProviderFollowUpAgeBand
  ageLabel: string
}

export interface ProviderTargetTrendCard {
  targetLabel: string
  unresolvedCount: number
  completedCount: number
  attachmentReviewCount: number
  latestOccurredAt: string | null
  trend: 'rising' | 'steady' | 'clearing'
  trendLabel: string
}

const targetStatusPriority: Record<ProviderHandoffTargetGroup['status'], number> = {
  attention: 0,
  attached: 1,
  ready: 2,
}

const followUpPriorityOrder: Record<ProviderFollowUpItem['priority'], number> = {
  needs_attachment_review: 0,
  follow_up_pending: 1,
}

const ageBandPriority: Record<ProviderFollowUpAgeBand, number> = {
  stale: 0,
  aging: 1,
  fresh: 2,
}

function toUtcTime(value: string | null | undefined): number {
  const parsed = Date.parse(value || '')
  return Number.isFinite(parsed) ? parsed : 0
}

function resolveAgeBand(
  value: string | null | undefined,
  nowMs: number
): ProviderFollowUpAgeBand {
  const occurredAt = toUtcTime(value)
  if (!occurredAt) {
    return 'fresh'
  }

  const ageHours = Math.max(0, nowMs - occurredAt) / (1000 * 60 * 60)
  if (ageHours >= 24) {
    return 'stale'
  }
  if (ageHours >= 4) {
    return 'aging'
  }
  return 'fresh'
}

function ageLabel(ageBand: ProviderFollowUpAgeBand): string {
  switch (ageBand) {
    case 'stale':
      return 'Stale'
    case 'aging':
      return 'Aging'
    default:
      return 'Fresh'
  }
}

function selectLatestProviderStateByIntake(
  rows: AdministratorAuditSummaryItem[]
): AdministratorAuditSummaryItem[] {
  const latestByIntake = new Map<string, AdministratorAuditSummaryItem>()

  for (const row of rows) {
    if (!row.intake_id) {
      continue
    }
    if (row.event_family !== 'provider_handoff' && row.event_family !== 'provider_follow_up') {
      continue
    }

    const existing = latestByIntake.get(row.intake_id)
    if (!existing || toUtcTime(row.occurred_at) > toUtcTime(existing.occurred_at)) {
      latestByIntake.set(row.intake_id, row)
    }
  }

  return Array.from(latestByIntake.values())
}

function compareFollowUpItems(
  left: ProviderFollowUpItem,
  right: ProviderFollowUpItem,
  sortMode: ProviderFollowUpSortMode
): number {
  if (sortMode === 'target') {
    const labelOrder = left.targetLabel.localeCompare(right.targetLabel)
    if (labelOrder !== 0) {
      return labelOrder
    }
  }

  if (sortMode === 'age') {
    if (left.ageBand !== right.ageBand) {
      return ageBandPriority[left.ageBand] - ageBandPriority[right.ageBand]
    }
    return toUtcTime(right.occurredAt) - toUtcTime(left.occurredAt)
  }

  if (sortMode === 'recent') {
    return toUtcTime(right.occurredAt) - toUtcTime(left.occurredAt)
  }

  if (left.priority !== right.priority) {
    return followUpPriorityOrder[left.priority] - followUpPriorityOrder[right.priority]
  }
  if (left.ageBand !== right.ageBand) {
    return ageBandPriority[left.ageBand] - ageBandPriority[right.ageBand]
  }
  return toUtcTime(right.occurredAt) - toUtcTime(left.occurredAt)
}

export function buildProviderHandoffSummary(
  rows: AdministratorAuditSummaryItem[],
  nowMs = Date.now()
): ProviderHandoffSummary {
  const providerRows = rows.filter((row) => row.event_family === 'provider_handoff')
  const targetLabels = new Set(
    providerRows
      .map((row) => row.target_label?.trim())
      .filter((value): value is string => Boolean(value))
  )
  const unresolvedRows = selectLatestProviderStateByIntake(rows).filter(
    (row) => row.event_family === 'provider_handoff'
  )
  const staleFollowUpCount = unresolvedRows.filter(
    (row) => resolveAgeBand(row.occurred_at, nowMs) === 'stale'
  ).length

  return {
    totalCount: providerRows.length,
    attachmentReviewCount: providerRows.filter(
      (row) => row.status_delta === 'attachment_review'
    ).length,
    uniqueTargetCount: targetLabels.size,
    unresolvedCount: unresolvedRows.length,
    staleFollowUpCount,
    latestOccurredAt:
      providerRows
        .slice()
        .sort((left, right) => toUtcTime(right.occurred_at) - toUtcTime(left.occurred_at))[0]
        ?.occurred_at ?? null,
  }
}

export function groupProviderHandoffsByTarget(
  rows: AdministratorAuditSummaryItem[],
  activeTargetLabel: string | null = null,
  sessionState: 'missing' | 'idle' | 'attached' = 'missing',
  maxGroups = 3,
  nowMs = Date.now()
): ProviderHandoffTargetGroup[] {
  const providerRows = rows.filter((row) => row.event_family === 'provider_handoff')
  const unresolvedRows = selectLatestProviderStateByIntake(rows).filter(
    (row) => row.event_family === 'provider_handoff'
  )
  const grouped = new Map<string, ProviderHandoffTargetGroup>()

  for (const row of providerRows) {
    const targetLabel = row.target_label?.trim() || 'Unlabeled target'
    const existing = grouped.get(targetLabel)
    if (!existing) {
      grouped.set(targetLabel, {
        targetLabel,
        count: 1,
        unresolvedCount: 0,
        latestOccurredAt: row.occurred_at || null,
        oldestOutstandingAt: null,
        ageBand: 'fresh',
        ageLabel: 'Fresh',
        status: 'ready',
        statusLabel: 'Ready',
        requiresFollowUp: false,
      })
      continue
    }

    existing.count += 1
    if (toUtcTime(row.occurred_at) > toUtcTime(existing.latestOccurredAt)) {
      existing.latestOccurredAt = row.occurred_at || null
    }
  }

  for (const row of unresolvedRows) {
    const targetLabel = row.target_label?.trim() || 'Unlabeled target'
    const group = grouped.get(targetLabel)
    if (!group) {
      continue
    }
    group.unresolvedCount += 1
    group.requiresFollowUp = true
    if (
      !group.oldestOutstandingAt ||
      toUtcTime(row.occurred_at) < toUtcTime(group.oldestOutstandingAt)
    ) {
      group.oldestOutstandingAt = row.occurred_at || null
    }
  }

  return Array.from(grouped.values())
    .map((group) => {
      const isAttached =
        sessionState === 'attached' &&
        Boolean(activeTargetLabel) &&
        group.targetLabel === activeTargetLabel
      const status: ProviderHandoffTargetGroup['status'] = isAttached
        ? 'attached'
        : group.unresolvedCount > 0
          ? 'attention'
          : 'ready'
      const band = resolveAgeBand(group.oldestOutstandingAt ?? group.latestOccurredAt, nowMs)

      return {
        ...group,
        ageBand: band,
        ageLabel: ageLabel(band),
        status,
        statusLabel:
          status === 'attached'
            ? 'Attached'
            : status === 'attention'
              ? 'Needs follow-up'
              : 'Ready',
      }
    })
    .sort((left, right) => {
      if (left.status !== right.status) {
        return targetStatusPriority[left.status] - targetStatusPriority[right.status]
      }
      if (left.unresolvedCount !== right.unresolvedCount) {
        return right.unresolvedCount - left.unresolvedCount
      }
      if (left.ageBand !== right.ageBand) {
        return ageBandPriority[left.ageBand] - ageBandPriority[right.ageBand]
      }
      if (right.count !== left.count) {
        return right.count - left.count
      }
      return toUtcTime(right.latestOccurredAt) - toUtcTime(left.latestOccurredAt)
    })
    .slice(0, maxGroups)
}

export function buildProviderFollowUpQueue(
  rows: AdministratorAuditSummaryItem[],
  intakeItems: IntakeQueueItem[],
  maxItems = 5,
  nowMs = Date.now(),
  sortMode: ProviderFollowUpSortMode = 'priority'
): ProviderFollowUpItem[] {
  const latestProviderRows = selectLatestProviderStateByIntake(rows)
  const intakeTitles = new Map(intakeItems.map((item) => [item.intake_id, item.title]))
  return latestProviderRows
    .filter((row) => row.event_family === 'provider_handoff')
    .map((row) => {
      const priority: ProviderFollowUpItem['priority'] =
        row.status_delta === 'attachment_review'
          ? 'needs_attachment_review'
          : 'follow_up_pending'
      const band = resolveAgeBand(row.occurred_at, nowMs)

      return {
        intakeId: row.intake_id,
        intakeTitle: intakeTitles.get(row.intake_id) || row.summary_label || row.intake_id,
        targetLabel: row.target_label || 'Unlabeled target',
        targetPresetId: row.target_preset_id ?? null,
        occurredAt: row.occurred_at || null,
        launchUrl: row.launch_url ?? null,
        attachmentId: row.attachment_id?.trim() || null,
        handoffNote: row.handoff_note ?? null,
        priority,
        priorityLabel:
          priority === 'needs_attachment_review'
            ? 'Needs attachment review'
            : 'Follow-up pending',
        ageBand: band,
        ageLabel: ageLabel(band),
      }
    })
    .sort((left, right) => {
      return compareFollowUpItems(left, right, sortMode)
    })
    .slice(0, maxItems)
}

export function buildProviderFollowUpLookup(
  rows: AdministratorAuditSummaryItem[],
  intakeItems: IntakeQueueItem[],
  nowMs = Date.now()
): Map<string, ProviderFollowUpItem> {
  return new Map(
    buildProviderFollowUpQueue(rows, intakeItems, Number.MAX_SAFE_INTEGER, nowMs).map((item) => [
      item.intakeId,
      item,
    ])
  )
}

export function buildProviderTargetTrendCards(
  rows: AdministratorAuditSummaryItem[],
  maxItems = 3
): ProviderTargetTrendCard[] {
  const grouped = new Map<
    string,
    {
      unresolvedCount: number
      completedCount: number
      attachmentReviewCount: number
      latestOccurredAt: string | null
    }
  >()

  for (const row of rows) {
    if (row.event_family !== 'provider_handoff' && row.event_family !== 'provider_follow_up') {
      continue
    }

    const targetLabel = row.target_label?.trim() || 'Unlabeled target'
    const existing = grouped.get(targetLabel) ?? {
      unresolvedCount: 0,
      completedCount: 0,
      attachmentReviewCount: 0,
      latestOccurredAt: null,
    }

    if (row.event_family === 'provider_handoff') {
      existing.unresolvedCount += 1
      if (row.status_delta === 'attachment_review') {
        existing.attachmentReviewCount += 1
      }
    } else if (row.status_delta === 'completed') {
      existing.completedCount += 1
    }

    if (toUtcTime(row.occurred_at) > toUtcTime(existing.latestOccurredAt)) {
      existing.latestOccurredAt = row.occurred_at || null
    }

    grouped.set(targetLabel, existing)
  }

  return Array.from(grouped.entries())
    .map(([targetLabel, value]) => {
      const trend: ProviderTargetTrendCard['trend'] =
        value.unresolvedCount > value.completedCount
          ? 'rising'
          : value.completedCount > 0
            ? 'clearing'
            : 'steady'

      return {
        targetLabel,
        unresolvedCount: value.unresolvedCount,
        completedCount: value.completedCount,
        attachmentReviewCount: value.attachmentReviewCount,
        latestOccurredAt: value.latestOccurredAt,
        trend,
        trendLabel:
          trend === 'rising'
            ? 'Rising load'
            : trend === 'clearing'
              ? 'Clearing'
              : 'Steady',
      }
    })
    .sort((left, right) => {
      if (left.unresolvedCount !== right.unresolvedCount) {
        return right.unresolvedCount - left.unresolvedCount
      }
      if (left.completedCount !== right.completedCount) {
        return right.completedCount - left.completedCount
      }
      return toUtcTime(right.latestOccurredAt) - toUtcTime(left.latestOccurredAt)
    })
    .slice(0, maxItems)
}
