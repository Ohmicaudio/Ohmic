import { useEffect, useMemo, useState } from 'react'
import { claimQueueTask, completeQueueClaim } from '@/api/queue'
import { useQueueActivityStore } from '@/store/queueActivityStore'
import { useWorkspaceActivityStore } from '@/store/workspaceActivityStore'

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

  return (
    <div className="space-y-4 mt-8">
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="panel space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
                Ready Tasks
              </div>
              <span className="rounded-full bg-ohmic-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-accent">
                {readyCount}
              </span>
            </div>
            {readyTasks.length === 0 ? (
              <div className="text-sm text-ohmic-text-dim">
                No ready tasks are visible right now.
              </div>
            ) : (
              <div className="space-y-2">
                {readyTasks.slice(0, 8).map((task) => (
                  <div
                    key={task.task_id}
                    className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 space-y-1.5"
                  >
                    {(() => {
                      const matchingClaim = claimByTaskPath.get(task.file_path.toLowerCase()) ?? null
                      return (
                        <>
                          <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="text-sm text-ohmic-text">{task.title}</div>
                        <div className="text-[11px] text-ohmic-text-dim">
                          {task.project} | {task.status}
                        </div>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${getPriorityBadge(task.priority)}`}>
                        {task.priority}
                      </span>
                          </div>
                          <div className="text-[11px] text-ohmic-text-dim break-all">
                            {task.file_path}
                          </div>
                          <div className="flex flex-wrap gap-2 pt-1">
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
            {activeClaims.length === 0 ? (
              <div className="text-sm text-ohmic-text-dim">
                No active claims are visible right now.
              </div>
            ) : (
              <div className="space-y-2">
                {activeClaims.slice(0, 8).map((claim) => (
                  <div
                    key={claim.claim_id}
                    className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="text-sm text-ohmic-text">{claim.title}</div>
                        <div className="text-[11px] text-ohmic-text-dim">
                          owner {claim.owner} | {claim.status}
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-ohmic-text-dim break-all">
                      {claim.file_path}
                    </div>
                    {claim.paths.length > 0 ? (
                      <div className="text-[11px] text-ohmic-text-dim break-all">
                        Scope: {claim.paths.join(' | ')}
                      </div>
                    ) : null}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={() => void handleCompleteClaim(claim.claim_id)}
                        disabled={pendingClaimId === claim.claim_id}
                        className="rounded border border-emerald-300/30 px-2.5 py-1 text-[11px] font-medium text-emerald-300 transition-colors hover:border-emerald-300 hover:bg-emerald-300/10 disabled:opacity-50"
                      >
                        {pendingClaimId === claim.claim_id ? 'Completing...' : 'Complete claim'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
