Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'runtime-ready-count.ps1')

function New-QueueHealthSameFamilyPressureProjection {
    param(
        [AllowNull()][object]$ReadyCountProjection = $null,
        [AllowNull()][object]$ActiveSummary = $null,
        [AllowNull()][object]$AgentState = $null,
        [int]$SameFamilyFloor = 2
    )

    $activeClaims = @((Get-QueueHealthObjectValue -InputObject $ActiveSummary -Name 'items' -Default @()))
    $activeFamilyCounts = @{}
    foreach ($claim in $activeClaims) {
        $familyKey = Get-QueueHealthFamilyKey -TaskId ([string](Get-QueueHealthObjectValue -InputObject $claim -Name 'task' -Default ''))
        if (-not $activeFamilyCounts.ContainsKey($familyKey)) {
            $activeFamilyCounts[$familyKey] = 0
        }
        $activeFamilyCounts[$familyKey] = [int]$activeFamilyCounts[$familyKey] + 1
    }

    $focusFamily = Get-QueueHealthFamilyKey -TaskId ([string](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $AgentState -Name 'session' -Default $null) -Name 'task_id' -Default ''))
    $readyItems = @((Get-QueueHealthObjectValue -InputObject $ReadyCountProjection -Name 'ready_items' -Default @()))

    $familyBuckets = @{}
    foreach ($row in $readyItems) {
        $familyKey = [string](Get-QueueHealthObjectValue -InputObject $row -Name 'family_key' -Default 'general')
        if (-not $familyBuckets.ContainsKey($familyKey)) {
            $familyBuckets[$familyKey] = @()
        }
        $familyBuckets[$familyKey] += $row
    }

    $totalReadyCount = [int](Get-QueueHealthObjectValue -InputObject $ReadyCountProjection -Name 'effective_ready_count' -Default @($readyItems).Count)
    $rows = foreach ($familyKey in @($familyBuckets.Keys)) {
        $familyRows = @($familyBuckets[$familyKey])
        $familyReadyCount = @($familyRows).Count
        $activeWorkerCount = if ($activeFamilyCounts.ContainsKey($familyKey)) { [int]$activeFamilyCounts[$familyKey] } else { 0 }
        $statusBand = Get-QueuePressureStatusBand -HotReadyCount $totalReadyCount -SameFamilyReadyCount $familyReadyCount -SameFamilyFloor $SameFamilyFloor -WarmReserveCount -1

        [pscustomobject]@{
            family_key = $familyKey
            family_label = Get-QueueHealthFamilyLabel -FamilyKey $familyKey
            ready_count = $familyReadyCount
            active_worker_count = $activeWorkerCount
            same_family_floor = $SameFamilyFloor
            pressure_status = $statusBand
            focus_family = ($familyKey -eq $focusFamily)
            warm_family_reserve_count = -1
            sample_tasks = @($familyRows | Select-Object -First 3 | ForEach-Object { [string](Get-QueueHealthObjectValue -InputObject $_ -Name 'task_id' -Default '') })
            _band_rank = Get-QueuePressureStatusRank -Band $statusBand
            _focus_rank = if ($familyKey -eq $focusFamily) { 0 } else { 1 }
            _ready_rank = -1 * $familyReadyCount
        }
    }

    $orderedRows = @(
        $rows |
        Sort-Object @{ Expression = '_focus_rank'; Ascending = $true }, @{ Expression = '_band_rank'; Ascending = $true }, @{ Expression = '_ready_rank'; Ascending = $true } |
        ForEach-Object {
            $_.PSObject.Properties.Remove('_band_rank')
            $_.PSObject.Properties.Remove('_focus_rank')
            $_.PSObject.Properties.Remove('_ready_rank')
            $_
        }
    )

    return New-QueueHealthProjectionEnvelope `
        -ProjectionName 'same_family_pressure_rollup' `
        -RootArrayName 'family_rows' `
        -Rows $orderedRows `
        -Metadata @{
            focus_family = $focusFamily
            total_ready_count = $totalReadyCount
            active_claim_count = @($activeClaims).Count
            same_family_floor = $SameFamilyFloor
        }
}

function Write-QueueHealthSameFamilyPressureProjection {
    param(
        [AllowNull()][object]$ReadyCountProjection = $null,
        [AllowNull()][object]$ActiveSummary = $null,
        [AllowNull()][object]$AgentState = $null,
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $projection = New-QueueHealthSameFamilyPressureProjection -ReadyCountProjection $ReadyCountProjection -ActiveSummary $ActiveSummary -AgentState $AgentState
    Write-QueueHealthProjectionFile -FileName 'same_family_pressure_rollup.json' -Value $projection -RuntimeDir $RuntimeDir | Out-Null
    return $projection
}
