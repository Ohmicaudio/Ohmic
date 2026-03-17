export interface TandemStatusResponse {
  configured: boolean
  available: boolean
  mode: 'unconfigured' | 'configured'
  base_url: string | null
  session_label: string | null
  message: string
}

function readOptionalEnv(name: string): string | null {
  const value = process.env[name]?.trim()
  return value ? value : null
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
      message:
        'Set ADMINISTRATOR_TANDEM_BASE_URL to expose the first Tandem handoff seam.',
    }
  }

  return {
    configured: true,
    available: false,
    mode: 'configured',
    base_url: baseUrl,
    session_label: sessionLabel,
    message:
      'Tandem base is configured. Live session browsing and provider capture still need the next integration slice.',
  }
}
