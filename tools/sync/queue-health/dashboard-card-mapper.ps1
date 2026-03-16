Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'health-runtime-snapshot.ps1')

function New-QueueHealthDashboardCards {
    param(
        [AllowNull()][object]$QueueHealthRuntime = $null
    )

    $runtime = if ($QueueHealthRuntime) { $QueueHealthRuntime } else { New-QueueHealthRuntimeSnapshot }
    $familyRows = @((Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $runtime -Name 'same_family_projection' -Default $null) -Name 'family_rows' -Default @()))
    $focusRow = $familyRows | Where-Object { [bool](Get-QueueHealthObjectValue -InputObject $_ -Name 'focus_family' -Default $false) } | Select-Object -First 1
    $firstPressureRow = $familyRows | Select-Object -First 1
    $urgency = Get-QueueHealthObjectValue -InputObject $runtime -Name 'refill_urgency_projection' -Default $null

    $cards = @(
        [ordered]@{
            card_id = 'queue_headroom'
            title = 'Queue Headroom'
            emphasis = [string](Get-QueueHealthObjectValue -InputObject $runtime -Name 'global_status_band' -Default 'healthy')
            fields = @(
                [ordered]@{ label = 'Effective ready'; value = [string](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $runtime -Name 'counts' -Default $null) -Name 'effective_ready' -Default 0) },
                [ordered]@{ label = 'Raw ready'; value = [string](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $runtime -Name 'counts' -Default $null) -Name 'raw_ready' -Default 0) },
                [ordered]@{ label = 'Claim occupied'; value = [string](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $runtime -Name 'ready_count_projection' -Default $null) -Name 'excluded_claimed_count' -Default 0) },
                [ordered]@{ label = 'Status'; value = [string](Get-QueueHealthObjectValue -InputObject $runtime -Name 'global_status_band' -Default 'healthy') }
            )
        },
        [ordered]@{
            card_id = 'family_pressure'
            title = 'Family Pressure'
            emphasis = [string](Get-QueueHealthObjectValue -InputObject $firstPressureRow -Name 'pressure_status' -Default 'healthy')
            fields = @(
                [ordered]@{ label = 'Focus family'; value = [string](Get-QueueHealthObjectValue -InputObject $focusRow -Name 'family_label' -Default 'none') },
                [ordered]@{ label = 'Focus ready'; value = [string](Get-QueueHealthObjectValue -InputObject $focusRow -Name 'ready_count' -Default 0) },
                [ordered]@{ label = 'Most pressured'; value = [string](Get-QueueHealthObjectValue -InputObject $firstPressureRow -Name 'family_label' -Default 'none') },
                [ordered]@{ label = 'Band'; value = [string](Get-QueueHealthObjectValue -InputObject $firstPressureRow -Name 'pressure_status' -Default 'healthy') }
            )
        },
        [ordered]@{
            card_id = 'refill_urgency'
            title = 'Refill Urgency'
            emphasis = [string](Get-QueueHealthObjectValue -InputObject $urgency -Name 'urgency_band' -Default 'healthy')
            fields = @(
                [ordered]@{ label = 'Score'; value = [string](Get-QueueHealthObjectValue -InputObject $urgency -Name 'urgency_score' -Default 0) },
                [ordered]@{ label = 'Band'; value = [string](Get-QueueHealthObjectValue -InputObject $urgency -Name 'urgency_band' -Default 'healthy') },
                [ordered]@{ label = 'Drivers'; value = ((ConvertTo-QueueHealthList -Value (Get-QueueHealthObjectValue -InputObject $urgency -Name 'urgency_drivers' -Default @())) -join ', ') },
                [ordered]@{ label = 'Refill now'; value = if ([bool](Get-QueueHealthObjectValue -InputObject $urgency -Name 'recommend_refill' -Default $false)) { 'yes' } else { 'no' } }
            )
        },
        [ordered]@{
            card_id = 'queue_reconciliation'
            title = 'Queue Reconciliation'
            emphasis = if ([int](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $runtime -Name 'reconciliation' -Default $null) -Name 'mismatch_count' -Default 0) -gt 0) { 'warning' } else { 'normal' }
            fields = @(
                [ordered]@{ label = 'Mismatch count'; value = [string](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $runtime -Name 'reconciliation' -Default $null) -Name 'mismatch_count' -Default 0) },
                [ordered]@{ label = 'Ready freshness'; value = [string](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $runtime -Name 'staleness' -Default $null) -Name 'ready' -Default 'unknown') },
                [ordered]@{ label = 'Active freshness'; value = [string](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $runtime -Name 'staleness' -Default $null) -Name 'active' -Default 'unknown') },
                [ordered]@{ label = 'Blocked'; value = [string](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $runtime -Name 'counts' -Default $null) -Name 'blocked' -Default 0) }
            )
        }
    )

    return [pscustomobject]@{
        projection_name = 'queue_headroom_dashboard_cards'
        generated_at = New-UtcTimestamp
        priority_order = @('queue_headroom', 'family_pressure', 'refill_urgency', 'queue_reconciliation')
        count = @($cards).Count
        cards = @($cards)
    }
}

function Write-QueueHealthDashboardCards {
    param(
        [AllowNull()][object]$QueueHealthRuntime = $null,
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $cards = New-QueueHealthDashboardCards -QueueHealthRuntime $QueueHealthRuntime
    Write-QueueHealthProjectionFile -FileName 'queue_headroom_dashboard_cards.json' -Value $cards -RuntimeDir $RuntimeDir | Out-Null
    return $cards
}
