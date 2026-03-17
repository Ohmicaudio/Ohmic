interface TagChipProps {
  tag: string
}

export function TagChip({ tag }: TagChipProps) {
  return (
    <span className="inline-flex items-center rounded bg-ohmic-accent/15 text-ohmic-accent text-xs px-1.5 py-0.5 border border-ohmic-accent/20">
      {tag}
    </span>
  )
}
