Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T024639Z-d2867c94

# Define Task Completion Correctness Report Model

## Goal

Define how a completed task should be evaluated for actual correctness instead
of being treated as successful just because files changed or a note was written.

## Focus

- acceptance criteria mapping
- verification evidence
- scope adherence
- rework/reopen indicators

## Acceptance

- one correctness report model is defined
- a task can be marked complete and evaluated separately for correctness
- future reporting can distinguish throughput from quality

## Result

- defined the correctness object in
  `docs/systems/OHMIC_TASK_COMPLETION_CORRECTNESS_REPORT_MODEL_2026-03-16.md`
- separated closure state from actual quality using acceptance mapping,
  verification evidence, scope adherence, reopen tracking, and user acceptance
  state
- made future reporting able to distinguish fast throughput from stable,
  well-verified work
