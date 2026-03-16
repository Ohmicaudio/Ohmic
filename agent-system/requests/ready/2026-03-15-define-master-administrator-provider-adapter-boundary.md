Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic

# Define Master Administrator Provider Adapter Boundary

## Goal

Define how the web-admin surface should call backend admin APIs which then call
providers/connectors, instead of letting provider logic leak into the browser.

## Focus

- browser vs backend boundary
- provider adapter responsibilities
- auth/credential handling
- auditability and retry shape

## Acceptance

- one clean backend/provider boundary is recorded
- direct browser-to-provider calls are explicitly avoided
- future provider work has a stable integration shape
