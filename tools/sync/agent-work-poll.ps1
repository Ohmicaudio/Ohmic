param(
    [Parameter(Position = 0)]
    [ValidateSet('once', 'watch')]
    [string]$Command = 'once',

    [string]$Project = '',
    [int]$Top = 5,
    [int]$IntervalSeconds = 300,
    [switch]$Json,
    [string]$OutFile = ''
)

$requestsRoot = 'B:\ohmic\agent-system\requests'
$jobsRoot = 'B:\ohmic\agent-system\jobs'
$readyDir = Join-Path $requestsRoot 'ready'
$doneDir = Join-Path $requestsRoot 'done'
$activeClaimsDir = Join-Path $jobsRoot 'active'

function Write-Utf8NoBom {
    param(
        [string]$PathText,
        [string]$Content
    )

    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($PathText, $Content, $utf8NoBom)
}

function Normalize-Path {
    param([string]$PathText)

    if ([string]::IsNullOrWhiteSpace($PathText)) {
        return ''
    }

    try {
        return [System.IO.Path]::GetFullPath($PathText).TrimEnd('\').ToLowerInvariant()
    }
    catch {
        return $PathText.Trim().TrimEnd('\').ToLowerInvariant()
    }
}

function Paths-Overlap {
    param(
        [string]$Left,
        [string]$Right
    )

    $leftNorm = Normalize-Path $Left
    $rightNorm = Normalize-Path $Right

    if (-not $leftNorm -or -not $rightNorm) {
        return $false
    }

    return $leftNorm -eq $rightNorm -or
        $leftNorm.StartsWith($rightNorm + '\') -or
        $rightNorm.StartsWith($leftNorm + '\')
}

function Parse-Claim {
    param([string]$FilePath)

    $raw = Get-Content -Raw $FilePath
    $inFilesSection = $false

    $claim = [ordered]@{
        ClaimId = ''
        Status = ''
        Owner = ''
        Project = ''
        Task = ''
        Paths = @()
    }

    foreach ($line in ($raw -split "`r?`n")) {
        if ($line -match '^# Files$') {
            $inFilesSection = $true
            continue
        }
        if ($line -match '^# ') {
            $inFilesSection = $false
            continue
        }
        if ($line -match '^claim_id:\s*(.+)$') { $claim.ClaimId = $matches[1].Trim(); continue }
        if ($line -match '^status:\s*(.+)$') { $claim.Status = $matches[1].Trim(); continue }
        if ($line -match '^owner:\s*(.+)$') { $claim.Owner = $matches[1].Trim(); continue }
        if ($line -match '^project:\s*(.+)$') { $claim.Project = $matches[1].Trim(); continue }
        if ($line -match '^task:\s*(.+)$') { $claim.Task = $matches[1].Trim(); continue }
        if ($line -match '^Status:\s*(.+)$') { $claim.Status = $matches[1].Trim().ToLowerInvariant(); continue }
        if ($line -match '^Owner:\s*(.+)$') { $claim.Owner = $matches[1].Trim(); continue }
        if ($line -match '^Task:\s*(.+)$') { $claim.Task = $matches[1].Trim(); continue }
        if ($inFilesSection -and $line -match '^- (.+)$') { $claim.Paths += $matches[1].Trim() }
    }

    if (-not $claim.ClaimId) {
        $claim.ClaimId = [System.IO.Path]::GetFileNameWithoutExtension($FilePath)
    }
    if (-not $claim.Status) {
        $claim.Status = 'active'
    }
    if (-not $claim.Project) {
        $claim.Project = 'org-wide'
    }

    [pscustomobject]$claim
}

function Test-QueueMarkdownCandidate {
    param([System.IO.FileInfo]$FileInfo)

    if (-not $FileInfo) {
        return $false
    }

    if ($FileInfo.Name -eq '.gitkeep') {
        return $false
    }

    return $FileInfo.Name -ine 'README.md'
}

function Get-ActiveClaims {
    if (-not (Test-Path $activeClaimsDir)) {
        return @()
    }

    Get-ChildItem -Path $activeClaimsDir -Filter '*.md' -File |
        ForEach-Object { Parse-Claim $_.FullName } |
        Where-Object { $_.Status -eq 'active' }
}

function Parse-Request {
    param([string]$FilePath)

    $raw = Get-Content -Raw $FilePath
    $inSuggestedScope = $false

    $request = [ordered]@{
        FilePath = $FilePath
        Id = [System.IO.Path]::GetFileNameWithoutExtension($FilePath)
        Status = ''
        Project = ''
        Requested = ''
        Requester = ''
        Origin = ''
        Priority = ''
        Blocking = ''
        DependsOn = ''
        ClaimId = ''
        HandoffFrom = ''
        QueueEpoch = ''
        ReviewAfter = ''
        ReviewStatus = ''
        Supersedes = ''
        Title = ''
        SuggestedClaimScope = @()
    }

    foreach ($line in ($raw -split "`r?`n")) {
        if ($line -match '^## Suggested Claim Scope$') {
            $inSuggestedScope = $true
            continue
        }
        if ($line -match '^## ') {
            $inSuggestedScope = $false
        }

        if ($line -match '^status:\s*(.+)$') { $request.Status = $matches[1].Trim(); continue }
        if ($line -match '^project:\s*(.+)$') { $request.Project = $matches[1].Trim(); continue }
        if ($line -match '^requested:\s*(.+)$') { $request.Requested = $matches[1].Trim(); continue }
        if ($line -match '^requester:\s*(.+)$') { $request.Requester = $matches[1].Trim(); continue }
        if ($line -match '^origin:\s*(.+)$') { $request.Origin = $matches[1].Trim(); continue }
        if ($line -match '^priority:\s*(.+)$') { $request.Priority = $matches[1].Trim(); continue }
        if ($line -match '^blocking:\s*(.+)$') { $request.Blocking = $matches[1].Trim(); continue }
        if ($line -match '^depends_on:\s*(.*)$') { $request.DependsOn = $matches[1].Trim(); continue }
        if ($line -match '^claim_id:\s*(.*)$') { $request.ClaimId = $matches[1].Trim(); continue }
        if ($line -match '^handoff_from:\s*(.*)$') { $request.HandoffFrom = $matches[1].Trim(); continue }
        if ($line -match '^queue_epoch:\s*(.*)$') { $request.QueueEpoch = $matches[1].Trim(); continue }
        if ($line -match '^review_after:\s*(.*)$') { $request.ReviewAfter = $matches[1].Trim(); continue }
        if ($line -match '^review_status:\s*(.*)$') { $request.ReviewStatus = $matches[1].Trim(); continue }
        if ($line -match '^supersedes:\s*(.*)$') { $request.Supersedes = $matches[1].Trim(); continue }
        if ($line -match '^# (.+)$') { $request.Title = $matches[1].Trim(); continue }
        if ($inSuggestedScope -and $line -match '^- (.+)$') { $request.SuggestedClaimScope += $matches[1].Trim() }
    }

    [pscustomobject]$request
}

function Get-DoneRequestIds {
    if (-not (Test-Path $doneDir)) {
        return @()
    }

    Get-ChildItem -Path $doneDir -Filter '*.md' -File | ForEach-Object { $_.BaseName }
}

function Get-PriorityRank {
    param([string]$Priority)

    switch ($Priority) {
        'now' { return 0 }
        'soon' { return 1 }
        'later' { return 2 }
        default { return 9 }
    }
}

function Test-RequestEligible {
    param(
        [pscustomobject]$Request,
        [pscustomobject[]]$ActiveClaims,
        [string[]]$DoneRequestIds
    )

    $reasons = @()

    if ($Request.Status -ne 'ready') {
        $reasons += 'not-ready'
    }

    if ($Project -and $Request.Project -ne $Project) {
        $reasons += 'project-mismatch'
    }

    if ($Request.DependsOn) {
        if ($DoneRequestIds -notcontains $Request.DependsOn) {
            $reasons += 'dependency-open'
        }
    }

    if ($Request.ReviewStatus -and $Request.ReviewStatus -ne 'current') {
        $reasons += "review-status:$($Request.ReviewStatus)"
    }

    if ($Request.ClaimId) {
        if ($ActiveClaims.ClaimId -contains $Request.ClaimId) {
            $reasons += 'claim-active'
        }
    }

    if ($Request.SuggestedClaimScope.Count -gt 0) {
        foreach ($claim in $ActiveClaims) {
            foreach ($claimedPath in $claim.Paths) {
                foreach ($targetPath in $Request.SuggestedClaimScope) {
                    if (Paths-Overlap -Left $claimedPath -Right $targetPath) {
                        $reasons += "scope-conflict:$($claim.ClaimId)"
                        break
                    }
                }
                if ($reasons | Where-Object { $_ -like 'scope-conflict:*' }) { break }
            }
            if ($reasons | Where-Object { $_ -like 'scope-conflict:*' }) { break }
        }
    }

    [pscustomobject]@{
        Eligible = ($reasons.Count -eq 0)
        Reasons = $reasons
    }
}

function Get-ReadyWork {
    $activeClaims = Get-ActiveClaims
    $doneRequestIds = Get-DoneRequestIds

    if (-not (Test-Path $readyDir)) {
        return @()
    }

    $items = Get-ChildItem -Path $readyDir -Filter '*.md' -File |
        Where-Object { Test-QueueMarkdownCandidate -FileInfo $_ } |
        ForEach-Object {
        $request = Parse-Request $_.FullName
        $result = Test-RequestEligible -Request $request -ActiveClaims $activeClaims -DoneRequestIds $doneRequestIds

        [pscustomobject]@{
            Id = $request.Id
            Project = $request.Project
            Priority = $request.Priority
            Requested = $request.Requested
            Title = $request.Title
            Eligible = $result.Eligible
            Reasons = ($result.Reasons -join ', ')
            ReviewStatus = $request.ReviewStatus
            QueueEpoch = $request.QueueEpoch
            SuggestedClaimScope = ($request.SuggestedClaimScope -join '; ')
            ClaimId = $request.ClaimId
            FilePath = $request.FilePath
        }
    }

    $items |
        Sort-Object @{Expression = { Get-PriorityRank $_.Priority }; Ascending = $true },
                    @{Expression = 'Requested'; Ascending = $true },
                    @{Expression = 'Id'; Ascending = $true }
}

function Emit-Work {
    $items = @(Get-ReadyWork)
    $topItems = @($items | Select-Object -First $Top)
    $outputText = ''

    if (-not $topItems) {
        if ($Json) {
            $outputText = ([pscustomobject]@{
                timestamp = (Get-Date).ToString('o')
                ready_count = 0
                items = @()
            } | ConvertTo-Json -Depth 5)
        }
        else {
            $outputText = 'No ready work found.'
        }
        if ($OutFile) {
            $parent = Split-Path -Parent $OutFile
            if ($parent) {
                New-Item -ItemType Directory -Force $parent | Out-Null
            }
            Write-Utf8NoBom -PathText $OutFile -Content $outputText
        }
        Write-Output $outputText
        return
    }

    if ($Json) {
        $outputText = ([pscustomobject]@{
            timestamp = (Get-Date).ToString('o')
            ready_count = @($items).Count
            items = @($topItems)
        } | ConvertTo-Json -Depth 5)
        if ($OutFile) {
            $parent = Split-Path -Parent $OutFile
            if ($parent) {
                New-Item -ItemType Directory -Force $parent | Out-Null
            }
            Write-Utf8NoBom -PathText $OutFile -Content $outputText
        }
        Write-Output $outputText
        return
    }

    $lines = @()
    $eligible = @($topItems | Where-Object { $_.Eligible })
    if ($eligible.Count -gt 0) {
        $lines += 'Eligible ready work:'
    }
    else {
        $lines += 'Ready requests exist, but none are currently eligible:'
    }

    $lines += (
        ($topItems |
            Select-Object Id, Project, Priority, ReviewStatus, Eligible, Reasons, Title, SuggestedClaimScope |
            Format-Table -AutoSize |
            Out-String).TrimEnd()
    )

    $outputText = ($lines -join "`r`n")
    if ($OutFile) {
        $parent = Split-Path -Parent $OutFile
        if ($parent) {
            New-Item -ItemType Directory -Force $parent | Out-Null
        }
        Write-Utf8NoBom -PathText $OutFile -Content $outputText
    }
    Write-Output $outputText
}

switch ($Command) {
    'once' {
        Emit-Work
        exit 0
    }

    'watch' {
        $lastSignature = ''
        while ($true) {
            $current = @(Get-ReadyWork | Select-Object -First $Top)
            $signature = ($current | ConvertTo-Json -Depth 5)
            if ($signature -ne $lastSignature) {
                Write-Output ''
                Write-Output ('[{0}] idle-work snapshot' -f (Get-Date).ToString('s'))
                Emit-Work
                $lastSignature = $signature
            }

            Start-Sleep -Seconds $IntervalSeconds
        }
    }
}
