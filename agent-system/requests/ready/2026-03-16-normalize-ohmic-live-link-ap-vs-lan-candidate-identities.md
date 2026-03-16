Status: active
Priority: high
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T124119Z-fabe40cd

# Normalize Ohmic Live Link AP vs LAN Candidate Identities

## Goal

Fix the live-link candidate model so firmware AP identity, current LAN identity,
stale aliases, and host/self addresses stop collapsing into one misleading
candidate set.

## Focus

- AP vs LAN identity boundary
- stale alias demotion
- host/self candidate rejection
- post-fix rerun setup

## Acceptance

- one parent fix wave is explicit
- the next children are implementation-oriented, not abstract
