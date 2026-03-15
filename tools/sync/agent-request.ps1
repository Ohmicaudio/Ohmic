param(
    [Parameter(Position = 0)]
    [ValidateSet('list', 'create', 'move')]
    [string]$Command = 'list',

    [string]$Id,
    [ValidateSet('inbox', 'blocked', 'ready', 'done')]
    [string]$Status = 'inbox',
    [string]$Project = 'org-wide',
    [string]$Title = '',
    [string]$Requester = 'user',
    [ValidateSet('user', 'agent', 'dependency')]
    [string]$Origin = 'agent',
    [ValidateSet('now', 'soon', 'later')]
    [string]$Priority = 'soon',
    [ValidateSet('yes', 'no')]
    [string]$Blocking = 'no',
    [string]$DependsOn = '',
    [string]$HandoffFrom = '',
    [string]$ClaimId = ''
)

$requestsRoot = 'B:\ohmic\agent-system\requests'
$validStates = @('inbox', 'blocked', 'ready', 'done')
$refreshScript = 'B:\ohmic\tools\sync\refresh-agent-work-snapshot.ps1'

foreach ($state in $validStates) {
    New-Item -ItemType Directory -Force (Join-Path $requestsRoot $state) | Out-Null
}

function Refresh-WorkSnapshot {
    param([string]$TriggerReason = 'request-mutation')

    if (Test-Path $refreshScript) {
        & $refreshScript -Project $Project -Reason $TriggerReason | Out-Null
    }
}

function Slugify {
    param([string]$Text)

    $slug = $Text.ToLowerInvariant() -replace '[^a-z0-9]+', '-' -replace '^-+', '' -replace '-+$', ''
    if ([string]::IsNullOrWhiteSpace($slug)) {
        return 'task'
    }
    return $slug
}

function Get-RequestFiles {
    Get-ChildItem -Path $requestsRoot -Recurse -Filter '*.md' -File | Where-Object {
        $_.DirectoryName -match '\\(inbox|blocked|ready|done)$'
    }
}

function Parse-Request {
    param([string]$FilePath)

    $raw = Get-Content -Raw $FilePath
    $data = [ordered]@{
        FilePath = $FilePath
        Id = [System.IO.Path]::GetFileNameWithoutExtension($FilePath)
        Status = ''
        Project = ''
        Requester = ''
        Origin = ''
        Priority = ''
        Blocking = ''
        DependsOn = ''
        ClaimId = ''
        Title = ''
    }

    foreach ($line in ($raw -split "`r?`n")) {
        if ($line -match '^status:\s*(.+)$') { $data.Status = $matches[1].Trim(); continue }
        if ($line -match '^project:\s*(.+)$') { $data.Project = $matches[1].Trim(); continue }
        if ($line -match '^requester:\s*(.+)$') { $data.Requester = $matches[1].Trim(); continue }
        if ($line -match '^origin:\s*(.+)$') { $data.Origin = $matches[1].Trim(); continue }
        if ($line -match '^priority:\s*(.+)$') { $data.Priority = $matches[1].Trim(); continue }
        if ($line -match '^blocking:\s*(.+)$') { $data.Blocking = $matches[1].Trim(); continue }
        if ($line -match '^depends_on:\s*(.*)$') { $data.DependsOn = $matches[1].Trim(); continue }
        if ($line -match '^claim_id:\s*(.*)$') { $data.ClaimId = $matches[1].Trim(); continue }
        if ($line -match '^# (.+)$') { $data.Title = $matches[1].Trim(); break }
    }

    [pscustomobject]$data
}

switch ($Command) {
    'list' {
        $items = Get-RequestFiles | ForEach-Object { Parse-Request $_.FullName }
        if (-not $items) {
            Write-Output 'No requests found.'
            exit 0
        }

        $items |
            Sort-Object @{Expression = 'Status'; Ascending = $true}, @{Expression = 'Priority'; Ascending = $true}, @{Expression = 'Id'; Ascending = $true} |
            Select-Object Id, Status, Project, Priority, Blocking, Origin, Title |
            Format-Table -AutoSize
        exit 0
    }

    'create' {
        if (-not $Title) {
            throw 'Title is required for create.'
        }

        $datePrefix = (Get-Date).ToString('yyyy-MM-dd')
        $slug = Slugify $Title
        $fileName = "$datePrefix-$slug.md"
        $targetDir = Join-Path $requestsRoot $Status
        $filePath = Join-Path $targetDir $fileName
        $counter = 2
        while (Test-Path $filePath) {
            $fileName = "$datePrefix-$slug-$counter.md"
            $filePath = Join-Path $targetDir $fileName
            $counter++
        }

        $lines = @(
            'scope: project'
            'authority: working'
            "project: $Project"
            "status: $Status"
            "requested: $datePrefix"
            "requester: $Requester"
            "origin: $Origin"
            "priority: $Priority"
            "blocking: $Blocking"
            "depends_on: $DependsOn"
            "handoff_from: $HandoffFrom"
            "claim_id: $ClaimId"
            'topic: requested-task'
            ''
            "# $Title"
            ''
            '## Requested Outcome'
            ''
            '- define the desired end state'
            ''
            '## Scope'
            ''
            '- define the expected files, folders, or surfaces'
            ''
            '## Constraints'
            ''
            '- add important limits or preferences'
            ''
            '## Notes'
            ''
            '- add context that lets another agent start without rereading the whole thread'
            ''
            '## Ready When'
            ''
            '- state what must be true before this should move to `ready/`'
            ''
            '## Suggested Claim Scope'
            ''
            '- define which files, folders, or surfaces should be claimed once work begins'
        )

        Set-Content -Path $filePath -Value $lines -Encoding UTF8
        Refresh-WorkSnapshot -TriggerReason ('request-create:{0}' -f $Status)
        Write-Output $filePath
        exit 0
    }

    'move' {
        if (-not $Id) {
            throw 'Id is required for move.'
        }

        $source = Get-RequestFiles | Where-Object { $_.BaseName -eq $Id } | Select-Object -First 1
        if (-not $source) {
            throw "Request not found: $Id"
        }

        $dest = Join-Path (Join-Path $requestsRoot $Status) $source.Name
        $raw = Get-Content -Raw $source.FullName
        $raw = $raw -replace '(?m)^status:\s*.+$', "status: $Status"
        Set-Content -Path $dest -Value $raw -Encoding UTF8
        Remove-Item $source.FullName -Force
        Refresh-WorkSnapshot -TriggerReason ('request-move:{0}:{1}' -f $Id, $Status)
        Write-Output $dest
        exit 0
    }
}
