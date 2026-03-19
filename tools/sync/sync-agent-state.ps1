param(
    [string]$Project = '',
    [string]$OutRoot = 'B:\ohmic\generated\agent-work',
    [string]$OutFile = ''
)

$requestsRoot = 'B:\ohmic\agent-system\requests'
$jobsRoot = 'B:\ohmic\agent-system\jobs'
$transactionsRoot = 'B:\ohmic\agent-system\transactions'
$projectsRoot = 'B:\ohmic\agent-system\projects'
$pollScript = 'B:\ohmic\tools\sync\agent-work-poll.ps1'

New-Item -ItemType Directory -Force $OutRoot | Out-Null

function Ensure-Dir {
    param([string]$PathText)
    New-Item -ItemType Directory -Force $PathText | Out-Null
}

function Parse-FrontMatterLine {
    param(
        [string]$Line,
        [System.Collections.IDictionary]$Target,
        [string[]]$Keys
    )

    foreach ($key in $Keys) {
        if ($Line -match ('^{0}:\s*(.*)$' -f [regex]::Escape($key))) {
            $Target[$key] = $matches[1].Trim()
            return $true
        }
    }

    return $false
}

function Parse-Request {
    param([string]$FilePath)

    if (-not (Test-Path $FilePath)) {
        return $null
    }

    $keys = @('scope', 'authority', 'project', 'status', 'requested', 'requester', 'origin', 'priority', 'blocking', 'depends_on', 'handoff_from', 'claim_id', 'topic')
    $data = [ordered]@{
        id = [System.IO.Path]::GetFileNameWithoutExtension($FilePath)
        title = ''
        file_path = $FilePath
        scope = ''
        authority = ''
        project = ''
        status = ''
        requested = ''
        requester = ''
        origin = ''
        priority = ''
        blocking = ''
        depends_on = ''
        handoff_from = ''
        claim_id = ''
        topic = ''
    }

    try {
        foreach ($line in Get-Content $FilePath -ErrorAction Stop) {
            if (Parse-FrontMatterLine -Line $line -Target $data -Keys $keys) {
                continue
            }
            if (-not $data.title -and $line -match '^# (.+)$') {
                $data.title = $matches[1].Trim()
            }
        }
    }
    catch {
        return $null
    }

    [pscustomobject]$data
}

function Parse-Claim {
    param([string]$FilePath)

    $keys = @('claim_id', 'status', 'owner', 'project', 'task', 'started', 'expires')
    $data = [ordered]@{
        claim_id = ''
        status = ''
        owner = ''
        project = ''
        task = ''
        started = ''
        expires = ''
        completed = ''
        file_path = $FilePath
        paths = @()
    }

    $inFiles = $false
    foreach ($line in Get-Content $FilePath) {
        if (Parse-FrontMatterLine -Line $line -Target $data -Keys $keys) {
            continue
        }
        if ($line -eq '# Files') {
            $inFiles = $true
            continue
        }
        if ($line -match '^# ') {
            $inFiles = $false
        }
        if ($inFiles -and $line -match '^- (.+)$') {
            $data.paths += $matches[1].Trim()
        }
        if ($line -match '^completed:\s*(.+)$') { $data.completed = $matches[1].Trim(); continue }
    }

    if (-not $data.claim_id) {
        $data.claim_id = [System.IO.Path]::GetFileNameWithoutExtension($FilePath)
    }
    if (-not $data.status) {
        $data.status = 'active'
    }
    if (-not $data.project) {
        $data.project = 'org-wide'
    }

    [pscustomobject]$data
}

function Get-LatestWriteIso {
    param([string[]]$Roots)

    $latest = $null
    foreach ($root in $Roots) {
        if (-not (Test-Path $root)) {
            continue
        }
        $candidate = Get-ChildItem -Path $root -Recurse -File -ErrorAction SilentlyContinue |
            Sort-Object LastWriteTimeUtc -Descending |
            Select-Object -First 1
        if ($candidate -and (-not $latest -or $candidate.LastWriteTimeUtc -gt $latest.LastWriteTimeUtc)) {
            $latest = $candidate
        }
    }

    if ($latest) {
        return $latest.LastWriteTimeUtc.ToString('o')
    }

    return ''
}

