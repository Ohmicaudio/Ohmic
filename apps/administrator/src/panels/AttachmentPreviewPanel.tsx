import { useAttachmentPreviewStore } from '@/store/attachmentPreviewStore'
import { StatusBadge } from '@/components/StatusBadge'

export function AttachmentPreviewPanel() {
  const { items, generatedAt, loading, error, available, fetch } = useAttachmentPreviewStore()

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
                <div className="text-xs text-ohmic-text-dim">
                  Review handoff action:{' '}
                  <span className="text-ohmic-text">{item.review_handoff_action}</span>
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
