id: 2026-03-13-agent-transaction-layer-normalization
thread_id: agent-transaction-layer
kind: proposal
status: active
project: ohmic
created: 2026-03-13
author: codex
relates_to: B:\ohmic\docs\systems\DYNAMIC_MEMORY_AND_COORDINATION_PROPOSAL_2026-03-13.md
resolves:
promoted_to:

# Summary

Normalize proposal, question, answer, plan, and response records into one transaction layer with different kinds.

## Context

- the dynamic memory proposal already argued for lighter generated coordination surfaces
- the current agent system already treats proposals as important, but not as first-class records
- the current request/question split can miss that a proposal may answer a question or that a response may close a plan

## Body

Adopt `transactions/` as the deeper cross-agent event layer.

Keep:

- `requests/` as the actionable queue
- `jobs/` as the active execution lock layer
- `memory/` as promoted durable truth

Use transaction records when the main value is not "do this task" but "track the thread of reasoning and how one record resolves another."

This proposal directly extends:

- `B:\ohmic\docs\systems\DYNAMIC_MEMORY_AND_COORDINATION_PROPOSAL_2026-03-13.md`

The implementation should stay additive and local-first.

## Next Action

- generate transaction-aware session briefs and state mirrors
- use transactions for future proposal/question/answer/plan/response chains
- promote durable outcomes into memory or project overlays only when stable
