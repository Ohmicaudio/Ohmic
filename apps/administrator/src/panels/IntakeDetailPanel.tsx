import { useEffect } from 'react'
import { useIntakeStore } from '@/store/intakeStore'
import { useIntakeContextStore } from '@/store/intakeContextStore'
import { StatusBadge } from '@/components/StatusBadge'
import { PriorityIndicator } from '@/components/PriorityIndicator'
import { TagChip } from '@/components/TagChip'

function DetailRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-xs">
      <span className="text-ohmic-text-dim whitespace-nowrap">{label}</span>
      <span className="text-ohmic-text text-right break-all">{value}</span>
    </div>
  )
}

export function IntakeDetailPanel() {
  const { items, selectedId } = useIntakeStore()
  const { notes, tagAssignments, loading: contextLoading, fetch: fetchContext } =
    useIntakeContextStore()
  const selectedItem = items.find((item) => item.intake_id === selectedId) ?? null
  const itemNotes = selectedId
    ? notes.filter((note) => note.intake_id === selectedId)
    : []
  const itemTagAssignments = selectedId
    ? tagAssignments.filter((tag) => tag.intake_id === selectedId)
    : []

  useEffect(() => {
    if (selectedId && notes.length === 0 && tagAssignments.length === 0) {
      void fetchContext()
    }
  }, [selectedId, notes.length, tagAssignments.length, fetchContext])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Intake Detail
        </h2>
        {selectedItem && <StatusBadge status={selectedItem.status} />}
      </div>

      {!selectedItem ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          Select an intake item from the queue to inspect its routing context.
        </div>
      ) : (
        <div className="panel space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <PriorityIndicator priority={selectedItem.priority_hint} />
                  <span className="text-[10px] uppercase tracking-wider text-ohmic-text-dim">
                    {selectedItem.intake_kind}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-ohmic-text break-words">
                  {selectedItem.title}
                </h3>
              </div>
            </div>

            {selectedItem.summary_label && (
              <p className="text-sm text-ohmic-text-dim leading-relaxed">
                {selectedItem.summary_label}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2">
            <DetailRow label="Intake ID" value={selectedItem.intake_id} />
            <DetailRow
              label="Received"
              value={
                selectedItem.received_at
                  ? new Date(selectedItem.received_at).toLocaleString()
                  : '--'
              }
            />
            <DetailRow label="Routing target" value={selectedItem.routing_target || '--'} />
            <DetailRow label="Trust tier" value={selectedItem.trust_tier || '--'} />
            <DetailRow
              label="Warnings"
              value={
                selectedItem.warning_count > 0
                  ? `${selectedItem.warning_count} warning${selectedItem.warning_count !== 1 ? 's' : ''}`
                  : 'None'
              }
            />
          </div>

          {selectedItem.tags.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
                Tags
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedItem.tags.map((tag) => (
                  <TagChip key={tag} tag={tag} />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
              Notes
            </div>
            {contextLoading && itemNotes.length === 0 ? (
              <div className="text-xs text-ohmic-text-dim animate-pulse">
                Loading note context...
              </div>
            ) : itemNotes.length === 0 ? (
              <div className="text-xs text-ohmic-text-dim">
                No desk notes have been recorded for this intake item yet.
              </div>
            ) : (
              <div className="space-y-2">
                {itemNotes.map((note) => (
                  <div key={note.note_id} className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-xs font-medium text-ohmic-text">
                        {note.display_author_label || note.authored_by}
                      </div>
                      <div className="text-[10px] text-ohmic-text-dim">
                        {note.created_at ? new Date(note.created_at).toLocaleString() : '--'}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-ohmic-text-dim whitespace-pre-wrap">
                      {note.body_text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
              Tag Activity
            </div>
            {contextLoading && itemTagAssignments.length === 0 ? (
              <div className="text-xs text-ohmic-text-dim animate-pulse">
                Loading tag context...
              </div>
            ) : itemTagAssignments.length === 0 ? (
              <div className="text-xs text-ohmic-text-dim">
                No tag activity has been recorded for this intake item yet.
              </div>
            ) : (
              <div className="space-y-2">
                {itemTagAssignments.map((tag) => (
                  <div key={tag.tag_assignment_id} className="flex items-start justify-between gap-3 rounded border border-ohmic-border bg-ohmic-bg px-3 py-2">
                    <div className="space-y-1 min-w-0">
                      <TagChip tag={tag.tag_label} />
                      <div className="text-xs text-ohmic-text-dim">
                        {tag.applied_by} via {tag.source}
                      </div>
                    </div>
                    <div className="text-[10px] text-ohmic-text-dim whitespace-nowrap">
                      {tag.applied_at ? new Date(tag.applied_at).toLocaleString() : '--'}
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
