Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'dashboard-card-mapper.ps1')

function New-QueuePressureAlertShellModel {
    param(
        [AllowNull()][object]$QueueHealthRuntime = $null
    )

    $runtime = if ($QueueHealthRuntime) { $QueueHealthRuntime } else { New-QueueHealthRuntimeSnapshot }
    $familyRows = @((Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $runtime -Name 'same_family_projection' -Default $null) -Name 'family_rows' -Default @()))
    $urgentFamilies = @(
        $familyRows |
        Where-Object { [string](Get-QueueHealthObjectValue -InputObject $_ -Name 'pressure_status' -Default 'healthy') -in @('critical', 'pressure', 'watch') } |
        Select-Object -First 5
    )

    $urgency = Get-QueueHealthObjectValue -InputObject $runtime -Name 'refill_urgency_projection' -Default $null
    $rows = @(
        $urgentFamilies |
        ForEach-Object {
            [pscustomobject]@{
                family_label = [string](Get-QueueHealthObjectValue -InputObject $_ -Name 'family_label' -Default '')
                ready_count = [int](Get-QueueHealthObjectValue -InputObject $_ -Name 'ready_count' -Default 0)
                active_worker_count = [int](Get-QueueHealthObjectValue -InputObject $_ -Name 'active_worker_count' -Default 0)
                pressure_status = [string](Get-QueueHealthObjectValue -InputObject $_ -Name 'pressure_status' -Default 'healthy')
                focus_family = [bool](Get-QueueHealthObjectValue -InputObject $_ -Name 'focus_family' -Default $false)
                sample_tasks = @((ConvertTo-QueueHealthList -Value (Get-QueueHealthObjectValue -InputObject $_ -Name 'sample_tasks' -Default @())))
            }
        }
    )

    return [pscustomobject]@{
        module_id = 'queue_pressure_alerts'
        generated_at = New-UtcTimestamp
        global_status_band = [string](Get-QueueHealthObjectValue -InputObject $runtime -Name 'global_status_band' -Default 'healthy')
        urgency_band = [string](Get-QueueHealthObjectValue -InputObject $urgency -Name 'urgency_band' -Default 'healthy')
        urgency_score = [int](Get-QueueHealthObjectValue -InputObject $urgency -Name 'urgency_score' -Default 0)
        recommend_refill = [bool](Get-QueueHealthObjectValue -InputObject $urgency -Name 'recommend_refill' -Default $false)
        empty_title = 'No queue pressure alerts'
        empty_body = 'Queue headroom is above the current floor and no family is requesting refill attention.'
        rows = @($rows)
    }
}

function Write-QueuePressureAlertShellModel {
    param(
        [AllowNull()][object]$QueueHealthRuntime = $null,
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $model = New-QueuePressureAlertShellModel -QueueHealthRuntime $QueueHealthRuntime
    Write-QueueHealthProjectionFile -FileName 'queue_pressure_alert_shell.json' -Value $model -RuntimeDir $RuntimeDir | Out-Null
    return $model
}
