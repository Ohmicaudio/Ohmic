import { spawn } from 'child_process'
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

const commandComposerScript = asPowerShellPath('command-composer.ps1')
const recentActionsProjectionScript = asPowerShellPath('recent-actions-projection.ps1')
const noteProjectionScript = asPowerShellPath('note-projection.ps1')
const tagProjectionScript = asPowerShellPath('tag-projection.ps1')

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
      }
    } | ConvertTo-Json -Depth 10 -Compress
  `

  return runPowerShell(psScript)
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
