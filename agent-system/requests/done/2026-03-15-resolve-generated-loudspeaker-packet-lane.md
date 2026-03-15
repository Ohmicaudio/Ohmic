Status: done
Priority: high
Date: 2026-03-15
Project: cross-project
Owner: d
Claim ID: 20260315T055629Z-8f09af1b

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

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\docs\architecture\OHMIC_GENERATED_LOUDSPEAKER_PACKET_LANE_RESOLUTION_2026-03-15.md`

Result:

- the sample normalized loudspeaker packet is confirmed as a narrow committed
  fixture, not disposable scratch output
- the correct boundary for future generated loudspeaker outputs is now explicit
- a real watchout was captured: the packet still preserves raw-source
  impedance-unit mojibake and is not display-polished content yet

## Completion

- verified the generated sample packet is already tracked and clean in Git
- verified the packet lane did not have live local drift in the tracked
  generated artifact itself
- documented the keep-versus-discard decision and future boundary rule
