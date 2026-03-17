import type { IntakeQueueItem } from '@/types/intake'

export function buildTandemContextUrl(
  launchUrl: string | null,
  intake: IntakeQueueItem | null
): string | null {
  if (!launchUrl) {
    return null
  }

  if (!intake) {
    return launchUrl
  }

  try {
    const url = new URL(launchUrl)
    url.searchParams.set('intakeId', intake.intake_id)
    if (intake.title) {
      url.searchParams.set('intakeTitle', intake.title)
    }
    if (intake.routing_target) {
      url.searchParams.set('routingTarget', intake.routing_target)
    }
    return url.toString()
  } catch {
    return launchUrl
  }
}
