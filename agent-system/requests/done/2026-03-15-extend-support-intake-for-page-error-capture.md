# Extend Support Intake For Page Error Capture

Status: done  
Priority: high  
Owner: d  
Claim ID: 20260315T102608Z-9494873b
Repo: `B:\ohmic\repos\ohmic-audio-labs`

## Goal

Extend the existing support request backend so page reports can carry enough context for useful triage.

## Deliverables

- route/page-id fields where missing
- category/severity normalization review
- screenshot/attachment path decision
- console/network diagnostic field shape
- validation and redaction rules

## Acceptance

- existing support pipeline remains canonical
- page error reports use the same intake service
- backend contract changes are documented and testable

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\repos\ohmic-audio-labs\docs\specs\PAGE_ERROR_SUPPORT_INTAKE_EXTENSION.md`
- `B:\ohmic\repos\ohmic-audio-labs\test\backend\supportRequestEndpoint.test.ts`

Result:

- extended the support request backend and client contract to accept structured
  page-report fields through the existing intake path
- added route sanitization plus diagnostic-summary redaction before persistence
- verified the new path with focused backend tests
