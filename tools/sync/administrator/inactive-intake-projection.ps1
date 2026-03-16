Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'projection-common.ps1')

function New-AdministratorInactiveIntakeProjection {
    param([object[]]$IntakeItems = @())

    $rows = foreach ($item in @($IntakeItems)) {
        $inactiveStatus = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $item -Name 'inactive_status' -Default '')
        if (-not $inactiveStatus) {
            $status = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $item -Name 'status' -Default '')
            if ($status -in @('archived', 'routed')) {
                $inactiveStatus = $status
            }
        }

        if (-not $inactiveStatus) {
            continue
        }

        $inactiveSince = [string](Get-AdministratorObjectValue -InputObject $item -Name 'inactive_since' -Default $(Get-AdministratorObjectValue -InputObject $item -Name 'updated_at' -Default ''))
        [pscustomobject]@{
            intake_id = [string](Get-AdministratorObjectValue -InputObject $item -Name 'intake_id' -Default '')
            title = [string](Get-AdministratorObjectValue -InputObject $item -Name 'title' -Default '')
            inactive_status = $inactiveStatus
            inactive_since = $inactiveSince
            last_active_status = [string](Get-AdministratorObjectValue -InputObject $item -Name 'last_active_status' -Default $(Get-AdministratorObjectValue -InputObject $item -Name 'status' -Default ''))
            reopen_allowed = [bool](Get-AdministratorObjectValue -InputObject $item -Name 'reopen_allowed' -Default $true)
            reopen_target_status = [string](Get-AdministratorObjectValue -InputObject $item -Name 'reopen_target_status' -Default 'queued')
            summary_label = [string](Get-AdministratorObjectValue -InputObject $item -Name 'summary_label' -Default '')
            _inactive_sort = ConvertTo-AdministratorSortableUtc -Value $inactiveSince
        }
    }

    $orderedRows = @(
        $rows |
        Sort-Object @{ Expression = '_inactive_sort'; Descending = $true } |
        ForEach-Object {
            $_.PSObject.Properties.Remove('_inactive_sort')
            $_
        }
    )

    return New-AdministratorProjectionEnvelope `
        -ProjectionName 'administrator_inactive_intake_projection' `
        -RootArrayName 'inactive_items' `
        -Rows $orderedRows `
        -RefreshTriggers @('status_change', 'archive_writeback', 'reopen_writeback') `
        -Metadata @{
            ordering = 'inactive_since_desc'
            default_visibility = 'opt_in_only'
        }
}

function Write-AdministratorInactiveIntakeProjection {
    param(
        [object[]]$IntakeItems = @(),
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $projection = New-AdministratorInactiveIntakeProjection -IntakeItems $IntakeItems
    Write-AdministratorProjectionFile -FileName 'administrator_inactive_intake_projection.json' -Value $projection -RuntimeDir $RuntimeDir | Out-Null
    return $projection
}
