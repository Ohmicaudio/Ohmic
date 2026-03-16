Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T105600Z-e51283b0

# Define Parallel Section Family Availability Report

## Goal

Define the report that shows whether at least two parallel section families are
alive with runway.

## Focus

- active family count
- successor depth by family
- blocked-family exception
- single-family emergency flag
- timestamp

## Acceptance

- one parallel-family-availability packet is explicit
- the two-family rule becomes directly reportable

## Result

- defined the availability report in
  `docs/systems/OHMIC_PARALLEL_SECTION_FAMILY_AVAILABILITY_REPORT_2026-03-16.md`
- made runway visibility depend on per-family hot and staged successor depth
