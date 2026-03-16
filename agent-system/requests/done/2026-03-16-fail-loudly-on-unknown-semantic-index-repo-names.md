Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T110947Z-9f0e4b2a

# Fail Loudly On Unknown Semantic Index Repo Names

## Goal

Stop the semantic-index CLI from silently succeeding when the requested repo
name does not match a configured corpus entry.

## Source

- `docs/roadmap/OHMIC_SHARED_AGENT_VALIDATION_TRUST_RECOVERY_WAVE_2026-03-16.md`

## Focus

- repo-name matching behavior
- dry-run/operator feedback
- silent-empty-plan prevention

## Acceptance

- unknown repo names emit an explicit warning or failure state
- operators can distinguish "nothing to do" from "bad repo selector"

## Result

- added explicit repo-name validation in `tools/semantic-index/indexer.py`
- `--repo does-not-exist` now fails loudly and lists valid repo names
- valid repo selection still succeeds in dry-run mode
