const DEFAULT_RUNTIME_DIR = 'B:\\ohmic\\generated\\agent-work\\runtime'

export function getAdministratorRuntimeDir(): string {
  const configured = process.env.ADMINISTRATOR_RUNTIME_DIR?.trim()
  return configured || DEFAULT_RUNTIME_DIR
}
