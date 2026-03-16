Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'common.ps1')
. (Join-Path $PSScriptRoot 'command-reason-catalog.ps1')

function Test-AdministratorApprovalEvaluation {
    param(
        [string]$ActionId,
        [string]$QueueTargetId = '',
        [string]$IntakeSensitivity = 'normal',
        [string]$CurrentStatus = '',
        [object[]]$ApprovalMatrix = @(),
        [string[]]$OverlayRequireApprovalActions = @(),
        [string[]]$OverlayDisallowedActions = @(),
        [string[]]$QueueCapabilityFlags = @()
    )

    $rejectionReasons = @()
    $warningReasons = @()

    if (-not (Normalize-AdministratorToken -Value $ActionId)) {
        $rejectionReasons += 'missing_required_field'
        return [pscustomobject]@{
            approval_requirement_status = 'disallowed'
            approval_reason = 'missing_action'
            approval_target_type = $null
            decision_source = 'input'
            rejection_reasons = @($rejectionReasons)
            warning_reasons = @($warningReasons)
        }
    }

    if (Test-AdministratorListContains -Values $OverlayDisallowedActions -Expected $ActionId) {
        $rejectionReasons += 'action_disallowed'
        return [pscustomobject]@{
            approval_requirement_status = 'disallowed'
            approval_reason = 'overlay_disallowed_action'
            approval_target_type = $null
            decision_source = 'overlay'
            rejection_reasons = @($rejectionReasons)
            warning_reasons = @($warningReasons)
        }
    }

    $normalizedActionId = Normalize-AdministratorToken -Value $ActionId
    $normalizedQueueTargetId = Normalize-AdministratorToken -Value $QueueTargetId
    $normalizedSensitivity = Normalize-AdministratorToken -Value $IntakeSensitivity
    $normalizedStatus = Normalize-AdministratorToken -Value $CurrentStatus

    $bestMatch = $null
    $bestScore = -1
    foreach ($entry in @($ApprovalMatrix)) {
        $entryAction = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $entry -Name 'action_id' -Default '')
        if ($entryAction -and $entryAction -ne $normalizedActionId) {
            continue
        }

        $entryQueue = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $entry -Name 'queue_target_id' -Default '')
        if ($entryQueue -and $entryQueue -ne $normalizedQueueTargetId) {
            continue
        }

        $entrySensitivity = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $entry -Name 'intake_sensitivity' -Default '')
        if ($entrySensitivity -and $entrySensitivity -ne $normalizedSensitivity) {
            continue
        }

        $entryStatus = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $entry -Name 'current_status' -Default '')
        if ($entryStatus -and $entryStatus -ne $normalizedStatus) {
            continue
        }

        $score = 0
        foreach ($value in @($entryAction, $entryQueue, $entrySensitivity, $entryStatus)) {
            if ($value) {
                $score += 1
            }
        }

        if ($score -gt $bestScore) {
            $bestScore = $score
            $bestMatch = $entry
        }
    }

    if ($bestMatch) {
        $decision = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $bestMatch -Name 'decision' -Default 'freely_allowed')
        $reason = [string](Get-AdministratorObjectValue -InputObject $bestMatch -Name 'approval_reason' -Default 'matrix_rule')
        $targetType = [string](Get-AdministratorObjectValue -InputObject $bestMatch -Name 'approval_target_type' -Default '')

        if ($decision -eq 'disallowed') {
            $rejectionReasons += 'action_disallowed'
        }
        elseif ($decision -eq 'approval_required') {
            $rejectionReasons += 'approval_required'
        }

        return [pscustomobject]@{
            approval_requirement_status = if ($decision) { $decision } else { 'freely_allowed' }
            approval_reason = $reason
            approval_target_type = if ($targetType) { $targetType } else { $null }
            decision_source = 'matrix'
            rejection_reasons = @($rejectionReasons | Select-Object -Unique)
            warning_reasons = @($warningReasons)
        }
    }

    if (Test-AdministratorListContains -Values $OverlayRequireApprovalActions -Expected $ActionId) {
        $rejectionReasons += 'approval_required'
        return [pscustomobject]@{
            approval_requirement_status = 'approval_required'
            approval_reason = 'overlay_tightening'
            approval_target_type = 'operator'
            decision_source = 'overlay'
            rejection_reasons = @($rejectionReasons)
            warning_reasons = @($warningReasons)
        }
    }

    if (Test-AdministratorListContains -Values $QueueCapabilityFlags -Expected 'approval_gated') {
        $warningReasons += 'approval_gated_target'
        return [pscustomobject]@{
            approval_requirement_status = 'approval_required'
            approval_reason = 'approval_gated_target'
            approval_target_type = 'operator'
            decision_source = 'queue_target_flag'
            rejection_reasons = @('approval_required')
            warning_reasons = @($warningReasons | Select-Object -Unique)
        }
    }

    return [pscustomobject]@{
        approval_requirement_status = 'freely_allowed'
        approval_reason = 'not_required'
        approval_target_type = $null
        decision_source = 'default'
        rejection_reasons = @($rejectionReasons)
        warning_reasons = @($warningReasons)
    }
}
