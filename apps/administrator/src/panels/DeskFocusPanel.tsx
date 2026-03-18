import { publishIntakeFocus } from '@/api/focus'
import { useDeskFocusStore } from '@/store/deskFocusStore'
import { useIntakeStore } from '@/store/intakeStore'

function formatFocusPath(filePath: string | null): string {
  if (!filePath) {
    return '--'
  }

  const segments = filePath.split(/[\\/]+/)
  const fileName = segments[segments.length - 1] ?? filePath
  const parent = segments.length > 1 ? segments[segments.length - 2] : null
  return parent ? `${parent}/${fileName}` : fileName
}

function getFocusLabel(focusKind: 'intake' | 'ready_task' | 'claim' | null): string {
  switch (focusKind) {
    case 'intake':
      return 'Selected intake'
    case 'ready_task':
      return 'Queue task'
    case 'claim':
      return 'Active claim'
    default:
      return 'No explicit focus'
  }
}

export function DeskFocusPanel() {
  const selection = useDeskFocusStore((state) => state.selection)
  const generatedAt = useDeskFocusStore((state) => state.generatedAt)
  const setProjection = useDeskFocusStore((state) => state.setProjection)
  const selectedIntakeId = useIntakeStore((state) => state.selectedId)
  const selectedIntake = useIntakeStore((state) =>
    state.items.find((item) => item.intake_id === state.selectedId) ?? null
  )

  async function handleRefocusIntake() {
    const projection = await publishIntakeFocus(selectedIntakeId ?? null)
    setProjection(projection)
  }

  return (
    <div className="panel border-ohmic-accent/20 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-widest text-ohmic-accent">
            Desk Focus
          </div>
          <div className="text-sm text-ohmic-text">
            {getFocusLabel(selection?.focus_kind ?? null)}
          </div>
        </div>
        <div className="text-[11px] text-ohmic-text-dim">
          {generatedAt ? new Date(generatedAt).toLocaleTimeString() : '--'}
        </div>
      </div>

      {selection ? (
        <div className="space-y-2 text-[12px] text-ohmic-text-dim">
          {selection.title ? (
            <div className="text-sm leading-6 text-ohmic-text">{selection.title}</div>
          ) : null}
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {selection.selected_intake_id ? (
              <div>
                Intake <span className="text-ohmic-text">{selection.selected_intake_id}</span>
              </div>
            ) : null}
            {selection.task_id ? (
              <div>
                Task <span className="text-ohmic-text">{selection.task_id}</span>
              </div>
            ) : null}
            {selection.claim_id ? (
              <div>
                Claim <span className="text-ohmic-text">{selection.claim_id}</span>
              </div>
            ) : null}
          </div>
          {selection.file_path ? (
            <div>
              Path <span className="text-ohmic-text">{formatFocusPath(selection.file_path)}</span>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="text-sm text-ohmic-text-dim">
          No explicit desk focus has been published yet.
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-1">
        <button
          onClick={() => void handleRefocusIntake()}
          className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
        >
          {selectedIntakeId ? 'Refocus selected intake' : 'Clear explicit focus'}
        </button>
        {selectedIntake ? (
          <div className="rounded border border-ohmic-accent/20 px-2.5 py-1 text-[11px] text-ohmic-text-dim">
            Working intake <span className="text-ohmic-text">{selectedIntake.title}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
