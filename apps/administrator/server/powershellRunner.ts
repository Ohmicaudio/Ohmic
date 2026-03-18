import { spawn } from 'child_process'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { getAdministratorRuntimeDir } from './runtimeConfig.js'

const ADMIN_SCRIPTS_DIR = 'B:\\ohmic\\tools\\sync\\administrator'
const RUNTIME_DIR = getAdministratorRuntimeDir()

interface CommandInput {
  intake_id: string
  action: string
  queue_target?: string
  note?: string
  tags?: string[]
}

interface ReopenInactiveInput {
  intake_id: string
  restored_status?: string
  reopen_reason?: string
}

interface RecordFilingInput {
  intake_id: string
  filing_destination_id: string
  archive_marker?: boolean
  reason?: string
}

interface RecordTandemLaunchIntentInput {
  intake_id?: string | null
  target_preset_id?: string | null
  target_label?: string | null
  launch_url?: string | null
  attachment_id?: string | null
  handoff_note?: string | null
}

interface RecordProviderFollowUpCompletionInput {
  intake_id: string
  target_preset_id?: string | null
  target_label?: string | null
  completion_note?: string | null
}

interface CommandValidationResult {
  command_id: string
  selected_intake_id: string
  action_input: string
  resolved_action_id: string | null
  resolved_action_label: string | null
  requested_queue_target_id: string
  resolved_queue_target_id: string | null
  note_text: string
  tags: string[]
  requested_by: string
  created_at: string
  validation: {
    validation_status: 'accepted' | 'accepted_with_warnings' | 'rejected'
  }
}

interface CommandWritebackResult {
  writeback_status: 'accepted' | 'rejected'
  resulting_status: string | null
  recent_actions_count: number
  note_written: boolean
  tags_written: number
  queue_item_updated: boolean
}

interface ExecuteCommandResponse {
  result: CommandValidationResult
  writeback: CommandWritebackResult
}

interface IntakeQueueProjection {
  generated_at: string
  projection_name: string
  staleness?: {
    status: 'fresh' | 'stale'
    reason: string | null
  }
  refresh_triggers?: string[]
  metadata?: Record<string, unknown>
  count: number
  queue_items: IntakeQueueItem[]
}

interface InactiveIntakeProjection {
  generated_at: string
  projection_name: string
  refresh_triggers?: string[]
  metadata?: Record<string, unknown>
  count: number
  inactive_items: InactiveIntakeItem[]
}

interface InactiveIntakeItem {
  intake_id: string
  title: string
  inactive_status: string
  inactive_since: string
  last_active_status: string
  reopen_allowed: boolean
  reopen_target_status: string
  summary_label: string
}

interface ReopenWritebackResult {
  writeback_status: 'accepted' | 'rejected'
  intake_id: string
  restored_status: string | null
  recent_actions_count: number
  queue_item_updated: boolean
  inactive_item_removed: boolean
  rejection_reason?: string
}

interface ReopenInactiveResponse {
  writeback: ReopenWritebackResult
  updated_intake?: Record<string, unknown>
}

interface RecordFilingResponse {
  writeback: {
    writeback_status: 'accepted' | 'rejected'
    intake_id: string
    filing_record_id: string | null
    filing_destination_id: string | null
    filing_history_count: number
    rejection_reason?: string
  }
  filing_record?: Record<string, unknown>
}

interface RecordTandemLaunchIntentResponse {
  writeback: {
    writeback_status: 'accepted'
    event_id: string
    intake_id: string | null
    target_label: string | null
    audit_summary_count: number
  }
}

interface RecordProviderFollowUpCompletionResponse {
  writeback: {
    writeback_status: 'accepted'
    event_id: string
    intake_id: string
    target_label: string | null
    audit_summary_count: number
  }
}

interface IntakeQueueItem {
  intake_id: string
  title: string
  intake_kind: string
  received_at: string
  status: string
  routing_target: string
  trust_tier: string
  priority_hint: string
  tags: string[]
  warning_state: string
  warning_count: number
  summary_label: string
}

const commandComposerScript = asPowerShellPath('command-composer.ps1')
const recentActionsProjectionScript = asPowerShellPath('recent-actions-projection.ps1')
const noteProjectionScript = asPowerShellPath('note-projection.ps1')
const tagProjectionScript = asPowerShellPath('tag-projection.ps1')
const auditSummaryProjectionScript = asPowerShellPath('audit-summary-projection.ps1')
const reopenWritebackScript = asPowerShellPath('reopen-writeback.ps1')
const filingHistoryProjectionScript = asPowerShellPath('filing-history-projection.ps1')
const filingPickerReadScript = asPowerShellPath('filing-picker-read.ps1')
const filingWritebackScript = asPowerShellPath('filing-writeback.ps1')
const commonScript = asPowerShellPath('common.ps1')

function asPowerShellPath(fileName: string): string {
  return path.join(ADMIN_SCRIPTS_DIR, fileName).replace(/\\/g, '\\\\')
}

