Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'shell-common.ps1')

function New-AdministratorAuditSummaryShellModel {
    param(
        [AllowNull()][object]$AuditProjection = $null,
        [string]$ActivePresetId = 'all_activity'
    )

    $filterPresets = @(
        [pscustomobject]@{ preset_id = 'all_activity'; display_label = 'All Activity'; included_event_families = @(); included_statuses = @(); include_archived = $true; include_routed = $true }
        [pscustomobject]@{ preset_id = 'status_changes'; display_label = 'Status Changes'; included_event_families = @('status_transition'); included_statuses = @(); include_archived = $true; include_routed = $true }
        [pscustomobject]@{ preset_id = 'reopen_events'; display_label = 'Reopen Events'; included_event_families = @('reopen'); included_statuses = @(); include_archived = $true; include_routed = $true }
        [pscustomobject]@{ preset_id = 'filing_changes'; display_label = 'Filing Changes'; included_event_families = @('filing_migration'); included_statuses = @(); include_archived = $true; include_routed = $true }
        [pscustomobject]@{ preset_id = 'provider_handoffs'; display_label = 'Provider Handoffs'; included_event_families = @('provider_handoff'); included_statuses = @(); include_archived = $true; include_routed = $true }
        [pscustomobject]@{ preset_id = 'tag_and_note_activity'; display_label = 'Tag And Note Activity'; included_event_families = @('note', 'tag'); included_statuses = @(); include_archived = $true; include_routed = $true }
    )

    $rows = @(
        Get-AdministratorProjectionRows -Projection $AuditProjection -ArrayProperty 'audit_rows' |
        ForEach-Object {
            [pscustomobject]@{
                event_id = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'event_id' -Default '')
                event_family = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'event_family' -Default '')
                intake_id = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'intake_id' -Default '')
                summary_label = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'summary_label' -Default '')
                actor_label = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'actor_label' -Default '')
                occurred_at = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'occurred_at' -Default '')
                status_delta = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'status_delta' -Default '')
                target_label = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'target_label' -Default '')
                target_preset_id = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'target_preset_id' -Default '')
                launch_url = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'launch_url' -Default '')
                attachment_id = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'attachment_id' -Default '')
                handoff_note = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'handoff_note' -Default '')
                _sort = ConvertTo-AdministratorSortableUtc -Value (Get-AdministratorObjectValue -InputObject $_ -Name 'occurred_at' -Default '')
            }
        } |
        Sort-Object @{ Expression = '_sort'; Descending = $true } |
        ForEach-Object {
            $_.PSObject.Properties.Remove('_sort')
            $_
        }
    )

    return New-AdministratorShellModuleEnvelope `
        -ModuleId 'administrator_audit_summary' `
        -Rows $rows `
        -EmptyTitle 'No recent audit activity' `
        -EmptyBody 'Audit summaries will appear here after routing, reopen, filing, note, or tag events are reconciled.' `
        -FilterPresets $filterPresets `
        -Metadata @{
            active_filter_preset = $ActivePresetId
        }
}
