Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'common.ps1')

function New-QueueHealthReadyCountProjection {
    param(
        [AllowNull()][object]$ReadySummary = $null,
        [AllowNull()][object]$ActiveSummary = $null
    )

    $readyItems = @((Get-QueueHealthObjectValue -InputObject $ReadySummary -Name 'items' -Default @()))
    $activeClaims = @((Get-QueueHealthObjectValue -InputObject $ActiveSummary -Name 'items' -Default @()))
    $claimMap = Get-QueueHealthClaimPathMap -ActiveClaims $activeClaims

    $rows = @()
    $claimedRows = @()
    $nonReadyRows = @()

    foreach ($item in $readyItems) {
        $status = Normalize-QueueHealthToken -Value (Get-QueueHealthObjectValue -InputObject $item -Name 'status' -Default 'ready')
        $filePath = [string](Get-QueueHealthObjectValue -InputObject $item -Name 'file_path' -Default '')
        $claimId = if ($claimMap.ContainsKey($filePath)) { [string]$claimMap[$filePath] } else { [string](Get-QueueHealthObjectValue -InputObject $item -Name 'claim_id' -Default '') }
        $familyKey = Get-QueueHealthFamilyKey -TaskId ([string](Get-QueueHealthObjectValue -InputObject $item -Name 'task_id' -Default '')) -Title ([string](Get-QueueHealthObjectValue -InputObject $item -Name 'title' -Default ''))

        $row = [pscustomobject]@{
            task_id = [string](Get-QueueHealthObjectValue -InputObject $item -Name 'task_id' -Default '')
            title = [string](Get-QueueHealthObjectValue -InputObject $item -Name 'title' -Default '')
            priority = [string](Get-QueueHealthObjectValue -InputObject $item -Name 'priority' -Default 'unknown')
            project = [string](Get-QueueHealthObjectValue -InputObject $item -Name 'project' -Default '')
            status = [string](Get-QueueHealthObjectValue -InputObject $item -Name 'status' -Default '')
            file_path = $filePath
            claim_id = $claimId
            family_key = $familyKey
            family_label = Get-QueueHealthFamilyLabel -FamilyKey $familyKey
        }

        if ($status -ne 'ready') {
            $nonReadyRows += $row
            continue
        }
        if (-not [string]::IsNullOrWhiteSpace($claimId)) {
            $claimedRows += $row
            continue
        }

        $rows += $row
    }

    return New-QueueHealthProjectionEnvelope `
        -ProjectionName 'queue_runtime_ready_count' `
        -RootArrayName 'ready_items' `
        -Rows $rows `
        -Metadata @{
            staleness = [ordered]@{
                status = [string](Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $ReadySummary -Name 'staleness' -Default $null) -Name 'status' -Default 'unknown')
                reason = Get-QueueHealthObjectValue -InputObject (Get-QueueHealthObjectValue -InputObject $ReadySummary -Name 'staleness' -Default $null) -Name 'reason' -Default $null
            }
            raw_ready_count = @($readyItems).Count
            effective_ready_count = @($rows).Count
            excluded_claimed_count = @($claimedRows).Count
            excluded_nonready_count = @($nonReadyRows).Count
            active_claim_count = @($activeClaims).Count
            claim_occupied_items = @($claimedRows)
            non_ready_items = @($nonReadyRows)
        }
}

function Write-QueueHealthReadyCountProjection {
    param(
        [AllowNull()][object]$ReadySummary = $null,
        [AllowNull()][object]$ActiveSummary = $null,
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime'
    )

    $projection = New-QueueHealthReadyCountProjection -ReadySummary $ReadySummary -ActiveSummary $ActiveSummary
    Write-QueueHealthProjectionFile -FileName 'queue_health_ready_count.json' -Value $projection -RuntimeDir $RuntimeDir | Out-Null
    return $projection
}
