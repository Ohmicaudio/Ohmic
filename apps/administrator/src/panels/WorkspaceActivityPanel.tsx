import { useEffect } from 'react'
import { useWorkspaceActivityStore } from '@/store/workspaceActivityStore'

function formatCommitHash(hash: string): string {
  return hash.slice(0, 7)
}

export function WorkspaceActivityPanel() {
  const {
    generatedAt,
    workspaceDir,
    branch,
    scopeLabel,
    headCommit,
    recentCommits,
    dirtyFiles,
    dirtyFileCount,
    status,
    loading,
    error,
    message,
    fetch,
  } = useWorkspaceActivityStore()

  useEffect(() => {
    void fetch()
    const timer = window.setInterval(() => {
      void fetch()
    }, 30000)

    return () => window.clearInterval(timer)
  }, [fetch])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
            Workspace Activity
          </h2>
          <div className="text-xs text-ohmic-text-dim mt-1">
            Live branch and commit truth for {scopeLabel}
          </div>
        </div>
        <button
          onClick={() => void fetch()}
          className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors"
        >
          refresh
        </button>
      </div>

      {loading && !generatedAt ? (
        <div className="panel text-sm text-ohmic-text-dim py-6 animate-pulse">
          Loading workspace activity...
        </div>
      ) : error ? (
        <div className="panel text-sm text-ohmic-danger py-6">{error}</div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="panel space-y-3 xl:col-span-1">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
                Branch Status
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                  status === 'available'
                    ? 'bg-emerald-300/15 text-emerald-300'
                    : 'bg-amber-300/15 text-amber-300'
                }`}
              >
                {status}
              </span>
            </div>
            <div className="space-y-2 text-xs text-ohmic-text-dim">
              <div>
                Branch: <span className="text-ohmic-text">{branch || '--'}</span>
              </div>
              <div>
                Workspace: <span className="text-ohmic-text break-all">{workspaceDir || '--'}</span>
              </div>
              <div>
                Updated:{' '}
                <span className="text-ohmic-text">
                  {generatedAt ? new Date(generatedAt).toLocaleString() : '--'}
                </span>
              </div>
              <div>
                Dirty files: <span className="text-ohmic-text">{dirtyFileCount}</span>
              </div>
            </div>
            {message ? (
              <div className="text-xs text-ohmic-text-dim whitespace-pre-wrap">
                {message}
              </div>
            ) : null}
            {headCommit ? (
              <div className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 space-y-1.5">
                <div className="text-[10px] uppercase tracking-wider text-ohmic-text-dim">
                  Head Commit
                </div>
                <div className="text-sm text-ohmic-text">{headCommit.summary}</div>
                <div className="text-[11px] text-ohmic-text-dim">
                  {formatCommitHash(headCommit.hash)} |{' '}
                  {new Date(headCommit.committed_at).toLocaleString()}
                </div>
              </div>
            ) : null}
          </div>

          <div className="panel space-y-3 xl:col-span-1">
            <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
              Recent Commits
            </div>
            {recentCommits.length === 0 ? (
              <div className="text-sm text-ohmic-text-dim">
                No administrator-lane commits are visible right now.
              </div>
            ) : (
              <div className="space-y-2">
                {recentCommits.map((commit) => (
                  <div
                    key={`${commit.hash}-${commit.committed_at}`}
                    className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 space-y-1"
                  >
                    <div className="text-sm text-ohmic-text">{commit.summary}</div>
                    <div className="text-[11px] text-ohmic-text-dim">
                      {formatCommitHash(commit.hash)} |{' '}
                      {new Date(commit.committed_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="panel space-y-3 xl:col-span-1">
            <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
              Working Changes
            </div>
            {dirtyFiles.length === 0 ? (
              <div className="text-sm text-ohmic-text-dim">
                No uncommitted administrator-lane changes are visible.
              </div>
            ) : (
              <div className="space-y-2">
                {dirtyFiles.slice(0, 8).map((file) => (
                  <div
                    key={`${file.status}-${file.path}`}
                    className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 flex items-start justify-between gap-3"
                  >
                    <div className="text-xs text-ohmic-text break-all">{file.path}</div>
                    <span className="rounded-full bg-ohmic-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-accent">
                      {file.status}
                    </span>
                  </div>
                ))}
                {dirtyFiles.length > 8 ? (
                  <div className="text-[11px] text-ohmic-text-dim">
                    +{dirtyFiles.length - 8} more file changes
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
