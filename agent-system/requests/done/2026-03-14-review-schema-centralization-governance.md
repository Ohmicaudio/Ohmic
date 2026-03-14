status: done
priority: medium
project: ohmic
owner: d
created: 2026-03-14
depends_on:
  - /mnt/b/ohmic/docs/roadmap/OHMIC_SCHEMA_CENTRALIZATION_PROPOSAL_2026-03-14.md
  - /mnt/b/ohmic/docs/roadmap/OHMIC_PLAN_STATUS_DEFINITIONS_2026-03-14.md
claim_id: 20260314T231028Z-9f165b4c

# Review Schema Centralization Governance

## Objective

Review the schema-centralization proposal and decide whether the immediate
governance rule is good enough to adopt.

## Deliverables

- explicit review note on whether `ohmic-audio-labs/schemas` should be the
  temporary canonical source
- explicit review note on whether firmware and handheld should remain mirrors
- explicit review note on when `ohmic-schemas` should be created
- any required changes turned into follow-on queued work

## Notes

- this is a `review`, not implementation of a new repo right now
- current software completion still outranks schema-repo migration work
- the goal is to prevent future contract drift, not to start a new migration
  casually

## Completion

- created `docs/roadmap/OHMIC_SCHEMA_CENTRALIZATION_GOVERNANCE_REVIEW_2026-03-14.md`
- recorded an explicit review note that `ohmic-audio-labs/schemas` is good enough as the temporary canonical source
- recorded that firmware and handheld should remain mirrors for now
- recorded that `ohmic-schemas` should be created later, when the governance burden of the current arrangement outweighs the migration cost
- recorded that no blocking change is required before adopting the current governance direction
