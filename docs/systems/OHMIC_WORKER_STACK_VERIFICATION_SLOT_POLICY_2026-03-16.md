# Ohmic Worker Stack Verification Slot Policy

Date: 2026-03-16
Project: ohmic

## Purpose

Define what belongs in the verification slot.

## Verification Slot

Use the verification slot for:

- regression checks tied to the just-touched surface
- route or smoke verification tied to the active lane
- truth checks needed before closeout

## Rule

There should be at most one explicit verification slot at a time. If several
checks are needed, the system should queue them as clearer packets instead of
hiding them all in one local slot.
