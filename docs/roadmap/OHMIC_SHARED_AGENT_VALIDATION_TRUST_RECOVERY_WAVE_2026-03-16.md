Status: implementation_packet
Date: 2026-03-16
Project: ohmic

# Ohmic Shared Agent Validation Trust Recovery Wave

## Purpose

Restore trust in the shared agent validation layer after the validator and
semantic-index tooling produced misleading or silent failure states.

## Included Outputs

- `B:\ohmic\agent-system\requests\ready\2026-03-16-recover-shared-agent-validation-trust-wave.md`
- `B:\ohmic\agent-system\requests\ready\2026-03-16-exclude-non-queue-readmes-from-agent-validator-input.md`
- `B:\ohmic\agent-system\requests\ready\2026-03-16-make-active-claim-files-heading-parse-crlf-safe.md`
- `B:\ohmic\agent-system\requests\ready\2026-03-16-fail-loudly-on-unknown-semantic-index-repo-names.md`

## Unified Outcome

The shared tooling should stop pretending that malformed queue state and valid
queue state are the same thing.

This wave keeps the coordination layer trustworthy enough to support the other
work tracks.

## What Changed

In `tools/sync`:

- `validate-agent-system.ps1` now ignores non-queue `README.md` files in both
  `requests/` and `memory/`
- `validate-agent-system.ps1` now treats `# Files` as CRLF-safe when validating
  live claim files
- `agent-work-poll.ps1`, `reconcile-agent-json-runtime.ps1`, and
  `agent-request.ps1` now ignore `README.md` support files instead of treating
  them like queue entries

In `tools/semantic-index`:

- `indexer.py` now fails loudly when `--repo` names do not match corpus entries
- the error message now lists the valid repo names instead of silently
  succeeding with an empty plan

## Verification

Ran:

- `powershell -NoProfile -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\agent-work-poll.ps1 once -Json`
- `powershell -NoProfile -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\validate-agent-system.ps1 -Json`
- `python B:\ohmic\tools\semantic-index\indexer.py --manifest B:\ohmic\tools\semantic-index\corpus.yaml --dry-run --repo does-not-exist`
- `python B:\ohmic\tools\semantic-index\indexer.py --manifest B:\ohmic\tools\semantic-index\corpus.yaml --dry-run --repo Ohmic`

Result:

- work-poll succeeded and emitted ready work without README noise
- validator no longer emits README-based false positives and still reports the
  current live claim as valid
- unknown semantic-index repo selection now fails loudly with an explicit list
  of valid repos
- valid semantic-index repo selection still succeeds in dry-run mode

## Remaining Boundary

This slice did not solve the broader request-metadata contract mismatch.

`validate-agent-system.ps1` still reports many request files as invalid because
the validator expects a richer metadata header than the current queue packet
files actually carry. That is a separate trust-recovery seam, not part of this
packet.
