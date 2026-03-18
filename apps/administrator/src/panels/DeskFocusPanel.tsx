import { useState } from 'react'
import { publishClaimFocus, publishIntakeFocus } from '@/api/focus'
import { claimQueueTask, completeQueueClaim } from '@/api/queue'
import { useDeskFocusStore } from '@/store/deskFocusStore'
import { useIntakeStore } from '@/store/intakeStore'
import { useQueueActivityStore } from '@/store/queueActivityStore'
import { useWorkspaceActivityStore } from '@/store/workspaceActivityStore'

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
  const [pendingAction, setPendingAction] = useState<'claim' | 'complete' | 'focus' | null>(null)
  const selection = useDeskFocusStore((state) => state.selection)
  const generatedAt = useDeskFocusStore((state) => state.generatedAt)
  const setProjection = useDeskFocusStore((state) => state.setProjection)
  const fetchQueueActivity = useQueueActivityStore((state) => state.fetch)
  const readyTasks = useQueueActivityStore((state) => state.readyTasks)
  const activeClaims = useQueueActivityStore((state) => state.activeClaims)
  const refreshWorkspaceActivity = useWorkspaceActivityStore((state) => state.fetch)
  const selectedIntakeId = useIntakeStore((state) => state.selectedId)
  const selectedIntake = useIntakeStore((state) =>
    state.items.find((item) => item.intake_id === state.selectedId) ?? null
  )
  const focusedReadyTask =
    selection?.focus_kind === 'ready_task'
      ? readyTasks.find((task) => task.task_id === selection.task_id) ?? null
      : null
  const focusedClaim =
    selection?.focus_kind === 'claim'
      ? activeClaims.find((claim) => claim.claim_id === selection.claim_id) ?? null
      : null
  const implicitReadyTask =
    !selection && !selectedIntakeId ? readyTasks[0] ?? null : null

  async function handleRefocusIntake() {
    setPendingAction('focus')
    try {
      const projection = await publishIntakeFocus(selectedIntakeId ?? null)
      setProjection(projection)
    } finally {
      setPendingAction(null)
    }
  }

  async function handleClaimFocusedTask() {
    if (!focusedReadyTask) {
      return
    }

    setPendingAction('claim')
    try {
      const response = await claimQueueTask(focusedReadyTask)
      await Promise.all([fetchQueueActivity(), refreshWorkspaceActivity()])
      const projection = await publishClaimFocus({
        claim_id: response.writeback.claim_id,
        title: focusedReadyTask.title,
        owner: response.writeback.owner,
        status: 'active',
        paths: [focusedReadyTask.file_path],
        file_path: focusedReadyTask.file_path,
      })
      setProjection(projection)
    } finally {
      setPendingAction(null)
    }
  }

  async function handleCompleteFocusedClaim() {
    if (!focusedClaim) {
      return
    }

    setPendingAction('complete')
    try {
      await completeQueueClaim(focusedClaim.claim_id)
      await Promise.all([fetchQueueActivity(), refreshWorkspaceActivity()])
      const projection = await publishIntakeFocus(selectedIntakeId ?? null)
      setProjection(projection)
    } finally {
      setPendingAction(null)
    }
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
      ) : implicitReadyTask ? (
        <div className="space-y-2 text-[12px] text-ohmic-text-dim">
          <div className="rounded border border-ohmic-warning/30 bg-ohmic-warning/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-ohmic-warning">
            Implicit queue priority
          </div>
          <div className="text-sm leading-6 text-ohmic-text">{implicitReadyTask.title}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <div>
              Task <span className="text-ohmic-text">{implicitReadyTask.task_id}</span>
            </div>
            <div>
              Priority <span className="text-ohmic-text">{implicitReadyTask.priority}</span>
            </div>
          </div>
          <div>
            Path <span className="text-ohmic-text">{formatFocusPath(implicitReadyTask.file_path)}</span>
          </div>
        </div>
      ) : (
        <div className="text-sm text-ohmic-text-dim">
          No explicit desk focus has been published yet.
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-1">
        <button
          onClick={() => void handleRefocusIntake()}
          disabled={pendingAction !== null}
          className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
        >
          {pendingAction === 'focus'
            ? 'Updating focus...'
            : selectedIntakeId
              ? 'Refocus selected intake'
              : 'Clear explicit focus'}
        </button>
        {focusedReadyTask ? (
          <button
            onClick={() => void handleClaimFocusedTask()}
            disabled={pendingAction !== null}
            className="rounded border border-ohmic-accent/40 px-2.5 py-1 text-[11px] font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10 disabled:opacity-50"
          >
            {pendingAction === 'claim' ? 'Claiming...' : 'Claim focused task'}
          </button>
        ) : null}
        {implicitReadyTask ? (
          <div className="rounded border border-ohmic-accent/20 px-2.5 py-1 text-[11px] text-ohmic-text-dim">
            Live queue is currently driving the desk.
          </div>
        ) : null}
        {focusedClaim ? (
          <button
            onClick={() => void handleCompleteFocusedClaim()}
            disabled={pendingAction !== null}
            className="rounded border border-emerald-300/30 px-2.5 py-1 text-[11px] font-medium text-emerald-300 transition-colors hover:border-emerald-300 hover:bg-emerald-300/10 disabled:opacity-50"
          >
            {pendingAction === 'complete' ? 'Completing...' : 'Complete focused claim'}
          </button>
        ) : null}
        {selectedIntake ? (
          <div className="rounded border border-ohmic-accent/20 px-2.5 py-1 text-[11px] text-ohmic-text-dim">
            Working intake <span className="text-ohmic-text">{selectedIntake.title}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
