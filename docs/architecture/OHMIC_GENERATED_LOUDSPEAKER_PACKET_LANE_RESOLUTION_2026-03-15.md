Status: lane resolution
Date: 2026-03-15

# Ohmic Generated Loudspeaker Packet Lane Resolution

## Purpose

Close the current generated loudspeaker packet lane without reopening broad
loudspeaker work.

## Resolution

The current sample packet is canonical for its narrow purpose and should remain
committed:

- `B:\ohmic\generated\loudspeaker\sample-normalized-loudspeaker-packet-2026-03-15.json`

It is not just disposable scratch output.

It is the first named sample payload backing:

- the grouped parser prototype
- the sample normalized-packet note
- later schema and extractor planning

## Why It Should Stay Committed

This packet is doing fixture-style work, not bulk-generated publication work.

It provides:

- one stable machine-readable sample
- one reproducible parser output target
- one concrete payload for later schema and page-input discussions

That makes it useful as a tracked generated artifact.

## What This Does Not Mean

This does not open the door to committing broad generated loudspeaker outputs.

Do not treat `generated/loudspeaker` as a dump for:

- bulk conversion runs
- exploratory exports
- per-speaker page payload floods
- raw scrape mirrors

Those should stay disposable unless a later task explicitly blesses a generated
artifact as a durable fixture or reference packet.

## Current Watchout

The current sample packet still preserves raw-source impedance mojibake:

- `Î©`

That is acceptable for the current narrow fixture role because the packet is
still demonstrating parser and field-boundary behavior, not polished
user-facing presentation.

But it means the packet should currently be treated as:

- governed sample data

not:

- final display-ready speaker content

## Future Boundary Rule

For future generated loudspeaker outputs:

- commit named sample packets that are intentionally used as fixtures,
  references, or schema examples
- do not commit broad generated batches unless a later governance task says
  they are durable source artifacts
- keep normalization defects like raw unit mojibake quarantined instead of
  pretending they are solved by generation alone

## Final Call

The current lane is closed like this:

- keep the sample packet committed
- treat it as a narrow canonical fixture
- do not widen the generated-output lane yet
