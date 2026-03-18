import type { AdministratorAuditSummaryItem } from '@/types/intake'

export function selectRecentTandemLaunches(
  rows: AdministratorAuditSummaryItem[],
  maxItems = 3
): AdministratorAuditSummaryItem[] {
  return rows
    .filter((row) => row.event_family === 'provider_handoff')
    .slice(0, maxItems)
}
