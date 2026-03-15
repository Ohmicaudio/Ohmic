param(
    [string]$CsvPath = "B:\junk\loudspeakerdatabase.csv",
    [string[]]$SampleModels = @("15LEX1200Nd", "10 H 2 CS", "ESW10D4"),
    [string]$OutputPath = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-TrimmedValue {
    param(
        [pscustomobject]$Row,
        [string]$Column
    )

    if (-not ($Row.PSObject.Properties.Name -contains $Column)) {
        return ""
    }

    return [string]$Row.$Column
}

function Convert-ToNullableNumber {
    param(
        [string]$Value
    )

    $trimmed = $Value.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed)) {
        return $null
    }

    $normalized = $trimmed.Replace(",", ".")
    $number = 0.0
    if ([double]::TryParse($normalized, [System.Globalization.NumberStyles]::Float, [System.Globalization.CultureInfo]::InvariantCulture, [ref]$number)) {
        return $number
    }

    return $null
}

function Get-GroupedBlocks {
    param(
        [pscustomobject]$Row
    )

    $slots = @(
        @{ Slot = 4; Symbol = "symbol 4"; Sub = "sub 4"; Unit = "value 6"; Value = "value 7" },
        @{ Slot = 5; Symbol = "symbol 5"; Sub = "sub 5"; Unit = "value 8"; Value = "value 9" },
        @{ Slot = 7; Symbol = "symbol 7"; Sub = "sub 7"; Unit = "value 11"; Value = "value 12" }
    )

    $blocks = @()
    foreach ($slot in $slots) {
        $symbol = (Get-TrimmedValue -Row $Row -Column $slot.Symbol).Trim()
        $sub = (Get-TrimmedValue -Row $Row -Column $slot.Sub).Trim()
        $unit = (Get-TrimmedValue -Row $Row -Column $slot.Unit).Trim()
        $value = (Get-TrimmedValue -Row $Row -Column $slot.Value).Trim()

        if ([string]::IsNullOrWhiteSpace($symbol) -and [string]::IsNullOrWhiteSpace($sub) -and [string]::IsNullOrWhiteSpace($unit) -and [string]::IsNullOrWhiteSpace($value)) {
            continue
        }

        $blocks += [pscustomobject]@{
            slot = $slot.Slot
            symbol = $symbol
            sub = $sub
            unit = $unit
            raw_value = $value
        }
    }

    return $blocks
}

function Get-GroupedTechnicalFields {
    param(
        [pscustomobject]$Row
    )

    $fields = [ordered]@{}
    $blocks = Get-GroupedBlocks -Row $Row

    foreach ($block in $blocks) {
        $symbol = $block.symbol.Trim().ToLowerInvariant()
        $sub = $block.sub.Trim().ToLowerInvariant()
        $unit = $block.unit.Trim().ToLowerInvariant()
        $numericValue = Convert-ToNullableNumber -Value $block.raw_value

        if ($symbol -eq "x" -and $sub -eq "max" -and $unit -eq "mm" -and $null -ne $numericValue) {
            $fields["xmax_mm"] = $numericValue
            continue
        }

        if ($symbol -eq "spl" -and $sub -eq "1w" -and $unit -eq "db" -and $null -ne $numericValue) {
            $fields["sensitivity_db_1w"] = $numericValue
            continue
        }

        if ($symbol -eq "p" -and $sub -eq "max" -and $unit -eq "w" -and $null -ne $numericValue) {
            $fields["power_max_w"] = $numericValue
            continue
        }
    }

    $variant = "unknown"
    if ($fields.Contains("xmax_mm")) {
        $variant = "full_block"
    } elseif ($fields.Contains("sensitivity_db_1w") -or $fields.Contains("power_max_w")) {
        $variant = "shifted_missing_xmax"
    }

    return [pscustomobject]@{
        variant = $variant
        fields = [pscustomobject]$fields
        raw_blocks = $blocks
    }
}

function Get-SampleRecord {
    param(
        [pscustomobject]$Row
    )

    $grouped = Get-GroupedTechnicalFields -Row $Row
    $usableLow = Convert-ToNullableNumber -Value (Get-TrimmedValue -Row $Row -Column "fr 2")
    $usableHigh = Convert-ToNullableNumber -Value (Get-TrimmedValue -Row $Row -Column "fr 3")

    return [pscustomobject]@{
        brand = (Get-TrimmedValue -Row $Row -Column "brand_ref_imp").Trim()
        model = (Get-TrimmedValue -Row $Row -Column "brand_ref_imp 2").Trim()
        product_type = (Get-TrimmedValue -Row $Row -Column "size_type").Trim()
        diameter_inches = Convert-ToNullableNumber -Value (Get-TrimmedValue -Row $Row -Column "highlighted 2")
        nominal_impedance_raw = ((Get-TrimmedValue -Row $Row -Column "brand_ref_imp 3").Trim() + " " + (Get-TrimmedValue -Row $Row -Column "brand_ref_imp 4").Trim()).Trim()
        fs_hz = Convert-ToNullableNumber -Value (Get-TrimmedValue -Row $Row -Column "value 2")
        sd_cm2 = Convert-ToNullableNumber -Value (Get-TrimmedValue -Row $Row -Column "value 4")
        qts = Convert-ToNullableNumber -Value (Get-TrimmedValue -Row $Row -Column "value 5")
        usable_frequency_low_hz = $usableLow
        usable_frequency_high_hz = $usableHigh
        unlabeled_technical_value_1 = Convert-ToNullableNumber -Value (Get-TrimmedValue -Row $Row -Column "value 10")
        grouped_parse = $grouped
    }
}

$rows = Import-Csv $CsvPath
$samples = foreach ($model in $SampleModels) {
    $row = $rows | Where-Object { $_."brand_ref_imp 2" -eq $model } | Select-Object -First 1
    if ($null -eq $row) {
        Write-Warning "Sample model not found: $model"
        continue
    }

    Get-SampleRecord -Row $row
}

$json = $samples | ConvertTo-Json -Depth 6

if (-not [string]::IsNullOrWhiteSpace($OutputPath)) {
    $parent = Split-Path -Parent $OutputPath
    if (-not [string]::IsNullOrWhiteSpace($parent) -and -not (Test-Path $parent)) {
        New-Item -ItemType Directory -Path $parent -Force | Out-Null
    }

    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($OutputPath, $json, $utf8NoBom)
}

$json
