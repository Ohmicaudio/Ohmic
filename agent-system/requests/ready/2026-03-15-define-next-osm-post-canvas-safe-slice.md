Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Define Next OSM Post-Canvas Safe Slice

## Goal

Define the next bounded OSM slice that should follow the one-file
`CanvasView.tsx` theme-token commit.

## Focus

- choose one coherent OSM editor-shell or support-panel family
- keep generated `dist/` and `node_modules/` noise out
- avoid reopening the whole OSM workspace at once

## Acceptance

- one explicit OSM follow-on packet exists
- the next OSM pickup can start from a named slice instead of rediscovery
- queue continuity is preserved after the canvas commit
