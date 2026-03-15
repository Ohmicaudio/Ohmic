Status: done
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Command Acknowledgement State

## Goal

Define the small acknowledgement state shown after a command is accepted into
the inbox but before the loop has fully answered it.

## Focus

- accepted vs pending language
- when acknowledgement clears
- avoiding false “completed” signals

## Acceptance

- one bounded acknowledgement-state packet exists
- it fits the input writeback flow and command-box behavior work
- it stays lightweight and dashboard-focused

## Outcome

Completed on 2026-03-15.

Result:

- defined the accepted/pending acknowledgement state separate from completion
- documented when it appears, when it clears, and what language it should use
- kept acknowledgement lightweight and free of false success wording
