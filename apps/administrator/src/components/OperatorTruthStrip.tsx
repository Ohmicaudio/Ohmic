import { useEffect } from 'react'
import { useQueueActivityStore } from '@/store/queueActivityStore'
import { useWorkspaceActivityStore } from '@/store/workspaceActivityStore'

function TruthPill({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="metric-pill">
      <span>{label}</span>
      <span className="ml-2 text-ohmic-text">{value}</span>
    </div>
  )
}

export function OperatorTruthStrip() {
  const readyCount = useQueueActivityStore((state) => state.readyCount)
  const activeClaimCount = useQueueActivityStore((state) => state.activeClaimCount)
  const queueGeneratedAt = useQueueActivityStore((state) => state.generatedAt)
  const fetchQueueActivity = useQueueActivityStore((state) => state.fetch)
  const branch = useWorkspaceActivityStore((state) => state.branch)
  const dirtyFileCount = useWorkspaceActivityStore((state) => state.dirtyFileCount)
  const workspaceGeneratedAt = useWorkspaceActivityStore((state) => state.generatedAt)
  const fetchWorkspaceActivity = useWorkspaceActivityStore((state) => state.fetch)

  useEffect(() => {
    if (!queueGeneratedAt) {
      void fetchQueueActivity()
    }
    if (!workspaceGeneratedAt) {
      void fetchWorkspaceActivity()
    }
  }, [fetchQueueActivity, fetchWorkspaceActivity, queueGeneratedAt, workspaceGeneratedAt])

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      <TruthPill label="Ready" value={String(readyCount)} />
      <TruthPill label="Active claims" value={String(activeClaimCount)} />
      <TruthPill label="Branch" value={branch || '--'} />
      <TruthPill label="Dirty" value={String(dirtyFileCount)} />
    </div>
  )
}
