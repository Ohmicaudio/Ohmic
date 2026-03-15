# Extend Support Intake For Page Error Capture

Status: ready  
Priority: high  
Owner: platform/runtime  
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
