scope: project
authority: working
project: ohmic-administrator
status: ready
requested: 2026-03-19
requester: codex
origin: agent
priority: now
blocking: yes
depends_on:
handoff_from:
claim_id:
topic: test-reliability
queue_epoch: 2026-03-18-ohmic-administrator-product-extraction
review_after:
review_status: current
supersedes:

# review-admin-api-timeout-flake-and-split-slow-tests

## Requested Outcome

- identify why the admin-api suite still intermittently times out on the first
  full run
- either make the slow tests deterministic or isolate them so the main floor is
  trustworthy

## Scope

- `B:\ohmic\repos\ohmic-administrator\services\admin-api`

## Constraints

- preserve the actual coverage
- do not paper over the flake by just dropping meaningful tests

## Notes

- this is the most visible reliability gap during current queue-driven work

## Ready When

- the timeout cluster is reproducible enough to debug or isolate honestly

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-administrator\services\admin-api`
