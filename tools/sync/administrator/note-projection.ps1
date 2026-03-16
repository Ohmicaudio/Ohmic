Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'projection-common.ps1')

function New-AdministratorNoteProjection {
    param(
        [object[]]$Notes = @(),
        [string]$VisibilityContext = 'desk',
        [bool]$IncludeInternalOnly = $false
    )

    $normalizedContext = Normalize-AdministratorToken -Value $VisibilityContext

    $rows = foreach ($note in @($Notes)) {
        $visibility = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $note -Name 'visibility' -Default 'desk')
        if (-not $IncludeInternalOnly -and $visibility -eq 'internal_only') {
            continue
        }

        if ($normalizedContext -eq 'desk' -and $visibility -eq 'audit') {
            continue
        }

        $createdAt = [string](Get-AdministratorObjectValue -InputObject $note -Name 'created_at' -Default '')
        $authoredBy = [string](Get-AdministratorObjectValue -InputObject $note -Name 'authored_by' -Default '')
        $displayAuthorLabel = [string](Get-AdministratorObjectValue -InputObject $note -Name 'display_author_label' -Default $authoredBy)

        [pscustomobject]@{
            note_id = [string](Get-AdministratorObjectValue -InputObject $note -Name 'note_id' -Default '')
            intake_id = [string](Get-AdministratorObjectValue -InputObject $note -Name 'intake_id' -Default '')
            body_text = [string](Get-AdministratorObjectValue -InputObject $note -Name 'body_text' -Default '')
            authorship_class = [string](Get-AdministratorObjectValue -InputObject $note -Name 'authorship_class' -Default 'unknown')
            authored_by = $authoredBy
            created_at = $createdAt
            visibility = $visibility
            source_action_id = [string](Get-AdministratorObjectValue -InputObject $note -Name 'source_action_id' -Default '')
            display_author_label = $displayAuthorLabel
            _created_sort = ConvertTo-AdministratorSortableUtc -Value $createdAt
        }
    }

    $orderedRows = @(
        $rows |
        Sort-Object @{ Expression = '_created_sort'; Descending = $true } |
        ForEach-Object {
            $_.PSObject.Properties.Remove('_created_sort')
            $_
        }
    )

    return New-AdministratorProjectionEnvelope `
        -ProjectionName 'administrator_note_projection' `
        -RootArrayName 'notes' `
        -Rows $orderedRows `
        -RefreshTriggers @('note_append', 'note_edit', 'visibility_filter_change') `
        -Metadata @{
            visibility_context = $normalizedContext
            ordering = 'created_at_desc'
        }
}

function Write-AdministratorNoteProjection {
    param(
        [object[]]$Notes = @(),
        [string]$VisibilityContext = 'desk',
        [bool]$IncludeInternalOnly = $false,
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $projection = New-AdministratorNoteProjection -Notes $Notes -VisibilityContext $VisibilityContext -IncludeInternalOnly:$IncludeInternalOnly
    Write-AdministratorProjectionFile -FileName 'administrator_note_projection.json' -Value $projection -RuntimeDir $RuntimeDir | Out-Null
    return $projection
}
