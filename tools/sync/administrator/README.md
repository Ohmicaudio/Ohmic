# Administrator Sync Runtime

This folder holds the first bounded Master Administrator runtime seams that sit
on top of the shared JSON loop.

Current scaffolds:

- `command-reason-catalog.ps1`
- `overlay-action-resolution.ps1`
- `queue-target-validation.ps1`
- `approval-evaluation.ps1`
- `command-composer.ps1`
- `projection-common.ps1`
- `intake-queue-projection.ps1`
- `recent-actions-projection.ps1`
- `note-projection.ps1`
- `tag-projection.ps1`
- `inactive-intake-projection.ps1`
- `shell-common.ps1`
- `aggregation-panel-shell.ps1`
- `attachment-preview-shell.ps1`
- `audit-summary-shell.ps1`
- `inactive-intake-shell.ps1`
- `status-history-shell.ps1`
- `warning-review-shell.ps1`
- `filing-picker-read.ps1`
- `reopen-writeback.ps1`

These files are PowerShell-first on purpose because the current JSON runtime
and desk writeback loop already live under `tools/sync`.

The goal is not a finished admin product. The goal is a truthful first runtime
surface with stable seams that can later be consumed by a browser shell or a
thin API wrapper.
