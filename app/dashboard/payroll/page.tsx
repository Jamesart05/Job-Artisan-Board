import { payroll } from "@/app/lib/hr-data";
import { Badge, PageHeader, SurfaceCard } from "../components/ui";

const Payroll = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Finance"
        title="Payroll"
        description="Compensation summary for the current cycle, including bonus and payout status."
      />

      <SurfaceCard>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="text-sm text-slate-400">
              <tr>
                <th className="pb-4 font-medium">Employee</th>
                <th className="pb-4 font-medium">Department</th>
                <th className="pb-4 font-medium">Salary</th>
                <th className="pb-4 font-medium">Bonus</th>
                <th className="pb-4 font-medium">Net pay</th>
                <th className="pb-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {payroll.map((entry) => (
                <tr key={entry.employee} className="border-t border-slate-100 text-sm text-slate-600">
                  <td className="py-4 font-medium text-slate-900">{entry.employee}</td>
                  <td>{entry.department}</td>
                  <td>{entry.salary}</td>
                  <td>{entry.bonus}</td>
                  <td>{entry.netPay}</td>
                  <td><Badge tone={entry.status === "Processed" ? "success" : "warning"}>{entry.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>
    </div>
  );
}

export default Payroll;
