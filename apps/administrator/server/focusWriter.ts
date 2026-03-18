import { writeFile } from 'fs/promises'
import path from 'path'
import { getAdministratorRuntimeDir } from './runtimeConfig.js'

interface FocusSelection {
  focus_kind: 'intake' | 'ready_task' | 'claim'
  selected_intake_id: string | null
  task_id: string | null
  claim_id: string | null
  title: string | null
  file_path: string | null
  updated_at: string
  source: 'administrator_app'
}

interface FocusProjection {
  projection_name: 'administrator_focus_selection'
  generated_at: string
  selection: FocusSelection | null
}

function buildProjection(selection: FocusSelection | null): FocusProjection {
  return {
    projection_name: 'administrator_focus_selection',
    generated_at: new Date().toISOString(),
    selection,
  }
}

async function writeFocusProjection(selection: FocusSelection | null): Promise<FocusProjection> {
  const projection = buildProjection(selection)
  const runtimeDir = getAdministratorRuntimeDir()
  const filePath = path.join(runtimeDir, 'administrator_focus_selection.json')
  await writeFile(filePath, `${JSON.stringify(projection, null, 2)}\n`, 'utf-8')
  return projection
}

export async function writeIntakeFocusSelection(
  intakeId: string | null
): Promise<FocusProjection> {
  if (!intakeId) {
    return writeFocusProjection(null)
  }

  const selection: FocusSelection = {
    focus_kind: 'intake',
    selected_intake_id: intakeId,
    task_id: null,
    claim_id: null,
    title: null,
    file_path: null,
    updated_at: new Date().toISOString(),
    source: 'administrator_app',
  }

  return writeFocusProjection(selection)
}

export async function writeCurrentActionFocusSelection(input: {
  focus_kind: 'ready_task' | 'claim'
  task_id?: string | null
  claim_id?: string | null
  title?: string | null
  file_path?: string | null
}): Promise<FocusProjection> {
  const selection: FocusSelection = {
    focus_kind: input.focus_kind,
    selected_intake_id: null,
    task_id: input.focus_kind === 'ready_task' ? input.task_id ?? null : null,
    claim_id: input.focus_kind === 'claim' ? input.claim_id ?? null : null,
    title: input.title ?? null,
    file_path: input.file_path ?? null,
    updated_at: new Date().toISOString(),
    source: 'administrator_app',
  }

  return writeFocusProjection(selection)
}
