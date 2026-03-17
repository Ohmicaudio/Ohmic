Date: 2026-03-17
Project: firmware
Status: done

# Ohmic Shared Status Control And Stream Contract Result

The active producer/consumer pair now speaks one clearer status/control/stream
contract family:

- AmpLab firmware publishes explicit `stream` status in `/api/status` and in
  `dsp.stream.subscribe` replies
- missing-stream truth is represented explicitly as `available: false`,
  `state: missing`, and `reason: stream source not implemented`
- the remote consumes that shared stream object from both probe/status payloads
  and shared envelope replies instead of inventing decorative fallback text

This closes the active-node floor for the current AmpLab-plus-remote path, but
it does not yet finish AP-vs-LAN target normalization or the later real
stream-backed display surface. Those remain separate follow-on items.
