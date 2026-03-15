param(
    [Parameter(Mandatory = $true)]
    [string]$Text,
    [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime',
    [string]$Project = 'ohmic',
    [string]$Actor = 'ui',
    [string]$SessionId = ''
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. 'B:\ohmic\tools\sync\json-loop-helpers.ps1'

$trimmed = $Text.Trim()
if ([string]::IsNullOrWhiteSpace($trimmed)) {
    throw 'Command text must not be empty.'
}

$inboxPath = Join-Path $RuntimeDir 'agent_inbox.jsonl'
$agentStatePath = Join-Path $RuntimeDir 'agent_state.json'
$agentState = Read-JsonFileOrDefault -PathText $agentStatePath -Default $null

if (-not $SessionId) {
    if ($agentState -and $agentState.session -and $agentState.session.session_id) {
        $SessionId = [string]$agentState.session.session_id
    }
    else {
        $SessionId = 'loop_seed_20260315_01'
    }
}

$events = @(Read-JsonLines -PathText $inboxPath)
$duplicate = (
    $events |
    Where-Object {
        $_.handled -eq $false -and
        $_.event_type -eq 'instruction' -and
        [string]$_.payload.text -eq $trimmed
    } |
    Sort-Object created_at |
    Select-Object -First 1
)

if ($duplicate) {
    [pscustomobject]@{
        status = 'duplicate_pending'
        appended = $false
        event_id = [string]$duplicate.event_id
        message = 'An identical pending command already exists.'
    } | ConvertTo-Json -Depth 5
    exit 0
}

$createdAt = New-UtcTimestamp
$event = [ordered]@{
    event_id = New-LoopEventId
    created_at = $createdAt
    project = $Project
    session_id = $SessionId
    actor = $Actor
    event_type = 'instruction'
    payload = [ordered]@{
        text = $trimmed
    }
    handled = $false
    priority = 'normal'
    dedupe_key = ('instruction::{0}' -f $trimmed.ToLowerInvariant())
}

Append-JsonLine -PathText $inboxPath -Value $event

[pscustomobject]@{
    status = 'pending'
    appended = $true
    event_id = [string]$event.event_id
    message = 'Command appended to agent_inbox.jsonl.'
} | ConvertTo-Json -Depth 5