function Parse-Transaction {
    param([string]$FilePath)

    $keys = @('id', 'thread_id', 'kind', 'status', 'project', 'created', 'author', 'relates_to', 'resolves', 'promoted_to')
    $data = [ordered]@{
        id = [System.IO.Path]::GetFileNameWithoutExtension($FilePath)
        thread_id = ''
        kind = ''
        status = ''
        project = ''
        created = ''
        author = ''
        relates_to = ''
        resolves = ''
        promoted_to = ''
        summary = ''
        file_path = $FilePath
    }

    foreach ($line in Get-Content $FilePath) {
        if (Parse-FrontMatterLine -Line $line -Target $data -Keys $keys) {
            continue
        }
        if (-not $data.summary -and $line -match '^# Summary$') {
            continue
        }
        if (-not $data.summary -and $line.Trim() -and $line -notmatch '^#') {
            $data.summary = $line.Trim()
            break
        }
    }

    [pscustomobject]$data
}

function Get-BulletsFromSection {
    param(
        [string]$FilePath,
        [string]$SectionHeader
    )

    if (-not (Test-Path $FilePath)) {
        return @()
    }

    $items = @()
    $inSection = $false
    foreach ($line in Get-Content $FilePath) {
        if ($line -eq $SectionHeader) {
            $inSection = $true
            continue
        }
        if ($inSection -and $line -match '^## ') {
            break
        }
        if ($inSection -and $line -match '^- (.+)$') {
            $items += $matches[1].Trim()
        }
    }

    return $items
}

function Get-ResolvedQuestionEntries {
    $filePath = Join-Path $requestsRoot 'resolved-questions.md'
    if (-not (Test-Path $filePath)) {
        return @()
    }

    $entries = @()
    $current = $null
    foreach ($line in Get-Content $filePath) {
        if ($line -match '^- asked:\s*(.+)$') {
            if ($current) {
                $entries += [pscustomobject]$current
            }
            $current = [ordered]@{
                asked = $matches[1].Trim()
                resolved = ''
                question = ''
                answer = ''
                promoted_to = ''
            }
            continue
        }

        if (-not $current) {
            continue
        }

        if ($line -match '^\s+resolved:\s*(.+)$') { $current.resolved = $matches[1].Trim(); continue }
        if ($line -match '^\s+question:\s*(.+)$') { $current.question = $matches[1].Trim(); continue }
        if ($line -match '^\s+answer:\s*(.+)$') { $current.answer = $matches[1].Trim(); continue }
        if ($line -match '^\s+promoted_to:\s*(.+)$') { $current.promoted_to = $matches[1].Trim(); continue }
    }

    if ($current) {
        $entries += [pscustomobject]$current
    }

    return $entries
}

function Matches-ProjectText {
    param(
        [string]$Text,
        [string]$ProjectName
    )

    if (-not $ProjectName) {
        return $true
    }
    if (-not $Text) {
        return $false
    }

    $textNorm = $Text.ToLowerInvariant()
    $projectNorm = [regex]::Escape($ProjectName.ToLowerInvariant())
    return [regex]::IsMatch($textNorm, "(^|[^a-z0-9])$projectNorm([^a-z0-9]|$)")
}

function Get-RepoSummaries {
    $repoCandidates = @(
        'B:\ohmic\repos\ohmic-audio-labs',
        'B:\ohmic\repos\ohmic-audio-static-content',
        'B:\ohmic\repos\amplab-firmware',
        'B:\ohmic\repos\cyd-remote'
    )

    $gitCommand = Resolve-GitCommand
    $items = @()
    foreach ($repo in $repoCandidates | Select-Object -Unique) {
        if (-not (Test-Path (Join-Path $repo '.git'))) {
            continue
        }

        $name = Split-Path -Leaf $repo
        $log = @()
        if ($gitCommand) {
            $log = @(& $gitCommand -C $repo log --date=short --pretty=format:"%h %ad %s" -n 3 2>$null)
        }
        $items += [pscustomobject]@{
            repo = $name
            path = $repo
            commits = @($log)
        }
    }

    return $items
}

