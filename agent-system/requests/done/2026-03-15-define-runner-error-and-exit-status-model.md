Status: done
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Runner Error And Exit Status Model

## Goal

Define how the future wrapper should classify recoverable errors, fatal errors,
and exit statuses for one-shot and long-running loop modes.

## Focus

- recoverable vs fatal error classes
- sleep vs stop exit conditions
- recommended status codes or status labels

## Acceptance

- one explicit error/exit model exists
- it fits the runner-wrapper cycle and stable-idle rules
- it stays separate from business/task status

## Outcome

Completed on 2026-03-15.

Result:

- defined recoverable vs fatal wrapper error classes
- separated runtime error/exit status from business/task result status
- documented continue, backoff, sleep, and stop decisions for one-shot and
  long-running modes
