# Ohmic Task Completion Correctness Report Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define how a completed task should be evaluated for actual correctness instead
of being treated as successful just because files changed or a note was
written.

## Core Rule

Completion and correctness are related, but they are not the same thing.

A task may be:

- completed and correct
- completed and uncertain
- completed and later reopened
- completed with user acceptance but weak verification

The system should record those differences explicitly.

## Why This Model Is Needed

Without a correctness model, throughput metrics get inflated by:

- low-verification closures
- tasks that reopen quickly
- output accepted only because the user gave up
- docs or code changes that did not actually satisfy acceptance criteria

That makes raw completion counts misleading.

## Recommended Report Object

Suggested object:

`TaskCompletionCorrectnessReport`

Minimum fields:

- `task_ref`
- `completed_at`
- `completed_by`
- `acceptance_criteria_status`
- `verification_evidence[]`
- `scope_adherence`
- `rework_risk`
- `reopen_status`
- `user_acceptance_state`
- `correctness_grade`
- `notes`

## Acceptance Criteria Mapping

Each task should record whether its stated acceptance was:

- fully met
- partially met
- not verifiable
- unmet

Recommended field:

`acceptance_criteria_status`

Suggested values:

- `met`
- `partially_met`
- `not_verified`
- `unmet`

This keeps the report grounded in the actual task contract instead of vibes.

## Verification Evidence

Every correctness report should record what evidence supported closure.

Examples:

- named test commands and pass/fail result
- manual smoke checks
- build success
- screenshot or device verification
- route or HTTP checks
- "no tests available" with reason

Suggested evidence fields:

- `evidence_kind`
- `label`
- `result`
- `reference`

## Scope Adherence

A task can be correct in one narrow sense while still violating scope.

Recommended field:

`scope_adherence`

Suggested values:

- `clean`
- `minor_drift`
- `major_drift`

Examples:

- task solved the right problem without widening unexpectedly -> `clean`
- task included small extra cleanup -> `minor_drift`
- task spread into unrelated work -> `major_drift`

## Rework And Reopen Indicators

Correctness should consider what happened after closure.

Recommended fields:

- `rework_risk`
  - `low`
  - `medium`
  - `high`
- `reopen_status`
  - `not_reopened`
  - `reopened`
  - `reopened_multiple_times`

If a task reopens quickly, the original closure should not look as strong as a
closure that stayed stable.

## User Acceptance State

User acceptance matters, but it should be labeled accurately.

Suggested values:

- `user_confirmed`
- `user_silent`
- `accepted_as_is`
- `operator_closed`

Important rule:

- `accepted_as_is` is not the same as verified correctness

It means the user accepted the current state, not that the system proved the
work was objectively strong.

## Correctness Grade

Recommended summary grade:

- `strong`
- `acceptable`
- `uncertain`
- `weak`

Suggested interpretation:

- `strong`
  - acceptance met, evidence exists, no scope drift, no reopen signal
- `acceptable`
  - mostly sound but not deeply verified
- `uncertain`
  - completed with weak or missing evidence
- `weak`
  - closure happened, but criteria or evidence are clearly insufficient

## Minimal Example Shape

```json
{
  "task_ref": "2026-03-16-define-provider-agnostic-intake-envelope",
  "completed_at": "2026-03-16T02:29:00Z",
  "completed_by": "worker:d",
  "acceptance_criteria_status": "met",
  "verification_evidence": [
    {
      "evidence_kind": "doc_contract_review",
      "label": "architecture packet written",
      "result": "pass",
      "reference": "docs/architecture/OHMIC_PROVIDER_AGNOSTIC_INTAKE_ENVELOPE_2026-03-16.md"
    }
  ],
  "scope_adherence": "clean",
  "rework_risk": "medium",
  "reopen_status": "not_reopened",
  "user_acceptance_state": "operator_closed",
  "correctness_grade": "acceptable",
  "notes": "Architecture packet complete; implementation proof deferred."
}
```

## Reporting Use

This model should support:

- comparing completion volume versus actual quality
- identifying noisy reopen-prone task families
- correlating token usage with correctness
- showing whether a worker is shipping stable work or just fast work

## Safe First Implementation

The first implementation only needs:

1. one correctness report object written at task close
2. acceptance-criteria status
3. evidence list
4. scope adherence
5. reopen tracking hook

That is enough to separate "done" from "good."

## Immediate Follow-On

This report model should feed:

1. agent and model performance report surface
2. live task route training lane
3. later worker graduation checkpoints
