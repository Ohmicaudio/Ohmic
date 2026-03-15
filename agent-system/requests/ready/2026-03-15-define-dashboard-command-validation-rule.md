Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

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
