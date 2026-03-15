Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T140408Z-d60c85b9

# Define Dashboard Empty And No-Work State

## Goal

Define how the dashboard should look and speak when there is no pending input
and the loop is in a stable idle or no-work state.

## Focus

- empty queue messaging
- stable idle messaging
- no pending input messaging
- avoiding false “all done forever” claims

## Acceptance

- one bounded empty-state packet exists
- it matches the stable-idle rules already defined
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- separated true `stable_idle` from merely `temporarily_clear`
- tied empty-state messaging to both idle rules and freshness trust
- blocked absolute "all done forever" wording from the dashboard surface

## Artifact

- `docs/systems/OHMIC_DASHBOARD_EMPTY_AND_NO_WORK_STATE_2026-03-15.md`
