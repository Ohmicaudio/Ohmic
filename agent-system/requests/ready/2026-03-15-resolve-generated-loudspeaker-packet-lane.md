Status: ready
Priority: high
Date: 2026-03-15
Project: cross-project

# Resolve Generated Loudspeaker Packet Lane

## Goal

Close the current loudspeaker generated-output lane cleanly.

## Why

`B:\ohmic` still shows local drift in:

- `generated/loudspeaker/sample-normalized-loudspeaker-packet-2026-03-15.json`

That means the parser/prototype lane is not fully closed yet.

## Deliverable

A short resolution note that states:

- whether the generated file is canonical and should be committed
- whether it should remain generated-only and be discarded
- what the correct lane boundary is for future generated loudspeaker outputs

## Constraints

- close the lane cleanly
- do not reopen broad loudspeaker work unless a real defect is found
