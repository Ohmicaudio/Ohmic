Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. 'B:\ohmic\tools\sync\json-loop-helpers.ps1'

function Normalize-QueueHealthToken {
    param([AllowNull()][string]$Value)
    if ([string]::IsNullOrWhiteSpace($Value)) { return '' }
    return ([regex]::Replace($Value.Trim().ToLowerInvariant(), '[^a-z0-9]+', '_')).Trim('_')
}

function Get-QueueHealthObjectValue {
    param(
        [AllowNull()][object]$InputObject,
        [string]$Name,
        [object]$Default = $null
    )

    if ($null -eq $InputObject) { return $Default }
    $property = $InputObject.PSObject.Properties | Where-Object { $_.Name -eq $Name } | Select-Object -First 1
    if ($null -eq $property) { return $Default }
    return $property.Value
}

function ConvertTo-QueueHealthList {
    param([AllowNull()][object]$Value)

    if ($null -eq $Value) { return @() }
    if ($Value -is [string]) {
        if ([string]::IsNullOrWhiteSpace($Value)) { return @() }
        return @($Value.Trim())
    }
    if ($Value -is [System.Collections.IEnumerable]) {
        $items = @()
        foreach ($entry in $Value) {
            if ($null -eq $entry) { continue }
            $text = [string]$entry
            if ([string]::IsNullOrWhiteSpace($text)) { continue }
            $items += $text.Trim()
        }
        return @($items)
    }
    return @(([string]$Value).Trim())
}

function Get-QueuePressureStatusBand {
    param(
        [int]$HotReadyCount,
        [int]$HotReadyFloor = 20,
        [int]$HotReadyTarget = 28,
        [int]$SameFamilyReadyCount = -1,
        [int]$SameFamilyFloor = 2,
        [int]$WarmReserveCount = -1
    )

    if ($HotReadyCount -le $HotReadyFloor -or ($SameFamilyReadyCount -ge 0 -and $SameFamilyReadyCount -lt $SameFamilyFloor -and $WarmReserveCount -le 0)) {
        return 'critical'
    }
    if ($HotReadyCount -le ($HotReadyFloor + 2) -or ($SameFamilyReadyCount -ge 0 -and $SameFamilyReadyCount -le $SameFamilyFloor)) {
        return 'pressure'
    }
    if ($HotReadyCount -lt $HotReadyTarget -or ($SameFamilyReadyCount -ge 0 -and $SameFamilyReadyCount -eq ($SameFamilyFloor + 1))) {
        return 'watch'
    }
    return 'healthy'
}

function Get-QueuePressureStatusRank {
    param([string]$Band)

    switch ((Normalize-QueueHealthToken -Value $Band)) {
        'critical' { return 0 }
        'pressure' { return 1 }
        'watch' { return 2 }
        default { return 3 }
    }
}

function ConvertTo-QueueHealthSortableUtc {
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

function Get-QueueHealthClaimPathMap {
    param([object[]]$ActiveClaims = @())

    $map = @{}
    foreach ($claim in @($ActiveClaims)) {
        $claimId = [string](Get-QueueHealthObjectValue -InputObject $claim -Name 'claim_id' -Default '')
        foreach ($filePath in @(ConvertTo-QueueHealthList -Value (Get-QueueHealthObjectValue -InputObject $claim -Name 'files' -Default @()))) {
            if (-not [string]::IsNullOrWhiteSpace($filePath)) {
                $map[$filePath] = $claimId
            }
        }
    }

    return $map
}

function Get-QueueHealthFamilyKey {
    param(
        [string]$TaskId,
        [string]$Title = ''
    )

    $slug = [string]$TaskId
    if ($slug -match '^\d{4}-\d{2}-\d{2}-(.+)$') {
        $slug = $Matches[1]
    }
    if ([string]::IsNullOrWhiteSpace($slug)) {
        $slug = Normalize-QueueHealthToken -Value $Title
    }

    $tokens = @($slug -split '-') | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
    if (@($tokens).Count -eq 0) {
        return 'general'
    }

    if ($tokens[0] -in @('define', 'scaffold', 'implement', 'run', 'review', 'compare', 'classify', 'freeze', 'isolate', 'split', 'normalize', 'verify', 'plan', 'promote', 'sort', 'build', 'extract', 'wire', 'repair', 'expose', 'salvage', 'create', 'inventory', 'map', 'correlate', 'add', 'finish', 'close', 'document')) {
        $tokens = @($tokens | Select-Object -Skip 1)
    }

    if (@($tokens).Count -eq 0) {
        return 'general'
    }
    if (@($tokens).Count -eq 1) {
        return Normalize-QueueHealthToken -Value $tokens[0]
    }

    return Normalize-QueueHealthToken -Value ("{0}-{1}" -f $tokens[0], $tokens[1])
}

function Get-QueueHealthFamilyLabel {
    param([string]$FamilyKey)

    if ([string]::IsNullOrWhiteSpace($FamilyKey)) {
        return 'General'
    }

    return (($FamilyKey -split '_') | Where-Object { $_ } | ForEach-Object {
        if ($_.Length -le 2) {
            $_.ToUpperInvariant()
        }
        else {
            $_.Substring(0, 1).ToUpperInvariant() + $_.Substring(1)
        }
    }) -join ' '
}

function New-QueueHealthProjectionEnvelope {
    param(
        [string]$ProjectionName,
        [string]$RootArrayName,
        [object[]]$Rows,
        [hashtable]$Metadata = @{}
    )

    $envelope = [ordered]@{
        projection_name = $ProjectionName
        generated_at = New-UtcTimestamp
    }

    foreach ($key in $Metadata.Keys) {
        $envelope[$key] = $Metadata[$key]
    }

    $envelope[$RootArrayName] = @($Rows)
    return [pscustomobject]$envelope
}

function Write-QueueHealthProjectionFile {
    param(
        [string]$FileName,
        [object]$Value,
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $path = Join-Path $RuntimeDir $FileName
    Write-JsonFile -PathText $path -Value $Value
    return $path
}
