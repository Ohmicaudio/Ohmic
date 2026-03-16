Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T055707Z-a8ef9918

# Scaffold Administrator Attachment Preview Shell Module

## Goal

Define or scaffold the first shell module that renders attachment preview
references and preview-failure states.

## Focus

- preview refs
- preview kind labels
- preview unavailable states
- failure review handoff
- empty state

## Acceptance

- one preview shell packet is explicit
- attachment preview rendering has a concrete module seam

## Result

Done. The attachment-preview shell module now lives in
`tools/sync/administrator/attachment-preview-shell.ps1` and renders projected
preview refs, availability states, fallback labels, preview failure reasons,
and warning-lane handoff actions.