function Resolve-GitCommand {
    $command = Get-Command git.exe -ErrorAction SilentlyContinue
    if ($command -and $command.Source) {
        return $command.Source
    }

    foreach ($candidate in @(
        'C:\Program Files\Git\cmd\git.exe',
        'C:\Program Files\Git\bin\git.exe',
        'C:\Users\d\AppData\Local\Programs\Git\cmd\git.exe',
        'C:\Users\d\AppData\Local\Programs\Git\bin\git.exe'
    )) {
        if (Test-Path $candidate) {
            return $candidate
        }
    }

    return $null
}

function Write-JsonFile {
    param(
        [string]$PathText,
        [object]$Value
    )

    $parent = Split-Path -Parent $PathText
    if ($parent) {
        Ensure-Dir $parent
    }
    $json = $Value | ConvertTo-Json -Depth 8
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($PathText, $json, $utf8NoBom)
}

function Write-TextFile {
    param(
        [string]$PathText,
        [string[]]$Lines
    )

    $parent = Split-Path -Parent $PathText
    if ($parent) {
        Ensure-Dir $parent
    }
    Set-Content -Path $PathText -Value $Lines -Encoding UTF8
}

$requestsByStatus = @{}
foreach ($status in @('inbox', 'ready', 'blocked', 'done')) {
    $dir = Join-Path $requestsRoot $status
    if (Test-Path $dir) {
        $requestsByStatus[$status] = @(
            Get-ChildItem -Path $dir -Filter '*.md' -File |
                ForEach-Object { Parse-Request $_.FullName } |
                Where-Object { $_ -ne $null }
        )
    }
    else {
        $requestsByStatus[$status] = @()
    }
}

$activeClaims = @()
$activeClaimsDir = Join-Path $jobsRoot 'active'
if (Test-Path $activeClaimsDir) {
    $activeClaims = @(
        Get-ChildItem -Path $activeClaimsDir -Filter '*.md' -File |
        ForEach-Object { Parse-Claim $_.FullName } |
        Where-Object { $_.status -eq 'active' }
    )
}

$transactionsByStatus = @{}
foreach ($status in @('active', 'resolved', 'archive')) {
    $dir = Join-Path $transactionsRoot $status
    if (Test-Path $dir) {
        $transactionsByStatus[$status] = @(Get-ChildItem -Path $dir -Filter '*.md' -File | ForEach-Object { Parse-Transaction $_.FullName })
    }
    else {
        $transactionsByStatus[$status] = @()
    }
}

$openQuestions = @(Get-BulletsFromSection -FilePath (Join-Path $requestsRoot 'open-questions.md') -SectionHeader '## Current Questions')
$resolvedQuestions = @(Get-ResolvedQuestionEntries)

$allProjects = @(
    $Project
    ($requestsByStatus.Values | ForEach-Object { @($_) | ForEach-Object { $_.project } })
    ($activeClaims | ForEach-Object { $_.project })
    ($transactionsByStatus.Values | ForEach-Object { @($_) | ForEach-Object { $_.project } })
) | Where-Object { $_ } | Sort-Object -Unique

if (-not $allProjects) {
    $allProjects = @('org-wide')
}

$generatedAt = (Get-Date).ToString('o')
$sourceLatestWriteTime = Get-LatestWriteIso -Roots @(
    'B:\ohmic\agent-system',
    'B:\ohmic\docs\systems',
    'B:\ohmic\docs\roadmap'
)

