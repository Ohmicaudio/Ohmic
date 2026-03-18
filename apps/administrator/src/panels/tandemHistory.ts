import type { AdministratorAuditSummaryItem, IntakeQueueItem } from '@/types/intake'
import type { AdministratorTandemTargetPreset } from '@/types/tandem'

export function selectRecentTandemLaunches(
  rows: AdministratorAuditSummaryItem[],
  maxItems = 3
): AdministratorAuditSummaryItem[] {
  return rows
    .filter((row) => row.event_family === 'provider_handoff')
    .slice(0, maxItems)
}

export function selectLatestTandemLaunchForIntake(
  rows: AdministratorAuditSummaryItem[],
  intakeId: string | null
): AdministratorAuditSummaryItem | null {
  if (!intakeId) {
    return null
  }

  return rows
    .filter((row) => row.event_family === 'provider_handoff' && row.intake_id === intakeId)
    .sort((left, right) => {
      const leftTime = Date.parse(left.occurred_at || '')
      const rightTime = Date.parse(right.occurred_at || '')
      const safeLeft = Number.isFinite(leftTime) ? leftTime : 0
      const safeRight = Number.isFinite(rightTime) ? rightTime : 0
      return safeRight - safeLeft
    })[0] ?? null
}

export function resolveRecentTandemLaunchSelection(
  row: AdministratorAuditSummaryItem,
  targetPresets: AdministratorTandemTargetPreset[],
  intakeItems: IntakeQueueItem[]
): {
  presetId: string | null
  intakeId: string | null
} {
  const exactPreset = row.target_preset_id
    ? targetPresets.find((preset) => preset.preset_id === row.target_preset_id)
    : null
  const labelPreset =
    exactPreset ??
    targetPresets.find((preset) => preset.target_label === row.target_label)
  const activeIntake = row.intake_id
    ? intakeItems.find((item) => item.intake_id === row.intake_id)
    : null

  return {
    presetId: labelPreset?.preset_id ?? null,
    intakeId: activeIntake?.intake_id ?? null,
  }
}
