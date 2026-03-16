# Ohmic Audio Labs Docs Truth Sweep

Date: 2026-03-15
Project: ohmic-audio-labs

## Purpose

Separate the active canonical docs from older backlog/spec churn so the docs
lane stops competing with product execution by default.

## Canonical Docs Corrected In This Packet

These still function as active operational truth and were updated to match the
current post-`public/*` reality:

- `B:\ohmic\repos\ohmic-audio-labs\docs\THREE_TIER_WEB_ARCHITECTURE.md`
- `B:\ohmic\repos\ohmic-audio-labs\docs\specs\STATIC_TOOL_DATA_GUIDELINES.md`
- `B:\ohmic\repos\ohmic-audio-labs\docs\specs\SHIP_EXECUTION_QUEUE.md`

What changed:

- repo-local `public/*` ownership was replaced with route-level truth and the
  canonical static-content repo path
- the active docs now describe `ohmic-audio-labs` as the interactive/runtime
  repo consuming static routes rather than owning the static tree directly

## Historical Or Backlog-Heavy Spec Churn

This doc still carries useful context, but it should no longer be read as live
repo-root truth without a deliberate follow-up normalization pass:

- `B:\ohmic\repos\ohmic-audio-labs\docs\specs\WEB_THREE_TIER_CONTENT_PIPELINE.md`

Reason:

- it still describes the older `software/web/public/*` import model
- it mixes historical pipeline detail with current architecture language

This packet labels that status explicitly instead of silently rewriting the
whole backlog-heavy document.

## Safe Next Packet

The next safe docs normalization packet is:

- retire or rewrite the remaining `software/web/*` pipeline-era docs and
  generated index/cache summaries that still describe repo-local `public/*` as
  the active static source root

That is a separate truth pass from the active operational docs corrected here.
