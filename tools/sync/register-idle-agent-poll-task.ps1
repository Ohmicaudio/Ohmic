param(
    [string]$TaskName = 'Ohmic Idle Work Poll',
    [int]$IntervalMinutes = 15,
    [string]$Project = '',
    [string]$OutFile = 'B:\ohmic\generated\agent-work\idle-ready-work.json'
)

if ($IntervalMinutes -lt 5) {
    throw 'IntervalMinutes must be at least 5.'
}

$pollScript = 'B:\ohmic\tools\sync\agent-work-poll.ps1'
if (-not (Test-Path $pollScript)) {
    throw "Poll script not found: $pollScript"
}

$projectArg = ''
if ($Project) {
    $projectArg = " -Project `"$Project`""
}

$escapedOutFile = $OutFile.Replace('"', '""')
$arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$pollScript`" once -Json -OutFile `"$escapedOutFile`"$projectArg"

$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument $arguments
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) `
    -RepetitionInterval (New-TimeSpan -Minutes $IntervalMinutes) `
    -RepetitionDuration (New-TimeSpan -Days 3650)
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null

Write-Output "Registered scheduled task: $TaskName"
Write-Output "Interval minutes: $IntervalMinutes"
Write-Output "Output file: $OutFile"
