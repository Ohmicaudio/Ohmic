import { useEffect } from 'react'
import { useIntakeStore } from '@/store/intakeStore'
import { useIntakeContextStore } from '@/store/intakeContextStore'
import { useAuditSummaryStore } from '@/store/auditSummaryStore'
import { useTandemStore } from '@/store/tandemStore'
import { StatusBadge } from '@/components/StatusBadge'
import { PriorityIndicator } from '@/components/PriorityIndicator'
import { TagChip } from '@/components/TagChip'
import {
  resolveRecentTandemLaunchSelection,
  selectProviderEventsForIntake,
  selectLatestTandemLaunchForIntake,
} from '@/panels/tandemHistory'

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

function EmptyChecklist({
  title,
  body,
  items,
}: {
  title: string
  body: string
  items: string[]
}) {
  return (
    <div className="panel border-ohmic-border/80 bg-ohmic-bg/70 py-5">
      <div className="space-y-2">
        <div className="text-sm font-medium text-ohmic-text">{title}</div>
        <div className="text-sm leading-6 text-ohmic-text-dim">{body}</div>
      </div>
      <div className="mt-4 space-y-2">
        {items.map((item, index) => (
          <div
            key={`${index}-${item}`}
            className="flex items-start gap-3 rounded-lg border border-ohmic-border/70 bg-ohmic-surface/70 px-3 py-2"
          >
            <div className="mt-0.5 rounded-full bg-ohmic-accent/15 px-2 py-0.5 text-[10px] uppercase tracking-widest text-ohmic-accent">
              {index + 1}
            </div>
            <div className="text-sm text-ohmic-text-dim">{item}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function IntakeDetailPanel() {
  const { items, selectedId } = useIntakeStore()
  const { notes, tagAssignments, loading: contextLoading, fetch: fetchContext } =
    useIntakeContextStore()
  const auditItems = useAuditSummaryStore((state) => state.items)
  const auditAvailable = useAuditSummaryStore((state) => state.available)
  const auditLoading = useAuditSummaryStore((state) => state.loading)
  const auditAttempted = useAuditSummaryStore((state) => state.attempted)
  const fetchAuditSummary = useAuditSummaryStore((state) => state.fetch)
  const tandemTargetPresets = useTandemStore((state) => state.targetPresets)
  const setSelectedTandemPreset = useTandemStore((state) => state.setSelectedPreset)
  const setTandemHandoffNote = useTandemStore((state) => state.setHandoffNote)
  const selectedItem = items.find((item) => item.intake_id === selectedId) ?? null
  const itemNotes = selectedId
    ? notes.filter((note) => note.intake_id === selectedId)
    : []
  const itemTagAssignments = selectedId
    ? tagAssignments.filter((tag) => tag.intake_id === selectedId)
    : []
  const latestTandemLaunch = selectLatestTandemLaunchForIntake(auditItems, selectedId)
  const latestTandemSelection = latestTandemLaunch
    ? resolveRecentTandemLaunchSelection(latestTandemLaunch, tandemTargetPresets, items)
    : null
  const providerTimeline = selectProviderEventsForIntake(auditItems, selectedId)
  const providerNotes = providerTimeline.filter((event) => event.handoff_note?.trim())

  useEffect(() => {
    if (selectedId && notes.length === 0 && tagAssignments.length === 0) {
      void fetchContext()
    }
  }, [selectedId, notes.length, tagAssignments.length, fetchContext])

  useEffect(() => {
    if (selectedId && !auditAvailable && !auditLoading && !auditAttempted) {
      void fetchAuditSummary()
    }
  }, [selectedId, auditAttempted, auditAvailable, auditLoading, fetchAuditSummary])

  const providerRuntimeUnavailable = auditAttempted && !auditAvailable

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Intake Detail
        </h2>
        {selectedItem && <StatusBadge status={selectedItem.status} />}
      </div>

      {!selectedItem ? (
        <EmptyChecklist
          title="No intake selected yet"
          body="Pick a queue item to load its routing context, provider timeline, and note history into this lane."
          items={[
            'Choose a ready intake from Queue and Runtime.',
            'Review the intake summary, provider history, and note stream here.',
            'Then use the Action Rail to hand off or apply the next desk action.',
          ]}
        />
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
              Provider Handoff
            </div>
            {auditLoading && !latestTandemLaunch && !providerRuntimeUnavailable ? (
              <div className="text-xs text-ohmic-text-dim animate-pulse">
                Loading provider handoff context...
              </div>
            ) : providerRuntimeUnavailable && !latestTandemLaunch ? (
              <div className="text-xs text-ohmic-text-dim">
                Provider handoff runtime is unavailable right now.
              </div>
            ) : !latestTandemLaunch ? (
              <div className="text-xs text-ohmic-text-dim">
                No provider handoff has been recorded for this intake yet.
              </div>
            ) : (
              <div className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 space-y-1.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-xs font-medium text-ohmic-text">
                    {latestTandemLaunch.target_label || latestTandemLaunch.summary_label}
                  </div>
                  <div className="text-[10px] text-ohmic-text-dim whitespace-nowrap">
                    {latestTandemLaunch.occurred_at
                      ? new Date(latestTandemLaunch.occurred_at).toLocaleString()
                      : '--'}
                  </div>
                </div>
                <div className="text-xs text-ohmic-text-dim">
                  {latestTandemLaunch.status_delta === 'attachment_review'
                    ? 'Attachment review handoff'
                    : 'Provider handoff recorded from the desk'}
                </div>
                {latestTandemLaunch.attachment_id ? (
                  <div className="text-xs text-ohmic-text-dim">
                    Attachment: <span className="text-ohmic-text">{latestTandemLaunch.attachment_id}</span>
                  </div>
                ) : null}
                {latestTandemLaunch.handoff_note ? (
                  <div className="text-xs text-ohmic-text-dim whitespace-pre-wrap">
                    {latestTandemLaunch.handoff_note}
                  </div>
                ) : null}
                {latestTandemLaunch.launch_url || latestTandemSelection?.presetId ? (
                  <div className="pt-1 flex flex-wrap gap-2">
                    {latestTandemSelection?.presetId ? (
                      <button
                        onClick={() => {
                          setSelectedTandemPreset(latestTandemSelection.presetId!)
                          setTandemHandoffNote(latestTandemSelection.handoffNote)
                        }}
                        className="inline-flex rounded border border-ohmic-border px-2.5 py-1 text-[11px] font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30"
                      >
                        Load target into Tandem desk
                      </button>
                    ) : null}
                    {latestTandemLaunch.launch_url ? (
                    <a
                      href={latestTandemLaunch.launch_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded border border-ohmic-accent/40 px-2.5 py-1 text-[11px] font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10"
                    >
                      Reopen last handoff
                    </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
              Provider Timeline
            </div>
            {auditLoading && providerTimeline.length === 0 && !providerRuntimeUnavailable ? (
              <div className="text-xs text-ohmic-text-dim animate-pulse">
                Loading provider timeline...
              </div>
            ) : providerRuntimeUnavailable && providerTimeline.length === 0 ? (
              <div className="text-xs text-ohmic-text-dim">
                Provider timeline runtime is unavailable right now.
              </div>
            ) : providerTimeline.length === 0 ? (
              <div className="text-xs text-ohmic-text-dim">
                No provider history has been recorded for this intake yet.
              </div>
            ) : (
              <div className="space-y-2">
                {providerTimeline.map((event) => (
                  <div
                    key={event.event_id}
                    className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="text-xs font-medium text-ohmic-text">
                          {event.summary_label}
                        </div>
                        <div className="text-[11px] text-ohmic-text-dim">
                          {event.target_label || '--'}
                          {event.status_delta ? ` | ${event.status_delta}` : ''}
                          {event.attachment_id ? ` | ${event.attachment_id}` : ''}
                        </div>
                      </div>
                      <div className="text-[10px] text-ohmic-text-dim whitespace-nowrap">
                        {event.occurred_at
                          ? new Date(event.occurred_at).toLocaleString()
                          : '--'}
                      </div>
                    </div>
                    {event.handoff_note ? (
                      <div className="text-xs text-ohmic-text-dim whitespace-pre-wrap">
                        {event.handoff_note}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-ohmic-text-dim">
              Provider Notes
            </div>
            {auditLoading && providerNotes.length === 0 && !providerRuntimeUnavailable ? (
              <div className="text-xs text-ohmic-text-dim animate-pulse">
                Loading provider notes...
              </div>
            ) : providerRuntimeUnavailable && providerNotes.length === 0 ? (
              <div className="text-xs text-ohmic-text-dim">
                Provider note runtime is unavailable right now.
              </div>
            ) : providerNotes.length === 0 ? (
              <div className="text-xs text-ohmic-text-dim">
                No provider-specific notes have been recorded for this intake yet.
              </div>
            ) : (
              <div className="space-y-2">
                {providerNotes.map((event) => (
                  <div
                    key={`${event.event_id}-provider-note`}
                    className="rounded border border-ohmic-border bg-ohmic-bg px-3 py-2 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="text-xs font-medium text-ohmic-text">
                          {event.target_label || event.summary_label}
                        </div>
                        <div className="text-[11px] text-ohmic-text-dim">
                          {event.actor_label || 'operator'}
                          {` | ${event.status_delta || event.event_family}`}
                          {event.attachment_id ? ` | ${event.attachment_id}` : ''}
                        </div>
                      </div>
                      <div className="text-[10px] text-ohmic-text-dim whitespace-nowrap">
                        {event.occurred_at
                          ? new Date(event.occurred_at).toLocaleString()
                          : '--'}
                      </div>
                    </div>
                    <div className="text-xs text-ohmic-text-dim whitespace-pre-wrap">
                      {event.handoff_note}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

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
