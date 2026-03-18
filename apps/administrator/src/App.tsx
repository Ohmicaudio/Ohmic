import { useEffect, useMemo, useRef } from 'react'
import { RuntimeIndicator } from '@/components/RuntimeIndicator'
import { OperatorTruthStrip } from '@/components/OperatorTruthStrip'
import { AggregationPanel } from '@/panels/AggregationPanel'
import { AttachmentPreviewPanel } from '@/panels/AttachmentPreviewPanel'
import { DashboardPanel } from '@/panels/DashboardPanel'
import { DeskFocusPanel } from '@/panels/DeskFocusPanel'
import { IntakeQueuePanel } from '@/panels/IntakeQueuePanel'
import { InactiveIntakePanel } from '@/panels/InactiveIntakePanel'
import { IntakeDetailPanel } from '@/panels/IntakeDetailPanel'
import { FilingPickerPanel } from '@/panels/FilingPickerPanel'
import { FilingHistoryPanel } from '@/panels/FilingHistoryPanel'
import { ProviderHandoffPanel } from '@/panels/ProviderHandoffPanel'
import { StatusHistoryPanel } from '@/panels/StatusHistoryPanel'
import { CommandComposerPanel } from '@/panels/CommandComposerPanel'
import { AuditTrailPanel } from '@/panels/AuditTrailPanel'
import { WarningReviewPanel } from '@/panels/WarningReviewPanel'
import { TandemPanel } from '@/panels/TandemPanel'
import { QueueActivityPanel } from '@/panels/QueueActivityPanel'
import { WorkspaceActivityPanel } from '@/panels/WorkspaceActivityPanel'
import { subscribeToUpdates } from '@/api/projections'
import { publishIntakeFocus, publishReadyTaskFocus } from '@/api/focus'
import { useAggregationPanelStore } from '@/store/aggregationPanelStore'
import { useAttachmentPreviewStore } from '@/store/attachmentPreviewStore'
import { useAuditSummaryStore } from '@/store/auditSummaryStore'
import { useDashboardStore } from '@/store/dashboardStore'
import { useDeskFocusStore } from '@/store/deskFocusStore'
import { useFilingHistoryStore } from '@/store/filingHistoryStore'
import { useInactiveIntakeStore } from '@/store/inactiveIntakeStore'
import { useIntakeContextStore } from '@/store/intakeContextStore'
import { useIntakeStore } from '@/store/intakeStore'
import { useCommandStore } from '@/store/commandStore'
import { useQueueActivityStore } from '@/store/queueActivityStore'
import { useServerHealthStore } from '@/store/serverHealthStore'
import { useStatusHistoryStore } from '@/store/statusHistoryStore'
import { useTandemStore } from '@/store/tandemStore'
import { useWarningReviewStore } from '@/store/warningReviewStore'

