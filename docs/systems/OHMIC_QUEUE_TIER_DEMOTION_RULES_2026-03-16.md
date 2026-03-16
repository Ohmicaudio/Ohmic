# Ohmic Queue Tier Demotion Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define when hot-ready tasks should be demoted back to warm queued or colder
reserve instead of lingering forever in the ready lane.

## Core Rule

Hot-ready should stay fresh.

Demotion exists to remove stale, obsolete, or lower-priority packets without
losing queue truth.

## Demotion Conditions

Demotion is justified when:

- a ready packet is stale and not being claimed
- the packet was superseded by a better grouped burst
- the family is overrepresented in hot-ready relative to current pressure
- a near-ready blocked dependency means the packet is not truly hot anymore

## Preferred Destinations

Suggested demotion order:

- first back to warm same-family reserve
- then to warm cross-family reserve
- then to cold queueable only when the packet is still truthful but far-term

Demotion should not silently become deletion.

## Obsolete Packet Rule

If a packet is truly obsolete rather than merely demoted, the system should:

- mark it explicitly obsolete or superseded
- preserve auditability
- avoid returning it to warm reserve as if it were still valid

## First Safe Implementation

The first implementation only needs:

- stale-ready demotion rule
- overrepresented-family demotion rule
- warm-first demotion destination
- explicit obsolete-versus-demoted distinction

That is enough to keep hot-ready from bloating with stale packets.
