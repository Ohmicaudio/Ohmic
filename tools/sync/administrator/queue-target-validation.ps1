Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'common.ps1')
. (Join-Path $PSScriptRoot 'command-reason-catalog.ps1')

function Test-AdministratorQueueTarget {
    param(
        [string]$ActionId,
        [string]$TargetId,
        [object[]]$TargetRegistry,
        [bool]$AllowAutoMigration = $false
    )

    $rejectionReasons = @()
    $warningReasons = @()
    $normalizedTargetId = Normalize-AdministratorToken -Value $TargetId

    if (-not $normalizedTargetId) {
        $rejectionReasons += 'missing_required_field'
        return [pscustomobject]@{
            validation_status = 'rejected'
            requested_target_id = $TargetId
            resolved_target_id = $null
            resolved_display_label = $null
            target_status = $null
            migration_applied = $false
            capability_flags = @()
            rejection_reasons = @($rejectionReasons)
            warning_reasons = @($warningReasons)
        }
    }

    $target = @($TargetRegistry | Where-Object {
        (Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $_ -Name 'queue_target_id' -Default '')) -eq $normalizedTargetId
    }) | Select-Object -First 1

    if (-not $target) {
        $rejectionReasons += 'queue_target_invalid'
        return [pscustomobject]@{
            validation_status = 'rejected'
            requested_target_id = $TargetId
            resolved_target_id = $null
            resolved_display_label = $null
            target_status = $null
            migration_applied = $false
            capability_flags = @()
            rejection_reasons = @($rejectionReasons)
            warning_reasons = @($warningReasons)
        }
    }

    $targetStatus = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $target -Name 'status' -Default 'active')
    $resolvedTarget = $target
    $migrationApplied = $false
    $replacementTargetId = [string](Get-AdministratorObjectValue -InputObject $target -Name 'replacement_target_id' -Default '')
    $rejectNewCommands = [bool](Get-AdministratorObjectValue -InputObject $target -Name 'reject_new_commands' -Default $false)
    $allowedActions = @(ConvertTo-AdministratorStringList -Value (Get-AdministratorObjectValue -InputObject $target -Name 'allowed_actions' -Default @()))
    $capabilityFlags = @(ConvertTo-AdministratorStringList -Value (Get-AdministratorObjectValue -InputObject $target -Name 'capability_flags' -Default @()))

    if ($allowedActions.Count -gt 0 -and -not (Test-AdministratorListContains -Values $allowedActions -Expected $ActionId)) {
        $rejectionReasons += 'queue_target_action_not_allowed'
    }

    if ($targetStatus -eq 'retired' -or ($targetStatus -eq 'deprecated' -and $rejectNewCommands -and -not $replacementTargetId)) {
        $rejectionReasons += if ($targetStatus -eq 'retired') { 'queue_target_retired' } else { 'queue_target_deprecated' }
    }
    elseif ($targetStatus -eq 'deprecated') {
        if ($AllowAutoMigration -and $replacementTargetId) {
            $replacement = @($TargetRegistry | Where-Object {
                (Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $_ -Name 'queue_target_id' -Default '')) -eq (Normalize-AdministratorToken -Value $replacementTargetId)
            }) | Select-Object -First 1

            if ($replacement) {
                $resolvedTarget = $replacement
                $migrationApplied = $true
                $warningReasons += 'target_queue_deprecated_migrated'
                $capabilityFlags = @(ConvertTo-AdministratorStringList -Value (Get-AdministratorObjectValue -InputObject $replacement -Name 'capability_flags' -Default @()))
                $targetStatus = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $replacement -Name 'status' -Default 'active')
            }
            else {
                $rejectionReasons += 'queue_target_deprecated'
            }
        }
        else {
            $rejectionReasons += 'queue_target_deprecated'
        }
    }

    if ($capabilityFlags.Count -gt 0) {
        $interestingFlags = @('approval_gated', 'escalation_capable', 'multi_operator_visible', 'manual_followup_heavy', 'customer_visible')
        foreach ($flag in $interestingFlags) {
            if (Test-AdministratorListContains -Values $capabilityFlags -Expected $flag) {
                $warningReasons += 'target_queue_advanced_visibility'
                break
            }
        }

        if (Test-AdministratorListContains -Values $capabilityFlags -Expected 'approval_gated') {
            $warningReasons += 'approval_gated_target'
        }
    }

    $resolvedTargetId = [string](Get-AdministratorObjectValue -InputObject $resolvedTarget -Name 'queue_target_id' -Default '')
    $resolvedDisplayLabel = [string](Get-AdministratorObjectValue -InputObject $resolvedTarget -Name 'display_label' -Default $resolvedTargetId)

    return [pscustomobject]@{
        validation_status = if ($rejectionReasons.Count -gt 0) {
            'rejected'
        }
        elseif ($warningReasons.Count -gt 0) {
            'accepted_with_warnings'
        }
        else {
            'accepted'
        }
        requested_target_id = $TargetId
        resolved_target_id = $resolvedTargetId
        resolved_display_label = $resolvedDisplayLabel
        target_status = $targetStatus
        migration_applied = $migrationApplied
        capability_flags = @($capabilityFlags)
        rejection_reasons = @($rejectionReasons | Select-Object -Unique)
        warning_reasons = @($warningReasons | Select-Object -Unique)
    }
}
