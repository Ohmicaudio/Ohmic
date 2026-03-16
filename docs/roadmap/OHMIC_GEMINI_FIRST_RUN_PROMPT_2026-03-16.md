Status: operator_packet
Date: 2026-03-16
Project: ohmic

# Ohmic Gemini First Run Prompt

## Where To Launch

Launch Gemini from:

- `B:\ohmic`

That keeps the shared Ohmic system as the working context for the first route
training pass.

## What To Tell Gemini

Use this as the first prompt:

```text
You are onboarding into the Ohmic shared system in B:\ohmic.

Read only these files first:
- B:\ohmic\docs\systems\OHMIC_GEMINI_ONBOARDING_AND_EVALUATION_RULES_2026-03-16.md
- B:\ohmic\docs\roadmap\OHMIC_GEMINI_ROUTE_TRAINING_STACK_2026-03-16.md
- B:\ohmic\docs\roadmap\OHMIC_WORKER_START_STACK_2026-03-16.md

Then do only this task:
- B:\ohmic\agent-system\requests\ready\2026-03-16-run-gemini-first-bounded-doc-packet.md

Rules:
- Stay inside B:\ohmic
- Do not touch child repos
- Do not refill or reshape the queue
- Do not edit files already under active claim
- Make only the minimum files needed for the task
- If blocked, say exactly what blocked you
- If you make changes, verify them honestly
- Summarize exactly what you changed and what you did not change

Before editing, tell me:
1. which files you plan to read
2. which files you plan to edit
3. what you believe the acceptance criteria are

Do not start broad cleanup. Do not improvise unrelated work.
```

## What To Expect

A good first Gemini run should:

- stay in `B:\ohmic`
- read only the named onboarding files
- pick one bounded doc packet
- avoid unrelated edits
- report honestly if blocked

## What To Reject

Stop and correct Gemini if it:

- starts scanning unrelated repos
- edits queue/runtime files without being asked
- invents success
- changes more files than the task needs
- drifts into orchestration or reprioritization

## Second Prompt If Pass 1 Goes Well

If the first bounded doc packet is good, use:

```text
Good. Now do the next onboarding task only:
- B:\ohmic\agent-system\requests\ready\2026-03-16-run-gemini-first-verification-packet.md

Use the same boundaries:
- stay in B:\ohmic
- no unrelated edits
- honest verification only
- summarize pass/fail clearly
```
