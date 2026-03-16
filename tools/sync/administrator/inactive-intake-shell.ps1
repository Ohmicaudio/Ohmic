Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'shell-common.ps1')

function New-AdministratorInactiveIntakeShellModel {
    param(
        [AllowNull()][object]$InactiveProjection = $null,
        [string]$ActivePresetId = 'inactive_all'
    )

    $filterPresets = @(
        [pscustomobject]@{ preset_id = 'archived_only'; display_label = 'Archived'; included_statuses = @('archived'); default_sort = 'inactive_since_desc' }
        [pscustomobject]@{ preset_id = 'routed_only'; display_label = 'Routed'; included_statuses = @('routed'); default_sort = 'inactive_since_desc' }
        [pscustomobject]@{ preset_id = 'held_only'; display_label = 'Held'; included_statuses = @('held'); default_sort = 'inactive_since_desc' }
        [pscustomobject]@{ preset_id = 'waiting_only'; display_label = 'Waiting'; included_statuses = @('waiting_on_human', 'waiting_on_provider'); default_sort = 'inactive_since_desc' }
        [pscustomobject]@{ preset_id = 'inactive_all'; display_label = 'All Inactive'; included_statuses = @('archived', 'routed', 'held', 'waiting_on_human', 'waiting_on_provider'); default_sort = 'inactive_since_desc' }
    )

    $rows = @(
        Get-AdministratorProjectionRows -Projection $InactiveProjection -ArrayProperty 'inactive_items' |
        ForEach-Object {
            [pscustomobject]@{
                intake_id = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'intake_id' -Default '')
                title = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'title' -Default '')
                inactive_status = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'inactive_status' -Default '')
                inactive_since = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'inactive_since' -Default '')
                last_active_status = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'last_active_status' -Default '')
                reopen_allowed = [bool](Get-AdministratorObjectValue -InputObject $_ -Name 'reopen_allowed' -Default $false)
                reopen_target_status = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'reopen_target_status' -Default '')
                summary_label = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'summary_label' -Default '')
                _sort = ConvertTo-AdministratorSortableUtc -Value (Get-AdministratorObjectValue -InputObject $_ -Name 'inactive_since' -Default '')
            }
        } |
        Sort-Object @{ Expression = '_sort'; Descending = $true } |
        ForEach-Object {
            $_.PSObject.Properties.Remove('_sort')
            $_
        }
    )

    return New-AdministratorShellModuleEnvelope `
        -ModuleId 'administrator_inactive_intake' `
        -Rows $rows `
        -EmptyTitle 'No inactive intake items' `
        -EmptyBody 'Archived and routed intake items will appear here when inactive browsing is enabled.' `
        -FilterPresets $filterPresets `
        -Metadata @{
            active_filter_preset = $ActivePresetId
        }
}
