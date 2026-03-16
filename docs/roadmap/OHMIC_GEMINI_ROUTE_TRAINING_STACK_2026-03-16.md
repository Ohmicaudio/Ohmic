Status: active_handoff_board
Date: 2026-03-16
Project: ohmic

# Ohmic Gemini Route Training Stack

## Purpose

Give Gemini a bounded real-task onboarding path using current Ohmic context
without letting it reshape the board before it has earned trust.

## Run Context Rule

Launch Gemini from the folder that matches the task.

Examples:

- `B:\ohmic` for shared-system docs and queue packets
- child repo root only when the task explicitly belongs there

## First Task Order

### 1. Run first bounded doc packet

Task:

- `run-gemini-first-bounded-doc-packet`

Why first:

- lowest-risk way to test scope discipline and output destination behavior

### 2. Run first verification packet

Task:

- `run-gemini-first-verification-packet`

Why second:

- we need honesty about reality, not just text generation

### 3. Review initial correctness and rework rate

Task:

- `review-gemini-initial-correctness-and-rework-rate`

Why third:

- trust should rise only if the first two passes hold up under review

## Suggested First Real Packet

Best current shape:

- one doc packet in `B:\ohmic`
- exact file target named in the prompt
- acceptance criteria copied into the prompt
- explicit instruction to avoid unrelated edits

## Restrictions

Gemini should not start with:

- queue refills
- priority decisions
- mixed repo work
- unbounded implementation
- files already under active claim

## Graduation Rule

If Gemini passes the first doc packet and first verification packet with low
rework, move it to a single narrow implementation slice next.
