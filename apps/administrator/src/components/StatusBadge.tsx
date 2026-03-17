interface StatusBadgeProps {
  status: string
  size?: 'sm' | 'md'
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  triaging: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  pending_approval: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  waiting_on_provider: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  waiting_on_human: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  hold: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  working: 'bg-green-500/20 text-green-400 border-green-500/30',
  fresh: 'bg-green-500/20 text-green-400 border-green-500/30',
  stale: 'bg-red-500/20 text-red-400 border-red-500/30',
  healthy: 'bg-green-500/20 text-green-400 border-green-500/30',
  warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  pending_input: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

const fallbackColor = 'bg-gray-500/20 text-gray-400 border-gray-500/30'

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const normalized = status.toLowerCase().replace(/\s+/g, '_')
  const color = statusColors[normalized] ?? fallbackColor
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1'

  return (
    <span className={`inline-flex items-center rounded border font-medium ${color} ${sizeClass}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}
