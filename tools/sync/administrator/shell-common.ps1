Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'projection-common.ps1')

function Get-AdministratorProjectionRows {
    param(
        [AllowNull()][object]$Projection,
        [string]$ArrayProperty
    )

    if ($null -eq $Projection) {
        return @()
    }

    if ($Projection -is [string]) {
        if (-not (Test-Path $Projection)) {
            return @()
        }

        $Projection = Read-JsonFileOrDefault -PathText $Projection -Default $null
    }

    $propertyValue = Get-AdministratorObjectValue -InputObject $Projection -Name $ArrayProperty -Default $null
    if ($null -ne $propertyValue) {
        return @($propertyValue)
    }

    if ($Projection -is [System.Collections.IEnumerable] -and -not ($Projection -is [string])) {
        return @($Projection)
    }

    return @($Projection)
}

function New-AdministratorShellModuleEnvelope {
    param(
        [string]$ModuleId,
        [object[]]$Rows,
        [string]$EmptyTitle,
        [string]$EmptyBody,
        [object[]]$FilterPresets = @(),
        [hashtable]$Metadata = @{}
    )

    $envelope = [ordered]@{
        module_id = $ModuleId
        generated_at = New-AdministratorUtcTimestamp
        row_count = @($Rows).Count
        filter_presets = @($FilterPresets)
        empty_state = [ordered]@{
            title = $EmptyTitle
            body = $EmptyBody
        }
        rows = @($Rows)
    }

    foreach ($key in $Metadata.Keys) {
        $envelope[$key] = $Metadata[$key]
    }

    return [pscustomobject]$envelope
}
