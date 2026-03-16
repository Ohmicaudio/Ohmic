Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'shell-common.ps1')

function New-AdministratorAttachmentPreviewShellModel {
    param(
        [AllowNull()][object]$PreviewProjection = $null,
        [AllowNull()][object]$FailureReviewProjection = $null
    )

    $failureByAsset = @{}
    foreach ($failure in @(Get-AdministratorProjectionRows -Projection $FailureReviewProjection -ArrayProperty 'warning_items')) {
        $bundleId = [string](Get-AdministratorObjectValue -InputObject $failure -Name 'attachment_bundle_id' -Default '')
        if ($bundleId) {
            $failureByAsset[$bundleId] = $failure
        }
    }

    $rows = @(
        Get-AdministratorProjectionRows -Projection $PreviewProjection -ArrayProperty 'preview_refs' |
        ForEach-Object {
            $assetId = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'asset_id' -Default '')
            $linkedFailure = if ($failureByAsset.ContainsKey($assetId)) { $failureByAsset[$assetId] } else { $null }
            [pscustomobject]@{
                preview_ref_id = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'preview_ref_id' -Default '')
                asset_id = $assetId
                preview_kind = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'preview_kind' -Default '')
                availability = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'availability' -Default '')
                preview_url = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'preview_url' -Default '')
                fallback_label = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'fallback_label' -Default '')
                failure_reason = [string](Get-AdministratorObjectValue -InputObject $_ -Name 'failure_reason' -Default '')
                review_handoff_action = if ($linkedFailure) { [string](Get-AdministratorObjectValue -InputObject $linkedFailure -Name 'recommended_next_action' -Default 'open_detail') } else { $null }
            }
        }
    )

    return New-AdministratorShellModuleEnvelope `
        -ModuleId 'administrator_attachment_preview' `
        -Rows $rows `
        -EmptyTitle 'No attachment previews' `
        -EmptyBody 'Preview references will appear here when attachment assets have ready, pending, failed, or unsupported preview states.'
}
