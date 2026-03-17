interface RuntimeIndicatorProps {
  status: 'ok' | 'error' | 'unknown'
  runtimeDir: string | null
}

function getRuntimeLabel(runtimeDir: string | null): string {
  if (!runtimeDir) return 'runtime unknown'
  if (runtimeDir.startsWith('B:\\ohmic-local\\')) return 'local runtime'
  if (runtimeDir.startsWith('B:\\ohmic\\')) return 'repo runtime'
  return 'custom runtime'
}

export function RuntimeIndicator({ status, runtimeDir }: RuntimeIndicatorProps) {
  const dotColor =
    status === 'ok' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-gray-500'

  return (
    <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-ohmic-text-dim">
      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      <span>{getRuntimeLabel(runtimeDir)}</span>
    </div>
  )
}
