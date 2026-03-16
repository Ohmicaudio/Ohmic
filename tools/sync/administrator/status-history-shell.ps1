Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'shell-common.ps1')

function New-AdministratorStatusHistoryShellModel {
    param([AllowNull()][object]$StatusHistoryProjection = $null)

    $rows = @(
        Get-AdministratorProjectionRows -Projection $StatusHistoryProjection -ArrayProperty 'status_history' |
        ForEach-Object {
            [pscustomobject]@{
                status_history_record_id = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'status_history_record_id' -Default '')
                previous_status = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'previous_status' -Default '')
                new_status = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'new_status' -Default '')
                actor_label = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'actor_label' -Default '')
                transition_reason = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'transition_reason' -Default '')
                changed_at = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'changed_at' -Default '')
                is_current = [bool](Get-AdministratorObjectValue -InputObject $_ -Name 'is_current' -Default $false)
                _sort = ConvertTo-AdministratorSortableUtc -Value (Get-AdministratorObjectValue -InputObject $_ -Name 'changed_at' -Default '')
            }
        } |
        Sort-Object @{ Expression = '_sort'; Descending = $true } |
        ForEach-Object {
            $_.PSObject.Properties.Remove('_sort')
            $_
        }
    )

    return New-AdministratorShellModuleEnvelope `
        -ModuleId 'administrator_status_history' `
        -Rows $rows `
        -EmptyTitle 'No status history yet' `
        -EmptyBody 'Status transitions will appear here once the intake item has moved through the administrator lifecycle.'
}
