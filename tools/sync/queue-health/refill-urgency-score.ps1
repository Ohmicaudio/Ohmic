Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'same-family-pressure-rollup.ps1')

function Get-QueueHealthUrgencyBand {
    param([int]$Score)

    if ($Score -ge 80) { return 'critical' }
    if ($Score -ge 55) { return 'pressure' }
    if ($Score -ge 30) { return 'watch' }
    return 'healthy'
}

function New-QueueHealthRefillUrgencyProjection {
    param(
        [AllowNull()][object]$ReadyCountProjection = $null,
        [AllowNull()][object]$SameFamilyProjection = $null,
        [AllowNull()][object]$ActiveSummary = $null,
        [int]$HotReadyFloor = 20,
        [int]$HotReadyTarget = 28
    )

    $effectiveReadyCount = [int](Get-QueueHealthObjectValue -InputObject $ReadyCountProjection -Name 'effective_ready_count' -Default 0)
    $activeClaimCount = [int](Get-QueueHealthObjectValue -InputObject $ReadyCountProjection -Name 'active_claim_count' -Default 0)
    $focusFamily = [string](Get-QueueHealthObjectValue -InputObject $SameFamilyProjection -Name 'focus_family' -Default '')
    $familyRows = @((Get-QueueHealthObjectValue -InputObject $SameFamilyProjection -Name 'family_rows' -Default @()))
    $focusRow = $familyRows | Where-Object { [bool](Get-QueueHealthObjectValue -InputObject $_ -Name 'focus_family' -Default $false) } | Select-Object -First 1
    $focusReadyCount = [int](Get-QueueHealthObjectValue -InputObject $focusRow -Name 'ready_count' -Default 0)
    $focusStatus = [string](Get-QueueHealthObjectValue -InputObject $focusRow -Name 'pressure_status' -Default 'healthy')

    $score = 0
    $drivers = @()

    if ($effectiveReadyCount -le $HotReadyFloor) {
        $score += 45
        $drivers += 'global_floor_breach'
    }
    elseif ($effectiveReadyCount -lt $HotReadyTarget) {
        $score += 20
        $drivers += 'global_below_target'
    }

    if ($focusRow) {
        if ($focusReadyCount -le 2) {
            $score += 25
            $drivers += 'focus_family_floor_breach'
        }
        elseif ($focusReadyCount -le 4) {
            $score += 10
            $drivers += 'focus_family_narrowing'
        }
    }

    if ($activeClaimCount -gt $effectiveReadyCount -and $effectiveReadyCount -gt 0) {
        $score += 15
        $drivers += 'active_claim_imbalance'
    }
    elseif ($effectiveReadyCount -eq 0 -and $activeClaimCount -gt 0) {
        $score += 20
        $drivers += 'no_effective_ready_capacity'
    }

    $stalenessStatus = [string](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $ReadyCountProjection -Name 'staleness' -Default $null) -Name 'status' -Default 'unknown')
    if ($stalenessStatus -ne 'fresh') {
        $score += 15
        $drivers += 'stale_runtime_projection'
    }

    if ($score -gt 100) {
        $score = 100
    }

    $band = Get-QueueHealthUrgencyBand -Score $score
    return [pscustomobject]@{
        projection_name = 'queue_refill_urgency_score'
        generated_at = New-UtcTimestamp
        hot_ready_floor = $HotReadyFloor
        hot_ready_target = $HotReadyTarget
        effective_ready_count = $effectiveReadyCount
        active_claim_count = $activeClaimCount
        focus_family = $focusFamily
        focus_family_ready_count = $focusReadyCount
        focus_family_status = $focusStatus
        urgency_score = $score
        urgency_band = $band
        urgency_drivers = @($drivers)
        recommend_refill = ($band -in @('critical', 'pressure'))
    }
}

function Write-QueueHealthRefillUrgencyProjection {
    param(
        [AllowNull()][object]$ReadyCountProjection = $null,
        [AllowNull()][object]$SameFamilyProjection = $null,
        [AllowNull()][object]$ActiveSummary = $null,
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $projection = New-QueueHealthRefillUrgencyProjection -ReadyCountProjection $ReadyCountProjection -SameFamilyProjection $SameFamilyProjection -ActiveSummary $ActiveSummary
    Write-QueueHealthProjectionFile -FileName 'queue_refill_urgency_score.json' -Value $projection -RuntimeDir $RuntimeDir | Out-Null
    return $projection
}
