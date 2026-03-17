interface FreshnessIndicatorProps {
  generatedAt: string | null
  staleness: 'fresh' | 'stale' | 'unknown'
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const secs = Math.floor(diff / 1000)
  if (secs < 60) return `${secs}s ago`
  const mins = Math.floor(secs / 60)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export function FreshnessIndicator({ generatedAt, staleness }: FreshnessIndicatorProps) {
  const dotColor =
    staleness === 'fresh' ? 'bg-green-500' :
    staleness === 'stale' ? 'bg-yellow-500' :
    'bg-gray-500'

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ohmic-text-dim">
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {generatedAt ? timeAgo(generatedAt) : 'unknown'}
    </span>
  )
}
