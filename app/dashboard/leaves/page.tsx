import { leaveRequests } from "@/app/lib/hr-data";
import { Badge, PageHeader, SurfaceCard } from "../components/ui";

const Leaves = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Approvals"
        title="Leaves"
        description="Review employee leave requests, durations, and approval state."
      />

      <SurfaceCard>
        <div className="space-y-4">
          {leaveRequests.map((request) => (
            <div key={request.id} className="rounded-3xl border border-slate-100 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-slate-900">{request.employee}</p>
                  <p className="text-sm text-slate-500">{request.type} · {request.duration}</p>
                </div>
                <Badge tone={request.status === "Approved" ? "success" : request.status === "Pending" ? "warning" : "danger"}>
                  {request.status}
                </Badge>
              </div>
              <p className="mt-3 text-sm text-slate-500">{request.dates}</p>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}

export default Leaves;
