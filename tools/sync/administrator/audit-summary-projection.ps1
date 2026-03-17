Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'audit-summary-shell.ps1')

function Write-AdministratorAuditSummaryProjection {
    param(
        [AllowNull()][object[]]$AuditEvents = @(),
        [string]$RuntimeDir = 'B:\ohmic\generated\agent-work\runtime',
        [string]$ActivePresetId = 'all_activity'
    )

    $projection = New-AdministratorAuditSummaryShellModel -AuditProjection ([pscustomobject]@{
            audit_rows = @($AuditEvents)
        }) -ActivePresetId $ActivePresetId

    Write-AdministratorProjectionFile -FileName 'administrator_audit_summary.json' -Value $projection -RuntimeDir $RuntimeDir | Out-Null
    return $projection
}
