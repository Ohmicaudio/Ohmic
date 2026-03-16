# Ohmic Queue Runtime Ready Count Filter

Date: 2026-03-16
Project: ohmic

## Purpose

Define the runtime filter that produces the truthful ready count used by queue
health projections and dashboard cards.

## Core Rule

Runtime ready count should follow status truth first, then exclude actively
claimed packets from hot-ready availability.

## Filter Rule

Include a task only when:

- request status is `ready`
- request is not blocked or done
- request is not already active under claim

## Missing-Status Fallback

If a ready file is missing explicit status metadata:

- do not silently treat it as hot-ready
- classify it as `unknown_status_ready_path`
- surface it in reconciliation or audit views

## First Safe Implementation

The first implementation only needs:

- `Status: ready` filtering
- active-claim exclusion
- missing-status fallback
- explicit count output

That is enough to publish a real hot-ready count instead of a folder count.
