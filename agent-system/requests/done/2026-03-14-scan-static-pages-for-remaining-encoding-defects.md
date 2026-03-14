scope: project
authority: working
project: ohmic-audio-static-content
status: done
requested: 2026-03-14
requester: codex-local
origin: split
priority: now
blocking: no
depends_on:
handoff_from:
claim_id: 20260314T104255Z-3fc7846c
topic: requested-task

# Scan static pages for remaining encoding defects

## Completion

- no broad mojibake or replacement-character defect class was found across `B:\ohmic\repos\ohmic-audio-static-content\public`
- no active `â€”` / `â€“` / `Ã` / replacement-character drift was found in the current static public surface
- one concrete defect class was found: placeholder strings leaking into metadata on three installer-level `subwoofer-enclosures` pages
- the metadata leaks were fixed directly in `ohmic-audio-static-content` commit `2265e3f`

## Files With Fixed Metadata Leaks

- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\installer-level-design-and-tuning\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\installer-level-ts-parameter-based-selection\index.html`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures\installer-level-advanced-construction\index.html`

## Defect Classes Observed

### 1. Metadata placeholder contamination

Affected fields:

- `<meta name="description">`
- `<meta property="og:description">`
- JSON-LD `description`

Status:

- fixed

### 2. Remaining body placeholder backlog

Observed in `subwoofer-enclosures`:

- `38` remaining `VISUAL PLACEHOLDER` markers in body/index content

Status:

- not an encoding issue
- queued as graphics follow-up in `2026-03-14-split-second-wave-subwoofer-enclosures-placeholder-graphics-from-encoding-scan.md`

## Notes

- this scan confirms the current static-tier risk is localized metadata contamination and unfinished graphics families, not repo-wide text corruption
- future encoding work should stay targeted; a blind repo-wide rewrite is not justified by the current findings
