const DEFAULT_RUNTIME_DIR = 'B:\\ohmic\\generated\\agent-work\\runtime'
const DEFAULT_WORKSPACE_DIR = 'B:\\ohmic'

export function getAdministratorRuntimeDir(): string {
  const configured = process.env.ADMINISTRATOR_RUNTIME_DIR?.trim()
  return configured || DEFAULT_RUNTIME_DIR
}

export function getAdministratorWorkspaceDir(): string {
  const configured = process.env.ADMINISTRATOR_WORKSPACE_DIR?.trim()
  return configured || DEFAULT_WORKSPACE_DIR
}
