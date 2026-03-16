Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'projection-common.ps1')

function New-AdministratorIntakeQueueProjection {
    param(
        [object[]]$IntakeItems = @(),
        [object[]]$WarningStates = @()
    )

    $warningMap = @{}
    foreach ($warningState in @($WarningStates)) {
        $intakeId = [string](Get-AdministratorObjectValue -InputObject $warningState -Name 'intake_id' -Default '')
        if (-not $intakeId) {
            continue
        }

        $warningMap[$intakeId] = $warningState
    }

    $rows = foreach ($item in @($IntakeItems)) {
        $status = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $item -Name 'status' -Default '')
        if ($status -in @('archived', 'routed', 'rejected')) {
            continue
        }

        $intakeId = [string](Get-AdministratorObjectValue -InputObject $item -Name 'intake_id' -Default '')
        $warningState = if ($warningMap.ContainsKey($intakeId)) { $warningMap[$intakeId] } else { $null }
        $warningCount = [int](Get-AdministratorObjectValue -InputObject $warningState -Name 'warning_count' -Default 0)
        $warningStatus = [string](Get-AdministratorObjectValue -InputObject $warningState -Name 'warning_state' -Default $(if ($warningCount -gt 0) { 'warnings_present' } else { 'clean' }))
        $receivedAt = [string](Get-AdministratorObjectValue -InputObject $item -Name 'received_at' -Default '')
        $priorityHint = [string](Get-AdministratorObjectValue -InputObject $item -Name 'priority_hint' -Default '')

        [pscustomobject]@{
            intake_id = $intakeId
            title = [string](Get-AdministratorObjectValue -InputObject $item -Name 'title' -Default $intakeId)
            intake_kind = [string](Get-AdministratorObjectValue -InputObject $item -Name 'intake_kind' -Default 'unknown')
            received_at = $receivedAt
            status = [string](Get-AdministratorObjectValue -InputObject $item -Name 'status' -Default '')
            routing_target = [string](Get-AdministratorObjectValue -InputObject $item -Name 'routing_target' -Default '')
            trust_tier = [string](Get-AdministratorObjectValue -InputObject $item -Name 'trust_tier' -Default '')
            priority_hint = $priorityHint
            tags = @((ConvertTo-AdministratorStringList -Value (Get-AdministratorObjectValue -InputObject $item -Name 'tags' -Default @())))
            warning_state = $warningStatus
            warning_count = $warningCount
            summary_label = [string](Get-AdministratorObjectValue -InputObject $item -Name 'summary' -Default '')
            _priority_rank = Get-AdministratorPriorityRank -PriorityHint $priorityHint
            _received_sort = ConvertTo-AdministratorSortableUtc -Value $receivedAt
        }
    }

    $orderedRows = @(
        $rows |
        Sort-Object @{ Expression = '_priority_rank'; Ascending = $true }, @{ Expression = '_received_sort'; Descending = $true } |
        ForEach-Object {
            $_.PSObject.Properties.Remove('_priority_rank')
            $_.PSObject.Properties.Remove('_received_sort')
            $_
        }
    )

    return New-AdministratorProjectionEnvelope `
        -ProjectionName 'administrator_intake_queue' `
        -RootArrayName 'queue_items' `
        -Rows $orderedRows `
        -RefreshTriggers @('intake_change', 'routing_change', 'warning_change') `
        -Metadata @{
            ordering = 'priority_then_received_at_desc'
            includes_warning_state = $true
        }
}

function Write-AdministratorIntakeQueueProjection {
    param(
        [object[]]$IntakeItems = @(),
        [object[]]$WarningStates = @(),
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $projection = New-AdministratorIntakeQueueProjection -IntakeItems $IntakeItems -WarningStates $WarningStates
    Write-AdministratorProjectionFile -FileName 'administrator_intake_queue.json' -Value $projection -RuntimeDir $RuntimeDir | Out-Null
    return $projection
}
