Date: 2026-03-20
Status: done
Project: amplab-firmware

# Ohmic Remote Audio Subscriber Relay Result

## Summary

Remote source selection now drives real `dsp.stream.subscribe` relay intent on
the firmware runtime path instead of stopping at source-selection status alone.

## Completed

- added shared source-policy helper:
  - `ohmic_core_current_remote_audio_stream_topic(...)`
- mapped remote sources to expected subscriber topics:
  - `phone.bt -> audio.remote.phone.bt`
  - `sd.local -> audio.remote.sd`
  - `usb.local -> audio.remote.usb`
  - `remote.stream -> audio.remote.main`
- AmpLab runtime now relays `dsp.stream.subscribe` over the existing websocket
  client whenever the selected remote source changes and the remote link is up

## Why This Matters

- this is the first runtime step beyond route/status modeling
- source selection now produces concrete subscriber intent on the transport lane
- the next remaining gap is actual remote-hub and DSP consumer playback truth,
  not which topic should be used

## Verification

- `pio run -e esp32s3_ble_headless`

## Next

- verify the live target consumes the relayed subscriber topic as expected
- reflect any runtime subscriber mismatch back into shared status
