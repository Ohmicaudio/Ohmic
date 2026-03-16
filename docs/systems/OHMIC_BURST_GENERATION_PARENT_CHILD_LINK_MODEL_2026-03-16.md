# Ohmic Burst Generation Parent Child Link Model

Date: 2026-03-16
Project: ohmic

## Purpose

Define how burst-generated packets relate to a parent queue objective.

## Parent Packet

The parent packet should:

- explain the shared objective
- define when the burst is complete
- point to the child family

## Child Packets

Each child packet should:

- be independently completable
- link back to the parent objective
- stay narrow enough for clean claiming

## Rule

The parent stays as the family frame. The children carry the actual executable
slices.
