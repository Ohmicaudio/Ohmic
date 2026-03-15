# Ohmic Dashboard History Scroll Height Mobile Threshold Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how aggressively expanded history should switch into a bounded scroll
region on smaller surfaces.

## Core Principle

Small screens need earlier containment.

Expanded history should enter its bounded scroll mode sooner on mobile and other
tight layouts so the surrounding dashboard remains usable.

## Recommended Rule

On smaller surfaces:

- use a lower vertical threshold than desktop
- switch to bounded scrolling earlier
- keep the newest command and top-level dashboard context easier to recover

## Desktop Relationship

Desktop may tolerate a taller visible history region before internal scrolling
begins, but mobile should not inherit that looser threshold.

## Guardrails

- do not use the same threshold for all form factors if it hurts compact layouts
- do not make mobile scroll regions so tiny that history becomes unusable
- do not let expanded history push the main dashboard far offscreen on mobile
- do not vary the threshold so much that it feels inconsistent without reason

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-scroll-threshold-desktop-override-rule`
- `define-dashboard-history-expanded-scroll-boundary-rule`
