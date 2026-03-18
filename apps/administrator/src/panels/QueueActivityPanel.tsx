import { useEffect, useMemo, useState } from 'react'
import { claimQueueTask, completeQueueClaim, releaseQueueClaim } from '@/api/queue'
import { publishClaimFocus, publishReadyTaskFocus } from '@/api/focus'
import { useQueueActivityStore } from '@/store/queueActivityStore'
import { useDeskFocusStore } from '@/store/deskFocusStore'
import { useWorkspaceActivityStore } from '@/store/workspaceActivityStore'

function formatTaskPath(filePath: string): string {
  const segments = filePath.split(/[\\/]+/)
  const fileName = segments[segments.length - 1] ?? filePath
  const parent = segments.length > 1 ? segments[segments.length - 2] : null
  return parent ? `${parent}/${fileName}` : fileName
}

function formatTaskDisplayTitle(title: string): string {
  return title.replace(/\bVs\b/g, 'vs')
}

function getPriorityBadge(priority: string): string {
  switch (priority) {
    case 'critical':
      return 'bg-rose-300/15 text-rose-300'
    case 'high':
      return 'bg-amber-300/15 text-amber-300'
    default:
      return 'bg-ohmic-border text-ohmic-text-dim'
  }
}

export function QueueActivityPanel() {
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null)
  const [pendingClaimId, setPendingClaimId] = useState<string | null>(null)
  const [pendingReleasedClaimId, setPendingReleasedClaimId] = useState<string | null>(null)
  const [showAllReadyTasks, setShowAllReadyTasks] = useState(false)
  const [showAllActiveClaims, setShowAllActiveClaims] = useState(false)
  const {
    generatedAt,
    readyTasks,
    readyCount,
    activeClaims,
    activeClaimCount,
    loading,
    error,
    fetch,
  } = useQueueActivityStore()
  const focusedSelection = useDeskFocusStore((state) => state.selection)
  const setDeskFocusProjection = useDeskFocusStore((state) => state.setProjection)
  const refreshWorkspaceActivity = useWorkspaceActivityStore((state) => state.fetch)

  useEffect(() => {
    void fetch()
    const timer = window.setInterval(() => {
      void fetch()
    }, 30000)

    return () => window.clearInterval(timer)
  }, [fetch])

  const claimByTaskPath = useMemo(() => {
    const lookup = new Map<string, (typeof activeClaims)[number]>()
    for (const claim of activeClaims) {
      for (const claimPath of claim.paths) {
        lookup.set(claimPath.toLowerCase(), claim)
      }
    }
    return lookup
  }, [activeClaims])
  const visibleReadyTasks = showAllReadyTasks ? readyTasks : readyTasks.slice(0, 4)
  const visibleActiveClaims = showAllActiveClaims ? activeClaims : activeClaims.slice(0, 3)

  async function handleClaimTask(task: (typeof readyTasks)[number]) {
    setPendingTaskId(task.task_id)
    try {
      await claimQueueTask(task)
      await Promise.all([fetch(), refreshWorkspaceActivity()])
    } finally {
      setPendingTaskId(null)
    }
  }

  async function handleCompleteClaim(claimId: string) {
    setPendingClaimId(claimId)
    try {
      await completeQueueClaim(claimId)
      await Promise.all([fetch(), refreshWorkspaceActivity()])
    } finally {
      setPendingClaimId(null)
    }
  }

  async function handleReleaseClaim(claimId: string) {
    setPendingReleasedClaimId(claimId)
    try {
      await releaseQueueClaim(claimId)
      await Promise.all([fetch(), refreshWorkspaceActivity()])
    } finally {
      setPendingReleasedClaimId(null)
    }
  }

  async function handleFocusReadyTask(task: (typeof readyTasks)[number]) {
    const projection = await publishReadyTaskFocus(task)
    setDeskFocusProjection(projection)
  }

  async function handleFocusClaim(claim: (typeof activeClaims)[number]) {
    const projection = await publishClaimFocus(claim)
    setDeskFocusProjection(projection)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
            Queue Activity
          </h2>
          <div className="text-xs text-ohmic-text-dim mt-1">
            Live ready-task and active-claim truth from disk
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-ohmic-text-dim">
            {generatedAt ? new Date(generatedAt).toLocaleString() : 'Not loaded'}
          </div>
          <button
            onClick={() => void fetch()}
            className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors"
          >
            refresh
          </button>
        </div>
      </div>

      {loading && !generatedAt ? (
        <div className="panel text-sm text-ohmic-text-dim py-6 animate-pulse">
          Loading queue truth...
        </div>
      ) : error ? (
        <div className="panel text-sm text-ohmic-danger py-6">{error}</div>
      ) : (
        <div className="space-y-4">
          <div className="panel space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
                Ready Tasks
              </div>
              <span className="rounded-full bg-ohmic-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-accent">
                {readyCount}
              </span>
            </div>
            <div className="text-[11px] text-ohmic-text-dim">
              Showing {visibleReadyTasks.length} of {readyTasks.length} ready items from the live queue.
            </div>
            {readyTasks.length === 0 ? (
              <div className="text-sm text-ohmic-text-dim">
                No ready tasks are visible right now.
              </div>
            ) : (
              <div className="space-y-2">
                {visibleReadyTasks.map((task) => (
                  <div
                    key={task.task_id}
                    className="rounded-xl border border-ohmic-border bg-ohmic-bg px-3 py-3 space-y-2"
                  >
                    {(() => {
                      const matchingClaim = claimByTaskPath.get(task.file_path.toLowerCase()) ?? null
                      const isFocusedTask =
                        focusedSelection?.focus_kind === 'ready_task' &&
                        focusedSelection.task_id === task.task_id
                      return (
                        <>
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 space-y-1">
                              <div
                                className="truncate text-[10px] uppercase tracking-[0.2em] text-ohmic-text-dim"
                                title={task.file_path}
                              >
                                {formatTaskPath(task.file_path)}
                              </div>
                              <div
                                className="text-[15px] leading-6 text-ohmic-text"
                                style={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}
                                title={task.title}
                              >
                                {formatTaskDisplayTitle(task.title)}
                              </div>
                              <div className="text-[11px] text-ohmic-text-dim">
                                {task.project} | {task.status}
                              </div>
                            </div>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${getPriorityBadge(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="text-[11px] text-ohmic-text-dim">
                            {task.task_id}
                          </div>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {isFocusedTask ? (
                              <div className="rounded border border-emerald-300/30 px-2.5 py-1 text-[11px] text-emerald-300">
                                Current desk action
                              </div>
                            ) : (
                              <button
                                onClick={() => void handleFocusReadyTask(task)}
                                className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                              >
                                Use in desk
                              </button>
                            )}
                            {matchingClaim ? (
                              <div className="rounded border border-emerald-300/30 px-2.5 py-1 text-[11px] text-emerald-300">
                                Claimed by {matchingClaim.owner}
                              </div>
                            ) : (
                              <button
                                onClick={() => void handleClaimTask(task)}
                                disabled={pendingTaskId === task.task_id}
                                className="rounded border border-ohmic-accent/40 px-2.5 py-1 text-[11px] font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10 disabled:opacity-50"
                              >
                                {pendingTaskId === task.task_id ? 'Claiming...' : 'Claim task'}
                              </button>
                            )}
                          </div>
                        </>
                      )
                    })()}
                  </div>
                ))}
                {readyTasks.length > 4 ? (
                  <button
                    onClick={() => setShowAllReadyTasks((current) => !current)}
                    className="rounded border border-ohmic-border px-3 py-2 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                  >
                    {showAllReadyTasks
                      ? 'Show fewer ready tasks'
                      : `Show ${readyTasks.length - visibleReadyTasks.length} more ready tasks`}
                  </button>
                ) : null}
              </div>
            )}
          </div>

          <div className="panel space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
                Active Claims
              </div>
              <span className="rounded-full bg-ohmic-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-accent">
                {activeClaimCount}
              </span>
            </div>
            <div className="text-[11px] text-ohmic-text-dim">
              Live ownership records for work currently claimed from the queue.
            </div>
            {activeClaims.length === 0 ? (
              <div className="text-sm text-ohmic-text-dim">
                No active claims are visible right now.
              </div>
            ) : (
              <div className="space-y-2">
                {visibleActiveClaims.map((claim) => (
                  <div
                    key={claim.claim_id}
                    className="rounded-xl border border-ohmic-border bg-ohmic-bg px-3 py-3 space-y-2"
                  >
                    {(() => {
                      const isFocusedClaim =
                        focusedSelection?.focus_kind === 'claim' &&
                        focusedSelection.claim_id === claim.claim_id
                      return (
                        <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div
                          className="truncate text-[10px] uppercase tracking-[0.2em] text-ohmic-text-dim"
                          title={claim.file_path}
                        >
                          {formatTaskPath(claim.file_path)}
                        </div>
                        <div
                          className="text-[15px] leading-6 text-ohmic-text"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                          title={claim.title}
                        >
                          {formatTaskDisplayTitle(claim.title)}
                        </div>
                        <div className="text-[11px] text-ohmic-text-dim">
                          owner {claim.owner} | {claim.status}
                        </div>
                      </div>
                    </div>
                    {claim.paths.length > 0 ? (
                      <div className="text-[11px] text-ohmic-text-dim">
                        Scope: {claim.paths.length} file{claim.paths.length === 1 ? '' : 's'}
                      </div>
                    ) : null}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {isFocusedClaim ? (
                        <div className="rounded border border-emerald-300/30 px-2.5 py-1 text-[11px] text-emerald-300">
                          Current desk action
                        </div>
                      ) : (
                        <button
                          onClick={() => void handleFocusClaim(claim)}
                          className="rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                        >
                          Use in desk
                        </button>
                      )}
                      <button
                        onClick={() => void handleCompleteClaim(claim.claim_id)}
                        disabled={
                          pendingClaimId === claim.claim_id ||
                          pendingReleasedClaimId === claim.claim_id
                        }
                        className="rounded border border-emerald-300/30 px-2.5 py-1 text-[11px] font-medium text-emerald-300 transition-colors hover:border-emerald-300 hover:bg-emerald-300/10 disabled:opacity-50"
                      >
                        {pendingClaimId === claim.claim_id ? 'Completing...' : 'Complete claim'}
                      </button>
                      <button
                        onClick={() => void handleReleaseClaim(claim.claim_id)}
                        disabled={
                          pendingClaimId === claim.claim_id ||
                          pendingReleasedClaimId === claim.claim_id
                        }
                        className="rounded border border-amber-300/30 px-2.5 py-1 text-[11px] font-medium text-amber-300 transition-colors hover:border-amber-300 hover:bg-amber-300/10 disabled:opacity-50"
                      >
                        {pendingReleasedClaimId === claim.claim_id ? 'Releasing...' : 'Release claim'}
                      </button>
                    </div>
                        </>
                      )
                    })()}
                  </div>
                ))}
                {activeClaims.length > 3 ? (
                  <button
                    onClick={() => setShowAllActiveClaims((current) => !current)}
                    className="rounded border border-ohmic-border px-3 py-2 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                  >
                    {showAllActiveClaims
                      ? 'Show fewer active claims'
                      : `Show ${activeClaims.length - visibleActiveClaims.length} more active claims`}
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