export function App() {
  const didAutoSelectIntake = useRef(false)
  const didAutoFocusQueue = useRef(false)
  const fetchDashboard = useDashboardStore((s) => s.fetch)
  const fetchDeskFocus = useDeskFocusStore((s) => s.fetch)
  const deskFocusSelection = useDeskFocusStore((s) => s.selection)
  const setDeskFocusProjection = useDeskFocusStore((s) => s.setProjection)
  const fetchAggregationPanel = useAggregationPanelStore((s) => s.fetch)
  const fetchAttachmentPreview = useAttachmentPreviewStore((s) => s.fetch)
  const fetchAuditSummary = useAuditSummaryStore((s) => s.fetch)
  const fetchFilingHistory = useFilingHistoryStore((s) => s.fetch)
  const fetchIntake = useIntakeStore((s) => s.fetch)
  const intakeItems = useIntakeStore((s) => s.items)
  const intakeGeneratedAt = useIntakeStore((s) => s.generatedAt)
  const intakeStaleness = useIntakeStore((s) => s.staleness)
  const selectedIntakeId = useIntakeStore((s) => s.selectedId)
  const selectIntake = useIntakeStore((s) => s.select)
  const fetchInactiveIntake = useInactiveIntakeStore((s) => s.fetch)
  const fetchIntakeContext = useIntakeContextStore((s) => s.fetch)
  const fetchQueueActivity = useQueueActivityStore((s) => s.fetch)
  const readyTasks = useQueueActivityStore((s) => s.readyTasks)
  const queueLoading = useQueueActivityStore((s) => s.loading)
  const fetchStatusHistory = useStatusHistoryStore((s) => s.fetch)
  const fetchWarningReview = useWarningReviewStore((s) => s.fetch)
  const fetchTandem = useTandemStore((s) => s.fetch)
  const loadAuditTrail = useCommandStore((s) => s.loadAuditTrail)
  const setComposerIntakeId = useCommandStore((s) => s.setIntakeId)
  const fetchHealth = useServerHealthStore((s) => s.fetch)
  const healthStatus = useServerHealthStore((s) => s.status)
  const runtimeDir = useServerHealthStore((s) => s.runtimeDir)
  const loadedProjectionCount = useServerHealthStore((s) => s.loadedProjections.length)
  const expectedProjectionCount = useServerHealthStore((s) => s.expectedProjections.length)
  const intakeProjectionAgeHours = useMemo(() => {
    if (!intakeGeneratedAt) {
      return null
    }

    const ageMs = Date.now() - new Date(intakeGeneratedAt).getTime()
    if (Number.isNaN(ageMs) || ageMs < 0) {
      return null
    }

    return ageMs / (1000 * 60 * 60)
  }, [intakeGeneratedAt])
  const intakeLooksHistorical =
    intakeStaleness === 'stale' ||
    (intakeProjectionAgeHours !== null && intakeProjectionAgeHours >= 8)

  useEffect(() => {
    const unsub = subscribeToUpdates((name) => {
      if (name === 'dashboard_status_cards') fetchDashboard()
      if (name === 'administrator_aggregation_panel') fetchAggregationPanel()
      if (name === 'administrator_attachment_preview') fetchAttachmentPreview()
      if (name === 'administrator_audit_summary') fetchAuditSummary()
      if (name === 'administrator_filing_history_projection') fetchFilingHistory()
      if (name === 'administrator_focus_selection') fetchDeskFocus()
      if (name === 'administrator_intake_queue') fetchIntake()
      if (name === 'administrator_inactive_intake') fetchInactiveIntake()
      if (name === 'administrator_inactive_intake_projection') fetchInactiveIntake()
      if (name === 'administrator_note_projection') fetchIntakeContext()
      if (name === 'administrator_tag_assignment_projection') fetchIntakeContext()
      if (name === 'administrator_status_history') fetchStatusHistory()
      if (name === 'administrator_tandem_handshake_state') fetchTandem()
      if (name === 'administrator_warning_review') fetchWarningReview()
      if (name === 'administrator_recent_actions') loadAuditTrail()
      if (name === 'ready_tasks') fetchQueueActivity()
      if (name === 'active_claims') fetchQueueActivity()
      fetchHealth()
    })
    return unsub
  }, [
    fetchDashboard,
    fetchAggregationPanel,
    fetchAttachmentPreview,
    fetchAuditSummary,
    fetchFilingHistory,
    fetchHealth,
    fetchInactiveIntake,
    fetchIntake,
    fetchIntakeContext,
    fetchStatusHistory,
    fetchWarningReview,
    loadAuditTrail,
  ])

  useEffect(() => {
    fetchHealth()
    fetchDashboard()
    fetchDeskFocus()
    fetchAggregationPanel()
    fetchAttachmentPreview()
    fetchAuditSummary()
    fetchFilingHistory()
    fetchIntake()
    fetchInactiveIntake()
    fetchIntakeContext()
    fetchQueueActivity()
    loadAuditTrail()
    fetchStatusHistory()
    fetchTandem()
    fetchWarningReview()
  }, [
    fetchDashboard,
    fetchDeskFocus,
    fetchAggregationPanel,
    fetchAttachmentPreview,
    fetchAuditSummary,
    fetchFilingHistory,
    fetchHealth,
    fetchIntake,
    fetchInactiveIntake,
    fetchIntakeContext,
    fetchQueueActivity,
    loadAuditTrail,
    fetchStatusHistory,
    fetchTandem,
    fetchWarningReview,
  ])

  useEffect(() => {
    if (intakeItems.length === 0) {
      return
    }

    if (intakeLooksHistorical) {
      return
    }

    const hasSelectedIntake = selectedIntakeId
      ? intakeItems.some((item) => item.intake_id === selectedIntakeId)
      : false

    if (hasSelectedIntake) {
      return
    }

    if (!didAutoSelectIntake.current || selectedIntakeId) {
      selectIntake(intakeItems[0].intake_id)
      didAutoSelectIntake.current = true
    }
  }, [intakeItems, intakeLooksHistorical, selectIntake, selectedIntakeId])

  useEffect(() => {
    if (!intakeLooksHistorical) {
      didAutoFocusQueue.current = false
      return
    }

    if (selectedIntakeId || deskFocusSelection || queueLoading || readyTasks.length === 0) {
      return
    }

    if (didAutoFocusQueue.current) {
      return
    }

    let cancelled = false
    didAutoFocusQueue.current = true

    const publishQueueFocus = async () => {
      try {
        const projection = await publishReadyTaskFocus(readyTasks[0])
        if (!cancelled) {
          setDeskFocusProjection(projection)
        }
      } catch {
        if (!cancelled) {
          didAutoFocusQueue.current = false
        }
      }
    }

    void publishQueueFocus()

    return () => {
      cancelled = true
    }
  }, [
    deskFocusSelection,
    intakeLooksHistorical,
    queueLoading,
    readyTasks,
    selectedIntakeId,
    setDeskFocusProjection,
  ])

  useEffect(() => {
    if (!selectedIntakeId) {
      return
    }

    let cancelled = false

    const publishFocus = async () => {
      try {
        const projection = await publishIntakeFocus(selectedIntakeId)
        if (!cancelled) {
          setDeskFocusProjection(projection)
        }
      } catch {
        if (!cancelled) {
          void fetchDeskFocus()
        }
      }
    }

    void publishFocus()

    return () => {
      cancelled = true
    }
  }, [fetchDeskFocus, selectedIntakeId, setDeskFocusProjection])

  useEffect(() => {
    setComposerIntakeId(selectedIntakeId ?? '')
  }, [selectedIntakeId, setComposerIntakeId])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-ohmic-border bg-ohmic-surface/60 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-3 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-ohmic-accent animate-pulse" />
              <h1 className="text-sm font-bold tracking-widest uppercase">
                Ohmic Administrator
              </h1>
            </div>
            <div className="text-[11px] uppercase tracking-widest text-ohmic-text-dim">
              Operator desk for intake, provider handoff, and live queue truth
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <RuntimeIndicator
              status={healthStatus}
              runtimeDir={runtimeDir}
              loadedProjectionCount={loadedProjectionCount}
              expectedProjectionCount={expectedProjectionCount}
            />
            <div className="text-xs text-ohmic-text-dim">Intake Triage and Routing</div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex-1 w-full max-w-[1680px] px-6 py-8">
        <DashboardPanel />
        <OperatorTruthStrip />

        <section className="section-shell mt-8 space-y-5">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="section-kicker">
                Operations
              </h2>
              <div className="section-caption">
                Work the desk in three lanes: live queue and runtime on the left, intake and provider context in the middle, and the action rail on the right.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(24rem,1.05fr)_minmax(34rem,1.3fr)_minmax(24rem,0.95fr)]">
            <div className="lane-shell lane-shell--queue space-y-5">
              <div>
                <h3 className="lane-kicker">Desk Feed</h3>
                <div className="lane-title">Queue and Runtime</div>
                <div className="lane-caption">
                  {intakeLooksHistorical
                    ? 'Live ready work first. Historical intake context stays available below without pretending to be fresh operator activity.'
                    : 'Current ready work, live claims, and branch truth for the desk.'}
                </div>
              </div>
              <div className="space-y-6">
                <QueueActivityPanel />
                <WorkspaceActivityPanel />
                {intakeLooksHistorical ? (
                  <div className="rounded-xl border border-ohmic-warning/30 bg-ohmic-warning/10 px-4 py-3 text-sm text-ohmic-warning">
                    Intake queue is being treated as historical context right now, so live queue work stays at the top of the desk until intake runtime freshness improves.
                  </div>
                ) : null}
                <IntakeQueuePanel />
                <InactiveIntakePanel />
                <AggregationPanel />
              </div>
            </div>

            <div className="lane-shell lane-shell--intake space-y-5">
              <div>
                <h3 className="lane-kicker">Working Context</h3>
                <div className="lane-title">Selected Intake</div>
                <div className="lane-caption">
                  Inspect the active item and work the provider loop without leaving context.
                </div>
              </div>
              <div className="space-y-6">
                <DeskFocusPanel />
                <IntakeDetailPanel />
                <ProviderHandoffPanel />
              </div>
            </div>

            <div className="lane-shell lane-shell--action space-y-5 self-start xl:sticky xl:top-24">
              <div>
                <h3 className="lane-kicker">Live Controls</h3>
                <div className="lane-title">Action Rail</div>
                <div className="lane-caption">
                  External handoff and command execution staged together as the live control rail.
                </div>
              </div>
              <div className="space-y-6">
                <TandemPanel />
                <CommandComposerPanel />
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell mt-8 space-y-5">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="section-kicker">
                Context and History
              </h2>
              <div className="section-caption">
                Filing, review, and audit surfaces grouped below the active operator loop so they stay available without crowding the main path.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(30rem,0.95fr)_minmax(34rem,1.05fr)]">
            <div className="lane-shell space-y-5">
              <div>
                <h3 className="lane-kicker">Desk History</h3>
                <div className="lane-title">Filing and Status</div>
                <div className="lane-caption">
                  Archive, filing, and state transitions grouped below the main operator loop.
                </div>
              </div>
              <div className="space-y-6">
                <FilingPickerPanel />
                <FilingHistoryPanel />
                <StatusHistoryPanel />
              </div>
            </div>
            <div className="lane-shell space-y-5">
              <div>
                <h3 className="lane-kicker">Secondary Review</h3>
                <div className="lane-title">Review and Audit</div>
                <div className="lane-caption">
                  Lower-priority review surfaces and the audit trail live together here.
                </div>
              </div>
              <div className="space-y-6">
                <WarningReviewPanel />
                <AttachmentPreviewPanel />
                <AuditTrailPanel />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ohmic-border py-3 text-center text-xs text-ohmic-text-dim">
        ohmic administrator v0.1.0 - projection-driven ui
      </footer>
    </div>
  )
}
