Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'projection-common.ps1')

function New-AdministratorFilingHistoryProjection {
    param([object[]]$FilingHistory = @())

    $rows = foreach ($record in @($FilingHistory)) {
        $filedAt = [string](Get-AdministratorObjectValue -InputObject $record -Name 'filed_at' -Default '')

        [pscustomobject]@{
            filing_record_id = [string](Get-AdministratorObjectValue -InputObject $record -Name 'filing_record_id' -Default '')
            intake_id = [string](Get-AdministratorObjectValue -InputObject $record -Name 'intake_id' -Default '')
            filing_destination_id = [string](Get-AdministratorObjectValue -InputObject $record -Name 'filing_destination_id' -Default '')
            display_label = [string](Get-AdministratorObjectValue -InputObject $record -Name 'display_label' -Default '')
            archive_marker = [bool](Get-AdministratorObjectValue -InputObject $record -Name 'archive_marker' -Default $false)
            reason = [string](Get-AdministratorObjectValue -InputObject $record -Name 'reason' -Default '')
            filed_by = [string](Get-AdministratorObjectValue -InputObject $record -Name 'filed_by' -Default '')
            filed_at = $filedAt
            status = [string](Get-AdministratorObjectValue -InputObject $record -Name 'status' -Default 'active')
            _filed_sort = ConvertTo-AdministratorSortableUtc -Value $filedAt
        }
    }

    $orderedRows = @(
        $rows |
        Sort-Object @{ Expression = '_filed_sort'; Descending = $true }, @{ Expression = 'intake_id'; Ascending = $true }, @{ Expression = 'filing_record_id'; Ascending = $true } |
        ForEach-Object {
            $_.PSObject.Properties.Remove('_filed_sort')
            $_
        }
    )

    return New-AdministratorProjectionEnvelope `
        -ProjectionName 'administrator_filing_history_projection' `
        -RootArrayName 'filing_history' `
        -Rows $orderedRows `
        -RefreshTriggers @('filing_writeback', 'archive_marker_change', 'destination_registry_refresh')
}

function Write-AdministratorFilingHistoryProjection {
    param(
        [object[]]$FilingHistory = @(),
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $projection = New-AdministratorFilingHistoryProjection -FilingHistory $FilingHistory
    Write-AdministratorProjectionFile -FileName 'administrator_filing_history_projection.json' -Value $projection -RuntimeDir $RuntimeDir | Out-Null
    return $projection
}
