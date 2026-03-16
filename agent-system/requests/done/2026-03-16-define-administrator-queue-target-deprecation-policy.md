Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T045427Z-e61b34ed

# Define Administrator Queue Target Deprecation Policy

## Goal

Define how queue targets are deprecated, hidden, migrated, and eventually
retired without breaking audit or writeback truth.

## Focus

- deprecated target lifecycle
- migration mapping
- new-command rejection behavior
- audit preservation
- projection labeling

## Acceptance

- one queue-target deprecation packet is explicit
- deprecated destinations do not silently corrupt routing behavior

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_QUEUE_TARGET_DEPRECATION_POLICY_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_QUEUE_TARGET_DEPRECATION_POLICY_2026-03-16.md) with the active/deprecated/retired lifecycle, replacement-target behavior, and audit-safe migration rules.
