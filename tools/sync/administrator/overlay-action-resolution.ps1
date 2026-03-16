Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'common.ps1')
. (Join-Path $PSScriptRoot 'command-reason-catalog.ps1')

function Resolve-AdministratorOverlayAction {
    param(
        [string]$ActionInput,
        [object[]]$ActionRegistry,
        [string]$OverlayId = 'default'
    )

    $rejectionReasons = @()
    $warningReasons = @()
    $normalizedInput = Normalize-AdministratorToken -Value $ActionInput

    if (-not $normalizedInput) {
        $rejectionReasons += 'missing_required_field'
        return [pscustomobject]@{
            resolution_status = 'rejected'
            matched_input = $ActionInput
            overlay_id = $OverlayId
            resolved_action_id = $null
            resolved_display_label = $null
            candidate_action_ids = @()
            collision_type = $null
            rejection_reasons = @($rejectionReasons)
            warning_reasons = @($warningReasons)
        }
    }

    $candidates = @()
    foreach ($entry in @($ActionRegistry)) {
        $actionId = [string](Get-AdministratorObjectValue -InputObject $entry -Name 'action_id' -Default '')
        if (-not $actionId) {
            continue
        }

        $displayLabel = [string](Get-AdministratorObjectValue -InputObject $entry -Name 'display_label' -Default $actionId)
        $aliases = @(ConvertTo-AdministratorStringList -Value (Get-AdministratorObjectValue -InputObject $entry -Name 'aliases' -Default @()))
        $status = [string](Get-AdministratorObjectValue -InputObject $entry -Name 'status' -Default 'active')
        $hidden = [bool](Get-AdministratorObjectValue -InputObject $entry -Name 'hidden' -Default $false)
        $scope = [string](Get-AdministratorObjectValue -InputObject $entry -Name 'overlay_scope' -Default '')

        $matchTokens = @($actionId, $displayLabel) + $aliases
        $matchedBy = $matchTokens | Where-Object {
            (Normalize-AdministratorToken -Value $_) -eq $normalizedInput
        } | Select-Object -First 1

        if (-not $matchedBy) {
            continue
        }

        $scopeRank = if ($scope -and (Normalize-AdministratorToken -Value $scope) -eq (Normalize-AdministratorToken -Value $OverlayId)) {
            0
        }
        elseif (-not $scope) {
            1
        }
        else {
            2
        }

        $candidates += [pscustomobject]@{
            action_id = $actionId
            display_label = $displayLabel
            status = Normalize-AdministratorToken -Value $status
            hidden = $hidden
            overlay_scope = $scope
            matched_by = $matchedBy
            scope_rank = $scopeRank
        }
    }

    if (-not $candidates) {
        $rejectionReasons += 'unknown_action'
        return [pscustomobject]@{
            resolution_status = 'rejected'
            matched_input = $ActionInput
            overlay_id = $OverlayId
            resolved_action_id = $null
            resolved_display_label = $null
            candidate_action_ids = @()
            collision_type = $null
            rejection_reasons = @($rejectionReasons)
            warning_reasons = @($warningReasons)
        }
    }

    $bestScope = ($candidates | Measure-Object -Property scope_rank -Minimum).Minimum
    $scopeCandidates = @($candidates | Where-Object { $_.scope_rank -eq $bestScope })
    $visibleCandidates = @($scopeCandidates | Where-Object { -not $_.hidden })
    $activeVisible = @($visibleCandidates | Where-Object { $_.status -ne 'deprecated' -and $_.status -ne 'retired' })

    if ($activeVisible.Count -gt 1) {
        $rejectionReasons += 'ambiguous_action_alias'
        return [pscustomobject]@{
            resolution_status = 'rejected'
            matched_input = $ActionInput
            overlay_id = $OverlayId
            resolved_action_id = $null
            resolved_display_label = $null
            candidate_action_ids = @($scopeCandidates.action_id)
            collision_type = 'exact_active_active'
            rejection_reasons = @($rejectionReasons)
            warning_reasons = @($warningReasons)
        }
    }

    if ($activeVisible.Count -eq 1) {
        $resolved = $activeVisible[0]
        $deprecatedOverlap = @($scopeCandidates | Where-Object { $_.status -eq 'deprecated' })
        if ($deprecatedOverlap.Count -gt 0) {
            $warningReasons += 'deprecated_alias_overlap'
        }
        if ((Normalize-AdministratorToken -Value $resolved.matched_by) -ne (Normalize-AdministratorToken -Value $resolved.action_id)) {
            $warningReasons += 'overlay_label_fallback'
        }

        return [pscustomobject]@{
            resolution_status = if ($warningReasons.Count -gt 0) { 'resolved_with_warnings' } else { 'resolved' }
            matched_input = $ActionInput
            overlay_id = $OverlayId
            resolved_action_id = $resolved.action_id
            resolved_display_label = $resolved.display_label
            candidate_action_ids = @($scopeCandidates.action_id)
            collision_type = if ($deprecatedOverlap.Count -gt 0) { 'active_vs_deprecated_alias_collision' } else { $null }
            rejection_reasons = @($rejectionReasons)
            warning_reasons = @($warningReasons | Select-Object -Unique)
        }
    }

    if ($visibleCandidates.Count -eq 0) {
        $rejectionReasons += 'overlay_action_hidden'
        return [pscustomobject]@{
            resolution_status = 'rejected'
            matched_input = $ActionInput
            overlay_id = $OverlayId
            resolved_action_id = $null
            resolved_display_label = $null
            candidate_action_ids = @($scopeCandidates.action_id)
            collision_type = 'hidden_only_match'
            rejection_reasons = @($rejectionReasons)
            warning_reasons = @($warningReasons)
        }
    }

    if ($visibleCandidates.Count -gt 1) {
        $rejectionReasons += 'ambiguous_action_alias'
        return [pscustomobject]@{
            resolution_status = 'rejected'
            matched_input = $ActionInput
            overlay_id = $OverlayId
            resolved_action_id = $null
            resolved_display_label = $null
            candidate_action_ids = @($scopeCandidates.action_id)
            collision_type = 'visible_collision'
            rejection_reasons = @($rejectionReasons)
            warning_reasons = @($warningReasons)
        }
    }

    $resolved = $visibleCandidates[0]
    if ((Normalize-AdministratorToken -Value $resolved.matched_by) -ne (Normalize-AdministratorToken -Value $resolved.action_id)) {
        $warningReasons += 'overlay_label_fallback'
    }

    return [pscustomobject]@{
        resolution_status = if ($warningReasons.Count -gt 0) { 'resolved_with_warnings' } else { 'resolved' }
        matched_input = $ActionInput
        overlay_id = $OverlayId
        resolved_action_id = $resolved.action_id
        resolved_display_label = $resolved.display_label
        candidate_action_ids = @($scopeCandidates.action_id)
        collision_type = $null
        rejection_reasons = @($rejectionReasons)
        warning_reasons = @($warningReasons | Select-Object -Unique)
    }
}
