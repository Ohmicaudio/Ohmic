Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function New-UtcTimestamp {
    return (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')
}

function New-LoopEventId {
    $stamp = (Get-Date).ToUniversalTime().ToString('yyyyMMdd_HHmmss')
    $suffix = ([guid]::NewGuid().ToString('N')).Substring(0, 6)
    return "evt_${stamp}_$suffix"
}

function Ensure-Directory {
    param([string]$PathText)

    if (-not (Test-Path $PathText)) {
        New-Item -ItemType Directory -Path $PathText -Force | Out-Null
    }
}

function Write-Utf8NoBomText {
    param(
        [string]$PathText,
        [string]$Content
    )

    $parent = Split-Path -Parent $PathText
    if ($parent) {
        Ensure-Directory -PathText $parent
    }

    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($PathText, $Content, $utf8NoBom)
}

function Write-JsonFile {
    param(
        [string]$PathText,
        [object]$Value,
        [int]$Depth = 10
    )

    $json = $Value | ConvertTo-Json -Depth $Depth
    Write-Utf8NoBomText -PathText $PathText -Content $json
}

function Read-JsonFileOrDefault {
    param(
        [string]$PathText,
        [object]$Default = $null
    )

    if (-not (Test-Path $PathText)) {
        return $Default
    }

    $raw = Get-Content $PathText -Raw
    if ([string]::IsNullOrWhiteSpace($raw)) {
        return $Default
    }

    return $raw | ConvertFrom-Json
}

function Read-JsonLines {
    param([string]$PathText)

    if (-not (Test-Path $PathText)) {
        return @()
    }

    $items = @()
    foreach ($line in Get-Content $PathText) {
        if ([string]::IsNullOrWhiteSpace($line)) {
            continue
        }
        $items += ($line | ConvertFrom-Json)
    }

    return @($items)
}

function Append-JsonLine {
    param(
        [string]$PathText,
        [object]$Value,
        [int]$Depth = 10
    )

    $parent = Split-Path -Parent $PathText
    if ($parent) {
        Ensure-Directory -PathText $parent
    }

    $json = $Value | ConvertTo-Json -Depth $Depth -Compress
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    $stream = New-Object System.IO.FileStream($PathText, [System.IO.FileMode]::Append, [System.IO.FileAccess]::Write, [System.IO.FileShare]::Read)
    try {
        $writer = New-Object System.IO.StreamWriter($stream, $utf8NoBom)
        try {
            $writer.WriteLine($json)
        }
        finally {
            $writer.Dispose()
        }
    }
    finally {
        $stream.Dispose()
    }
}
