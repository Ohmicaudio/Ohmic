Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'shell-common.ps1')

function New-AdministratorAggregationPanelShellModel {
    param([AllowNull()][object]$AggregationProjection = $null)

    $rows = @(
        Get-AdministratorProjectionRows -Projection $AggregationProjection -ArrayProperty 'aggregation_items' |
        ForEach-Object {
            [pscustomobject]@{
                aggregation_bundle_id = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'aggregation_bundle_id' -Default '')
                bundle_label = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'bundle_label' -Default '')
                bundle_kind = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'bundle_kind' -Default '')
                member_count = [int](Get-AdministratorObjectValue -InputObject $_ -Name 'member_count' -Default 0)
                summary_text = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'summary_text' -Default '')
                recommended_next_action = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'recommended_next_action' -Default '')
                status = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'status' -Default '')
                latest_activity_at = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'latest_activity_at' -Default '')
                primary_member_intake_id = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'primary_member_intake_id' -Default '')
                _sort = ConvertTo-AdministratorSortableUtc -Value (Get-AdministratorObjectValue -InputObject $_ -Name 'latest_activity_at' -Default '')
            }
        } |
        Sort-Object @{ Expression = '_sort'; Descending = $true } |
        ForEach-Object {
            $_.PSObject.Properties.Remove('_sort')
            $_
        }
    )

    return New-AdministratorShellModuleEnvelope `
        -ModuleId 'administrator_aggregation_panel' `
        -Rows $rows `
        -EmptyTitle 'No aggregation bundles' `
        -EmptyBody 'Aggregation summaries will appear here when related intake items should be reviewed as a bundle.' `
        -Metadata @{
            selection_behavior = 'single_bundle_select'
        }
}
