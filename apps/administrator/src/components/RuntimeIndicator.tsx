import {
  buildProjectionCoverageLabel,
  getRuntimeDotColor,
  getRuntimeLabel,
} from '@/components/runtimeIndicatorModel'

interface RuntimeIndicatorProps {
  status: 'ok' | 'error' | 'unknown'
  runtimeDir: string | null
  loadedProjectionCount: number
  expectedProjectionCount: number
}

export function RuntimeIndicator({
  status,
  runtimeDir,
  loadedProjectionCount,
  expectedProjectionCount,
}: RuntimeIndicatorProps) {
  const dotColor = getRuntimeDotColor(
    status,
    loadedProjectionCount,
    expectedProjectionCount
  )
  const coverageLabel = buildProjectionCoverageLabel(
    loadedProjectionCount,
    expectedProjectionCount
  )

  return (
    <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-ohmic-text-dim">
      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      <span>
        {getRuntimeLabel(runtimeDir)}
        {coverageLabel ? ` ${coverageLabel}` : ''}
      </span>
    </div>
  )
}
