project: ohmic-administrator
effective: 2026-03-18
status: active
pivot_type: repo-extraction
previous_primary_surface: B:\ohmic\apps\administrator
current_primary_surface: B:\ohmic\repos\ohmic-administrator

# Ohmic Administrator Product Extraction Queue Epoch

## Pivot Summary

The administrator desk stopped being a side app inside the umbrella repo and
became a separate product repo at:

- `B:\ohmic\repos\ohmic-administrator`

That means pre-extraction queue packets that still describe the old local shell,
old path assumptions, or pre-runtime-core boundaries are no longer automatically
safe to treat as current `ready` work.

## Affected queue family

Any pre-epoch queue packet primarily about:

- administrator stack semantics
- hybrid/orchestrator/admin stack balance
- projection fallback policy
- queue truth behavior for the old embedded administrator shell

must be re-reviewed before reuse.

## Required action

1. demote affected pre-epoch packets out of `ready/`
2. seed a fresh post-extraction ready wave in `ohmic-administrator`
3. use `queue_epoch: 2026-03-18-ohmic-administrator-product-extraction` on
   replacement packets

## Reliability rule

If a future pivot changes the primary repo, runtime, or execution model again,
create a new epoch record instead of silently continuing to trust the old wave.
