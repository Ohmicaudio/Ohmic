Status: done
Priority: low
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: d
Claim ID: 20260315T111142Z-31870498

# Verify High-Risk Public Worked Examples

## Goal

Repair technical trust by verifying public pages that use explicit numeric
worked examples or guidance likely to be treated as canonical.

## Source

- `docs/roadmap/OHMICAUDIO_SITE_AUDIT_TASK_BUNDLE_2026-03-15.md`
- `C:\Users\d\Downloads\ohmicaudio_site_audit_report.docx`

## Initial Targets

- sealed box worked example called out by the audit
- FFT explanation wording
- wire-gauge chart assumptions and caveats
- any page where numeric constraints visibly contradict chosen examples

## Acceptance

- contradictions are removed or explicitly corrected
- weak technical wording is tightened
- pages using explicit numeric examples are more trustworthy after the pass

## Outcome

Completed on 2026-03-15.

Result:

- corrected the sealed-box reference page so the Butterworth target uses
  `Qtc = 0.707`, the small-box example is described as underdamped instead of
  overdamped, and the worked-example F3 lands at about `43 Hz`
- corrected the sealed daily-driver build so the 1.5 ft^3 example is framed as
  a space-limited peaked alignment instead of a flat Butterworth result, with
  electrical F3 corrected to about `41.5 Hz`
- added explicit caveats to the AWG table so it is treated as a first-pass
  copper chassis-wiring reference, not a blanket amplifier-power guarantee
- tightened the FFT / impulse-response explanation so it no longer overclaims
  that FFT/IFFT automatically preserves transient response

## Verification

- confirmed the sealed-box reference page now uses the `0.707` Butterworth
  target and the corrected `43 Hz` worked-example F3
- confirmed the sealed build example now uses the corrected `41.5 Hz` F3 and
  no longer claims a flat `46 Hz` result
- confirmed the AWG page now carries explicit wire-protection, voltage-drop,
  and CCA caveats
- confirmed the AI-assisted tuning page now explains FFT/IFFT as domain tools,
  not automatic transient-preservation steps
