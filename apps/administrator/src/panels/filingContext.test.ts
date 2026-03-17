import { describe, expect, it } from 'vitest'
import { buildFilingContextNote } from '@/panels/filingContext'

describe('filingContext', () => {
  it('builds filing context with destination and optional reason', () => {
    const note = buildFilingContextNote(
      '',
      'Customer Archive',
      'Retained after intake review.'
    )

    expect(note).toContain('Filing destination: Customer Archive')
    expect(note).toContain('Filing reason: Retained after intake review.')
  })

  it('does not duplicate the same filing destination block', () => {
    const first = buildFilingContextNote('', 'Customer Archive')
    const second = buildFilingContextNote(first, 'Customer Archive')

    expect(second).toBe(first)
  })
})
