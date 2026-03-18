import type { AdministratorAuditSummaryItem, IntakeQueueItem } from '@/types/intake'

export interface ProviderHandoffSummary {
  totalCount: number
  attachmentReviewCount: number
  uniqueTargetCount: number
  latestOccurredAt: string | null
}

export interface ProviderHandoffTargetGroup {
  targetLabel: string
  count: number
  latestOccurredAt: string | null
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

function toUtcTime(value: string | null | undefined): number {
  const parsed = Date.parse(value || '')
  return Number.isFinite(parsed) ? parsed : 0
}

export function buildProviderHandoffSummary(
  rows: AdministratorAuditSummaryItem[]
): ProviderHandoffSummary {
  const providerRows = rows.filter((row) => row.event_family === 'provider_handoff')
  const targetLabels = new Set(
    providerRows
      .map((row) => row.target_label?.trim())
      .filter((value): value is string => Boolean(value))
  )

  return {
    totalCount: providerRows.length,
    attachmentReviewCount: providerRows.filter(
      (row) => row.status_delta === 'attachment_review'
    ).length,
    uniqueTargetCount: targetLabels.size,
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
  maxGroups = 3
): ProviderHandoffTargetGroup[] {
  const providerRows = rows.filter((row) => row.event_family === 'provider_handoff')
  const grouped = new Map<string, ProviderHandoffTargetGroup>()

  for (const row of providerRows) {
    const targetLabel = row.target_label?.trim() || 'Unlabeled target'
    const existing = grouped.get(targetLabel)
    if (!existing) {
      grouped.set(targetLabel, {
        targetLabel,
        count: 1,
        latestOccurredAt: row.occurred_at || null,
        status: 'ready',
        statusLabel: 'Ready',
        requiresFollowUp: row.status_delta === 'attachment_review',
      })
      continue
    }

    existing.count += 1
    existing.requiresFollowUp ||= row.status_delta === 'attachment_review'
    if (toUtcTime(row.occurred_at) > toUtcTime(existing.latestOccurredAt)) {
      existing.latestOccurredAt = row.occurred_at || null
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
        : group.requiresFollowUp
          ? 'attention'
          : 'ready'

      return {
        ...group,
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
  maxItems = 5
): ProviderFollowUpItem[] {
  const providerRows = rows.filter((row) => row.event_family === 'provider_handoff')
  const latestByIntake = new Map<string, AdministratorAuditSummaryItem>()
  const intakeTitles = new Map(intakeItems.map((item) => [item.intake_id, item.title]))

  for (const row of providerRows) {
    if (!row.intake_id) {
      continue
    }

    const existing = latestByIntake.get(row.intake_id)
    if (!existing || toUtcTime(row.occurred_at) > toUtcTime(existing.occurred_at)) {
      latestByIntake.set(row.intake_id, row)
    }
  }

  return Array.from(latestByIntake.values())
    .map((row) => {
      const priority: ProviderFollowUpItem['priority'] =
        row.status_delta === 'attachment_review'
          ? 'needs_attachment_review'
          : 'follow_up_pending'

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
      }
    })
    .sort((left, right) => {
      if (left.priority !== right.priority) {
        return followUpPriorityOrder[left.priority] - followUpPriorityOrder[right.priority]
      }
      return toUtcTime(right.occurredAt) - toUtcTime(left.occurredAt)
    })
    .slice(0, maxItems)
}
