# Ohmic Master Administrator Manual Drop Intake Slice

Date: 2026-03-16
Project: ohmic

## Purpose

Define the first low-risk manual upload or paste-drop path for the Master
Administrator system.

## Slice Role

This path is the operator-controlled intake source for cases where:

- no provider integration exists
- the source is a one-off file packet
- the operator needs to paste text or notes manually

## Supported Inputs

- file upload
- drag-and-drop file packet
- pasted text or note block
- optional operator note attached at submission time

## Output Shape

Each submission should produce:

- one raw capture or upload record
- one provider-agnostic intake envelope
- zero or more attachment refs
- one initial routing suggestion

## Staging Object Creation

Manual-drop input should first create a native staging object with:

- operator id
- captured at timestamp
- native input kind
- storage refs
- optional operator note

## Attachment Bundling

If files are uploaded:

- each file becomes an attachment ref
- the submission becomes one attachment bundle family for the envelope

If the input is paste-only:

- attachment bundle may be empty
- normalized body becomes the primary value surface

## Initial Routing Hints

Manual-drop may suggest:

- support request
- intake review
- specification import
- attachment review

But all routing remains advisory at this stage.

## Low-Risk Rule

The slice stays low risk because it:

- avoids live provider auth
- keeps operator intent visible
- uses the same envelope model as later provider-backed paths

## Outcome

The administrator system gets a practical first intake surface that can be used
before deeper provider integrations are complete.
