Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic-audio-labs

# Record OSM Tailwind Content Warning Followup

## Goal

Capture the non-blocking Tailwind content warning from the OSM build so it can
be resolved deliberately later instead of getting lost.

## Source

- `agent-system/requests/done/2026-03-15-verify-first-osm-web-editor-shell-slice-in-node-worktree.md`

## Focus

- OSM Tailwind `content` warning
- exact package/config ownership
- follow-on fix path

## Acceptance

- one small follow-on task exists for the OSM Tailwind warning
- the warning is not treated as build failure
- ownership is clearer for later cleanup

## Completion Notes

- Follow-up note created at
  `docs/roadmap/OHMIC_OSM_TAILWIND_CONTENT_WARNING_FOLLOWUP_2026-03-15.md`
- The warning is recorded as a config-ownership gap, not a failed OSM build
- Current read is that the OSM workspace does not expose a local
  `tailwind.config.*` or `postcss.config.*` file
- This keeps the verified editor-shell slice closed while preserving the later
  config cleanup need
