Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'shell-common.ps1')

function Get-AdministratorWarningLevelRank {
    param([string]$WarningLevel)

    switch ((Normalize-AdministratorToken -Value $WarningLevel)) {
        'blocking' { return 0 }
        'warning' { return 1 }
        'review' { return 2 }
        default { return 3 }
    }
}

function New-AdministratorWarningReviewShellModel {
    param([AllowNull()][object]$WarningProjection = $null)

    $rows = @(
        Get-AdministratorProjectionRows -Projection $WarningProjection -ArrayProperty 'warning_items' |
        ForEach-Object {
            [pscustomobject]@{
                intake_id = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'intake_id' -Default '')
                source_type = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'source_type' -Default '')
                title = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'title' -Default '')
                received_at = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'received_at' -Default '')
                warning_level = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'warning_level' -Default '')
                primary_warning_family = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'primary_warning_family' -Default '')
                warning_reasons = @((ConvertTo-AdministratorStringList -Value (Get-AdministratorObjectValue -InputObject $_ -Name 'warning_reasons' -Default @())))
                parse_confidence = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'parse_confidence' -Default '')
                attachment_warning_count = [int](Get-AdministratorObjectValue -InputObject $_ -Name 'attachment_warning_count' -Default 0)
                latest_reprocess_status = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'latest_reprocess_status' -Default '')
                reprocess_eligible = [bool](Get-AdministratorObjectValue -InputObject $_ -Name 'reprocess_eligible' -Default $false)
                recommended_next_action = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'recommended_next_action' -Default '')
                _level_rank = Get-AdministratorWarningLevelRank -WarningLevel (Get-AdministratorObjectValue -InputObject $_ -Name 'warning_level' -Default '')
                _received_sort = ConvertTo-AdministratorSortableUtc -Value (Get-AdministratorObjectValue -InputObject $_ -Name 'received_at' -Default '')
            }
        } |
        Sort-Object @{ Expression = '_level_rank'; Ascending = $true }, @{ Expression = '_received_sort'; Ascending = $true } |
        ForEach-Object {
            $_.PSObject.Properties.Remove('_level_rank')
            $_.PSObject.Properties.Remove('_received_sort')
            $_
        }
    )

    return New-AdministratorShellModuleEnvelope `
        -ModuleId 'administrator_warning_review' `
        -Rows $rows `
        -EmptyTitle 'No items in warning review' `
        -EmptyBody 'Weakly normalized intake rows and preview failures will appear here until they are reprocessed, held, or marked safe.'
}
