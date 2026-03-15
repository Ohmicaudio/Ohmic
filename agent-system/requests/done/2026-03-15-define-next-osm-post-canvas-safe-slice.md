Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T132203Z-8e9c8b5f

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

## Outcome

Completed on 2026-03-15.

Result:

- defined the next OSM follow-on as the `TopBar.tsx` editor-shell chrome slice
- chose it because the remaining visible shell drift is concentrated there:
  hard-coded button colors plus mojibake icon labels
- kept the next packet bounded to one component and fenced out `dist/`,
  nested `node_modules/`, and the wider inspector/equipment families

## Verification

- inspected remaining OSM worktree status with:
  `git status --short -- products/ohmic-osm`
- confirmed no tracked OSM diffs remained beyond generated/install noise after
  the canvas slice landed
- reviewed remaining editor-shell surfaces and found `TopBar.tsx` as the
  strongest next one-file packet

## Follow-Up

- `2026-03-15-commit-osm-topbar-shell-token-and-label-slice.md`
