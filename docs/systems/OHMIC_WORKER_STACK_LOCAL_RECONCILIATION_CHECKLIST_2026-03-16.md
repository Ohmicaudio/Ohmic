# Ohmic Worker Stack Local Reconciliation Checklist

Date: 2026-03-16
Project: ohmic

## Purpose

Define the quick checklist a worker should run to make sure its local stack
still matches queue truth.

## Checklist

1. confirm the primary task still exists and is still eligible
2. confirm follow-ons still exist and still fit the same lane
3. confirm the fallback still makes sense if the primary blocks
4. trim stale maintenance or verification entries
5. check whether any local entry should be returned to the queue

## Rule

Local reconciliation should be fast and repeatable. It is not a second planning
session.
