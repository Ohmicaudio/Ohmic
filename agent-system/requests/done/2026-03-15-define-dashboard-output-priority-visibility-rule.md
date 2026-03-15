Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T141602Z-14de8408

# Define Dashboard Output Priority Visibility Rule

## Goal

Define how blocked, needs-input, completion, and routine status events should
be visually prioritized in the dashboard output surfaces.

## Focus

- event priority ordering
- what stays visible longer
- how routine status should de-emphasize itself

## Acceptance

- one bounded visibility-priority packet exists
- it fits the recent-output pane and status card work
- it stays lightweight and contract-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined a clear output visibility ladder with `blocked` and `needs_input`
  above completion and routine status
- separated output visibility priority from queue priority
- fixed relative dwell rules so routine chatter rolls off before urgent items

## Artifact

- `docs/systems/OHMIC_DASHBOARD_OUTPUT_PRIORITY_VISIBILITY_RULE_2026-03-15.md`
