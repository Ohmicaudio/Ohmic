Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'common.ps1')

$script:AdministratorCommandRejectionCatalog = @(
    [pscustomobject]@{
        code = 'unknown_action'
        label = 'Unknown action'
        family = 'action'
        severity = 'blocking'
        description = 'The submitted action label or alias does not resolve to a canonical administrator action.'
    }
    [pscustomobject]@{
        code = 'ambiguous_action_alias'
        label = 'Ambiguous action alias'
        family = 'action'
        severity = 'blocking'
        description = 'The submitted action input maps to multiple plausible actions and must be rejected.'
    }
    [pscustomobject]@{
        code = 'overlay_action_hidden'
        label = 'Hidden action alias'
        family = 'action'
        severity = 'blocking'
        description = 'The only matching action is hidden in the current overlay scope.'
    }
    [pscustomobject]@{
        code = 'missing_intake'
        label = 'Missing intake'
        family = 'selection'
        severity = 'blocking'
        description = 'The selected intake is missing or blank.'
    }
    [pscustomobject]@{
        code = 'missing_required_field'
        label = 'Missing required field'
        family = 'input'
        severity = 'blocking'
        description = 'A required field for the requested command is missing.'
    }
    [pscustomobject]@{
        code = 'queue_target_invalid'
        label = 'Invalid queue target'
        family = 'queue_target'
        severity = 'blocking'
        description = 'The requested queue target does not exist in the current registry.'
    }
    [pscustomobject]@{
        code = 'queue_target_action_not_allowed'
        label = 'Queue target not allowed for action'
        family = 'queue_target'
        severity = 'blocking'
        description = 'The requested queue target does not allow the submitted action.'
    }
    [pscustomobject]@{
        code = 'queue_target_deprecated'
        label = 'Deprecated queue target'
        family = 'queue_target'
        severity = 'blocking'
        description = 'The queue target is deprecated for new commands and was not auto-migrated.'
    }
    [pscustomobject]@{
        code = 'queue_target_retired'
        label = 'Retired queue target'
        family = 'queue_target'
        severity = 'blocking'
        description = 'The queue target is retained for history only and must reject new commands.'
    }
    [pscustomobject]@{
        code = 'state_transition_invalid'
        label = 'Invalid state transition'
        family = 'state'
        severity = 'blocking'
        description = 'The requested action is not valid from the intake current state.'
    }
    [pscustomobject]@{
        code = 'reopen_required'
        label = 'Reopen required'
        family = 'state'
        severity = 'blocking'
        description = 'The requested action requires the intake to be reopened first.'
    }
    [pscustomobject]@{
        code = 'approval_required'
        label = 'Approval required'
        family = 'approval'
        severity = 'blocking'
        description = 'The action cannot be applied directly and must become an approval request.'
    }
    [pscustomobject]@{
        code = 'action_disallowed'
        label = 'Action disallowed'
        family = 'approval'
        severity = 'blocking'
        description = 'Project policy disallows the action in the current context.'
    }
)

$script:AdministratorCommandWarningCatalog = @(
    [pscustomobject]@{
        code = 'intake_normalized_with_warnings'
        label = 'Intake normalized with warnings'
        family = 'normalization'
        advisory_level = 'review'
        description = 'The intake exists but carries upstream normalization warnings.'
    }
    [pscustomobject]@{
        code = 'manual_review_required'
        label = 'Manual review required'
        family = 'review'
        advisory_level = 'review'
        description = 'The command can proceed but should remain visible to an operator.'
    }
    [pscustomobject]@{
        code = 'target_queue_advanced_visibility'
        label = 'Advanced target visibility'
        family = 'queue_target'
        advisory_level = 'advisory'
        description = 'The queue target carries capability flags that should be surfaced in the UI.'
    }
    [pscustomobject]@{
        code = 'target_queue_deprecated_migrated'
        label = 'Deprecated target migrated'
        family = 'queue_target'
        advisory_level = 'migration'
        description = 'A deprecated queue target was auto-migrated to its replacement.'
    }
    [pscustomobject]@{
        code = 'approval_gated_target'
        label = 'Approval-gated target'
        family = 'approval'
        advisory_level = 'review'
        description = 'The selected queue target advertises approval-gated behavior.'
    }
    [pscustomobject]@{
        code = 'deprecated_alias_overlap'
        label = 'Deprecated alias overlap'
        family = 'action'
        advisory_level = 'migration'
        description = 'The input matched both active and deprecated aliases; the active action won.'
    }
    [pscustomobject]@{
        code = 'overlay_label_fallback'
        label = 'Overlay label fallback'
        family = 'action'
        advisory_level = 'advisory'
        description = 'The action resolved through a fallback label or alias instead of a direct canonical id.'
    }
)

function Get-AdministratorCommandRejectionCatalog {
    return @($script:AdministratorCommandRejectionCatalog)
}

function Get-AdministratorCommandWarningCatalog {
    return @($script:AdministratorCommandWarningCatalog)
}

function Get-AdministratorCommandReasonDefinition {
    param(
        [ValidateSet('rejection', 'warning')]
        [string]$Catalog,
        [string]$Code
    )

    $needle = Normalize-AdministratorToken -Value $Code
    $source = if ($Catalog -eq 'warning') {
        $script:AdministratorCommandWarningCatalog
    }
    else {
        $script:AdministratorCommandRejectionCatalog
    }

    return $source | Where-Object { $_.code -eq $needle } | Select-Object -First 1
}
