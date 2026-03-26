import { PageHeader, SurfaceCard } from "../components/ui";

const Settings = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Workspace defaults for payroll timing, notifications, and approval routing."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="space-y-4">
          <p className="text-lg font-semibold text-slate-900">Payroll preferences</p>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-medium text-slate-900">Cycle</p>
            <p className="mt-1 text-sm text-slate-500">Monthly, processed on the 28th.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-medium text-slate-900">Primary bank cut-off</p>
            <p className="mt-1 text-sm text-slate-500">2 business days before payout.</p>
          </div>
        </SurfaceCard>

        <SurfaceCard className="space-y-4">
          <p className="text-lg font-semibold text-slate-900">Approval routing</p>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-medium text-slate-900">Leave requests</p>
            <p className="mt-1 text-sm text-slate-500">Manager review, then HR confirmation.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-medium text-slate-900">Recruitment approvals</p>
            <p className="mt-1 text-sm text-slate-500">Department head, Finance, then HR Director.</p>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}

export default Settings;
