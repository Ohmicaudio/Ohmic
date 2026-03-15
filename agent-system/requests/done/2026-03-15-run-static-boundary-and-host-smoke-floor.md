Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T122546Z-b4a2141d

# Run Static Boundary And Host Smoke Floor

## Goal

Execute the current minimum trusted public/static checks so recent public and
gateway work has a fresh trust baseline.

## Scope

- app-to-static boundary check
- live host smoke for `ohmicaudio.com` and `ohmicaudiolabs.com`

## Use

- `docs/systems/OHMIC_MINIMUM_TRUSTED_CHECKS_2026-03-15.md`
- `docs/roadmap/OHMIC_AUDIO_LABS_MINIMUM_TRUSTED_RUNTIME_CHECKS_2026-03-15.md`

## Acceptance

- exact commands and results are recorded
- any failure becomes its own follow-up task instead of staying implicit

## Outcome

Completed on 2026-03-15.

Result:

- the app-to-static boundary check passed against the canonical host
  `https://ohmicaudio.com`
- the live host smoke matched the current intended routing shape:
  `ohmicaudio.com` returned `200`, `ohmicaudiolabs.com` returned `301` to
  `https://ohmicaudio.com/`, and `https://ohmicaudio.com/robots.txt`
  returned `200`
- no new follow-up task was needed because the trusted smoke floor matched the
  expected public/runtime state

## Verification

- ran:
  `$env:PLAYWRIGHT_STATIC_CONTENT_BASE_URL='https://ohmicaudio.com'; $env:VITE_STATIC_CONTENT_BASE_URL='https://ohmicaudio.com'; npm run test:e2e:static -- --project=chromium`
  in `B:\ohmic\repos\ohmic-audio-labs`
  - result: `3 passed`
- ran:
  `curl.exe -I -s https://ohmicaudio.com/`
  - result: `HTTP/1.1 200 OK`
- ran:
  `curl.exe -I -s https://ohmicaudiolabs.com/`
  - result: `HTTP/1.1 301 Moved Permanently`
    with `Location: https://ohmicaudio.com/`
- ran:
  `curl.exe -I -s https://ohmicaudio.com/robots.txt`
  - result: `HTTP/1.1 200 OK`

## Notes

- the Playwright run still emitted the already-known local Vite proxy
  `ECONNREFUSED 127.0.0.1:8787` noise for `/api` and `/__sync` while the local
  hub backend was not running, but the three trusted static-boundary tests all
  passed
