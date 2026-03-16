Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'projection-common.ps1')

function New-AdministratorRecentActionsProjection {
    param([object[]]$CommandResults = @())

    $rows = foreach ($result in @($CommandResults)) {
        $accepted = [string](Get-AdministratorObjectValue -InputObject $result -Name 'validation_status' -Default '')
        $occurredAt = [string](Get-AdministratorObjectValue -InputObject $result -Name 'occurred_at' -Default $(Get-AdministratorObjectValue -InputObject $result -Name 'created_at' -Default ''))
        $actionId = [string](Get-AdministratorObjectValue -InputObject $result -Name 'action_id' -Default $(Get-AdministratorObjectValue -InputObject $result -Name 'resolved_action_id' -Default ''))
        $intakeId = [string](Get-AdministratorObjectValue -InputObject $result -Name 'intake_id' -Default $(Get-AdministratorObjectValue -InputObject $result -Name 'selected_intake_id' -Default ''))

        [pscustomobject]@{
            command_id = [string](Get-AdministratorObjectValue -InputObject $result -Name 'command_id' -Default '')
            action = $actionId
            intake_id = $intakeId
            validation_status = $accepted
            resulting_status = [string](Get-AdministratorObjectValue -InputObject $result -Name 'resulting_status' -Default '')
            occurred_at = $occurredAt
            audit_id = [string](Get-AdministratorObjectValue -InputObject $result -Name 'audit_id' -Default '')
            summary_label = [string](Get-AdministratorObjectValue -InputObject $result -Name 'summary_label' -Default "$actionId -> $accepted")
            _occurred_sort = ConvertTo-AdministratorSortableUtc -Value $occurredAt
        }
    }

    $orderedRows = @(
        $rows |
        Sort-Object @{ Expression = '_occurred_sort'; Descending = $true } |
        ForEach-Object {
            $_.PSObject.Properties.Remove('_occurred_sort')
            $_
        }
    )

    return New-AdministratorProjectionEnvelope `
        -ProjectionName 'administrator_recent_actions' `
        -RootArrayName 'recent_actions' `
        -Rows $orderedRows `
        -RefreshTriggers @('command_writeback', 'audit_append', 'reconciliation_refresh') `
        -Metadata @{
            ordering = 'occurred_at_desc'
        }
}

function Write-AdministratorRecentActionsProjection {
    param(
        [object[]]$CommandResults = @(),
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $projection = New-AdministratorRecentActionsProjection -CommandResults $CommandResults
    Write-AdministratorProjectionFile -FileName 'administrator_recent_actions.json' -Value $projection -RuntimeDir $RuntimeDir | Out-Null
    return $projection
}
