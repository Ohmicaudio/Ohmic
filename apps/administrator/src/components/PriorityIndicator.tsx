import type { PriorityHint } from '@/types/intake'

interface PriorityIndicatorProps {
  priority: PriorityHint
}

const priorityConfig: Record<string, { dot: string; label: string }> = {
  critical: { dot: 'bg-red-500 animate-pulse', label: 'CRIT' },
  high: { dot: 'bg-orange-500', label: 'HIGH' },
  normal: { dot: 'bg-blue-400', label: 'NORM' },
  low: { dot: 'bg-gray-500', label: 'LOW' },
  '': { dot: 'bg-gray-600', label: '—' },
}

export function PriorityIndicator({ priority }: PriorityIndicatorProps) {
  const config = priorityConfig[priority] ?? priorityConfig['']

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ohmic-text-dim">
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}
