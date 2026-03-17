import { describe, expect, it } from 'vitest'
import {
  buildProjectionCoverageLabel,
  getRuntimeDotColor,
  getRuntimeLabel,
} from '@/components/runtimeIndicatorModel'

describe('runtimeIndicatorModel', () => {
  it('classifies known runtime roots', () => {
    expect(getRuntimeLabel('B:\\ohmic-local\\runtime\\administrator')).toBe('local runtime')
    expect(getRuntimeLabel('B:\\ohmic\\generated\\agent-work\\runtime')).toBe('repo runtime')
    expect(getRuntimeLabel('D:\\custom\\runtime')).toBe('custom runtime')
    expect(getRuntimeLabel(null)).toBe('runtime unknown')
  })

  it('warns when the runtime is healthy but projections are still missing', () => {
    expect(getRuntimeDotColor('ok', 8, 10)).toBe('bg-yellow-500')
    expect(getRuntimeDotColor('ok', 10, 10)).toBe('bg-green-500')
    expect(getRuntimeDotColor('error', 10, 10)).toBe('bg-red-500')
    expect(getRuntimeDotColor('unknown', 0, 0)).toBe('bg-gray-500')
  })

  it('builds a coverage label with missing-count context', () => {
    expect(buildProjectionCoverageLabel(10, 10)).toBe('(10/10)')
    expect(buildProjectionCoverageLabel(8, 10)).toBe('(8/10, 2 missing)')
    expect(buildProjectionCoverageLabel(0, 0)).toBe('')
  })
})
