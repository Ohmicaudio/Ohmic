param(
    [switch]$Json
)

$root = 'B:\ohmic'
$jobsActive = Join-Path $root 'agent-system\jobs\active'
$requestsRoot = Join-Path $root 'agent-system\requests'
$memoryRoot = Join-Path $root 'agent-system\memory'
$generatedRoot = Join-Path $root 'generated\agent-work'
$currentStatePath = Join-Path $generatedRoot 'current-state.json'
$activeClaimsPath = Join-Path $generatedRoot 'active-claims.json'

function Read-ClaimShape {
    param([string]$FilePath)

    $raw = Get-Content -Raw $FilePath
    $hasYamlClaimId = $raw -match '(?m)^claim_id:\s*.+$'
    $hasYamlStatus = $raw -match '(?m)^status:\s*.+$'
    $hasLegacyStatus = $raw -match '(?m)^Status:\s*.+$'
    $hasFiles = $raw -match '(?m)^# Files\r?$'
    $hasTask = $raw -match '(?m)^(task:|Task:)\s*.+$'

    $format =
        if ($hasYamlClaimId -or $hasYamlStatus) { 'yaml' }
        elseif ($hasLegacyStatus) { 'legacy' }
        else { 'unknown' }

    [pscustomobject]@{
        file = $FilePath
        id = [System.IO.Path]::GetFileNameWithoutExtension($FilePath)
        format = $format
        has_files = $hasFiles
        has_task = $hasTask
        is_valid_live_claim = ($format -eq 'yaml' -and $hasFiles -and $hasTask)
    }
}

function Test-QueueMarkdownCandidate {
    param([System.IO.FileInfo]$FileInfo)

    if (-not $FileInfo) {
        return $false
    }

    if ($FileInfo.Name -in @('.gitkeep', 'open-questions.md', 'resolved-questions.md')) {
        return $false
    }

    return $FileInfo.Name -ine 'README.md'
}

function Get-LatestWriteUtc {
    param([string[]]$Roots)

    $latest = $null
    foreach ($rootPath in $Roots) {
        if (-not (Test-Path $rootPath)) { continue }
        $candidate = Get-ChildItem -Path $rootPath -Recurse -File -ErrorAction SilentlyContinue |
            Sort-Object LastWriteTimeUtc -Descending |
            Select-Object -First 1
        if ($candidate -and (-not $latest -or $candidate.LastWriteTimeUtc -gt $latest.LastWriteTimeUtc)) {
            $latest = $candidate
        }
    }

    return $latest
}

function Read-FrontmatterValue {
    param(
        [string[]]$Lines,
        [string]$Key
    )

    foreach ($line in $Lines) {
        if ($line -match "^(?i)$([regex]::Escape($Key)):\s*(.+)$") {
            return $matches[1].Trim()
        }
        if ($line -eq '') {
            break
        }
    }

    return ''
}

function Test-RequestMetadata {
    param([string]$FilePath)

    $lines = Get-Content $FilePath
    $required = @('project', 'status', 'requested', 'requester', 'origin', 'priority', 'blocking', 'depends_on')
    $missing = @()
    foreach ($key in $required) {
        if (-not (Read-FrontmatterValue -Lines $lines -Key $key)) {
            $missing += $key
        }
    }

    [pscustomobject]@{
        file = $FilePath
        missing = @($missing)
        valid = (@($missing).Count -eq 0)
    }
}

function Test-MemoryHeader {
    param([string]$FilePath)

    $lines = Get-Content $FilePath
    $required = @('scope', 'horizon', 'authority', 'project', 'topic', 'updated')
    $missing = @()
    foreach ($key in $required) {
        if (-not (Read-FrontmatterValue -Lines $lines -Key $key)) {
            $missing += $key
        }
    }

    [pscustomobject]@{
        file = $FilePath
        missing = @($missing)
        valid = (@($missing).Count -eq 0)
    }
}

$claimFindings = @()
if (Test-Path $jobsActive) {
    $claimFindings = @(Get-ChildItem -Path $jobsActive -Filter '*.md' -File | ForEach-Object {
        Read-ClaimShape $_.FullName
    })
}

