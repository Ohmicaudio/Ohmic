Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

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
