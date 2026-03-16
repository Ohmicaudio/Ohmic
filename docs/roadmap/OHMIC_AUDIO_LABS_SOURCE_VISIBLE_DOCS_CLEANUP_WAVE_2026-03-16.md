# Ohmic Audio Labs Source-Visible Docs Cleanup Wave

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Package the next source-visible documentation cleanup wave inside
`ohmic-audio-labs` so live docs truth can be reviewed without mixing in local
output, archive clutter, or broad exploratory churn.

## In-Scope Docs Truth Surfaces

### Root Docs Truth

- `docs/AGENT_CONTEXT.md`
- `docs/README.md`
- `docs/repository-map.md`
- `docs/subsystem-index.md`
- `docs/ai-agent-manual.md`
- `docs/firmware-architecture.md`

These are still live orientation or system-truth surfaces.

### Tracked Docs Deletions Requiring Review

- `docs/PUBLIC_PAYLOAD_INVENTORY_2026-03-13.md`
- `docs/TRANSITIONAL_PUBLIC_PAYLOAD_BOUNDARY_2026-03-13.md`

These should be reviewed as intentional retirement or replacement, not buried
inside broader doc churn.

### Active Spec Churn That Still Reads As Source-Visible

Tracked modifications across:

- `docs/specs/*.md`
- `docs/specs/adr/*.md`
- `docs/specs/ui-runtime/README.md`

Examples include:

- product and hardware contracts
- backend/frontend traceability
- architecture and roadmap specs
- ADRs still shaping current system decisions

## Hold For Separate Docs Waves

Do not mix into this packet:

- untracked DSP/UI exploratory additions under `docs/specs/dsp-ui/**`
- untracked DSP firmware spec cluster files
- new ui-runtime exploratory docs under `docs/specs/ui-runtime/2026-03-11-*`

These are real docs, but they are too wide and exploratory to ride inside the
first source-visible cleanup wave safely.

## Cleanup Packet Shape

The first source-visible docs cleanup wave should do only:

1. classify root docs truth as keep/update/retire
2. review the two tracked deletions explicitly
3. package the tracked `docs/specs/**` and `docs/specs/adr/**` modifications
   into bounded review buckets

## Explicit Non-Goals

Do not mix in:

- archive or local-only material
- generated/runtime exhaust
- product code cleanup
- root config deletion review
- broad DSP/UI exploratory import waves

## Outcome

This wave turns the source-visible docs dirt into a real review packet instead
of one giant undifferentiated docs pile.
