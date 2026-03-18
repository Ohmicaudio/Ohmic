import type { AdministratorAuditSummaryItem } from '@/types/intake'

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
      })
      continue
    }

    existing.count += 1
    if (toUtcTime(row.occurred_at) > toUtcTime(existing.latestOccurredAt)) {
      existing.latestOccurredAt = row.occurred_at || null
    }
  }

  return Array.from(grouped.values())
    .sort((left, right) => {
      if (right.count !== left.count) {
        return right.count - left.count
      }
      return toUtcTime(right.latestOccurredAt) - toUtcTime(left.latestOccurredAt)
    })
    .slice(0, maxGroups)
}
