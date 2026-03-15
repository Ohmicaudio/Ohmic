scope: system
authority: working
project: ohmic
status: done
requested: 2026-03-15
requester: agent
origin: agent
priority: soon
blocking: no
depends_on: 2026-03-15-normalize-shared-claim-file-schema-and-repair-live-claims, 2026-03-15-repair-generated-agent-state-freshness-and-staleness-detection
handoff_from:
claim_id:
topic: system-validation

# Build Shared Agent System Validator

## Requested Outcome

Create one validation path that can catch common shared-system integrity issues
before they become coordination bugs.

## Scope

- validate active claims
- validate request metadata
- validate memory headers
- detect stale or malformed generated state if practical

## Constraints

- start narrow
- prefer machine-readable output plus a human summary
- do not redesign the whole system while building the validator

## Notes

- current system allows malformed claims and stale generated state to linger
- validation is the best low-complexity way to harden a file-backed model
- this should follow the first live-schema and snapshot repairs, not precede
  them

## Ready When

- one validator can flag the main consistency problems
- at least claim/request/schema drift is detectable automatically

## Suggested Claim Scope

- `B:\ohmic\tools\sync`
- `B:\ohmic\agent-system\memory`
- `B:\ohmic\agent-system\requests`
- `B:\ohmic\agent-system\jobs`
