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
