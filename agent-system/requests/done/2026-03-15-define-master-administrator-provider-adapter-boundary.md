Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260316T021056Z-4d6fe356

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

## Result

- defined the browser -> backend -> provider adapter split in
  `docs/architecture/OHMIC_MASTER_ADMINISTRATOR_PROVIDER_ADAPTER_BOUNDARY_2026-03-15.md`
- made backend-owned admin APIs the trust boundary for credential handling,
  audit state, and retry behavior
- explicitly rejected direct browser-to-provider calls so later file/email
  intake and web-admin work can build on one stable integration shape
