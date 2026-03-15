# Define Page Issue Reporter UI Contract

Status: done  
Priority: high  
Owner: d  
Claim ID: 20260315T101809Z-44d194b2
Repo: `B:\ohmic\repos\ohmic-audio-labs`

## Goal

Define the page-level `Report issue` UI flow so implementation can happen without inventing the UX in code.

## Deliverables

- modal field list
- category and severity enums
- required vs optional fields
- screenshot capture behavior
- route/page context capture rules
- privacy copy and consent wording

## Acceptance

- contract written in a durable doc
- field names align with the existing support intake model
- no direct-to-GitHub reporting path is proposed

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\repos\ohmic-audio-labs\docs\specs\PAGE_ISSUE_REPORTER_UI_CONTRACT.md`

Result:

- defined the page-level report modal fields, enums, and privacy/consent copy
- aligned the contract to the existing support intake field model
- documented the current endpoint limitation so follow-on intake work does not
  fake persistence that does not exist yet
