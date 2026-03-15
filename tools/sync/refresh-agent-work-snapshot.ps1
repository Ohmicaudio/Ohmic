param(
    [string]$Project = '',
    [string]$OutFile = 'B:\ohmic\generated\agent-work\idle-ready-work.json',
    [string]$Reason = 'manual',
    [switch]$Watch,
    [int]$DebounceMilliseconds = 1000
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = 'B:\ohmic'
$syncScript = Join-Path $root 'tools\sync\sync-agent-state.ps1'
$reconcileScript = Join-Path $root 'tools\sync\reconcile-agent-json-runtime.ps1'
$mapScript = Join-Path $root 'tools\sync\map-dashboard-status-cards.ps1'
$runtimeDir = Join-Path $root 'generated\agent-work\runtime'
$refreshStatusPath = Join-Path $runtimeDir 'refresh_status.json'
$watchRoots = @(
    (Join-Path $root 'agent-system\requests'),
    (Join-Path $root 'agent-system\jobs')
)

function Ensure-Directory {
    param([string]$PathText)

    if (-not (Test-Path $PathText)) {
        New-Item -ItemType Directory -Force -Path $PathText | Out-Null
    }
}

function Write-Utf8NoBomText {
    param(
        [string]$PathText,
        [string]$Text
    )

    $parent = Split-Path -Parent $PathText
    if ($parent) {
        Ensure-Directory -PathText $parent
    }

    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($PathText, $Text, $utf8NoBom)
}

function Write-JsonFile {
    param(
        [string]$PathText,
        [object]$Value
    )

    $json = $Value | ConvertTo-Json -Depth 8
    Write-Utf8NoBomText -PathText $PathText -Text $json
}

function Read-JsonFileOrDefault {
    param(
        [string]$PathText,
        [object]$Default
    )

    if (-not (Test-Path $PathText)) {
        return $Default
    }

    try {
        $raw = Get-Content -Raw -Path $PathText
        if ([string]::IsNullOrWhiteSpace($raw)) {
            return $Default
        }
        return $raw | ConvertFrom-Json
    }
    catch {
        return $Default
    }
}

function Get-LatestWriteTicks {
    param([string[]]$Roots)

    $latestTicks = 0L
    foreach ($rootPath in $Roots) {
        if (-not (Test-Path $rootPath)) {
            continue
        }

        $candidate = Get-ChildItem -Path $rootPath -Recurse -File -ErrorAction SilentlyContinue |
            Sort-Object LastWriteTimeUtc -Descending |
            Select-Object -First 1

        if ($candidate) {
            $ticks = $candidate.LastWriteTimeUtc.Ticks
            if ($ticks -gt $latestTicks) {
                $latestTicks = $ticks
            }
        }
    }

    return $latestTicks
}

function New-RefreshStatus {
    param(
        [string]$Status,
        [string]$TriggerReason,
        [string]$Mode,
        [string]$ErrorText,
        [string]$LastSuccessAt
    )

    $attemptAt = (Get-Date).ToUniversalTime().ToString('o')
    $successAt = $LastSuccessAt
    if ($Status -eq 'success') {
        $successAt = $attemptAt
    }

    return [ordered]@{
        updated_at = $attemptAt
        status = $Status
        mode = $Mode
        project = if ($Project) { $Project } else { 'all' }
        reason = $TriggerReason
        last_success_at = $successAt
        outputs = @(
            'generated/agent-work/current-state.json',
            'generated/agent-work/runtime/agent_state.json',
            'generated/agent-work/runtime/reconciliation_summary.json',
            'generated/agent-work/runtime/dashboard_status_cards.json'
        )
        error = if ($ErrorText) { $ErrorText } else { $null }
    }
}

function Invoke-RefreshPipeline {
    param(
        [string]$TriggerReason,
        [string]$Mode
    )

    Ensure-Directory -PathText $runtimeDir

    $existingStatus = Read-JsonFileOrDefault -PathText $refreshStatusPath -Default $null
    $lastSuccessAt = ''
    if ($existingStatus -and $existingStatus.last_success_at) {
        $lastSuccessAt = [string]$existingStatus.last_success_at
    }

    Write-JsonFile -PathText $refreshStatusPath -Value (New-RefreshStatus -Status 'running' -TriggerReason $TriggerReason -Mode $Mode -ErrorText '' -LastSuccessAt $lastSuccessAt)

    try {
        if (-not (Test-Path $syncScript)) {
            throw "Sync script not found: $syncScript"
        }

        $syncArgs = @{
            OutFile = $OutFile
        }
        if ($Project) {
            $syncArgs.Project = $Project
        }

        & $syncScript @syncArgs | Out-Null

        if (Test-Path $reconcileScript) {
            & $reconcileScript -Root $root -RuntimeDir $runtimeDir -Project 'ohmic' | Out-Null
            & $reconcileScript -Root $root -RuntimeDir $runtimeDir -Project 'ohmic' | Out-Null
        }

        if (Test-Path $mapScript) {
            & $mapScript -RuntimeDir $runtimeDir | Out-Null
        }

        Write-JsonFile -PathText $refreshStatusPath -Value (New-RefreshStatus -Status 'success' -TriggerReason $TriggerReason -Mode $Mode -ErrorText '' -LastSuccessAt $lastSuccessAt)
    }
    catch {
        $message = $_.Exception.Message
        Write-JsonFile -PathText $refreshStatusPath -Value (New-RefreshStatus -Status 'failed' -TriggerReason $TriggerReason -Mode $Mode -ErrorText $message -LastSuccessAt $lastSuccessAt)
        throw
    }
}

if (-not $Watch) {
    Invoke-RefreshPipeline -TriggerReason $Reason -Mode 'once'
    exit 0
}

$lastSeenTicks = Get-LatestWriteTicks -Roots $watchRoots
Invoke-RefreshPipeline -TriggerReason ("watch-bootstrap:{0}" -f $Reason) -Mode 'watch'

while ($true) {
    Start-Sleep -Milliseconds ([Math]::Max($DebounceMilliseconds, 250))
    $currentTicks = Get-LatestWriteTicks -Roots $watchRoots
    if ($currentTicks -le $lastSeenTicks) {
        continue
    }

    $lastSeenTicks = $currentTicks
    try {
        Invoke-RefreshPipeline -TriggerReason 'watch-change' -Mode 'watch'
    }
    catch {
        Write-Warning ("Auto refresh failed: {0}" -f $_.Exception.Message)
    }
}
