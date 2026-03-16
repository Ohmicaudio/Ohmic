# Ohmic System Created Claim Origin Report

Date: 2026-03-16
Project: ohmic

## Purpose

Define the report that explains when an active claim was created by a system
surface instead of directly by a worker.

## Report Shape

`system_created_claim_origin_report`

Required fields:

- `claim_id`
- `origin_type`
- `family_id`
- `related_trigger_or_packet_id`
- `reported_at`

## Origin Rule

`origin_type` must come from the shared system claim origin type catalog.

## Worker Use

Workers should be able to distinguish:

- self-created claims
- protective runtime claims
- reconciliation or orchestration claims
- operator-forced system claims
