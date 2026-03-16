Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'projection-common.ps1')

function Get-AdministratorTagClassRank {
    param([string]$TagClass)

    switch ((Normalize-AdministratorToken -Value $TagClass)) {
        'canonical_shared' { return 0 }
        'overlay_local' { return 1 }
        'operator_freeform' { return 2 }
        default { return 3 }
    }
}

function New-AdministratorTagProjection {
    param([object[]]$TagAssignments = @())

    $effectiveByKey = @{}
    foreach ($assignment in @($TagAssignments)) {
        $intakeId = [string](Get-AdministratorObjectValue -InputObject $assignment -Name 'intake_id' -Default '')
        $tagLabel = [string](Get-AdministratorObjectValue -InputObject $assignment -Name 'tag_label' -Default '')
        $key = '{0}::{1}' -f $intakeId, (Normalize-AdministratorToken -Value $tagLabel)
        $classRank = Get-AdministratorTagClassRank -TagClass (Get-AdministratorObjectValue -InputObject $assignment -Name 'tag_class' -Default '')
        $appliedAt = ConvertTo-AdministratorSortableUtc -Value (Get-AdministratorObjectValue -InputObject $assignment -Name 'applied_at' -Default '')

        if (-not $effectiveByKey.ContainsKey($key)) {
            $effectiveByKey[$key] = [pscustomobject]@{
                row = $assignment
                class_rank = $classRank
                applied_sort = $appliedAt
            }
            continue
        }

        $current = $effectiveByKey[$key]
        if ($classRank -lt $current.class_rank -or ($classRank -eq $current.class_rank -and $appliedAt -gt $current.applied_sort)) {
            $effectiveByKey[$key] = [pscustomobject]@{
                row = $assignment
                class_rank = $classRank
                applied_sort = $appliedAt
            }
        }
    }

    $rows = foreach ($entry in $effectiveByKey.Values) {
        $row = $entry.row
        $appliedAtText = [string](Get-AdministratorObjectValue -InputObject $row -Name 'applied_at' -Default '')
        [pscustomobject]@{
            tag_assignment_id = [string](Get-AdministratorObjectValue -InputObject $row -Name 'tag_assignment_id' -Default '')
            intake_id = [string](Get-AdministratorObjectValue -InputObject $row -Name 'intake_id' -Default '')
            tag_id = [string](Get-AdministratorObjectValue -InputObject $row -Name 'tag_id' -Default '')
            tag_label = [string](Get-AdministratorObjectValue -InputObject $row -Name 'tag_label' -Default '')
            tag_class = [string](Get-AdministratorObjectValue -InputObject $row -Name 'tag_class' -Default '')
            source = [string](Get-AdministratorObjectValue -InputObject $row -Name 'source' -Default '')
            applied_by = [string](Get-AdministratorObjectValue -InputObject $row -Name 'applied_by' -Default '')
            applied_at = $appliedAtText
            is_default = [bool](Get-AdministratorObjectValue -InputObject $row -Name 'is_default' -Default $false)
            is_suggested = [bool](Get-AdministratorObjectValue -InputObject $row -Name 'is_suggested' -Default $false)
            _class_rank = $entry.class_rank
            _applied_sort = ConvertTo-AdministratorSortableUtc -Value $appliedAtText
        }
    }

    $orderedRows = @(
        $rows |
        Sort-Object @{ Expression = 'intake_id'; Ascending = $true }, @{ Expression = '_class_rank'; Ascending = $true }, @{ Expression = '_applied_sort'; Descending = $true }, @{ Expression = 'tag_label'; Ascending = $true } |
        ForEach-Object {
            $_.PSObject.Properties.Remove('_class_rank')
            $_.PSObject.Properties.Remove('_applied_sort')
            $_
        }
    )

    return New-AdministratorProjectionEnvelope `
        -ProjectionName 'administrator_tag_assignment_projection' `
        -RootArrayName 'tag_assignments' `
        -Rows $orderedRows `
        -RefreshTriggers @('tag_writeback', 'overlay_tag_update', 'duplicate_suppression_refresh') `
        -Metadata @{
            duplicate_suppression = 'effective_label_per_intake'
            ordering = 'class_then_applied_at'
        }
}

function Write-AdministratorTagProjection {
    param(
        [object[]]$TagAssignments = @(),
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $projection = New-AdministratorTagProjection -TagAssignments $TagAssignments
    Write-AdministratorProjectionFile -FileName 'administrator_tag_assignment_projection.json' -Value $projection -RuntimeDir $RuntimeDir | Out-Null
    return $projection
}
