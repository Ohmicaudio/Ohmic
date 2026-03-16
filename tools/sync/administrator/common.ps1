Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function New-AdministratorUtcTimestamp {
    return (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')
}

function New-AdministratorCommandId {
    $stamp = (Get-Date).ToUniversalTime().ToString('yyyyMMdd_HHmmss')
    $suffix = ([guid]::NewGuid().ToString('N')).Substring(0, 6)
    return "admin_cmd_${stamp}_$suffix"
}

function Normalize-AdministratorToken {
    param([AllowNull()][string]$Value)

    if ([string]::IsNullOrWhiteSpace($Value)) {
        return ''
    }

    $normalized = $Value.Trim().ToLowerInvariant()
    $normalized = [regex]::Replace($normalized, '[^a-z0-9]+', '_')
    return $normalized.Trim('_')
}

function ConvertTo-AdministratorStringList {
    param([AllowNull()][object]$Value)

    if ($null -eq $Value) {
        return @()
    }

    if ($Value -is [string]) {
        if ([string]::IsNullOrWhiteSpace($Value)) {
            return @()
        }

        return @($Value.Trim())
    }

    if ($Value -is [System.Collections.IEnumerable]) {
        $items = @()
        foreach ($entry in $Value) {
            if ($null -eq $entry) {
                continue
            }

            $text = [string]$entry
            if ([string]::IsNullOrWhiteSpace($text)) {
                continue
            }

            $items += $text.Trim()
        }

        return @($items)
    }

    return @(([string]$Value).Trim())
}

function Get-AdministratorObjectValue {
    param(
        [AllowNull()][object]$InputObject,
        [string]$Name,
        [object]$Default = $null
    )

    if ($null -eq $InputObject) {
        return $Default
    }

    $property = $InputObject.PSObject.Properties | Where-Object { $_.Name -eq $Name } | Select-Object -First 1
    if ($null -eq $property) {
        return $Default
    }

    return $property.Value
}

function Test-AdministratorListContains {
    param(
        [string[]]$Values,
        [string]$Expected
    )

    $needle = Normalize-AdministratorToken -Value $Expected
    if (-not $needle) {
        return $false
    }

    foreach ($value in $Values) {
        if ((Normalize-AdministratorToken -Value $value) -eq $needle) {
            return $true
        }
    }

    return $false
}
