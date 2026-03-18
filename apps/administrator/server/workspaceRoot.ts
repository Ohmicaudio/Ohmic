export function getAdministratorWorkspaceRoot(): string {
  return process.env.ADMINISTRATOR_WORKSPACE_ROOT?.trim() || 'B:\\ohmic'
}
