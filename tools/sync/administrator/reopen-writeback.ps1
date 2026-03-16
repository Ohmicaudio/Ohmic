Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'common.ps1')

function New-AdministratorReopenRequestId {
    $stamp = (Get-Date).ToUniversalTime().ToString('yyyyMMdd_HHmmss')
    $suffix = ([guid]::NewGuid().ToString('N')).Substring(0, 6)
    return "reopen_req_${stamp}_$suffix"
}

function New-AdministratorReopenEventId {
    $stamp = (Get-Date).ToUniversalTime().ToString('yyyyMMdd_HHmmss')
    $suffix = ([guid]::NewGuid().ToString('N')).Substring(0, 6)
    return "reopen_evt_${stamp}_$suffix"
}

function Invoke-AdministratorReopenWriteback {
    param(
        [Parameter(Mandatory = $true)]
        [object]$IntakeItem,
        [string]$RequestedRestoredStatus = 'queued',
        [string]$RequestedBy = 'operator:d',
        [string]$ReopenReason = ''
    )

    $intakeId = [string](Get-AdministratorObjectValue -InputObject $IntakeItem -Name 'intake_id' -Default '')
    if (-not $intakeId) {
        throw 'Intake item must include intake_id.'
    }

    $previousStatus = Normalize-AdministratorToken -Value (Get-AdministratorObjectValue -InputObject $IntakeItem -Name 'status' -Default '')
    if ($previousStatus -notin @('archived', 'routed')) {
        return [pscustomobject]@{
            writeback_status = 'rejected'
            intake_id = $intakeId
            rejection_reason = 'reopen_not_allowed'
        }
    }

    $reopenedAt = New-AdministratorUtcTimestamp
    $restoredStatus = if (Normalize-AdministratorToken -Value $RequestedRestoredStatus) {
        $RequestedRestoredStatus
    }
    else {
        'queued'
    }

    $reopenRequest = [pscustomobject]@{
        reopen_request_id = New-AdministratorReopenRequestId
        intake_id = $intakeId
        previous_status = $previousStatus
        requested_restored_status = $restoredStatus
        requested_by = $RequestedBy
        requested_at = $reopenedAt
        reopen_reason = $ReopenReason
    }

    $updatedValues = [ordered]@{}
    foreach ($property in $IntakeItem.PSObject.Properties) {
        $updatedValues[$property.Name] = $property.Value
    }

    $updatedValues['status'] = $restoredStatus
    $updatedValues['last_active_status'] = $previousStatus
    $updatedValues['inactive_status'] = $null
    $updatedValues['inactive_since'] = $null
    $updatedValues['updated_at'] = $reopenedAt

    $auditEvent = [pscustomobject]@{
        reopen_event_id = New-AdministratorReopenEventId
        intake_id = $intakeId
        previous_status = $previousStatus
        restored_status = $restoredStatus
        reopened_by = $RequestedBy
        reopened_at = $reopenedAt
        reopen_reason = $ReopenReason
    }

    return [pscustomobject]@{
        writeback_status = 'accepted'
        reopen_request = $reopenRequest
        updated_intake = [pscustomobject]$updatedValues
        audit_event = $auditEvent
        projection_refresh_targets = @(
            'administrator_inactive_intake_projection.json',
            'administrator_intake_queue.json',
            'administrator_recent_actions.json'
        )
    }
}
