# Ohmic Schema Centralization Governance Review

Date: 2026-03-14
Review target: `OHMIC_SCHEMA_CENTRALIZATION_PROPOSAL_2026-03-14.md`

## Overall Judgment

The immediate governance rule is good enough to adopt now.

That means:

- temporary canonical source: `ohmic-audio-labs/schemas`
- firmware and handheld stay as mirrors
- `ohmic-schemas` remains the future target, not an immediate migration

This is the right balance between contract discipline and current execution
pressure.

## Finding 1: `ohmic-audio-labs/schemas` Is A Good Temporary Canonical Source

Approve this temporary rule.

Why it works:

- the main app repo is the current software center of gravity
- it already carries schema-aware runtime and test surfaces
- software completion still outranks starting a new repo migration
- the app repo is the place most likely to notice schema breakage quickly

Important boundary:

This should stay explicitly temporary. It is an operational rule, not the final
architecture.

## Finding 2: Firmware And Handheld Should Remain Mirrors

Keep firmware and handheld as mirrors for now.

Why:

- they are consumers of the contract family
- they need local copies for build, validation, or documentation reasons
- they should not become competing authoring surfaces again

The proposal is right to frame them as reviewed consumers instead of peer
authorities.

## Finding 3: `ohmic-schemas` Should Be Created Later, Not Now

The dedicated schema repo should exist, but not yet.

If forced to name the trigger, it should be:

- after the current software-completion pressure drops
- after schema churn is high enough that mirror management starts costing real
  time
- after there is enough parity discipline to move into a dedicated publication
  path without creating a second messy migration

In other words:

Do not create `ohmic-schemas` just because it is architecturally cleaner.
Create it when the governance burden of not having it becomes meaningfully
higher than the migration cost.

## What Is Good Enough Right Now

The proposal already includes the right immediate guardrails:

- one file-authority source
- mirrored consumer copies
- change-control rule
- versioning rule
- ownership rule by affected layer
- future dedicated repo target

That is enough to stop contract drift before it becomes normal.

## Small Watchout

The current proposal says `after current software completion pressure drops`,
which is directionally right but still a little soft.

That is not a blocker to adoption.

It is just the one place where later documentation could get sharper by naming
the actual cutover triggers more explicitly.

## Recommended Adoption Position

Adopt the governance rule now:

- edit schemas canonically in `ohmic-audio-labs`
- mirror outward to firmware and handheld
- treat direct mirror edits as drift unless they are part of a controlled sync

Do not start `ohmic-schemas` until it becomes a real operational win instead of
another active migration lane.

## Follow-On Note

No blocking change is required before adopting this governance direction.

The only later refinement worth adding is a more explicit trigger list for when
the dedicated `ohmic-schemas` repo should be cut over from future target to
active migration.
