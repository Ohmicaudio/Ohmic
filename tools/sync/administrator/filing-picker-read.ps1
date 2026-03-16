Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'projection-common.ps1')

function New-AdministratorFilingPickerReadModel {
    param(
        [Parameter(Mandatory = $true)]
        [object]$IntakeItem,
        [object[]]$DestinationRegistry = @(),
        [string]$OverlayContextId = 'overlay_default',
        [bool]$IncludeDisabledRows = $true
    )

    $intakeId = [string](Get-AdministratorObjectValue -InputObject $IntakeItem -Name 'intake_id' -Default '')
    $intakeKind = [string](Get-AdministratorObjectValue -InputObject $IntakeItem -Name 'intake_kind' -Default '')
    $defaultDestinationIds = @()
    $advancedDestinationIds = @()
    $destinations = @()

    foreach ($destination in @($DestinationRegistry)) {
        $destinationId = [string](Get-AdministratorObjectValue -InputObject $destination -Name 'filing_destination_id' -Default '')
        if (-not $destinationId) {
            continue
        }

        $status = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $destination -Name 'status' -Default 'active')
        if ($status -eq 'retired' -or $status -eq 'deprecated') {
            continue
        }

        $allowedKinds = @((ConvertTo-AdministratorStringList -Value (Get-AdministratorObjectValue -InputObject $destination -Name 'allowed_intake_kinds' -Default @())))
        $defaultKinds = @((ConvertTo-AdministratorStringList -Value (Get-AdministratorObjectValue -InputObject $destination -Name 'default_for_intake_kinds' -Default @())))
        $advancedOnly = [bool](Get-AdministratorObjectValue -InputObject $destination -Name 'advanced_only' -Default $false)
        $blocked = [bool](Get-AdministratorObjectValue -InputObject $destination -Name 'blocked' -Default $false)
        $archiveDefault = [bool](Get-AdministratorObjectValue -InputObject $destination -Name 'archive_marker_default' -Default $false)

        $allowedForCurrentIntake = if ($allowedKinds.Count -eq 0) {
            $true
        }
        else {
            Test-AdministratorListContains -Values $allowedKinds -Expected $intakeKind
        }

        $isDefault = [bool](Get-AdministratorObjectValue -InputObject $destination -Name 'is_default' -Default $false)
        if (-not $isDefault -and $defaultKinds.Count -gt 0) {
            $isDefault = Test-AdministratorListContains -Values $defaultKinds -Expected $intakeKind
        }

        $disabledReason = $null
        if (-not $allowedForCurrentIntake) {
            $disabledReason = 'intake_kind_not_allowed'
        }
        elseif ($blocked) {
            $disabledReason = 'blocked_destination'
        }
        elseif ($advancedOnly) {
            $disabledReason = 'advanced_flow_required'
        }

        $selectable = -not $disabledReason
        if (-not $selectable -and -not $IncludeDisabledRows) {
            continue
        }

        if ($isDefault) {
            $defaultDestinationIds += $destinationId
        }
        if ($advancedOnly) {
            $advancedDestinationIds += $destinationId
        }

        $destinations += [pscustomobject]@{
            filing_destination_id = $destinationId
            display_label = [string](Get-AdministratorObjectValue -InputObject $destination -Name 'display_label' -Default $destinationId)
            description = [string](Get-AdministratorObjectValue -InputObject $destination -Name 'description' -Default '')
            archive_marker_default = $archiveDefault
            allowed_for_current_intake = $allowedForCurrentIntake
            status = [string](Get-AdministratorObjectValue -InputObject $destination -Name 'status' -Default 'active')
            selectable = $selectable
            disabled_reason = $disabledReason
            is_default = $isDefault
            requires_advanced_flow = $advancedOnly
        }
    }

    $orderedDestinations = @(
        $destinations |
        Sort-Object @{ Expression = 'is_default'; Descending = $true }, @{ Expression = 'requires_advanced_flow'; Ascending = $true }, @{ Expression = 'display_label'; Ascending = $true }
    )

    return [pscustomobject]@{
        intake_id = $intakeId
        overlay_context_id = $OverlayContextId
        default_destination_ids = @($defaultDestinationIds | Select-Object -Unique)
        advanced_destination_ids = @($advancedDestinationIds | Select-Object -Unique)
        destinations = @($orderedDestinations)
    }
}
