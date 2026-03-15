Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

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
