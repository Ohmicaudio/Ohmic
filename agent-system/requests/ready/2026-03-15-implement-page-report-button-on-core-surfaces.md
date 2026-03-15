# Implement Page Report Button On Core Surfaces

Status: ready  
Priority: high  
Owner: platform/runtime  
Repo: `B:\ohmic\repos\ohmic-audio-labs`

## Goal

Add a `Report issue` entry point on the most important user-facing surfaces first.

## Initial Surfaces

- main interactive app shell
- toolbox surfaces
- high-traffic static-adjacent app pages

## Deliverables

- reusable report-button component
- modal trigger and submission path
- route-aware context capture
- graceful no-screenshot fallback

## Acceptance

- a user can submit a page issue in one short flow
- report includes auto-captured page context
- implementation uses the existing support intake path
