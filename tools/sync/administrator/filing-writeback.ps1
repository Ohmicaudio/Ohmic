Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'common.ps1')

function New-AdministratorFilingRecordId {
    $stamp = (Get-Date).ToUniversalTime().ToString('yyyyMMdd_HHmmss')
    $suffix = ([guid]::NewGuid().ToString('N')).Substring(0, 6)
    return "filing_${stamp}_$suffix"
}

function New-AdministratorFilingEventId {
    $stamp = (Get-Date).ToUniversalTime().ToString('yyyyMMdd_HHmmss')
    $suffix = ([guid]::NewGuid().ToString('N')).Substring(0, 6)
    return "filing_evt_${stamp}_$suffix"
}

function Invoke-AdministratorFilingWriteback {
    param(
        [Parameter(Mandatory = $true)]
        [object]$IntakeItem,
        [Parameter(Mandatory = $true)]
        [object]$Destination,
        [string]$RequestedBy = 'operator:d',
        [string]$Reason = '',
        [AllowNull()][Nullable[bool]]$ArchiveMarker = $null
    )

    $intakeId = [string](Get-AdministratorObjectValue -InputObject $IntakeItem -Name 'intake_id' -Default '')
    if (-not $intakeId) {
        throw 'Intake item must include intake_id.'
    }

    $destinationId = [string](Get-AdministratorObjectValue -InputObject $Destination -Name 'filing_destination_id' -Default '')
    if (-not $destinationId) {
        throw 'Destination must include filing_destination_id.'
    }

    $selectable = [bool](Get-AdministratorObjectValue -InputObject $Destination -Name 'selectable' -Default $false)
    if (-not $selectable) {
        return [pscustomobject]@{
            writeback_status = 'rejected'
            intake_id = $intakeId
            filing_destination_id = $destinationId
            rejection_reason = [string](Get-AdministratorObjectValue -InputObject $Destination -Name 'disabled_reason' -Default 'destination_not_selectable')
        }
    }

    $occurredAt = New-AdministratorUtcTimestamp
    $archiveMarkerValue = if ($null -ne $ArchiveMarker) {
        [bool]$ArchiveMarker
    }
    else {
        [bool](Get-AdministratorObjectValue -InputObject $Destination -Name 'archive_marker_default' -Default $false)
    }

    $filingRecord = [pscustomobject]@{
        filing_record_id = New-AdministratorFilingRecordId
        intake_id = $intakeId
        filing_destination_id = $destinationId
        display_label = [string](Get-AdministratorObjectValue -InputObject $Destination -Name 'display_label' -Default $destinationId)
        archive_marker = $archiveMarkerValue
        reason = $Reason
        filed_by = $RequestedBy
        filed_at = $occurredAt
        status = 'active'
    }

    $auditEvent = [pscustomobject]@{
        event_id = New-AdministratorFilingEventId
        event_type = 'administrator.filing.created'
        event_family = 'filing_migration'
        filing_record_id = $filingRecord.filing_record_id
        intake_id = $intakeId
        filing_destination_id = $destinationId
        archive_marker = $archiveMarkerValue
        actor_id = $RequestedBy
        actor_type = 'human_operator'
        actor_label = $RequestedBy
        occurred_at = $occurredAt
        summary_label = 'Filing created'
        reason = $Reason
        target_label = [string](Get-AdministratorObjectValue -InputObject $Destination -Name 'display_label' -Default $destinationId)
        status_delta = ''
    }

    return [pscustomobject]@{
        writeback_status = 'accepted'
        filing_record = $filingRecord
        audit_event = $auditEvent
        projection_refresh_targets = @(
            'administrator_filing_history_projection.json'
        )
    }
}
