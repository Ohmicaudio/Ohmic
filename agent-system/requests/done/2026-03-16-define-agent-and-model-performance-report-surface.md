Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T024949Z-2f723c7d

# Define Agent And Model Performance Report Surface

## Goal

Define the reporting surface that summarizes agent and model performance based
on tasks assigned, tasks completed, correctness, and rework.

## Focus

- per-agent reporting
- per-model reporting where available
- completion vs correctness
- error and rework rates

## Acceptance

- one reporting surface is defined
- the metrics are tied to task outcomes
- the system can show useful performance information without becoming punitive

## Result

- defined the reporting layer in
  `docs/systems/OHMIC_AGENT_AND_MODEL_PERFORMANCE_REPORT_SURFACE_2026-03-16.md`
- tied agent and model summaries to correctness, reopen, rework, scope, and
  token usage instead of raw closure counts alone
- kept the surface diagnostic and non-punitive so it can guide improvement
  without teaching the system to game easy throughput
