Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T144429Z-b4080872

# Define Dashboard Routine Status Fade Timing Rule

## Goal

Define the exact timing progression for how routine status should move from
fresh to fading to grouped/collapsed.

## Focus

- timing windows
- acceleration under higher-priority events
- relationship to output collapse

## Acceptance

- one bounded routine-fade packet exists
- it fits the routine-status decay rule
- it stays lightweight and operational

## Outcome

Completed on 2026-03-15.

Result:

- defined a three-stage routine lifecycle with exact windows for fresh, fading,
  and grouped or collapsed states
- added acceleration rules so routine rows yield earlier when higher-priority
  output appears
- kept repeated routine events from resetting old rows back to fresh noise

## Artifact

- `docs/systems/OHMIC_DASHBOARD_ROUTINE_STATUS_FADE_TIMING_RULE_2026-03-15.md`
