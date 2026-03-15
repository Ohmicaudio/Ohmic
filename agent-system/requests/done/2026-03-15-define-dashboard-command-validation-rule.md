Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T142359Z-4a8d40f8

# Define Dashboard Command Validation Rule

## Goal

Define the light validation rules for dashboard command input before a message
is accepted into the inbox.

## Focus

- empty input rejection
- whitespace trimming
- maximum practical length
- preserving user wording where possible

## Acceptance

- one bounded validation packet exists
- it fits the command-box and writeback flow work
- it stays lightweight and does not become full prompt policing

## Outcome

Completed on 2026-03-15.

Result:

- defined a lightweight validation contract for trimming, empty-input rejection,
  and a practical max length
- kept the rule explicitly out of prompt-policing territory so the dashboard
  only validates enough to safely enqueue
- aligned the packet to the existing command-box and input-writeback flow docs

## Artifact

- `docs/systems/OHMIC_DASHBOARD_COMMAND_VALIDATION_RULE_2026-03-15.md`
