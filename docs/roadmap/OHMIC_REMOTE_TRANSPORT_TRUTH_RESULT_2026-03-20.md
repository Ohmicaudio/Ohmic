# OHMIC Remote Transport Truth Result

Date: 2026-03-20

## Summary

The remote handheld now hydrates and exposes the richer shared media-route contract from shared status instead of only a generic stream state.

This pass added remote-side parsing and live display support for:

- `runtime.media_source`
- `stream.transport`
- `stream.subscribe_topic`
- `stream.subscribe_class`
- `stream.active_topic`
- `stream.active_class`

## Live Result

- `cyd-remote` built successfully
- updated remote firmware flashed successfully to `COM16`

## Outcome

The remote transport lane can now surface actual upstream source and transport truth such as:

- source kind and upstream ownership
- Wi-Fi / HiFi transport lane
- publish / subscribe topic context
- remote program-stream class context

This moves the handheld from vague `stream live` / `stream missing` reporting toward real transport observability for upcoming audio validation.

## Next

- validate the updated remote live screen against a real connected shared-status session
- move from transport truth to actual audio transport behavior and audible path validation

