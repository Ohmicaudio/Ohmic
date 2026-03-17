import { spawn } from 'child_process'
import path from 'path'

const ADMIN_SCRIPTS_DIR = 'B:\\ohmic\\tools\\sync\\administrator'

interface ValidateCommandInput {
  intake_id: string
  action: string
  queue_target?: string
  note?: string
  tags?: string[]
}

/**
 * Runs the PowerShell command-composer validation pipeline.
 *
 * Spawns a PowerShell process that:
 * 1. Loads the command-composer script
 * 2. Creates a composer state from the input
 * 3. Converts it to an intent (running full validation)
 * 4. Returns the result as JSON
 */
export async function validateCommand(input: ValidateCommandInput): Promise<unknown> {
  const tagsArray = (input.tags ?? []).map((t) => `'${t.replace(/'/g, "''")}'`).join(',')
  const noteEscaped = (input.note ?? '').replace(/'/g, "''")
  const queueTarget = (input.queue_target ?? '').replace(/'/g, "''")

  // Build inline PowerShell script that uses the existing validation pipeline
  const psScript = `
    Set-StrictMode -Version Latest
    $ErrorActionPreference = 'Stop'

    . '${path.join(ADMIN_SCRIPTS_DIR, 'command-composer.ps1').replace(/\\/g, '\\\\')}'

    # Load action registry if it exists
    $actionRegistryPath = 'B:\\ohmic\\generated\\agent-work\\runtime\\administrator_action_registry.json'
    $actionRegistry = @()
    if (Test-Path $actionRegistryPath) {
      $actionRegistry = @((Get-Content $actionRegistryPath -Raw | ConvertFrom-Json).actions)
    } else {
      # Default canonical actions
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

    # Load target registry if it exists
    $targetRegistryPath = 'B:\\ohmic\\generated\\agent-work\\runtime\\administrator_target_registry.json'
    $targetRegistry = @()
    if (Test-Path $targetRegistryPath) {
      $targetRegistry = @((Get-Content $targetRegistryPath -Raw | ConvertFrom-Json).targets)
    } else {
      $targetRegistry = @(
        [pscustomobject]@{ queue_target_id = 'orchestrator'; display_label = 'Orchestrator'; status = 'active'; capability_flags = @('route','approve') }
        [pscustomobject]@{ queue_target_id = 'performer'; display_label = 'Performer'; status = 'active'; capability_flags = @('route') }
      )
    }

    $composerState = New-AdministratorCommandComposerState -SelectedIntakeId '${input.intake_id.replace(/'/g, "''")}' -ActionRegistry $actionRegistry -TargetRegistry $targetRegistry
    $composerState.action_input = '${input.action.replace(/'/g, "''")}'
    $composerState.note_text = '${noteEscaped}'
    $composerState.queue_target_id = '${queueTarget}'
    $composerState.tags = @(${tagsArray})

    $intent = Convert-AdministratorComposerStateToIntent -ComposerState $composerState -ActionRegistry $actionRegistry -TargetRegistry $targetRegistry

    $intent | ConvertTo-Json -Depth 10 -Compress
  `

  return runPowerShell(psScript)
}

/**
 * Gets the available actions and targets for the composer UI.
 */
export async function getComposerOptions(): Promise<unknown> {
  const psScript = `
    Set-StrictMode -Version Latest
    $ErrorActionPreference = 'Stop'

    . '${path.join(ADMIN_SCRIPTS_DIR, 'command-composer.ps1').replace(/\\/g, '\\\\')}'

    $actionRegistryPath = 'B:\\ohmic\\generated\\agent-work\\runtime\\administrator_action_registry.json'
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

    $targetRegistryPath = 'B:\\ohmic\\generated\\agent-work\\runtime\\administrator_target_registry.json'
    $targetRegistry = @()
    if (Test-Path $targetRegistryPath) {
      $targetRegistry = @((Get-Content $targetRegistryPath -Raw | ConvertFrom-Json).targets)
    } else {
      $targetRegistry = @(
        [pscustomobject]@{ queue_target_id = 'orchestrator'; display_label = 'Orchestrator'; status = 'active'; capability_flags = @('route','approve') }
        [pscustomobject]@{ queue_target_id = 'performer'; display_label = 'Performer'; status = 'active'; capability_flags = @('route') }
      )
    }

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
    const ps = spawn('powershell.exe', [
      '-NoProfile',
      '-NonInteractive',
      '-ExecutionPolicy', 'Bypass',
      '-Command', script,
    ], {
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 15000,
    })

    let stdout = ''
    let stderr = ''

    ps.stdout.on('data', (data: Buffer) => { stdout += data.toString() })
    ps.stderr.on('data', (data: Buffer) => { stderr += data.toString() })

    ps.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`PowerShell exited with code ${code}: ${stderr || stdout}`))
        return
      }
      try {
        const trimmed = stdout.trim()
        resolve(JSON.parse(trimmed))
      } catch {
        reject(new Error(`Failed to parse PowerShell output: ${stdout.slice(0, 500)}`))
      }
    })

    ps.on('error', (err) => {
      reject(new Error(`Failed to spawn PowerShell: ${err.message}`))
    })
  })
}
