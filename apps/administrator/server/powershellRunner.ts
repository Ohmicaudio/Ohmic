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
const reopenWritebackScript = asPowerShellPath('reopen-writeback.ps1')

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

    $runtimeDir = '${runtimeDir}'
    $commandResultsPath = Join-Path $runtimeDir 'administrator_command_results.jsonl'
    $notesPath = Join-Path $runtimeDir 'administrator_notes.jsonl'
    $tagAssignmentsPath = Join-Path $runtimeDir 'administrator_tag_assignments.jsonl'

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
    }

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

export async function reopenInactiveIntake(
  input: ReopenInactiveInput
): Promise<ReopenInactiveResponse> {
  const runtimeDir = escapePowerShellString(RUNTIME_DIR)

  const psScript = `
    Set-StrictMode -Version Latest
    $ErrorActionPreference = 'Stop'

    . '${reopenWritebackScript}'
    . '${recentActionsProjectionScript}'

    $runtimeDir = '${runtimeDir}'
    $inactiveProjectionPath = Join-Path $runtimeDir 'administrator_inactive_intake_projection.json'
    $commandResultsPath = Join-Path $runtimeDir 'administrator_command_results.jsonl'

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
