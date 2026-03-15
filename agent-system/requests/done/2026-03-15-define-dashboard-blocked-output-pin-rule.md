Status: done
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Dashboard Blocked Output Pin Rule

## Goal

Define the exact pinning behavior for blocked or needs-input output so those
events stay visible even while lower-priority output continues to arrive.

## Focus

- pin duration
- replacement rules
- relationship to completion and routine-status events

## Acceptance

- one bounded blocked-pin packet exists
- it fits the output-priority and output-collapse rules
- it stays lightweight and dashboard-focused
