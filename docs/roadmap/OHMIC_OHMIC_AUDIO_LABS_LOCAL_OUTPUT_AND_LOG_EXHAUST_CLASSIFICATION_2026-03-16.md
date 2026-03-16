Status: implementation_packet
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Audio Labs Local Output And Log Exhaust Classification

## Purpose

Classify the local logs, captures, staging folders, test reports, and ad hoc
bundles in `ohmic-audio-labs` so disposable exhaust is separated from
temporary-but-meaningful local data.

## Current Local Exhaust Surface

Current obvious local-only exhaust includes:

- `backend_err.txt`
- `backend_log.txt`
- `backend_new_log.txt`
- `backend_final_log.txt`
- `dev.log`
- `dev-mobile.log`
- `captures/*`
- `output/*`
- `playwright-report/*`
- `test-results/*`
- `tmp/*`
- `content-work.zip`
- `sigma-flow-xml-skill-v3.zip`

Current local staging or runtime-output surfaces that may still hold temporary
operational value:

- `content-work/*`
- `services/backend/storage/measurement-captures/*`

## Classification Rule

Split this class into:

1. disposable local exhaust
2. retain-temporarily local runtime output
3. relocate-out-of-repo staging material

## Disposable Local Exhaust

These are disposable after the immediate debugging or review loop:

- `backend_*.txt`
- `dev.log`
- `dev-mobile.log`
- `playwright-report/*`
- `test-results/*`
- `tmp/*`

Why:

- they are local run residue
- they do not look like durable source truth
- they should not remain mixed into repo status by default

## Retain-Temporarily Runtime Output

These may be useful for short-lived debugging or measurement review, but they
should not stay as ambient repo dirt:

- `captures/*`
- `output/*`
- `services/backend/storage/measurement-captures/*`

Why:

- they may contain operational evidence or measurement payloads
- they are still runtime exhaust, not primary source
- they want retention or relocation rules, not indefinite repo residency

## Relocate-Out-Of-Repo Staging Material

These look like staging/import/reference bundles and should move to a local-only
holding area instead of staying in the repo root:

- `content-work/*`
- `content-work.zip`
- `sigma-flow-xml-skill-v3.zip`

Why:

- they are not normal product source layout
- they carry possible working value
- they should live in local staging space, not ambient repo churn

## Boundary Rule

Do not confuse local exhaust with source truth.

In particular:

- do not delete tracked source because it mentions logging or output
- do not treat `services/backend/storage/device-registry.test.json` as junk
- do not treat real product captures as permanent repo residents without a
  retention decision

## Safe Next Order

1. define the local output retention boundary
2. define capture and log relocation targets
3. define ignore vs cleanup vs local-only rules for these classes

## Outcome Standard

If this classification holds, then:

- logs and test reports stop muddying repo truth
- temporary captures get a retention rule
- staging bundles get moved out of the repo instead of becoming immortal clutter
