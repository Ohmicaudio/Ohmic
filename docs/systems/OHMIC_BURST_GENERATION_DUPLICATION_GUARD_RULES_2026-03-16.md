# Ohmic Burst Generation Duplication Guard Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how burst-generated task packets avoid re-creating work that already
exists in the queue or inside active claims.

## Guard Rules

- do not generate a child packet if the same objective already exists in
  `ready`, `active`, or `blocked`
- prefer strengthening an existing packet over cloning it
- treat active claims as hard collision boundaries
- treat recent `done` packets as duplicate evidence unless the burst is a new
  revision wave

## Rule

Burst generation should increase usable queue headroom, not flood the queue
with lookalike packets.
