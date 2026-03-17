import { writeFile } from 'fs/promises'
import path from 'path'
import { getAdministratorRuntimeDir } from './runtimeConfig.js'

interface FocusSelection {
  focus_kind: 'intake'
  selected_intake_id: string | null
  updated_at: string
  source: 'administrator_app'
}

export async function writeIntakeFocusSelection(
  intakeId: string | null
): Promise<FocusSelection> {
  const selection: FocusSelection = {
    focus_kind: 'intake',
    selected_intake_id: intakeId,
    updated_at: new Date().toISOString(),
    source: 'administrator_app',
  }

  const runtimeDir = getAdministratorRuntimeDir()
  const filePath = path.join(runtimeDir, 'administrator_focus_selection.json')
  await writeFile(filePath, `${JSON.stringify(selection, null, 2)}\n`, 'utf-8')

  return selection
}