$globalState = [pscustomobject]@{
    timestamp = $generatedAt
    generated_at = $generatedAt
    source_latest_write_time = $sourceLatestWriteTime
    freshness = [pscustomobject]@{
        derived = $true
        stale_detection_required = $true
    }
    projects = $allProjects
    counts = [pscustomobject]@{
        inbox = @($requestsByStatus.inbox).Count
        ready = @($requestsByStatus.ready).Count
        blocked = @($requestsByStatus.blocked).Count
        done = @($requestsByStatus.done).Count
        active_claims = @($activeClaims).Count
        active_transactions = @($transactionsByStatus.active).Count
        resolved_transactions = @($transactionsByStatus.resolved).Count
    }
}

Write-JsonFile -PathText (Join-Path $OutRoot 'current-state.json') -Value $globalState
Write-JsonFile -PathText (Join-Path $OutRoot 'ready-requests.json') -Value @($requestsByStatus.ready)
Write-JsonFile -PathText (Join-Path $OutRoot 'active-claims.json') -Value @($activeClaims)
Write-JsonFile -PathText (Join-Path $OutRoot 'open-questions.json') -Value @($openQuestions)
Write-JsonFile -PathText (Join-Path $OutRoot 'active-transactions.json') -Value @($transactionsByStatus.active)

foreach ($projectName in $allProjects) {
    $projectDir = Join-Path (Join-Path $OutRoot 'projects') $projectName
    Ensure-Dir $projectDir

    $ready = @($requestsByStatus.ready | Where-Object { $_.project -eq $projectName })
    $blocked = @($requestsByStatus.blocked | Where-Object { $_.project -eq $projectName })
    $claims = @($activeClaims | Where-Object { $_.project -eq $projectName })
    $activeTransactions = @($transactionsByStatus.active | Where-Object { $_.project -eq $projectName })
    $projectQuestions = @($openQuestions | Where-Object { Matches-ProjectText -Text $_ -ProjectName $projectName })
    $recentResolved = @($resolvedQuestions | Select-Object -Last 3)

    $nextActions = @()
    if (@($claims).Count -gt 0) {
        $nextActions += 'Finish active claimed work before picking up unrelated tasks.'
    }
    if (@($ready).Count -gt 0) {
        $firstReady = $ready | Sort-Object priority, requested | Select-Object -First 1
        $nextActions += ('Highest ready request: {0}' -f $firstReady.id)
    }
    elseif (@($blocked).Count -gt 0) {
        $firstBlocked = $blocked | Select-Object -First 1
        $nextActions += ('Top blocked request to monitor: {0}' -f $firstBlocked.id)
    }
    elseif (@($projectQuestions).Count -gt 0) {
        $nextActions += 'Review open questions before starting unrelated work.'
    }
    else {
        $nextActions += 'No queued project work is ready right now.'
    }

    $currentState = [pscustomobject]@{
        timestamp = $generatedAt
        generated_at = $generatedAt
        source_latest_write_time = $sourceLatestWriteTime
        project = $projectName
        ready_requests = @($ready).Count
        blocked_requests = @($blocked).Count
        active_claims = @($claims).Count
        active_transactions = @($activeTransactions).Count
        open_questions = @($projectQuestions).Count
        likely_next_actions = @($nextActions)
    }

    Write-JsonFile -PathText (Join-Path $projectDir 'current-state.json') -Value $currentState
    Write-JsonFile -PathText (Join-Path $projectDir 'ready-requests.json') -Value @($ready)
    Write-JsonFile -PathText (Join-Path $projectDir 'active-claims.json') -Value @($claims)
    Write-JsonFile -PathText (Join-Path $projectDir 'open-questions.json') -Value @($projectQuestions)

    $lines = @(
        ('# Session Brief: {0}' -f $projectName),
        '',
        ('Generated: {0}' -f (Get-Date).ToString('s')),
        '',
        '## Current State',
        '',
        ('- ready requests: {0}' -f @($ready).Count),
        ('- blocked requests: {0}' -f @($blocked).Count),
        ('- active claims: {0}' -f @($claims).Count),
        ('- active transactions: {0}' -f @($activeTransactions).Count),
        ('- matching open questions: {0}' -f @($projectQuestions).Count),
        '',
        '## Active Work',
        ''
    )

    if (@($claims).Count -gt 0) {
        foreach ($claim in $claims) {
            $lines += ('- claim `{0}`: {1}' -f $claim.claim_id, $claim.task)
        }
    }
    else {
        $lines += '- no active claims'
    }

    $lines += @('', '## Blockers', '')
    if (@($blocked).Count -gt 0) {
        foreach ($request in $blocked) {
            $lines += ('- `{0}`: {1}' -f $request.id, $request.title)
        }
    }
    else {
        $lines += '- no blocked requests in this project'
    }

    $lines += @('', '## Open Questions', '')
    if (@($projectQuestions).Count -gt 0) {
        foreach ($question in $projectQuestions) {
            $lines += ('- {0}' -f $question)
        }
    }
    else {
        $lines += '- no matching project-tagged questions'
    }

    $lines += @('', '## Recent Resolved Questions', '')
    if (@($recentResolved).Count -gt 0) {
        foreach ($item in $recentResolved) {
            $lines += ('- {0}' -f $item.question)
            $lines += ('  answer: {0}' -f $item.answer)
        }
    }
    else {
        $lines += '- no resolved-question trace yet'
    }

    $lines += @('', '## Likely Next Actions', '')
    foreach ($action in $nextActions) {
        $lines += ('- {0}' -f $action)
    }

    Write-TextFile -PathText (Join-Path $projectDir 'session-brief.md') -Lines $lines
}

