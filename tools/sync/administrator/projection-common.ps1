Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'common.ps1')
. (Join-Path (Split-Path $PSScriptRoot -Parent) 'json-loop-helpers.ps1')

function ConvertTo-AdministratorSortableUtc {
    param([AllowNull()][object]$Value)

    if ($null -eq $Value) {
        return [datetime]::MinValue
    }

    try {
        return ([datetime]$Value).ToUniversalTime()
    }
    catch {
        return [datetime]::MinValue
    }
}

function Get-AdministratorPriorityRank {
    param([string]$PriorityHint)

    switch ((Normalize-AdministratorToken -Value $PriorityHint)) {
        'critical' { return 0 }
        'high' { return 1 }
        'medium' { return 2 }
        'normal' { return 3 }
        'low' { return 4 }
        default { return 5 }
    }
}

function New-AdministratorProjectionEnvelope {
    param(
        [string]$ProjectionName,
        [string]$RootArrayName,
        [object[]]$Rows,
        [string[]]$RefreshTriggers = @(),
        [hashtable]$Metadata = @{}
    )

    $envelope = [ordered]@{
        projection_name = $ProjectionName
        generated_at = New-AdministratorUtcTimestamp
        refresh_triggers = @($RefreshTriggers)
    }

    foreach ($key in $Metadata.Keys) {
        $envelope[$key] = $Metadata[$key]
    }

    $envelope[$RootArrayName] = @($Rows)
    return [pscustomobject]$envelope
}

function Write-AdministratorProjectionFile {
    param(
        [string]$FileName,
        [object]$Value,
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $path = Join-Path $RuntimeDir $FileName
    Write-JsonFile -PathText $path -Value $Value
    return $path
}
