import { jobs } from "@/app/lib/hr-data";
import { Badge, PageHeader, SurfaceCard } from "../components/ui";

const Jobs = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Recruitment"
        title="Jobs"
        description="Monitor open requisitions, application flow, and hiring readiness."
      />

      <SurfaceCard>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="text-sm text-slate-400">
              <tr>
                <th className="pb-4 font-medium">Role</th>
                <th className="pb-4 font-medium">Department</th>
                <th className="pb-4 font-medium">Location</th>
                <th className="pb-4 font-medium">Applicants</th>
                <th className="pb-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.role} className="border-t border-slate-100 text-sm text-slate-600">
                  <td className="py-4 font-medium text-slate-900">{job.role}</td>
                  <td>{job.department}</td>
                  <td>{job.location}</td>
                  <td>{job.applicants}</td>
                  <td>
                    <Badge tone={job.status === "Open" ? "success" : job.status === "Interviewing" ? "brand" : "neutral"}>
                      {job.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>
    </div>
  );
}

export default Jobs;
