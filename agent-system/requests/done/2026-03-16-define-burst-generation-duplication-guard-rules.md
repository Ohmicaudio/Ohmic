Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Burst Generation Duplication Guard Rules

## Goal

Define how burst packet generation avoids producing near-duplicate child tasks.

## Focus

- same-family duplication
- overlapping child packets
- stale child suppression
- lineage comparison
- operator override

## Acceptance

- one duplication-guard packet is explicit
- burst refills stay truthful instead of noisy
Claim ID: 20260316T102232Z-f0698b6a

## Result

Defined the duplication guards so burst generation prefers strengthening or linking existing packets over cloning them.
