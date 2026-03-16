Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'refill-urgency-score.ps1')

function New-QueueHealthRuntimeSnapshot {
    param(
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $readySummary = Read-JsonFileOrDefault -PathText (Join-Path $RuntimeDir 'ready_tasks.json') -Default ([pscustomobject]@{ staleness = [pscustomobject]@{ status = 'unknown'; reason = 'summary_missing' }; count = 0; items = @() })
    $activeSummary = Read-JsonFileOrDefault -PathText (Join-Path $RuntimeDir 'active_claims.json') -Default ([pscustomobject]@{ staleness = [pscustomobject]@{ status = 'unknown'; reason = 'summary_missing' }; count = 0; items = @() })
    $agentState = Read-JsonFileOrDefault -PathText (Join-Path $RuntimeDir 'agent_state.json') -Default ([pscustomobject]@{})
    $reconciliation = Read-JsonFileOrDefault -PathText (Join-Path $RuntimeDir 'reconciliation_summary.json') -Default ([pscustomobject]@{ staleness = [pscustomobject]@{ status = 'unknown'; reason = 'summary_missing' }; mismatches = @() })

    $readyProjection = New-QueueHealthReadyCountProjection -ReadySummary $readySummary -ActiveSummary $activeSummary
    $familyProjection = New-QueueHealthSameFamilyPressureProjection -ReadyCountProjection $readyProjection -ActiveSummary $activeSummary -AgentState $agentState
    $urgencyProjection = New-QueueHealthRefillUrgencyProjection -ReadyCountProjection $readyProjection -SameFamilyProjection $familyProjection -ActiveSummary $activeSummary

    $globalBand = Get-QueuePressureStatusBand `
        -HotReadyCount ([int](Get-QueueHealthObjectValue -InputObject $readyProjection -Name 'effective_ready_count' -Default 0)) `
        -SameFamilyReadyCount ([int](Get-QueueHealthObjectValue -InputObject $urgencyProjection -Name 'focus_family_ready_count' -Default 0))

    return [pscustomobject]@{
        projection_name = 'queue_health_runtime_snapshot'
        generated_at = New-UtcTimestamp
        runtime_dir = $RuntimeDir
        staleness = [ordered]@{
            ready = [string](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $readySummary -Name 'staleness' -Default $null) -Name 'status' -Default 'unknown')
            active = [string](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $activeSummary -Name 'staleness' -Default $null) -Name 'status' -Default 'unknown')
            reconciliation = [string](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $reconciliation -Name 'staleness' -Default $null) -Name 'status' -Default 'unknown')
        }
        counts = [ordered]@{
            raw_ready = [int](Get-QueueHealthObjectValue -InputObject $readyProjection -Name 'raw_ready_count' -Default 0)
            effective_ready = [int](Get-QueueHealthObjectValue -InputObject $readyProjection -Name 'effective_ready_count' -Default 0)
            active_claims = [int](Get-QueueHealthObjectValue -InputObject $readyProjection -Name 'active_claim_count' -Default 0)
            blocked = [int](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $reconciliation -Name 'counts' -Default $null) -Name 'blocked' -Default 0)
        }
        global_status_band = $globalBand
        focus_family = [string](Get-QueueHealthObjectValue -InputObject $familyProjection -Name 'focus_family' -Default '')
        ready_count_projection = $readyProjection
        same_family_projection = $familyProjection
        refill_urgency_projection = $urgencyProjection
        reconciliation = [ordered]@{
            mismatch_count = @((Get-QueueHealthObjectValue -InputObject $reconciliation -Name 'mismatches' -Default @())).Count
            mismatches = @((Get-QueueHealthObjectValue -InputObject $reconciliation -Name 'mismatches' -Default @()))
        }
    }
}

function Write-QueueHealthRuntimeSnapshot {
    param([string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime')

    $projection = New-QueueHealthRuntimeSnapshot -RuntimeDir $RuntimeDir
    Write-QueueHealthProjectionFile -FileName 'queue_health_runtime.json' -Value $projection -RuntimeDir $RuntimeDir | Out-Null
    return $projection
}