$issues = @()
foreach ($claim in $claimFindings) {
    if (-not $claim.is_valid_live_claim) {
        $issues += [pscustomobject]@{
            type = 'claim-schema'
            severity = 'error'
            file = $claim.file
            detail = "active claim is not in the canonical YAML claim schema (`$($claim.format)`)."
        }
    }
}

$requestFindings = @()
if (Test-Path $requestsRoot) {
    $requestFindings = @(Get-ChildItem -Path $requestsRoot -Recurse -Filter '*.md' -File |
        Where-Object { Test-QueueMarkdownCandidate -FileInfo $_ } |
        ForEach-Object { Test-RequestMetadata -FilePath $_.FullName })
}

foreach ($request in $requestFindings) {
    if (-not $request.valid) {
        $issues += [pscustomobject]@{
            type = 'request-metadata'
            severity = 'error'
            file = $request.file
            detail = "request is missing required metadata: $($request.missing -join ', ')."
        }
    }
}

$memoryFindings = @()
if (Test-Path $memoryRoot) {
    $memoryFindings = @(Get-ChildItem -Path $memoryRoot -Filter '*.md' -File |
        Where-Object { $_.Name -ine 'README.md' } |
        ForEach-Object { Test-MemoryHeader -FilePath $_.FullName })
}

foreach ($memory in $memoryFindings) {
    if (-not $memory.valid) {
        $issues += [pscustomobject]@{
            type = 'memory-header'
            severity = 'error'
            file = $memory.file
            detail = "memory file is missing required header fields: $($memory.missing -join ', ')."
        }
    }
}

$latestSource = Get-LatestWriteUtc -Roots @(
    (Join-Path $root 'agent-system'),
    (Join-Path $root 'docs\systems'),
    (Join-Path $root 'docs\roadmap')
)

$snapshotStale = $false
$snapshotTimestamp = $null
if (Test-Path $currentStatePath) {
    try {
        $snapshot = Get-Content -Raw $currentStatePath | ConvertFrom-Json
        if ($snapshot.generated_at) {
            $snapshotTimestamp = [DateTime]::Parse($snapshot.generated_at).ToUniversalTime()
        }
        elseif ($snapshot.timestamp) {
            $snapshotTimestamp = [DateTime]::Parse($snapshot.timestamp).ToUniversalTime()
        }
    }
    catch {
        $issues += [pscustomobject]@{
            type = 'snapshot-parse'
            severity = 'error'
            file = $currentStatePath
            detail = 'generated current-state.json could not be parsed.'
        }
    }
}

if ($latestSource -and $snapshotTimestamp -and $latestSource.LastWriteTimeUtc -gt $snapshotTimestamp) {
    $snapshotStale = $true
    $issues += [pscustomobject]@{
        type = 'snapshot-stale'
        severity = 'error'
        file = $currentStatePath
        detail = "generated agent-work snapshot is older than the latest source change (`$($latestSource.FullName)`)."
    }
}

if (Test-Path $activeClaimsPath) {
    try {
        $activeClaims = @(Get-Content -Raw $activeClaimsPath | ConvertFrom-Json)
        $liveActiveCount = @($claimFindings | Where-Object { $_.is_valid_live_claim }).Count
        if (@($activeClaims).Count -ne $liveActiveCount) {
            $issues += [pscustomobject]@{
                type = 'active-claims-mismatch'
                severity = 'error'
                file = $activeClaimsPath
                detail = "generated active-claims count ($(@($activeClaims).Count)) does not match live valid active claims ($liveActiveCount)."
            }
        }
    }
    catch {
        $issues += [pscustomobject]@{
            type = 'active-claims-parse'
            severity = 'error'
            file = $activeClaimsPath
            detail = 'generated active-claims.json could not be parsed.'
        }
    }
}

$result = [pscustomobject]@{
    timestamp = (Get-Date).ToString('o')
    active_claim_files = @($claimFindings).Count
    valid_live_claims = @($claimFindings | Where-Object { $_.is_valid_live_claim }).Count
    checked_request_files = @($requestFindings).Count
    checked_memory_files = @($memoryFindings).Count
    snapshot_stale = $snapshotStale
    issues = @($issues)
}

if ($Json) {
    $result | ConvertTo-Json -Depth 6
    exit 0
}

if (@($issues).Count -eq 0) {
    Write-Output 'Shared agent system validation passed.'
    exit 0
}

$issues | Format-Table -AutoSize
exit 1
