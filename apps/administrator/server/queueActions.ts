import { execFile } from 'child_process'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)
const agentClaimScript = 'B:\\ohmic\\tools\\sync\\agent-claim.ps1'

interface ClaimReadyTaskInput {
  task_id: string
  title: string
  project: string
  file_path: string
  owner?: string | null
}

interface CompleteClaimInput {
  claim_id: string
}

interface ReleaseClaimInput {
  claim_id: string
}

export interface ClaimReadyTaskResponse {
  writeback: {
    writeback_status: 'accepted'
    claim_id: string
    task_id: string
    owner: string
    claim_file_path: string
  }
}

export interface CompleteClaimResponse {
  writeback: {
    writeback_status: 'accepted'
    claim_id: string
    completed_claim_path: string
  }
}

export interface ReleaseClaimResponse {
  writeback: {
    writeback_status: 'accepted'
    claim_id: string
    released_claim_path: string
  }
}

function resolveOwner(owner?: string | null): string {
  const explicit = owner?.trim()
  if (explicit) {
    return explicit
  }
  return process.env.ADMINISTRATOR_ACTOR?.trim() || process.env.USERNAME || 'administrator'
}

function parseClaimResult(stdout: string): { claimId: string; filePath: string } {
  const lines = stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const createdLine = lines.find((line) => line.startsWith('Created claim '))
  const claimId = createdLine?.replace('Created claim ', '').trim()
  const filePath = lines[lines.length - 1]

  if (!claimId || !filePath) {
    throw new Error(`Failed to parse claim result: ${stdout}`)
  }

  return { claimId, filePath }
}

function parseCompleteResult(stdout: string): { claimId: string; filePath: string } {
  const lines = stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const completedLine = lines.find((line) => line.startsWith('Completed claim '))
  const claimId = completedLine?.replace('Completed claim ', '').trim()
  const filePath = lines[lines.length - 1]

  if (!claimId || !filePath) {
    throw new Error(`Failed to parse completed claim result: ${stdout}`)
  }

  return { claimId, filePath }
}

function parseReleaseResult(stdout: string): { claimId: string; filePath: string } {
  const lines = stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const releasedLine = lines.find((line) => line.startsWith('Released claim '))
  const claimId = releasedLine?.replace('Released claim ', '').trim()
  const filePath = lines[lines.length - 1]

  if (!claimId || !filePath) {
    throw new Error(`Failed to parse released claim result: ${stdout}`)
  }

  return { claimId, filePath }
}

export async function claimReadyTask(
  input: ClaimReadyTaskInput
): Promise<ClaimReadyTaskResponse> {
  const owner = resolveOwner(input.owner)
  const { stdout } = await execFileAsync(
    'powershell.exe',
    [
      '-NoProfile',
      '-NonInteractive',
      '-ExecutionPolicy',
      'Bypass',
      '-File',
      agentClaimScript,
      'claim',
      '-Owner',
      owner,
      '-Project',
      input.project,
      '-Task',
      input.title,
      '-Paths',
      input.file_path,
    ],
    {
      cwd: 'B:\\ohmic',
      windowsHide: true,
      maxBuffer: 1024 * 1024,
    }
  )

  const result = parseClaimResult(stdout)
  return {
    writeback: {
      writeback_status: 'accepted',
      claim_id: result.claimId,
      task_id: input.task_id,
      owner,
      claim_file_path: result.filePath,
    },
  }
}

export async function completeClaim(
  input: CompleteClaimInput
): Promise<CompleteClaimResponse> {
  const { stdout } = await execFileAsync(
    'powershell.exe',
    [
      '-NoProfile',
      '-NonInteractive',
      '-ExecutionPolicy',
      'Bypass',
      '-File',
      agentClaimScript,
      'complete',
      '-Id',
      input.claim_id,
    ],
    {
      cwd: 'B:\\ohmic',
      windowsHide: true,
      maxBuffer: 1024 * 1024,
    }
  )

  const result = parseCompleteResult(stdout)
  return {
    writeback: {
      writeback_status: 'accepted',
      claim_id: result.claimId,
      completed_claim_path: result.filePath,
    },
  }
}

export async function releaseClaim(
  input: ReleaseClaimInput
): Promise<ReleaseClaimResponse> {
  const { stdout } = await execFileAsync(
    'powershell.exe',
    [
      '-NoProfile',
      '-NonInteractive',
      '-ExecutionPolicy',
      'Bypass',
      '-File',
      agentClaimScript,
      'release',
      '-Id',
      input.claim_id,
    ],
    {
      cwd: 'B:\\ohmic',
      windowsHide: true,
      maxBuffer: 1024 * 1024,
    }
  )

  const result = parseReleaseResult(stdout)
  return {
    writeback: {
      writeback_status: 'accepted',
      claim_id: result.claimId,
      released_claim_path: result.filePath,
    },
  }
}