function escapePowerShellString(value: string): string {
  return value.replace(/'/g, "''")
}

function buildRegistryBootstrapScript(): string {
  const runtimeDir = escapePowerShellString(RUNTIME_DIR)

  return `
    $actionRegistryPath = '${runtimeDir}\\administrator_action_registry.json'
    $actionRegistry = @()
    if (Test-Path $actionRegistryPath) {
      $actionRegistry = @((Get-Content $actionRegistryPath -Raw | ConvertFrom-Json).actions)
    } else {
      $actionRegistry = @(
        [pscustomobject]@{ action_id = 'route_to_orchestrator'; display_label = 'Route to Orchestrator'; aliases = @('route','send'); status = 'active'; hidden = $false }
        [pscustomobject]@{ action_id = 'hold'; display_label = 'Hold'; aliases = @('pause','wait'); status = 'active'; hidden = $false }
        [pscustomobject]@{ action_id = 'archive'; display_label = 'Archive'; aliases = @('close','done'); status = 'active'; hidden = $false }
        [pscustomobject]@{ action_id = 'request_approval'; display_label = 'Request Approval'; aliases = @('approve','escalate'); status = 'active'; hidden = $false }
        [pscustomobject]@{ action_id = 'waiting_on_provider'; display_label = 'Waiting on Provider'; aliases = @('provider','ext-wait'); status = 'active'; hidden = $false }
        [pscustomobject]@{ action_id = 'waiting_on_human'; display_label = 'Waiting on Human'; aliases = @('human','manual'); status = 'active'; hidden = $false }
        [pscustomobject]@{ action_id = 'add_note'; display_label = 'Add Note'; aliases = @('note','comment'); status = 'active'; hidden = $false }
        [pscustomobject]@{ action_id = 'tag_item'; display_label = 'Tag Item'; aliases = @('tag','label'); status = 'active'; hidden = $false }
      )
    }

    $targetRegistryPath = '${runtimeDir}\\administrator_target_registry.json'
    $targetRegistry = @()
    if (Test-Path $targetRegistryPath) {
      $targetRegistry = @((Get-Content $targetRegistryPath -Raw | ConvertFrom-Json).targets)
    } else {
      $targetRegistry = @(
        [pscustomobject]@{ queue_target_id = 'orchestrator'; display_label = 'Orchestrator'; status = 'active'; capability_flags = @('route','approve') }
        [pscustomobject]@{ queue_target_id = 'performer'; display_label = 'Performer'; status = 'active'; capability_flags = @('route') }
      )
    }
  `
}

function buildComposerStateScript(input: CommandInput): string {
  const tagsArray = (input.tags ?? [])
    .map((tag) => `'${escapePowerShellString(tag)}'`)
    .join(',')

  return `
    $composerState = New-AdministratorCommandComposerState -SelectedIntakeId '${escapePowerShellString(input.intake_id)}' -ActionRegistry $actionRegistry -TargetRegistry $targetRegistry
    $composerState.action_input = '${escapePowerShellString(input.action)}'
    $composerState.note_text = '${escapePowerShellString(input.note ?? '')}'
    $composerState.queue_target_id = '${escapePowerShellString(input.queue_target ?? '')}'
    $composerState.tags = @(${tagsArray})

    $intent = Convert-AdministratorComposerStateToIntent -ComposerState $composerState -ActionRegistry $actionRegistry -TargetRegistry $targetRegistry
  `
}

function buildFilingDestinationRegistryScript(): string {
  return `
    $destinationRegistryPath = Join-Path $runtimeDir 'administrator_filing_destination_registry.json'
    $destinationRegistry = @()
    if (Test-Path $destinationRegistryPath) {
      $destinationRegistry = @((Get-Content $destinationRegistryPath -Raw | ConvertFrom-Json).destinations)
    } else {
      $destinationRegistry = @(
        [pscustomobject]@{
          filing_destination_id = 'customer_archive'
          display_label = 'Customer Archive'
          description = 'Default archive destination for customer-facing intake'
          status = 'active'
          allowed_intake_kinds = @('email', 'web_form', 'manual')
          default_for_intake_kinds = @('email', 'web_form')
          advanced_only = $false
          blocked = $false
          archive_marker_default = $true
          is_default = $true
        }
        [pscustomobject]@{
          filing_destination_id = 'issue_archive'
          display_label = 'Issue Archive'
          description = 'Archive destination for GitHub issue and PR intake'
          status = 'active'
          allowed_intake_kinds = @('github_issue', 'github_pr')
          default_for_intake_kinds = @('github_issue', 'github_pr')
          advanced_only = $false
          blocked = $false
          archive_marker_default = $true
          is_default = $false
        }
        [pscustomobject]@{
          filing_destination_id = 'provider_reference'
          display_label = 'Provider Reference'
          description = 'Advanced filing path for provider-supplied reference material'
          status = 'active'
          allowed_intake_kinds = @('email', 'manual')
          default_for_intake_kinds = @()
          advanced_only = $true
          blocked = $false
          archive_marker_default = $false
          is_default = $false
        }
      )
    }
  `
}

export async function validateCommand(input: CommandInput): Promise<unknown> {
  const psScript = `
    Set-StrictMode -Version Latest
    $ErrorActionPreference = 'Stop'

    . '${commandComposerScript}'

    ${buildRegistryBootstrapScript()}
    ${buildComposerStateScript(input)}

    $intent | ConvertTo-Json -Depth 10 -Compress
  `

  return runPowerShell(psScript)
}

export async function executeCommand(input: CommandInput): Promise<unknown> {
  const runtimeDir = escapePowerShellString(RUNTIME_DIR)

  const psScript = `
    Set-StrictMode -Version Latest
    $ErrorActionPreference = 'Stop'

    . '${commandComposerScript}'
    . '${recentActionsProjectionScript}'
    . '${noteProjectionScript}'
    . '${tagProjectionScript}'
    . '${auditSummaryProjectionScript}'

    $runtimeDir = '${runtimeDir}'
    $commandResultsPath = Join-Path $runtimeDir 'administrator_command_results.jsonl'
    $notesPath = Join-Path $runtimeDir 'administrator_notes.jsonl'
    $tagAssignmentsPath = Join-Path $runtimeDir 'administrator_tag_assignments.jsonl'
    $auditEventsPath = Join-Path $runtimeDir 'administrator_audit_events.jsonl'

    ${buildRegistryBootstrapScript()}
    ${buildComposerStateScript(input)}

    if ($intent.validation.validation_status -eq 'rejected') {
      [pscustomobject]@{
        result = $intent
        writeback = [pscustomobject]@{
          writeback_status = 'rejected'
          resulting_status = $null
          recent_actions_count = 0
          note_written = $false
          tags_written = 0
          queue_item_updated = $false
        }
      } | ConvertTo-Json -Depth 10 -Compress
      return
    }

    $occurredAt = New-AdministratorUtcTimestamp
    $resultingStatus = switch ($intent.resolved_action_id) {
      'route_to_orchestrator' { 'routed' }
      'archive' { 'archived' }
      'hold' { 'hold' }
      'request_approval' { 'pending_approval' }
      'waiting_on_provider' { 'waiting_on_provider' }
      'waiting_on_human' { 'waiting_on_human' }
      'add_note' { 'noted' }
      'tag_item' { 'tagged' }
      default { 'accepted' }
    }

    $summaryAction = if ($intent.resolved_action_label) {
      [string]$intent.resolved_action_label
    } elseif ($intent.resolved_action_id) {
      [string]$intent.resolved_action_id
    } else {
      [string]$intent.action_input
    }

    $commandResult = [pscustomobject]@{
      command_id = $intent.command_id
      intake_id = $intent.selected_intake_id
      action_id = $intent.resolved_action_id
      validation_status = $intent.validation.validation_status
      resulting_status = $resultingStatus
      occurred_at = $occurredAt
      audit_id = "audit_$($intent.command_id)"
      summary_label = "$summaryAction -> $resultingStatus"
      created_at = $intent.created_at
      requested_by = $intent.requested_by
    }

    Append-JsonLine -PathText $commandResultsPath -Value $commandResult
    $commandResults = @(Read-JsonLines -PathText $commandResultsPath)
    $recentActionsProjection = Write-AdministratorRecentActionsProjection -CommandResults $commandResults -RuntimeDir $runtimeDir

    $primaryEventFamily = switch ($intent.resolved_action_id) {
      'add_note' { 'note' }
      'tag_item' { 'tag' }
      default { 'status_transition' }
    }
    $primaryTargetLabel = if (-not [string]::IsNullOrWhiteSpace([string]$intent.resolved_queue_target_id)) {
      [string]$intent.resolved_queue_target_id
    } elseif ($primaryEventFamily -eq 'tag' -and @($intent.tags).Count -gt 0) {
      @($intent.tags) -join ', '
    } else {
      ''
    }
    $primaryStatusDelta = if ($primaryEventFamily -eq 'status_transition') {
      [string]$resultingStatus
    } else {
      ''
    }
    $auditEventsToAppend = @(
      [pscustomobject]@{
        event_id = $commandResult.audit_id
        event_type = 'administrator.command.executed'
        event_family = $primaryEventFamily
        intake_id = $intent.selected_intake_id
        summary_label = $commandResult.summary_label
        actor_label = $intent.requested_by
        occurred_at = $occurredAt
        status_delta = $primaryStatusDelta
        target_label = $primaryTargetLabel
      }
    )

    $noteWritten = $false
    if (-not [string]::IsNullOrWhiteSpace($intent.note_text)) {
      $noteRecord = [pscustomobject]@{
        note_id = "note_$($intent.command_id)"
        intake_id = $intent.selected_intake_id
        body_text = $intent.note_text
        authorship_class = 'operator'
        authored_by = $intent.requested_by
        created_at = $occurredAt
        visibility = 'desk'
        source_action_id = if ($intent.resolved_action_id) { $intent.resolved_action_id } else { $intent.action_input }
        display_author_label = $intent.requested_by
      }
      Append-JsonLine -PathText $notesPath -Value $noteRecord
      $allNotes = @(Read-JsonLines -PathText $notesPath)
      Write-AdministratorNoteProjection -Notes $allNotes -VisibilityContext 'desk' -RuntimeDir $runtimeDir | Out-Null
      $noteWritten = $true

      if ($intent.resolved_action_id -ne 'add_note') {
        $auditEventsToAppend += [pscustomobject]@{
          event_id = "note_$($intent.command_id)"
          event_type = 'administrator.note.created'
          event_family = 'note'
          intake_id = $intent.selected_intake_id
          summary_label = 'Note added'
          actor_label = $intent.requested_by
          occurred_at = $occurredAt
          status_delta = ''
          target_label = ''
        }
      }
    }

    $tagWriteCount = 0
    if (@($intent.tags).Count -gt 0) {
      $tagIndex = 0
      foreach ($tagLabel in @($intent.tags)) {
        $tagIndex += 1
        $normalizedTag = Normalize-AdministratorToken -Value $tagLabel
        $tagRecord = [pscustomobject]@{
          tag_assignment_id = "tag_$($intent.command_id)_$tagIndex"
          intake_id = $intent.selected_intake_id
          tag_id = $normalizedTag
          tag_label = [string]$tagLabel
          tag_class = 'operator_freeform'
          source = 'administrator_app'
          applied_by = $intent.requested_by
          applied_at = $occurredAt
          is_default = $false
          is_suggested = $false
        }
        Append-JsonLine -PathText $tagAssignmentsPath -Value $tagRecord
        $tagWriteCount += 1
      }

      $allTagAssignments = @(Read-JsonLines -PathText $tagAssignmentsPath)
      Write-AdministratorTagProjection -TagAssignments $allTagAssignments -RuntimeDir $runtimeDir | Out-Null

      if ($intent.resolved_action_id -ne 'tag_item') {
        $auditEventsToAppend += [pscustomobject]@{
          event_id = "tag_$($intent.command_id)"
          event_type = 'administrator.tag.assignment'
          event_family = 'tag'
          intake_id = $intent.selected_intake_id
          summary_label = 'Tags updated'
          actor_label = $intent.requested_by
          occurred_at = $occurredAt
          status_delta = ''
          target_label = @($intent.tags) -join ', '
        }
      }
    }

    foreach ($auditEvent in @($auditEventsToAppend)) {
      Append-JsonLine -PathText $auditEventsPath -Value $auditEvent
    }
    $auditEvents = @(Read-JsonLines -PathText $auditEventsPath)
    Write-AdministratorAuditSummaryProjection -AuditEvents $auditEvents -RuntimeDir $runtimeDir | Out-Null

    [pscustomobject]@{
      result = $intent
      writeback = [pscustomobject]@{
        writeback_status = 'accepted'
        resulting_status = $resultingStatus
        recent_actions_count = @($recentActionsProjection.recent_actions).Count
        note_written = $noteWritten
        tags_written = $tagWriteCount
        queue_item_updated = $false
      }
    } | ConvertTo-Json -Depth 10 -Compress
  `

  const response = (await runPowerShell(psScript)) as ExecuteCommandResponse

  if (response.writeback.writeback_status === 'accepted') {
    response.writeback.queue_item_updated = await updateQueueProjection(response)
  }

  return response
}

export async function getComposerOptions(): Promise<unknown> {
  const psScript = `
    Set-StrictMode -Version Latest
    $ErrorActionPreference = 'Stop'

    . '${commandComposerScript}'

    ${buildRegistryBootstrapScript()}

    $state = New-AdministratorCommandComposerState -ActionRegistry $actionRegistry -TargetRegistry $targetRegistry

    [pscustomobject]@{
      available_actions = $state.available_actions
      available_targets = $state.available_targets
    } | ConvertTo-Json -Depth 5 -Compress
  `

  return runPowerShell(psScript)
}

export async function getFilingOptions(intakeId: string): Promise<unknown> {
  const runtimeDir = escapePowerShellString(RUNTIME_DIR)

  const psScript = `
    Set-StrictMode -Version Latest
    $ErrorActionPreference = 'Stop'

    . '${filingPickerReadScript}'

    $runtimeDir = '${runtimeDir}'
    $queueProjectionPath = Join-Path $runtimeDir 'administrator_intake_queue.json'

    if (-not (Test-Path $queueProjectionPath)) {
      throw 'Administrator intake queue projection is not available.'
    }

    $queueProjection = Get-Content $queueProjectionPath -Raw | ConvertFrom-Json
    $intakeItem = @($queueProjection.queue_items) | Where-Object { $_.intake_id -eq '${escapePowerShellString(intakeId)}' } | Select-Object -First 1

    if ($null -eq $intakeItem) {
      throw 'Selected intake item is not present in the active intake queue projection.'
    }

    ${buildFilingDestinationRegistryScript()}

    $model = New-AdministratorFilingPickerReadModel -IntakeItem $intakeItem -DestinationRegistry $destinationRegistry
    $model | ConvertTo-Json -Depth 10 -Compress
  `

  return runPowerShell(psScript)
}

export async function recordFiling(
  input: RecordFilingInput
): Promise<RecordFilingResponse> {
  const runtimeDir = escapePowerShellString(RUNTIME_DIR)
  const archiveMarkerSwitch =
    input.archive_marker === undefined
      ? ''
      : ` -ArchiveMarker:$${input.archive_marker ? 'true' : 'false'}`

  const psScript = `
    Set-StrictMode -Version Latest
    $ErrorActionPreference = 'Stop'

    . '${filingPickerReadScript}'
    . '${filingWritebackScript}'
    . '${filingHistoryProjectionScript}'
    . '${auditSummaryProjectionScript}'

    $runtimeDir = '${runtimeDir}'
    $queueProjectionPath = Join-Path $runtimeDir 'administrator_intake_queue.json'
    $filingHistoryPath = Join-Path $runtimeDir 'administrator_filing_history.jsonl'
    $auditEventsPath = Join-Path $runtimeDir 'administrator_audit_events.jsonl'

    if (-not (Test-Path $queueProjectionPath)) {
      throw 'Administrator intake queue projection is not available.'
    }

    $queueProjection = Get-Content $queueProjectionPath -Raw | ConvertFrom-Json
    $intakeItem = @($queueProjection.queue_items) | Where-Object { $_.intake_id -eq '${escapePowerShellString(input.intake_id)}' } | Select-Object -First 1

    if ($null -eq $intakeItem) {
      [pscustomobject]@{
        writeback = [pscustomobject]@{
          writeback_status = 'rejected'
          intake_id = '${escapePowerShellString(input.intake_id)}'
          filing_record_id = $null
          filing_destination_id = $null
          filing_history_count = 0
          rejection_reason = 'active_intake_not_found'
        }
      } | ConvertTo-Json -Depth 10 -Compress
      return
    }

    ${buildFilingDestinationRegistryScript()}

    $model = New-AdministratorFilingPickerReadModel -IntakeItem $intakeItem -DestinationRegistry $destinationRegistry
    $destination = @($model.destinations) | Where-Object { $_.filing_destination_id -eq '${escapePowerShellString(input.filing_destination_id)}' } | Select-Object -First 1

    if ($null -eq $destination) {
      [pscustomobject]@{
        writeback = [pscustomobject]@{
          writeback_status = 'rejected'
          intake_id = '${escapePowerShellString(input.intake_id)}'
          filing_record_id = $null
          filing_destination_id = '${escapePowerShellString(input.filing_destination_id)}'
          filing_history_count = 0
          rejection_reason = 'filing_destination_not_found'
        }
      } | ConvertTo-Json -Depth 10 -Compress
      return
    }

    $writeback = Invoke-AdministratorFilingWriteback -IntakeItem $intakeItem -Destination $destination -RequestedBy 'operator:d' -Reason '${escapePowerShellString(input.reason ?? '')}'${archiveMarkerSwitch}

    if ($writeback.writeback_status -ne 'accepted') {
      [pscustomobject]@{
        writeback = [pscustomobject]@{
          writeback_status = 'rejected'
          intake_id = '${escapePowerShellString(input.intake_id)}'
          filing_record_id = $null
          filing_destination_id = '${escapePowerShellString(input.filing_destination_id)}'
          filing_history_count = 0
          rejection_reason = $writeback.rejection_reason
        }
      } | ConvertTo-Json -Depth 10 -Compress
      return
    }

    Append-JsonLine -PathText $filingHistoryPath -Value $writeback.filing_record
    $filingHistory = @(Read-JsonLines -PathText $filingHistoryPath)
    $projection = Write-AdministratorFilingHistoryProjection -FilingHistory $filingHistory -RuntimeDir $runtimeDir
    Append-JsonLine -PathText $auditEventsPath -Value $writeback.audit_event
    $auditEvents = @(Read-JsonLines -PathText $auditEventsPath)
    Write-AdministratorAuditSummaryProjection -AuditEvents $auditEvents -RuntimeDir $runtimeDir | Out-Null

    [pscustomobject]@{
      writeback = [pscustomobject]@{
        writeback_status = 'accepted'
        intake_id = $writeback.filing_record.intake_id
        filing_record_id = $writeback.filing_record.filing_record_id
        filing_destination_id = $writeback.filing_record.filing_destination_id
        filing_history_count = @($projection.filing_history).Count
      }
      filing_record = $writeback.filing_record
    } | ConvertTo-Json -Depth 10 -Compress
  `

  return runPowerShell(psScript) as Promise<RecordFilingResponse>
}

export async function reopenInactiveIntake(
  input: ReopenInactiveInput
): Promise<ReopenInactiveResponse> {
  const runtimeDir = escapePowerShellString(RUNTIME_DIR)

  const psScript = `
    Set-StrictMode -Version Latest
    $ErrorActionPreference = 'Stop'

    . '${reopenWritebackScript}'
    . '${recentActionsProjectionScript}'
    . '${auditSummaryProjectionScript}'

    $runtimeDir = '${runtimeDir}'
    $inactiveProjectionPath = Join-Path $runtimeDir 'administrator_inactive_intake_projection.json'
    $commandResultsPath = Join-Path $runtimeDir 'administrator_command_results.jsonl'
    $auditEventsPath = Join-Path $runtimeDir 'administrator_audit_events.jsonl'

    if (-not (Test-Path $inactiveProjectionPath)) {
      throw 'Inactive intake projection is not available.'
    }

    $inactiveProjection = Get-Content $inactiveProjectionPath -Raw | ConvertFrom-Json
    $inactiveItem = @($inactiveProjection.inactive_items) | Where-Object { $_.intake_id -eq '${escapePowerShellString(input.intake_id)}' } | Select-Object -First 1

    if ($null -eq $inactiveItem) {
      [pscustomobject]@{
        writeback = [pscustomobject]@{
          writeback_status = 'rejected'
          intake_id = '${escapePowerShellString(input.intake_id)}'
          restored_status = $null
          recent_actions_count = 0
          queue_item_updated = $false
          inactive_item_removed = $false
          rejection_reason = 'inactive_item_not_found'
        }
      } | ConvertTo-Json -Depth 10 -Compress
      return
    }

    $runtimeItem = [pscustomobject]@{
      intake_id = $inactiveItem.intake_id
      title = $inactiveItem.title
      status = $inactiveItem.inactive_status
      inactive_status = $inactiveItem.inactive_status
      inactive_since = $inactiveItem.inactive_since
      last_active_status = $inactiveItem.last_active_status
      reopen_allowed = $inactiveItem.reopen_allowed
      reopen_target_status = $inactiveItem.reopen_target_status
      summary_label = $inactiveItem.summary_label
    }

    $reopen = Invoke-AdministratorReopenWriteback -IntakeItem $runtimeItem -RequestedRestoredStatus '${escapePowerShellString(input.restored_status ?? 'queued')}' -RequestedBy 'operator:d' -ReopenReason '${escapePowerShellString(input.reopen_reason ?? '')}'

    if ($reopen.writeback_status -ne 'accepted') {
      [pscustomobject]@{
        writeback = [pscustomobject]@{
          writeback_status = 'rejected'
          intake_id = $runtimeItem.intake_id
          restored_status = $null
          recent_actions_count = 0
          queue_item_updated = $false
          inactive_item_removed = $false
          rejection_reason = $reopen.rejection_reason
        }
      } | ConvertTo-Json -Depth 10 -Compress
      return
    }

    $commandResult = [pscustomobject]@{
      command_id = $reopen.reopen_request.reopen_request_id
      intake_id = $reopen.updated_intake.intake_id
      action_id = 'reopen'
      validation_status = 'accepted'
      resulting_status = [string]$reopen.updated_intake.status
      occurred_at = $reopen.audit_event.reopened_at
      audit_id = $reopen.audit_event.reopen_event_id
      summary_label = "Reopen -> $([string]$reopen.updated_intake.status)"
      created_at = $reopen.reopen_request.requested_at
      requested_by = $reopen.reopen_request.requested_by
    }

    Append-JsonLine -PathText $commandResultsPath -Value $commandResult
    $commandResults = @(Read-JsonLines -PathText $commandResultsPath)
    $recentActionsProjection = Write-AdministratorRecentActionsProjection -CommandResults $commandResults -RuntimeDir $runtimeDir

    $auditEvent = [pscustomobject]@{
      event_id = $reopen.audit_event.reopen_event_id
      event_type = 'administrator.intake.reopened'
      event_family = 'reopen'
      intake_id = $reopen.updated_intake.intake_id
      summary_label = "Reopened -> $([string]$reopen.updated_intake.status)"
      actor_label = $reopen.audit_event.reopened_by
      occurred_at = $reopen.audit_event.reopened_at
      status_delta = "$([string]$reopen.audit_event.previous_status) -> $([string]$reopen.audit_event.restored_status)"
      target_label = [string]$reopen.audit_event.restored_status
    }
    Append-JsonLine -PathText $auditEventsPath -Value $auditEvent
    $auditEvents = @(Read-JsonLines -PathText $auditEventsPath)
    Write-AdministratorAuditSummaryProjection -AuditEvents $auditEvents -RuntimeDir $runtimeDir | Out-Null

    [pscustomobject]@{
      writeback = [pscustomobject]@{
        writeback_status = 'accepted'
        intake_id = $reopen.updated_intake.intake_id
        restored_status = [string]$reopen.updated_intake.status
        recent_actions_count = @($recentActionsProjection.recent_actions).Count
        queue_item_updated = $false
        inactive_item_removed = $false
      }
      updated_intake = $reopen.updated_intake
    } | ConvertTo-Json -Depth 10 -Compress
  `

  const response = (await runPowerShell(psScript)) as ReopenInactiveResponse

  if (response.writeback.writeback_status === 'accepted' && response.updated_intake) {
    response.writeback.queue_item_updated = await reopenIntoQueueProjection(response.updated_intake)
    response.writeback.inactive_item_removed = await removeFromInactiveProjection(
      response.writeback.intake_id
    )
  }

  return response
}

export async function recordTandemLaunchIntent(
  input: RecordTandemLaunchIntentInput
): Promise<RecordTandemLaunchIntentResponse> {
  const runtimeDir = escapePowerShellString(RUNTIME_DIR)
  const occurredAt = new Date().toISOString()
  const eventId = `tandem_launch_${Date.now()}`
  const intakeId = escapePowerShellString(input.intake_id ?? '')
  const targetPresetId = escapePowerShellString(input.target_preset_id ?? '')
  const targetLabel = escapePowerShellString(input.target_label ?? '')
  const launchUrl = escapePowerShellString(input.launch_url ?? '')
  const attachmentId = escapePowerShellString(input.attachment_id ?? '')
  const handoffNote = escapePowerShellString(input.handoff_note ?? '')

  const psScript = `
    Set-StrictMode -Version Latest
    $ErrorActionPreference = 'Stop'

    . '${commonScript}'
    . '${auditSummaryProjectionScript}'

    $runtimeDir = '${runtimeDir}'
    $auditEventsPath = Join-Path $runtimeDir 'administrator_audit_events.jsonl'

    $event = [pscustomobject]@{
      event_id = '${eventId}'
      event_type = 'administrator.tandem.launch'
      event_family = 'provider_handoff'
      intake_id = '${intakeId}'
      summary_label = 'Opened Tandem handoff'
      actor_label = 'operator:d'
      occurred_at = '${escapePowerShellString(occurredAt)}'
      status_delta = if ([string]::IsNullOrWhiteSpace('${attachmentId}')) { '' } else { 'attachment_review' }
      target_label = if ([string]::IsNullOrWhiteSpace('${targetLabel}')) { '${targetPresetId}' } else { '${targetLabel}' }
      target_preset_id = '${targetPresetId}'
      launch_url = '${launchUrl}'
      attachment_id = '${attachmentId}'
      handoff_note = '${handoffNote}'
    }

    Append-JsonLine -PathText $auditEventsPath -Value $event
    $auditEvents = @(Read-JsonLines -PathText $auditEventsPath)
    $projection = Write-AdministratorAuditSummaryProjection -AuditEvents $auditEvents -RuntimeDir $runtimeDir

    [pscustomobject]@{
      writeback = [pscustomobject]@{
        writeback_status = 'accepted'
        event_id = '${eventId}'
        intake_id = if ([string]::IsNullOrWhiteSpace('${intakeId}')) { $null } else { '${intakeId}' }
        target_label = if ([string]::IsNullOrWhiteSpace('${targetLabel}')) { if ([string]::IsNullOrWhiteSpace('${targetPresetId}')) { $null } else { '${targetPresetId}' } } else { '${targetLabel}' }
        audit_summary_count = @($projection.rows).Count
      }
    } | ConvertTo-Json -Depth 10 -Compress
  `

  return runPowerShell(psScript) as Promise<RecordTandemLaunchIntentResponse>
}

export async function recordProviderFollowUpCompletion(
  input: RecordProviderFollowUpCompletionInput
): Promise<RecordProviderFollowUpCompletionResponse> {
  const runtimeDir = escapePowerShellString(RUNTIME_DIR)
  const occurredAt = new Date().toISOString()
  const eventId = `provider_follow_up_${Date.now()}`
  const intakeId = escapePowerShellString(input.intake_id)
  const targetPresetId = escapePowerShellString(input.target_preset_id ?? '')
  const targetLabel = escapePowerShellString(input.target_label ?? '')
  const completionNote = escapePowerShellString(input.completion_note ?? '')

  const psScript = `
    Set-StrictMode -Version Latest
    $ErrorActionPreference = 'Stop'

    . '${commonScript}'
    . '${auditSummaryProjectionScript}'

    $runtimeDir = '${runtimeDir}'
    $auditEventsPath = Join-Path $runtimeDir 'administrator_audit_events.jsonl'

    $event = [pscustomobject]@{
      event_id = '${eventId}'
      event_type = 'administrator.provider.follow_up_completed'
      event_family = 'provider_follow_up'
      intake_id = '${intakeId}'
      summary_label = 'Completed provider follow-up'
      actor_label = 'operator:d'
      occurred_at = '${escapePowerShellString(occurredAt)}'
      status_delta = 'completed'
      target_label = if ([string]::IsNullOrWhiteSpace('${targetLabel}')) { if ([string]::IsNullOrWhiteSpace('${targetPresetId}')) { '' } else { '${targetPresetId}' } } else { '${targetLabel}' }
      target_preset_id = '${targetPresetId}'
      handoff_note = '${completionNote}'
    }

    Append-JsonLine -PathText $auditEventsPath -Value $event
    $auditEvents = @(Read-JsonLines -PathText $auditEventsPath)
    $projection = Write-AdministratorAuditSummaryProjection -AuditEvents $auditEvents -RuntimeDir $runtimeDir

    [pscustomobject]@{
      writeback = [pscustomobject]@{
        writeback_status = 'accepted'
        event_id = '${eventId}'
        intake_id = '${intakeId}'
        target_label = if ([string]::IsNullOrWhiteSpace('${targetLabel}')) { if ([string]::IsNullOrWhiteSpace('${targetPresetId}')) { $null } else { '${targetPresetId}' } } else { '${targetLabel}' }
        audit_summary_count = @($projection.rows).Count
      }
    } | ConvertTo-Json -Depth 10 -Compress
  `

  return runPowerShell(psScript) as Promise<RecordProviderFollowUpCompletionResponse>
}

function runPowerShell(script: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const ps = spawn(
      'powershell.exe',
      [
        '-NoProfile',
        '-NonInteractive',
        '-ExecutionPolicy',
        'Bypass',
        '-Command',
        script,
      ],
      {
        stdio: ['ignore', 'pipe', 'pipe'],
        timeout: 15000,
      }
    )

    let stdout = ''
    let stderr = ''

    ps.stdout.on('data', (data: Buffer) => {
      stdout += data.toString()
    })
    ps.stderr.on('data', (data: Buffer) => {
      stderr += data.toString()
    })

    ps.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`PowerShell exited with code ${code}: ${stderr || stdout}`))
        return
      }

      try {
        resolve(JSON.parse(stdout.trim()))
      } catch {
        reject(new Error(`Failed to parse PowerShell output: ${stdout.slice(0, 500)}`))
      }
    })

    ps.on('error', (err) => {
      reject(new Error(`Failed to spawn PowerShell: ${err.message}`))
    })
  })
}

