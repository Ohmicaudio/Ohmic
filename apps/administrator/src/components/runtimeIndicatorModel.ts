export function getRuntimeLabel(runtimeDir: string | null): string {
  if (!runtimeDir) return 'runtime unknown'
  if (runtimeDir.startsWith('B:\\ohmic-local\\')) return 'local runtime'
  if (runtimeDir.startsWith('B:\\ohmic\\')) return 'repo runtime'
  return 'custom runtime'
}

export function getRuntimeDotColor(
  status: 'ok' | 'error' | 'unknown',
  loadedProjectionCount: number,
  expectedProjectionCount: number
): string {
  if (status === 'error') {
    return 'bg-red-500'
  }

  if (
    status === 'ok' &&
    expectedProjectionCount > 0 &&
    loadedProjectionCount < expectedProjectionCount
  ) {
    return 'bg-yellow-500'
  }

  if (status === 'ok') {
    return 'bg-green-500'
  }

  return 'bg-gray-500'
}

export function buildProjectionCoverageLabel(
  loadedProjectionCount: number,
  expectedProjectionCount: number
): string {
  if (expectedProjectionCount <= 0) {
    return ''
  }

  const missingCount = Math.max(expectedProjectionCount - loadedProjectionCount, 0)
  if (missingCount === 0) {
    return `(${loadedProjectionCount}/${expectedProjectionCount})`
  }

  return `(${loadedProjectionCount}/${expectedProjectionCount}, ${missingCount} missing)`
}
