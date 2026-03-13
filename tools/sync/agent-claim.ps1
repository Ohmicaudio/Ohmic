param(
    [Parameter(Position = 0)]
    [ValidateSet('status', 'claim', 'complete')]
    [string]$Command = 'status',

    [string]$Id,
    [string]$Owner = $env:USERNAME,
    [string]$Project = 'org-wide',
    [string]$Task = '',
    [string[]]$Paths = @(),
    [int]$Hours = 4
)

$jobsRoot = 'B:\ohmic\agent-system\jobs'
$activeDir = Join-Path $jobsRoot 'active'
$completedDir = Join-Path $jobsRoot 'completed'

New-Item -ItemType Directory -Force $activeDir | Out-Null
New-Item -ItemType Directory -Force $completedDir | Out-Null

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

function Read-Claim {
    param([string]$FilePath)

    $raw = Get-Content -Raw $FilePath
    $inFilesSection = $false

    $claim = [ordered]@{
        FilePath = $FilePath
        ClaimId = ''
        Status = ''
        Owner = ''
        Project = ''
        Task = ''
        Started = ''
        Expires = ''
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
        if ($line -match '^started:\s*(.+)$') { $claim.Started = $matches[1].Trim(); continue }
        if ($line -match '^expires:\s*(.+)$') { $claim.Expires = $matches[1].Trim(); continue }
        if ($inFilesSection -and $line -match '^- (.+)$') { $claim.Paths += $matches[1].Trim() }
    }

    [pscustomobject]$claim
}

function Get-ActiveClaims {
    Get-ChildItem -Path $activeDir -Filter '*.md' -File | ForEach-Object { Read-Claim -FilePath $_.FullName }
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

function Find-Conflicts {
    param([string[]]$TargetPaths)

    $claims = Get-ActiveClaims
    $conflicts = @()

    foreach ($claim in $claims) {
        foreach ($claimedPath in $claim.Paths) {
            foreach ($targetPath in $TargetPaths) {
                if (Paths-Overlap -Left $claimedPath -Right $targetPath) {
                    $conflicts += $claim
                    break
                }
            }
            if ($conflicts -contains $claim) { break }
        }
    }

    $conflicts | Sort-Object ClaimId -Unique
}

switch ($Command) {
    'status' {
        if ($Paths.Count -gt 0) {
            $conflicts = Find-Conflicts -TargetPaths $Paths
            if (-not $conflicts) {
                Write-Output 'No active claim conflicts found.'
                exit 0
            }

            $conflicts | ForEach-Object {
                [pscustomobject]@{
                    claim_id = $_.ClaimId
                    owner = $_.Owner
                    project = $_.Project
                    task = $_.Task
                    expires = $_.Expires
                    paths = ($_.Paths -join '; ')
                }
            } | Format-Table -AutoSize
            exit 0
        }

        $claims = Get-ActiveClaims
        if (-not $claims) {
            Write-Output 'No active claims.'
            exit 0
        }

        $claims | ForEach-Object {
            [pscustomobject]@{
                claim_id = $_.ClaimId
                owner = $_.Owner
                project = $_.Project
                task = $_.Task
                expires = $_.Expires
                paths = ($_.Paths -join '; ')
            }
        } | Format-Table -AutoSize
        exit 0
    }

    'claim' {
        if (-not $Task) {
            throw 'Task is required for claim.'
        }
        if ($Paths.Count -eq 0) {
            throw 'At least one path is required for claim.'
        }

        $conflicts = Find-Conflicts -TargetPaths $Paths
        if ($conflicts) {
            Write-Error 'Active claim conflict detected. Resolve before editing.'
            $conflicts | ForEach-Object {
                [pscustomobject]@{
                    claim_id = $_.ClaimId
                    owner = $_.Owner
                    project = $_.Project
                    task = $_.Task
                    expires = $_.Expires
                    paths = ($_.Paths -join '; ')
                }
            } | Format-Table -AutoSize
            exit 1
        }

        $started = [DateTime]::UtcNow
        $expires = $started.AddHours($Hours)
        $claimId = '{0}-{1}' -f $started.ToString('yyyyMMddTHHmmssZ'), ([Guid]::NewGuid().ToString('N').Substring(0, 8))
        $filePath = Join-Path $activeDir ($claimId + '.md')

        $lines = @(
            "claim_id: $claimId"
            'status: active'
            "owner: $Owner"
            "project: $Project"
            "task: $Task"
            "started: $($started.ToString('o'))"
            "expires: $($expires.ToString('o'))"
            ''
            '# Files'
            ''
        )

        foreach ($path in $Paths) {
            $lines += "- $path"
        }

        $lines += @(
            ''
            '# Notes'
            ''
            "- created by agent-claim.ps1"
        )

        Set-Content -Path $filePath -Value $lines -Encoding UTF8
        Write-Output "Created claim $claimId"
        Write-Output $filePath
        exit 0
    }

    'complete' {
        if (-not $Id) {
            throw 'Id is required for complete.'
        }

        $source = Join-Path $activeDir ($Id + '.md')
        if (-not (Test-Path $source)) {
            throw "Active claim not found: $Id"
        }

        $raw = Get-Content -Raw $source
        $raw = $raw -replace '(?m)^status:\s*active$', 'status: completed'
        $raw += "`r`n`r`n# Completion`r`n`r`n- completed: $([DateTime]::UtcNow.ToString('o'))`r`n"

        $dest = Join-Path $completedDir ($Id + '.md')
        Set-Content -Path $dest -Value $raw -Encoding UTF8
        Remove-Item $source -Force

        Write-Output "Completed claim $Id"
        Write-Output $dest
        exit 0
    }
}
