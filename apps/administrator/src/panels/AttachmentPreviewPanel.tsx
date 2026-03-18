import { recordTandemLaunchIntent } from '@/api/tandem'
import { useAttachmentPreviewStore } from '@/store/attachmentPreviewStore'
import { useCommandStore } from '@/store/commandStore'
import { useIntakeStore } from '@/store/intakeStore'
import { useTandemStore } from '@/store/tandemStore'
import { useAuditSummaryStore } from '@/store/auditSummaryStore'
import { StatusBadge } from '@/components/StatusBadge'
import { buildAttachmentPreviewContextNote } from '@/panels/attachmentPreviewContext'
import { buildTandemAttachmentReviewUrl } from '@/panels/tandemContext'

export function AttachmentPreviewPanel() {
  const { items, generatedAt, loading, error, available, fetch } = useAttachmentPreviewStore()
  const selectedIntakeId = useIntakeStore((s) => s.selectedId)
  const intakeItems = useIntakeStore((s) => s.items)
  const tandemLaunchUrl = useTandemStore((s) => s.launchUrl)
  const tandemTargetPresets = useTandemStore((s) => s.targetPresets)
  const refreshAuditSummary = useAuditSummaryStore((state) => state.fetch)
  const { noteText, setIntakeId, setActionInput, setNoteText } = useCommandStore()
  const selectedIntake =
    intakeItems.find((item) => item.intake_id === selectedIntakeId) ?? null
  const defaultPreset = tandemTargetPresets[0] ?? null

  function primeReviewHandoff(action: string, item: (typeof items)[number]) {
    if (!selectedIntakeId) {
      return
    }

    setIntakeId(selectedIntakeId)
    setActionInput(action)
    setNoteText(buildAttachmentPreviewContextNote(noteText, item))
  }

  async function handleTandemAttachmentLaunch(item: (typeof items)[number]) {
    const launchUrl = buildTandemAttachmentReviewUrl(
      tandemLaunchUrl,
      selectedIntake,
      item,
      defaultPreset
    )

    if (!launchUrl) {
      return
    }

    try {
      await recordTandemLaunchIntent({
        intake_id: selectedIntake?.intake_id ?? null,
        target_preset_id: defaultPreset?.preset_id ?? null,
        target_label: defaultPreset?.target_label ?? null,
        launch_url: launchUrl,
        attachment_id: item.asset_id,
      })
      await refreshAuditSummary()
    } catch {
      // Keep the handoff non-blocking even if audit writeback fails.
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
            Attachment Preview
          </h2>
          {available && generatedAt && (
            <div className="text-[10px] text-ohmic-text-dim mt-1">
              Projection updated {new Date(generatedAt).toLocaleString()}
            </div>
          )}
        </div>
        {!available && (
          <button
            onClick={fetch}
            className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors"
          >
            Check for runtime module
          </button>
        )}
      </div>

      {loading ? (
        <div className="panel text-sm text-ohmic-text-dim py-6 animate-pulse">
          Loading attachment previews...
        </div>
      ) : error ? (
        <div className="panel text-sm text-ohmic-danger py-6">{error}</div>
      ) : !available ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          Attachment preview is not present in the current runtime yet.
        </div>
      ) : items.length === 0 ? (
        <div className="panel text-sm text-ohmic-text-dim py-6">
          No attachment previews are currently present in the runtime module.
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.preview_ref_id} className="panel space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="text-sm font-medium text-ohmic-text break-words">
                    {item.fallback_label || item.asset_id}
                  </div>
                  <div className="text-xs text-ohmic-text-dim">
                    {item.preview_kind || 'preview'} - {item.asset_id}
                  </div>
                </div>
                <StatusBadge status={item.availability || 'unknown'} />
              </div>

              {item.failure_reason && (
                <div className="text-xs text-ohmic-warning">{item.failure_reason}</div>
              )}

              {item.review_handoff_action && (
                <div className="space-y-2">
                  <div className="text-xs text-ohmic-text-dim">
                    Review handoff action:{' '}
                    <span className="text-ohmic-text">{item.review_handoff_action}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        primeReviewHandoff(item.review_handoff_action!, item)
                      }
                      disabled={!selectedIntakeId}
                      className="rounded border border-ohmic-border px-3 py-1.5 text-xs font-medium text-ohmic-text transition-colors hover:border-ohmic-accent/30 disabled:text-ohmic-muted disabled:hover:border-ohmic-border"
                    >
                      Prime Review Action
                    </button>
                    {buildTandemAttachmentReviewUrl(
                      tandemLaunchUrl,
                      selectedIntake,
                      item,
                      defaultPreset
                    ) ? (
                      <a
                        href={buildTandemAttachmentReviewUrl(
                          tandemLaunchUrl,
                          selectedIntake,
                          item,
                          defaultPreset
                        )!}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                          void handleTandemAttachmentLaunch(item)
                        }}
                        className="rounded border border-ohmic-accent/40 px-3 py-1.5 text-xs font-medium text-ohmic-accent transition-colors hover:border-ohmic-accent hover:bg-ohmic-accent/10"
                      >
                        Open in Tandem
                      </a>
                    ) : null}
                  </div>
                </div>
              )}

              {item.preview_url ? (
                <div className="pt-1">
                  <a
                    href={item.preview_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded bg-ohmic-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-ohmic-accent-dim inline-flex"
                  >
                    Open Preview
                  </a>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
