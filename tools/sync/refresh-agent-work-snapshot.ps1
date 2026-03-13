param(
    [string]$Project = '',
    [string]$OutFile = 'B:\ohmic\generated\agent-work\idle-ready-work.json'
)

$pollScript = 'B:\ohmic\tools\sync\agent-work-poll.ps1'
if (-not (Test-Path $pollScript)) {
    throw "Poll script not found: $pollScript"
}

$pollArgs = @{
    Command = 'once'
    Json = $true
    OutFile = $OutFile
}

if ($Project) {
    $pollArgs.Project = $Project
}

& $pollScript @pollArgs | Out-Null
