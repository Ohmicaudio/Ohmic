# Ohmic Queue Claim Aware Headroom Boundary

Date: 2026-03-16
Project: ohmic

## Purpose

Define how queue headroom metrics should treat packets that remain in `ready/`
while already active under claim.

## Core Rule

Claimed tasks stored in `ready/` are not truly headroom.

They may still be physically present in the folder, but runtime counts should
exclude them from hot-ready availability.

## Boundary Rule

Suggested distinction:

- `ready_file_count` = raw on-disk ready files
- `hot_ready_count` = ready tasks not currently under active claim
- `active_in_ready_count` = ready tasks still stored in `ready/` but already
  claimed

## Reporting Rule

Dashboard and runtime health should use `hot_ready_count`, not `ready_file_count`.

Raw file count may still be useful for audits and reconciliation views.

## First Safe Implementation

The first implementation only needs:

- active-claim exclusion from headroom
- separate active-in-ready count
- explicit naming so counts are not confused

That is enough to stop headroom overcounting.
