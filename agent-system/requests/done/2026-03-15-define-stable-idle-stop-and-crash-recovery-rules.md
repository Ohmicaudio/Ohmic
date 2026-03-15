Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic

# Define Stable Idle Stop And Crash Recovery Rules

## Goal

Define when the live JSON loop should sleep or stop, and how it recovers from a
crash without losing work.

## Focus

- stable idle vs temporary quiet
- idle counter/backoff
- crash recovery inputs
- stale lease cleanup

## Acceptance

- one clear stop model
- one clear crash-recovery model
- does not confuse “no queue items” with “system is truly idle”

## Outcome

Completed on 2026-03-15.

Result:

- defined stable idle as a full-system condition, not a momentary quiet queue
- added a practical backoff ladder and explicit sleep/stop distinction
- defined crash-recovery inputs and restart sequence around inbox, outbox,
  locks, state, and repo-backed truth