$recentLines = @(
    '# Recent Changes',
    '',
    ('Generated: {0}' -f (Get-Date).ToString('s')),
    '',
    '## Recent Commits',
    ''
)

$repoSummaries = @(Get-RepoSummaries)
if ($repoSummaries.Count -gt 0) {
    foreach ($repo in $repoSummaries) {
        $recentLines += ('- {0}' -f $repo.repo)
        if (@($repo.commits).Count -gt 0) {
            foreach ($commit in $repo.commits) {
                $recentLines += ('  {0}' -f $commit)
            }
        }
        else {
            $recentLines += '  no local commits found'
        }
    }
}
else {
    $recentLines += '- no tracked repos found'
}

$recentLines += @('', '## Recently Completed Requests', '')
$doneRequests = @($requestsByStatus.done | Sort-Object { (Get-Item $_.file_path).LastWriteTime } -Descending | Select-Object -First 5)
if ($doneRequests.Count -gt 0) {
    foreach ($request in $doneRequests) {
        $recentLines += ('- `{0}`: {1}' -f $request.id, $request.title)
    }
}
else {
    $recentLines += '- no completed requests'
}

$recentLines += @('', '## Newly Resolved Questions', '')
$recentResolvedQuestions = @($resolvedQuestions | Select-Object -Last 3)
if ($recentResolvedQuestions.Count -gt 0) {
    foreach ($item in $recentResolvedQuestions) {
        $recentLines += ('- {0}' -f $item.question)
    }
}
else {
    $recentLines += '- no resolved questions'
}

$recentLines += @('', '## Newly Blocked Items', '')
$blockedRequests = @($requestsByStatus.blocked | Sort-Object { (Get-Item $_.file_path).LastWriteTime } -Descending | Select-Object -First 5)
if ($blockedRequests.Count -gt 0) {
    foreach ($request in $blockedRequests) {
        $recentLines += ('- `{0}`: {1}' -f $request.id, $request.title)
    }
}
else {
    $recentLines += '- no blocked requests'
}

Write-TextFile -PathText (Join-Path $OutRoot 'recent-changes.md') -Lines $recentLines

if (Test-Path $pollScript) {
    $pollOutFile = if ($OutFile) { $OutFile } else { Join-Path $OutRoot 'idle-ready-work.json' }
    & $pollScript once -Json -OutFile $pollOutFile | Out-Null
}
