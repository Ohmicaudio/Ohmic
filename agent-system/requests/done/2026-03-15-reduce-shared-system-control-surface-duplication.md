scope: system
authority: working
project: ohmic
status: done
requested: 2026-03-15
requester: agent
origin: agent
priority: later
blocking: no
depends_on: 2026-03-15-build-shared-agent-system-validator, 2026-03-15-design-cross-platform-agent-system-cli-path
handoff_from:
claim_id:
topic: system-simplification

# Reduce Shared System Control Surface Duplication

## Requested Outcome

Reduce unnecessary duplication between:

- queue files
- board docs
- generated state
- memory surfaces

without removing the useful parts of the current system.

## Scope

- `agent-system/requests/*`
- `docs/roadmap/*`
- `generated/agent-work/*`
- shared coordination rules that define which surface is canonical for what

## Constraints

- do not collapse everything into one giant file
- preserve human readability and git diffability
- treat this as simplification, not architectural theater

## Notes

- the current system is usable, but routine execution now has more live
  coordination surfaces than necessary
- simplification should follow correctness repairs, not replace them

## Ready When

- the canonical role of each coordination surface is clearer
- board docs stop competing with the actual queue

## Suggested Claim Scope

- `B:\ohmic\agent-system`
- `B:\ohmic\docs\roadmap`
- `B:\ohmic\generated\agent-work`
