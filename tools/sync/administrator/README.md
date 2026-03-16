# Administrator Sync Runtime

This folder holds the first bounded Master Administrator runtime seams that sit
on top of the shared JSON loop.

Current scaffolds:

- `command-reason-catalog.ps1`
- `overlay-action-resolution.ps1`
- `queue-target-validation.ps1`
- `approval-evaluation.ps1`
- `command-composer.ps1`

These files are PowerShell-first on purpose because the current JSON runtime
and desk writeback loop already live under `tools/sync`.

The goal is not a finished admin product. The goal is a truthful first runtime
surface with stable seams that can later be consumed by a browser shell or a
thin API wrapper.