async function updateQueueProjection(
  response: ExecuteCommandResponse
): Promise<boolean> {
  const queueProjectionPath = path.join(RUNTIME_DIR, 'administrator_intake_queue.json')

  let projection: IntakeQueueProjection
  try {
    projection = JSON.parse(await readFile(queueProjectionPath, 'utf-8')) as IntakeQueueProjection
  } catch {
    return false
  }

  const intakeId = response.result.selected_intake_id
  const itemIndex = projection.queue_items.findIndex((item) => item.intake_id === intakeId)
  if (itemIndex === -1) {
    return false
  }

  const currentItem = projection.queue_items[itemIndex]
  const nextStatus = deriveQueueStatus(currentItem.status, response.result.resolved_action_id)
  const nextRoutingTarget =
    response.result.resolved_queue_target_id || currentItem.routing_target || ''
  const nextTags = Array.from(new Set([...(currentItem.tags ?? []), ...response.result.tags]))

  projection.queue_items[itemIndex] = {
    ...currentItem,
    status: nextStatus,
    routing_target: nextRoutingTarget,
    tags: nextTags,
  }
  projection.generated_at = new Date().toISOString()
  if (projection.staleness) {
    projection.staleness = {
      status: 'fresh',
      reason: null,
    }
  }
  projection.count = projection.queue_items.length

  await writeFile(queueProjectionPath, `${JSON.stringify(projection, null, 2)}\n`, 'utf-8')
  return true
}

