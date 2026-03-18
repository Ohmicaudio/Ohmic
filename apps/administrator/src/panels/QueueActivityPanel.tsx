import { useEffect } from 'react'
import { useQueueActivityStore } from '@/store/queueActivityStore'

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

  useEffect(() => {
    void fetch()
    const timer = window.setInterval(() => {
      void fetch()
    }, 30000)

    return () => window.clearInterval(timer)
  }, [fetch])

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
