param(
    [string]$Root = 'B:\ohmic',
    [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime',
    [string]$Project = 'ohmic'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. 'B:\ohmic\tools\sync\json-loop-helpers.ps1'

$requestsRoot = Join-Path $Root 'agent-system\requests'
$jobsRoot = Join-Path $Root 'agent-system\jobs'
$memoryRoot = Join-Path $Root 'agent-system\memory'

function Get-MarkdownMetaValue {
    param(
        [string[]]$Lines,
        [string]$Key
    )

    foreach ($line in $Lines) {
        if ($line -match ('^{0}:\s*(.*)$' -f [regex]::Escape($Key))) {
            return $matches[1].Trim()
        }
    }

    return ''
}

function Get-MarkdownTitle {
    param([string[]]$Lines)

    foreach ($line in $Lines) {
        if ($line -match '^# (.+)$') {
            return $matches[1].Trim()
        }
    }

    return ''
}

function Test-ObjectProperty {
    param(
        [object]$Object,
        [string]$PropertyName
    )

    if ($null -eq $Object) {
        return $false
    }

    return @($Object.PSObject.Properties | Where-Object { $_.Name -eq $PropertyName }).Count -gt 0
}

function Read-RequestSummary {
    param([string]$PathText)

    $lines = @(Get-Content $PathText)
    return [pscustomobject]@{
        task_id = [System.IO.Path]::GetFileNameWithoutExtension($PathText)
        title = Get-MarkdownTitle -Lines $lines
        priority = (Get-MarkdownMetaValue -Lines $lines -Key 'Priority')
        project = (Get-MarkdownMetaValue -Lines $lines -Key 'Project')
        status = (Get-MarkdownMetaValue -Lines $lines -Key 'Status')
        date = (Get-MarkdownMetaValue -Lines $lines -Key 'Date')
        owner = (Get-MarkdownMetaValue -Lines $lines -Key 'Owner')
        claim_id = (Get-MarkdownMetaValue -Lines $lines -Key 'Claim ID')
        file_path = $PathText
    }
}

function Read-ClaimSummary {
    param([string]$PathText)

    $lines = @(Get-Content $PathText)
    $paths = @()
    $inFiles = $false
    foreach ($line in $lines) {
        if ($line -eq '# Files') {
            $inFiles = $true
            continue
        }
        if ($inFiles -and $line -match '^# ') {
            $inFiles = $false
        }
        if ($inFiles -and $line -match '^- (.+)$') {
            $paths += $matches[1].Trim()
        }
    }

    return [pscustomobject]@{
        claim_id = (Get-MarkdownMetaValue -Lines $lines -Key 'claim_id')
        task = (Get-MarkdownMetaValue -Lines $lines -Key 'task')
        owner = (Get-MarkdownMetaValue -Lines $lines -Key 'owner')
        project = (Get-MarkdownMetaValue -Lines $lines -Key 'project')
        status = (Get-MarkdownMetaValue -Lines $lines -Key 'status')
        started = (Get-MarkdownMetaValue -Lines $lines -Key 'started')
        expires = (Get-MarkdownMetaValue -Lines $lines -Key 'expires')
        files = @($paths)
        file_path = $PathText
    }
}

function Get-SourceLatestWrite {
    param([string[]]$Paths)

    $latest = $null
    foreach ($path in $Paths) {
        if (-not (Test-Path $path)) {
            continue
        }
        $candidate = Get-ChildItem -Path $path -Recurse -File -ErrorAction SilentlyContinue |
            Sort-Object LastWriteTimeUtc -Descending |
            Select-Object -First 1
        if ($candidate -and (-not $latest -or $candidate.LastWriteTimeUtc -gt $latest.LastWriteTimeUtc)) {
            $latest = $candidate
        }
    }

    if ($latest) {
        return $latest.LastWriteTimeUtc.ToString('o')
    }

    return New-UtcTimestamp
}

function Get-PriorityRank {
    param([string]$Priority)

    $priorityText = ''
    if ($null -ne $Priority) {
        $priorityText = [string]$Priority
    }

    switch ($priorityText.ToLowerInvariant()) {
        'high' { return 0 }
        'medium' { return 1 }
        'low' { return 2 }
        default { return 3 }
    }
}

function Get-LatestMeaningfulOutboxEvent {
    param([object[]]$Events)

    if (-not $Events) {
        return $null
    }

    return ($Events | Sort-Object created_at -Descending | Select-Object -First 1)
}

function Get-FirstPendingInboxEvent {
    param([object[]]$Events)

    if (-not $Events) {
        return $null
    }

    return (
        $Events |
        Where-Object {
            $_.handled -eq $false -and
            @('instruction', 'continue', 'pause', 'resume', 'replan', 'audit_request') -contains $_.event_type
        } |
        Sort-Object created_at |
        Select-Object -First 1
    )
}

function Get-BoardHealth {
    param(
        [int]$ReadyCount,
        [int]$BlockedCount,
        [bool]$HasMismatch
    )

    if ($HasMismatch) {
        return 'stale'
    }
    if ($ReadyCount -eq 0 -and $BlockedCount -gt 0) {
        return 'blocked'
    }
    if ($ReadyCount -lt 3) {
        return 'thin'
    }
    return 'healthy'
}

Ensure-Directory -PathText $RuntimeDir

$readyDir = Join-Path $requestsRoot 'ready'
$doneDir = Join-Path $requestsRoot 'done'
$blockedDir = Join-Path $requestsRoot 'blocked'
$activeClaimsDir = Join-Path $jobsRoot 'active'

$readyTasks = @()
if (Test-Path $readyDir) {
    $readyTasks = @(
        Get-ChildItem -Path $readyDir -Filter '*.md' -File |
        Where-Object { $_.Name -ne '.gitkeep' } |
        ForEach-Object { Read-RequestSummary -PathText $_.FullName }
    )
}

$doneTasks = @()
if (Test-Path $doneDir) {
    $doneTasks = @(
        Get-ChildItem -Path $doneDir -Filter '*.md' -File |
        Where-Object { $_.Name -ne '.gitkeep' } |
        ForEach-Object { Read-RequestSummary -PathText $_.FullName }
    )
}

$blockedTasks = @()
if (Test-Path $blockedDir) {
    $blockedTasks = @(
        Get-ChildItem -Path $blockedDir -Filter '*.md' -File |
        Where-Object { $_.Name -ne '.gitkeep' } |
        ForEach-Object { Read-RequestSummary -PathText $_.FullName }
    )
}

$activeClaims = @()
if (Test-Path $activeClaimsDir) {
    $activeClaims = @(
        Get-ChildItem -Path $activeClaimsDir -Filter '*.md' -File |
        Where-Object { $_.Name -ne '.gitkeep' } |
        ForEach-Object { Read-ClaimSummary -PathText $_.FullName } |
        Where-Object { $_.status -eq 'active' }
    )
}

$agentStatePath = Join-Path $RuntimeDir 'agent_state.json'
$agentInboxPath = Join-Path $RuntimeDir 'agent_inbox.jsonl'
$agentOutboxPath = Join-Path $RuntimeDir 'agent_outbox.jsonl'
$agentLocksPath = Join-Path $RuntimeDir 'agent_locks.json'
$readyTasksPath = Join-Path $RuntimeDir 'ready_tasks.json'
$activeClaimsPath = Join-Path $RuntimeDir 'active_claims.json'
$summaryPath = Join-Path $RuntimeDir 'reconciliation_summary.json'

$existingAgentState = Read-JsonFileOrDefault -PathText $agentStatePath -Default $null
$locks = Read-JsonFileOrDefault -PathText $agentLocksPath -Default ([pscustomobject]@{ updated_at = ''; orchestrator = @{}; workers = @() })
$inboxEvents = @(Read-JsonLines -PathText $agentInboxPath)
$outboxEvents = @(Read-JsonLines -PathText $agentOutboxPath)

$generatedAt = New-UtcTimestamp
$sourceLatestWrite = Get-SourceLatestWrite -Paths @($readyDir, $doneDir, $blockedDir, $activeClaimsDir, $memoryRoot)

$expectedReadyCount = @($readyTasks).Count
$expectedActiveClaimCount = @($activeClaims).Count
$expectedBlockedCount = @($blockedTasks).Count
$expectedDoneCount = @($doneTasks).Count

$mismatches = @()
if ($existingAgentState) {
    if ($null -ne $existingAgentState.state) {
        if ([int]$existingAgentState.state.ready_count -ne $expectedReadyCount) {
            $mismatches += 'agent_state.ready_count'
        }
        if ([int]$existingAgentState.state.active_claim_count -ne $expectedActiveClaimCount) {
            $mismatches += 'agent_state.active_claim_count'
        }
    }
}
else {
    $mismatches += 'agent_state.missing'
}

$hasMismatch = @($mismatches).Count -gt 0
$boardHealth = Get-BoardHealth -ReadyCount $expectedReadyCount -BlockedCount $expectedBlockedCount -HasMismatch:$hasMismatch
$queueFloorMet = $expectedReadyCount -ge 3

$pendingInbox = Get-FirstPendingInboxEvent -Events $inboxEvents
$latestInbox = ($inboxEvents | Sort-Object created_at -Descending | Select-Object -First 1)
$latestOutbox = Get-LatestMeaningfulOutboxEvent -Events $outboxEvents

$topPriority = @(
    $readyTasks |
    Sort-Object @{ Expression = { Get-PriorityRank -Priority $_.priority } }, @{ Expression = { $_.date } }, @{ Expression = { $_.task_id } } |
    Select-Object -First 3 -ExpandProperty task_id
)

$recentCompletions = @(
    Get-ChildItem -Path $doneDir -Filter '*.md' -File |
    Where-Object { $_.Name -ne '.gitkeep' } |
    Sort-Object LastWriteTimeUtc -Descending |
    Select-Object -First 3 |
    ForEach-Object { [System.IO.Path]::GetFileNameWithoutExtension($_.Name) }
)

$inputBlock = if ($pendingInbox) {
    [ordered]@{
        pending = $true
        message_id = $pendingInbox.event_id
        text = [string]$pendingInbox.payload.text
        source = [string]$pendingInbox.actor
        received_at = [string]$pendingInbox.created_at
        handled = $false
        handled_at = ''
        handled_by = ''
    }
}
elseif ($latestInbox) {
    [ordered]@{
        pending = $false
        message_id = [string]$latestInbox.event_id
        text = [string]$latestInbox.payload.text
        source = [string]$latestInbox.actor
        received_at = [string]$latestInbox.created_at
        handled = [bool]$latestInbox.handled
        handled_at = [string]$latestInbox.handled_at
        handled_by = [string]$latestInbox.handled_by
    }
}
else {
    [ordered]@{
        pending = $false
        message_id = ''
        text = ''
        source = ''
        received_at = ''
        handled = $false
        handled_at = ''
        handled_by = ''
    }
}

$responseStatus = 'idle'
$responseMessage = 'No active work is currently claimed.'
$currentAction = 'waiting for the next picked task'

if (@($activeClaims).Count -gt 0) {
    $responseStatus = 'working'
    $responseMessage = ('Active claim: {0}' -f $activeClaims[0].task)
    $currentAction = ('executing {0}' -f $activeClaims[0].task)
}
elseif ($pendingInbox) {
    $responseStatus = 'needs_input'
    $responseMessage = ('Pending input: {0}' -f [string]$pendingInbox.payload.text)
    $currentAction = 'awaiting inbox handling'
}
elseif (@($recentCompletions).Count -gt 0) {
    $responseStatus = 'done'
    $responseMessage = ('Recently completed: {0}' -f [string]$recentCompletions[0])
    $currentAction = 'ready for next task'
}
elseif ($latestOutbox) {
    $outboxPayloadStatus = ''
    $outboxPayloadMessage = 'Latest outbox event has no message.'
    if ($latestOutbox.payload) {
        if ((Test-ObjectProperty -Object $latestOutbox.payload -PropertyName 'status') -and $null -ne $latestOutbox.payload.status) {
            $outboxPayloadStatus = [string]$latestOutbox.payload.status
        }
        if ((Test-ObjectProperty -Object $latestOutbox.payload -PropertyName 'message') -and $null -ne $latestOutbox.payload.message -and -not [string]::IsNullOrWhiteSpace([string]$latestOutbox.payload.message)) {
            $outboxPayloadMessage = [string]$latestOutbox.payload.message
        }
    }

    switch ([string]$latestOutbox.event_type) {
        'blocked' { $responseStatus = 'blocked' }
        'needs_input' { $responseStatus = 'needs_input' }
        'status' { $responseStatus = if ($outboxPayloadStatus) { $outboxPayloadStatus } else { 'working' } }
        'completion' { $responseStatus = 'done' }
        'result' { $responseStatus = 'done' }
        default { $responseStatus = 'idle' }
    }
    $responseMessage = $outboxPayloadMessage
    $currentAction = if ($outboxPayloadStatus) { $outboxPayloadStatus } else { 'latest outbox result' }
}

$risks = @()
if ($hasMismatch) {
    $risks += ('State mismatch detected: {0}' -f ($mismatches -join ', '))
}
if (-not $queueFloorMet) {
    $risks += 'Ready queue is below the preferred floor of 3 tasks.'
}
if ($expectedBlockedCount -gt 0) {
    $risks += ('Blocked tasks present: {0}' -f $expectedBlockedCount)
}

$sessionId = if ($existingAgentState -and $existingAgentState.session -and $existingAgentState.session.session_id) {
    [string]$existingAgentState.session.session_id
} else {
    'loop_seed_20260315_01'
}

$agentId = if ($existingAgentState -and $existingAgentState.session -and $existingAgentState.session.agent_id) {
    [string]$existingAgentState.session.agent_id
} else {
    'codex'
}

$mode = if (@($activeClaims).Count -gt 0) { 'perform' } else { 'mixed' }
$taskStatus = if (@($activeClaims).Count -gt 0) { 'working' } else { $responseStatus }
$orchestratorActive = $false
if (
    $locks -and
    (Test-ObjectProperty -Object $locks -PropertyName 'orchestrator') -and
    $locks.orchestrator -and
    (Test-ObjectProperty -Object $locks.orchestrator -PropertyName 'agent_id') -and
    $locks.orchestrator.agent_id
) {
    $orchestratorActive = $true
}

$agentState = [ordered]@{
    session = [ordered]@{
        session_id = $sessionId
        project = $Project
        mode = $mode
        active_repo = $Root
        agent_id = $agentId
        task_id = if (@($activeClaims).Count -gt 0) { [string]$activeClaims[0].task } else { '' }
        task_status = $taskStatus
        orchestrator_active = $orchestratorActive
        compact_count = if ($existingAgentState -and $existingAgentState.session -and $existingAgentState.session.compact_count) { [int]$existingAgentState.session.compact_count } else { 0 }
        updated_at = $generatedAt
    }
    input = $inputBlock
    state = [ordered]@{
        summary = ('Queue {0}. {1} ready tasks, {2} active claims.' -f $boardHealth, $expectedReadyCount, $expectedActiveClaimCount)
        ready_count = $expectedReadyCount
        active_claim_count = $expectedActiveClaimCount
        board_health = $boardHealth
        top_priority = @($topPriority)
        queue_floor_met = $queueFloorMet
        stale_state_detected = $hasMismatch
        recent_completions = @($recentCompletions)
        risks = @($risks)
    }
    response = [ordered]@{
        status = $responseStatus
        message = $responseMessage
        current_action = $currentAction
        recommended_next = @($topPriority)
        completed = @($recentCompletions)
        blocked = @($blockedTasks | Select-Object -First 3 -ExpandProperty task_id)
        notes = @(
            'Reconciled from repo-backed request and claim truth first.',
            'Runtime JSON remains a summary surface, not queue authority.'
        )
        updated_files = @(
            'generated/agent-work/runtime/agent_state.json',
            'generated/agent-work/runtime/ready_tasks.json',
            'generated/agent-work/runtime/active_claims.json',
            'generated/agent-work/runtime/reconciliation_summary.json'
        )
    }
}

$readyEnvelope = [ordered]@{
    generated_at = $generatedAt
    source = [ordered]@{
        kind = 'repo_summary'
        path = $readyDir
    }
    staleness = [ordered]@{
        status = 'fresh'
        reason = $null
    }
    count = $expectedReadyCount
    items = @($readyTasks)
}

$activeEnvelope = [ordered]@{
    generated_at = $generatedAt
    source = [ordered]@{
        kind = 'repo_summary'
        path = $activeClaimsDir
    }
    staleness = [ordered]@{
        status = 'fresh'
        reason = $null
    }
    count = $expectedActiveClaimCount
    items = @($activeClaims)
}

$summary = [ordered]@{
    generated_at = $generatedAt
    source_latest_write_time = $sourceLatestWrite
    project = $Project
    staleness = [ordered]@{
        status = 'fresh'
        reason = $null
    }
    counts = [ordered]@{
        ready = $expectedReadyCount
        active_claims = $expectedActiveClaimCount
        blocked = $expectedBlockedCount
        done = $expectedDoneCount
    }
    board_health = $boardHealth
    queue_floor_met = $queueFloorMet
    mismatches = @($mismatches)
    input = [ordered]@{
        pending = $inputBlock.pending
        message_id = $inputBlock.message_id
        text = $inputBlock.text
    }
    response = [ordered]@{
        status = $responseStatus
        message = $responseMessage
    }
    top_priority = @($topPriority)
}

Write-JsonFile -PathText $readyTasksPath -Value $readyEnvelope
Write-JsonFile -PathText $activeClaimsPath -Value $activeEnvelope
Write-JsonFile -PathText $summaryPath -Value $summary
Write-JsonFile -PathText $agentStatePath -Value $agentState
