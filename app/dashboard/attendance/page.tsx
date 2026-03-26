import { attendanceSeries } from "@/app/lib/hr-data";
import { Badge, PageHeader, SurfaceCard } from "../components/ui";

const Attendance = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Tracking"
        title="Attendance"
        description="Weekly attendance composition across office, remote, and leave categories."
      />

      <div className="grid gap-5 md:grid-cols-3">
        <SurfaceCard><p className="text-sm text-slate-500">Average office presence</p><p className="mt-3 text-4xl font-semibold text-slate-900">68%</p></SurfaceCard>
        <SurfaceCard><p className="text-sm text-slate-500">Average remote</p><p className="mt-3 text-4xl font-semibold text-slate-900">17%</p></SurfaceCard>
        <SurfaceCard><p className="text-sm text-slate-500">Average leave</p><p className="mt-3 text-4xl font-semibold text-slate-900">15%</p></SurfaceCard>
      </div>

      <SurfaceCard>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="text-sm text-slate-400">
              <tr>
                <th className="pb-4 font-medium">Day</th>
                <th className="pb-4 font-medium">Present</th>
                <th className="pb-4 font-medium">Remote</th>
                <th className="pb-4 font-medium">Leave</th>
                <th className="pb-4 font-medium">Health</th>
              </tr>
            </thead>
            <tbody>
              {attendanceSeries.map((item) => (
                <tr key={item.day} className="border-t border-slate-100 text-sm text-slate-600">
                  <td className="py-4 font-medium text-slate-900">{item.day}</td>
                  <td>{item.present}%</td>
                  <td>{item.remote}%</td>
                  <td>{item.leave}%</td>
                  <td><Badge tone={item.present > 80 ? "success" : "warning"}>{item.present > 80 ? "Healthy" : "Watch"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>
    </div>
  );
}

export default Attendance;
