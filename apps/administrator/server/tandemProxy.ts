export interface TandemStatusResponse {
  configured: boolean
  available: boolean
  mode: 'unconfigured' | 'configured'
  base_url: string | null
  session_label: string | null
  launch_url: string | null
  message: string
}

function readOptionalEnv(name: string): string | null {
  const value = process.env[name]?.trim()
  return value ? value : null
}

function buildLaunchUrl(baseUrl: string, sessionLabel: string | null): string | null {
  try {
    const url = new URL(baseUrl)
    if (sessionLabel) {
      url.searchParams.set('sessionLabel', sessionLabel)
    }
    return url.toString()
  } catch {
    return null
  }
}

export function readTandemStatus(): TandemStatusResponse {
  const baseUrl = readOptionalEnv('ADMINISTRATOR_TANDEM_BASE_URL')
  const sessionLabel = readOptionalEnv('ADMINISTRATOR_TANDEM_SESSION_LABEL')
  const configured = Boolean(baseUrl)

  if (!configured) {
    return {
      configured: false,
      available: false,
      mode: 'unconfigured',
      base_url: null,
      session_label: sessionLabel,
      launch_url: null,
      message:
        'Set ADMINISTRATOR_TANDEM_BASE_URL to expose the first Tandem handoff seam.',
    }
  }

  const launchUrl = configured ? buildLaunchUrl(baseUrl!, sessionLabel) : null

  return {
    configured: true,
    available: false,
    mode: 'configured',
    base_url: baseUrl,
    session_label: sessionLabel,
    launch_url: launchUrl,
    message:
      launchUrl
        ? 'Tandem base is configured. Open Tandem from here while deeper session browsing and provider capture stay in the next slice.'
        : 'Tandem base is configured, but the launch URL is invalid. Fix ADMINISTRATOR_TANDEM_BASE_URL before operator handoff.',
  }
}
