import { useEffect } from 'react'
import { RuntimeIndicator } from '@/components/RuntimeIndicator'
import { DashboardPanel } from '@/panels/DashboardPanel'
import { IntakeQueuePanel } from '@/panels/IntakeQueuePanel'
import { IntakeDetailPanel } from '@/panels/IntakeDetailPanel'
import { StatusHistoryPanel } from '@/panels/StatusHistoryPanel'
import { CommandComposerPanel } from '@/panels/CommandComposerPanel'
import { AuditTrailPanel } from '@/panels/AuditTrailPanel'
import { WarningReviewPanel } from '@/panels/WarningReviewPanel'
import { subscribeToUpdates } from '@/api/projections'
import { useDashboardStore } from '@/store/dashboardStore'
import { useIntakeContextStore } from '@/store/intakeContextStore'
import { useIntakeStore } from '@/store/intakeStore'
import { useCommandStore } from '@/store/commandStore'
import { useServerHealthStore } from '@/store/serverHealthStore'

export function App() {
  const fetchDashboard = useDashboardStore((s) => s.fetch)
  const fetchIntake = useIntakeStore((s) => s.fetch)
  const fetchIntakeContext = useIntakeContextStore((s) => s.fetch)
  const loadAuditTrail = useCommandStore((s) => s.loadAuditTrail)
  const fetchHealth = useServerHealthStore((s) => s.fetch)
  const healthStatus = useServerHealthStore((s) => s.status)
  const runtimeDir = useServerHealthStore((s) => s.runtimeDir)

  useEffect(() => {
    const unsub = subscribeToUpdates((name) => {
      if (name === 'dashboard_status_cards') fetchDashboard()
      if (name === 'administrator_intake_queue') fetchIntake()
      if (name === 'administrator_note_projection') fetchIntakeContext()
      if (name === 'administrator_tag_assignment_projection') fetchIntakeContext()
      if (name === 'administrator_recent_actions') loadAuditTrail()
    })
    return unsub
  }, [fetchDashboard, fetchIntake, fetchIntakeContext, loadAuditTrail])

  useEffect(() => {
    fetchHealth()
    fetchIntakeContext()
  }, [fetchHealth, fetchIntakeContext])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-ohmic-border bg-ohmic-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-ohmic-accent animate-pulse" />
            <h1 className="text-sm font-bold tracking-widest uppercase">
              Ohmic Administrator
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <RuntimeIndicator status={healthStatus} runtimeDir={runtimeDir} />
            <div className="text-xs text-ohmic-text-dim">Intake Triage &amp; Routing</div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <DashboardPanel />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <IntakeQueuePanel />
          </div>

          <div className="space-y-8">
            <IntakeDetailPanel />
            <StatusHistoryPanel />
            <WarningReviewPanel />
            <CommandComposerPanel />
            <AuditTrailPanel />
          </div>
        </div>
      </main>

      <footer className="border-t border-ohmic-border py-3 text-center text-xs text-ohmic-text-dim">
        ohmic administrator v0.1.0 - projection-driven ui
      </footer>
    </div>
  )
}
