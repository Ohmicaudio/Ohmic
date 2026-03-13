param(
    [string]$Project = '',
    [string]$OutFile = 'B:\ohmic\generated\agent-work\idle-ready-work.json'
)

$syncScript = 'B:\ohmic\tools\sync\sync-agent-state.ps1'
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