function deriveQueueStatus(currentStatus: string, actionId: string | null): string {
  switch (actionId) {
    case 'route_to_orchestrator':
      return 'routed'
    case 'archive':
      return 'archived'
    case 'hold':
      return 'hold'
    case 'request_approval':
      return 'pending_approval'
    case 'waiting_on_provider':
      return 'waiting_on_provider'
    case 'waiting_on_human':
      return 'waiting_on_human'
    case 'add_note':
    case 'tag_item':
      return currentStatus
    default:
      return currentStatus
  }
}

async function reopenIntoQueueProjection(updatedIntake: Record<string, unknown>): Promise<boolean> {
  const queueProjectionPath = path.join(RUNTIME_DIR, 'administrator_intake_queue.json')

  let projection: IntakeQueueProjection
  try {
    projection = JSON.parse(await readFile(queueProjectionPath, 'utf-8')) as IntakeQueueProjection
  } catch {
    return false
  }

  const intakeId = String(updatedIntake.intake_id ?? '')
  if (!intakeId) {
    return false
  }

  const nextItem: IntakeQueueItem = {
    intake_id: intakeId,
    title: String(updatedIntake.title ?? intakeId),
    intake_kind: String(updatedIntake.intake_kind ?? 'manual'),
    received_at: String(
      updatedIntake.received_at ?? updatedIntake.updated_at ?? new Date().toISOString()
    ),
    status: String(updatedIntake.status ?? 'queued'),
    routing_target: String(updatedIntake.routing_target ?? ''),
    trust_tier: String(updatedIntake.trust_tier ?? 'internal'),
    priority_hint: String(updatedIntake.priority_hint ?? 'normal'),
    tags: Array.isArray(updatedIntake.tags)
      ? updatedIntake.tags.map((tag) => String(tag))
      : [],
    warning_state: String(updatedIntake.warning_state ?? 'clean'),
    warning_count: Number(updatedIntake.warning_count ?? 0),
    summary_label: String(
      updatedIntake.summary_label ??
        `Reopened from ${String(updatedIntake.last_active_status ?? updatedIntake.inactive_status ?? 'inactive')}`
    ),
  }

  const existingIndex = projection.queue_items.findIndex((item) => item.intake_id === intakeId)
  if (existingIndex >= 0) {
    projection.queue_items[existingIndex] = {
      ...projection.queue_items[existingIndex],
      ...nextItem,
    }
  } else {
    projection.queue_items = [nextItem, ...projection.queue_items]
  }

  projection.generated_at = new Date().toISOString()
  if (projection.staleness) {
    projection.staleness = {
      status: 'fresh',
      reason: null,
    }
  }
  projection.count = projection.queue_items.length

  await writeFile(queueProjectionPath, `${JSON.stringify(projection, null, 2)}\n`, 'utf-8')
  return true
}

async function removeFromInactiveProjection(intakeId: string): Promise<boolean> {
  const inactiveProjectionPath = path.join(
    RUNTIME_DIR,
    'administrator_inactive_intake_projection.json'
  )

  let projection: InactiveIntakeProjection
  try {
    projection = JSON.parse(
      await readFile(inactiveProjectionPath, 'utf-8')
    ) as InactiveIntakeProjection
  } catch {
    return false
  }

  const nextItems = projection.inactive_items.filter((item) => item.intake_id !== intakeId)
  if (nextItems.length === projection.inactive_items.length) {
    return false
  }

  projection.inactive_items = nextItems
  projection.generated_at = new Date().toISOString()
  projection.count = nextItems.length

  await writeFile(inactiveProjectionPath, `${JSON.stringify(projection, null, 2)}\n`, 'utf-8')
  return true
}
