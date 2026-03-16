Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'common.ps1')
. (Join-Path $PSScriptRoot 'command-reason-catalog.ps1')
. (Join-Path $PSScriptRoot 'overlay-action-resolution.ps1')
. (Join-Path $PSScriptRoot 'queue-target-validation.ps1')
. (Join-Path $PSScriptRoot 'approval-evaluation.ps1')

function New-AdministratorCommandComposerState {
    param(
        [string]$SelectedIntakeId = '',
        [object[]]$ActionRegistry = @(),
        [object[]]$TargetRegistry = @()
    )

    $availableActions = @(
        $ActionRegistry |
        Where-Object {
            (Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $_ -Name 'status' -Default 'active')) -ne 'retired' -and
            -not [bool](Get-AdministratorObjectValue -InputObject $_ -Name 'hidden' -Default $false)
        } |
        ForEach-Object {
            [pscustomobject]@{
                action_id = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'action_id' -Default '')
                display_label = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'display_label' -Default (Get-AdministratorObjectValue -InputObject $_ -Name 'action_id' -Default ''))
                aliases = @((ConvertTo-AdministratorStringList -Value (Get-AdministratorObjectValue -InputObject $_ -Name 'aliases' -Default @())))
            }
        }
    )

    $availableTargets = @(
        $TargetRegistry |
        Where-Object {
            $status = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $_ -Name 'status' -Default 'active')
            $status -eq 'active' -or $status -eq 'deprecated'
        } |
        ForEach-Object {
            [pscustomobject]@{
                queue_target_id = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'queue_target_id' -Default '')
                display_label = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'display_label' -Default (Get-AdministratorObjectValue -InputObject $_ -Name 'queue_target_id' -Default ''))
                status = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'status' -Default 'active')
                capability_flags = @((ConvertTo-AdministratorStringList -Value (Get-AdministratorObjectValue -InputObject $_ -Name 'capability_flags' -Default @())))
            }
        }
    )

    return [pscustomobject]@{
        selected_intake_id = $SelectedIntakeId
        action_input = ''
        note_text = ''
        tags = @()
        queue_target_id = ''
        available_actions = @($availableActions)
        available_targets = @($availableTargets)
        validation_feedback = [pscustomobject]@{
            validation_status = 'idle'
            rejection_reasons = @()
            warning_reasons = @()
            rejection_details = @()
            warning_details = @()
        }
    }
}

function Convert-AdministratorComposerStateToIntent {
    param(
        [Parameter(Mandatory = $true)]
        [object]$ComposerState,
        [object[]]$ActionRegistry = @(),
        [object[]]$TargetRegistry = @(),
        [object[]]$ApprovalMatrix = @(),
        [string]$OverlayId = 'default',
        [bool]$AllowQueueTargetMigration = $false,
        [string[]]$QueueRequiredActions = @('route_to_orchestrator', 'request_approval'),
        [string[]]$OverlayRequireApprovalActions = @(),
        [string[]]$OverlayDisallowedActions = @(),
        [string]$RequestedBy = 'operator:d'
    )

    $rejectionReasons = @()
    $warningReasons = @()

    $selectedIntakeId = [string](Get-AdministratorObjectValue -InputObject $ComposerState -Name 'selected_intake_id' -Default '')
    if (-not (Normalize-AdministratorToken -Value $selectedIntakeId)) {
        $rejectionReasons += 'missing_intake'
    }

    $actionInput = [string](Get-AdministratorObjectValue -InputObject $ComposerState -Name 'action_input' -Default '')
    $actionResolution = Resolve-AdministratorOverlayAction -ActionInput $actionInput -ActionRegistry $ActionRegistry -OverlayId $OverlayId
    $rejectionReasons += @($actionResolution.rejection_reasons)
    $warningReasons += @($actionResolution.warning_reasons)

    $resolvedActionId = [string]$actionResolution.resolved_action_id
    $queueTargetId = [string](Get-AdministratorObjectValue -InputObject $ComposerState -Name 'queue_target_id' -Default '')
    $queueValidation = $null

    if ($resolvedActionId -and ((Test-AdministratorListContains -Values $QueueRequiredActions -Expected $resolvedActionId) -or (Normalize-AdministratorToken -Value $queueTargetId))) {
        $queueValidation = Test-AdministratorQueueTarget -ActionId $resolvedActionId -TargetId $queueTargetId -TargetRegistry $TargetRegistry -AllowAutoMigration:$AllowQueueTargetMigration
        $rejectionReasons += @($queueValidation.rejection_reasons)
        $warningReasons += @($queueValidation.warning_reasons)
    }

    $approvalEvaluation = $null
    if ($resolvedActionId) {
        $capabilityFlags = if ($queueValidation) { @($queueValidation.capability_flags) } else { @() }
        $approvalEvaluation = Test-AdministratorApprovalEvaluation `
            -ActionId $resolvedActionId `
            -QueueTargetId $(if ($queueValidation) { [string]$queueValidation.resolved_target_id } else { $queueTargetId }) `
            -ApprovalMatrix $ApprovalMatrix `
            -OverlayRequireApprovalActions $OverlayRequireApprovalActions `
            -OverlayDisallowedActions $OverlayDisallowedActions `
            -QueueCapabilityFlags $capabilityFlags

        $rejectionReasons += @($approvalEvaluation.rejection_reasons)
        $warningReasons += @($approvalEvaluation.warning_reasons)
    }

    $tagList = @(ConvertTo-AdministratorStringList -Value (Get-AdministratorObjectValue -InputObject $ComposerState -Name 'tags' -Default @()))
    $noteText = [string](Get-AdministratorObjectValue -InputObject $ComposerState -Name 'note_text' -Default '')

    $rejectionReasons = @($rejectionReasons | Where-Object { $_ } | Select-Object -Unique)
    $warningReasons = @($warningReasons | Where-Object { $_ } | Select-Object -Unique)

    $rejectionDetails = @(
        foreach ($code in $rejectionReasons) {
            Get-AdministratorCommandReasonDefinition -Catalog rejection -Code $code
        }
    )
    $warningDetails = @(
        foreach ($code in $warningReasons) {
            Get-AdministratorCommandReasonDefinition -Catalog warning -Code $code
        }
    )

    $validationStatus = if ($rejectionReasons.Count -gt 0) {
        'rejected'
    }
    elseif ($warningReasons.Count -gt 0) {
        'accepted_with_warnings'
    }
    else {
        'accepted'
    }

    return [pscustomobject]@{
        command_id = New-AdministratorCommandId
        selected_intake_id = $selectedIntakeId
        action_input = $actionInput
        resolved_action_id = $resolvedActionId
        resolved_action_label = [string]$actionResolution.resolved_display_label
        requested_queue_target_id = $queueTargetId
        resolved_queue_target_id = if ($queueValidation) { [string]$queueValidation.resolved_target_id } else { $null }
        note_text = $noteText
        tags = @($tagList)
        requested_by = $RequestedBy
        created_at = New-AdministratorUtcTimestamp
        validation = [pscustomobject]@{
            validation_status = $validationStatus
            rejection_reasons = @($rejectionReasons)
            warning_reasons = @($warningReasons)
            rejection_details = @($rejectionDetails)
            warning_details = @($warningDetails)
            action_resolution = $actionResolution
            queue_target_validation = $queueValidation
            approval_evaluation = $approvalEvaluation
        }
    }
}
