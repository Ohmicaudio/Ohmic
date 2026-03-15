param(
    [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. 'B:\ohmic\tools\sync\json-loop-helpers.ps1'

$agentStatePath = Join-Path $RuntimeDir 'agent_state.json'
$readyTasksPath = Join-Path $RuntimeDir 'ready_tasks.json'
$activeClaimsPath = Join-Path $RuntimeDir 'active_claims.json'
$summaryPath = Join-Path $RuntimeDir 'reconciliation_summary.json'
$dashboardCardsPath = Join-Path $RuntimeDir 'dashboard_status_cards.json'

$agentState = Read-JsonFileOrDefault -PathText $agentStatePath -Default ([pscustomobject]@{})
$readySummary = Read-JsonFileOrDefault -PathText $readyTasksPath -Default ([pscustomobject]@{ staleness = [pscustomobject]@{ status = 'unknown'; reason = 'summary_missing' }; count = 0; items = @() })
$activeSummary = Read-JsonFileOrDefault -PathText $activeClaimsPath -Default ([pscustomobject]@{ staleness = [pscustomobject]@{ status = 'unknown'; reason = 'summary_missing' }; count = 0; items = @() })
$reconciliation = Read-JsonFileOrDefault -PathText $summaryPath -Default ([pscustomobject]@{ staleness = [pscustomobject]@{ status = 'unknown'; reason = 'summary_missing' }; mismatches = @() })

$freshness = 'fresh'
if ($readySummary.staleness.status -ne 'fresh' -or $activeSummary.staleness.status -ne 'fresh' -or $reconciliation.staleness.status -ne 'fresh') {
    $freshness = 'stale'
}

$riskVisible = $false
if ($agentState.state.board_health -in @('thin', 'stale', 'blocked')) {
    $riskVisible = $true
}
if (@($agentState.state.risks).Count -gt 0) {
    $riskVisible = $true
}

$nextValue = ''
if ($agentState.response -and $agentState.response.recommended_next -and @($agentState.response.recommended_next).Count -gt 0) {
    $nextValue = [string]$agentState.response.recommended_next[0]
}

$cards = @(
    [ordered]@{
        card_id = 'summary'
        title = 'Summary'
        freshness = $freshness
        emphasis = 'normal'
        fields = @(
            [ordered]@{ label = 'Project'; value = [string]$agentState.session.project },
            [ordered]@{ label = 'Mode'; value = [string]$agentState.session.mode },
            [ordered]@{ label = 'Repo'; value = [string]$agentState.session.active_repo },
            [ordered]@{ label = 'Updated'; value = [string]$agentState.session.updated_at },
            [ordered]@{ label = 'Loop state'; value = if ($agentState.input.pending) { 'pending input' } else { 'idle-ready' } }
        )
    },
    [ordered]@{
        card_id = 'queue_health'
        title = 'Queue Health'
        freshness = [string]$readySummary.staleness.status
        emphasis = if ($agentState.state.board_health -eq 'healthy') { 'normal' } else { 'warning' }
        fields = @(
            [ordered]@{ label = 'Ready'; value = [string]$agentState.state.ready_count },
            [ordered]@{ label = 'Active'; value = [string]$agentState.state.active_claim_count },
            [ordered]@{ label = 'Board health'; value = [string]$agentState.state.board_health },
            [ordered]@{ label = 'Summary freshness'; value = [string]$readySummary.staleness.status }
        )
    },
    [ordered]@{
        card_id = 'current_action'
        title = 'Current Action'
        freshness = $freshness
        emphasis = if ($agentState.response.status -eq 'blocked') { 'danger' } else { 'normal' }
        fields = @(
            [ordered]@{ label = 'Status'; value = [string]$agentState.response.status },
            [ordered]@{ label = 'Current action'; value = [string]$agentState.response.message },
            [ordered]@{ label = 'Next'; value = $nextValue },
            [ordered]@{ label = 'Claim'; value = if ($activeSummary.count -gt 0) { [string]$activeSummary.items[0].task } else { 'none' } }
        )
    },
    [ordered]@{
        card_id = 'blockers_risk'
        title = 'Blockers And Risk'
        freshness = $freshness
        visible = $riskVisible
        emphasis = if ($riskVisible) { 'warning' } else { 'normal' }
        fields = @(
            [ordered]@{ label = 'Risk'; value = if (@($agentState.state.risks).Count -gt 0) { [string]$agentState.state.risks[0] } else { 'none' } },
            [ordered]@{ label = 'Blocker'; value = if (@($agentState.response.blocked).Count -gt 0) { [string]$agentState.response.blocked[0] } else { 'none' } },
            [ordered]@{ label = 'State drift'; value = if (@($reconciliation.mismatches).Count -gt 0) { ($reconciliation.mismatches -join ', ') } else { 'none' } },
            [ordered]@{ label = 'Runtime error'; value = 'unknown' }
        )
    }
)

$output = [ordered]@{
    generated_at = New-UtcTimestamp
    source = [ordered]@{
        kind = 'dashboard_card_mapper'
        path = $RuntimeDir
    }
    staleness = [ordered]@{
        status = $freshness
        reason = if ($freshness -eq 'fresh') { $null } else { 'summary_missing_or_stale' }
    }
    count = @($cards).Count
    cards = @($cards)
}

Write-JsonFile -PathText $dashboardCardsPath -Value $output
