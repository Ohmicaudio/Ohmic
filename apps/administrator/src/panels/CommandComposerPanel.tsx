import { useEffect } from 'react'
import { useCommandStore } from '@/store/commandStore'
import { useIntakeStore } from '@/store/intakeStore'
import { TagChip } from '@/components/TagChip'

function ValidationResult() {
  const { validation, lastResult, lastWriteback, error } = useCommandStore()

  if (error) {
    return (
      <div className="panel border-ohmic-danger/40 text-sm">
        <div className="text-ohmic-danger font-medium mb-1">Error</div>
        <div className="text-ohmic-text-dim">{error}</div>
      </div>
    )
  }

  if (validation.validation_status === 'idle') return null
  if (validation.validation_status === 'validating') {
    return (
      <div className="text-ohmic-text-dim text-xs animate-pulse">
        Validating via PowerShell...
      </div>
    )
  }

  const statusColor =
    validation.validation_status === 'accepted'
      ? 'border-ohmic-success/40'
      : validation.validation_status === 'accepted_with_warnings'
        ? 'border-ohmic-warning/40'
        : 'border-ohmic-danger/40'

  const statusLabel =
    validation.validation_status === 'accepted'
      ? 'Accepted'
      : validation.validation_status === 'accepted_with_warnings'
        ? 'Accepted with warnings'
        : 'Rejected'

  const statusTextColor =
    validation.validation_status === 'accepted'
      ? 'text-ohmic-success'
      : validation.validation_status === 'accepted_with_warnings'
        ? 'text-ohmic-warning'
        : 'text-ohmic-danger'

  return (
    <div className={`panel ${statusColor} space-y-2`}>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${statusTextColor}`}>{statusLabel}</span>
        {lastResult && (
          <span className="text-[10px] text-ohmic-text-dim font-mono">
            {lastResult.command_id}
          </span>
        )}
      </div>

      {lastResult?.resolved_action_label && (
        <div className="text-xs text-ohmic-text-dim">
          Resolved: <span className="text-ohmic-text">{lastResult.resolved_action_label}</span>
          {lastResult.resolved_queue_target_id && (
            <span> -&gt; {lastResult.resolved_queue_target_id}</span>
          )}
        </div>
      )}

      {lastWriteback && (
        <div className="text-xs text-ohmic-text-dim bg-ohmic-bg rounded px-2 py-2">
          <div>
            Writeback: <span className="text-ohmic-text">{lastWriteback.writeback_status}</span>
          </div>
          <div>
            Resulting status:{' '}
            <span className="text-ohmic-text">{lastWriteback.resulting_status ?? '--'}</span>
          </div>
          <div>
            Audit rows: <span className="text-ohmic-text">{lastWriteback.recent_actions_count}</span>
          </div>
          <div>
            Notes written: <span className="text-ohmic-text">{lastWriteback.note_written ? 'yes' : 'no'}</span>
          </div>
          <div>
            Tags written: <span className="text-ohmic-text">{lastWriteback.tags_written}</span>
          </div>
        </div>
      )}

      {validation.rejection_details.length > 0 && (
        <div className="space-y-1">
          {validation.rejection_details.map((d) => (
            <div
              key={d.code}
              className="text-xs text-ohmic-danger/80 bg-ohmic-danger/5 rounded px-2 py-1"
            >
              <span className="font-medium">{d.label}</span>
              <span className="text-ohmic-text-dim"> - {d.description}</span>
            </div>
          ))}
        </div>
      )}

      {validation.warning_details.length > 0 && (
        <div className="space-y-1">
          {validation.warning_details.map((d) => (
            <div
              key={d.code}
              className="text-xs text-ohmic-warning/80 bg-ohmic-warning/5 rounded px-2 py-1"
            >
              <span className="font-medium">{d.label}</span>
              <span className="text-ohmic-text-dim"> - {d.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function CommandComposerPanel() {
  const {
    selectedIntakeId,
    actionInput,
    noteText,
    tagInput,
    tags,
    queueTargetId,
    availableActions,
    availableTargets,
    optionsLoaded,
    validating,
    executing,
    validation,
    setIntakeId,
    setActionInput,
    setNoteText,
    setTagInput,
    addTag,
    removeTag,
    setQueueTarget,
    loadOptions,
    validate,
    execute,
    reset,
  } = useCommandStore()

  const intakeSelectedId = useIntakeStore((s) => s.selectedId)

  useEffect(() => {
    if (intakeSelectedId && intakeSelectedId !== selectedIntakeId) {
      setIntakeId(intakeSelectedId)
    }
  }, [intakeSelectedId, selectedIntakeId, setIntakeId])

  useEffect(() => {
    if (!optionsLoaded) loadOptions()
  }, [optionsLoaded, loadOptions])

  const needsQueueTarget = ['route_to_orchestrator', 'request_approval'].some(
    (a) =>
      actionInput.toLowerCase().includes(a.replace(/_/g, ' ')) ||
      actionInput.toLowerCase() === a
  ) ||
    availableActions.some(
      (a) =>
        ['route_to_orchestrator', 'request_approval'].includes(a.action_id) &&
        (a.action_id === actionInput || a.aliases.includes(actionInput.toLowerCase()))
    )

  const canApply =
    validation.validation_status === 'accepted' ||
    validation.validation_status === 'accepted_with_warnings'

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-ohmic-accent">
          Command Composer
        </h2>
        <button
          onClick={reset}
          className="text-xs text-ohmic-text-dim hover:text-ohmic-text transition-colors"
        >
          reset
        </button>
      </div>

      <div className="panel space-y-4">
        <div>
          <label className="block text-xs text-ohmic-text-dim mb-1">Intake ID</label>
          <input
            type="text"
            value={selectedIntakeId}
            onChange={(e) => setIntakeId(e.target.value)}
            placeholder="Select from queue or enter ID..."
            className="w-full bg-ohmic-bg border border-ohmic-border rounded px-3 py-2 text-sm text-ohmic-text placeholder:text-ohmic-muted focus:border-ohmic-accent focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs text-ohmic-text-dim mb-1">Action</label>
          <select
            value={actionInput}
            onChange={(e) => setActionInput(e.target.value)}
            className="w-full bg-ohmic-bg border border-ohmic-border rounded px-3 py-2 text-sm text-ohmic-text focus:border-ohmic-accent focus:outline-none transition-colors"
          >
            <option value="">Select action...</option>
            {availableActions.map((a) => (
              <option key={a.action_id} value={a.action_id}>
                {a.display_label}
              </option>
            ))}
          </select>
        </div>

        {needsQueueTarget && (
          <div>
            <label className="block text-xs text-ohmic-text-dim mb-1">Queue Target</label>
            <select
              value={queueTargetId}
              onChange={(e) => setQueueTarget(e.target.value)}
              className="w-full bg-ohmic-bg border border-ohmic-border rounded px-3 py-2 text-sm text-ohmic-text focus:border-ohmic-accent focus:outline-none transition-colors"
            >
              <option value="">Select target...</option>
              {availableTargets.map((t) => (
                <option key={t.queue_target_id} value={t.queue_target_id}>
                  {t.display_label}
                  {t.status === 'deprecated' ? ' (deprecated)' : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-xs text-ohmic-text-dim mb-1">Note (optional)</label>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add a note..."
            rows={2}
            className="w-full bg-ohmic-bg border border-ohmic-border rounded px-3 py-2 text-sm text-ohmic-text placeholder:text-ohmic-muted focus:border-ohmic-accent focus:outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs text-ohmic-text-dim mb-1">Tags</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault()
                  addTag(tagInput)
                }
              }}
              placeholder="Type and press Enter..."
              className="flex-1 bg-ohmic-bg border border-ohmic-border rounded px-3 py-1.5 text-sm text-ohmic-text placeholder:text-ohmic-muted focus:border-ohmic-accent focus:outline-none transition-colors"
            />
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag) => (
                <button key={tag} onClick={() => removeTag(tag)} className="group">
                  <TagChip tag={`${tag} x`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={validate}
            disabled={validating || executing || !selectedIntakeId || !actionInput}
            className="w-full bg-ohmic-accent hover:bg-ohmic-accent-dim disabled:bg-ohmic-border disabled:text-ohmic-muted text-white font-medium rounded px-4 py-2 text-sm transition-colors"
          >
            {validating ? 'Validating...' : 'Validate Command'}
          </button>
          <button
            onClick={execute}
            disabled={validating || executing || !canApply}
            className="w-full bg-ohmic-success hover:bg-ohmic-success/80 disabled:bg-ohmic-border disabled:text-ohmic-muted text-white font-medium rounded px-4 py-2 text-sm transition-colors"
          >
            {executing ? 'Applying...' : 'Apply Command'}
          </button>
        </div>
      </div>

      <ValidationResult />
    </div>
  )
}
